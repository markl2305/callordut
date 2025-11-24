import { NextResponse } from "next/server";

// TODO: ensure RESEND_API_KEY is set in your environment
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_ENDPOINT = "https://api.resend.com/emails";

function formatText(body: Record<string, string>) {
  return Object.entries(body)
    .map(([key, value]) => `${key}: ${value || ""}`)
    .join("\n");
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone = "", company = "", message = "", roomType = "", heardFrom = "", honeypot = "" } = data || {};

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const payload = {
      from: "CalLord UT Website <forms@callordut.com>",
      to: "sales@callordut.com",
      reply_to: email,
      subject: `New contact from CalLordUT.com – ${name}`,
      text: formatText({ name, email, phone, company, roomType, heardFrom, message }),
    };

    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY ?? ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Resend send failed", await response.text());
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
