import { o as __toESM } from "../_runtime.mjs";
import { i as formatMoney, n as cn, s as invoiceTotal } from "./utils-DgMi_UEP.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as Download, T as Copy, a as Trash2, c as Sparkles, d as Plus, g as Link2, h as LoaderCircle, t as Wallet } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as applySettingsToInvoice, i as Route$18, o as createDraftInvoice, s as emptyLineItem } from "./router-Bmc9EuDx.mjs";
import { t as Button } from "./button-CYO0UllO.mjs";
import { t as Input } from "./input-03uEhuzd.mjs";
import { t as Label } from "./label-BHyMjyQZ.mjs";
import { n as useStore } from "./context-C9_A_ogf.mjs";
import { t as Textarea } from "./textarea-Du_npzpQ.mjs";
import { t as InvoiceDocument } from "./document-lgfe_FuB.mjs";
import { t as Badge } from "./badge-BViJtkjc.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-ZO2DYbZO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 rounded-full bg-card shadow-sm transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5" })
}));
Switch.displayName = Switch$1.displayName;
async function downloadPdf(invoice, branded) {
	const { downloadInvoicePdf } = await import("./pdf-B3HHJwxY.mjs");
	await downloadInvoicePdf(invoice, branded);
}
function publicUrl(id) {
	return `${window.location.origin}/inv/${id}`;
}
function shareText(invoice) {
	const amount = formatMoney(invoiceTotal(invoice.lineItems, invoice.taxRate), invoice.currency || "USD");
	return [
		`Hello ${invoice.client.name || "there"},`,
		`Your invoice ${invoice.number} is ready for payment.`,
		`Amount due: ${amount}`,
		`View and pay: ${publicUrl(invoice.id)}`
	].join("\n");
}
function whatsappShareUrl(invoice) {
	return `https://wa.me/?text=${encodeURIComponent(shareText(invoice))}`;
}
function emailShareUrl(invoice) {
	return `mailto:?subject=${encodeURIComponent(`Invoice ${invoice.number} from ${invoice.fromName || "FormaBill"}`)}&body=${encodeURIComponent(`${shareText(invoice)}\n\nThanks,\n${invoice.fromName || "The team"}`)}`;
}
function InvoiceEditor({ invoiceId }) {
	const navigate = useNavigate();
	const { ready, settings, invoices, clients, saveInvoice, publishInvoice, updateInvoiceStatus } = useStore();
	const [invoice, setInvoice] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [publishError, setPublishError] = (0, import_react.useState)(null);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [lastSavedAt, setLastSavedAt] = (0, import_react.useState)(null);
	const [autoSaveError, setAutoSaveError] = (0, import_react.useState)(null);
	const [serverPro, setServerPro] = (0, import_react.useState)(false);
	const saveTimer = (0, import_react.useRef)(null);
	const session = (0, import_react.useRef)(null);
	const dirty = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		let cancelled = false;
		fetch("/api/pro/status").then(async (response) => {
			if (!response.ok || cancelled) return;
			const status = await response.json();
			if (!cancelled) setServerPro(Boolean(status.isPro));
		}).catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, [ready]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		const key = invoiceId ?? "new";
		if (session.current === key) return;
		if (invoiceId) {
			const found = invoices.find((i) => i.id === invoiceId);
			if (found) {
				setInvoice(found);
				session.current = invoiceId;
				dirty.current = false;
				return;
			}
		}
		const draft = applySettingsToInvoice(createDraftInvoice(settings, invoices.map((i) => i.number)), settings);
		setInvoice(draft);
		session.current = "new";
		dirty.current = false;
	}, [ready, invoiceId]);
	(0, import_react.useEffect)(() => {
		if (!invoice || !dirty.current) return;
		if (saveTimer.current) window.clearTimeout(saveTimer.current);
		saveTimer.current = window.setTimeout(() => {
			setIsSaving(true);
			saveInvoice(invoice).then((saved) => {
				setIsSaving(false);
				setAutoSaveError(null);
				setLastSavedAt((/* @__PURE__ */ new Date()).toISOString());
				if (!invoiceId) {
					session.current = saved.id;
					navigate({
						to: "/app",
						search: { id: saved.id },
						replace: true
					});
				}
			}, (error) => {
				setIsSaving(false);
				setAutoSaveError(error instanceof Error ? error.message : "Auto-save failed");
			});
		}, 700);
		return () => {
			if (saveTimer.current) window.clearTimeout(saveTimer.current);
		};
	}, [
		invoice,
		saveInvoice,
		invoiceId,
		navigate
	]);
	const total = (0, import_react.useMemo)(() => invoice ? invoiceTotal(invoice.lineItems, invoice.taxRate) : 0, [invoice]);
	if (!ready || !invoice) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-96 animate-pulse rounded-xl bg-muted/60" });
	const branded = !serverPro;
	const patch = (partial) => {
		dirty.current = true;
		setInvoice((prev) => prev ? {
			...prev,
			...partial
		} : prev);
	};
	const persistNow = async () => {
		if (saveTimer.current) window.clearTimeout(saveTimer.current);
		dirty.current = false;
		const stamped = {
			...invoice,
			currency: invoice.currency || settings.defaultCurrency || "USD",
			taxRate: invoice.taxRate ?? settings.defaultTaxRate ?? 0,
			paymentMethods: invoice.paymentMethods ?? settings.paymentMethods
		};
		setInvoice(stamped);
		const saved = await saveInvoice(stamped);
		setLastSavedAt((/* @__PURE__ */ new Date()).toISOString());
		return saved;
	};
	const onSave = async () => {
		setBusy("save");
		try {
			const saved = await persistNow();
			await publishInvoice(saved);
			setPublishError(null);
			toast.success("Invoice saved and published");
			session.current = saved.id;
			await navigate({
				to: "/app",
				search: { id: saved.id },
				replace: true
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "Save failed";
			setPublishError(message);
			toast.error(message);
		} finally {
			setBusy(null);
		}
	};
	const onCopyLink = async () => {
		setBusy("link");
		try {
			const saved = await persistNow();
			const published = await publishInvoice({
				...saved,
				paymentMethods: saved.paymentMethods ?? settings.paymentMethods,
				status: saved.status === "paid" ? "paid" : "sent"
			});
			setInvoice(published);
			setPublishError(null);
			session.current = published.id;
			await navigator.clipboard.writeText(publicUrl(published.id));
			toast.success("Public link copied");
			await navigate({
				to: "/app",
				search: { id: published.id },
				replace: true
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "Could not copy link";
			setPublishError(`Copy link failed: ${message}`);
			toast.error(message);
		} finally {
			setBusy(null);
		}
	};
	const onShareWhatsApp = async () => {
		setBusy("link");
		try {
			const saved = await persistNow();
			const published = await publishInvoice({
				...saved,
				paymentMethods: saved.paymentMethods ?? settings.paymentMethods,
				status: saved.status === "paid" ? "paid" : "sent"
			});
			setInvoice(published);
			setPublishError(null);
			session.current = published.id;
			window.open(whatsappShareUrl(published), "_blank", "noopener,noreferrer");
			toast.success("WhatsApp share ready");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Could not share invoice";
			setPublishError(`WhatsApp share failed: ${message}`);
			toast.error(message);
		} finally {
			setBusy(null);
		}
	};
	const onShareEmail = async () => {
		setBusy("link");
		try {
			const saved = await persistNow();
			const published = await publishInvoice({
				...saved,
				paymentMethods: saved.paymentMethods ?? settings.paymentMethods,
				status: saved.status === "paid" ? "paid" : "sent"
			});
			setInvoice(published);
			setPublishError(null);
			session.current = published.id;
			window.location.href = emailShareUrl(published);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Could not share invoice";
			setPublishError(`Email share failed: ${message}`);
			toast.error(message);
		} finally {
			setBusy(null);
		}
	};
	const onPdf = async () => {
		setBusy("pdf");
		try {
			await downloadPdf(invoice, branded);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "PDF failed");
		} finally {
			setBusy(null);
		}
	};
	const onGetPaid = async () => {
		if (!invoice.client.email.trim()) {
			toast.error("Add a client email before collecting payment");
			return;
		}
		setBusy("pay");
		try {
			const saved = await persistNow();
			const published = await publishInvoice({
				...saved,
				status: saved.status === "paid" ? "paid" : "sent"
			});
			const res = await fetch("/api/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					invoiceId: published.id,
					razorpayKeyId: settings.paymentMethods?.razorpayKeyId,
					razorpayKeySecret: settings.paymentMethods?.razorpayKeySecret
				})
			});
			const json = await res.json();
			if (!res.ok) throw new Error(json.error || "Checkout failed");
			if (json.invoice) setInvoice(json.invoice);
			session.current = published.id;
			setPublishError(null);
			await navigate({
				to: "/app",
				search: { id: published.id },
				replace: true
			});
			if (json.demo) {
				toast.message("Razorpay is not connected", { description: "Add UPI in Settings or connect Razorpay" });
				return;
			}
			if (json.short_url) window.open(json.short_url, "_blank", "noopener,noreferrer");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Payment link failed";
			setPublishError(`Get paid failed: ${message}`);
			toast.error(message);
		} finally {
			setBusy(null);
		}
	};
	const setStatus = async (nextStatus) => {
		try {
			const saved = await persistNow();
			const published = await updateInvoiceStatus(saved.id, nextStatus);
			if (!published) return;
			setInvoice(published);
			toast.success(`Invoice marked as ${nextStatus}`);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not update invoice status");
		}
	};
	const effectiveCurrency = invoice.currency || settings.defaultCurrency || "USD";
	const paymentMethods = invoice.paymentMethods || {};
	const hasBankDetails = Boolean(paymentMethods.bankName || paymentMethods.bankAccountName || paymentMethods.bankAccount || paymentMethods.bankIfscSwift);
	const hasFromDetails = Boolean(invoice.fromName.trim() || invoice.fromEmail.trim() || (invoice.fromAddress || "").trim());
	const saveStateLabel = isSaving ? "Saving…" : autoSaveError ? `Save failed — ${autoSaveError}. Will retry on next edit.` : dirty.current ? "Unsaved changes…" : lastSavedAt ? `Saved ${new Date(lastSavedAt).toLocaleTimeString()}` : "Auto-save on";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-border bg-card p-5 shadow-paper sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.16em] text-muted-foreground uppercase",
							children: "Editor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl tracking-tight",
							children: invoice.number
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							role: "status",
							children: saveStateLabel
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: invoice.status,
						children: invoice.status
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-secondary/40 p-3 sm:p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								className: "w-full",
								onClick: () => void onGetPaid(),
								disabled: busy !== null,
								title: "Publish and collect payment via Razorpay, UPI, or PayPal",
								children: [busy === "pay" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {}), "Get paid"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								variant: "outline",
								className: "w-full",
								onClick: () => void onCopyLink(),
								disabled: busy !== null,
								title: "Save, publish, then copy the public link",
								children: [busy === "link" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "Copy link"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => void onSave(),
									disabled: busy !== null,
									title: "Save and publish the public page",
									children: [busy === "save" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : null, "Save"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex overflow-hidden rounded-md border border-border",
									role: "group",
									"aria-label": "Invoice status",
									children: [
										{
											value: "draft",
											label: "Draft"
										},
										{
											value: "sent",
											label: "Sent"
										},
										{
											value: "paid",
											label: "Paid"
										}
									].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-pressed": invoice.status === s.value,
										onClick: () => void setStatus(s.value),
										className: `cursor-pointer px-3 py-1.5 text-xs font-medium transition-colors ${invoice.status === s.value ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`,
										children: s.label
									}, s.value))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => void onShareWhatsApp(),
										disabled: busy !== null,
										title: "Save, publish, then open WhatsApp share",
										children: "WhatsApp"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => void onShareEmail(),
										disabled: busy !== null,
										title: "Save, publish, then open email share",
										children: "Email"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => void onPdf(),
										disabled: busy !== null,
										title: "Download PDF",
										children: [busy === "pdf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "PDF"]
									})
								]
							})]
						}),
						publishError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive",
							role: "alert",
							children: publishError
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Invoice number",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: invoice.number,
							onChange: (e) => patch({ number: e.target.value })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Due date",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: invoice.dueDate,
							onChange: (e) => patch({ dueDate: e.target.value })
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 mb-3 text-sm font-medium",
					children: "Bill to"
				}),
				clients.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Existing client",
					className: "mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "flex h-11 w-full rounded-md border border-input bg-card px-3 text-sm",
						value: "",
						onChange: (e) => {
							const c = clients.find((cl) => cl.id === e.target.value);
							if (!c) return;
							patch({ client: {
								id: c.id,
								name: c.name,
								email: c.email
							} });
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select a saved client"
						}), clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name || c.email
						}, c.id))]
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Client name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: invoice.client.name,
							onChange: (e) => patch({ client: {
								...invoice.client,
								name: e.target.value
							} })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Client email",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							value: invoice.client.email,
							onChange: (e) => patch({ client: {
								...invoice.client,
								email: e.target.value
							} })
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Line items"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: () => patch({ lineItems: [...invoice.lineItems, emptyLineItem()] }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Add"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: invoice.lineItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-12 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "col-span-12 sm:col-span-6",
								placeholder: "Description",
								"aria-label": "Line item description",
								value: item.description,
								onChange: (e) => {
									const lineItems = [...invoice.lineItems];
									lineItems[index] = {
										...item,
										description: e.target.value
									};
									patch({ lineItems });
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "col-span-4 sm:col-span-2",
								type: "number",
								min: 0,
								step: "1",
								value: item.quantity,
								onChange: (e) => {
									const lineItems = [...invoice.lineItems];
									lineItems[index] = {
										...item,
										quantity: Number(e.target.value)
									};
									patch({ lineItems });
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "col-span-6 sm:col-span-3",
								type: "number",
								min: 0,
								step: "0.01",
								value: item.rate,
								onChange: (e) => {
									const lineItems = [...invoice.lineItems];
									lineItems[index] = {
										...item,
										rate: Number(e.target.value)
									};
									patch({ lineItems });
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								className: "col-span-2 size-11 sm:col-span-1",
								onClick: () => patch({ lineItems: invoice.lineItems.length === 1 ? [emptyLineItem()] : invoice.lineItems.filter((row) => row.id !== item.id) }),
								"aria-label": "Remove line",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
							})
						]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: "Currency",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "flex h-11 w-full rounded-md border border-input bg-card px-3 text-sm",
								value: effectiveCurrency,
								onChange: (e) => patch({ currency: e.target.value }),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "USD",
										children: "USD — US Dollar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "EUR",
										children: "EUR — Euro"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "GBP",
										children: "GBP — Pound Sterling"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "INR",
										children: "INR — Indian Rupee"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "AUD",
										children: "AUD — Australian Dollar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "CAD",
										children: "CAD — Canadian Dollar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "SGD",
										children: "SGD — Singapore Dollar"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "All amounts use this currency."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: "Tax rate (%)",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								step: "0.01",
								value: invoice.taxRate,
								onChange: (e) => patch({ taxRate: Number(e.target.value) })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "Hidden on preview when 0%."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between rounded-md border border-border bg-secondary/50 px-3 py-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium tabular-nums",
								children: formatMoney(total, effectiveCurrency)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Notes",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 2,
						placeholder: "Payment via UPI, cards, or netbanking. Thank you.",
						value: invoice.notes,
						onChange: (e) => patch({ notes: e.target.value })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					open: hasFromDetails || void 0,
					className: "mt-6 overflow-hidden rounded-lg border border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
						className: "flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium",
						children: ["Studio details", hasFromDetails ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "max-w-40 truncate text-xs font-normal text-muted-foreground",
							children: invoice.fromName || invoice.fromEmail
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-normal text-muted-foreground",
							children: "Prefilled from Settings"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 border-t border-border p-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Studio name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: invoice.fromName,
									onChange: (e) => patch({ fromName: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									value: invoice.fromEmail,
									onChange: (e) => patch({ fromEmail: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Address",
								className: "sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: invoice.fromAddress || "",
									onChange: (e) => patch({ fromAddress: e.target.value })
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-lg border border-border bg-secondary/40 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium",
							children: "Payment details"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "These details are shown to your client. Money goes directly to your UPI, bank, or PayPal account."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
								label: "UPI ID",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: invoice.paymentMethods?.upiId || "",
									onChange: (e) => patch({ paymentMethods: {
										...invoice.paymentMethods || {},
										upiId: e.target.value
									} }),
									placeholder: "yourname@upi"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Only shown on public page for INR invoices"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "PayPal.me link or email",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: invoice.paymentMethods?.paypalEmail || "",
									onChange: (e) => patch({ paymentMethods: {
										...invoice.paymentMethods || {},
										paypalEmail: e.target.value
									} }),
									placeholder: "paypal.me/yourname or email"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							open: hasBankDetails || void 0,
							className: "mt-4 overflow-hidden rounded-lg border border-border bg-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
								className: "flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium",
								children: ["Add bank details", hasBankDetails ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800",
									children: "Added"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-normal text-muted-foreground",
									children: "Optional"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 border-t border-border p-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Bank name",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: invoice.paymentMethods?.bankName || "",
											onChange: (e) => patch({ paymentMethods: {
												...invoice.paymentMethods || {},
												bankName: e.target.value
											} }),
											placeholder: "HDFC Bank"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Account name",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: invoice.paymentMethods?.bankAccountName || "",
											onChange: (e) => patch({ paymentMethods: {
												...invoice.paymentMethods || {},
												bankAccountName: e.target.value
											} }),
											placeholder: "Your name or business"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Account number / IBAN",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: invoice.paymentMethods?.bankAccount || "",
											onChange: (e) => patch({ paymentMethods: {
												...invoice.paymentMethods || {},
												bankAccount: e.target.value
											} }),
											placeholder: "Acc. no / IBAN"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "IFSC / SWIFT",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: invoice.paymentMethods?.bankIfscSwift || "",
											onChange: (e) => patch({ paymentMethods: {
												...invoice.paymentMethods || {},
												bankIfscSwift: e.target.value
											} }),
											placeholder: "IFSC or SWIFT code"
										})
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-xl border border-primary/25 bg-gradient-to-br from-primary/5 to-transparent p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
									className: "size-4",
									"aria-hidden": "true"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex flex-wrap items-center gap-2 text-sm font-medium",
								children: ["Repeat billing, handled", !serverPro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground",
									children: "Pro"
								}) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: serverPro ? "We’ll draft the next invoice for you, automatically." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"Unlock automatic repeat invoices — ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/app/settings",
										search: { pro: void 0 },
										className: "font-medium text-primary underline underline-offset-4",
										children: "Get Pro"
									}),
									"."
								] })
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: Boolean(invoice.recurrence?.enabled),
							disabled: !serverPro,
							onCheckedChange: (enabled) => patch({ recurrence: {
								enabled,
								frequency: invoice.recurrence?.frequency || "monthly",
								nextRunAt: enabled ? new Date(Date.now() + 864e5).toISOString() : invoice.recurrence?.nextRunAt,
								endDate: invoice.recurrence?.endDate
							} })
						})]
					}), serverPro && invoice.recurrence?.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Frequency",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "flex h-11 w-full rounded-md border border-input bg-card px-3 text-sm",
									value: invoice.recurrence.frequency,
									onChange: (e) => patch({ recurrence: {
										...invoice.recurrence,
										frequency: e.target.value
									} }),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "weekly",
											children: "Weekly"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "monthly",
											children: "Monthly"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "quarterly",
											children: "Quarterly"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "yearly",
											children: "Yearly"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "End date (optional)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: invoice.recurrence.endDate?.slice(0, 10) || "",
									onChange: (e) => patch({ recurrence: {
										...invoice.recurrence,
										endDate: e.target.value || void 0
									} })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "col-span-full flex items-center justify-between gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Remind before due date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: Boolean(invoice.reminderEnabled),
									onCheckedChange: (reminderEnabled) => patch({ reminderEnabled })
								})]
							})
						]
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-3.5" }), " Auto-saves locally. Save, copy link, or get paid publishes a public page — money goes directly to your accounts."]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "lg:sticky lg:top-24 lg:self-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 hidden text-xs tracking-[0.16em] text-muted-foreground uppercase lg:block",
				children: "Live preview"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceDocument, {
				invoice: {
					...invoice,
					currency: effectiveCurrency
				},
				branded,
				className: "rounded-xl"
			})]
		})]
	});
}
function Field({ label, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: `grid gap-1.5 ${className ?? ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function EditorPage() {
	const { id } = Route$18.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceEditor, { invoiceId: id });
}
//#endregion
export { EditorPage as component };
