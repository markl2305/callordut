"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent, type CSSProperties } from "react";
import { trackLead } from "@/lib/analytics";
import { event as gaEvent } from "@/lib/gtag";
import { Mono, FONT } from "./heritage/primitives";

type SolutionsLeadFormProps = {
  services: string[];
};

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

export function SolutionsLeadForm({ services }: SolutionsLeadFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function updateField(field: keyof typeof form) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "Solutions Page Contact Form",
          message: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setStatus("success");
      if (typeof window !== "undefined") {
        console.log("Firing GA lead_submit");
        gaEvent("lead_submit", {
          form_id: "callord_solutions_lead_form",
          page_location: window.location.href,
          page_path: window.location.pathname,
        });
      }
      trackLead({ formName: "Solutions Page Form" });
      setForm({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 24 }} onSubmit={handleSubmit}>
      <label style={labelWrap}>
        <Mono>Name</Mono>
        <input
          required
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={updateField("name")}
          style={fieldStyle}
        />
      </label>
      <label style={labelWrap}>
        <Mono>Email</Mono>
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={updateField("email")}
          style={fieldStyle}
        />
      </label>
      <label style={labelWrap}>
        <Mono>Company or facility</Mono>
        <input
          name="company"
          placeholder="Company or facility"
          value={form.company}
          onChange={updateField("company")}
          style={fieldStyle}
        />
      </label>
      <label style={labelWrap}>
        <Mono>What do you need help with?</Mono>
        <select
          name="service"
          value={form.service}
          onChange={updateField("service")}
          style={fieldStyle}
        >
          <option value="" disabled>
            What do you need help with?
          </option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </label>
      <label style={labelWrap}>
        <Mono>Tell us about your rooms or security project</Mono>
        <textarea
          name="project"
          rows={4}
          placeholder="Tell us about your rooms or security project"
          required
          value={form.message}
          onChange={updateField("message")}
          style={{ ...fieldStyle, resize: "vertical" }}
        />
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
        {status === "loading" ? "Sending…" : "Schedule Free Assessment"}
      </button>
      <p style={{ fontFamily: FONT.sans, fontSize: 12, color: "var(--h-ink-faint)", lineHeight: 1.55, margin: "4px 0 0" }}>
        By submitting, you agree to receive calls and text messages (SMS/MMS) about your request. Message and data rates may apply. We do not sell your information. See our{" "}
        <Link href="/privacy" style={{ color: "var(--h-teal)", textDecoration: "none" }}>
          Privacy Policy
        </Link>
        .
      </p>
      {status === "success" ? (
        <p style={{ fontFamily: FONT.sans, fontSize: 14, color: "var(--h-teal)", margin: 0 }}>Thanks — your message has been sent. We&rsquo;ll reach out soon.</p>
      ) : null}
      {status === "error" ? (
        <p style={{ fontFamily: FONT.sans, fontSize: 14, color: "#b4452a", margin: 0 }}>{error || "Something went wrong. Please try again."}</p>
      ) : null}
    </form>
  );
}
