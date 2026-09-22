import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as Check, D as Coins, N as ArrowRight, b as FileCheck2, g as Link2, j as Bot, n as Users, o as Timer, s as Star, w as CreditCard } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CYO0UllO.mjs";
import { t as InvoiceDocument } from "./document-lgfe_FuB.mjs";
import { t as Logo } from "./logo-ut0NUiCj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DNV8i2Vl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
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
		title: "Bill in a minute, not an evening",
		body: "Four fields and a live paper preview. Invoicing stops being the Sunday-night chore."
	},
	{
		icon: Link2,
		title: "Clients pay from one tap",
		body: "A clean public page, plus a WhatsApp message with the amount filled in. Nothing lost in email threads."
	},
	{
		icon: CreditCard,
		title: "Keep every rupee, dollar, and euro",
		body: "UPI, PayPal, cards, or bank details. Money lands in your account — we never touch it."
	},
	{
		icon: Bot,
		title: "Let your AI do the billing",
		body: "On Pro, Claude or Cursor can draft invoices and mark payments for you. Always as you, revocable anytime."
	},
	{
		icon: Users,
		title: "Clients remember themselves",
		body: "Companies, phones, and notes saved once. Repeat clients refill in one tap."
	},
	{
		icon: Coins,
		title: "Local payment habits, built in",
		body: "INR opens instantly in UPI apps; other currencies show PayPal and bank details. Clients pay the way they already pay."
	}
];
var STEPS = [
	{
		n: "1",
		title: "Create",
		body: "Client, line items, done. Your studio details save themselves for next time."
	},
	{
		n: "2",
		title: "Share",
		body: "Copy a public link, or send it straight over WhatsApp and email with the amount filled in."
	},
	{
		n: "3",
		title: "Get paid",
		body: "Clients pay via UPI, PayPal, or your gateway — then mark it paid and move on."
	}
];
var TESTIMONIALS = [
	{
		quote: "I used to dread invoicing Sundays. Now the invoice is done before my coffee cools — and clients pay faster off the WhatsApp link.",
		name: "Ananya Rao",
		role: "Brand designer, Bengaluru"
	},
	{
		quote: "The UPI pay button is the killer feature. My Indian clients pay in one tap, and my US clients get PayPal. Nothing for me to chase.",
		name: "Marcus Lee",
		role: "Freelance UI designer, Austin"
	},
	{
		quote: "It looks like I hired someone to do my paperwork. Two clients asked what tool I use — that's never happened with a spreadsheet.",
		name: "Priya Nair",
		role: "Illustrator, Kochi"
	}
];
var FAQS = [
	{
		q: "Is FormaBill really free?",
		a: "Yes — 5 invoices a month, PDF download, public links, and payment details, free forever. Pro ($11/mo or $99/yr) adds recurring invoices, reminders, and removes our branding."
	},
	{
		q: "Do you take a cut of my client payments?",
		a: "Never. Client money goes straight to your UPI, PayPal, bank, or Razorpay account. Gateways charge their own fees; we charge only for optional Pro."
	},
	{
		q: "How do UPI payments work?",
		a: "On INR invoices your public page shows a Pay via UPI button that opens the client's UPI app with amount and note filled in. Other currencies show PayPal and bank details instead."
	},
	{
		q: "Do I need to sign up?",
		a: "No. Create and publish invoices anonymously; drafts autosave in your browser. Sign up when you want sync across devices, per-user limits, and Pro."
	},
	{
		q: "Can I download PDFs?",
		a: "Yes — every invoice downloads as a clean PDF with your logo, matching the preview exactly."
	},
	{
		q: "What happens to my data?",
		a: "Drafts live in your browser. Published invoices are stored so public links keep working, and deleting an invoice removes its public page. We never sell data — see Privacy for details."
	},
	{
		q: "Can an AI assistant manage my invoices?",
		a: "Yes, on Pro. Connect Claude, Cursor, or any MCP-compatible assistant with a personal access token from Settings → AI / MCP. It can list and draft invoices, manage clients, and mark payments — always acting as you, revocable anytime."
	}
];
var REFERRAL_STORAGE_KEY = "formabill-ref";
function LandingPage() {
	(0, import_react.useEffect)(() => {
		try {
			const code = new URLSearchParams(window.location.search).get("ref");
			if (code && /^[A-Za-z0-9]{4,16}$/.test(code.trim())) window.localStorage.setItem(REFERRAL_STORAGE_KEY, code.trim().toUpperCase());
		} catch {}
	}, []);
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
						children: "Polished invoices in under a minute, shared on WhatsApp, paid via UPI or PayPal. Zero cut — with an AI assistant on Pro that can bill for you."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							className: "px-8 text-base",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/app",
								children: ["Create your first invoice — free ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground",
						children: [
							"No sign-up needed",
							"Free 5 invoices/mo",
							"No cut of your payments"
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-4 text-emerald-600",
									"aria-hidden": "true"
								}),
								" ",
								t
							]
						}, t))
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
					className: "mx-auto max-w-6xl px-4 pt-14 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase",
							children: "How it works"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl tracking-tight sm:text-4xl",
							children: "Invoice to paid in three steps"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid gap-8 pb-4 sm:grid-cols-3 sm:gap-6",
							children: STEPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									className: "grid size-10 shrink-0 place-items-center rounded-full bg-primary font-display text-lg text-primary-foreground",
									children: s.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl tracking-tight",
									children: s.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
									children: s.body
								})] })]
							}, s.n))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-border bg-card/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-2 sm:gap-10 sm:px-6 lg:grid-cols-3",
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
						className: "sm:col-span-2 lg:col-span-3 pt-4 border-t border-border",
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
				className: "mx-auto max-w-6xl px-4 py-20 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-center gap-1",
							"aria-label": "Loved by freelancers",
							children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
								className: "size-4 fill-amber-400 text-amber-400",
								"aria-hidden": "true"
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-3xl tracking-tight sm:text-4xl",
							children: "Loved by freelancers who hate paperwork"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground",
							children: "From first invoice to paid — real workflows from independent designers and studios."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-6 lg:grid-cols-3",
					children: TESTIMONIALS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "flex flex-col rounded-2xl border border-border bg-card p-6 shadow-paper",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "text-sm leading-relaxed text-foreground",
							children: [
								"“",
								t.quote,
								"”"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
							className: "mt-4 border-t border-border pt-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: t.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: t.role
							})]
						})]
					}, t.name))
				})]
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
							className: "flex flex-col rounded-2xl border border-border bg-card p-8 shadow-paper",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-muted-foreground",
									children: "Free"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "For your first invoices. Free forever."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 font-display text-4xl",
									children: ["$0", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg text-muted-foreground",
										children: "/mo"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-6 space-y-2.5 text-sm text-muted-foreground",
									children: [
										"5 invoices per month",
										"PDF download",
										"Public share links",
										"Client address book",
										"UPI, PayPal, and gateway payment links"
									].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												className: "mt-0.5 size-4 shrink-0 text-emerald-600",
												"aria-hidden": "true"
											}),
											" ",
											t
										]
									}, t))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "mt-8 w-full",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/app",
										children: "Start free"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-center text-xs text-muted-foreground",
									children: "No credit card needed. Free forever."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "flex flex-col rounded-2xl border-2 border-primary bg-primary p-8 text-primary-foreground shadow-lift",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center justify-between gap-2 text-sm font-medium text-primary-foreground/70",
									children: ["Pro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-white/15 px-2.5 py-0.5 text-xs",
										children: "Most popular"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-primary-foreground/70",
									children: "For steady freelance volume."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 font-display text-4xl",
									children: ["$11", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg",
										children: "/mo"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-primary-foreground/70",
									children: "or $99/year"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-6 space-y-2.5 text-sm text-primary-foreground/90",
									children: [
										"Recurring invoices",
										"Due-date reminders",
										"Connect AI assistants (MCP)",
										"Remove FormaBill branding",
										"Everything in Free"
									].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												className: "mt-0.5 size-4 shrink-0",
												"aria-hidden": "true"
											}),
											" ",
											t
										]
									}, t))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "mt-8 w-full bg-card text-foreground hover:bg-card/90",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/app",
										children: "Get Pro"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-center text-xs text-primary-foreground/70",
									children: "Client payments still go to your own accounts — never to us."
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-4 pb-20 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase",
							children: "Questions, answered"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-center font-display text-3xl tracking-tight sm:text-4xl",
							children: "Frequently asked questions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card",
							children: FAQS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "group px-6 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
									className: "cursor-pointer list-none rounded text-sm font-medium marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 [&::-webkit-details-marker]:hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center justify-between gap-4",
										children: [f.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											className: "text-lg leading-none text-muted-foreground transition-transform group-open:rotate-45",
											children: "+"
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: f.a
								})]
							}, f.q))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border bg-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl tracking-tight sm:text-5xl",
							children: "Send your first invoice today."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-md text-base leading-relaxed text-primary-foreground/80",
							children: "Free for 5 invoices a month. No sign-up, no credit card — your client could be paying within the hour."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								className: "bg-card px-8 text-base text-foreground hover:bg-card/90",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/app",
									children: ["Start invoicing free ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "outline",
								className: "border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#pricing",
									children: "Compare plans"
								})
							})]
						})
					]
				})
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
