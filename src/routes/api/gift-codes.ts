import { createFileRoute } from "@tanstack/react-router";
import { UnauthorizedError } from "@/lib/auth/verify.server";
import {
  GIFT_GRANTS,
  GiftProRequiredError,
  GiftQuotaExhaustedError,
  createGiftCode,
  listGiftCodes,
} from "@/lib/gifts.server";
import { getUserPlan } from "@/lib/user-plan.server";
import { checkRateLimit, clientIp, rateLimitedResponse } from "@/lib/rate-limit.server";
import { requireRequestUserId } from "@/lib/request-auth.server";

/**
 * Gift codes. Listing needs sign-in; creating needs a paid subscription with
 * remaining quota. The grant is fixed by the granter's own plan (monthly → 7
 * days, yearly → 30 days) — recipients can never mint, so free Pro ends here.
 */
export const Route = createFileRoute("/api/gift-codes")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const userId = await requireRequestUserId();
          const [codes, plan] = await Promise.all([
            listGiftCodes(userId),
            getUserPlan(userId).catch(() => null),
          ]);
          const grant =
            plan?.proSource === "subscription"
              ? GIFT_GRANTS[plan.proPlan === "pro_yearly" ? "pro_yearly" : "pro_monthly"]
              : null;
          return Response.json({
            codes,
            canGift: plan?.canGift ?? false,
            giftsRemaining: plan?.giftsRemaining ?? 0,
            proSource: plan?.proSource ?? null,
            grantDays: grant?.days ?? null,
            grantLabel: grant
              ? plan?.proPlan === "pro_yearly"
                ? "1 friend · 1 month Pro · 1 code/year"
                : "1 friend · 7 days Pro · 1 code/month"
              : null,
          });
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            return Response.json({ error: "Sign in to manage gift codes." }, { status: 401 });
          }
          if (error instanceof GiftProRequiredError) {
            return Response.json(
              { codes: [], canGift: false, giftsRemaining: 0, proSource: null, error: error.message },
              { status: 402 },
            );
          }
          return Response.json(
            { error: error instanceof Error ? error.message : "Could not load gift codes" },
            { status: 400 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const limit = checkRateLimit(`gift-codes:POST:${clientIp(request)}`, 20, 60_000);
          if (!limit.allowed) return rateLimitedResponse(limit.retryAfterSec);
          const userId = await requireRequestUserId();
          await request.json().catch(() => ({}));
          const created = await createGiftCode(userId);
          return Response.json(created);
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            return Response.json({ error: "Sign in to manage gift codes." }, { status: 401 });
          }
          if (error instanceof GiftProRequiredError) {
            return Response.json({ error: error.message }, { status: error.status });
          }
          if (error instanceof GiftQuotaExhaustedError) {
            return Response.json({ error: error.message }, { status: error.status });
          }
          return Response.json(
            { error: error instanceof Error ? error.message : "Could not create gift code" },
            { status: 400 },
          );
        }
      },
    },
  },
});
