"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent, type CSSProperties } from "react";
import { trackLead } from "@/lib/analytics";
import { event as gaEvent } from "@/lib/gtag";
import { CANNABIS_CONTENT_ENABLED } from "@/config/flags";
import { Mono, FONT } from "../components/heritage/primitives";

const roomOptions = [
  "Executive Boardroom",
  "Team Meeting Room",
  "Training / All-Hands",
  "Virtual Visit / Telehealth",
  "Small Hybrid / Focus Pod",
  "Custom Venue / Hospitality",
  "Cannabis Security",
  "Other",
];
const visibleRoomOptions = CANNABIS_CONTENT_ENABLED
  ? roomOptions
  : roomOptions.filter((option) => option !== "Cannabis Security");

const fieldStyle: CSSProperties = {
  fontFamily: FONT.sans,
  fontSize: 15,
  padding: "11px 0",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--h-ink)",
  color: "var(--h-ink)",
  outline: "none",
  width: "100%",
};

const labelWrap: CSSProperties = { display: "flex", flexDirection: "column", gap: 7 };

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    roomType: "",
    message: "",
    heardFrom: "",
    honeypot: "",
  });

  function updateField(field: keyof typeof form) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus("loading");

    if (!form.name || !form.email || !form.message) {
      setError("Name, email, and project details are required.");
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          company_website: form.honeypot,
          source: "Contact Page Form",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong sending your message. Please try again or call us directly.");
      }

      setStatus("success");
      if (typeof window !== "undefined") {
        gaEvent("lead_submit", {
          form_id: "callord_main_contact",
          page_location: window.location.href,
          page_path: window.location.pathname,
        });
      }
      trackLead({ formName: "Contact Page Form" });
      setForm({ name: "", email: "", phone: "", company: "", service: "", roomType: "", message: "", heardFrom: "", honeypot: "" });
    } catch (err) {
      console.error("Contact form submission failed", err);
      setError(err instanceof Error ? err.message : "Something went wrong sending your message. Please try again or call us directly.");
      setStatus("error");
    }
  }

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: 20 }} onSubmit={handleSubmit}>
      <input type="text" name="company_website" value={form.honeypot} onChange={updateField("honeypot")} style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden />

      <label style={labelWrap}>
        <Mono>Name</Mono>
        <input required value={form.name} onChange={updateField("name")} style={fieldStyle} />
      </label>
      <label style={labelWrap}>
        <Mono>Email</Mono>
        <input type="email" required value={form.email} onChange={updateField("email")} style={fieldStyle} />
      </label>
      <label style={labelWrap}>
        <Mono>Company</Mono>
        <input value={form.company} onChange={updateField("company")} style={fieldStyle} />
      </label>
      <label style={labelWrap}>
        <Mono>Phone (optional)</Mono>
        <input type="tel" value={form.phone} onChange={updateField("phone")} style={fieldStyle} />
      </label>
      <label style={labelWrap}>
        <Mono>What do you need</Mono>
        <select value={form.service} onChange={updateField("service")} style={fieldStyle}>
          <option value="">Choose one</option>
          <option value="Security systems">Security systems</option>
          <option value="AV integration">AV integration</option>
          <option value="Both">Both</option>
        </select>
      </label>
      <label style={labelWrap}>
        <Mono>Room or space type (optional)</Mono>
        <select value={form.roomType} onChange={updateField("roomType")} style={fieldStyle}>
          <option value="">Choose a room type (optional)</option>
          {visibleRoomOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label style={labelWrap}>
        <Mono>How did you hear about us? (optional)</Mono>
        <input value={form.heardFrom} onChange={updateField("heardFrom")} style={fieldStyle} placeholder="Referral, search, social…" />
      </label>
      <label style={labelWrap}>
        <Mono>Tell us about the space</Mono>
        <textarea rows={3} required value={form.message} onChange={updateField("message")} style={{ ...fieldStyle, resize: "vertical" }} />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="h-btn"
        style={{
          fontFamily: FONT.sans,
          fontSize: 14,
          fontWeight: 500,
          background: "var(--h-ink)",
          color: "var(--h-paper)",
          border: "none",
          padding: "15px 26px",
          cursor: status === "loading" ? "wait" : "pointer",
          alignSelf: "flex-start",
          marginTop: 8,
          opacity: status === "loading" ? 0.8 : 1,
        }}
      >
        {status === "loading" ? "Sending…" : "Request a walkthrough →"}
      </button>

      {status === "success" && (
        <p style={{ fontFamily: FONT.sans, fontSize: 14, color: "var(--h-teal)", margin: 0 }}>
          Thanks — your message has been sent. We&apos;ll reach out soon.
        </p>
      )}
      {error && <p style={{ fontFamily: FONT.sans, fontSize: 14, color: "#b4452a", margin: 0 }}>{error}</p>}

      <p style={{ fontFamily: FONT.sans, fontSize: 12, color: "var(--h-ink-faint)", lineHeight: 1.55, margin: "4px 0 0" }}>
        By submitting, you agree to receive calls and text messages (SMS/MMS) from CalLord Unified
        Technologies about your request. Message frequency varies. Message and data rates may apply. Reply
        STOP to opt out. Reply HELP for help. Consent is not a condition of purchase. We do not sell your
        information. See our{" "}
        <Link href="/privacy" style={{ color: "var(--h-teal)", textDecoration: "none" }}>Privacy Policy</Link>{" "}
        and{" "}
        <Link href="/sms-terms" style={{ color: "var(--h-teal)", textDecoration: "none" }}>SMS Terms</Link>.
      </p>
    </form>
  );
}
