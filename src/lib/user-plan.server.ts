import { getSql } from "@/lib/db";

export type UserPlan = {
  /** Effective Pro: subscription, time-boxed grant, lifetime flag, or env allowlist. */
  isPro: boolean;
  /** Permanent Pro from the `isLifetimePro` flag or the founder allowlist. */
  isLifetimePro: boolean;
  /** Paid plan id (`pro_monthly`/`pro_yearly`), if bought via checkout. */
  proPlan: string | null;
  /** ISO expiry when Pro comes from a gift/reward grant, else null. */
  proExpiresAt: string | null;
};

/** A Pro "month" is 30 days for gift/reward grants. */
export const PRO_MONTH_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Founder/tester allowlist (server env only — never shipped to the browser).
 * Comma- or space-separated emails, matched case-insensitively, e.g.
 * `LIFETIME_PRO_EMAILS="founder@example.com,tester@example.com"`.
 * Anyone listed is treated as lifetime Pro on every backend.
 */
function lifetimeAllowlist(): Set<string> {
  const raw = process.env.LIFETIME_PRO_EMAILS ?? "";
  return new Set(
    raw
      .split(/[,\s]+/)
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean),
  );
}

type UserPlanRow = {
  id: string;
  email: string;
  isPro: boolean;
  isLifetimePro: boolean;
  proPlan: string | null;
  proExpiresAt: string | null;
};

/**
 * Resolve a user's plan. Lifetime wins over everything: the `isLifetimePro`
 * column or a `LIFETIME_PRO_EMAILS` entry means Pro forever — limits bypassed,
 * Pro badge, MCP unlock — with no expiry and no webhook needed.
 */
export async function getUserPlan(userId: string): Promise<UserPlan> {
  const sql = await getSql();
  const rows = await sql<UserPlanRow>`
    select "id", "email", "isPro", "isLifetimePro", "proPlan", "proExpiresAt"
    from "user" where "id" = ${userId} limit 1
  `;
  const row = rows[0];
  if (!row) return { isPro: false, isLifetimePro: false, proPlan: null, proExpiresAt: null };
  const allowlisted = lifetimeAllowlist().has(String(row.email ?? "").toLowerCase());
  const isLifetimePro = Boolean(row.isLifetimePro) || allowlisted;
  const activeGrant =
    row.proExpiresAt != null && Date.parse(String(row.proExpiresAt)) > Date.now();
  return {
    isPro: Boolean(row.isPro) || isLifetimePro || activeGrant,
    isLifetimePro,
    proPlan: row.proPlan ?? null,
    proExpiresAt: row.proExpiresAt != null ? String(row.proExpiresAt) : null,
  };
}

/** Effective Pro check used by limits, MCP auth, and status endpoints. */
export async function isProUser(userId: string): Promise<boolean> {
  return (await getUserPlan(userId)).isPro;
}

export async function setUserPro(userId: string, isPro: boolean): Promise<void> {
  const sql = await getSql();
  await sql`update "user" set "isPro" = ${isPro}, "updatedAt" = CURRENT_TIMESTAMP where "id" = ${userId}`;
}

/** Record a paid checkout plan alongside permanent Pro (webhook action). */
export async function setUserProPlan(userId: string, plan: string): Promise<void> {
  const sql = await getSql();
  await sql`update "user" set "proPlan" = ${plan}, "updatedAt" = CURRENT_TIMESTAMP where "id" = ${userId}`;
}

/**
 * Extend a user's time-boxed Pro by whole months (gift redemption, referral
 * rewards). Stacks on top of any remaining grant; permanent flags untouched.
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

/** Permanently flag a user as lifetime Pro (admin action). */
export async function setUserLifetimePro(userId: string, value: boolean): Promise<void> {
  const sql = await getSql();
  await sql`update "user" set "isLifetimePro" = ${value}, "updatedAt" = CURRENT_TIMESTAMP where "id" = ${userId}`;
}

/** Look up a user id by email (admin action). Returns null when unknown. */
export async function findUserIdByEmail(email: string): Promise<string | null> {
  const sql = await getSql();
  const rows = await sql<{ id: string }>`
    select "id" from "user" where lower("email") = lower(${email.trim()}) limit 1
  `;
  return rows[0]?.id ?? null;
}
