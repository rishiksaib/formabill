import { createFileRoute } from "@tanstack/react-router";
import { UnauthorizedError } from "@/lib/auth/verify.server";
import { revokeMcpToken } from "@/lib/mcp-tokens.server";
import { requireRequestUserId } from "@/lib/request-auth.server";

/** Revoke one of your MCP tokens (scoped to your own user id). */
export const Route = createFileRoute("/api/mcp/tokens/$id")({
  server: {
    handlers: {
      DELETE: async ({ params }) => {
        try {
          const userId = await requireRequestUserId();
          const ok = await revokeMcpToken(userId, params.id);
          if (!ok) return Response.json({ error: "Token not found." }, { status: 404 });
          return Response.json({ ok: true });
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            return Response.json({ error: "Sign in to manage MCP tokens." }, { status: 401 });
          }
          return Response.json(
            { error: error instanceof Error ? error.message : "Could not revoke token" },
            { status: 400 },
          );
        }
      },
    },
  },
});
