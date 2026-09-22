import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { O as CircleCheck, S as EyeOff, i as TriangleAlert, x as Eye } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { p as Route$24 } from "./router-Da7np6yV.mjs";
import { t as Button } from "./button-CYO0UllO.mjs";
import { t as Input } from "./input-03uEhuzd.mjs";
import { t as Label } from "./label-BHyMjyQZ.mjs";
import { t as authClient } from "./client-B4D8gW8h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-BxMAlxLf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPasswordPage() {
	const { token } = Route$24.useSearch();
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	if (!token) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-secondary/30 px-6 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "w-full max-w-md rounded-xl border border-border bg-card p-6 text-center shadow-paper sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "mx-auto size-8 text-muted-foreground",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-2xl",
					children: "This reset link is incomplete"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "It's missing its security token. Use the full link from your email, or request a fresh one."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6 w-full",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/forgot-password",
						children: "Get a new link"
					})
				})
			]
		})
	});
	const submit = async (event) => {
		event.preventDefault();
		if (password !== confirm) {
			setError("Passwords don’t match — type the same one twice.");
			return;
		}
		setBusy(true);
		setError(null);
		try {
			const { error } = await authClient.resetPassword({
				newPassword: password,
				token
			});
			if (error) throw new Error(error.message || "Could not reset the password");
			setDone(true);
			toast.success("Password updated — sign in with your new password");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Could not reset the password";
			const friendly = /invalid|expired|token/i.test(message) ? "This link is invalid or expired — links last 1 hour and work once. Request a fresh one below." : message;
			setError(friendly);
		} finally {
			setBusy(false);
		}
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
					children: "Account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl",
					children: "Set a new password"
				}),
				done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-sm font-medium text-emerald-900",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Password updated"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-emerald-900",
							children: "Your old password no longer works. Sign in with the new one."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-4 w-full",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Sign in"
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive",
					role: "alert",
					children: error
				}) : null, /invalid|expired/i.test(error ?? "") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/forgot-password",
						children: "Get a new link"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 grid gap-4",
					onSubmit: submit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "reset-password",
								children: "New password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "reset-password",
									required: true,
									minLength: 8,
									type: showPassword ? "text" : "password",
									value: password,
									onChange: (event) => setPassword(event.target.value),
									autoComplete: "new-password",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Confirm password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								minLength: 8,
								type: showPassword ? "text" : "password",
								value: confirm,
								onChange: (event) => setConfirm(event.target.value),
								autoComplete: "new-password"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							children: busy ? "Updating…" : "Update password"
						})
					]
				})] })
			]
		})
	});
}
//#endregion
export { ResetPasswordPage as component };
