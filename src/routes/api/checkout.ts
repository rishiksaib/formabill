import { createFileRoute } from "@tanstack/react-router";
import { createPaymentLink, razorpayConfigured } from "@/lib/razorpay.server";
import { getInvoice, markInvoicePaid, upsertInvoice } from "@/lib/server-store.server";
import { requireFreeTierRequestUserId } from "@/lib/request-auth.server";
import { checkRateLimit, clientIp, rateLimitedResponse } from "@/lib/rate-limit.server";

export const Route = createFileRoute("/api/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const limit = checkRateLimit(`checkout:POST:${clientIp(request)}`, 20, 60_000);
          if (!limit.allowed) return rateLimitedResponse(limit.retryAfterSec);
          const body = (await request.json()) as {
            invoiceId?: string;
            confirmDemo?: boolean;
            razorpayKeyId?: string;
            razorpayKeySecret?: string;
          };
          if (!body.invoiceId) {
            return Response.json({ error: "invoiceId is required" }, { status: 400 });
          }
          const userId = await requireFreeTierRequestUserId();
          const invoice = (await getInvoice(body.invoiceId, userId)) ?? (await getInvoice(body.invoiceId));
          if (!invoice) {
            return Response.json({ error: "Invoice not found. Publish it first." }, { status: 404 });
          }

          if (body.confirmDemo) {
            if (razorpayConfigured()) {
              return Response.json(
                { error: "Demo pay is disabled when Razorpay is configured." },
                { status: 400 },
              );
            }
            const paid = await markInvoicePaid(invoice.id);
            return Response.json({ demo: true, invoice: paid });
          }

          const link = await createPaymentLink(invoice, request, {
            keyId: body.razorpayKeyId,
            keySecret: body.razorpayKeySecret,
          });
          if (link.demo) {
            return Response.json({
              demo: true,
              message: link.message,
              invoice,
            });
          }

          const updated = await upsertInvoice({
            ...invoice,
            userId,
            status: invoice.status === "paid" ? "paid" : "sent",
            paymentLinkId: link.id,
            paymentLinkUrl: link.shortUrl,
          });
          return Response.json({
            demo: false,
            short_url: link.shortUrl,
            id: link.id,
            invoice: updated,
          });
        } catch (err) {
          return Response.json(
            { error: err instanceof Error ? err.message : "Checkout failed" },
            { status: 400 },
          );
        }
      },
    },
  },
});
