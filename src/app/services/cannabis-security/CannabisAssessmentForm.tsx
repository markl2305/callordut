"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { trackLead } from "@/lib/analytics";
import { event as gaEvent } from "@/lib/gtag";

type Status = "idle" | "loading" | "success" | "error";

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
      className="rounded-3xl border border-brand-teal/30 bg-gradient-to-br from-brand-teal/15 via-brand-teal/10 to-brand-slate/40 p-6 shadow-md shadow-black/40 lg:p-8"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <input type="text" name="company_website" value={form.honeypot} onChange={updateField("honeypot")} className="hidden" tabIndex={-1} />
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground" htmlFor="assess-name">
            Name*
          </label>
          <input
            id="assess-name"
            name="name"
            required
            value={form.name}
            onChange={updateField("name")}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground" htmlFor="assess-email">
            Email*
          </label>
          <input
            id="assess-email"
            type="email"
            name="email"
            required
            value={form.email}
            onChange={updateField("email")}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
            placeholder="you@company.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground" htmlFor="assess-phone">
            Phone
          </label>
          <input
            id="assess-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={updateField("phone")}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
            placeholder="(866) 657-2383"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground" htmlFor="assess-company">
            Company / Facility
          </label>
          <input
            id="assess-company"
            name="company"
            value={form.company}
            onChange={updateField("company")}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
            placeholder="Dispensary, cultivation, processing"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground" htmlFor="assess-state">
            State
          </label>
          <select
            id="assess-state"
            name="state"
            value={form.state}
            onChange={updateField("state")}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          >
            <option value="NM">New Mexico</option>
            <option value="CO">Colorado</option>
            <option value="AZ">Arizona</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground" htmlFor="assess-license">
            License status
          </label>
          <select
            id="assess-license"
            name="licenseStatus"
            value={form.licenseStatus}
            onChange={updateField("licenseStatus")}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          >
            <option value="">Select status</option>
            <option value="Pre-license">Pre-license</option>
            <option value="Licensed - first inspection pending">Licensed - first inspection pending</option>
            <option value="Licensed - remediation needed">Licensed - remediation needed</option>
            <option value="Licensed - adding sites">Licensed - adding sites</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground" htmlFor="assess-timeline">
            Timeline
          </label>
          <select
            id="assess-timeline"
            name="timeline"
            value={form.timeline}
            onChange={updateField("timeline")}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          >
            <option value="">Select timeline</option>
            <option value="Urgent - inspection scheduled">Urgent - inspection scheduled</option>
            <option value="This month">This month</option>
            <option value="This quarter">This quarter</option>
            <option value="Scoping for later">Scoping for later</option>
          </select>
        </div>
        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm font-semibold text-foreground" htmlFor="assess-notes">
            What should we know?*
          </label>
          <textarea
            id="assess-notes"
            name="notes"
            required
            rows={4}
            value={form.notes}
            onChange={updateField("notes")}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
            placeholder="Facility type, number of doors/cameras, inspection date, current pain points."
          />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal disabled:cursor-not-allowed disabled:opacity-80"
          >
            {status === "loading" ? "Sending…" : "Schedule Free Assessment"}
          </button>
          <p className="text-xs text-slate-200">
            By submitting, you agree to receive calls and text messages (SMS/MMS) about your request. Message and data rates may apply. We do not sell your information.
          </p>
          {status === "success" ? (
            <p className="text-sm font-semibold text-emerald-200">Thanks — we’ll reach out to schedule your assessment.</p>
          ) : null}
          {error ? <p className="text-sm font-semibold text-red-200">{error}</p> : null}
        </div>
      </div>
    </form>
  );
}
