import path from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";
//#region node_modules/.nitro/vite/services/ssr/assets/server-store.server-L3sWWelb.js
var FILE_CANDIDATES = [path.join(process.cwd(), "data", "invoices.json"), "/tmp/formabill-invoices.json"];
var memory = { invoices: [] };
var loaded = false;
var filePath = null;
var writeQueue = Promise.resolve();
async function load() {
	if (loaded) return memory;
	for (const candidate of FILE_CANDIDATES) try {
		const raw = await readFile(candidate, "utf8");
		const parsed = JSON.parse(raw);
		memory = { invoices: Array.isArray(parsed.invoices) ? parsed.invoices : [] };
		filePath = candidate;
		loaded = true;
		return memory;
	} catch {}
	memory = { invoices: [] };
	filePath = FILE_CANDIDATES[0];
	loaded = true;
	return memory;
}
async function persist() {
	const payload = `${JSON.stringify(memory, null, 2)}\n`;
	const targets = filePath ? [filePath, ...FILE_CANDIDATES.filter((p) => p !== filePath)] : FILE_CANDIDATES;
	let lastError;
	for (const target of targets) try {
		await mkdir(path.dirname(target), { recursive: true });
		await writeFile(target, payload, "utf8");
		filePath = target;
		return;
	} catch (err) {
		lastError = err;
	}
	if (lastError) console.warn("[formabill] persist invoices.json failed; using in-memory store", lastError);
}
function enqueue(fn) {
	const run = writeQueue.then(fn, fn);
	writeQueue = run.then(() => void 0, () => void 0);
	return run;
}
async function listInvoices(userId) {
	const store = await load();
	return userId ? store.invoices.filter((invoice) => invoice.userId === userId) : store.invoices;
}
async function getInvoice(idOrNumber, userId) {
	return (await load()).invoices.find((inv) => (!userId || inv.userId === userId) && (inv.id === idOrNumber || inv.number?.toLowerCase() === idOrNumber.toLowerCase()));
}
async function upsertInvoice(invoice, userId) {
	return enqueue(async () => {
		const store = await load();
		if (userId && invoice.userId && invoice.userId !== userId) throw new Error("Invoice does not belong to this account.");
		const next = {
			...invoice,
			id: invoice.id || crypto.randomUUID(),
			userId: userId || invoice.userId,
			number: invoice.number || "INV-0001",
			createdAt: invoice.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		const idx = store.invoices.findIndex((inv) => inv.id === next.id || inv.number === next.number && (!userId || inv.userId === userId));
		if (idx >= 0) store.invoices[idx] = next;
		else store.invoices.unshift(next);
		await persist();
		return next;
	});
}
async function deleteInvoice(id, userId) {
	return enqueue(async () => {
		const store = await load();
		const before = store.invoices.length;
		store.invoices = store.invoices.filter((inv) => !((!userId || inv.userId === userId) && (inv.id === id || inv.number?.toLowerCase() === id.toLowerCase())));
		if (store.invoices.length === before) return false;
		await persist();
		return true;
	});
}
async function countInvoicesForMonth(userId, now = /* @__PURE__ */ new Date()) {
	const store = await load();
	const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).getTime();
	const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)).getTime();
	return store.invoices.filter((invoice) => {
		if (invoice.userId !== userId) return false;
		const created = Date.parse(invoice.createdAt);
		return created >= start && created < end;
	}).length;
}
async function markInvoicePaid(id) {
	return enqueue(async () => {
		const inv = (await load()).invoices.find((item) => item.id === id);
		if (!inv) return void 0;
		inv.status = "paid";
		inv.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		await persist();
		return inv;
	});
}
async function findByPaymentLinkId(paymentLinkId) {
	return (await load()).invoices.find((inv) => inv.paymentLinkId === paymentLinkId);
}
//#endregion
export { listInvoices as a, getInvoice as i, deleteInvoice as n, markInvoicePaid as o, findByPaymentLinkId as r, upsertInvoice as s, countInvoicesForMonth as t };
