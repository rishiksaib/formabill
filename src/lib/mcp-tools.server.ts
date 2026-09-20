import { createDraftInvoice } from "@/lib/invoice-defaults";
import {
  STUDIO_CURRENCIES,
  getStudioSettings,
  listServerClients,
  publicStudioSettings,
  saveServerClient,
  updateStudioSettings,
} from "@/lib/mcp-store.server";
import { createPaymentLink } from "@/lib/razorpay.server";
import {
  getInvoice,
  listInvoices,
  markInvoicePaid,
  upsertInvoice,
} from "@/lib/server-store.server";
import type { Invoice, InvoiceStatus } from "@/lib/types";
import { invoiceSubtotal, invoiceTax, invoiceTotal, isoDate, nextInvoiceNumber, uid } from "@/lib/utils";

export type McpToolResult = {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
};

type ToolDef = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  run: (userId: string, args: Record<string, unknown>) => Promise<unknown>;
};

function text(value: unknown): McpToolResult {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }] };
}

function fail(message: string): McpToolResult {
  return { content: [{ type: "text", text: message }], isError: true };
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  throw new Error("Arguments must be an object.");
}

function asString(value: unknown, field: string, required = false): string {
  if (value === undefined || value === null) {
    if (required) throw new Error(`"${field}" is required.`);
    return "";
  }
  if (typeof value !== "string") throw new Error(`"${field}" must be a string.`);
  const trimmed = value.trim();
  if (required && !trimmed) throw new Error(`"${field}" is required.`);
  return trimmed;
}

function asNumber(value: unknown, field: string, fallback = 0): number {
  if (value === undefined || value === null) return fallback;
  const num = Number(value);
  if (!Number.isFinite(num)) throw new Error(`"${field}" must be a number.`);
  return num;
}

function invoiceSummary(invoice: Invoice) {
  return {
    id: invoice.id,
    number: invoice.number,
    status: invoice.status,
    currency: invoice.currency || "USD",
    total: invoiceTotal(invoice.lineItems, invoice.taxRate),
    dueDate: invoice.dueDate,
    client: { name: invoice.client.name, email: invoice.client.email },
    paymentLinkUrl: invoice.paymentLinkUrl || null,
  };
}

const lineItemSchema = {
  type: "object",
  required: ["description", "rate"],
  properties: {
    description: { type: "string", description: "Line description, e.g. 'Brand identity'" },
    quantity: { type: "number", default: 1 },
    rate: { type: "number", description: "Unit price in the invoice currency" },
  },
};

function toLineItems(value: unknown) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error('"lineItems" must be a non-empty array.');
  }
  return value.map((raw) => {
    const item = asRecord(raw);
    const description = asString(item.description, "lineItems[].description", true);
    const quantity = asNumber(item.quantity, "lineItems[].quantity", 1);
    const rate = asNumber(item.rate, "lineItems[].rate");
    if (quantity <= 0) throw new Error('"lineItems[].quantity" must be above 0.');
    if (rate < 0) throw new Error('"lineItems[].rate" must be 0 or above.');
    return { id: uid(), description, quantity, rate };
  });
}

const TOOLS: ToolDef[] = [
  {
    name: "list_invoices",
    description: "List the user's invoices, newest first, with totals and payment status.",
    inputSchema: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["draft", "sent", "paid"], description: "Filter by status" },
        limit: { type: "number", description: "Max invoices to return (default 50, max 100)" },
      },
    },
    run: async (userId, raw) => {
      const args = asRecord(raw);
      const limit = Math.min(Math.max(Math.floor(asNumber(args.limit, "limit", 50)), 1), 100);
      const all = await listInvoices(userId);
      const status = asString(args.status, "status");
      const filtered = status ? all.filter((inv) => inv.status === status) : all;
      return filtered.slice(0, limit).map(invoiceSummary);
    },
  },
  {
    name: "get_invoice",
    description: "Get one invoice in full, including line items and payment details.",
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: { id: { type: "string", description: "Invoice id or number" } },
    },
    run: async (userId, raw) => {
      const args = asRecord(raw);
      const invoice = await getInvoice(asString(args.id, "id", true), userId);
      if (!invoice) {
        throw new Error(
          'Invoice not found. Use list_invoices to find the id (pass the "id", not the number, when both exist).',
        );
      }
      return {
        ...invoice,
        totals: {
          subtotal: invoiceSubtotal(invoice.lineItems),
          tax: invoiceTax(invoice.lineItems, invoice.taxRate),
          total: invoiceTotal(invoice.lineItems, invoice.taxRate),
          currency: invoice.currency || "USD",
        },
      };
    },
  },
  {
    name: "create_invoice",
    description:
      "Create a draft invoice for the user's client. From-name, currency, tax, and payment methods default from studio settings.",
    inputSchema: {
      type: "object",
      required: ["client", "lineItems"],
      properties: {
        client: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string" },
            email: { type: "string" },
          },
        },
        lineItems: { type: "array", items: lineItemSchema },
        currency: { type: "string", enum: [...STUDIO_CURRENCIES] },
        taxRate: { type: "number" },
        dueDate: { type: "string", description: "ISO date, defaults to 14 days out" },
        notes: { type: "string" },
        status: { type: "string", enum: ["draft", "sent"] },
      },
    },
    run: async (userId, raw) => {
      const args = asRecord(raw);
      const client = asRecord(args.client ?? {});
      const clientName = asString(client.name, "client.name", true);
      const clientEmail = asString(client.email, "client.email");
      const settings = await getStudioSettings(userId);
      const existing = await listInvoices(userId);
      const draft = createDraftInvoice(settings, existing.map((inv) => inv.number));
      const currency = asString(args.currency, "currency") || settings.defaultCurrency || "USD";
      if (!STUDIO_CURRENCIES.includes(currency as (typeof STUDIO_CURRENCIES)[number])) {
        throw new Error(`"currency" must be one of ${STUDIO_CURRENCIES.join(", ")}.`);
      }
      const status = asString(args.status, "status") || "draft";
      if (status !== "draft" && status !== "sent") throw new Error('"status" must be draft or sent.');
      const saved = await upsertInvoice(
        {
          ...draft,
          id: draft.id,
          number: nextInvoiceNumber(existing.map((inv) => inv.number)),
          client: { id: uid(), name: clientName, email: clientEmail },
          lineItems: toLineItems(args.lineItems),
          currency,
          taxRate: asNumber(args.taxRate, "taxRate", settings.defaultTaxRate ?? 0),
          dueDate: asString(args.dueDate, "dueDate") || isoDate(14),
          notes: asString(args.notes, "notes"),
          status: status as InvoiceStatus,
          userId,
        },
        userId,
      );
      return invoiceSummary(saved);
    },
  },
  {
    name: "update_invoice",
    description: "Patch an existing invoice (client, line items, tax, notes, due date, status, payment methods).",
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string", description: "Invoice id" },
        client: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
          },
        },
        lineItems: { type: "array", items: lineItemSchema },
        currency: { type: "string", enum: [...STUDIO_CURRENCIES] },
        taxRate: { type: "number" },
        notes: { type: "string" },
        dueDate: { type: "string" },
        status: { type: "string", enum: ["draft", "sent", "paid"] },
      },
    },
    run: async (userId, raw) => {
      const args = asRecord(raw);
      const existing = await getInvoice(asString(args.id, "id", true), userId);
      if (!existing) throw new Error("Invoice not found.");
      const next: Invoice = { ...existing, userId };
      if (args.client !== undefined) {
        const client = asRecord(args.client);
        next.client = {
          ...existing.client,
          ...(client.name !== undefined ? { name: asString(client.name, "client.name", true) } : {}),
          ...(client.email !== undefined ? { email: asString(client.email, "client.email") } : {}),
        };
      }
      if (args.lineItems !== undefined) next.lineItems = toLineItems(args.lineItems);
      if (args.currency !== undefined) {
        const currency = asString(args.currency, "currency", true);
        if (!STUDIO_CURRENCIES.includes(currency as (typeof STUDIO_CURRENCIES)[number])) {
          throw new Error(`"currency" must be one of ${STUDIO_CURRENCIES.join(", ")}.`);
        }
        next.currency = currency;
      }
      if (args.taxRate !== undefined) next.taxRate = asNumber(args.taxRate, "taxRate");
      if (args.notes !== undefined) next.notes = asString(args.notes, "notes");
      if (args.dueDate !== undefined) next.dueDate = asString(args.dueDate, "dueDate", true);
      if (args.status !== undefined) {
        const status = asString(args.status, "status", true);
        if (status !== "draft" && status !== "sent" && status !== "paid") {
          throw new Error('"status" must be draft, sent, or paid.');
        }
        next.status = status as InvoiceStatus;
      }
      const saved = await upsertInvoice(next, userId);
      return invoiceSummary(saved);
    },
  },
  {
    name: "mark_invoice_paid",
    description: "Mark an invoice as paid after the client has paid (manual payments).",
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: { id: { type: "string", description: "Invoice id" } },
    },
    run: async (userId, raw) => {
      const args = asRecord(raw);
      const id = asString(args.id, "id", true);
      const existing = await getInvoice(id, userId);
      if (!existing) throw new Error("Invoice not found.");
      const paid = await markInvoicePaid(existing.id);
      return invoiceSummary({ ...existing, ...(paid ?? {}), status: "paid" as InvoiceStatus });
    },
  },
  {
    name: "create_payment_link",
    description:
      "Create a Razorpay payment link for an invoice. Uses the studio's stored Razorpay keys unless keyId/keySecret are passed. Without keys, returns guidance instead of a link.",
    inputSchema: {
      type: "object",
      required: ["invoiceId"],
      properties: {
        invoiceId: { type: "string" },
        keyId: { type: "string", description: "Razorpay Key ID (overrides stored keys)" },
        keySecret: { type: "string", description: "Razorpay Key Secret (overrides stored keys)" },
      },
    },
    run: async (userId, raw) => {
      const args = asRecord(raw);
      const invoiceId = asString(args.invoiceId, "invoiceId", true);
      const invoice = (await getInvoice(invoiceId, userId)) ?? (await getInvoice(invoiceId));
      if (!invoice) throw new Error("Invoice not found. Publish it first.");
      const settings = await getStudioSettings(userId);
      const link = await createPaymentLink(invoice, undefined, {
        keyId: asString(args.keyId, "keyId") || settings.paymentMethods?.razorpayKeyId,
        keySecret: asString(args.keySecret, "keySecret") || settings.paymentMethods?.razorpayKeySecret,
      });
      if (link.demo) {
        return {
          demo: true,
          message:
            link.message ?? "Add UPI in Settings or connect Razorpay to collect online payments.",
          invoice: invoiceSummary(invoice),
        };
      }
      const updated = await upsertInvoice(
        {
          ...invoice,
          userId,
          status: invoice.status === "paid" ? "paid" : "sent",
          paymentLinkId: link.id,
          paymentLinkUrl: link.shortUrl,
        },
        userId,
      );
      return { demo: false, id: link.id, shortUrl: link.shortUrl, invoice: invoiceSummary(updated) };
    },
  },
  {
    name: "list_clients",
    description: "List saved clients plus clients seen on the user's invoices.",
    inputSchema: { type: "object", properties: {} },
    run: async (userId) => {
      const [stored, invoices] = await Promise.all([
        listServerClients(userId),
        listInvoices(userId),
      ]);
      const seen = new Map<string, { name: string; email: string }>();
      for (const client of stored) {
        seen.set(client.email ? `e:${client.email.toLowerCase()}` : `n:${client.name}`, {
          name: client.name,
          email: client.email,
        });
      }
      for (const invoice of invoices) {
        const name = invoice.client.name.trim();
        const email = invoice.client.email.trim();
        if (!name && !email) continue;
        const key = email ? `e:${email.toLowerCase()}` : `n:${name}`;
        if (!seen.has(key)) seen.set(key, { name: name || email, email });
      }
      return [...seen.values()];
    },
  },
  {
    name: "create_client",
    description: "Save a client for reuse on future invoices.",
    inputSchema: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
        email: { type: "string" },
      },
    },
    run: async (userId, raw) => {
      const args = asRecord(raw);
      return saveServerClient(userId, {
        name: asString(args.name, "name", true),
        email: asString(args.email, "email"),
      });
    },
  },
  {
    name: "get_studio_settings",
    description: "Read the studio profile, defaults, and payment methods (secrets are masked).",
    inputSchema: { type: "object", properties: {} },
    run: async (userId) => {
      return publicStudioSettings(await getStudioSettings(userId));
    },
  },
  {
    name: "update_studio_settings",
    description:
      "Update the studio profile, invoice defaults, or payment methods. Only provided fields change.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        address: { type: "string" },
        defaultCurrency: { type: "string", enum: [...STUDIO_CURRENCIES] },
        defaultTaxRate: { type: "number" },
        upiId: { type: "string" },
        paypalEmail: { type: "string" },
        bankName: { type: "string" },
        bankAccountName: { type: "string" },
        bankAccount: { type: "string" },
        bankIfscSwift: { type: "string" },
      },
    },
    run: async (userId, raw) => {
      const args = asRecord(raw);
      const patch: Record<string, unknown> = {};
      for (const field of ["name", "email", "address"] as const) {
        if (args[field] !== undefined) patch[field] = asString(args[field], field);
      }
      if (args.defaultCurrency !== undefined) {
        const currency = asString(args.defaultCurrency, "defaultCurrency", true);
        if (!STUDIO_CURRENCIES.includes(currency as (typeof STUDIO_CURRENCIES)[number])) {
          throw new Error(`"defaultCurrency" must be one of ${STUDIO_CURRENCIES.join(", ")}.`);
        }
        patch.defaultCurrency = currency;
      }
      if (args.defaultTaxRate !== undefined) {
        const tax = asNumber(args.defaultTaxRate, "defaultTaxRate");
        if (tax < 0) throw new Error('"defaultTaxRate" must be 0 or above.');
        patch.defaultTaxRate = tax;
      }
      const paymentFields = [
        "upiId",
        "paypalEmail",
        "bankName",
        "bankAccountName",
        "bankAccount",
        "bankIfscSwift",
      ] as const;
      const paymentMethods: Record<string, string> = {};
      for (const field of paymentFields) {
        if (args[field] !== undefined) paymentMethods[field] = asString(args[field], field);
      }
      const updated = await updateStudioSettings(userId, {
        ...(patch as Parameters<typeof updateStudioSettings>[1]),
        ...(Object.keys(paymentMethods).length > 0 ? { paymentMethods } : {}),
      });
      return publicStudioSettings(updated);
    },
  },
];

export function listMcpTools() {
  return TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema }));
}

/** Run a tool for a user. Tool-level failures resolve (never reject). */
export async function callMcpTool(
  userId: string,
  name: string,
  args: unknown,
): Promise<McpToolResult> {
  const tool = TOOLS.find((t) => t.name === name);
  if (!tool) {
    return fail(
      `Unknown tool "${String(name)}". Available tools: ${TOOLS.map((t) => t.name).join(", ")}.`,
    );
  }
  try {
    return text(await tool.run(userId, asRecord(args ?? {})));
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Tool failed.");
  }
}
