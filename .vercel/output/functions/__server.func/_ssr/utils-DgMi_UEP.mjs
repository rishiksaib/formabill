import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-DgMi_UEP.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
	return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
function roundMoney(n) {
	return Math.round((n + Number.EPSILON) * 100) / 100;
}
function lineAmount(item) {
	return roundMoney((Number(item.quantity) || 0) * (Number(item.rate) || 0));
}
function invoiceSubtotal(items) {
	return roundMoney(items.reduce((sum, item) => sum + lineAmount(item), 0));
}
function invoiceTax(items, taxRate) {
	return roundMoney(invoiceSubtotal(items) * ((Number(taxRate) || 0) / 100));
}
function invoiceTotal(items, taxRate) {
	return roundMoney(invoiceSubtotal(items) + invoiceTax(items, taxRate));
}
function toPaise(amount) {
	return Math.max(0, Math.round(roundMoney(amount) * 100));
}
function formatMoney(amount, currency = "INR") {
	try {
		return new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency,
			maximumFractionDigits: 2,
			minimumFractionDigits: 0
		}).format(Number.isFinite(amount) ? amount : 0);
	} catch {
		return `₹${(Number.isFinite(amount) ? amount : 0).toFixed(2)}`;
	}
}
function formatDate(iso) {
	if (!iso) return "—";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return new Intl.DateTimeFormat("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	}).format(d);
}
function isoDate(offsetDays = 0) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() + offsetDays);
	return d.toISOString().slice(0, 10);
}
function nextInvoiceNumber(existingNumbers) {
	let max = 0;
	for (const n of existingNumbers) {
		const match = n.match(/(\d+)\s*$/);
		if (match) max = Math.max(max, parseInt(match[1], 10));
	}
	return `FB-${String(max + 1).padStart(4, "0")}`;
}
function addFrequency(iso, frequency) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return (/* @__PURE__ */ new Date()).toISOString();
	switch (frequency) {
		case "weekly":
			d.setDate(d.getDate() + 7);
			break;
		case "monthly":
			d.setMonth(d.getMonth() + 1);
			break;
		case "quarterly":
			d.setMonth(d.getMonth() + 3);
			break;
		case "yearly": d.setFullYear(d.getFullYear() + 1);
	}
	return d.toISOString();
}
//#endregion
export { invoiceSubtotal as a, isoDate as c, toPaise as d, uid as f, formatMoney as i, lineAmount as l, cn as n, invoiceTax as o, formatDate as r, invoiceTotal as s, addFrequency as t, nextInvoiceNumber as u };
