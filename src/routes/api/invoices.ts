import { createFileRoute } from "@tanstack/react-router";
import { countInvoicesForMonth, getInvoice, listInvoices, upsertInvoice } from "@/lib/server-store.server";
import { requireFreeTierRequestUserId } from "@/lib/request-auth.server";
import { checkRateLimit, clientIp, rateLimitedResponse } from "@/lib/rate-limit.server";
import { isProUser } from "@/lib/user-plan.server";
import type { Invoice } from "@/lib/types";

export const Route = createFileRoute("/api/invoices")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const userId = await requireFreeTierRequestUserId();
          const invoices = await listInvoices(userId);
          return Response.json({ invoices });
        } catch (err) {
          return Response.json({ error: err instanceof Error ? err.message : "Could not load invoices" }, { status: 400 });
        }
      },
      POST: async ({ request }) => {
        try {
          const limit = checkRateLimit(`invoices:POST:${clientIp(request)}`, 30, 60_000);
          if (!limit.allowed) return rateLimitedResponse(limit.retryAfterSec);
          const userId = await requireFreeTierRequestUserId();
          const body = (await request.json()) as Invoice;
          if (!body?.id || !body.number) {
            return Response.json({ error: "Invoice id and number are required" }, { status: 400 });
          }
          const existing = await getInvoice(body.id, userId);
          if (userId && !existing && !(await isProUser(userId)) && (await countInvoicesForMonth(userId)) >= 5) {
            return Response.json(
              { error: "Free plan limit reached: 5 invoices per month. Upgrade to Pro to continue." },
              { status: 402 },
            );
          }
          const saved = await upsertInvoice(
            { ...body, userId },
            userId,
          );
          return Response.json(saved);
        } catch (err) {
          return Response.json(
            { error: err instanceof Error ? err.message : "Could not save invoice" },
            { status: 400 },
          );
        }
      },
    },
  },
});
