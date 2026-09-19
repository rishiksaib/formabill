import { i as formatMoney, r as formatDate, s as invoiceTotal } from "./utils-DgMi_UEP.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as FileText, i as Trash2, s as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-CYO0UllO.mjs";
import { n as useStore } from "./context-Bqe4TywW.mjs";
import { t as Badge } from "./badge-BViJtkjc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invoices-DiuI5ZHL.js
var import_jsx_runtime = require_jsx_runtime();
function InvoicesPage() {
	const { ready, invoices, deleteInvoice, updateInvoiceStatus } = useStore();
	const changeStatus = async (id, status) => {
		try {
			await updateInvoiceStatus(id, status);
			toast.success(`Invoice marked as ${status}`);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not update invoice status");
		}
	};
	const removeInvoice = async (id) => {
		try {
			await deleteInvoice(id);
			toast.success("Invoice deleted");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not delete invoice");
		}
	};
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-xl bg-muted/60" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-[0.16em] text-muted-foreground uppercase",
			children: "Library"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl tracking-tight",
			children: "Invoices"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " New"]
			})
		})]
	}), invoices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mx-auto size-8 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-display text-xl",
				children: "No invoices yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Write one in under a minute."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app",
					children: "Create invoice"
				})
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-border overflow-hidden rounded-xl border border-border bg-card",
		children: invoices.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex flex-wrap items-center gap-3 px-4 py-4 sm:px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app",
					search: { id: inv.id },
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: inv.number
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-sm text-muted-foreground",
						children: [
							inv.client.name || "No client",
							" · Due ",
							formatDate(inv.dueDate)
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm tabular-nums",
					children: formatMoney(invoiceTotal(inv.lineItems, inv.taxRate), inv.currency || "USD")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: inv.status,
					children: inv.status
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => void changeStatus(inv.id, "draft"),
							children: "Draft"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => void changeStatus(inv.id, "sent"),
							children: "Sent"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => void changeStatus(inv.id, "paid"),
							children: "Paid"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					"aria-label": `Delete ${inv.number}`,
					onClick: () => void removeInvoice(inv.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
				})
			]
		}, inv.id))
	})] });
}
//#endregion
export { InvoicesPage as component };
