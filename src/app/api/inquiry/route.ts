import { NextResponse } from "next/server";

/**
 * Inquiry intake.
 *
 * Delivery is attempted in this order:
 *
 *   1. RESEND_API_KEY      — sends the inquiry as email to INQUIRY_TO.
 *   2. INQUIRY_WEBHOOK_URL — posts the inquiry as JSON to any endpoint that
 *                            accepts one (CRM intake, Zapier/Make hook, form
 *                            service). Kept so delivery can be re-pointed
 *                            without a code change.
 *   3. Neither set         — returns 503. The form then shows the direct
 *                            inbox address rather than pretending to succeed.
 *                            An inquiry is never silently dropped.
 *
 * Mail is sent from a Resend-verified SUBDOMAIN (send.atlasofftake.com by
 * default), not the root domain. The root carries Google Workspace MX and SPF
 * records for the real inquiries@ mailbox; sending from a subdomain leaves
 * those untouched, so adding Resend cannot disturb the firm's own email.
 *
 * Reply-To carries the enquirer's own address, so replying from the inbox goes
 * straight back to them rather than to the website.
 */

export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  area?: unknown;
  message?: unknown;
  website?: unknown;
};

type Inquiry = {
  name: string;
  company: string;
  email: string;
  area: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { name: 120, company: 160, email: 200, area: 80, message: 5000 };

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Atlas Offtake <inquiries@send.atlasofftake.com>";
const DEFAULT_TO = "inquiries@atlasofftake.com";

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

/** Submitted text is untrusted; it must never reach the HTML body raw. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function textBody(inquiry: Inquiry, receivedAt: string) {
  return [
    "New inquiry from atlasofftake.com",
    "",
    `Name:     ${inquiry.name}`,
    `Company:  ${inquiry.company}`,
    `Email:    ${inquiry.email}`,
    `Interest: ${inquiry.area || "Not specified"}`,
    `Received: ${receivedAt}`,
    "",
    "Message",
    "-------",
    inquiry.message,
    "",
    "Reply to this email to respond to the sender directly.",
  ].join("\n");
}

function htmlBody(inquiry: Inquiry, receivedAt: string) {
  const row = (label: string, value: string) =>
    `<tr>` +
    `<td style="padding:5px 20px 5px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>` +
    `<td style="padding:5px 0;color:#111827;font-size:14px">${escapeHtml(value)}</td>` +
    `</tr>`;

  return (
    `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;line-height:1.6;color:#111827;max-width:620px">` +
    `<p style="margin:0 0 22px;font-size:12px;letter-spacing:.09em;text-transform:uppercase;color:#6b7280">New inquiry &middot; atlasofftake.com</p>` +
    `<table style="border-collapse:collapse;margin:0 0 24px">` +
    row("Name", inquiry.name) +
    row("Company", inquiry.company) +
    row("Email", inquiry.email) +
    row("Interest", inquiry.area || "Not specified") +
    row("Received", receivedAt) +
    `</table>` +
    `<div style="border-top:1px solid #e5e7eb;padding-top:18px;white-space:pre-wrap;font-size:14px">${escapeHtml(inquiry.message)}</div>` +
    `<p style="margin:26px 0 0;font-size:12px;color:#9ca3af">Reply to this email to respond to the sender directly.</p>` +
    `</div>`
  );
}

async function sendViaResend(
  apiKey: string,
  inquiry: Inquiry,
  receivedAt: string,
) {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM || DEFAULT_FROM,
      to: [process.env.INQUIRY_TO || DEFAULT_TO],
      reply_to: inquiry.email,
      subject: `Website inquiry — ${inquiry.company}`,
      text: textBody(inquiry, receivedAt),
      html: htmlBody(inquiry, receivedAt),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend responded ${response.status} ${detail}`.trim());
  }
}

async function sendViaWebhook(
  endpoint: string,
  inquiry: Inquiry,
  receivedAt: string,
) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "atlasofftake.com",
      receivedAt,
      ...inquiry,
    }),
  });

  if (!response.ok) throw new Error(`Upstream responded ${response.status}`);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot: respond as though it worked, deliver nothing.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const inquiry: Inquiry = {
    name: clean(body.name, MAX.name),
    company: clean(body.company, MAX.company),
    email: clean(body.email, MAX.email),
    area: clean(body.area, MAX.area),
    message: clean(body.message, MAX.message),
  };

  const missing = (["name", "company", "email", "message"] as const).filter(
    (key) => !inquiry[key],
  );
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields.", fields: missing },
      { status: 422 },
    );
  }
  if (!EMAIL_RE.test(inquiry.email)) {
    return NextResponse.json(
      { error: "Invalid email address.", fields: ["email"] },
      { status: 422 },
    );
  }

  const receivedAt = new Date().toISOString();
  const apiKey = process.env.RESEND_API_KEY;
  const webhook = process.env.INQUIRY_WEBHOOK_URL;

  if (!apiKey && !webhook) {
    console.warn(
      "[inquiry] neither RESEND_API_KEY nor INQUIRY_WEBHOOK_URL is set — inquiry was not delivered.",
    );
    return NextResponse.json(
      { error: "Inquiry delivery is not configured." },
      { status: 503 },
    );
  }

  try {
    if (apiKey) {
      await sendViaResend(apiKey, inquiry, receivedAt);
    } else if (webhook) {
      await sendViaWebhook(webhook, inquiry, receivedAt);
    }
  } catch (error) {
    console.error("[inquiry] delivery failed:", error);
    return NextResponse.json(
      { error: "Could not deliver inquiry." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
