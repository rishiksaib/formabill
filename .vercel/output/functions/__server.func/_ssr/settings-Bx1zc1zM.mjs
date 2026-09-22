import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Route$15 } from "./router-BozvWNW5.mjs";
import { t as Button } from "./button-CYO0UllO.mjs";
import { t as Input } from "./input-03uEhuzd.mjs";
import { t as Label } from "./label-BHyMjyQZ.mjs";
import { n as useStore } from "./context-C9_A_ogf.mjs";
import { t as Textarea } from "./textarea-Du_npzpQ.mjs";
import { r as signOut } from "./client-CL5bX-pj.mjs";
import { t as useCurrentUserState } from "./use-current-user-DfN2vssX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-Bx1zc1zM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { ready, settings, saveSettings } = useStore();
	const { pro: proReturn } = Route$15.useSearch();
	const navigate = useNavigate();
	const fileRef = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [proBusy, setProBusy] = (0, import_react.useState)(false);
	const [serverPro, setServerPro] = (0, import_react.useState)(null);
	const [serverLifetime, setServerLifetime] = (0, import_react.useState)(false);
	const [serverProSource, setServerProSource] = (0, import_react.useState)(null);
	const [platformConfigured, setPlatformConfigured] = (0, import_react.useState)(false);
	const [authenticated, setAuthenticated] = (0, import_react.useState)(null);
	const [plan, setPlan] = (0, import_react.useState)("pro_monthly");
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const { user: accountUser, isPending: accountPending } = useCurrentUserState();
	const [mcpTokens, setMcpTokens] = (0, import_react.useState)([]);
	const [mcpName, setMcpName] = (0, import_react.useState)("");
	const [mcpSecret, setMcpSecret] = (0, import_react.useState)(null);
	const [mcpBusy, setMcpBusy] = (0, import_react.useState)(false);
	const [mcpNeedsSignIn, setMcpNeedsSignIn] = (0, import_react.useState)(false);
	const [mcpCanAccess, setMcpCanAccess] = (0, import_react.useState)(false);
	const [giftCodes, setGiftCodes] = (0, import_react.useState)([]);
	const [giftCanGift, setGiftCanGift] = (0, import_react.useState)(false);
	const [giftRemaining, setGiftRemaining] = (0, import_react.useState)(0);
	const [giftProSource, setGiftProSource] = (0, import_react.useState)(null);
	const [giftGrantLabel, setGiftGrantLabel] = (0, import_react.useState)(null);
	const [giftLoadError, setGiftLoadError] = (0, import_react.useState)(null);
	const [giftFresh, setGiftFresh] = (0, import_react.useState)(null);
	const [giftBusy, setGiftBusy] = (0, import_react.useState)(false);
	const [redeemCode, setRedeemCode] = (0, import_react.useState)("");
	const [redeemBusy, setRedeemBusy] = (0, import_react.useState)(false);
	const [referral, setReferral] = (0, import_react.useState)(null);
	const onSignOut = async () => {
		setSigningOut(true);
		try {
			await signOut("/");
		} catch {
			setSigningOut(false);
			toast.error("Could not sign out — please try again");
		}
	};
	const isPro = serverPro ?? false;
	const loadProStatus = async () => {
		try {
			const response = await fetch("/api/pro/status");
			if (!response.ok) return;
			const status = await response.json();
			setServerPro(Boolean(status.isPro));
			setServerLifetime(Boolean(status.lifetime));
			setServerProSource(status.proSource ?? null);
			setPlatformConfigured(Boolean(status.configured));
			setAuthenticated(Boolean(status.authenticated));
		} catch {}
	};
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		loadProStatus();
	}, [ready]);
	const loadMcpTokens = async () => {
		try {
			const response = await fetch("/api/mcp/tokens");
			if (response.status === 401) {
				setMcpNeedsSignIn(true);
				return;
			}
			if (!response.ok) throw new Error("Could not load tokens");
			const json = await response.json();
			setMcpTokens(json.tokens ?? []);
			setMcpCanAccess(Boolean(json.canAccess));
			setMcpNeedsSignIn(false);
		} catch {
			toast.error("Could not load MCP tokens");
		}
	};
	(0, import_react.useEffect)(() => {
		if (!ready || !isPro) return;
		loadMcpTokens();
	}, [ready, isPro]);
	const loadGiftCodes = async () => {
		try {
			const response = await fetch("/api/gift-codes");
			if (response.status === 401) return;
			if (!response.ok) {
				const json = await response.json().catch(() => ({}));
				throw new Error(json.error || `Gift service answered ${response.status}`);
			}
			const json = await response.json();
			setGiftCodes(json.codes ?? []);
			setGiftCanGift(Boolean(json.canGift));
			setGiftRemaining(Number(json.giftsRemaining ?? 0));
			setGiftProSource(json.proSource ?? null);
			setGiftGrantLabel(json.grantLabel ?? null);
			setGiftLoadError(null);
		} catch (error) {
			setGiftLoadError(error instanceof Error ? error.message : "Could not load gift codes");
		}
	};
	const loadReferral = async () => {
		try {
			const response = await fetch("/api/referrals/mine");
			if (!response.ok) return;
			const json = await response.json();
			setReferral(json);
		} catch {}
	};
	(0, import_react.useEffect)(() => {
		if (!ready || authenticated === false) return;
		loadGiftCodes();
		loadReferral();
	}, [ready, authenticated]);
	const onGenerateGift = async () => {
		setGiftBusy(true);
		try {
			const response = await fetch("/api/gift-codes", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({})
			});
			const json = await response.json();
			if (!response.ok) throw new Error(json.error || "Could not create gift code");
			setGiftFresh(json.code ?? null);
			await loadGiftCodes();
			toast.success("Gift code created — share it with your friend");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not create gift code");
		} finally {
			setGiftBusy(false);
		}
	};
	const onRedeemGift = async () => {
		if (!redeemCode.trim()) {
			toast.error("Enter a gift code first");
			return;
		}
		setRedeemBusy(true);
		try {
			const response = await fetch("/api/gift-codes/redeem", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ code: redeemCode })
			});
			const json = await response.json();
			if (!response.ok || !json.ok) throw new Error(json.error || "Could not redeem code");
			setRedeemCode("");
			await loadProStatus();
			await loadGiftCodes();
			const days = Number(json.giftDurationDays ?? 30);
			toast.success(`Pro unlocked for ${days === 30 ? "1 month" : `${days} days`} — enjoy!`);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not redeem code");
		} finally {
			setRedeemBusy(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (!ready || proReturn !== "success") return;
		toast.message("Pro payment received", { description: "Activating your Pro workspace…" });
		loadProStatus();
		const timer = window.setTimeout(() => void loadProStatus(), 4e3);
		return () => window.clearTimeout(timer);
	}, [ready, proReturn]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-xl bg-muted/60" });
	const loadRazorpayCheckoutJs = () => {
		const globalWindow = window;
		if (typeof globalWindow.Razorpay !== "undefined") return Promise.resolve(true);
		globalWindow.__fbRazorpayPromise ??= new Promise((resolve) => {
			const timer = window.setTimeout(() => resolve(false), 12e3);
			const script = document.createElement("script");
			script.src = "https://checkout.razorpay.com/v1/checkout.js";
			script.async = true;
			script.onload = () => {
				window.clearTimeout(timer);
				resolve(typeof globalWindow.Razorpay !== "undefined");
			};
			script.onerror = () => {
				window.clearTimeout(timer);
				resolve(false);
			};
			document.head.appendChild(script);
		});
		return globalWindow.__fbRazorpayPromise;
	};
	const openProFallbackLink = async () => {
		const response = await fetch("/api/pro/checkout", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				plan,
				method: "link"
			})
		});
		const json = await response.json();
		if (!response.ok || !json.shortUrl) throw new Error(json.error || json.message || "Pro checkout is unavailable");
		window.location.href = json.shortUrl;
	};
	const startProCheckout = async () => {
		setProBusy(true);
		try {
			const response = await fetch("/api/pro/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					plan,
					method: "modal"
				})
			});
			const json = await response.json();
			if (response.status === 401) {
				toast.message("Sign in to get Pro", { description: "Checkout links to your account so we can activate it." });
				await navigate({ to: "/login" });
				return;
			}
			if (!response.ok || !json.configured || json.method !== "modal" || !json.orderId || !json.keyId || typeof json.amount !== "number" || !json.currency) throw new Error(json.error || json.message || "Pro checkout is unavailable");
			if (!await loadRazorpayCheckoutJs()) {
				toast.message("Checkout couldn't load", { description: "Opening the secure hosted page instead." });
				await openProFallbackLink();
				return;
			}
			const Razorpay = window.Razorpay;
			const checkout = new Razorpay({
				key: json.keyId,
				amount: json.amount,
				currency: json.currency,
				name: "FormaBill Pro",
				description: plan === "pro_yearly" ? "Pro Yearly — $99/yr" : "Pro Monthly — $11/mo",
				order_id: json.orderId,
				prefill: {
					name: settings.name || void 0,
					email: settings.email || void 0
				},
				theme: { color: "#1C3D36" },
				modal: { ondismiss: () => {
					setProBusy(false);
				} },
				handler: (rzpResponse) => {
					fetch("/api/pro/verify", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							orderId: rzpResponse.razorpay_order_id,
							paymentId: rzpResponse.razorpay_payment_id,
							signature: rzpResponse.razorpay_signature
						})
					}).catch(() => void 0);
					toast.message("Payment received", { description: "Activating your Pro workspace…" });
					window.location.href = "/app/settings?pro=success";
				}
			});
			checkout.on("payment.failed", (failed) => {
				setProBusy(false);
				toast.error(failed.error?.description || "Payment failed — no charge was made");
			});
			checkout.open();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not start Pro checkout");
			setProBusy(false);
		}
	};
	const copyText = async (value, label) => {
		try {
			await navigator.clipboard.writeText(value);
			toast.success(`${label} copied`);
		} catch {
			toast.error(`Could not copy ${label.toLowerCase()}`);
		}
	};
	const onGenerateToken = async () => {
		setMcpBusy(true);
		try {
			const response = await fetch("/api/mcp/tokens", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: mcpName })
			});
			const json = await response.json();
			if (!response.ok) throw new Error(json.error || "Could not create token");
			setMcpSecret(json.token ?? null);
			setMcpName("");
			await loadMcpTokens();
			toast.success("Token created — copy it now, it won't be shown again");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not create token");
		} finally {
			setMcpBusy(false);
		}
	};
	const onTestMcpConnection = async (secret) => {
		try {
			const response = await fetch("/api/mcp", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json, text/event-stream",
					Authorization: `Bearer ${secret}`
				},
				body: JSON.stringify({
					jsonrpc: "2.0",
					id: "ping-1",
					method: "tools/list",
					params: {}
				})
			});
			if (!response.ok) throw new Error(`Server answered ${response.status}`);
			const json = await response.json();
			if (json.error) throw new Error(json.error.message || "Connection failed");
			const count = json.result?.tools?.length ?? 0;
			toast.success(`Connected — ${count} tools available`);
		} catch {
			toast.error("Connection failed — check the URL and token, then retry");
		}
	};
	const onRevokeToken = async (id) => {
		try {
			if (!(await fetch(`/api/mcp/tokens/${encodeURIComponent(id)}`, { method: "DELETE" })).ok) throw new Error("Could not revoke token");
			if (mcpSecret) setMcpSecret(null);
			await loadMcpTokens();
			toast.success("Token revoked");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not revoke token");
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
	const accountLabel = accountUser?.displayName ?? accountUser?.primaryEmail ?? "Account";
	const paymentMethods = settings.paymentMethods || {};
	const hasBankDetails = Boolean(paymentMethods.bankName || paymentMethods.bankAccountName || paymentMethods.bankAccount || paymentMethods.bankIfscSwift);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.16em] text-muted-foreground uppercase",
				children: "Workspace"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Everything saves automatically."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-label": "Account",
				className: "mt-6 rounded-xl border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.16em] text-muted-foreground uppercase",
					children: "Account"
				}), accountPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-12 animate-pulse rounded-lg bg-muted/60" }) : accountUser && !accountUser.isDevFallback ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-4",
					children: [
						accountUser.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: accountUser.profileImageUrl,
							alt: "",
							className: "h-12 w-12 rounded-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							className: "grid h-12 w-12 place-items-center rounded-full bg-secondary text-lg font-medium text-foreground",
							children: accountLabel.charAt(0).toUpperCase()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: accountUser.displayName ?? "Account"
							}), accountUser.primaryEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted-foreground",
								children: accountUser.primaryEmail
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							disabled: signingOut,
							onClick: () => void onSignOut(),
							children: signingOut ? "Signing out…" : "Sign out"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Not signed in. Sign in for sync, per-user limits, and Pro."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: "Sign in"
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				kicker: "Studio details",
				title: "Your studio",
				blurb: "Prefills every new invoice.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Studio name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: settings.name,
								onChange: (e) => void saveSettings({ name: e.target.value }),
								placeholder: "North Studio"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									value: settings.email,
									onChange: (e) => void saveSettings({ email: e.target.value }),
									placeholder: "hello@studio.com"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Default currency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
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
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 2,
								value: settings.address || "",
								onChange: (e) => void saveSettings({ address: e.target.value }),
								placeholder: "Street, city, country"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 sm:max-w-48",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Default tax rate (%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								step: "0.01",
								value: settings.defaultTaxRate,
								onChange: (e) => void saveSettings({ defaultTaxRate: Number(e.target.value) })
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				kicker: "Payment methods",
				title: "How clients pay you",
				blurb: "Shown on your invoices. Money goes to your own accounts.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "UPI ID" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: settings.paymentMethods?.upiId || "",
									onChange: (e) => void saveSettings({ paymentMethods: {
										...settings.paymentMethods || {},
										upiId: e.target.value
									} }),
									placeholder: "yourname@upi"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "For INR invoices."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "PayPal link or email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: settings.paymentMethods?.paypalEmail || "",
								onChange: (e) => void saveSettings({ paymentMethods: {
									...settings.paymentMethods || {},
									paypalEmail: e.target.value
								} }),
								placeholder: "paypal.me/yourname or paypal@example.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							open: hasBankDetails || void 0,
							className: "overflow-hidden rounded-lg border border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
								className: "flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium",
								children: ["Bank details", hasBankDetails ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800",
									children: "Added"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-normal text-muted-foreground",
									children: "Optional"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 border-t border-border p-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Bank name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
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
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Account name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
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
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Account number / IBAN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
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
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "IFSC / SWIFT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: settings.paymentMethods?.bankIfscSwift || "",
											onChange: (e) => void saveSettings({ paymentMethods: {
												...settings.paymentMethods || {},
												bankIfscSwift: e.target.value
											} }),
											placeholder: "IFSC or SWIFT code"
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-dashed border-border bg-secondary/40 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-foreground",
									children: "Razorpay"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "Optional. Test keys only — secrets stay in this browser."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: settings.paymentMethods?.razorpayKeyId || "",
										onChange: (e) => void saveSettings({ paymentMethods: {
											...settings.paymentMethods || {},
											razorpayKeyId: e.target.value
										} }),
										placeholder: "rzp_test_xxxxx",
										"aria-label": "Razorpay Key ID"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "password",
										value: settings.paymentMethods?.razorpayKeySecret || "",
										onChange: (e) => void saveSettings({ paymentMethods: {
											...settings.paymentMethods || {},
											razorpayKeySecret: e.target.value
										} }),
										placeholder: "Key secret",
										"aria-label": "Razorpay Key Secret",
										autoComplete: "off"
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				kicker: "Branding",
				title: "Logo",
				blurb: "Appears on invoices, public pages, and PDFs. PNG or JPG under 800KB works best.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-4",
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
							children: "Upload logo"
						}),
						settings.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => void saveSettings({ logoUrl: "" }),
							children: "Remove"
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpSection, {
				isPro,
				canAccess: mcpCanAccess,
				needsSignIn: mcpNeedsSignIn,
				tokens: mcpTokens,
				name: mcpName,
				onNameChange: setMcpName,
				secret: mcpSecret,
				onDismissSecret: () => setMcpSecret(null),
				busy: mcpBusy,
				onGenerate: () => void onGenerateToken(),
				onRevoke: (id) => void onRevokeToken(id),
				onCopy: (value, label) => void copyText(value, label),
				onTest: (value) => void onTestMcpConnection(value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftSection, {
				isPro,
				signedIn: authenticated !== false,
				codes: giftCodes,
				canGift: giftCanGift,
				giftsRemaining: giftRemaining,
				proSource: giftProSource,
				grantLabel: giftGrantLabel,
				loadError: giftLoadError,
				fresh: giftFresh,
				onDismissFresh: () => setGiftFresh(null),
				busy: giftBusy,
				onGenerate: () => void onGenerateGift(),
				redeemCode,
				onRedeemCodeChange: setRedeemCode,
				redeemBusy,
				onRedeem: () => void onRedeemGift(),
				onCopy: (value, label) => void copyText(value, label)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferralSection, {
				referral,
				signedIn: authenticated !== false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				id: "pro",
				kicker: "Pro workspace",
				title: "Go Pro",
				blurb: "Recurring invoices, due-date reminders, and no FormaBill branding. Client money still goes to your own accounts.",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-secondary px-3 py-1 text-xs font-medium",
							children: isPro ? serverLifetime ? "Pro active · Lifetime" : serverProSource === "gift" ? "Pro (gift)" : "Pro active" : "Free plan · 5 invoices/mo"
						}), isPro && serverLifetime ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "basis-full text-xs text-muted-foreground",
							children: "Lifetime Pro — no subscription, no renewals, everything unlocked."
						}) : null]
					}),
					!isPro && authenticated === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						className: "mt-4 w-full sm:w-auto",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: "Sign in to get Pro"
						})
					}) : null,
					!isPro && authenticated !== false ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-2 sm:grid-cols-2",
						role: "group",
						"aria-label": "Pro billing period",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": plan === "pro_monthly",
							onClick: () => setPlan("pro_monthly"),
							className: `rounded-xl border p-4 text-left transition-colors ${plan === "pro_monthly" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: "Monthly"
									}), plan === "pro_monthly" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground",
										children: "Selected"
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 block font-display text-2xl tracking-tight",
									children: ["$11", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground",
										children: "/mo"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-xs text-muted-foreground",
									children: "Flexible, cancel anytime."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": plan === "pro_yearly",
							onClick: () => setPlan("pro_yearly"),
							className: `rounded-xl border p-4 text-left transition-colors ${plan === "pro_yearly" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: "Yearly"
									}), plan === "pro_yearly" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground",
										children: "Selected"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-800",
										children: "Save $33"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 block font-display text-2xl tracking-tight",
									children: ["$99", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground",
										children: "/yr"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-xs text-muted-foreground",
									children: "Two months free vs monthly."
								})
							]
						})]
					}) : null,
					!isPro && authenticated !== false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						className: "mt-4 w-full sm:w-auto",
						disabled: proBusy,
						onClick: () => void startProCheckout(),
						children: proBusy ? "Opening checkout…" : plan === "pro_yearly" ? "Get Pro — $99/yr" : "Get Pro — $11/mo"
					}) : null,
					!isPro && !platformConfigured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: "Pro checkout is not available yet — your free plan works fully meanwhile."
					}) : null,
					!isPro && platformConfigured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: "Secure checkout via Razorpay. Pro is billed by FormaBill; client invoice money still goes to your own accounts."
					}) : null,
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
function giftLengthLabel(days) {
	if (days === 30) return "1 month Pro";
	if (days % 30 === 0) return `${days / 30} months Pro`;
	return `${days} days Pro`;
}
function McpSection({ isPro, canAccess, needsSignIn, tokens, name, onNameChange, secret, onDismissSecret, busy, onGenerate, onRevoke, onCopy, onTest }) {
	const serverUrl = typeof window !== "undefined" ? `${window.location.origin}/api/mcp` : "/api/mcp";
	const [guide, setGuide] = (0, import_react.useState)("opencode");
	const connected = tokens.length > 0;
	const opencodeSnippet = JSON.stringify({
		$schema: "https://opencode.ai/config.json",
		mcp: { formabill: {
			type: "remote",
			url: serverUrl,
			enabled: true,
			oauth: false,
			headers: { Authorization: "Bearer PASTE_YOUR_KEY_HERE" }
		} }
	}, null, 2);
	if (!isPro) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		kicker: "AI / MCP",
		title: "Connect AI assistants",
		blurb: "Let Claude, Cursor, or another MCP-compatible AI list invoices, draft bills, and mark payments on your behalf.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-dashed border-border bg-secondary/40 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Pro feature"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "AI connection with personal access tokens is available on Pro. Your free plan works fully meanwhile."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					className: "mt-3",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#pro",
						children: "See Pro plans"
					})
				})
			]
		})
	});
	if (needsSignIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		kicker: "AI / MCP",
		title: "Connect AI assistants",
		blurb: "Let OpenCode, Claude, Cursor, or another MCP-compatible AI act on your account.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Sign in to manage MCP tokens."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					children: "Sign in"
				})
			})]
		})
	});
	if (isPro && !canAccess) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		kicker: "AI / MCP",
		title: "Connect AI assistants",
		blurb: "Let OpenCode, Claude, Cursor, or another MCP-compatible AI act on your account.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-dashed border-border bg-secondary/40 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Paid subscription required"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "AI connection needs a paid Pro subscription — gift and trial grants don't include it. Your Pro features work fully meanwhile."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
		kicker: "AI / MCP",
		title: "Connect AI assistants",
		blurb: "A personal key gives an AI full access to your invoices — it acts as you. Each key is shown once; revoke any key the moment it leaks.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${connected ? "bg-emerald-100 text-emerald-800" : "bg-secondary text-muted-foreground"}`,
					role: "status",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: `size-1.5 rounded-full ${connected ? "bg-emerald-600" : "bg-muted-foreground"}`
					}), connected ? `Connected · ${tokens.length} token${tokens.length === 1 ? "" : "s"}` : "Not connected"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "min-w-0 flex-1 truncate font-mono text-xs",
					children: serverUrl
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: () => onCopy(serverUrl, "Server URL"),
					children: "Copy URL"
				})]
			}),
			secret ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-emerald-200 bg-emerald-50 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-emerald-900",
						children: "Copy your token now — it won't be shown again"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 rounded-md bg-white px-3 py-2 font-mono text-xs break-all text-foreground",
						children: secret
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								onClick: () => onCopy(secret, "Token"),
								children: "Copy token"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: "outline",
								onClick: () => onTest(secret),
								children: "Test connection"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: "ghost",
								onClick: onDismissSecret,
								children: "I've saved it"
							})
						]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-2 sm:grid-cols-[1fr_auto]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => onNameChange(e.target.value),
					placeholder: "Token name, e.g. Claude Desktop",
					"aria-label": "New token name",
					maxLength: 80
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					disabled: busy,
					onClick: onGenerate,
					children: busy ? "Creating…" : "Generate token"
				})]
			}),
			tokens.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border",
				children: tokens.map((token) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: token.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate font-mono text-xs text-muted-foreground",
							children: [
								token.prefix,
								"•••• · created ",
								new Date(token.createdAt).toLocaleDateString(),
								token.lastUsedAt ? ` · used ${new Date(token.lastUsedAt).toLocaleDateString()}` : " · never used"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: () => onRevoke(token.id),
						children: "Revoke"
					})]
				}, token.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: "No tokens yet. Generate one above to connect your first assistant."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-lg border border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Connect your assistant"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex gap-1 rounded-lg bg-secondary/60 p-1",
						role: "tablist",
						"aria-label": "AI client guides",
						children: [
							{
								value: "opencode",
								label: "OpenCode"
							},
							{
								value: "claude",
								label: "Claude"
							},
							{
								value: "cursor",
								label: "Cursor"
							}
						].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": guide === tab.value,
							onClick: () => setGuide(tab.value),
							className: `flex-1 cursor-pointer rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${guide === tab.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: tab.label
						}, tab.value))
					}),
					guide === "opencode" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"OpenCode connects over remote HTTP — it uses an ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs",
									children: "mcp"
								}),
								" block with ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs",
									children: "type: \"remote\""
								}),
								", not",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs",
									children: "mcpServers"
								}),
								". Add this to your opencode config:"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
									className: "overflow-x-auto rounded-md bg-secondary/60 p-3 font-mono text-xs break-all whitespace-pre-wrap",
									children: opencodeSnippet
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: "outline",
									className: "absolute top-2 right-2",
									onClick: () => onCopy(opencodeSnippet, "OpenCode config"),
									children: "Copy"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Replace PASTE_YOUR_KEY_HERE, restart OpenCode, then ask it to list your invoices." })
						]
					}) : null,
					guide === "claude" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-3 list-decimal space-y-1 pl-5 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Generate a token above and copy it." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Claude Desktop → Settings → Connectors → Add custom connector: paste the server URL above, add header ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs",
									children: "Authorization"
								}),
								" with value",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs",
									children: "Bearer YOUR_TOKEN"
								}),
								". Remote HTTP is all our endpoint speaks — no stdio proxy needed."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Claude Code terminal:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs",
									children: "claude mcp add --transport http formabill URL --header \"Authorization: Bearer KEY\""
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Ask it to “list my invoices” — revoke the token here anytime to cut access." })
						]
					}) : null,
					guide === "cursor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-3 list-decimal space-y-1 pl-5 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Generate a token above and copy it." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Open Cursor → Settings → MCP → Add custom server (Streamable HTTP)." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Paste the server URL and the `Authorization: Bearer YOUR_TOKEN` header." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Ask it to “draft an invoice for Acme” — revoke the token here anytime." })
						]
					}) : null
				]
			})
		]
	});
}
function GiftSection({ isPro, signedIn, codes, canGift, giftsRemaining, proSource, grantLabel, loadError, fresh, onDismissFresh, busy, onGenerate, redeemCode, onRedeemCodeChange, redeemBusy, onRedeem, onCopy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
		kicker: "Gift codes",
		title: "Give Pro to a friend",
		blurb: "Paid subscribers get one code per billing period; lifetime accounts draw from a pool of 3. Redeeming unlocks Pro for a fixed stretch — never more gifting rights.",
		children: [loadError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive",
			role: "alert",
			children: ["Gift service error: ", loadError]
		}) : null, !signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Sign in to redeem or create gift codes."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					children: "Sign in"
				})
			})]
		}) : !isPro ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2 sm:grid-cols-[1fr_auto]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: redeemCode,
				onChange: (e) => onRedeemCodeChange(e.target.value),
				placeholder: "Have a code? Paste it here, e.g. PRO-XXXX-XXXX",
				"aria-label": "Gift code to redeem",
				className: "font-mono uppercase"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				disabled: redeemBusy,
				onClick: onRedeem,
				children: redeemBusy ? "Redeeming…" : "Redeem"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 rounded-lg border border-dashed border-border bg-secondary/40 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Creating codes is a Pro feature"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Paid subscribers get one gift code per billing period — 7 days of Pro on monthly, a full month on yearly."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					className: "mt-3",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#pro",
						children: "See Pro plans"
					})
				})
			]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			proSource === "gift" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-dashed border-border bg-secondary/40 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Pro (gift) — sharing codes not included"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Gifted Pro unlocks everything for you, but only paid subscribers can create new gift codes."
				})]
			}) : null,
			canGift ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: grantLabel ?? "1 gift code"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Single-use · expires in 90 days · ",
							giftsRemaining,
							" left",
							proSource === "subscription" ? " · refills with each Pro payment" : ""
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					disabled: busy,
					onClick: onGenerate,
					children: busy ? "Creating…" : "Create gift code"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: "You're already on Pro. Gift codes are for free accounts."
			})] }) : null,
			fresh ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-emerald-900",
						children: "Share this code — it works once and expires in 90 days"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 rounded-md bg-white px-3 py-2 text-center font-mono text-lg font-semibold tracking-widest text-foreground",
						children: fresh
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							onClick: () => onCopy(fresh, "Gift code"),
							children: "Copy code"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: onDismissFresh,
							children: "Done"
						})]
					})
				]
			}) : null,
			codes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border",
				children: codes.map((gift) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-mono text-sm font-semibold tracking-wider",
								children: gift.code
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									giftLengthLabel(gift.giftDurationDays ?? gift.durationMonths * 30),
									" · expires",
									" ",
									new Date(gift.expiresAt).toLocaleDateString(),
									gift.redeemedAt ? ` · redeemed ${new Date(gift.redeemedAt).toLocaleDateString()}` : ""
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `rounded-full px-2.5 py-0.5 text-xs font-medium ${gift.status === "unused" ? "bg-emerald-100 text-emerald-800" : gift.status === "redeemed" ? "bg-secondary text-muted-foreground" : "bg-amber-100 text-amber-800"}`,
							children: gift.status === "unused" ? "Unused" : gift.status === "redeemed" ? "Redeemed" : "Expired"
						}),
						gift.status === "unused" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: () => onCopy(gift.code, "Gift code"),
							children: "Copy"
						}) : null
					]
				}, gift.id))
			}) : canGift ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: "No codes yet. Create your first gift above."
			}) : null
		] })]
	});
}
function ReferralSection({ referral, signedIn }) {
	const link = typeof window !== "undefined" && referral ? `${window.location.origin}/?ref=${referral.code}` : "";
	if (!signedIn || !referral) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		kicker: "Referrals",
		title: "Earn free Pro",
		blurb: "Share your link. When a friend signs up and goes Pro, you get a free month.",
		children: !signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Sign in to get your referral link."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					children: "Sign in"
				})
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 animate-pulse rounded-lg bg-muted/60" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
		kicker: "Referrals",
		title: "Earn free Pro",
		blurb: "Share your link. When a friend signs up and goes Pro — by paying or redeeming a gift — you get 1 free month, stacked on anything you have.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-w-0 flex-1 truncate font-mono text-xs",
				children: link
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyLinkButton, {
				value: link,
				label: "Referral link"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid grid-cols-3 gap-2 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl tracking-tight",
						children: referral.signups
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: "Signups"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl tracking-tight",
						children: referral.proConversions
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: "Went Pro"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl tracking-tight",
						children: referral.monthsEarned
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: "Months earned"
					})]
				})
			]
		})]
	});
}
function CopyLinkButton({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		size: "sm",
		variant: "outline",
		onClick: () => {
			navigator.clipboard.writeText(value).then(() => toast.success(`${label} copied`)).catch(() => toast.error(`Could not copy ${label.toLowerCase()}`));
		},
		children: "Copy"
	});
}
function SectionCard({ kicker, title, blurb, children, id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id,
		className: "mt-6 scroll-mt-24 rounded-xl border border-border bg-card p-6 sm:p-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.16em] text-muted-foreground uppercase",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-xl tracking-tight",
				children: title
			}),
			blurb ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: blurb
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5",
				children
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
