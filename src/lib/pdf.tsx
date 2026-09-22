import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import type { Invoice } from "@/lib/types";
import { formatDate, formatMoney, invoiceSubtotal, invoiceTax, invoiceTotal, lineAmount } from "@/lib/utils";

/**
 * Embedded Roboto (WOFF) — the PDF renderer's built-in Helvetica has no
 * U+20B9 (₹) glyph, so INR amounts rendered as junk. These files were
 * cmap-verified to contain ₹, $, €, £, and full Latin in both weights.
 */
Font.register({
  family: "FormaBill",
  fonts: [
    { src: "/fonts/Roboto-Regular.woff", fontWeight: 400 },
    { src: "/fonts/Roboto-Bold.woff", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 10,
    fontFamily: "FormaBill",
    color: "#171512",
    backgroundColor: "#FFFEF9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E4DFD6",
    paddingBottom: 16,
    marginBottom: 24,
  },
  studio: { fontSize: 16, fontFamily: "FormaBill", fontWeight: 700 },
  muted: { color: "#6B6660", marginTop: 4 },
  kicker: {
    fontSize: 9,
    letterSpacing: 1.6,
    color: "#6B6660",
    textTransform: "uppercase",
  },
  logo: { height: 36, marginBottom: 10, objectFit: "contain" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
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
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EDE8DF",
    paddingVertical: 8,
  },
  desc: { width: "46%" },
  qty: { width: "14%", textAlign: "right" },
  rate: { width: "20%", textAlign: "right" },
  amt: { width: "20%", textAlign: "right" },
  totals: { marginTop: 20, alignSelf: "flex-end", width: 200 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  totalStrong: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E4DFD6",
    paddingTop: 8,
    fontFamily: "FormaBill",
    fontWeight: 700,
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
    fontSize: 9,
  },
});

function InvoicePdf({ invoice, branded }: { invoice: Invoice; branded: boolean }) {
  const currency = invoice.currency || "USD";
  return (
    <Document title={`Invoice ${invoice.number}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            {invoice.logoUrl ? <Image src={invoice.logoUrl} style={styles.logo} /> : null}
            <Text style={styles.studio}>{invoice.fromName || "Your studio"}</Text>
            {invoice.fromEmail ? <Text style={styles.muted}>{invoice.fromEmail}</Text> : null}
            {invoice.fromAddress ? <Text style={styles.muted}>{invoice.fromAddress}</Text> : null}
          </View>
          <View>
            <Text style={styles.kicker}>Invoice</Text>
            <Text style={{ marginTop: 4 }}>{invoice.number}</Text>
            <Text style={styles.muted}>Due {formatDate(invoice.dueDate)}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.kicker}>From</Text>
            <Text style={{ marginTop: 6 }}>{invoice.fromName || "—"}</Text>
            <Text style={styles.muted}>{invoice.fromEmail || "—"}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.kicker}>Bill to</Text>
            <Text style={{ marginTop: 6 }}>{invoice.client.name || "Client"}</Text>
            <Text style={styles.muted}>{invoice.client.email || "—"}</Text>
          </View>
        </View>

        <View style={styles.tableHead}>
          <Text style={styles.desc}>Description</Text>
          <Text style={styles.qty}>Qty</Text>
          <Text style={styles.rate}>Rate</Text>
          <Text style={styles.amt}>Amount</Text>
        </View>
        {invoice.lineItems.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.desc}>{item.description || "Description"}</Text>
            <Text style={styles.qty}>{String(item.quantity || 0)}</Text>
            <Text style={styles.rate}>{formatMoney(item.rate, currency)}</Text>
            <Text style={styles.amt}>{formatMoney(lineAmount(item), currency)}</Text>
          </View>
        ))}

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text>Subtotal</Text>
            <Text>{formatMoney(invoiceSubtotal(invoice.lineItems), currency)}</Text>
          </View>
          {invoice.taxRate > 0 ? (
            <View style={styles.totalRow}>
              <Text>Tax ({invoice.taxRate}%)</Text>
              <Text>{formatMoney(invoiceTax(invoice.lineItems, invoice.taxRate), currency)}</Text>
            </View>
          ) : null}
          <View style={styles.totalStrong}>
            <Text>Total</Text>
            <Text>{formatMoney(invoiceTotal(invoice.lineItems, invoice.taxRate), currency)}</Text>
          </View>
        </View>

        {invoice.notes ? (
          <View style={styles.notes}>
            <Text style={styles.kicker}>Notes</Text>
            <Text style={{ marginTop: 8, color: "#6B6660" }}>{invoice.notes}</Text>
          </View>
        ) : null}

        <View style={styles.footer} fixed>
          <Text>Status: {invoice.status}</Text>
          {branded ? <Text>Made with FormaBill</Text> : <Text />}
        </View>
      </Page>
    </Document>
  );
}

export async function downloadInvoicePdf(invoice: Invoice, branded = true) {
  const blob = await pdf(<InvoicePdf invoice={invoice} branded={branded} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${invoice.number || "invoice"}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
