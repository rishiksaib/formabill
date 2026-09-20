import { createFileRoute } from "@tanstack/react-router";
import { UnauthorizedError } from "@/lib/auth/verify.server";
import { checkRateLimit, clientIp, rateLimitedResponse } from "@/lib/rate-limit.server";
import { attributeReferral } from "@/lib/referrals.server";
import { requireRequestUserId } from "@/lib/request-auth.server";

/** Attribute your signup to a referrer's code (once per account, never yourself). */
export const Route = createFileRoute("/api/referrals/attribute")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const limit = checkRateLimit(`referral-attr:POST:${clientIp(request)}`, 20, 60_000);
          if (!limit.allowed) return rateLimitedResponse(limit.retryAfterSec);
          const userId = await requireRequestUserId();
          const body = (await request.json().catch(() => ({}))) as { code?: unknown };
          await attributeReferral(userId, typeof body.code === "string" ? body.code : "");
          return Response.json({ ok: true });
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            return Response.json({ error: "Sign in first." }, { status: 401 });
          }
          return Response.json(
            { error: error instanceof Error ? error.message : "Could not apply referral" },
            { status: 400 },
          );
        }
      },
    },
  },
});
