import { randomBytes } from "node:crypto";
import { getSql } from "@/lib/db";
import { grantProMonths } from "@/lib/user-plan.server";
import { uid } from "@/lib/utils";

/** Months of Pro a referrer earns per converted referral. */
export const REFERRAL_REWARD_MONTHS = 1;

const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function randomReferralCode(): string {
  const bytes = randomBytes(6);
  let code = "";
  for (const byte of bytes) code += CODE_ALPHABET[byte % CODE_ALPHABET.length];
  return code;
}

export type ReferralStats = {
  code: string;
  signups: number;
  proConversions: number;
  monthsEarned: number;
};

/** Fetch or mint the user's referral code (any signed-in user may refer). */
export async function getReferralCode(userId: string): Promise<string> {
  const sql = await getSql();
  const existing = await sql<{ code: string }>`
    select "code" from "referral_codes" where "userId" = ${userId} limit 1
  `;
  if (existing[0]) return existing[0].code;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const code = randomReferralCode();
    try {
      await sql`insert into "referral_codes" ("userId", "code") values (${userId}, ${code})`;
      return code;
    } catch {
      // Collision — mint another.
    }
  }
  throw new Error("Could not create a referral code — try again.");
}

/**
 * Attribute a signup to a referrer. One attribution per account, never
 * yourself, unknown codes rejected. Idempotent for the same code.
 */
export async function attributeReferral(userId: string, input: string): Promise<{ ok: true }> {
  const code = input.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!code) throw new Error("Enter a referral code.");
  const sql = await getSql();
  const owner = await sql<{ userId: string }>`
    select "userId" from "referral_codes" where "code" = ${code} limit 1
  `;
  if (!owner[0]) throw new Error("That referral code doesn't exist — check for typos.");
  if (owner[0].userId === userId) throw new Error("You can't refer yourself.");
  const already = await sql<{ id: string }>`
    select "id" from "referrals" where "referredUserId" = ${userId} limit 1
  `;
  if (already[0]) return { ok: true };
  await sql`
    insert into "referrals" ("id", "referrerUserId", "referredUserId")
    values (${uid()}, ${owner[0].userId}, ${userId})
    on conflict ("referredUserId") do nothing
  `;
  return { ok: true };
}

/**
 * Reward a referrer when their invitee becomes Pro (paid checkout or gift
 * redemption — NOT lifetime/env grants). One reward per invitee, +1 month,
 * stacked on any remaining grant.
 */
export async function maybeRewardReferrer(referredUserId: string): Promise<boolean> {
  const sql = await getSql();
  const rows = await sql<{ id: string; referrerUserId: string }>`
    select "id", "referrerUserId" from "referrals"
    where "referredUserId" = ${referredUserId} and "rewardedAt" is null limit 1
  `;
  const row = rows[0];
  if (!row) return false;
  await grantProMonths(row.referrerUserId, REFERRAL_REWARD_MONTHS);
  await sql`update "referrals" set "rewardedAt" = CURRENT_TIMESTAMP where "id" = ${row.id} and "rewardedAt" is null`;
  return true;
}

/** Referral link code + simple stats for Settings. */
export async function getReferralStats(userId: string): Promise<ReferralStats> {
  const code = await getReferralCode(userId);
  const sql = await getSql();
  const rows = await sql<{ signups: string; pros: string }>`
    select count(*)::text as signups,
      count("rewardedAt")::text as pros
    from "referrals" where "referrerUserId" = ${userId}
  `;
  const signups = Number(rows[0]?.signups ?? 0);
  const proConversions = Number(rows[0]?.pros ?? 0);
  return { code, signups, proConversions, monthsEarned: proConversions * REFERRAL_REWARD_MONTHS };
}
