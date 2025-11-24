"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

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

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
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
          source: "Contact Page Form",
          heardFrom: form.heardFrom,
          roomType: form.roomType,
          honeypot: form.honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong sending your message. Please try again or call us directly.");
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        roomType: "",
        message: "",
        heardFrom: "",
        honeypot: "",
      });
    } catch (err) {
      console.error("Contact form submission failed", err);
      setError(err instanceof Error ? err.message : "Something went wrong sending your message. Please try again or call us directly.");
      setStatus("error");
    }
  }

  return (
    <form
      className="grid gap-4 rounded-3xl border border-brand-teal/30 bg-gradient-to-br from-brand-teal/15 via-brand-teal/10 to-brand-slate/40 px-6 py-10 lg:grid-cols-2 lg:px-12"
      onSubmit={handleSubmit}
    >
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
        <label htmlFor="name" className="text-sm font-semibold text-foreground">
          Name*
        </label>
        <input
          id="name"
          name="name"
          required
          value={form.name}
          onChange={updateField("name")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          placeholder="Your name"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-foreground">
          Email*
        </label>
        <input
          id="email"
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
        <label htmlFor="phone" className="text-sm font-semibold text-foreground">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={updateField("phone")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          placeholder="(505) 207-5211"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="heard-from" className="text-sm font-semibold text-foreground">
          How did you hear about us?
        </label>
        <input
          id="heard-from"
          name="heard-from"
          value={form.heardFrom}
          onChange={updateField("heardFrom")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          placeholder="Referral, search, social, etc."
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-semibold text-foreground">
          Company / Community*
        </label>
        <input
          id="company"
          name="company"
          required
          value={form.company}
          onChange={updateField("company")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          placeholder="e.g., Willow Grove Senior Living"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="room-type" className="text-sm font-semibold text-foreground">
          What kind of room?
        </label>
        <select
          id="room-type"
          name="room-type"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          value={form.roomType}
          onChange={updateField("roomType")}
        >
          <option value="" disabled>
            Choose a room type (optional)
          </option>
          {roomOptions.map((option) => (
            <option key={option} value={option} className="text-slate-900">
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2 lg:col-span-2">
        <label htmlFor="project" className="text-sm font-semibold text-foreground">
          Tell us about your rooms or project*
        </label>
        <textarea
          id="project"
          name="project"
          rows={5}
          required
          value={form.message}
          onChange={updateField("message")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          placeholder="Room types, challenges today, timeline, success looks like..."
        />
      </div>
      <div className="lg:col-span-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex w-full items-center justify-center rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal disabled:cursor-not-allowed disabled:opacity-80"
        >
          {status === "loading" ? "Sending…" : "Plan my next build"}
        </button>
      </div>
      {status === "success" ? (
        <p className="lg:col-span-2 text-sm font-semibold text-emerald-200">
          Thanks — your message has been sent. We’ll reach out soon.
        </p>
      ) : null}
      {error ? <p className="lg:col-span-2 text-sm font-semibold text-red-200">{error}</p> : null}
    </form>
  );
}
