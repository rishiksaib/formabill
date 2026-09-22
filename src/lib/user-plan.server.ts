import { getSql } from "@/lib/db";

export type ProSource = "subscription" | "gift" | "lifetime" | "admin";

export type UserPlan = {
  /** Effective Pro: subscription, time-boxed grant, lifetime flag, or env allowlist. */
  isPro: boolean;
  /** Permanent Pro from the `isLifetimePro` flag or the founder allowlist. */
  isLifetimePro: boolean;
  /** Paid plan id (`pro_monthly`/`pro_yearly`), if bought via checkout. */
  proPlan: string | null;
  /** ISO expiry when Pro comes from a gift/reward grant, else null. */
  proExpiresAt: string | null;
  /** Where this user's Pro came from (null = free). */
  proSource: ProSource | null;
  /** Whether this user may currently mint gift codes. */
  canGift: boolean;
  /** Gift codes left to mint (ignored for env-allowlisted founders). */
  giftsRemaining: number;
};

/**
 * Gift codes granted per successful paid Pro payment: exactly 1 per billing
 * period. A monthly payment unlocks one 7-day code; a yearly payment unlocks
 * one 30-day code. Never refilled except by a new payment.
 */
export const GIFTS_PER_PRO_PAYMENT = 1;

/** A Pro "month" is 30 days for gift/reward grants. */
export const PRO_MONTH_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Founder/tester allowlist (server env only — never shipped to the browser).
 * Comma- or space-separated emails, matched case-insensitively, e.g.
 * `LIFETIME_PRO_EMAILS="founder@example.com,tester@example.com"`.
 * Anyone listed is treated as lifetime Pro on every backend.
 */
export function parseLifetimeAllowlist(raw: string | undefined): Set<string> {
  return new Set(
    (raw ?? "")
      .split(/[,\s]+/)
      .map((entry) =>
        // Tolerate dashboard pastes with surrounding quotes.
        entry
          .trim()
          .replace(/^["']+|["']+$/g, "")
          .toLowerCase(),
      )
      .filter(Boolean),
  );
}

function lifetimeAllowlist(): Set<string> {
  return parseLifetimeAllowlist(process.env.LIFETIME_PRO_EMAILS);
}

type UserPlanRow = {
  id: string;
  email: string;
  isPro: boolean;
  isLifetimePro: boolean;
  proPlan: string | null;
  proExpiresAt: string | null;
  proSource: string | null;
  canGift: boolean;
  giftsRemaining: number;
  lifetimeGiftGranted?: boolean | null;
};

/** Founder gift quota: one-time pool granted to lifetime accounts. */
export const LIFETIME_GIFT_QUOTA = 3;

function isProSource(value: unknown): value is ProSource {
  return value === "subscription" || value === "gift" || value === "lifetime" || value === "admin";
}

/**
 * Resolve a user's plan. Lifetime wins over everything: the `isLifetimePro`
 * column or a `LIFETIME_PRO_EMAILS` entry means Pro forever — limits bypassed,
 * Pro badge, MCP unlock — with no expiry and no webhook needed.
 */
/** True for "column does not exist" (partial migrations) — never for missing tables. */
function isMissingColumnError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const code = (error as { code?: unknown }).code;
  if (code === "42703") return true;
  const message = error instanceof Error ? error.message : String(error);
  return /column .* does not exist/i.test(message);
}

export async function getUserPlan(userId: string): Promise<UserPlan> {
  const sql = await getSql();
  let rows: UserPlanRow[];
  try {
    rows = await sql<UserPlanRow>`
      select "id", "email", "isPro", "isLifetimePro", "proPlan", "proExpiresAt",
        "proSource", "canGift", "giftsRemaining", "lifetimeGiftGranted"
      from "user" where "id" = ${userId} limit 1
    `;
  } catch (error) {
    // Production databases migrated before the Pro columns existed would 500
    // every Pro read (limits, MCP, status). Fall back to the original three
    // columns so basic Pro + env-allowlist lifetime keep working, and say so
    // loudly in the server logs so the real fix (run migrations) happens.
    if (!isMissingColumnError(error)) throw error;
    console.warn(
      "[pro] user table is missing Pro columns — run `npm run db:migrate` against DATABASE_URL. Serving degraded plan data meanwhile.",
    );
    const minimal = await sql<{ id: string; email: string; isPro: boolean }>`
      select "id", "email", "isPro" from "user" where "id" = ${userId} limit 1
    `;
    const fallback = minimal[0];
    rows = fallback
      ? [
          {
            ...fallback,
            isLifetimePro: false,
            proPlan: null,
            proExpiresAt: null,
            proSource: null,
            canGift: false,
            giftsRemaining: 0,
          },
        ]
      : [];
  }
  const row = rows[0];
  if (!row) {
    return {
      isPro: false,
      isLifetimePro: false,
      proPlan: null,
      proExpiresAt: null,
      proSource: null,
      canGift: false,
      giftsRemaining: 0,
    };
  }
  const allowlisted = lifetimeAllowlist().has(String(row.email ?? "").toLowerCase());
  const isLifetimePro = Boolean(row.isLifetimePro) || allowlisted;
  if (isLifetimePro) {
    // Lifetime is never gift: repair stale rows (e.g. a founder once marked
    // gift) and grant the founder quota exactly once. Spent quota is never
    // refilled by reads — top up explicitly via the grant script.
    let giftsRemaining = Number(row.giftsRemaining ?? 0);
    if (row.proSource !== "lifetime" || !row.lifetimeGiftGranted) {
      try {
        await sql`update "user" set "proSource" = 'lifetime', "canGift" = true,
          "giftsRemaining" = greatest(coalesce("giftsRemaining", 0), ${LIFETIME_GIFT_QUOTA}),
          "lifetimeGiftGranted" = true, "updatedAt" = CURRENT_TIMESTAMP
          where "id" = ${userId}`;
        giftsRemaining = Math.max(giftsRemaining, LIFETIME_GIFT_QUOTA);
      } catch {
        // Pre-0012 schema: serve computed values; migrations fix the row.
        giftsRemaining = Math.max(giftsRemaining, LIFETIME_GIFT_QUOTA);
      }
    }
    return {
      isPro: true,
      isLifetimePro: true,
      proPlan: row.proPlan ?? null,
      proExpiresAt: row.proExpiresAt != null ? String(row.proExpiresAt) : null,
      proSource: "lifetime",
      canGift: true,
      giftsRemaining,
    };
  }
  const activeGrant =
    row.proExpiresAt != null && Date.parse(String(row.proExpiresAt)) > Date.now();
  const source = isProSource(row.proSource) ? row.proSource : null;
  return {
    isPro: Boolean(row.isPro) || activeGrant,
    isLifetimePro: false,
    proPlan: row.proPlan ?? null,
    proExpiresAt: row.proExpiresAt != null ? String(row.proExpiresAt) : null,
    proSource: source,
    // Single source of truth for gifting rights (badge, notice, generator,
    // and API gates all read this): gift source never gifts; paid
    // subscriptions always can; anything else defers to the stored flag.
    canGift: canGiftForSource(source, Boolean(row.canGift)),
    giftsRemaining: Number(row.giftsRemaining ?? 0),
  };
}

/**
 * The one rule for gifting rights, shared by the plan resolver, gift APIs,
 * and Settings UI copy: only `gift` is ever excluded. Paid subscriptions
 * always qualify (quota is enforced separately); lifetime is resolved to its
 * own branch above before this is consulted.
 */
export function canGiftForSource(
  source: ProSource | null,
  storedCanGift: boolean,
): boolean {
  if (source === "gift") return false;
  if (source === "subscription") return true;
  return storedCanGift;
}

/** True when the founder allowlist covers this user (unlimited gifting). */
export async function isAllowlistedFounder(userId: string): Promise<boolean> {
  const sql = await getSql();
  const rows = await sql<{ email: string }>`
    select "email" from "user" where "id" = ${userId} limit 1
  `;
  const email = rows[0]?.email;
  return Boolean(email) && lifetimeAllowlist().has(String(email).toLowerCase());
}

/** Effective Pro check used by limits, MCP auth, and status endpoints. */
export async function isProUser(userId: string): Promise<boolean> {
  return (await getUserPlan(userId)).isPro;
}

export type ProDebugInfo = {
  email: string | null;
  rowFound: boolean;
  rowIsLifetimePro: boolean | null;
  rowProSource: string | null;
  rowCanGift: boolean | null;
  rowGiftsRemaining: number | null;
  allowlisted: boolean;
  plan: UserPlan;
};

/**
 * Self-diagnostics for one signed-in user (powers `GET /api/pro/debug`).
 * Shows the raw row next to the computed plan so a glance reveals whether a
 * broken gift UI is a data problem (flags/row) or an env problem
 * (`allowlisted: false` while listed). Never exposes other users or the
 * allowlist contents.
 */
export async function getProDebugInfo(userId: string): Promise<ProDebugInfo> {
  const sql = await getSql();
  let raw: {
    email?: unknown;
    isLifetimePro?: unknown;
    proSource?: unknown;
    canGift?: unknown;
    giftsRemaining?: unknown;
  } | null = null;
  try {
    const rows = await sql<Record<string, unknown>>`
      select "email", "isLifetimePro", "proSource", "canGift", "giftsRemaining"
      from "user" where "id" = ${userId} limit 1
    `;
    raw = rows[0] ?? null;
  } catch {
    raw = null;
  }
  const email = typeof raw?.email === "string" ? raw.email : null;
  const plan = await getUserPlan(userId);
  return {
    email,
    rowFound: raw !== null,
    rowIsLifetimePro: typeof raw?.isLifetimePro === "boolean" ? raw.isLifetimePro : null,
    rowProSource: typeof raw?.proSource === "string" ? raw.proSource : null,
    rowCanGift: typeof raw?.canGift === "boolean" ? raw.canGift : null,
    rowGiftsRemaining: typeof raw?.giftsRemaining === "number" ? raw.giftsRemaining : null,
    allowlisted:
      email !== null && parseLifetimeAllowlist(process.env.LIFETIME_PRO_EMAILS).has(email.toLowerCase()),
    plan,
  };
}

export async function setUserPro(userId: string, isPro: boolean): Promise<void> {
  const sql = await getSql();
  await sql`update "user" set "isPro" = ${isPro}, "updatedAt" = CURRENT_TIMESTAMP where "id" = ${userId}`;
}

/**
 * Extend a user's time-boxed Pro by whole days, stacking on any remaining
 * grant (a fresh recipient gets exactly now + days). Permanent flags untouched.
 */
export async function grantProDays(userId: string, days: number): Promise<string> {
  const sql = await getSql();
  const rows = await sql<{ proExpiresAt: string | null }>`
    select "proExpiresAt" from "user" where "id" = ${userId} limit 1
  `;
  const current = rows[0]?.proExpiresAt != null ? Date.parse(String(rows[0].proExpiresAt)) : NaN;
  const base = Number.isFinite(current) ? Math.max(current, Date.now()) : Date.now();
  const expiresAt = new Date(base + days * 24 * 60 * 60 * 1000).toISOString();
  await sql`update "user" set "proExpiresAt" = ${expiresAt}, "updatedAt" = CURRENT_TIMESTAMP where "id" = ${userId}`;
  return expiresAt;
}

/**
 * Extend a user's time-boxed Pro by whole months (referral rewards).
 * Stacks on top of any remaining grant; permanent flags untouched.
 */
export async function grantProMonths(userId: string, months: number): Promise<string> {
  const sql = await getSql();
  const rows = await sql<{ proExpiresAt: string | null }>`
    select "proExpiresAt" from "user" where "id" = ${userId} limit 1
  `;
  const current = rows[0]?.proExpiresAt != null ? Date.parse(String(rows[0].proExpiresAt)) : NaN;
  const base = Number.isFinite(current) ? Math.max(current, Date.now()) : Date.now();
  const expiresAt = new Date(base + months * PRO_MONTH_MS).toISOString();
  await sql`update "user" set "proExpiresAt" = ${expiresAt}, "updatedAt" = CURRENT_TIMESTAMP where "id" = ${userId}`;
  return expiresAt;
}

/**
 * Permanently flag a user as lifetime Pro (admin action). Gifting stays off
 * unless explicitly allowed — pass a quota to let this grant mint codes.
 */
export async function setUserLifetimePro(
  userId: string,
  value: boolean,
  giftsRemaining?: number,
): Promise<void> {
  const sql = await getSql();
  if (giftsRemaining === undefined) {
    await sql`update "user" set "isLifetimePro" = ${value}, "updatedAt" = CURRENT_TIMESTAMP where "id" = ${userId}`;
    return;
  }
  await sql`update "user" set "isLifetimePro" = ${value}, "canGift" = ${value}, "giftsRemaining" = ${giftsRemaining}, "updatedAt" = CURRENT_TIMESTAMP where "id" = ${userId}`;
}

/** Record a paid Pro purchase: source, gifting rights, and fresh quota. */
export async function setUserSubscriptionPro(userId: string, plan: string): Promise<void> {
  const sql = await getSql();
  await sql`update "user" set "isPro" = true, "proPlan" = ${plan}, "proSource" = 'subscription', "canGift" = true, "giftsRemaining" = ${GIFTS_PER_PRO_PAYMENT}, "updatedAt" = CURRENT_TIMESTAMP where "id" = ${userId}`;
}

/** Look up a user id by email (admin action). Returns null when unknown. */
export async function findUserIdByEmail(email: string): Promise<string | null> {
  const sql = await getSql();
  const rows = await sql<{ id: string }>`
    select "id" from "user" where lower("email") = lower(${email.trim()}) limit 1
  `;
  return rows[0]?.id ?? null;
}
