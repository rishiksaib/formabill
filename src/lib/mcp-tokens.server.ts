import { createHash, randomBytes } from "node:crypto";
import { getSql } from "@/lib/db";
import { getUserPlan } from "@/lib/user-plan.server";
import { uid } from "@/lib/utils";

export const MCP_TOKEN_PREFIX = "fb_mcp_";
export const MCP_UPGRADE_MESSAGE =
  "AI connection is a Pro feature. Upgrade to Pro to generate MCP tokens.";
export const MCP_PAID_ONLY_MESSAGE =
  "MCP access needs a paid Pro subscription — gift and trial grants don't include AI connection.";

export type McpTokenInfo = {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsedAt: string | null;
};

type McpTokenRow = {
  id: string;
  userId: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsedAt: string | null;
  revokedAt: string | null;
};

export function hashMcpToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function newTokenSecret(): string {
  return `${MCP_TOKEN_PREFIX}${randomBytes(24).toString("base64url")}`;
}

/** Thrown when a non-Pro user attempts a Pro-only MCP action. Carries `status`. */
export class McpProRequiredError extends Error {
  readonly status = 402;
  constructor() {
    super(MCP_UPGRADE_MESSAGE);
    this.name = "McpProRequiredError";
  }
}

/**
 * Thrown when a Pro user without a paid subscription (gift grants, expired
 * trials) attempts MCP. Product rule, mirroring gift-code philosophy: only
 * `proSource === "subscription"` (or an env-allowlisted founder) unlocks AI
 * connection. Carries `status` 403.
 */
export class McpPaidOnlyError extends Error {
  readonly status = 403;
  constructor() {
    super(MCP_PAID_ONLY_MESSAGE);
    this.name = "McpPaidOnlyError";
  }
}

/**
 * Paid-subscription gate for MCP. Gift-Pro and other non-subscription grants
 * are Pro everywhere else, but cannot mint or use API keys.
 */
export async function requireMcpAccess(userId: string): Promise<void> {
  const plan = await getUserPlan(userId);
  if (!plan.isPro) throw new McpProRequiredError();
  if (!plan.canGift && plan.proSource !== "subscription") throw new McpPaidOnlyError();
}

/**
 * Create a personal access token for MCP. Paid Pro only. Returns the full
 * secret exactly once — callers must show it to the user immediately; only
 * the SHA-256 hash is stored.
 */
export async function createMcpToken(
  userId: string,
  name: string,
): Promise<McpTokenInfo & { token: string }> {
  await requireMcpAccess(userId);
  const cleanName = name.trim().slice(0, 80) || "Untitled token";
  const token = newTokenSecret();
  const sql = await getSql();
  const created = await sql<McpTokenRow>`
    insert into "mcp_tokens" ("id", "userId", "name", "tokenHash", "prefix")
    values (${uid()}, ${userId}, ${cleanName}, ${hashMcpToken(token)}, ${token.slice(0, 12)})
    returning "id", "name", "prefix", "createdAt", "lastUsedAt"
  `;
  const row = created[0];
  return {
    id: row.id,
    name: row.name,
    prefix: row.prefix,
    createdAt: String(row.createdAt),
    lastUsedAt: row.lastUsedAt ? String(row.lastUsedAt) : null,
    token,
  };
}

/** Active (non-revoked) tokens for a user — hashes are never returned. */
export async function listMcpTokens(userId: string): Promise<McpTokenInfo[]> {
  const sql = await getSql();
  const rows = await sql<McpTokenRow>`
    select "id", "name", "prefix", "createdAt", "lastUsedAt"
    from "mcp_tokens"
    where "userId" = ${userId} and "revokedAt" is null
    order by "createdAt" desc
  `;
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    prefix: row.prefix,
    createdAt: String(row.createdAt),
    lastUsedAt: row.lastUsedAt ? String(row.lastUsedAt) : null,
  }));
}

/** Revoke one of the user's tokens. Returns false when it does not exist. */
export async function revokeMcpToken(userId: string, id: string): Promise<boolean> {
  const sql = await getSql();
  const rows = await sql<{ id: string }>`
    update "mcp_tokens" set "revokedAt" = CURRENT_TIMESTAMP
    where "id" = ${id} and "userId" = ${userId} and "revokedAt" is null
    returning "id"
  `;
  return rows.length > 0;
}

export type McpAuth =
  | { ok: true; tokenId: string; userId: string }
  | { ok: false; reason: "invalid" | "revoked" | "not_pro" | "paid_only" };

/**
 * Authenticate an MCP bearer token. Scoped to exactly one user; revoked
 * tokens and downgraded (non-Pro) users are rejected. Touches `lastUsedAt`
 * best-effort.
 */
export async function authenticateMcpToken(token: string): Promise<McpAuth> {
  const sql = await getSql();
  const rows = await sql<{ id: string; userId: string; revokedAt: string | null }>`
    select "id", "userId", "revokedAt" from "mcp_tokens"
    where "tokenHash" = ${hashMcpToken(token)} limit 1
  `;
  const row = rows[0];
  if (!row) return { ok: false, reason: "invalid" };
  if (row.revokedAt) return { ok: false, reason: "revoked" };
  const plan = await getUserPlan(row.userId);
  if (!plan.isPro) return { ok: false, reason: "not_pro" };
  if (!plan.canGift && plan.proSource !== "subscription") {
    return { ok: false, reason: "paid_only" };
  }
  void sql`update "mcp_tokens" set "lastUsedAt" = CURRENT_TIMESTAMP where "id" = ${row.id}`.catch(
    () => undefined,
  );
  return { ok: true, tokenId: row.id, userId: row.userId };
}
