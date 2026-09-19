import { Link, createFileRoute } from "@tanstack/react-router";
import { SUPPORT_EMAIL } from "./terms";

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
        <p className="mt-3 text-sm text-muted-foreground">Last updated September 20, 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="font-display text-2xl text-foreground">What we store</h2>
            <p className="mt-2">
              <span className="font-medium text-foreground">In your browser:</span> drafts,
              studio settings, and your waitlist email live in local storage on your own device.
            </p>
            <p className="mt-2">
              <span className="font-medium text-foreground">On our servers, when you publish or
              sign in:</span> your account name and email, plus a snapshot of each published
              invoice — its number, amounts, client name and email, and the payment details you
              chose to show (UPI ID, PayPal, or bank details) — so the public link keeps working.
              Pro purchases add a payment confirmation from Razorpay. We never see or store card
              numbers.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">What we never touch</h2>
            <p className="mt-2">
              FormaBill does not process or hold client funds. UPI PINs, card details, and bank
              logins go straight to Razorpay, PayPal, or your client&apos;s own bank app under
              their terms and privacy policies — never through us. Enter payment details carefully
              and share them only as intended.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Public links</h2>
            <p className="mt-2">
              Anyone with a public invoice link can view that snapshot, so share links deliberately
              and only with the intended client. Deleting an invoice in the app also removes its
              public snapshot from our servers.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Cookies and storage</h2>
            <p className="mt-2">
              We use a session cookie to keep you signed in and local browser storage for drafts
              and settings. There are no advertising trackers. Clearing your browser data removes
              the local copies; server snapshots are covered above.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Who else sees data</h2>
            <p className="mt-2">
              We do not sell personal data. Hosting, database, and payment providers process what
              they need to run the service — Razorpay for payments and Pro checkout, and our
              hosting/database providers for delivery and storage — each under their own terms.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Your choices</h2>
            <p className="mt-2">
              Clear local data through your browser controls, sign out anytime, and delete invoices
              you no longer want published. For account-data requests — access, correction, or
              deletion — email us from your account address with “Privacy request” in the subject
              and include the account email or invoice link you&apos;re asking about.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Changes</h2>
            <p className="mt-2">
              We may update this policy as the product changes; the “Last updated” date above will
              reflect it. Continued use of FormaBill after a change means you accept the updated
              policy.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-foreground">Contact</h2>
            <p className="mt-2">
              Privacy questions? Email{" "}
              <a className="underline underline-offset-4" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
