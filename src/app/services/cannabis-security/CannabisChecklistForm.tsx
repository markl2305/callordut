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

export function CannabisChecklistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const checklistUrl = "/Cannabis%20Facility%20Security%20Readiness%20Checklist.pdf";
  const [form, setForm] = useState({
    name: "",
    email: "",
    state: "",
    facilityType: "",
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
      const summary = [
        "Checklist request",
        `State: ${form.state || "N/A"}`,
        `Facility type: ${form.facilityType || "N/A"}`,
        `Notes: ${form.notes || "N/A"}`,
        `Checklist download: ${typeof window !== "undefined" ? `${window.location.origin}${checklistUrl}` : checklistUrl}`,
      ].join("\n");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: "",
          company: "",
          message: summary,
          source: "Cannabis Security Checklist",
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
          form_id: "callord_cannabis_checklist",
          page_location: window.location.href,
          page_path: window.location.pathname,
        });
      }
      trackLead({ formName: "Cannabis Security Checklist" });
      setForm({
        name: "",
        email: "",
        state: "",
        facilityType: "",
        notes: "",
        honeypot: "",
      });
    } catch (err) {
      console.error("Cannabis checklist form error", err);
      setError(err instanceof Error ? err.message : "Something went wrong sending your message. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ border: "1px solid var(--h-rule)", background: "var(--h-cream)", padding: "clamp(24px, 4vw, 36px)" }}
    >
      <div className="cl-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <input type="text" name="company_website" value={form.honeypot} onChange={updateField("honeypot")} style={{ display: "none" }} tabIndex={-1} />
        <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ fontFamily: FONT.serif, fontSize: 22, fontWeight: 400, color: "var(--h-ink)", margin: 0, letterSpacing: "-0.01em" }}>Get the Cannabis Security Checklist</p>
          <p style={{ fontFamily: FONT.sans, fontSize: 14, color: "var(--h-ink-soft)", lineHeight: 1.6, margin: 0 }}>
            Coverage & retention basics, entry/exit + secure access control, and monitoring/documentation essentials. We’ll send it right after you submit.
          </p>
        </div>
        <label style={labelWrap}>
          <Mono>Name*</Mono>
          <input
            id="checklist-name"
            name="name"
            required
            value={form.name}
            onChange={updateField("name")}
            style={fieldStyle}
            placeholder="Your name"
          />
        </label>
        <label style={labelWrap}>
          <Mono>Work email*</Mono>
          <input
            id="checklist-email"
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
          <Mono>State</Mono>
          <select
            id="checklist-state"
            name="state"
            value={form.state}
            onChange={updateField("state")}
            style={fieldStyle}
          >
            <option value="">Select</option>
            <option value="NM">New Mexico</option>
            <option value="CO">Colorado</option>
            <option value="AZ">Arizona</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label style={labelWrap}>
          <Mono>Facility type</Mono>
          <select
            id="checklist-facility"
            name="facilityType"
            value={form.facilityType}
            onChange={updateField("facilityType")}
            style={fieldStyle}
          >
            <option value="">Select</option>
            <option value="Dispensary">Dispensary</option>
            <option value="Cultivation">Cultivation</option>
            <option value="Processing">Processing</option>
            <option value="Multi-site / MSO">Multi-site / MSO</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label style={{ ...labelWrap, gridColumn: "1 / -1" }}>
          <Mono>What do you need help with? (optional)</Mono>
          <textarea
            id="checklist-notes"
            name="notes"
            rows={3}
            value={form.notes}
            onChange={updateField("notes")}
            style={{ ...fieldStyle, resize: "vertical" }}
            placeholder="Upcoming inspection, remediation, standardizing sites, etc."
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
            {status === "loading" ? "Sending…" : "Send me the checklist"}
          </button>
          <p style={{ fontFamily: FONT.sans, fontSize: 12, color: "var(--h-ink-faint)", lineHeight: 1.55, margin: 0 }}>
            By submitting, you agree to receive calls and text messages (SMS/MMS) about your request. Message and data rates may apply. We do not sell your information.
          </p>
          {status === "success" ? (
            <p style={{ fontFamily: FONT.sans, fontSize: 14, color: "var(--h-teal)", margin: 0 }}>
              Checklist on the way. Check your email or{" "}
              <a href={checklistUrl} style={{ color: "var(--h-teal)", textDecoration: "underline" }}>
                download it here
              </a>
              .
            </p>
          ) : null}
          {error ? <p style={{ fontFamily: FONT.sans, fontSize: 14, color: "#b4452a", margin: 0 }}>{error}</p> : null}
        </div>
      </div>
    </form>
  );
}
