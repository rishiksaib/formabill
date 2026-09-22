import { createFileRoute } from "@tanstack/react-router";
import { UnauthorizedError } from "@/lib/auth/verify.server";
import { verifyPlatformPayment } from "@/lib/platform-billing.server";
import { checkRateLimit, clientIp, rateLimitedResponse } from "@/lib/rate-limit.server";
import { maybeRewardReferrer } from "@/lib/referrals.server";
import { requireRequestUserId } from "@/lib/request-auth.server";
import { setUserSubscriptionPro } from "@/lib/user-plan.server";

/**
 * Confirm a Checkout modal payment immediately (webhook stays authoritative).
 *
 * The browser hands over Razorpay's order/payment/signature triple; the
 * secret never leaves the server — we re-verify the HMAC, re-read the order
 * notes, and only then flip this signed-in user's Pro flag. A failed verify
 * simply falls back to waiting for the webhook.
 */
export const Route = createFileRoute("/api/pro/verify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const limit = checkRateLimit(`pro-verify:POST:${clientIp(request)}`, 20, 60_000);
          if (!limit.allowed) return rateLimitedResponse(limit.retryAfterSec);
          const userId = await requireRequestUserId();
          const body = (await request.json().catch(() => ({}))) as {
            orderId?: unknown;
            paymentId?: unknown;
            signature?: unknown;
          };
          const verified = await verifyPlatformPayment(
            userId,
            typeof body.orderId === "string" ? body.orderId : "",
            typeof body.paymentId === "string" ? body.paymentId : "",
            typeof body.signature === "string" ? body.signature : "",
          );
          if (!verified) {
            return Response.json(
              { error: "Payment could not be verified yet — the webhook will activate Pro." },
              { status: 202 },
            );
          }
          await setUserSubscriptionPro(verified.userId, verified.plan);
          await maybeRewardReferrer(verified.userId);
          return Response.json({ ok: true, plan: verified.plan });
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            return Response.json({ error: "Sign in to verify Pro." }, { status: 401 });
          }
          return Response.json(
            { error: error instanceof Error ? error.message : "Could not verify payment" },
            { status: 400 },
          );
        }
      },
    },
  },
});
