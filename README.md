# FormaBill

Fast pro invoices for independent UI/UX designers and tiny studios. Share on WhatsApp, collect by UPI or gateway, and keep every rupee of the client payment apart from provider fees.

English-speaking markets, India-friendly payments via **Razorpay** (not Stripe).

## What it does

- Invoice editor with live paper preview
- Local-first storage (IndexedDB via Dexie) plus a published JSON store for public `/inv/:id` links
- PDF download matching the invoice
- Logo in settings (data URL) on preview, public page, and PDF
- Get Paid → end-user Razorpay Payment Links (amount in paise)
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

### Password reset

Login → **Forgot password?** sends a one-hour, single-use reset link via Better Auth (`/forgot-password` → email → `/reset-password?token=…`). Tokens expire after `resetPasswordTokenExpiresIn: 3600` seconds and are consumed on use; bad/expired links get a clear “request a fresh one” message. Requires the `SMTP_*` variables above.

### Accounts and quota

FormaBill uses Better Auth email/password accounts for the MVP (`/login`; Google/X
buttons appear only when the broker is actually reachable — see `/api/auth-status`).
Anonymous users can create local IndexedDB drafts and publish/share anonymous invoices.
Signing in enables server ownership, sync, per-user quota tracking, and Pro checkout —
**Get Pro requires sign-in** so the webhook can activate your own user record. Pro status
is stored server-side on the user row; anonymous invoice flows never ask for sign-in.
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
RAZORPAY_PLATFORM_KEY_ID=
RAZORPAY_PLATFORM_KEY_SECRET=
RAZORPAY_PLATFORM_WEBHOOK_SECRET=
```

- `NEXT_PUBLIC_APP_URL`: public origin used for share links and Razorpay callbacks. Falls back to Vercel's `VERCEL_URL`, then request proxy headers — localhost is only ever a local-dev fallback.
- `DATABASE_URL`: pooled Postgres connection string for Better Auth and production database access.
- `BETTER_AUTH_URL`: deployed app URL used by Better Auth.
- `BETTER_AUTH_SECRET`: long random server-only Better Auth signing secret.
- `VITE_AUTH_ENABLED`: set to `true` in production.
- `GROK_AUTH_ISSUER`, `GROK_AUTH_CLIENT_ID`, `GROK_AUTH_CLIENT_SECRET`: optional federated auth settings.
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`: optional Razorpay test/live credentials for Payment Links.
- `RAZORPAY_WEBHOOK_SECRET`: server-only secret used to verify `payment_link.paid` webhooks.
- `RAZORPAY_PLATFORM_KEY_ID`, `RAZORPAY_PLATFORM_KEY_SECRET`: FormaBill merchant test/live credentials for the Pro subscription.
- `RAZORPAY_PLATFORM_WEBHOOK_SECRET`: separate webhook secret for the FormaBill Pro webhook.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: SMTP settings for auth emails (password reset). Without all five, “Forgot password?” explains email isn’t configured instead of pretending to send.

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

For Pro test mode, create a Razorpay test-mode Payment Link using the platform keys, configure its webhook endpoint as `https://your-domain.example/api/webhooks/razorpay-platform`, subscribe to `payment_link.paid`, and complete a test payment. Return users land at `/app/settings?pro=success`; the webhook is authoritative and sets `user.isPro`.

Runtime filesystem writes work in this sandbox (`data/invoices.json`). On serverless hosts they may fall back to `/tmp` and in-memory; republish an invoice after a cold start if a public link 404s.

## Production checklist

Before going live, walk through these once:

- [ ] **Env**: set `NEXT_PUBLIC_APP_URL` (and `BETTER_AUTH_URL`) to the deployed `https://` URL — share/pay links and Razorpay callbacks derive from it, never localhost. `VERCEL_URL` is used automatically when set.
- [ ] **Secrets**: `BETTER_AUTH_SECRET` is a long random value; `DATABASE_URL` is a pooled Postgres string; Razorpay live keys are in the host env, never committed, never in `VITE_` vars.
- [ ] **Deploy**: `npm run build` passes with zero errors; verify `/`, `/app`, `/app/settings`, and one published `/inv/[id]`.
- [ ] **INR vs USD pay**: an `INR` invoice shows UPI (copy + `upi://pay` with plain `@` VPA, `cu=INR`); `USD`/`EUR`/`GBP` invoices hide all UPI intents and show PayPal/bank details with the "UPI is available for INR invoices only" note.
- [ ] **Mark as paid**: with no Razorpay keys, Get Paid explains "Add UPI in Settings or connect Razorpay"; after receiving money manually, the owner marks the invoice **Paid** and the public page hides every pay CTA.
- [ ] **Abuse guard**: `POST /api/invoices` (30/min/IP) and `POST /api/checkout` (20/min/IP) return `429 + Retry-After` past the limit; the editor surfaces the message inline and via toast.
- [ ] **Persistence**: the JSON file store is not durable on serverless — plan the Postgres `invoices` migration below before relying on public links in production.

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

## Pro subscription

Settings → **Pro workspace** offers a real FormaBill subscription checkout with two plans:

| Plan | Amount | Razorpay notes |
| --- | --- | --- |
| Monthly | **$11/mo** | `plan: pro_monthly` |
| Yearly | **$99/yr** | `plan: pro_yearly` |

The buyer picks a plan, **Get Pro** creates a Razorpay **Order** ($11 = 1100 USD cents, $99 = 9900; the `receipt` is a short `pro_m|pro_y_<8-char-id>_<time>` string, always ≤ 40 chars as Razorpay requires) for that exact amount, and pays in an in-app Razorpay Checkout modal — they never leave `/app/settings`. The server returns only the public Key ID (the secret never reaches the browser). On success the client calls `POST /api/pro/verify` (HMAC-verified server-side for instant activation) and lands on `/app/settings?pro=success`. A verified webhook at `/api/webhooks/razorpay-platform` stays authoritative: it accepts `order.paid` (primary), `payment.captured` (user/plan resolved from the parent order), and legacy `payment_link.paid`, then sets that user’s server-side `isPro` flag — the settings page re-checks status on return. If Checkout.js can’t load, the client falls back to a hosted Payment Link. Pro bypasses the five-invoice monthly limit and unlocks recurring invoices, reminders, and branding removal. The free limit stays enforced for everyone else (the sixth publish in a month returns `402` with the upgrade message).

Pro money is platform revenue: it is paid to FormaBill’s merchant account. Client invoice money is separate — it always goes to the user’s own UPI, PayPal, or Razorpay account, never to us.

### Test mode first

1. Use **test-mode** platform keys (`RAZORPAY_PLATFORM_KEY_ID`, `RAZORPAY_PLATFORM_KEY_SECRET` from the Razorpay dashboard, test mode).
2. Add `RAZORPAY_PLATFORM_WEBHOOK_SECRET` and register `https://<your-host>/api/webhooks/razorpay-platform` for the `payment_link.paid` event.
3. Set `NEXT_PUBLIC_APP_URL` to the public origin so the checkout return lands on `/app/settings?pro=success`.
4. Pick Monthly in Settings → **Get Pro**, complete the test payment, and confirm the badge flips to **Pro active** (the page re-checks automatically; a delayed webhook catches up within seconds).
5. Repeat for Yearly. Only switch the platform keys to live when both plans verify end to end.

### Environment variables (Pro)

```
RAZORPAY_PLATFORM_KEY_ID=rzp_test_xxxxx        # FormaBill merchant account (test first)
RAZORPAY_PLATFORM_KEY_SECRET=xxxxxxxxxxxx      # server-only, never commit
RAZORPAY_PLATFORM_WEBHOOK_SECRET=xxxxxxxxxxxx  # verifies /api/webhooks/razorpay-platform
NEXT_PUBLIC_APP_URL=https://your-app.example   # checkout return + callback origin
```

These platform credentials are for FormaBill’s merchant account. They must never be confused with `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`, which are user-provided credentials for collecting that user’s client invoice payments. Pro status always comes from the server — there is no local preview toggle anywhere, in any build.

### Lifetime Pro (founder / test accounts)

Some users are Pro forever without a subscription: a permanent `isLifetimePro` flag on the user row, or a server-only email allowlist. Lifetime is resolved first and can never come back as `gift` — stale gift-sourced lifetime rows self-repair on next status load. Lifetime users bypass invoice limits, see the Pro badge, can use MCP, and may mint 30-day gift codes from a one-time pool of 3. No email is hardcoded anywhere in the frontend.

- **Automatic (recommended for the founder):** set the server env var before starting the app —
  `LIFETIME_PRO_EMAILS="rishiksaibandari@gmail.com"` (comma-separated for several). Matching trims spaces, drops surrounding quotes, and ignores case — but the address itself must be right, so paste it without quotes in dashboards. Anyone listed is lifetime Pro on every backend, including local dev. On first status load their row self-repairs to `proSource: lifetime` with a one-time founder pool of **3** gift codes (spent quota is never refilled by reads).
- **Manual flag (production database):** first have the person sign up (so the user row exists), then run —
  `npm run grant:lifetime-pro -- user@example.com`
  (needs `DATABASE_URL`; revoke with `--revoke`). Raw SQL equivalent:
  `update "user" set "isLifetimePro" = true where lower("email") = lower('user@example.com');`
- **Local testing:** the grant script cannot reach the dev server's in-memory database, so use `LIFETIME_PRO_EMAILS="test@example.com" npm run dev` and sign up with that address.

The Settings badge reads “Pro active · Lifetime” for these users, the upgrade checkout stays hidden, and no paywall is shown.

**Diagnosing lifetime issues:** sign in as the user and open `/api/pro/debug` — it shows the raw row (`rowIsLifetimePro`, `rowProSource`, `rowCanGift`, `rowGiftsRemaining`) next to the computed plan plus `allowlisted` (whether the env matched, without revealing the list). `allowlisted: false` means the env value is missing/misspelled — paste it without quotes — or the deploy predates it (redeploy). A gift-load failure now also surfaces inline in Settings instead of failing silently.

**On Vercel (production):** Dashboard → Project → Settings → Environment Variables → add `LIFETIME_PRO_EMAILS` with the exact login email (matching ignores case and surrounding spaces; separate several with commas) → **Save, then redeploy** so the server picks it up. Verify: sign in as that user and open `/api/pro/status` — it must show `"isPro": true, "lifetime": true`. If it shows `false`, the email doesn't match or the deploy predates the variable.

**If Pro checks 500 in production:** the database predates the Pro columns — run `npm run db:migrate` with the production `DATABASE_URL` (see the checklist above). Plan reads degrade gracefully meanwhile (basic Pro + allowlist lifetime keep working), with a server-log warning.

## AI / MCP (Pro)

Paid Pro subscribers can connect any MCP-compatible assistant to act on their account. Settings → **AI / MCP** generates personal access tokens (`fb_mcp_…`, SHA-256 hashed at rest, shown once) and shows copy-paste setup for each client against the canonical Streamable-HTTP endpoint `https://<host>/api/mcp` with an `Authorization: Bearer <token>` header.

Product rule (same philosophy as gift codes): MCP needs a **paid subscription**. Gift-Pro, expired trials, and free users are rejected (403/402) — downgraded users lose access on their very next call.

Exposed tools: `list_invoices`, `get_invoice`, `create_invoice` (always a draft — never sent, never charged), `update_invoice_status` (explicit draft/sent/paid), `update_invoice`, `mark_invoice_paid` (bookkeeping only), `create_payment_link` (the ONLY money-moving tool — confirm with the user first), `list_clients`, `upsert_client`, `get_invoice_public_link`, `get_studio_settings`, `update_studio_settings`. Mutating tools answer with a human first line plus JSON. Every call is authenticated per token, attributed to that token’s user, and rate-limited (100/min per token). Free users see an upgrade prompt instead of token controls. No extra env vars — the endpoint, token APIs, and `mcp_tokens` / `studio_settings` / `mcp_clients` tables ship with the app.

Security: a key equals full account access to invoices, clients, and settings. Revoke it in Settings the moment it leaks; use one key per assistant.

### Connecting OpenCode (step-by-step)

1. In FormaBill Settings → **AI / MCP**, generate a token and copy it (shown once).
2. In your OpenCode config add a remote entry — OpenCode uses an `mcp` block with `type: "remote"`, **not** `mcpServers`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "formabill": {
      "type": "remote",
      "url": "https://formabill.vercel.app/api/mcp",
      "enabled": true,
      "oauth": false,
      "headers": {
        "Authorization": "Bearer PASTE_YOUR_KEY_HERE"
      }
    }
  }
}
```

3. Restart OpenCode and ask it to list your invoices. Use **Test connection** in Settings first if unsure.
4. Claude Desktop takes the same URL via Settings → Connectors → custom connector; Claude Code via `claude mcp add --transport http`; Cursor via Settings → MCP → custom server. Our endpoint only speaks remote HTTP — no stdio proxy exists or is needed.

### Example prompts

- “Create an invoice for Acme, $1200, due in 7 days.”
- “Who owes me money right now?”
- “Mark invoice FB-0042 as paid — the client sent it by UPI.”
- “Draft next month’s retainer for Harbor Co and give me the public link.”

## Gift codes & referrals (Pro)

**Gift codes** let paid subscribers and lifetime accounts — and only them — give time-boxed Pro to anyone. This is what stops infinite Pro loops: creation requires remaining quota, and recipients become gift-Pro (`proSource: gift`) with zero gifting rights. Paid plans mint exactly one code per billing period (monthly → **7 days**, yearly → **30 days**); lifetime accounts grant **30 days** from a one-time pool of 3. Each paid Pro payment sets `giftsRemaining = 1` (never refilled otherwise); creating consumes the unit. Codes look like `PRO-XXXX-XXXX`, are single-use, expire 90 days after creation. Only **free** accounts may redeem — already-Pro users get “You’re already on Pro” and the code stays valid for someone else; you can’t redeem your own code. Creation is throttled (20/min, max 20 live unused codes). The grant script’s `--can-gift` tops up quota for testing.

**Referrals**: every signed-in user has a link (`/?ref=CODE`, auto-captured on landing) with signup/Pro/months-earned stats in Settings → **Referrals**. When an invitee becomes Pro by paying or redeeming a gift, the referrer gets +1 free month, stacked — once per invitee. Self-referral, double attribution, and lifetime/env grants never pay out.

Time-boxed Pro lives in the `proExpiresAt` user column (`getUserPlan` treats unexpired grants as Pro everywhere: limits, MCP, badges). Tables: `gift_codes`, `referral_codes`, `referrals`.

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
