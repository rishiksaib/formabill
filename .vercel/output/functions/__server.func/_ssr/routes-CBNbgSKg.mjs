import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Timer, h as CreditCard, l as Link2, p as FileCheck2, u as Globe, v as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as Logo } from "./logo-ut0NUiCj.mjs";
import { t as Button } from "./button-CYO0UllO.mjs";
import { t as InvoiceDocument } from "./document-CmIVudml.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CBNbgSKg.js
var import_jsx_runtime = require_jsx_runtime();
var SAMPLE = {
	id: "sample",
	number: "FB-0001",
	fromName: "North Studio",
	fromEmail: "hello@north.studio",
	fromAddress: "San Francisco, CA",
	client: {
		id: "c1",
		name: "Harbor Co.",
		email: "pay@harbor.co"
	},
	lineItems: [{
		id: "1",
		description: "Brand identity system",
		quantity: 1,
		rate: 1500
	}, {
		id: "2",
		description: "Product UI, 3 screens",
		quantity: 1,
		rate: 1200
	}],
	taxRate: 0,
	notes: "Payment via UPI, PayPal, cards, or bank transfer.",
	dueDate: "2026-10-02",
	status: "sent",
	createdAt: "2026-09-18",
	currency: "USD"
};
var FEATURES = [
	{
		icon: Timer,
		title: "Sixty seconds, not sixty fields",
		body: "From, bill-to, line items, tax. A live paper preview as you type. Then send."
	},
	{
		icon: Link2,
		title: "WhatsApp-ready sharing",
		body: "Publish a clean invoice page and send a prefilled WhatsApp message with the amount and link."
	},
	{
		icon: CreditCard,
		title: "Get paid your way",
		body: "UPI for INR invoices, PayPal, cards, or bank details. Money goes directly to you."
	},
	{
		icon: Globe,
		title: "UPI-native when you bill in INR",
		body: "Instant UPI deep links (upi://) on public pages — only for INR. Other currencies show PayPal/bank."
	}
];
function LandingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh overflow-x-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-5 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-1 sm:gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						asChild: true,
						className: "hidden sm:inline-flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app/invoices",
							children: "Invoices"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/app",
							children: ["Start invoicing ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "hidden sm:block" })]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase",
						children: "Fast pro invoices for freelancers worldwide"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl",
						children: "Get paid without the payment-platform tax."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg",
						children: "Make a polished invoice in under a minute, share it on WhatsApp, and let clients pay via UPI, PayPal, or your gateway. FormaBill takes no cut of client payments."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/app",
								children: ["Write an invoice ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#pricing",
								children: "See pricing"
							})
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-secondary/70 sm:-inset-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceDocument, {
						invoice: SAMPLE,
						className: "max-h-[560px] overflow-hidden rounded-xl sm:max-h-[640px]"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-border bg-card/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-2 sm:gap-10 sm:px-6 lg:grid-cols-4",
					children: [FEATURES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 font-display text-xl tracking-tight",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: f.body
							})
						]
					}, f.title)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-4 pt-4 border-t border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { className: "size-5 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl tracking-tight",
								children: "No cut of client payments"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: "Gateways may charge their own fees. FormaBill does not take a percentage of what you earn."
							})] })]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "pricing",
				className: "mx-auto max-w-6xl px-4 py-20 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase",
						children: "Pricing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-4xl tracking-tight",
						children: "Start free. Upgrade when your volume grows."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid gap-6 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-2xl border border-border bg-card p-8 shadow-paper",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-muted-foreground",
									children: "Free"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 font-display text-4xl",
									children: ["$0", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg text-muted-foreground",
										children: "/mo"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-6 space-y-2 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "5 invoices per month" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "PDF download" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Public share links" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Client list" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "UPI, PayPal, and gateway payment links" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "mt-8 w-full",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/app",
										children: "Start free"
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-2xl border border-primary bg-primary p-8 text-primary-foreground shadow-lift",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-primary-foreground/70",
									children: "Pro"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 font-display text-4xl",
									children: ["$11", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg",
										children: "/mo"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-primary-foreground/70",
									children: "or $99/year"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-6 space-y-2 text-sm text-primary-foreground/85",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Recurring invoices" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Due-date reminders" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Remove FormaBill branding" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Everything in Free" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "mt-8 w-full bg-card text-foreground hover:bg-card/90",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/app",
										children: "Get Pro"
									})
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-x-4 gap-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "hover:text-foreground",
								children: "Terms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "hover:text-foreground",
								children: "Privacy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Made for designers who still send invoices from a docs template." })
						]
					})]
				})
			})
		]
	});
}
var SplitComponent = LandingPage;
//#endregion
export { SplitComponent as component };
