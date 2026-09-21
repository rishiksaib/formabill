import { createFileRoute } from "@tanstack/react-router";
import {
  fetchPlatformOrderNotes,
  verifyPlatformWebhookSignature,
} from "@/lib/platform-billing.server";
import { maybeRewardReferrer } from "@/lib/referrals.server";
import { setUserPro, setUserProPlan } from "@/lib/user-plan.server";

type PlatformWebhook = {
  event?: string;
  payload?: {
    payment?: { entity?: { id?: string; order_id?: string; notes?: { userId?: string; plan?: string } } };
    order?: { entity?: { id?: string; notes?: { userId?: string; plan?: string } } };
    payment_link?: { entity?: { notes?: { userId?: string; plan?: string } } };
  };
};

function validPlan(plan: unknown): plan is "pro_monthly" | "pro_yearly" {
  return plan === "pro_monthly" || plan === "pro_yearly";
}

/**
 * Platform webhook — the source of truth for Pro activation.
 *
 * Accepted events (all verified by signature):
 * - `order.paid` — Checkout modal / Orders API (primary path).
 * - `payment.captured` — same flow; user/plan resolved from the parent order.
 * - `payment_link.paid` — legacy hosted-link fallback path.
 */
export const Route = createFileRoute("/api/webhooks/razorpay-platform")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        if (!verifyPlatformWebhookSignature(raw, request.headers.get("x-razorpay-signature"))) {
          return Response.json({ error: "Invalid signature" }, { status: 400 });
        }
        let event: PlatformWebhook;
        try {
          event = JSON.parse(raw) as PlatformWebhook;
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const entity = event.payload ?? {};

        let userId: string | undefined;
        let plan: string | undefined;
        if (event.event === "order.paid" && entity.order?.entity) {
          userId = entity.order.entity.notes?.userId;
          plan = entity.order.entity.notes?.plan;
        } else if (event.event === "payment.captured" && entity.payment?.entity) {
          const payment = entity.payment.entity;
          userId = payment.notes?.userId;
          plan = payment.notes?.plan;
          // Payments don't always carry order notes — resolve via the order.
          if ((!userId || !validPlan(plan)) && payment.order_id) {
            const orderNotes = await fetchPlatformOrderNotes(payment.order_id);
            userId = orderNotes?.userId ?? userId;
            plan = validPlan(orderNotes?.plan) ? orderNotes?.plan : plan;
          }
        } else if (event.event === "payment_link.paid" && entity.payment_link?.entity) {
          userId = entity.payment_link.entity.notes?.userId;
          plan = entity.payment_link.entity.notes?.plan;
        } else {
          return Response.json({ ok: true, ignored: event.event });
        }

        if (!userId || !validPlan(plan)) {
          return Response.json({ error: "Missing Pro checkout metadata" }, { status: 400 });
        }
        await setUserPro(userId, true);
        await setUserProPlan(userId, plan);
        // A paid conversion may complete a pending referral reward (+1 month).
        await maybeRewardReferrer(userId);
        return Response.json({ ok: true, userId, plan });
      },
    },
  },
});
