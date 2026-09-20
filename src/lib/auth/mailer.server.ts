import nodemailer from "nodemailer";

/**
 * Outgoing mail for auth flows (password reset). Server-only.
 *
 * Configure SMTP in the environment; without it every mail attempt fails
 * with `EmailNotConfiguredError`, which callers turn into an honest
 * "not configured" message instead of a dead end. No credentials are ever
 * committed — see `.env.example`.
 */

export class EmailNotConfiguredError extends Error {
  constructor() {
    super(
      "Password reset email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM, then try again.",
    );
    this.name = "EmailNotConfiguredError";
  }
}

function smtpEnv(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
}

/** True when all SMTP settings are present. */
export function mailConfigured(): boolean {
  return Boolean(
    smtpEnv("SMTP_HOST") &&
      smtpEnv("SMTP_PORT") &&
      smtpEnv("SMTP_USER") &&
      smtpEnv("SMTP_PASS") &&
      smtpEnv("SMTP_FROM"),
  );
}

/** Send a plain-text email. Rejects with `EmailNotConfiguredError` when unset. */
export async function sendMail(to: string, subject: string, text: string): Promise<void> {
  const host = smtpEnv("SMTP_HOST");
  const port = smtpEnv("SMTP_PORT");
  const user = smtpEnv("SMTP_USER");
  const pass = smtpEnv("SMTP_PASS");
  const from = smtpEnv("SMTP_FROM");
  if (!host || !port || !user || !pass || !from) throw new EmailNotConfiguredError();

  const transport = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });
  await transport.sendMail({ from, to, subject, text });
}

/** Password-reset email. The link expires in 1 hour and is single-use. */
export async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
  await sendMail(
    to,
    "Reset your FormaBill password",
    [
      "Someone requested a password reset for this FormaBill account.",
      "",
      `Set a new password here (expires in 1 hour, single use): ${resetUrl}`,
      "",
      "If that wasn't you, ignore this email — your password stays unchanged.",
    ].join("\n"),
  );
}
