import { createFileRoute } from "@tanstack/react-router";
import { getFreeTierUserId, getRequestUserId } from "@/lib/request-auth.server";
import { isProUser } from "@/lib/user-plan.server";
import { platformBillingConfigured } from "@/lib/platform-billing.server";

export const Route = createFileRoute("/api/pro/status")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const userId = await getFreeTierUserId();
        const sessionUserId = await getRequestUserId();
        return Response.json({
          isPro: userId ? await isProUser(userId) : false,
          configured: platformBillingConfigured(),
          authenticated: Boolean(sessionUserId),
        });
      },
    },
  },
});