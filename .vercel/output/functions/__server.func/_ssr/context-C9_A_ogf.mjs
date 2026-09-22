import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as DEFAULT_SETTINGS } from "./router-sJqJBi9Q.mjs";
import { t as Dexie } from "../_libs/dexie.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/context-C9_A_ogf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FormaBillDB = class extends Dexie {
	invoices;
	clients;
	settings;
	constructor() {
		super("formabill");
		this.version(1).stores({
			invoices: "id, number, status, createdAt",
			clients: "id, email, name",
			settings: "id"
		});
	}
};
var db = null;
function getDb() {
	if (typeof indexedDB === "undefined") throw new Error("IndexedDB is not available");
	if (!db) db = new FormaBillDB();
	return db;
}
var SETTINGS_ID = "business";
var StoreContext = (0, import_react.createContext)(null);
function StoreProvider({ children }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [settings, setSettings] = (0, import_react.useState)(DEFAULT_SETTINGS);
	const [invoices, setInvoices] = (0, import_react.useState)([]);
	const [clients, setClients] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			try {
				const db = getDb();
				const [inv, cli, set] = await Promise.all([
					db.invoices.orderBy("createdAt").reverse().toArray(),
					db.clients.toArray(),
					db.settings.get(SETTINGS_ID)
				]);
				if (cancelled) return;
				setInvoices(inv);
				setClients(cli);
				if (set) {
					const { id: _id, ...rest } = set;
					setSettings({
						...DEFAULT_SETTINGS,
						...rest
					});
				}
			} catch (err) {
				console.warn("[formabill] IndexedDB unavailable", err);
			} finally {
				if (!cancelled) setReady(true);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);
	const saveSettings = (0, import_react.useCallback)(async (patch) => {
		const next = {
			...settings,
			...patch
		};
		setSettings(next);
		const row = {
			id: SETTINGS_ID,
			...next
		};
		await getDb().settings.put(row);
		return next;
	}, [settings]);
	const saveClient = (0, import_react.useCallback)(async (client) => {
		let prev;
		try {
			prev = await getDb().clients.get(client.id);
		} catch {
			prev = void 0;
		}
		const next = {
			...prev,
			...client,
			createdAt: client.createdAt || prev?.createdAt || (/* @__PURE__ */ new Date()).toISOString()
		};
		await getDb().clients.put(next);
		setClients((prev) => {
			const idx = prev.findIndex((c) => c.id === next.id);
			if (idx >= 0) {
				const copy = [...prev];
				copy[idx] = next;
				return copy;
			}
			return [next, ...prev];
		});
		return next;
	}, []);
	const saveInvoice = (0, import_react.useCallback)(async (invoice) => {
		const next = {
			...invoice,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		await getDb().invoices.put(next);
		setInvoices((prev) => {
			const idx = prev.findIndex((i) => i.id === next.id);
			if (idx >= 0) {
				const copy = [...prev];
				copy[idx] = next;
				return copy;
			}
			return [next, ...prev];
		});
		if (next.client.name.trim() || next.client.email.trim()) await saveClient({
			id: next.client.id,
			name: next.client.name,
			email: next.client.email
		});
		return next;
	}, [saveClient]);
	const updateInvoiceStatus = (0, import_react.useCallback)(async (id, status) => {
		const current = invoices.find((invoice) => invoice.id === id) ?? null;
		if (!current) return void 0;
		const next = {
			...current,
			status,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		await getDb().invoices.put(next);
		setInvoices((prev) => {
			const idx = prev.findIndex((invoice) => invoice.id === id);
			if (idx >= 0) {
				const copy = [...prev];
				copy[idx] = next;
				return copy;
			}
			return [next, ...prev];
		});
		const res = await fetch(`/api/invoices/${encodeURIComponent(id)}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(next)
		});
		if (!res.ok) {
			const json = await res.json().catch(() => ({}));
			throw new Error(json.error || "Could not update invoice status");
		}
		const saved = await res.json();
		await getDb().invoices.put(saved);
		setInvoices((prev) => {
			const idx = prev.findIndex((invoice) => invoice.id === saved.id);
			if (idx >= 0) {
				const copy = [...prev];
				copy[idx] = saved;
				return copy;
			}
			return [saved, ...prev];
		});
		return saved;
	}, [invoices]);
	const deleteInvoice = (0, import_react.useCallback)(async (id) => {
		await getDb().invoices.delete(id);
		setInvoices((prev) => prev.filter((i) => i.id !== id));
	}, []);
	const deleteClient = (0, import_react.useCallback)(async (id) => {
		await getDb().clients.delete(id);
		setClients((prev) => prev.filter((c) => c.id !== id));
	}, []);
	const publishInvoice = (0, import_react.useCallback)(async (invoice) => {
		const local = await saveInvoice(invoice);
		const res = await fetch("/api/invoices", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(local)
		});
		if (!res.ok) {
			const json = await res.json().catch(() => ({}));
			throw new Error(json.error || "Could not publish invoice");
		}
		const published = await res.json();
		await getDb().invoices.put(published);
		setInvoices((prev) => {
			const idx = prev.findIndex((i) => i.id === published.id);
			if (idx >= 0) {
				const next = [...prev];
				next[idx] = published;
				return next;
			}
			return [published, ...prev];
		});
		return published;
	}, [saveInvoice]);
	const value = (0, import_react.useMemo)(() => ({
		ready,
		settings,
		invoices,
		clients,
		saveSettings,
		saveInvoice,
		updateInvoiceStatus,
		deleteInvoice,
		saveClient,
		deleteClient,
		publishInvoice
	}), [
		ready,
		settings,
		invoices,
		clients,
		saveSettings,
		saveInvoice,
		updateInvoiceStatus,
		deleteInvoice,
		saveClient,
		deleteClient,
		publishInvoice
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreContext.Provider, {
		value,
		children
	});
}
function useStore() {
	const ctx = (0, import_react.useContext)(StoreContext);
	if (!ctx) throw new Error("useStore must be used within StoreProvider");
	return ctx;
}
//#endregion
export { useStore as n, StoreProvider as t };
