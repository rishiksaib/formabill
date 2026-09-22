import { o as __toESM } from "../_runtime.mjs";
import { f as uid } from "./utils-DgMi_UEP.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CYO0UllO.mjs";
import { t as Input } from "./input-03uEhuzd.mjs";
import { t as Label } from "./label-BHyMjyQZ.mjs";
import { T as Copy, a as Trash2, d as Plus, f as Pencil, n as Users, u as Search, y as FilePlus2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as applySettingsToInvoice, o as createDraftInvoice } from "./router-DBM2KZ1i.mjs";
import { n as useStore } from "./context-C9_A_ogf.mjs";
import { t as Textarea } from "./textarea-Du_npzpQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients-DVMFzDkV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function initials(name, email) {
	const source = name.trim() || email.trim();
	if (!source) return "?";
	const parts = source.split(/\s+/);
	return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}
function ClientsPage() {
	const navigate = useNavigate();
	const { ready, clients, settings, invoices, saveClient, deleteClient, saveInvoice } = useStore();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [company, setCompany] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: "",
		company: "",
		notes: ""
	});
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const nameRef = (0, import_react.useRef)(null);
	const visible = (0, import_react.useMemo)(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return clients;
		return clients.filter((c) => [
			c.name,
			c.email,
			c.company ?? "",
			c.phone ?? ""
		].some((field) => field.toLowerCase().includes(needle)));
	}, [clients, query]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-xl bg-muted/60" });
	const resetAddForm = () => {
		setName("");
		setEmail("");
		setCompany("");
	};
	const addClient = async (event) => {
		event.preventDefault();
		if (!name.trim() && !email.trim()) return;
		try {
			await saveClient({
				id: uid(),
				name: name.trim(),
				email: email.trim(),
				company: company.trim() || void 0
			});
			resetAddForm();
			toast.success("Client saved");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not save client");
		}
	};
	const startEdit = (client) => {
		setEditingId(client.id);
		setPendingDelete(null);
		setDraft({
			name: client.name,
			email: client.email,
			phone: client.phone || "",
			company: client.company || "",
			notes: client.notes || ""
		});
	};
	const saveEdit = async (client) => {
		if (!draft.name.trim() && !draft.email.trim()) {
			toast.error("Add a name or an email");
			return;
		}
		try {
			await saveClient({
				...client,
				name: draft.name.trim(),
				email: draft.email.trim(),
				phone: draft.phone.trim() || void 0,
				company: draft.company.trim() || void 0,
				notes: draft.notes.trim() || void 0
			});
			setEditingId(null);
			toast.success("Client updated");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not update client");
		}
	};
	const copyEmail = async (client) => {
		if (!client.email) {
			toast.error("No email saved for this client");
			return;
		}
		try {
			await navigator.clipboard.writeText(client.email);
			toast.success("Email copied");
		} catch {
			toast.error("Could not copy email");
		}
	};
	const startInvoice = async (client) => {
		try {
			const blank = applySettingsToInvoice(createDraftInvoice(settings, invoices.map((inv) => inv.number)), settings);
			const saved = await saveInvoice({
				...blank,
				client: {
					id: client.id,
					name: client.name,
					email: client.email
				}
			});
			toast.success(`Started ${saved.number} for ${client.name || client.email}`);
			await navigate({
				to: "/app",
				search: { id: saved.id }
			});
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not start invoice");
		}
	};
	const removeClient = async (id) => {
		try {
			await deleteClient(id);
			setPendingDelete(null);
			if (editingId === id) setEditingId(null);
			toast.success("Client deleted");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not delete client");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.16em] text-muted-foreground uppercase",
				children: "Address book"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl tracking-tight",
					children: "Clients"
				}), clients.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						visible.length,
						" of ",
						clients.length
					]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Saved locally. Pick them from the invoice editor, or start an invoice right here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 grid gap-3 rounded-xl border border-border bg-card p-5",
				onSubmit: (e) => void addClient(e),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-[1fr_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								ref: nameRef,
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "Harbor Co."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "pay@harbor.co"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-[1fr_auto]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Company ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-normal text-muted-foreground",
								children: "(optional)"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: company,
								onChange: (e) => setCompany(e.target.value),
								placeholder: "Harbor Inc."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								className: "w-full sm:w-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Add client"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Phone and notes can be added after saving, via Edit."
					})
				]
			}),
			clients.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Search name, email, or company…",
					"aria-label": "Search clients",
					className: "pl-9"
				})]
			}) : null,
			clients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mx-auto size-8 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-2xl tracking-tight",
						children: "Clients live here"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-2 max-w-sm text-sm text-muted-foreground",
						children: "Save the people you bill — then reuse them in one tap from the invoice editor, or start an invoice directly from their card."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-6",
						type: "button",
						onClick: () => nameRef.current?.focus(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Add your first client"]
					})
				]
			}) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-xl",
					children: [
						"No matches for “",
						query.trim(),
						"”"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					variant: "outline",
					onClick: () => setQuery(""),
					children: "Clear search"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-2",
				children: visible.map((c) => editingId === c.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-primary/40 bg-card p-4 sm:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: draft.name,
									onChange: (e) => setDraft({
										...draft,
										name: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									value: draft.email,
									onChange: (e) => setDraft({
										...draft,
										email: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "tel",
									value: draft.phone,
									onChange: (e) => setDraft({
										...draft,
										phone: e.target.value
									}),
									placeholder: "+91 98765 43210"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Company" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: draft.company,
									onChange: (e) => setDraft({
										...draft,
										company: e.target.value
									}),
									placeholder: "Harbor Inc."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Notes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: draft.notes,
									onChange: (e) => setDraft({
										...draft,
										notes: e.target.value
									}),
									placeholder: "GSTIN, payment terms, timezone…"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => void saveEdit(c),
							children: "Save changes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setEditingId(null),
							children: "Cancel"
						})]
					})]
				}, c.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							className: "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-sm font-medium text-foreground",
							children: initials(c.name, c.email)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-44 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate font-medium",
									children: [c.name || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Unnamed client"
									}), c.company ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-normal text-muted-foreground",
										children: [" · ", c.company]
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm text-muted-foreground",
									children: [c.email, c.phone].filter(Boolean).join(" · ") || "No contact yet"
								}),
								c.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 truncate text-xs text-muted-foreground",
									children: c.notes
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-full items-center gap-1 border-t border-border/60 pt-2 sm:w-auto sm:border-t-0 sm:pt-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => void startInvoice(c),
									title: `Start an invoice for ${c.name || c.email}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus2, {}), " Invoice"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => startEdit(c),
									title: "Edit client",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), " Edit"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": `Copy email of ${c.name || c.email}`,
									title: "Copy email",
									onClick: () => void copyEmail(c),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {})
								}),
								pendingDelete === c.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "destructive",
									size: "sm",
									onClick: () => void removeClient(c.id),
									onBlur: () => setPendingDelete(null),
									title: "Click again to confirm deletion",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), " Confirm?"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": `Delete ${c.name || c.email}`,
									title: "Delete client",
									onClick: () => setPendingDelete(c.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
								})
							]
						})
					]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-center text-xs text-muted-foreground",
				children: [
					"Looking for invoices instead? ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app/invoices",
						className: "underline underline-offset-4",
						children: "Open the library"
					}),
					"."
				]
			})
		]
	});
}
//#endregion
export { ClientsPage as component };
