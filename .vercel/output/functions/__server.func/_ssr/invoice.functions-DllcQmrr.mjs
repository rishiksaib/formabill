import { n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { i as getInvoice } from "./server-store.server-L3sWWelb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invoice.functions-DllcQmrr.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getPublicInvoice_createServerFn_handler = createServerRpc({
	id: "7cf99f1f443df70951f16026984e7f7a664d02eb63efa6624ccde1f1d6e46144",
	name: "getPublicInvoice",
	filename: "src/lib/invoice.functions.ts"
}, (opts) => getPublicInvoice.__executeServer(opts));
var getPublicInvoice = createServerFn({ method: "GET" }).validator((data) => data).handler(getPublicInvoice_createServerFn_handler, async ({ data }) => {
	return await getInvoice(data.id) ?? null;
});
//#endregion
export { getPublicInvoice_createServerFn_handler };
