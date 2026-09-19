import { n as cn } from "./utils-DgMi_UEP.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-ut0NUiCj.js
var import_jsx_runtime = require_jsx_runtime();
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-7", className),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "32",
			height: "32",
			rx: "8",
			fill: "currentColor",
			className: "text-primary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M9 10.5h10.2c2.4 0 4.3 1.8 4.3 4.4 0 2.5-1.9 4.3-4.3 4.3H13.2V22H9V10.5Zm4.2 5.6h5.6c.9 0 1.5-.6 1.5-1.3 0-.8-.6-1.3-1.5-1.3h-5.6v2.6Z",
			fill: "currentColor",
			className: "text-primary-foreground"
		})]
	});
}
function Logo({ to = "/", className, wordmark = true }) {
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2 text-foreground", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), wordmark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-lg tracking-tight",
			children: "FormaBill"
		}) : null]
	});
	if (!to) return inner;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: "inline-flex items-center",
		children: inner
	});
}
//#endregion
export { Logo as t };
