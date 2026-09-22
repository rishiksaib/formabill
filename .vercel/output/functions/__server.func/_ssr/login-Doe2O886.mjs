import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CYO0UllO.mjs";
import { t as Input } from "./input-03uEhuzd.mjs";
import { t as Label } from "./label-BHyMjyQZ.mjs";
import { S as EyeOff, h as LoaderCircle, k as Chrome, m as LogIn, r as Twitter, x as Eye } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as GROK_PROVIDERS } from "./router-Cjdf3_TI.mjs";
import { n as signIn, t as authClient } from "./client-5Om2XlYA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Doe2O886.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PROVIDER_ICONS = {
	"grok-google": Chrome,
	"grok-x": Twitter
};
/**
* One working OAuth button per configured upstream. Render only when the
* server reports `oauth: true` (`/api/auth-status`) — each button starts the
* real broker flow, never a dead end.
*/
function SignInButtons() {
	const [busy, setBusy] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid w-full gap-2",
		children: GROK_PROVIDERS.map((p) => {
			const Icon = PROVIDER_ICONS[p.providerId] ?? LogIn;
			const loading = busy === p.providerId;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: busy !== null,
				onClick: () => {
					setBusy(p.providerId);
					signIn(p.providerId, { callbackURL: "/" }).catch((error) => {
						toast.error(error instanceof Error ? error.message : "Sign-in failed");
					}).finally(() => setBusy(null));
				},
				className: "flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary/70 disabled:cursor-wait disabled:opacity-60",
				children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "size-4 animate-spin",
					"aria-hidden": "true"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-4",
					"aria-hidden": "true"
				}), loading ? `Connecting to ${p.label}…` : `Continue with ${p.label}`]
			}, p.providerId);
		})
	});
}
function readWaitlistEmail() {
	if (typeof window === "undefined") return null;
	try {
		return window.localStorage.getItem("formabill-waitlist-email");
	} catch {
		return null;
	}
}
function LoginWaitlist() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)(null);
	const submit = (event) => {
		event.preventDefault();
		const value = email.trim();
		if (!value) return;
		try {
			window.localStorage.setItem("formabill-waitlist-email", value);
		} catch {}
		setSaved(value);
		setEmail("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-secondary/30 px-6 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-paper sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-display text-xl",
					children: "FormaBill"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-xs tracking-[0.16em] text-muted-foreground uppercase",
					children: "Coming soon"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl",
					children: "Sign in for sync & Pro"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Accounts aren't live yet — create, publish, share, mark paid, and get paid all work anonymously today. Leave your email and we'll invite you when sign-in opens."
				}),
				saved ?? readWaitlistEmail() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900",
					role: "status",
					children: [
						"You're on the list",
						saved ? ` as ${saved}` : "",
						". We'll be in touch."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 grid gap-4",
					onSubmit: submit,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							required: true,
							type: "email",
							value: email,
							onChange: (event) => setEmail(event.target.value),
							autoComplete: "email",
							placeholder: "you@studio.com"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Notify me"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-5 w-full",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app",
						children: "Start invoicing"
					})
				})
			]
		})
	});
}
function LoginPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("sign-in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [methods, setMethods] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		fetch("/api/auth-status").then(async (response) => {
			if (!response.ok) return null;
			return await response.json();
		}).then((status) => {
			if (!cancelled && status) setMethods(status);
		}).catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, []);
	const submit = async (event) => {
		event.preventDefault();
		setBusy(true);
		try {
			const result = mode === "sign-up" ? await authClient.signUp.email({
				name,
				email,
				password
			}) : await authClient.signIn.email({
				email,
				password
			});
			if (result.error) throw new Error(result.error.message || "Authentication failed");
			toast.success(mode === "sign-up" ? "Account created" : "Signed in");
			await navigate({ to: "/app" });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Authentication failed");
		} finally {
			setBusy(false);
		}
	};
	if (methods && !methods.emailPassword && !methods.oauth) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginWaitlist, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-secondary/30 px-6 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-paper sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-display text-xl",
					children: "FormaBill"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-xs tracking-[0.16em] text-muted-foreground uppercase",
					children: "Account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl",
					children: mode === "sign-up" ? "Create your account" : "Sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Your drafts stay available anonymously. Sign in for sync, per-user limits, and Pro."
				}),
				methods?.oauth ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButtons, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-5 flex items-center gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
							"or with email",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
						]
					})]
				}) : null,
				methods && !methods.emailPassword ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 grid gap-4",
					onSubmit: submit,
					children: [
						mode === "sign-up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								value: name,
								onChange: (event) => setName(event.target.value),
								autoComplete: "name"
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								type: "email",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								autoComplete: "email"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "login-password",
									children: "Password"
								}), mode === "sign-in" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/forgot-password",
									className: "text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground",
									children: "Forgot password?"
								}) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "login-password",
									required: true,
									minLength: 8,
									type: showPassword ? "text" : "password",
									value: password,
									onChange: (event) => setPassword(event.target.value),
									autoComplete: mode === "sign-up" ? "new-password" : "current-password",
									className: "pr-11"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowPassword((value) => !value),
									"aria-label": showPassword ? "Hide password" : "Show password",
									"aria-pressed": showPassword,
									className: "absolute top-1/2 right-2 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground",
									children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							children: busy ? "Working…" : mode === "sign-up" ? "Create account" : "Sign in"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-5 w-full text-sm text-muted-foreground underline underline-offset-4",
					onClick: () => setMode(mode === "sign-up" ? "sign-in" : "sign-up"),
					children: mode === "sign-up" ? "Already have an account? Sign in" : "New to FormaBill? Create an account"
				})] })
			]
		})
	});
}
//#endregion
export { LoginPage as component };
