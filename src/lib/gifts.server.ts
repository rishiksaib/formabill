import { randomBytes } from "node:crypto";
import { getSql } from "@/lib/db";
import { maybeRewardReferrer } from "@/lib/referrals.server";
import {
  canGiftForSource,
  getUserPlan,
  grantProDays,
} from "@/lib/user-plan.server";
import { uid } from "@/lib/utils";

/**
 * What each paid plan can gift: monthly buys one 7-day code per period,
 * yearly buys one 30-day code per year. Tight by design — gift recipients
 * never gain gifting rights, so free Pro cannot multiply.
 */
export const GIFT_GRANTS = {
  pro_monthly: { days: 7, label: "7 days Pro", quotaLine: "1 friend · 7 days Pro · 1 code/month" },
  pro_yearly: { days: 30, label: "1 month Pro", quotaLine: "1 friend · 1 month Pro · 1 code/year" },
  lifetime: { days: 30, label: "1 month Pro", quotaLine: "1 month Pro per code" },
} as const;

export type GiftGrantPlan = keyof typeof GIFT_GRANTS;

/** Gift codes stay redeemable for 90 days after creation. */
export const GIFT_CODE_TTL_MS = 90 * 24 * 60 * 60 * 1000;

/** Throttle: at most this many unused live codes per user (anti-farming). */
export const MAX_ACTIVE_GIFT_CODES = 20;

/** Lifetime accounts may mint at most this many codes, ever. */
export const LIFETIME_TOTAL_CAP = 3;

/** Double-click/retry window: repeat creates within this long return the same code. */
export const MINT_IDEMPOTENCY_MS = 10_000;

/** Recent mints by user id — best-effort, per process. Entries expire. */
const recentMints = new Map<string, { at: number; info: GiftCodeInfo }>();

function isUniqueViolation(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const code = (error as { code?: unknown }).code;
  if (code === "23505") return true;
  const message = error instanceof Error ? error.message : String(error);
  return /duplicate key|unique constraint|already exists/i.test(message);
}

/** Total codes ever minted by a user (for the lifetime cap). */
export async function lifetimeCreatedCount(userId: string): Promise<number> {
  const sql = await getSql();
  const rows = await sql<{ count: string }>`
    select count(*)::text as count from "gift_codes" where "createdBy" = ${userId}
  `;
  return Number(rows[0]?.count ?? 0);
}

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
  giftDurationDays: number;
  planType: string | null;
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
  giftDurationDays: number | null;
  planType: string | null;
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
    giftDurationDays: row.giftDurationDays ?? row.durationMonths * 30,
    planType: row.planType,
    status: giftStatus(row),
    createdAt: String(row.createdAt),
    expiresAt: String(row.expiresAt),
    redeemedAt: row.redeemedAt ? String(row.redeemedAt) : null,
  };
}

/** Human grant length for a day count (`7 days`, `1 month`, `90 days`). */
export function giftDaysLabel(days: number): string {
  if (days === 30) return "1 month";
  if (days % 30 === 0) return `${days / 30} months`;
  return `${days} days`;
}

/**
 * The fixed grant a user may mint: paid subscribers get their plan's grant
 * (monthly → 7 days, yearly → 30 days); lifetime accounts grant 30 days.
 * Gift-Pro and free users cannot mint at all.
 */
export async function giftGrantFor(userId: string): Promise<{ days: number; plan: GiftGrantPlan }> {
  const plan = await getUserPlan(userId);
  if (!plan.isPro) throw new GiftProRequiredError();
  if (plan.isLifetimePro) return { days: GIFT_GRANTS.lifetime.days, plan: "lifetime" };
  if (plan.proSource !== "subscription") {
    throw new GiftQuotaExhaustedError("Your Pro plan doesn't include gift codes.");
  }
  if (plan.proPlan === "pro_yearly") return { days: GIFT_GRANTS.pro_yearly.days, plan: "pro_yearly" };
  return { days: GIFT_GRANTS.pro_monthly.days, plan: "pro_monthly" };
}

export class GiftQuotaExhaustedError extends Error {
  readonly status = 403;
  constructor(message?: string) {
    super(message ?? "You've used all your gift codes.");
    this.name = "GiftQuotaExhaustedError";
  }
}

/**
 * Create a single-use gift code. Strict rule: the granter must hold a paid
 * subscription or lifetime Pro, with remaining quota. The grant is fixed
 * (monthly → 7 days, yearly/lifetime → 30 days) and one quota unit is
 * consumed. Gift-Pro and free users are rejected — recipients can never
 * mint, so free Pro cannot multiply.
 */
export async function createGiftCode(userId: string): Promise<GiftCodeInfo> {
  const plan = await getUserPlan(userId);
  if (!plan.isPro) throw new GiftProRequiredError();
  // Single rule (see canGiftForSource): gift-sourced Pro never mints.
  // Lifetime is additionally allowed; quota is enforced right after.
  const mayGift = plan.isLifetimePro || canGiftForSource(plan.proSource, plan.canGift);
  if (!mayGift) {
    throw new GiftQuotaExhaustedError("Your Pro plan doesn't include gift codes.");
  }
  const grant = await giftGrantFor(userId);
  if (plan.isLifetimePro) {
    // Lifetime cap is total codes ever minted — the counter field is not
    // trusted here so over-minted history can't grant extras.
    const created = await lifetimeCreatedCount(userId);
    if (created >= LIFETIME_TOTAL_CAP) {
      throw new GiftQuotaExhaustedError("You've used all your gift codes.");
    }
  } else if (plan.giftsRemaining < 1) {
    throw new GiftQuotaExhaustedError("You've used all your gift codes.");
  }
  // Idempotency: a double-click or client retry within the window returns the
  // same code instead of minting a second one.
  const now = Date.now();
  if (recentMints.size > 500) {
    for (const [key, entry] of recentMints) {
      if (now - entry.at > MINT_IDEMPOTENCY_MS) recentMints.delete(key);
    }
  }
  const dupe = recentMints.get(userId);
  if (dupe && now - dupe.at < MINT_IDEMPOTENCY_MS) return dupe.info;

  const sql = await getSql();
  const active = await sql<{ count: string }>`
    select count(*)::text as count from "gift_codes"
    where "createdBy" = ${userId} and "redeemedAt" is null and "expiresAt" > CURRENT_TIMESTAMP
  `;
  if (Number(active[0]?.count ?? 0) >= MAX_ACTIVE_GIFT_CODES) {
    throw new Error(`You already have ${MAX_ACTIVE_GIFT_CODES} unused gift codes — wait for some to be used first.`);
  }
  const months = Math.max(1, Math.round(grant.days / 30));
  const expiresAt = new Date(Date.now() + GIFT_CODE_TTL_MS).toISOString();
  for (let attempt = 0; attempt < 5; attempt += 1) {
    // Store dashless so typed codes with/without dashes or spaces all match.
    const code = randomCode().replace(/-/g, "");
    let rows: GiftCodeRow[];
    try {
      if (plan.isLifetimePro) {
        // Single statement: either the whole row lands or nothing does.
        rows = await sql<GiftCodeRow>`
          insert into "gift_codes" ("id", "code", "createdBy", "durationMonths", "giftDurationDays", "planType", "expiresAt")
          values (${uid()}, ${code}, ${userId}, ${months}, ${grant.days}, ${grant.plan}, ${expiresAt})
          returning "id", "code", "createdBy", "durationMonths", "giftDurationDays", "planType", "expiresAt", "redeemedBy", "redeemedAt", "createdAt"
        `;
      } else {
        // Single atomic statement: decrement-if-positive and insert together.
        // A unique collision rolls everything back (safe to retry with a new
        // code); any other error propagates untouched — never retried, never
        // orphaned.
        rows = await sql<GiftCodeRow>`
          with dec as (
            update "user" set "giftsRemaining" = "giftsRemaining" - 1, "updatedAt" = CURRENT_TIMESTAMP
            where "id" = ${userId} and "giftsRemaining" > 0
            returning "id"
          )
          insert into "gift_codes" ("id", "code", "createdBy", "durationMonths", "giftDurationDays", "planType", "expiresAt")
          select ${uid()}, ${code}, ${userId}, ${months}, ${grant.days}, ${grant.plan}, ${expiresAt}
          from dec
          returning "id", "code", "createdBy", "durationMonths", "giftDurationDays", "planType", "expiresAt", "redeemedBy", "redeemedAt", "createdAt"
        `;
      }
    } catch (error) {
      // ONLY a unique collision may retry. Every other failure (DB outage,
      // permissions, missing columns) propagates as-is — retrying those is
      // what multiplied orphan rows.
      if (!isUniqueViolation(error)) throw error;
      continue;
    }
    if (rows.length === 0) {
      // Quota hit zero between the check and the write (lost race).
      throw new GiftQuotaExhaustedError("You've used all your gift codes.");
    }
    const info = toInfo(rows[0]);
    recentMints.set(userId, { at: Date.now(), info });
    return info;
  }
  throw new Error("Could not mint a gift code — try again.");
}

/** Codes a user created, newest first. Full codes included (they're for sharing). */
export async function listGiftCodes(userId: string): Promise<GiftCodeInfo[]> {
  const sql = await getSql();
  const rows = await sql<GiftCodeRow>`
    select "id", "code", "createdBy", "durationMonths", "giftDurationDays", "planType", "expiresAt", "redeemedBy", "redeemedAt", "createdAt"
    from "gift_codes" where "createdBy" = ${userId} order by "createdAt" desc
  `;
  return rows.map(toInfo);
}

/** Normalize user-typed codes (`pro-xxxx-xxxx`, spaces, lowercase all match). */
export function normalizeGiftCode(input: string): string {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export class GiftRedeemProError extends Error {
  readonly status = 400;
  constructor() {
    super("You're already on Pro. Gift codes can only be redeemed by free accounts.");
    this.name = "GiftRedeemProError";
  }
}

/**
 * Redeem a gift code onto a FREE account: Pro for exactly the code's
 * duration. Already-Pro users are rejected before anything is claimed, so
 * the code stays valid for someone who needs it. Single-use (atomic claim),
 * never your own code, never expired. May also complete a pending referral
 * reward.
 */
export async function redeemGiftCode(
  userId: string,
  input: string,
): Promise<{ durationMonths: number; giftDurationDays: number; proExpiresAt: string }> {
  const code = normalizeGiftCode(input);
  if (!code) throw new Error("Enter a gift code.");
  const redeemer = await getUserPlan(userId);
  if (redeemer.isPro) throw new GiftRedeemProError();
  const sql = await getSql();
  const claimed = await sql<GiftCodeRow>`
    update "gift_codes"
    set "redeemedBy" = ${userId}, "redeemedAt" = CURRENT_TIMESTAMP
    where "code" = ${code} and "redeemedBy" is null and "expiresAt" > CURRENT_TIMESTAMP
    returning "id", "code", "createdBy", "durationMonths", "giftDurationDays", "planType", "expiresAt", "redeemedBy", "redeemedAt", "createdAt"
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
  // The redeemer was verified free above: tag them gift-Pro with no gifting
  // rights and no quota. The loop ends here.
  const days = row.giftDurationDays ?? row.durationMonths * 30;
  const proExpiresAt = await grantProDays(userId, days);
  await sql`update "user" set "proSource" = 'gift', "canGift" = false, "giftsRemaining" = 0, "updatedAt" = CURRENT_TIMESTAMP where "id" = ${userId}`;
  await maybeRewardReferrer(userId);
  return { durationMonths: row.durationMonths, giftDurationDays: days, proExpiresAt };
}
