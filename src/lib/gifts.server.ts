import { randomBytes } from "node:crypto";
import { getSql } from "@/lib/db";
import { maybeRewardReferrer } from "@/lib/referrals.server";
import { PRO_MONTH_MS, getUserPlan, grantProMonths } from "@/lib/user-plan.server";
import { uid } from "@/lib/utils";

export const GIFT_DURATIONS = [1, 3, 6, 12] as const;
export type GiftDuration = (typeof GIFT_DURATIONS)[number];

/** Gift codes stay redeemable for 90 days after creation. */
export const GIFT_CODE_TTL_MS = 90 * 24 * 60 * 60 * 1000;

/** Throttle: at most this many unused live codes per user (anti-farming). */
export const MAX_ACTIVE_GIFT_CODES = 20;

export const GIFT_UPGRADE_MESSAGE =
  "Gift codes are a Pro feature. Upgrade to Pro to create them.";

export class GiftProRequiredError extends Error {
  readonly status = 402;
  constructor() {
    super(GIFT_UPGRADE_MESSAGE);
    this.name = "GiftProRequiredError";
  }
}

export type GiftCodeStatus = "unused" | "redeemed" | "expired";

export type GiftCodeInfo = {
  id: string;
  code: string;
  durationMonths: number;
  status: GiftCodeStatus;
  createdAt: string;
  expiresAt: string;
  redeemedAt: string | null;
};

type GiftCodeRow = {
  id: string;
  code: string;
  createdBy: string;
  durationMonths: number;
  expiresAt: string;
  redeemedBy: string | null;
  redeemedAt: string | null;
  createdAt: string;
};

const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function randomCode(): string {
  const bytes = randomBytes(8);
  let body = "";
  for (const byte of bytes) body += CODE_ALPHABET[byte % CODE_ALPHABET.length];
  return `PRO-${body.slice(0, 4)}-${body.slice(4)}`;
}

export function giftStatus(row: {
  redeemedAt: string | null;
  expiresAt: string | Date;
}): GiftCodeStatus {
  if (row.redeemedAt) return "redeemed";
  if (Date.parse(String(row.expiresAt)) <= Date.now()) return "expired";
  return "unused";
}

/** Display grouping for stored codes (`PROABCDEFGH` → `PRO-ABCD-EFGH`). */
export function formatGiftCode(code: string): string {
  const body = code.replace(/^PRO/, "");
  return `PRO-${body.slice(0, 4)}-${body.slice(4)}`;
}

function toInfo(row: GiftCodeRow): GiftCodeInfo {
  return {
    id: row.id,
    code: formatGiftCode(row.code),
    durationMonths: row.durationMonths,
    status: giftStatus(row),
    createdAt: String(row.createdAt),
    expiresAt: String(row.expiresAt),
    redeemedAt: row.redeemedAt ? String(row.redeemedAt) : null,
  };
}

/**
 * Longest gift duration (months) a user may create: equal to or shorter than
 * their own Pro plan. Lifetime → any. Paid plan → its length. Time-boxed
 * grant → remaining window (rounded up, capped at 12).
 */
export async function maxGiftMonths(userId: string): Promise<number> {
  const plan = await getUserPlan(userId);
  if (!plan.isPro) throw new GiftProRequiredError();
  if (plan.isLifetimePro) return 12;
  if (plan.proPlan === "pro_yearly") return 12;
  if (plan.proPlan === "pro_monthly") return 1;
  if (plan.proExpiresAt) {
    const remainingMs = Date.parse(plan.proExpiresAt) - Date.now();
    if (remainingMs <= 0) throw new GiftProRequiredError();
    return Math.min(12, Math.max(1, Math.ceil(remainingMs / PRO_MONTH_MS)));
  }
  // Permanent flag Pro without a recorded plan (legacy webhook rows).
  return 12;
}

/** Create a single-use gift code. Duration must fit the granter's own plan. */
export async function createGiftCode(userId: string, durationMonths: number): Promise<GiftCodeInfo> {
  if (!GIFT_DURATIONS.includes(durationMonths as GiftDuration)) {
    throw new Error(`"durationMonths" must be one of ${GIFT_DURATIONS.join(", ")}.`);
  }
  const allowed = await maxGiftMonths(userId);
  if (durationMonths > allowed) {
    throw new Error(
      `You can only gift up to ${allowed} month${allowed === 1 ? "" : "s"} with your current Pro plan.`,
    );
  }
  const sql = await getSql();
  const active = await sql<{ count: string }>`
    select count(*)::text as count from "gift_codes"
    where "createdBy" = ${userId} and "redeemedAt" is null and "expiresAt" > CURRENT_TIMESTAMP
  `;
  if (Number(active[0]?.count ?? 0) >= MAX_ACTIVE_GIFT_CODES) {
    throw new Error(`You already have ${MAX_ACTIVE_GIFT_CODES} unused gift codes — wait for some to be used first.`);
  }
  for (let attempt = 0; attempt < 5; attempt += 1) {
    // Store dashless so typed codes with/without dashes or spaces all match.
    const code = randomCode().replace(/-/g, "");
    try {
      const rows = await sql<GiftCodeRow>`
        insert into "gift_codes" ("id", "code", "createdBy", "durationMonths", "expiresAt")
        values (${uid()}, ${code}, ${userId}, ${durationMonths}, ${new Date(Date.now() + GIFT_CODE_TTL_MS).toISOString()})
        returning "id", "code", "createdBy", "durationMonths", "expiresAt", "redeemedBy", "redeemedAt", "createdAt"
      `;
      return toInfo(rows[0]);
    } catch {
      // Unique collision — mint another code.
    }
  }
  throw new Error("Could not mint a gift code — try again.");
}

/** Codes a user created, newest first. Full codes included (they're for sharing). */
export async function listGiftCodes(userId: string): Promise<GiftCodeInfo[]> {
  const sql = await getSql();
  const rows = await sql<GiftCodeRow>`
    select "id", "code", "createdBy", "durationMonths", "expiresAt", "redeemedBy", "redeemedAt", "createdAt"
    from "gift_codes" where "createdBy" = ${userId} order by "createdAt" desc
  `;
  return rows.map(toInfo);
}

/** Normalize user-typed codes (`pro-xxxx-xxxx`, spaces, lowercase all match). */
export function normalizeGiftCode(input: string): string {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

/**
 * Redeem a gift code onto the caller's account: Pro for exactly the code's
 * duration, stacked on any remaining grant. Single-use (atomic claim), never
 * your own code, never expired. May also complete a pending referral reward.
 */
export async function redeemGiftCode(
  userId: string,
  input: string,
): Promise<{ durationMonths: number; proExpiresAt: string }> {
  const code = normalizeGiftCode(input);
  if (!code) throw new Error("Enter a gift code.");
  const sql = await getSql();
  const claimed = await sql<GiftCodeRow>`
    update "gift_codes"
    set "redeemedBy" = ${userId}, "redeemedAt" = CURRENT_TIMESTAMP
    where "code" = ${code} and "redeemedBy" is null and "expiresAt" > CURRENT_TIMESTAMP
    returning "id", "code", "createdBy", "durationMonths", "expiresAt", "redeemedBy", "redeemedAt", "createdAt"
  `;
  const row = claimed[0];
  if (!row) {
    const existing = await sql<Pick<GiftCodeRow, "redeemedAt" | "expiresAt">>`
      select "redeemedAt", "expiresAt" from "gift_codes" where "code" = ${code} limit 1
    `;
    if (!existing[0]) throw new Error("That code doesn't exist — check for typos.");
    if (existing[0].redeemedAt) throw new Error("That code was already redeemed.");
    throw new Error("That code has expired.");
  }
  if (row.createdBy === userId) {
    // Roll back the self-claim: your own codes are for giving, not keeping.
    await sql`update "gift_codes" set "redeemedBy" = null, "redeemedAt" = null where "id" = ${row.id}`;
    throw new Error("You can't redeem your own gift code — it's meant for someone else.");
  }
  const proExpiresAt = await grantProMonths(userId, row.durationMonths);
  await maybeRewardReferrer(userId);
  return { durationMonths: row.durationMonths, proExpiresAt };
}
