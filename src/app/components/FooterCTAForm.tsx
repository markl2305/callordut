"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { trackLead } from "@/lib/analytics";
import { event as gaEvent } from "@/lib/gtag";

type Status = "idle" | "loading" | "success" | "error";

const spaceTypes = [
  "Conference Room",
  "Boardroom",
  "Virtual Visit Room",
  "Security System",
  "Other",
];

export function FooterCTAForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    spaceType: "",
    message: "",
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
          roomType: form.spaceType,
          message: form.message,
          source: "Homepage Footer Form",
          issues: form.message,
          honeypot: form.honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setStatus("success");
      if (typeof window !== "undefined") {
        gaEvent("lead_submit", {
          form_id: "callord_footer_cta",
          page_location: window.location.href,
          page_path: window.location.pathname,
        });
      }
      trackLead({ formName: "Homepage Footer Form" });
      setForm({
        name: "",
        email: "",
        phone: "",
        spaceType: "",
        message: "",
        honeypot: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form className="grid gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
      <input
        type="text"
        name="company_website"
        value={form.honeypot}
        onChange={updateField("honeypot")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="space-y-2">
        <label htmlFor="footer-name" className="text-sm font-semibold text-foreground">
          Name*
        </label>
        <input
          id="footer-name"
          name="name"
          required
          value={form.name}
          onChange={updateField("name")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          placeholder="Your name"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="footer-email" className="text-sm font-semibold text-foreground">
          Email*
        </label>
        <input
          id="footer-email"
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
        <label htmlFor="footer-phone" className="text-sm font-semibold text-foreground">
          Phone (optional)
        </label>
        <input
          id="footer-phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={updateField("phone")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          placeholder="(866) 657-2383"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="footer-space" className="text-sm font-semibold text-foreground">
          Space type
        </label>
        <select
          id="footer-space"
          name="spaceType"
          value={form.spaceType}
          onChange={updateField("spaceType")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
        >
          <option value="">Choose a space</option>
          {spaceTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2 lg:col-span-2">
        <label htmlFor="footer-message" className="text-sm font-semibold text-foreground">
          Message*
        </label>
        <textarea
          id="footer-message"
          name="message"
          rows={4}
          required
          value={form.message}
          onChange={updateField("message")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          placeholder="Give us a room or area, rough budget, and how you use it today."
        />
      </div>
      <div className="lg:col-span-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal disabled:cursor-not-allowed disabled:opacity-80"
        >
          {status === "loading" ? "Sending…" : "Get Started"}
        </button>
      </div>
      {status === "success" ? (
        <p className="lg:col-span-2 text-sm font-semibold text-emerald-200">Thanks — we’ll reach out with a simple plan.</p>
      ) : null}
      {status === "error" ? (
        <p className="lg:col-span-2 text-sm font-semibold text-red-200">{error || "Something went wrong. Please try again."}</p>
      ) : null}
    </form>
  );
}
