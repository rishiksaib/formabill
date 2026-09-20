import { o as __toESM } from "../_runtime.mjs";
import { f as uid, i as formatMoney, r as formatDate, s as invoiceTotal, u as nextInvoiceNumber } from "./utils-DgMi_UEP.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CYO0UllO.mjs";
import { t as Input } from "./input-03uEhuzd.mjs";
import { E as CopyPlus, _ as FileText, a as Trash2, d as Plus, g as Link2, u as Search } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useStore } from "./context-C9_A_ogf.mjs";
import { t as Badge } from "./badge-BViJtkjc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invoices-0lvuLK3n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function publicUrl(id) {
	return `${window.location.origin}/inv/${id}`;
}
function InvoicesPage() {
	const navigate = useNavigate();
	const { ready, invoices, deleteInvoice, updateInvoiceStatus, saveInvoice, publishInvoice } = useStore();
	const [query, setQuery] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("newest");
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
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
			setPendingDelete(null);
			toast.success("Invoice deleted");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not delete invoice");
		}
	};
	const duplicateInvoice = async (invoice) => {
		try {
			const copy = {
				...invoice,
				id: uid(),
				number: nextInvoiceNumber(invoices.map((inv) => inv.number)),
				status: "draft",
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
				client: {
					...invoice.client,
					id: uid()
				},
				lineItems: invoice.lineItems.map((item) => ({
					...item,
					id: uid()
				})),
				paymentLinkId: void 0,
				paymentLinkUrl: void 0
			};
			const saved = await saveInvoice(copy);
			toast.success(`Duplicated as ${saved.number}`);
			await navigate({
				to: "/app",
				search: { id: saved.id }
			});
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not duplicate invoice");
		}
	};
	const copyInvoiceLink = async (invoice) => {
		try {
			const published = await publishInvoice({
				...invoice,
				status: invoice.status === "paid" ? "paid" : "sent"
			});
			await navigator.clipboard.writeText(publicUrl(published.id));
			toast.success("Public link copied");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not copy link");
		}
	};
	const visible = (0, import_react.useMemo)(() => {
		const needle = query.trim().toLowerCase();
		return [...invoices.filter((inv) => {
			if (statusFilter !== "all" && inv.status !== statusFilter) return false;
			if (!needle) return true;
			return inv.number.toLowerCase().includes(needle) || inv.client.name.toLowerCase().includes(needle) || inv.client.email.toLowerCase().includes(needle);
		})].sort((a, b) => {
			if (sort === "amount") return invoiceTotal(b.lineItems, b.taxRate) - invoiceTotal(a.lineItems, a.taxRate);
			const diff = Date.parse(a.createdAt) - Date.parse(b.createdAt);
			return sort === "newest" ? -diff : diff;
		});
	}, [
		invoices,
		query,
		statusFilter,
		sort
	]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-xl bg-muted/60" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.16em] text-muted-foreground uppercase",
				children: "Library"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Invoices"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: invoices.length === 0 ? "Your invoices will live here." : `${visible.length} of ${invoices.length} invoice${invoices.length === 1 ? "" : "s"}`
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
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
				className: "mt-4 font-display text-2xl tracking-tight",
				children: "Your first invoice is a minute away"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-sm text-sm text-muted-foreground",
				children: "Add a client and a line item, preview it live, then share a public link or collect payment — no setup needed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				size: "lg",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app",
					children: "Create invoice"
				})
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 grid gap-2 sm:grid-cols-[1fr_auto_auto]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Search number or client…",
					"aria-label": "Search invoices",
					className: "pl-9"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex overflow-hidden rounded-md border border-border",
				role: "group",
				"aria-label": "Filter by status",
				children: [
					"all",
					"draft",
					"sent",
					"paid"
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": statusFilter === s,
					onClick: () => setStatusFilter(s),
					className: `cursor-pointer px-3 py-2 text-xs font-medium transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`,
					children: s === "all" ? "All" : s[0].toUpperCase() + s.slice(1)
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: sort,
				onChange: (e) => setSort(e.target.value),
				"aria-label": "Sort invoices",
				className: "flex h-11 rounded-md border border-input bg-card px-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "newest",
						children: "Newest first"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "oldest",
						children: "Oldest first"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "amount",
						children: "Highest amount"
					})
				]
			})
		]
	}), visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl",
				children: "Nothing matches"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					"Try a different search, or clear the ",
					statusFilter,
					" filter."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				variant: "outline",
				onClick: () => {
					setQuery("");
					setStatusFilter("all");
				},
				children: "Clear search & filters"
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2",
		children: visible.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: `flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl border border-border border-l-4 bg-card px-4 py-4 sm:px-5 ${inv.status === "paid" ? "border-l-emerald-500" : inv.status === "sent" ? "border-l-sky-500" : "border-l-muted-foreground/30"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app",
					search: { id: inv.id },
					className: "min-w-44 flex-1",
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base font-semibold tabular-nums",
							children: formatMoney(invoiceTotal(inv.lineItems, inv.taxRate), inv.currency || "USD")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: inv.status,
							children: inv.status
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: inv.status,
							onChange: (e) => void changeStatus(inv.id, e.target.value),
							"aria-label": `Change status of ${inv.number}`,
							title: "Change status",
							className: "h-9 cursor-pointer rounded-md border border-input bg-card px-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "draft",
									children: "Draft"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "sent",
									children: "Sent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "paid",
									children: "Paid"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full items-center gap-1 border-t border-border/60 pt-2 sm:w-auto sm:border-t-0 sm:pt-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => void duplicateInvoice(inv),
							title: `Duplicate ${inv.number} as a new draft`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyPlus, {}), " Duplicate"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => void copyInvoiceLink(inv),
							title: "Publish and copy the public link",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {}), " Copy link"]
						}),
						pendingDelete === inv.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "destructive",
							size: "sm",
							onClick: () => void removeInvoice(inv.id),
							onBlur: () => setPendingDelete(null),
							title: "Click again to confirm deletion",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), " Confirm?"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": `Delete ${inv.number}`,
							title: `Delete ${inv.number}`,
							onClick: () => setPendingDelete(inv.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
						})
					]
				})
			]
		}, inv.id))
	})] })] });
}
//#endregion
export { InvoicesPage as component };
