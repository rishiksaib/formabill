import { createFileRoute } from "@tanstack/react-router";
import { createDraftInvoice } from "@/lib/invoice-defaults";
import { listInvoices, upsertInvoice } from "@/lib/server-store.server";
import { requireRequestUserId } from "@/lib/request-auth.server";
import type { Invoice } from "@/lib/types";
import { addFrequency, isoDate, nextInvoiceNumber } from "@/lib/utils";

export const Route = createFileRoute("/api/recurring/process")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const userId = await requireRequestUserId(request);
        const all = await listInvoices(userId);
        const now = Date.now();
        const generated: Invoice[] = [];
        const numbers = all.map((i) => i.number);

        for (const parent of all) {
          const rec = parent.recurrence;
          if (!rec?.enabled) continue;
          const nextRun = rec.nextRunAt ? Date.parse(rec.nextRunAt) : NaN;
          if (!Number.isFinite(nextRun) || nextRun > now) continue;
          if (rec.endDate && Date.parse(rec.endDate) < now) continue;

          const child = createDraftInvoice(
            {
              name: parent.fromName,
              email: parent.fromEmail,
              address: parent.fromAddress,
              logoUrl: parent.logoUrl,
              defaultCurrency: parent.currency || "USD",
              defaultTaxRate: parent.taxRate,
            },
            [...numbers, ...generated.map((g) => g.number)],
          );
          const dueOffset = parent.dueDate
            ? Math.max(1, Math.round((Date.parse(parent.dueDate) - Date.parse(parent.createdAt)) / 86400000))
            : 14;
          const next: Invoice = {
            ...child,
            number: nextInvoiceNumber([...numbers, ...generated.map((g) => g.number)]),
            fromName: parent.fromName,
            fromEmail: parent.fromEmail,
            fromAddress: parent.fromAddress,
            logoUrl: parent.logoUrl,
            client: { ...parent.client },
            lineItems: parent.lineItems.map((item) => ({ ...item, id: item.id + "-r" + Date.now() })),
            taxRate: parent.taxRate,
            notes: parent.notes,
            dueDate: isoDate(dueOffset),
            status: "sent",
            parentRecurringId: parent.id,
            recurrence: { enabled: false, frequency: rec.frequency },
            reminderEnabled: parent.reminderEnabled,
            currency: parent.currency,
            paymentMethods: parent.paymentMethods,
            userId,
          };
          const saved = await upsertInvoice(next, userId);
          generated.push(saved);

          await upsertInvoice({
            ...parent,
            recurrence: {
              ...rec,
              lastGeneratedAt: new Date().toISOString(),
              nextRunAt: addFrequency(new Date().toISOString(), rec.frequency),
            },
          }, userId);
        }

        return Response.json({ generated: generated.length, invoices: generated });
      },
    },
  },
});
