import { createFileRoute } from "@tanstack/react-router";
import { UnauthorizedError } from "@/lib/auth/verify.server";
import { getUserPlan } from "@/lib/user-plan.server";
import {
  McpPaidOnlyError,
  McpProRequiredError,
  createMcpToken,
  listMcpTokens,
} from "@/lib/mcp-tokens.server";
import { checkRateLimit, clientIp, rateLimitedResponse } from "@/lib/rate-limit.server";
import { requireRequestUserId } from "@/lib/request-auth.server";

/**
 * Personal access tokens for the MCP endpoint. Session-authenticated:
 * listing requires sign-in; creating additionally requires a paid Pro
 * subscription — free users get the upgrade message (402), gift-Pro users a
 * paid-only message (403).
 */
export const Route = createFileRoute("/api/mcp/tokens")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const userId = await requireRequestUserId();
          const plan = await getUserPlan(userId).catch(() => null);
          return Response.json({
            tokens: await listMcpTokens(userId),
            canAccess: Boolean(plan && plan.isPro && (plan.canGift || plan.proSource === "subscription")),
          });
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            return Response.json({ error: "Sign in to manage MCP tokens." }, { status: 401 });
          }
          return Response.json(
            { error: error instanceof Error ? error.message : "Could not load tokens" },
            { status: 400 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const limit = checkRateLimit(`mcp-tokens:POST:${clientIp(request)}`, 20, 60_000);
          if (!limit.allowed) return rateLimitedResponse(limit.retryAfterSec);
          const userId = await requireRequestUserId();
          const body = (await request.json().catch(() => ({}))) as { name?: unknown };
          const created = await createMcpToken(
            userId,
            typeof body.name === "string" ? body.name : "",
          );
          // The full secret is returned exactly once — the UI shows it for
          // copying immediately; only its hash is stored.
          return Response.json(created);
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            return Response.json({ error: "Sign in to manage MCP tokens." }, { status: 401 });
          }
          if (error instanceof McpProRequiredError) {
            return Response.json({ error: error.message }, { status: error.status });
          }
          if (error instanceof McpPaidOnlyError) {
            return Response.json({ error: error.message }, { status: error.status });
          }
          return Response.json(
            { error: error instanceof Error ? error.message : "Could not create token" },
            { status: 400 },
          );
        }
      },
    },
  },
});
