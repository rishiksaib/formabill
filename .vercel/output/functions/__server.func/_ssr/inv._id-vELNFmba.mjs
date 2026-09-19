import { o as __toESM } from "../_runtime.mjs";
import { i as formatMoney, s as invoiceTotal } from "./utils-DgMi_UEP.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Logo } from "./logo-ut0NUiCj.mjs";
import { c as LoaderCircle, h as ArrowUpRight, m as Copy, p as Download } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Route$4 } from "./router-CP-Z3rz-.mjs";
import { t as Button } from "./button-CYO0UllO.mjs";
import { t as InvoiceDocument } from "./document-CmIVudml.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inv._id-vELNFmba.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PublicInvoicePage() {
	const { invoice: initial } = Route$4.useLoaderData();
	const invoice = initial;
	const [busy, setBusy] = (0, import_react.useState)(null);
	const total = invoice ? invoiceTotal(invoice.lineItems, invoice.taxRate) : 0;
	if (!invoice) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { to: "/" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-8 font-display text-3xl",
				children: "Invoice not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm text-muted-foreground",
				children: "This link may not have been published yet. Ask the designer to tap Save or Copy link."
			})
		]
	});
	const branded = true;
	const paid = invoice.status === "paid";
	const paymentMethods = invoice.paymentMethods || {};
	const paypalValue = paymentMethods.paypalEmail?.trim() || "";
	const paypalLink = paypalValue ? /^https?:\/\//i.test(paypalValue) ? paypalValue : /^paypal\.me\//i.test(paypalValue) ? `https://www.${paypalValue}` : `mailto:${paypalValue}` : "";
	const hasBank = Boolean(paymentMethods.bankName || paymentMethods.bankAccountName || paymentMethods.bankAccount || paymentMethods.bankIfscSwift);
	const upiLink = paymentMethods.upiId ? `upi://pay?pa=${encodeURIComponent(paymentMethods.upiId)}&pn=${encodeURIComponent(invoice.client.name || invoice.fromName)}&am=${total}&cu=${invoice.currency || "USD"}&tn=${encodeURIComponent(invoice.number)}` : "";
	const copyUpi = async () => {
		if (!paymentMethods.upiId) return;
		try {
			await navigator.clipboard.writeText(paymentMethods.upiId);
			toast.success("UPI ID copied");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not copy UPI ID");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh min-w-0 overflow-x-hidden bg-slate-50 px-3 py-4 sm:px-6 sm:py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full min-w-0 max-w-md sm:max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 rounded-2xl border border-border bg-white p-4 shadow-sm sm:mb-6 sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg text-foreground",
									children: invoice.fromName || "Invoice"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "break-words text-xs text-muted-foreground",
									children: ["#", invoice.number]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-emerald-700 uppercase",
								children: paid ? "Paid" : "Open"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-4 text-white shadow-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs uppercase tracking-[0.14em] text-emerald-100",
											children: "Amount due"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 break-words text-3xl font-semibold tabular-nums",
											children: formatMoney(total, invoice.currency || "USD")
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-full bg-white/15 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-emerald-50",
										children: invoice.status
									})]
								}),
								paid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 rounded-xl border border-white/25 bg-white/15 px-4 py-5 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium tracking-[0.2em] text-emerald-100 uppercase",
										children: "Payment received"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-3xl font-semibold tracking-tight text-white",
										children: "Paid"
									})]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 grid gap-2 sm:grid-cols-2",
									children: [!paid && invoice.paymentLinkUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: invoice.paymentLinkUrl,
										className: "flex h-12 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-emerald-700 hover:bg-white/90",
										children: ["Pay now", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "ml-2 size-4" })]
									}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										className: "h-12 border-white/60 bg-transparent text-white hover:bg-white/10",
										onClick: async () => {
											setBusy("pdf");
											try {
												const { downloadInvoicePdf } = await import("./pdf-CJxyl0Nr.mjs");
												await downloadInvoicePdf(invoice, branded);
											} catch (err) {
												toast.error(err instanceof Error ? err.message : "PDF failed");
											} finally {
												setBusy(null);
											}
										},
										disabled: busy !== null,
										children: [busy === "pdf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2" }), "PDF"]
									})]
								})
							]
						}),
						!paid && paymentMethods.upiId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl border border-dashed border-emerald-200 bg-emerald-50 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] uppercase tracking-[0.14em] text-emerald-700",
										children: "UPI payment"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 break-all font-mono text-sm text-emerald-900",
										children: paymentMethods.upiId
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => void copyUpi(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "mr-1 size-3.5" }), "Copy"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: upiLink,
								className: "mt-3 flex h-11 items-center justify-center rounded-md bg-emerald-600 px-4 text-sm font-medium text-white",
								children: ["Pay via UPI", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "ml-2 size-4" })]
							})]
						}) : null,
						!paid && paypalValue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-950",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] uppercase tracking-[0.14em] text-sky-700",
									children: "PayPal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 break-all",
									children: paypalValue
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: paypalLink,
									className: "mt-3 flex h-11 items-center justify-center rounded-md bg-sky-700 px-4 text-sm font-medium text-white",
									children: ["Pay with PayPal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "ml-2 size-4" })]
								})
							]
						}) : null,
						!paid && hasBank ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-2 rounded-xl border border-border bg-secondary/40 p-3 text-sm text-muted-foreground",
							children: [
								paymentMethods.paypalEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: "PayPal:"
									}),
									" ",
									paymentMethods.paypalEmail
								] }) : null,
								paymentMethods.bankName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: "Bank:"
									}),
									" ",
									paymentMethods.bankName
								] }) : null,
								paymentMethods.bankAccountName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: "Account name:"
									}),
									" ",
									paymentMethods.bankAccountName
								] }) : null,
								paymentMethods.bankAccount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: "Account:"
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "break-all",
										children: paymentMethods.bankAccount
									})
								] }) : null,
								paymentMethods.bankIfscSwift ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: "IFSC / SWIFT:"
									}),
									" ",
									paymentMethods.bankIfscSwift
								] }) : null
							]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceDocument, {
					invoice,
					branded,
					className: "rounded-xl"
				}),
				!paid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-xs text-muted-foreground",
					children: "Payment goes directly to the freelancer's UPI, bank, PayPal, or Razorpay account."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-sm text-success",
					children: "This invoice is paid. Thank you."
				})
			]
		})
	});
}
//#endregion
export { PublicInvoicePage as component };
