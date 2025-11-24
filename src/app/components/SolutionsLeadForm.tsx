"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { trackLead } from "@/lib/analytics";

type SolutionsLeadFormProps = {
  services: string[];
};

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
    <form className="mt-6 grid gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
      <input
        required
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={updateField("name")}
        className="rounded-2xl border border-brand-sand/60 bg-white/80 px-4 py-3 text-sm text-brand-slate placeholder:text-slate-500 focus:border-brand-teal focus:outline-none"
      />
      <input
        required
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={updateField("email")}
        className="rounded-2xl border border-brand-sand/60 bg-white/80 px-4 py-3 text-sm text-brand-slate placeholder:text-slate-500 focus:border-brand-teal focus:outline-none"
      />
      <input
        name="company"
        placeholder="Company or facility"
        value={form.company}
        onChange={updateField("company")}
        className="rounded-2xl border border-brand-sand/60 bg-white/80 px-4 py-3 text-sm text-brand-slate placeholder:text-slate-500 focus:border-brand-teal focus:outline-none"
      />
      <select
        name="service"
        value={form.service}
        onChange={updateField("service")}
        className="rounded-2xl border border-brand-sand/60 bg-white/80 px-4 py-3 text-sm text-brand-slate focus:border-brand-teal focus:outline-none"
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
      <textarea
        name="project"
        rows={4}
        placeholder="Tell us about your rooms or security project"
        required
        value={form.message}
        onChange={updateField("message")}
        className="rounded-2xl border border-brand-sand/60 bg-white/80 px-4 py-3 text-sm text-brand-slate placeholder:text-slate-500 focus:border-brand-teal focus:outline-none lg:col-span-2"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="lg:col-span-2 inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 disabled:cursor-not-allowed disabled:opacity-80"
      >
        {status === "loading" ? "Sending…" : "Request my planning call"}
      </button>
      {status === "success" ? (
        <p className="lg:col-span-2 text-sm font-semibold text-emerald-800">Thanks — your message has been sent. We’ll reach out soon.</p>
      ) : null}
      {status === "error" ? (
        <p className="lg:col-span-2 text-sm font-semibold text-red-700">{error || "Something went wrong. Please try again."}</p>
      ) : null}
    </form>
  );
}
