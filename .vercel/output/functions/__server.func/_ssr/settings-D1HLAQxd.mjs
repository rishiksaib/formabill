import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { s as Route$8 } from "./router-CL0Q_gzp.mjs";
import { t as Button } from "./button-CYO0UllO.mjs";
import { n as Label, t as Input } from "./label-DNloEtcu.mjs";
import { n as useStore } from "./context-Bqe4TywW.mjs";
import { t as Textarea } from "./textarea-Du_npzpQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-D1HLAQxd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { ready, settings, saveSettings } = useStore();
	const { pro: proReturn } = Route$8.useSearch();
	const fileRef = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [proBusy, setProBusy] = (0, import_react.useState)(false);
	const [serverPro, setServerPro] = (0, import_react.useState)(null);
	const [platformConfigured, setPlatformConfigured] = (0, import_react.useState)(false);
	const [plan, setPlan] = (0, import_react.useState)("pro_monthly");
	const loadProStatus = async () => {
		try {
			const response = await fetch("/api/pro/status");
			if (!response.ok) return;
			const status = await response.json();
			setServerPro(Boolean(status.isPro));
			setPlatformConfigured(Boolean(status.configured));
		} catch {}
	};
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		loadProStatus();
	}, [ready]);
	(0, import_react.useEffect)(() => {
		if (!ready || proReturn !== "success") return;
		toast.message("Pro payment received", { description: "Activating your Pro workspace…" });
		loadProStatus();
		const timer = window.setTimeout(() => void loadProStatus(), 4e3);
		return () => window.clearTimeout(timer);
	}, [ready, proReturn]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-xl bg-muted/60" });
	const isPro = serverPro ?? false;
	const startProCheckout = async () => {
		setProBusy(true);
		try {
			const response = await fetch("/api/pro/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ plan })
			});
			const json = await response.json();
			if (!response.ok || !json.shortUrl) throw new Error(json.error || json.message || "Pro checkout is unavailable");
			window.location.href = json.shortUrl;
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not start Pro checkout");
		} finally {
			setProBusy(false);
		}
	};
	const onLogo = (file) => {
		if (!file) return;
		if (file.size > 8e5) {
			toast.error("Logo should be under 800KB");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			saveSettings({ logoUrl: String(reader.result || "") });
		};
		reader.readAsDataURL(file);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.16em] text-muted-foreground uppercase",
				children: "Studio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 space-y-5 rounded-xl border border-border bg-card p-6",
				onSubmit: (e) => {
					e.preventDefault();
					toast.success("Settings saved");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Studio name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: settings.name,
							onChange: (e) => void saveSettings({ name: e.target.value }),
							placeholder: "North Studio"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							value: settings.email,
							onChange: (e) => void saveSettings({ email: e.target.value }),
							placeholder: "hello@studio.com"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							value: settings.address || "",
							onChange: (e) => void saveSettings({ address: e.target.value })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Default tax rate (%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 0,
							step: "0.01",
							value: settings.defaultTaxRate,
							onChange: (e) => void saveSettings({ defaultTaxRate: Number(e.target.value) })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Default currency" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "flex h-11 w-full rounded-md border border-input bg-card px-3 text-sm",
								value: settings.defaultCurrency,
								onChange: (e) => void saveSettings({ defaultCurrency: e.target.value }),
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "New invoices use this currency by default."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-secondary/40 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Payment methods"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "UPI ID" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: settings.paymentMethods?.upiId || "",
										onChange: (e) => void saveSettings({ paymentMethods: {
											...settings.paymentMethods || {},
											upiId: e.target.value
										} }),
										placeholder: "yourname@upi"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "PayPal.me link or email (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: settings.paymentMethods?.paypalEmail || "",
										onChange: (e) => void saveSettings({ paymentMethods: {
											...settings.paymentMethods || {},
											paypalEmail: e.target.value
										} }),
										placeholder: "paypal.me/yourname or paypal@example.com"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Bank name (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: settings.paymentMethods?.bankName || "",
										onChange: (e) => void saveSettings({ paymentMethods: {
											...settings.paymentMethods || {},
											bankName: e.target.value
										} }),
										placeholder: "HDFC Bank"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Account name (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: settings.paymentMethods?.bankAccountName || "",
										onChange: (e) => void saveSettings({ paymentMethods: {
											...settings.paymentMethods || {},
											bankAccountName: e.target.value
										} }),
										placeholder: "Your name or business"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Account number / IBAN (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: settings.paymentMethods?.bankAccount || "",
										onChange: (e) => void saveSettings({ paymentMethods: {
											...settings.paymentMethods || {},
											bankAccount: e.target.value
										} }),
										placeholder: "Acc. no / IBAN"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "IFSC / SWIFT (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: settings.paymentMethods?.bankIfscSwift || "",
										onChange: (e) => void saveSettings({ paymentMethods: {
											...settings.paymentMethods || {},
											bankIfscSwift: e.target.value
										} }),
										placeholder: "IFSC or SWIFT code"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-dashed border-border bg-background/70 p-3 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium text-foreground",
											children: "Razorpay"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1",
											children: "Optional. Test keys only — the secret is stored in this browser and sent to the server to create payment links. Never paste a live secret on a shared device, and never share it."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "mt-3",
											value: settings.paymentMethods?.razorpayKeyId || "",
											onChange: (e) => void saveSettings({ paymentMethods: {
												...settings.paymentMethods || {},
												razorpayKeyId: e.target.value
											} }),
											placeholder: "rzp_live_xxxxx"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "mt-3",
											type: "password",
											value: settings.paymentMethods?.razorpayKeySecret || "",
											onChange: (e) => void saveSettings({ paymentMethods: {
												...settings.paymentMethods || {},
												razorpayKeySecret: e.target.value
											} }),
											placeholder: "Razorpay Key Secret",
											autoComplete: "off"
										})
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Logo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-4",
						children: [
							settings.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: settings.logoUrl,
								alt: "Studio logo",
								className: "h-12 max-w-28 object-contain"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-xs text-muted-foreground",
								children: "Logo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: (e) => onLogo(e.target.files?.[0])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => fileRef.current?.click(),
								children: "Upload"
							}),
							settings.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => void saveSettings({ logoUrl: "" }),
								children: "Remove"
							}) : null
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-xl border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-start justify-between gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Pro workspace"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Pro is paid to FormaBill and unlocks recurring invoices, reminders, and branding removal. Your client invoice money always goes to your own UPI, PayPal, or Razorpay account — never to us."
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-secondary px-3 py-1 text-xs font-medium",
								children: isPro ? "Pro active" : "Free plan"
							}),
							!isPro ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								role: "group",
								"aria-label": "Pro billing period",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: plan === "pro_monthly" ? "default" : "outline",
									size: "sm",
									"aria-pressed": plan === "pro_monthly",
									onClick: () => setPlan("pro_monthly"),
									children: "Monthly — $11/mo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: plan === "pro_yearly" ? "default" : "outline",
									size: "sm",
									"aria-pressed": plan === "pro_yearly",
									onClick: () => setPlan("pro_yearly"),
									children: "Yearly — $99/yr"
								})]
							}) : null,
							!isPro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								disabled: proBusy,
								onClick: () => void startProCheckout(),
								children: proBusy ? "Opening checkout…" : plan === "pro_yearly" ? "Get Pro — $99/yr" : "Get Pro — $11/mo"
							}) : null,
							!isPro && !platformConfigured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "basis-full text-xs text-muted-foreground",
								children: "Demo mode — Pro checkout is not configured, so Upgrade will fail. In development you can preview Pro with the local toggle below (preview only, not a real subscription)."
							}) : null,
							!isPro && platformConfigured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "basis-full text-xs text-muted-foreground",
								children: "Secure checkout via Razorpay. Use test keys first — switch to live platform keys when you are ready to charge. Pro is billed by FormaBill; client invoice money still goes to your own accounts."
							}) : null,
							null
						]
					}),
					isPro ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 border-t border-border pt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Remind this many days before due" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 1,
								max: 30,
								value: settings.reminderDays ?? 3,
								onChange: (e) => void saveSettings({ reminderDays: Number(e.target.value) })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-4",
							variant: "outline",
							disabled: busy,
							onClick: async () => {
								setBusy(true);
								try {
									const res = await fetch("/api/recurring/process", { method: "POST" });
									const json = await res.json();
									if (!res.ok) throw new Error(json.error || "Failed");
									toast.success(`Generated ${json.generated ?? 0} recurring invoice(s)`);
								} catch (err) {
									toast.error(err instanceof Error ? err.message : "Failed");
								} finally {
									setBusy(false);
								}
							},
							children: "Process recurring invoices"
						})]
					}) : null
				]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
