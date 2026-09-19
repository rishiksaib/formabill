import { o as __toESM } from "../_runtime.mjs";
import { n as cn } from "./utils-DgMi_UEP.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, m as Outlet, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as FileText, n as Users, o as Settings, s as Plus } from "../_libs/lucide-react.mjs";
import { d as authConfigured$1 } from "./router-CL0Q_gzp.mjs";
import { t as Logo } from "./logo-ut0NUiCj.mjs";
import { t as Button } from "./button-CYO0UllO.mjs";
import { n as Label, t as Input } from "./label-DNloEtcu.mjs";
import { t as StoreProvider } from "./context-Bqe4TywW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-BGPowjr7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WAITLIST_KEY = "formabill-waitlist-email";
function getWaitlistEmail() {
	if (typeof window === "undefined") return null;
	try {
		return window.localStorage.getItem(WAITLIST_KEY);
	} catch {
		return null;
	}
}
/**
* "Sign in for sync & Pro — soon" dialog.
*
* Email waitlist only — no password field, no fake login. The address is kept
* in this browser's localStorage until a real auth backend exists.
*/
function WaitlistModal({ open, onClose }) {
	const [email, setEmail] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (open) setSaved(getWaitlistEmail());
	}, [open]);
	if (!open) return null;
	const submit = (event) => {
		event.preventDefault();
		const value = email.trim();
		if (!value) return;
		try {
			window.localStorage.setItem(WAITLIST_KEY, value);
		} catch {}
		setSaved(value);
		setEmail("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-black/50 px-4",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Sign in for sync and Pro — coming soon",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-lift",
			onClick: (event) => event.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.16em] text-muted-foreground uppercase",
					children: "Coming soon"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl tracking-tight",
					children: "Sign in for sync & Pro"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Accounts aren't live yet — everything works anonymously today. Leave your email and we'll invite you when sync & Pro sign-in opens."
				}),
				saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900",
					role: "status",
					children: [
						"You're on the list as ",
						saved,
						". We'll be in touch."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 grid gap-3",
					onSubmit: submit,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							required: true,
							value: email,
							onChange: (event) => setEmail(event.target.value),
							placeholder: "you@studio.com",
							autoComplete: "email"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Notify me"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "mt-3 w-full",
					onClick: onClose,
					children: "Back to invoicing"
				})
			]
		})
	});
}
var NAV = [
	{
		to: "/app",
		label: "New invoice",
		icon: Plus
	},
	{
		to: "/app/invoices",
		label: "Invoices",
		icon: FileText
	},
	{
		to: "/app/clients",
		label: "Clients",
		icon: Users
	},
	{
		to: "/app/settings",
		label: "Settings",
		icon: Settings
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [waitlistOpen, setWaitlistOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { to: "/" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-1 overflow-x-auto",
						children: [NAV.map((item) => {
							const active = item.to === "/app" ? pathname === "/app" || pathname === "/app/" : pathname.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150", active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: item.label
								})]
							}, item.to);
						}), !authConfigured$1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							className: "ml-2",
							onClick: () => setWaitlistOpen(true),
							children: "Sign in for sync & Pro — soon"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaitlistModal, {
				open: waitlistOpen,
				onClose: () => setWaitlistOpen(false)
			})
		]
	});
}
function AppLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) });
}
//#endregion
export { AppLayout as component };
