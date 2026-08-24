import { Resend } from "resend";
import { rateLimit, getClientIp, isPlausibleEmail } from "@/lib/mail-guard";

let _resend;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const DEFAULT_RECIPIENT = process.env.CONTACT_RECIPIENT_EMAIL || "sales@callordut.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "CalLord Unified Technologies <leads@callordut.com>";

export async function POST(request) {
  try {
    // F-0056 — THE RECIPIENT IS CALLER-NAMED, SO THE COST IS CALLER-CONTROLLED.
    //
    // This route delivers to `[DEFAULT_RECIPIENT, email]` where `email` comes
    // from the request body, on the platform's shared Resend key. The honeypot
    // below stops a naive bot; it does nothing against a caller who simply
    // omits the honeypot field and posts in a loop. Unmetered, that mails a
    // chosen victim from `leads@callordut.com` and burns a sending reputation
    // that is NOT this site's alone — the same key carries other properties.
    //
    // Two windows, because they stop different things:
    //   per-IP        5 / minute   — the volumetric case
    //   per-recipient 3 / hour     — the targeted case, which survives an IP rotation
    // Ported verbatim from cannabis-security/src/lib/mail-guard.ts, which is
    // the pattern already accepted on the sibling lead routes. Deliberately not
    // a new invention: a fifth hand-rolled limiter would drift from the other four.
    //
    // ⚠️ IN-PROCESS state. On serverless this bounds a warm instance, not the
    // fleet. That is a real limit and it is stated rather than implied: it
    // raises the cost of abuse, it does not make it impossible.
    const ip = getClientIp(request.headers);
    const ipGate = rateLimit(`callordut:contact:ip:${ip}`, 5, 60_000);
    if (!ipGate.allowed) {
      return new Response(
        JSON.stringify({ ok: false, error: "Too many requests. Please try again shortly." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(Math.ceil((ipGate.resetAt - Date.now()) / 1000)),
          },
        }
      );
    }

    const body = await request.json();

    if (body?.company_website) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const {
      name = "",
      email = "",
      phone = "",
      company = "",
      message = "",
      roomType = "",
      heardFrom = "",
      service = "",
      issues = "",
      source = "",
      budget = "",
      timeline = "",
    } = body || {};

    if (!name || !email || !(message || issues)) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing required fields: name, email, and message are required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const subject = `New lead from callordut.com${source ? ` – ${source}` : ""}`;

    const textLines = [
      "New lead from callordut.com",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      company ? `Company: ${company}` : null,
      roomType ? `Room Type: ${roomType}` : null,
      service ? `Service: ${service}` : null,
      budget ? `Budget: ${budget}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      heardFrom ? `How they heard: ${heardFrom}` : null,
      source ? `Source: ${source}` : null,
      "",
      "Message:",
      message || issues,
    ].filter(Boolean);

    // The per-recipient window is checked HERE, after `email` is known and after
    // the honeypot, so a bot-shaped request never consumes a real address's quota.
    // A non-plausible address is refused outright rather than handed to Resend.
    if (!isPlausibleEmail(email)) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing required fields: name, email, and message are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!rateLimit(`callordut:contact:to:${String(email).toLowerCase()}`, 3, 3_600_000).allowed) {
      return new Response(
        JSON.stringify({ ok: false, error: "Too many requests. Please try again shortly." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    const { error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: [DEFAULT_RECIPIENT, email],
      subject,
      text: textLines.join("\n"),
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ ok: false, error: "Failed to send email." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return new Response(JSON.stringify({ ok: false, error: "Server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
