import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="min-h-dvh bg-background px-5 py-10 sm:px-8 sm:py-16">
      <article className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 shadow-paper sm:p-10">
        <Link to="/" className="font-display text-xl">FormaBill</Link>
        <p className="mt-10 text-xs tracking-[0.16em] text-muted-foreground uppercase">Legal</p>
        <h1 className="mt-2 font-display text-4xl">Terms of use</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated September 19, 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="font-display text-2xl text-foreground">Software service</h2>
            <p className="mt-2">FormaBill is software for creating, publishing, sharing, and tracking invoices. It is not a bank, payment processor, accounting service, tax adviser, or party to any contract between you and your client.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Client payments</h2>
            <p className="mt-2">Client payments go directly to your own Razorpay, UPI, or PayPal account. FormaBill does not receive, hold, or settle your client payments and does not take a percentage of them. Razorpay fees and other gateway charges are charged by those providers and are not FormaBill revenue.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Your responsibility</h2>
            <p className="mt-2">You are responsible for the accuracy of your invoices, your client relationships, payment-method details, applicable taxes, filings, and compliance with the laws that apply to your work. You are responsible for your own taxes; FormaBill does not calculate, collect, or remit them for you.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Acceptable use</h2>
            <p className="mt-2">Do not use FormaBill for fraud, unlawful activity, impersonation, or invoices that mislead a recipient. Keep your account credentials private and review payment details before sharing an invoice.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
