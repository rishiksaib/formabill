import { DEFAULT_SETTINGS, type BusinessSettings, type Invoice, type LineItem } from "@/lib/types";
import { isoDate, nextInvoiceNumber, uid } from "@/lib/utils";

export function emptyLineItem(): LineItem {
  return { id: uid(), description: "", quantity: 1, rate: 0 };
}

export function createDraftInvoice(
  settings: BusinessSettings = DEFAULT_SETTINGS,
  existingNumbers: string[] = [],
): Invoice {
  return {
    id: uid(),
    number: nextInvoiceNumber(existingNumbers),
    fromName: settings.name || "",
    fromEmail: settings.email || "",
    fromAddress: settings.address || "",
    logoUrl: settings.logoUrl || "",
    client: { id: uid(), name: "", email: "" },
    lineItems: [emptyLineItem()],
    taxRate: settings.defaultTaxRate ?? 0,
    notes: "",
    dueDate: isoDate(14),
    status: "draft",
    createdAt: new Date().toISOString(),
    currency: settings.defaultCurrency || "USD",
    paymentMethods: { ...(settings.paymentMethods || {}) },
    reminderEnabled: false,
    recurrence: {
      enabled: false,
      frequency: "monthly",
    },
  };
}

export function applySettingsToInvoice(invoice: Invoice, settings: BusinessSettings): Invoice {
  return {
    ...invoice,
    fromName: settings.name || invoice.fromName,
    fromEmail: settings.email || invoice.fromEmail,
    fromAddress: settings.address || invoice.fromAddress,
    logoUrl: settings.logoUrl || invoice.logoUrl,
    currency: settings.defaultCurrency || invoice.currency || "USD",
    paymentMethods: { ...(settings.paymentMethods || {}), ...(invoice.paymentMethods || {}) },
  };
}
