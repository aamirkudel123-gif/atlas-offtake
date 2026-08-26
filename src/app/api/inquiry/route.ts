import { NextResponse } from "next/server";

/**
 * Inquiry intake.
 *
 * Delivery is deliberately provider-agnostic: set INQUIRY_WEBHOOK_URL to any
 * endpoint that accepts JSON (a transactional email provider, a CRM intake, a
 * Slack/Teams incoming webhook, a form service).
 *
 * If nothing is configured this returns 503 rather than pretending to succeed,
 * and the form then shows the direct inbox address. An inquiry is never
 * silently dropped.
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { name: 120, company: 160, email: 200, area: 80, message: 5000 };

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
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

  const inquiry = {
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

  const endpoint = process.env.INQUIRY_WEBHOOK_URL;
  if (!endpoint) {
    console.warn(
      "[inquiry] INQUIRY_WEBHOOK_URL is not set — inquiry was not delivered.",
    );
    return NextResponse.json(
      { error: "Inquiry delivery is not configured." },
      { status: 503 },
    );
  }

  try {
    const delivery = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "atlasofftake.com",
        receivedAt: new Date().toISOString(),
        ...inquiry,
      }),
    });

    if (!delivery.ok) throw new Error(`Upstream responded ${delivery.status}`);
  } catch (error) {
    console.error("[inquiry] delivery failed:", error);
    return NextResponse.json(
      { error: "Could not deliver inquiry." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
