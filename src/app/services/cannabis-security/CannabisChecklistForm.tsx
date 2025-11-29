"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { trackLead } from "@/lib/analytics";
import { event as gaEvent } from "@/lib/gtag";

type Status = "idle" | "loading" | "success" | "error";

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
      className="rounded-3xl border border-brand-teal/25 bg-slate-900/70 p-6 shadow-md shadow-black/30 lg:p-7"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <input type="text" name="company_website" value={form.honeypot} onChange={updateField("honeypot")} className="hidden" tabIndex={-1} />
        <div className="space-y-2 lg:col-span-2">
          <p className="text-sm font-semibold text-foreground">Get the Cannabis Security Checklist</p>
          <p className="text-sm text-slate-300">
            Coverage & retention basics, entry/exit + secure access control, and monitoring/documentation essentials. We’ll send it right after you submit.
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground" htmlFor="checklist-name">
            Name*
          </label>
          <input
            id="checklist-name"
            name="name"
            required
            value={form.name}
            onChange={updateField("name")}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground" htmlFor="checklist-email">
            Work email*
          </label>
          <input
            id="checklist-email"
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
          <label className="text-sm font-semibold text-foreground" htmlFor="checklist-state">
            State
          </label>
          <select
            id="checklist-state"
            name="state"
            value={form.state}
            onChange={updateField("state")}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          >
            <option value="">Select</option>
            <option value="NM">New Mexico</option>
            <option value="CO">Colorado</option>
            <option value="AZ">Arizona</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground" htmlFor="checklist-facility">
            Facility type
          </label>
          <select
            id="checklist-facility"
            name="facilityType"
            value={form.facilityType}
            onChange={updateField("facilityType")}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          >
            <option value="">Select</option>
            <option value="Dispensary">Dispensary</option>
            <option value="Cultivation">Cultivation</option>
            <option value="Processing">Processing</option>
            <option value="Multi-site / MSO">Multi-site / MSO</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm font-semibold text-foreground" htmlFor="checklist-notes">
            What do you need help with? (optional)
          </label>
          <textarea
            id="checklist-notes"
            name="notes"
            rows={3}
            value={form.notes}
            onChange={updateField("notes")}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
            placeholder="Upcoming inspection, remediation, standardizing sites, etc."
          />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal disabled:cursor-not-allowed disabled:opacity-80"
          >
            {status === "loading" ? "Sending…" : "Send me the checklist"}
          </button>
          <p className="text-xs text-slate-200">
            By submitting, you agree to receive calls and text messages (SMS/MMS) about your request. Message and data rates may apply. We do not sell your information.
          </p>
          {status === "success" ? (
            <p className="text-sm font-semibold text-emerald-200">
              Checklist on the way. Check your email or{" "}
              <a href={checklistUrl} className="font-semibold text-brand-teal underline-offset-2 hover:underline">
                download it here
              </a>
              .
            </p>
          ) : null}
          {error ? <p className="text-sm font-semibold text-red-200">{error}</p> : null}
        </div>
      </div>
    </form>
  );
}
