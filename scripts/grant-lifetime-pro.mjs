#!/usr/bin/env node
/**
 * Grant or revoke lifetime Pro for a user by email (admin action).
 *
 *   node scripts/grant-lifetime-pro.mjs user@example.com
 *   node scripts/grant-lifetime-pro.mjs --revoke user@example.com
 *   node scripts/grant-lifetime-pro.mjs --can-gift user@example.com
 *   npm run grant:lifetime-pro -- user@example.com
 *
 * Gift codes can be minted by paid subscribers and lifetime accounts with
 * remaining quota. Pass --can-gift to top up anyone's gift quota (default 1):
 *
 *   node scripts/grant-lifetime-pro.mjs --can-gift [count] user@example.com
 *
 * Needs DATABASE_URL (it talks to the real Postgres). The local dev database
 * is an in-memory PGLite inside the running server process, which no outside
 * script can reach — for local testing, set LIFETIME_PRO_EMAILS instead:
 *
 *   LIFETIME_PRO_EMAILS="you@example.com" npm run dev
 *
 * Lifetime Pro never expires: limits bypassed, Pro badge, MCP unlock.
 */
import pg from "pg";

function usage() {
  console.log("usage: node scripts/grant-lifetime-pro.mjs [--revoke] [--can-gift [count]] <email>");
  console.log("       npm run grant:lifetime-pro -- [--revoke] [--can-gift [count]] <email>");
}

const argv = process.argv.slice(2);
const revoke = argv.includes("--revoke");
const canGift = argv.includes("--can-gift");
const email = argv.find((arg) => !arg.startsWith("--") && !/^\d+$/.test(arg));
const quotaArg = argv.find((arg) => /^\d+$/.test(arg));
const TOPUP_QUOTA = quotaArg ? Math.max(1, Math.min(99, Number(quotaArg))) : 1;

if (!email || email === "--help" || email === "-h") {
  usage();
  process.exit(email ? 0 : 2);
}

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
  console.error(
    "[grant:lifetime-pro] DATABASE_URL is not set.\n" +
      "This script needs the real Postgres because the local dev database is an\n" +
      "in-memory PGLite that only the running server can reach. Either deploy\n" +
      "first and run with DATABASE_URL set, or use the env allowlist locally:\n" +
      '  LIFETIME_PRO_EMAILS="you@example.com" npm run dev',
  );
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: databaseUrl, max: 1 });
try {
  const found = await pool.query(`select "id", "email", "isLifetimePro" from "user" where lower("email") = lower($1) limit 1`, [
    email.trim(),
  ]);
  const user = found.rows[0];
  if (!user) {
    console.error(`[grant:lifetime-pro] no user found for ${email} — ask them to sign up first.`);
    process.exit(1);
  }
  if (revoke) {
    await pool.query(
      `update "user" set "isLifetimePro" = false, "updatedAt" = CURRENT_TIMESTAMP where "id" = $1`,
      [user.id],
    );
    console.log(`[grant:lifetime-pro] ${user.email} lifetime Pro revoked (id ${user.id}).`);
    return;
  }
  if (canGift) {
    await pool.query(
      `update "user" set "canGift" = true, "giftsRemaining" = $1, "updatedAt" = CURRENT_TIMESTAMP where "id" = $2`,
      [TOPUP_QUOTA, user.id],
    );
    console.log(
      `[grant:lifetime-pro] ${user.email} gift quota topped up to ${TOPUP_QUOTA} (id ${user.id}). No source flags changed.`,
    );
    return;
  }
  await pool.query(
    `update "user" set "isLifetimePro" = true, "updatedAt" = CURRENT_TIMESTAMP where "id" = $1`,
    [user.id],
  );
  console.log(
    `[grant:lifetime-pro] ${user.email} lifetime Pro granted without gifting (id ${user.id}).`,
  );
} finally {
  await pool.end();
}
