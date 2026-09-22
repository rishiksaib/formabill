import { createFileRoute } from "@tanstack/react-router";
import { UnauthorizedError } from "@/lib/auth/verify.server";
import { getProDebugInfo } from "@/lib/user-plan.server";
import { requireRequestUserId } from "@/lib/request-auth.server";

/**
 * Self-diagnostics for the signed-in caller only: raw Pro row fields next to
 * the computed plan, plus whether the env allowlist matches. If the gift UI
 * misbehaves, this shows in one glance whether the cause is data, env, or a
 * stale deployment (compare with a fresh `tsc`+`build` if fields look old).
 */
export const Route = createFileRoute("/api/pro/debug")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const userId = await requireRequestUserId();
          return Response.json(await getProDebugInfo(userId));
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            return Response.json({ error: "Sign in to inspect Pro state." }, { status: 401 });
          }
          return Response.json(
            { error: error instanceof Error ? error.message : "Could not load Pro state" },
            { status: 400 },
          );
        }
      },
    },
  },
});
