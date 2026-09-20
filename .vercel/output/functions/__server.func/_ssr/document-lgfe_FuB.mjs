import { a as invoiceSubtotal, i as formatMoney, l as lineAmount, n as cn, o as invoiceTax, r as formatDate, s as invoiceTotal } from "./utils-DgMi_UEP.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/document-lgfe_FuB.js
var import_jsx_runtime = require_jsx_runtime();
function InvoiceDocument({ invoice, branded = true, className }) {
	const currency = invoice.currency || "USD";
	const sub = invoiceSubtotal(invoice.lineItems);
	const tax = invoiceTax(invoice.lineItems, invoice.taxRate);
	const total = invoiceTotal(invoice.lineItems, invoice.taxRate);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("flex min-h-[640px] w-full min-w-0 flex-col bg-paper text-ink shadow-paper", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-4 border-b border-border px-5 py-6 sm:px-10 sm:py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						invoice.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: invoice.logoUrl,
							alt: "",
							className: "mb-4 max-h-12 max-w-40 object-contain"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl tracking-tight",
							children: invoice.fromName || "Your studio"
						}),
						invoice.fromEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: invoice.fromEmail
						}) : null,
						invoice.fromAddress ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-xs whitespace-pre-line text-sm text-muted-foreground",
							children: invoice.fromAddress
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase",
							children: "Invoice"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-sm tabular-nums",
							children: invoice.number
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs text-muted-foreground",
							children: ["Due ", formatDate(invoice.dueDate)]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 px-5 py-6 sm:grid-cols-2 sm:gap-8 sm:px-10 sm:py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase",
						children: "From"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm font-medium",
						children: invoice.fromName || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: invoice.fromEmail || "—"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase",
						children: "Bill to"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm font-medium",
						children: invoice.client.name || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Client name"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: invoice.client.email || "client@email.com"
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 overflow-x-auto px-5 sm:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full table-fixed text-xs sm:text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-y border-border text-left text-xs tracking-[0.14em] text-muted-foreground uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[40%] py-3 font-medium sm:w-auto",
								children: "Description"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[15%] py-3 text-right font-medium",
								children: "Qty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[22%] py-3 text-right font-medium",
								children: "Rate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[23%] py-3 text-right font-medium",
								children: "Amount"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: invoice.lineItems.length === 0 || invoice.lineItems.every((item) => !item.description.trim() && !(item.quantity > 0 && item.rate > 0)) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 4,
						className: "py-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg border border-dashed border-border px-4 py-5 text-center text-muted-foreground",
							children: "Add your first line item — it appears here instantly"
						})
					}) }) : invoice.lineItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "truncate py-3 pr-2",
								children: item.description || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Description"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right tabular-nums",
								children: item.quantity || 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right tabular-nums",
								children: formatMoney(item.rate, currency)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right tabular-nums",
								children: formatMoney(lineAmount(item), currency)
							})
						]
					}, item.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex justify-end px-5 sm:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "w-full max-w-xs space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "tabular-nums",
								children: formatMoney(sub, currency)
							})]
						}),
						invoice.taxRate > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", { children: [
								"Tax (",
								invoice.taxRate,
								"%)"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "tabular-nums",
								children: formatMoney(tax, currency)
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-t border-border pt-2 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "tabular-nums",
								children: formatMoney(total, currency)
							})]
						})
					]
				})
			}),
			invoice.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 px-5 sm:mt-10 sm:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase",
					children: "Notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 whitespace-pre-line text-sm text-muted-foreground",
					children: invoice.notes
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-auto flex items-end justify-between gap-4 px-5 py-6 sm:px-10 sm:py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: ["Status: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "capitalize text-foreground",
						children: invoice.status
					})]
				}), branded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs text-muted-foreground",
					children: "Made with FormaBill"
				}) : null]
			})
		]
	});
}
//#endregion
export { InvoiceDocument as t };
