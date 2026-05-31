"use client";

import { useState, type ChangeEvent, type FormEvent, type CSSProperties } from "react";
import { trackLead } from "@/lib/analytics";
import { event as gaEvent } from "@/lib/gtag";
import { Mono, FONT } from "../../components/heritage/primitives";

type Status = "idle" | "loading" | "success" | "error";

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

export function CannabisAssessmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    state: "NM",
    licenseStatus: "",
    timeline: "",
    notes: "",
    honeypot: "",
  });

  function updateField(field: keyof typeof form) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          roomType: "Cannabis Security",
          message: [
            `Assessment request for cannabis security`,
            `State: ${form.state || "N/A"}`,
            `License status: ${form.licenseStatus || "N/A"}`,
            `Timeline: ${form.timeline || "N/A"}`,
            `Company/Facility: ${form.company || "N/A"}`,
            `Phone: ${form.phone || "N/A"}`,
            `Notes: ${form.notes || "N/A"}`,
          ].join("\n"),
          source: "Cannabis Compliance Assessment",
          honeypot: form.honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong sending your message. Please try again.");
      }

      setStatus("success");
      if (typeof window !== "undefined") {
        console.log("Firing GA lead_submit");
        gaEvent("lead_submit", {
          form_id: "callord_cannabis_assessment",
          page_location: window.location.href,
          page_path: window.location.pathname,
        });
      }
      trackLead({ formName: "Cannabis Compliance Assessment" });
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        state: "NM",
        licenseStatus: "",
        timeline: "",
        notes: "",
        honeypot: "",
      });
    } catch (err) {
      console.error("Cannabis assessment form error", err);
      setError(err instanceof Error ? err.message : "Something went wrong sending your message. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ border: "1px solid var(--h-rule)", background: "var(--h-cream)", padding: "clamp(24px, 4vw, 40px)" }}
    >
      <div className="cl-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <input type="text" name="company_website" value={form.honeypot} onChange={updateField("honeypot")} style={{ display: "none" }} tabIndex={-1} />
        <label style={labelWrap}>
          <Mono>Name*</Mono>
          <input
            id="assess-name"
            name="name"
            required
            value={form.name}
            onChange={updateField("name")}
            style={fieldStyle}
            placeholder="Your name"
          />
        </label>
        <label style={labelWrap}>
          <Mono>Email*</Mono>
          <input
            id="assess-email"
            type="email"
            name="email"
            required
            value={form.email}
            onChange={updateField("email")}
            style={fieldStyle}
            placeholder="you@company.com"
          />
        </label>
        <label style={labelWrap}>
          <Mono>Phone</Mono>
          <input
            id="assess-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={updateField("phone")}
            style={fieldStyle}
            placeholder="(866) 657-2383"
          />
        </label>
        <label style={labelWrap}>
          <Mono>Company / Facility</Mono>
          <input
            id="assess-company"
            name="company"
            value={form.company}
            onChange={updateField("company")}
            style={fieldStyle}
            placeholder="Dispensary, cultivation, processing"
          />
        </label>
        <label style={labelWrap}>
          <Mono>State</Mono>
          <select
            id="assess-state"
            name="state"
            value={form.state}
            onChange={updateField("state")}
            style={fieldStyle}
          >
            <option value="NM">New Mexico</option>
            <option value="CO">Colorado</option>
            <option value="AZ">Arizona</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label style={labelWrap}>
          <Mono>License status</Mono>
          <select
            id="assess-license"
            name="licenseStatus"
            value={form.licenseStatus}
            onChange={updateField("licenseStatus")}
            style={fieldStyle}
          >
            <option value="">Select status</option>
            <option value="Pre-license">Pre-license</option>
            <option value="Licensed - first inspection pending">Licensed - first inspection pending</option>
            <option value="Licensed - remediation needed">Licensed - remediation needed</option>
            <option value="Licensed - adding sites">Licensed - adding sites</option>
          </select>
        </label>
        <label style={labelWrap}>
          <Mono>Timeline</Mono>
          <select
            id="assess-timeline"
            name="timeline"
            value={form.timeline}
            onChange={updateField("timeline")}
            style={fieldStyle}
          >
            <option value="">Select timeline</option>
            <option value="Urgent - inspection scheduled">Urgent - inspection scheduled</option>
            <option value="This month">This month</option>
            <option value="This quarter">This quarter</option>
            <option value="Scoping for later">Scoping for later</option>
          </select>
        </label>
        <label style={{ ...labelWrap, gridColumn: "1 / -1" }}>
          <Mono>What should we know?*</Mono>
          <textarea
            id="assess-notes"
            name="notes"
            required
            rows={4}
            value={form.notes}
            onChange={updateField("notes")}
            style={{ ...fieldStyle, resize: "vertical" }}
            placeholder="Facility type, number of doors/cameras, inspection date, current pain points."
          />
        </label>
        <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 12 }}>
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
              opacity: status === "loading" ? 0.8 : 1,
            }}
          >
            {status === "loading" ? "Sending…" : "Schedule Free Assessment"}
          </button>
          <p style={{ fontFamily: FONT.sans, fontSize: 12, color: "var(--h-ink-faint)", lineHeight: 1.55, margin: 0 }}>
            By submitting, you agree to receive calls and text messages (SMS/MMS) about your request. Message and data rates may apply. We do not sell your information.
          </p>
          {status === "success" ? (
            <p style={{ fontFamily: FONT.sans, fontSize: 14, color: "var(--h-teal)", margin: 0 }}>Thanks — we’ll reach out to schedule your assessment.</p>
          ) : null}
          {error ? <p style={{ fontFamily: FONT.sans, fontSize: 14, color: "#b4452a", margin: 0 }}>{error}</p> : null}
        </div>
      </div>
    </form>
  );
}
