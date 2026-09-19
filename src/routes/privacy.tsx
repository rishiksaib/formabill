import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-background px-5 py-10 sm:px-8 sm:py-16">
      <article className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 shadow-paper sm:p-10">
        <Link to="/" className="font-display text-xl">FormaBill</Link>
        <p className="mt-10 text-xs tracking-[0.16em] text-muted-foreground uppercase">Legal</p>
        <h1 className="mt-2 font-display text-4xl">Privacy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated September 19, 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="font-display text-2xl text-foreground">What we store</h2>
            <p className="mt-2">Local drafts and settings may be stored in your browser. When you sign in and publish, account and invoice data are stored on the service so your public invoice links and account features work.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Payment providers</h2>
            <p className="mt-2">FormaBill does not process or hold client funds. Razorpay, UPI, and PayPal handle payments under their own terms and privacy policies. Payment credentials and account details should be entered carefully and shared only as intended.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Your choices</h2>
            <p className="mt-2">You can remove local browser data through your browser controls and sign out of your FormaBill account at any time. Contact the service owner for account-data requests or questions about published invoices.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
