import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const DEFAULT_RECIPIENT = process.env.CONTACT_RECIPIENT_EMAIL || "mark@mail.callordut.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "CalLord Unified Technologies <leads@callordut.com>";

export async function POST(request) {
  try {
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

    const { error } = await resend.emails.send({
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
