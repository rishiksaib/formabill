import { createFileRoute } from "@tanstack/react-router";
import { UnauthorizedError } from "@/lib/auth/verify.server";
import { requireRequestUserId } from "@/lib/request-auth.server";
import { createPlatformProCheckout, isProPlan } from "@/lib/platform-billing.server";

export const Route = createFileRoute("/api/pro/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // Pro is a per-user subscription — the buyer must be signed in so the
          // webhook can flip their own user record. Free-tier invoice flows
          // stay anonymous; this one never does.
          const userId = await requireRequestUserId();
          const body = (await request.json().catch(() => ({}))) as {
            plan?: unknown;
            method?: unknown;
          };
          const plan = isProPlan(body.plan) ? body.plan : "pro_monthly";
          // Modal (Orders API) by default; hosted link only as an explicit fallback.
          const method = body.method === "link" ? "link" : "modal";
          const checkout = await createPlatformProCheckout(userId, request, plan, method);
          return Response.json(checkout, { status: checkout.configured ? 200 : 503 });
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            return Response.json(
              { error: "Sign in to get Pro — checkout links to your account." },
              { status: 401 },
            );
          }
          return Response.json(
            { error: error instanceof Error ? error.message : "Could not start Pro checkout" },
            { status: 400 },
          );
        }
      },
    },
  },
});
