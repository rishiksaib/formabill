import { createFileRoute } from "@tanstack/react-router";
import { UnauthorizedError } from "@/lib/auth/verify.server";
import { redeemGiftCode } from "@/lib/gifts.server";
import { checkRateLimit, clientIp, rateLimitedResponse } from "@/lib/rate-limit.server";
import { requireRequestUserId } from "@/lib/request-auth.server";

/** Redeem a gift code onto your own account (any signed-in user). */
export const Route = createFileRoute("/api/gift-codes/redeem")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const limit = checkRateLimit(`gift-redeem:POST:${clientIp(request)}`, 20, 60_000);
          if (!limit.allowed) return rateLimitedResponse(limit.retryAfterSec);
          const userId = await requireRequestUserId();
          const body = (await request.json().catch(() => ({}))) as { code?: unknown };
          const result = await redeemGiftCode(
            userId,
            typeof body.code === "string" ? body.code : "",
          );
          return Response.json({ ok: true, ...result });
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            return Response.json(
              { error: "Sign in to redeem a gift code — Pro lands on your account." },
              { status: 401 },
            );
          }
          return Response.json(
            { error: error instanceof Error ? error.message : "Could not redeem code" },
            { status: 400 },
          );
        }
      },
    },
  },
});
