import { createFileRoute } from "@tanstack/react-router";
import { requireFreeTierRequestUserId } from "@/lib/request-auth.server";
import { createPlatformProCheckout, isProPlan } from "@/lib/platform-billing.server";

export const Route = createFileRoute("/api/pro/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const userId = await requireFreeTierRequestUserId();
          const body = (await request.json().catch(() => ({}))) as { plan?: unknown };
          const plan = isProPlan(body.plan) ? body.plan : "pro_monthly";
          const checkout = await createPlatformProCheckout(userId, request, plan);
          return Response.json(checkout, { status: checkout.configured ? 200 : 503 });
        } catch (error) {
          return Response.json(
            { error: error instanceof Error ? error.message : "Could not start Pro checkout" },
            { status: 400 },
          );
        }
      },
    },
  },
});