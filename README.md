# FormaBill

Fast pro invoices for independent UI/UX designers and tiny studios. Share on WhatsApp, collect by UPI or gateway, and keep every rupee of the client payment apart from provider fees.

English-speaking markets, India-friendly payments via **Razorpay** (not Stripe).

## What it does

- Invoice editor with live paper preview
- Local-first storage (IndexedDB via Dexie) plus a published JSON store for public `/inv/:id` links
- PDF download matching the invoice
- Logo in settings (data URL) on preview, public page, and PDF
- Get Paid → Razorpay Payment Links (amount in paise)
- Recurring invoices and branding removal behind a Pro toggle
- Configurable currency: USD, EUR, GBP, INR, AUD, CAD, or SGD
- Email/password accounts with per-user invoice ownership
- Free tier quota of 5 published invoices per calendar month; Pro users bypass it

## Stack

This host runs **TanStack Start + Vite + React 19 + Tailwind v4** (the App Builder runtime). Product routes, data model, and APIs match the FormaBill spec; the original Next.js App Router paths are mapped 1:1:

| Spec | Here |
| --- | --- |
| `/` | `src/routes/index.tsx` |
| `/app` | `src/routes/app/` |
| `/inv/[id]` | `src/routes/inv.$id.tsx` |
| `/api/*` | `src/routes/api/` |
| `src/lib/server-store.ts` | `src/lib/server-store.server.ts` (`.server` so Node `fs` never ships to the browser) |

## Setup

```bash
npm i
cp .env.example .env.local   # or export the same vars in the environment
npm run dev
```

The preview listens on port 8080.

### Accounts and quota

FormaBill uses Better Auth email/password accounts for the MVP. Anonymous users
can create local IndexedDB drafts and publish/share anonymous invoices. Signing
in enables server ownership, sync, payment-link creation, and quota tracking.
Published invoices
are tagged with the verified Better Auth `userId`; the server allows five new
invoices per calendar month on the free tier. The Better Auth user record has a
manual `isPro` flag for bypassing the limit; subscription billing is not wired.

### Environment variables

```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
DATABASE_URL=
BETTER_AUTH_URL=https://your-app.vercel.app
BETTER_AUTH_SECRET=
VITE_AUTH_ENABLED=true
GROK_AUTH_ISSUER=
GROK_AUTH_CLIENT_ID=
GROK_AUTH_CLIENT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
```

- `NEXT_PUBLIC_APP_URL`: public origin used for Razorpay callbacks.
- `DATABASE_URL`: pooled Postgres connection string for Better Auth and production database access.
- `BETTER_AUTH_URL`: deployed app URL used by Better Auth.
- `BETTER_AUTH_SECRET`: long random server-only Better Auth signing secret.
- `VITE_AUTH_ENABLED`: set to `true` in production.
- `GROK_AUTH_ISSUER`, `GROK_AUTH_CLIENT_ID`, `GROK_AUTH_CLIENT_SECRET`: optional federated auth settings.
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`: optional Razorpay test/live credentials for Payment Links.
- `RAZORPAY_WEBHOOK_SECRET`: server-only secret used to verify `payment_link.paid` webhooks.

Razorpay keys are optional. Manual UPI, PayPal, and bank payment details work without them. Never commit secrets or put them in client-side `VITE_` variables.

### How Paid works

Manual payments are supported: after receiving money through UPI, bank transfer, or PayPal, the owner opens the invoice editor and chooses **Mark as Paid**. The public invoice then shows the paid state.

With Razorpay configured, **Get Paid** creates a Payment Link, saves it to the server invoice, and marks the invoice sent. A verified `payment_link.paid` webhook marks the invoice paid automatically. Razorpay test amounts are sent in paise (`₹1.00` = `100`).

### How sharing works

Copy link, WhatsApp, and Email first publish the invoice to the server so the client’s `/inv/[id]` URL is available. WhatsApp includes the client name, invoice number, amount, and public link. Email uses a `mailto:` subject and body with the same invoice details. These share actions work anonymously; signing in adds ownership and sync.

### Free limits

The Free plan allows five newly published invoices per calendar month per user. The server enforces the count. Users with the manual `isPro` flag bypass the limit. Pro subscription billing is not implemented yet.

## Razorpay (India)

1. Create an account at [Razorpay](https://razorpay.com/). KYC is required before live settlements.
2. Dashboard → API Keys → generate **test** keys.
3. Webhooks → add `https://<your-host>/api/webhooks/razorpay` for `payment_link.paid` and `payment.captured`.
4. Amounts are sent in **paise** (`₹1.00` = `100`).
5. Stripe is invite-only in India and is out of scope.

Runtime filesystem writes work in this sandbox (`data/invoices.json`). On serverless hosts they may fall back to `/tmp` and in-memory; republish an invoice after a cold start if a public link 404s.

## Production deployment

### Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket and import it into Vercel.
2. Keep the detected build command as `npm run build` and the output/framework settings generated by the TanStack/Vite project.
3. Add the production environment variables from `.env.example` in Vercel Project Settings → Environment Variables. Set them for Production and Preview as appropriate; do not commit a real `.env` file.
4. Set `NEXT_PUBLIC_APP_URL` and `BETTER_AUTH_URL` to the deployed HTTPS URL.
5. Set `DATABASE_URL` to a pooled Postgres connection string and run the first deployment. The build applies files in `migrations/`.
6. Configure the Razorpay webhook at `https://your-domain.example/api/webhooks/razorpay` when Razorpay is enabled, using `RAZORPAY_WEBHOOK_SECRET` and the `payment_link.paid` event.
7. After deployment, verify `/`, `/login`, `/app`, `/app/settings`, and a published `/inv/[id]` URL.

### Invoice persistence limitation

The current MVP invoice store writes `data/invoices.json` locally and falls back to `/tmp` or memory. Vercel serverless functions have ephemeral, isolated filesystems, so this store is not durable or shared across instances in production. Authentication can use Postgres, but invoices still need a durable store before relying on production public links.

Minimal migration plan:

1. Add an `invoices` Postgres table with `id`, `user_id`, invoice JSON fields (or a JSONB document), `number`, `status`, `payment_link_id`, and timestamps.
2. Replace the functions in `src/lib/server-store.server.ts` with parameterized Postgres queries through `getSql()`.
3. Keep `user_id` filtering for authenticated records and preserve public lookup by invoice `id`.
4. Migrate existing JSON records once with a small one-off script, then remove the file-store fallback for production.

Supabase Postgres, Neon Postgres, or Vercel Postgres are suitable minimal alternatives. Vercel Blob can store backups, but it is not a good concurrent transactional replacement for invoice records.

## Pro (demo)

Settings → **Pro workspace**. Unlocks recurring invoices, due-date reminders (stored on the invoice; email sending is not wired in v1), and removes “Made with FormaBill”. Price: **$11/mo or $99/yr**.

## Out of scope (v1)

Time tracking, proposals, contracts, full accounting, native apps, multi-team seats, Stripe.

## Smoke-test checklist

- [ ] `npm install` completes and `npm run dev` serves the app on port 8080.
- [ ] `/` shows the positioning, Free/Pro pricing, Terms link, and Privacy link.
- [ ] `/app` creates and locally autosaves an invoice draft.
- [ ] `/app/clients` shows its empty state, saves a client, and reports action errors with a toast.
- [ ] `/app/settings` saves studio, payment, and logo settings locally.
- [ ] `/login` creates an email/password account and shows the signed-in user control.
- [ ] Signed-out users can edit drafts and publish/share an anonymous invoice.
- [ ] A signed-in user can publish an invoice and open `/inv/[id]`.
- [ ] Editor share actions publish first; Copy link, WhatsApp, and Email contain the public URL.
- [ ] A public invoice fits a 390px-wide viewport without horizontal scrolling.
- [ ] Public UPI Copy shows success or failure feedback; PDF download works on editor and public pages.
- [ ] Mark as Paid manually hides public payment actions.
- [ ] With Razorpay test keys, Get Paid saves a Payment Link and its test webhook marks the invoice paid.
- [ ] The sixth Free-plan publish in one calendar month is blocked with the upgrade message.
