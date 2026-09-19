import { createFileRoute } from "@tanstack/react-router";
import { deleteInvoice, getInvoice, upsertInvoice } from "@/lib/server-store.server";
import { getRequestUserId, requireRequestUserId } from "@/lib/request-auth.server";
import type { Invoice } from "@/lib/types";

export const Route = createFileRoute("/api/invoices/$id")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        try {
          const userId = await requireRequestUserId(request);
          const invoice = await getInvoice(params.id, userId);
          if (!invoice) return Response.json({ error: "Not found" }, { status: 404 });
          return Response.json(invoice);
        } catch (err) {
          return Response.json({ error: err instanceof Error ? err.message : "Unauthorized" }, { status: 401 });
        }
      },
      PUT: async ({ params, request }) => {
        try {
          const userId = await getRequestUserId(request);
          const existing = await getInvoice(params.id, userId ?? undefined);
          if (existing?.userId && !userId) {
            return Response.json({ error: "Sign in required to update this invoice." }, { status: 401 });
          }
          const body = (await request.json()) as Partial<Invoice>;
          const merged: Invoice = {
            ...(existing ?? (body as Invoice)),
            ...body,
            id: params.id,
            userId: userId ?? undefined,
          };
          if (!merged.number || !merged.client || !merged.lineItems) {
            return Response.json({ error: "Invalid invoice" }, { status: 400 });
          }
          const saved = await upsertInvoice(merged, userId ?? undefined);
          return Response.json(saved);
        } catch (err) {
          return Response.json({ error: err instanceof Error ? err.message : "Could not update invoice" }, { status: 401 });
        }
      },
      DELETE: async ({ params, request }) => {
        try {
          const userId = await requireRequestUserId(request);
          const ok = await deleteInvoice(params.id, userId);
          return Response.json({ ok });
        } catch (err) {
          return Response.json({ error: err instanceof Error ? err.message : "Unauthorized" }, { status: 401 });
        }
      },
    },
  },
});
