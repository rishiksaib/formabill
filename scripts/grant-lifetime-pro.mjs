#!/usr/bin/env node
/**
 * Grant or revoke lifetime Pro for a user by email (admin action).
 *
 *   node scripts/grant-lifetime-pro.mjs user@example.com
 *   node scripts/grant-lifetime-pro.mjs --revoke user@example.com
 *   npm run grant:lifetime-pro -- user@example.com
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
  console.log("usage: node scripts/grant-lifetime-pro.mjs [--revoke] <email>");
  console.log("       npm run grant:lifetime-pro -- [--revoke] <email>");
}

const argv = process.argv.slice(2);
const revoke = argv.includes("--revoke");
const email = argv.find((arg) => !arg.startsWith("--"));

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
  await pool.query(
    `update "user" set "isLifetimePro" = $1, "updatedAt" = CURRENT_TIMESTAMP where "id" = $2`,
    [!revoke, user.id],
  );
  console.log(
    `[grant:lifetime-pro] ${user.email} lifetime Pro ${revoke ? "revoked" : "granted"} (id ${user.id}).`,
  );
} finally {
  await pool.end();
}
