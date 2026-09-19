import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

export const SUPPORT_EMAIL = "support@formabill.app";

function TermsPage() {
  return (
    <main className="min-h-dvh bg-background px-5 py-10 sm:px-8 sm:py-16">
      <article className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 shadow-paper sm:p-10">
        <Link to="/" className="font-display text-xl">FormaBill</Link>
        <p className="mt-10 text-xs tracking-[0.16em] text-muted-foreground uppercase">Legal</p>
        <h1 className="mt-2 font-display text-4xl">Terms of use</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated September 20, 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="font-display text-2xl text-foreground">Software service</h2>
            <p className="mt-2">
              FormaBill is software for creating, publishing, sharing, and tracking invoices. It is
              not a bank, payment processor, accounting service, or tax adviser, and it is not a
              party to any contract between you and your client. The free plan lets you publish up
              to five invoices per calendar month; an optional paid Pro plan raises those limits.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Your account</h2>
            <p className="mt-2">
              You can create drafts and publish invoices without an account. Signing in adds
              ownership, sync, and quota tracking. Keep your credentials private — you are
              responsible for activity under your account.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Client payments</h2>
            <p className="mt-2">
              Client payments go directly to your own UPI ID, PayPal account, bank account, or
              Razorpay account — never to FormaBill. FormaBill does not receive, hold, or settle
              your client payments, cannot reverse them, and cannot chase a client who does not
              pay. Review your payment details before sharing an invoice; a typo can send a
              client&apos;s money to the wrong place.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Fees: theirs and ours</h2>
            <p className="mt-2">
              Gateway fees are the gateway&apos;s. Razorpay, PayPal, and banks charge their own
              transaction fees under their own terms — those charges are not FormaBill revenue, and
              we do not take a cut or percentage of your client payments. What we do charge for is
              the optional Pro subscription (currently $11/month or $99/year), billed through our
              own Razorpay checkout. You can cancel anytime; Pro stays active until the end of the
              paid period.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Your responsibility</h2>
            <p className="mt-2">
              You are responsible for the accuracy of your invoices, your client relationships, and
              the payment details you publish. You are responsible for your own taxes, GST, filings,
              and compliance with the laws that apply to your work. FormaBill shows the tax rate you
              type but does not calculate, collect, remit, or advise on any tax.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Acceptable use</h2>
            <p className="mt-2">
              Do not use FormaBill for fraud, unlawful activity, impersonation, spam, or invoices
              that mislead a recipient. Do not probe, overload, or abuse the service or its APIs.
              We may rate-limit, suspend, or remove accounts and invoices that violate these terms.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Availability</h2>
            <p className="mt-2">
              We aim to keep FormaBill running smoothly, but the service is provided as-is and may
              change, pause, or discontinue features as the product evolves. Publish important
              records (such as PDFs) wherever you keep your own books.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Limitation of liability</h2>
            <p className="mt-2">
              To the maximum extent permitted by law, FormaBill is not liable for indirect,
              incidental, or consequential losses — including unpaid client invoices, gateway
              failures or fees, tax penalties, or lost data. Our total liability for any claim is
              limited to what you paid us for Pro in the twelve months before the claim (or $11 if
              you never paid us anything). Nothing here limits liability that cannot be limited by
              law.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Changes to these terms</h2>
            <p className="mt-2">
              We may update these terms as the product changes. Material changes will be reflected
              in the “Last updated” date above, and continued use of FormaBill after a change means
              you accept the updated terms.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Contact</h2>
            <p className="mt-2">
              Questions about these terms? Email{" "}
              <a className="underline underline-offset-4" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>{" "}
              with “Terms question” in the subject and include your account email so we can find
              you.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
