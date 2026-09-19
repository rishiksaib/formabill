import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Invoice } from "@/lib/types";

const FILE_CANDIDATES = [
  path.join(process.cwd(), "data", "invoices.json"),
  "/tmp/formabill-invoices.json",
];

type StoreShape = { invoices: Invoice[] };

let memory: StoreShape = { invoices: [] };
let loaded = false;
let filePath: string | null = null;
let writeQueue: Promise<void> = Promise.resolve();

async function load(): Promise<StoreShape> {
  if (loaded) return memory;
  for (const candidate of FILE_CANDIDATES) {
    try {
      const raw = await readFile(candidate, "utf8");
      const parsed = JSON.parse(raw) as StoreShape;
      memory = { invoices: Array.isArray(parsed.invoices) ? parsed.invoices : [] };
      filePath = candidate;
      loaded = true;
      return memory;
    } catch {
      // try next
    }
  }
  memory = { invoices: [] };
  filePath = FILE_CANDIDATES[0];
  loaded = true;
  return memory;
}

async function persist(): Promise<void> {
  const payload = `${JSON.stringify(memory, null, 2)}\n`;
  const targets = filePath ? [filePath, ...FILE_CANDIDATES.filter((p) => p !== filePath)] : FILE_CANDIDATES;
  let lastError: unknown;
  for (const target of targets) {
    try {
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, payload, "utf8");
      filePath = target;
      return;
    } catch (err) {
      lastError = err;
    }
  }
  if (lastError) {
    console.warn("[formabill] persist invoices.json failed; using in-memory store", lastError);
  }
}

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(fn, fn);
  writeQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export async function listInvoices(userId?: string): Promise<Invoice[]> {
  const store = await load();
  return userId ? store.invoices.filter((invoice) => invoice.userId === userId) : store.invoices;
}

export async function getInvoice(idOrNumber: string, userId?: string): Promise<Invoice | undefined> {
  const store = await load();
  return store.invoices.find(
    (inv) =>
      (!userId || inv.userId === userId) &&
      (inv.id === idOrNumber || inv.number?.toLowerCase() === idOrNumber.toLowerCase()),
  );
}

export async function upsertInvoice(invoice: Invoice, userId?: string): Promise<Invoice> {
  return enqueue(async () => {
    const store = await load();
    if (userId && invoice.userId && invoice.userId !== userId) {
      throw new Error("Invoice does not belong to this account.");
    }
    const next: Invoice = {
      ...invoice,
      id: invoice.id || crypto.randomUUID(),
      userId: userId || invoice.userId,
      number: invoice.number || "INV-0001",
      createdAt: invoice.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const idx = store.invoices.findIndex(
      (inv) =>
        inv.id === next.id ||
        (inv.number === next.number && (!userId || inv.userId === userId)),
    );
    if (idx >= 0) store.invoices[idx] = next;
    else store.invoices.unshift(next);
    await persist();
    return next;
  });
}

export async function deleteInvoice(id: string, userId?: string): Promise<boolean> {
  return enqueue(async () => {
    const store = await load();
    const before = store.invoices.length;
    store.invoices = store.invoices.filter(
      (inv) =>
        !((!userId || inv.userId === userId) &&
          (inv.id === id || inv.number?.toLowerCase() === id.toLowerCase())),
    );
    if (store.invoices.length === before) return false;
    await persist();
    return true;
  });
}

export async function countInvoicesForMonth(userId: string, now = new Date()): Promise<number> {
  const store = await load();
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).getTime();
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)).getTime();
  return store.invoices.filter((invoice) => {
    if (invoice.userId !== userId) return false;
    const created = Date.parse(invoice.createdAt);
    return created >= start && created < end;
  }).length;
}

export async function markInvoicePaid(id: string): Promise<Invoice | undefined> {
  return enqueue(async () => {
    const store = await load();
    const inv = store.invoices.find((item) => item.id === id);
    if (!inv) return undefined;
    inv.status = "paid";
    inv.updatedAt = new Date().toISOString();
    await persist();
    return inv;
  });
}

export async function findByPaymentLinkId(paymentLinkId: string): Promise<Invoice | undefined> {
  const store = await load();
  return store.invoices.find((inv) => inv.paymentLinkId === paymentLinkId);
}
