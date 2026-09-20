import { createFileRoute } from "@tanstack/react-router";
import { verifyPlatformWebhookSignature } from "@/lib/platform-billing.server";
import { maybeRewardReferrer } from "@/lib/referrals.server";
import { setUserPro, setUserProPlan } from "@/lib/user-plan.server";

type PlatformWebhook = {
  event?: string;
  payload?: { payment_link?: { entity?: { notes?: { userId?: string; plan?: string } } } };
};

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
        if (event.event !== "payment_link.paid") {
          return Response.json({ ok: true, ignored: event.event });
        }
        const notes = event.payload?.payment_link?.entity?.notes;
        if (!notes?.userId || (notes.plan !== "pro_monthly" && notes.plan !== "pro_yearly")) {
          return Response.json({ error: "Missing Pro checkout metadata" }, { status: 400 });
        }
        await setUserPro(notes.userId, true);
        await setUserProPlan(notes.userId, notes.plan);
        // A paid conversion may complete a pending referral reward (+1 month).
        await maybeRewardReferrer(notes.userId);
        return Response.json({ ok: true, userId: notes.userId, plan: notes.plan });
      },
    },
  },
});