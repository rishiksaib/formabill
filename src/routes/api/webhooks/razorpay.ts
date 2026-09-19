import { createFileRoute } from "@tanstack/react-router";
import { verifyWebhookSignature } from "@/lib/razorpay.server";
import { findByPaymentLinkId, markInvoicePaid } from "@/lib/server-store.server";

type RazorpayWebhook = {
  event?: string;
  payload?: {
    payment_link?: { entity?: { id?: string; notes?: { invoiceId?: string } } };
    payment?: { entity?: { notes?: { invoiceId?: string } } };
  };
};

export const Route = createFileRoute("/api/webhooks/razorpay")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        const signature = request.headers.get("x-razorpay-signature");
        if (!verifyWebhookSignature(raw, signature)) {
          return Response.json({ error: "Invalid signature" }, { status: 400 });
        }
        let event: RazorpayWebhook;
        try {
          event = JSON.parse(raw) as RazorpayWebhook;
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const invoiceId =
          event.payload?.payment_link?.entity?.notes?.invoiceId ||
          event.payload?.payment?.entity?.notes?.invoiceId;
        const linkId = event.payload?.payment_link?.entity?.id;

        const paidEvents = new Set([
          "payment_link.paid",
          "payment.captured",
          "order.paid",
        ]);
        if (!event.event || !paidEvents.has(event.event)) {
          return Response.json({ ok: true, ignored: event.event });
        }

        let invoice = invoiceId ? await markInvoicePaid(invoiceId) : undefined;
        if (!invoice && linkId) {
          const found = await findByPaymentLinkId(linkId);
          if (found) invoice = await markInvoicePaid(found.id);
        }

        return Response.json({ ok: true, invoiceId: invoice?.id ?? invoiceId ?? null });
      },
    },
  },
});
