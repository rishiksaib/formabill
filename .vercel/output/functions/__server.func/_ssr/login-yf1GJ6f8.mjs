import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as authClient } from "./router-CP-Z3rz-.mjs";
import { t as Button } from "./button-CYO0UllO.mjs";
import { n as Label, t as Input } from "./label-DNloEtcu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-yf1GJ6f8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("sign-in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
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
					children: "Your local drafts stay available anonymously. Sign in when you are ready to publish and share."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								minLength: 8,
								type: "password",
								value: password,
								onChange: (event) => setPassword(event.target.value),
								autoComplete: mode === "sign-up" ? "new-password" : "current-password"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							children: busy ? "Working…" : mode === "sign-up" ? "Create account" : "Sign in"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-5 w-full text-sm text-muted-foreground underline underline-offset-4",
					onClick: () => setMode(mode === "sign-up" ? "sign-in" : "sign-up"),
					children: mode === "sign-up" ? "Already have an account? Sign in" : "New to FormaBill? Create an account"
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
