import { a as invoiceSubtotal, i as formatMoney, l as lineAmount, o as invoiceTax, r as formatDate, s as invoiceTotal } from "./utils-DgMi_UEP.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { T as Text, k as View, o as Document, u as Image, v as Page } from "../_libs/@react-pdf/image+[...].mjs";
import { n as StyleSheet, r as pdf, t as Font } from "../_libs/react-pdf__renderer.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pdf-B3HHJwxY.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Embedded Roboto (WOFF) — the PDF renderer's built-in Helvetica has no
* U+20B9 (₹) glyph, so INR amounts rendered as junk. These files were
* cmap-verified to contain ₹, $, €, £, and full Latin in both weights.
*/
Font.register({
	family: "FormaBill",
	fonts: [{
		src: "/fonts/Roboto-Regular.woff",
		fontWeight: 400
	}, {
		src: "/fonts/Roboto-Bold.woff",
		fontWeight: 700
	}]
});
var styles = StyleSheet.create({
	page: {
		padding: 48,
		fontSize: 10,
		fontFamily: "FormaBill",
		color: "#171512",
		backgroundColor: "#FFFEF9"
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: "#E4DFD6",
		paddingBottom: 16,
		marginBottom: 24
	},
	studio: {
		fontSize: 16,
		fontFamily: "FormaBill",
		fontWeight: 700
	},
	muted: {
		color: "#6B6660",
		marginTop: 4
	},
	kicker: {
		fontSize: 9,
		letterSpacing: 1.6,
		color: "#6B6660",
		textTransform: "uppercase"
	},
	logo: {
		height: 36,
		marginBottom: 10,
		objectFit: "contain"
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 24
	},
	col: { width: "48%" },
	tableHead: {
		flexDirection: "row",
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: "#E4DFD6",
		paddingVertical: 8,
		color: "#6B6660",
		fontSize: 8,
		letterSpacing: 1.2,
		textTransform: "uppercase"
	},
	tableRow: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#EDE8DF",
		paddingVertical: 8
	},
	desc: { width: "46%" },
	qty: {
		width: "14%",
		textAlign: "right"
	},
	rate: {
		width: "20%",
		textAlign: "right"
	},
	amt: {
		width: "20%",
		textAlign: "right"
	},
	totals: {
		marginTop: 20,
		alignSelf: "flex-end",
		width: 200
	},
	totalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 6
	},
	totalStrong: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderTopWidth: 1,
		borderTopColor: "#E4DFD6",
		paddingTop: 8,
		fontFamily: "FormaBill",
		fontWeight: 700
	},
	notes: { marginTop: 28 },
	footer: {
		position: "absolute",
		bottom: 36,
		left: 48,
		right: 48,
		flexDirection: "row",
		justifyContent: "space-between",
		color: "#6B6660",
		fontSize: 9
	}
});
function InvoicePdf({ invoice, branded }) {
	const currency = invoice.currency || "USD";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Document, {
		title: `Invoice ${invoice.number}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
			size: "A4",
			style: styles.page,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, {
					style: styles.header,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { children: [
						invoice.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
							src: invoice.logoUrl,
							style: styles.logo
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: styles.studio,
							children: invoice.fromName || "Your studio"
						}),
						invoice.fromEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: styles.muted,
							children: invoice.fromEmail
						}) : null,
						invoice.fromAddress ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: styles.muted,
							children: invoice.fromAddress
						}) : null
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: styles.kicker,
							children: "Invoice"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: { marginTop: 4 },
							children: invoice.number
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							style: styles.muted,
							children: ["Due ", formatDate(invoice.dueDate)]
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, {
					style: styles.row,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, {
						style: styles.col,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								style: styles.kicker,
								children: "From"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								style: { marginTop: 6 },
								children: invoice.fromName || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								style: styles.muted,
								children: invoice.fromEmail || "—"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, {
						style: styles.col,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								style: styles.kicker,
								children: "Bill to"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								style: { marginTop: 6 },
								children: invoice.client.name || "Client"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								style: styles.muted,
								children: invoice.client.email || "—"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, {
					style: styles.tableHead,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: styles.desc,
							children: "Description"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: styles.qty,
							children: "Qty"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: styles.rate,
							children: "Rate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: styles.amt,
							children: "Amount"
						})
					]
				}),
				invoice.lineItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, {
					style: styles.tableRow,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: styles.desc,
							children: item.description || "Description"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: styles.qty,
							children: String(item.quantity || 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: styles.rate,
							children: formatMoney(item.rate, currency)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							style: styles.amt,
							children: formatMoney(lineAmount(item), currency)
						})
					]
				}, item.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, {
					style: styles.totals,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, {
							style: styles.totalRow,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: formatMoney(invoiceSubtotal(invoice.lineItems), currency) })]
						}),
						invoice.taxRate > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, {
							style: styles.totalRow,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { children: [
								"Tax (",
								invoice.taxRate,
								"%)"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: formatMoney(invoiceTax(invoice.lineItems, invoice.taxRate), currency) })]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, {
							style: styles.totalStrong,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: formatMoney(invoiceTotal(invoice.lineItems, invoice.taxRate), currency) })]
						})
					]
				}),
				invoice.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, {
					style: styles.notes,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						style: styles.kicker,
						children: "Notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						style: {
							marginTop: 8,
							color: "#6B6660"
						},
						children: invoice.notes
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(View, {
					style: styles.footer,
					fixed: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { children: ["Status: ", invoice.status] }), branded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: "Made with FormaBill" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {})]
				})
			]
		})
	});
}
async function downloadInvoicePdf(invoice, branded = true) {
	const blob = await pdf(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoicePdf, {
		invoice,
		branded
	})).toBlob();
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${invoice.number || "invoice"}.pdf`;
	a.click();
	URL.revokeObjectURL(url);
}
//#endregion
export { downloadInvoicePdf };
