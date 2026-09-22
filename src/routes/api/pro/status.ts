import { createFileRoute } from "@tanstack/react-router";
import { getFreeTierUserId, getRequestUserId } from "@/lib/request-auth.server";
import { getUserPlan } from "@/lib/user-plan.server";
import { platformBillingConfigured } from "@/lib/platform-billing.server";

export const Route = createFileRoute("/api/pro/status")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const userId = await getFreeTierUserId();
        const sessionUserId = await getRequestUserId();
        const plan = userId
          ? await getUserPlan(userId)
          : {
              isPro: false,
              isLifetimePro: false,
              proPlan: null,
              proExpiresAt: null,
              proSource: null,
              canGift: false,
              giftsRemaining: 0,
            };
        return Response.json({
          isPro: plan.isPro,
          lifetime: plan.isLifetimePro,
          proSource: plan.proSource,
          proExpiresAt: plan.proExpiresAt,
          configured: platformBillingConfigured(),
          authenticated: Boolean(sessionUserId),
        });
      },
    },
  },
});