"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type HomeLeadFormProps = {
  roomTypes?: string[];
};

export function HomeLeadForm({ roomTypes = [] }: HomeLeadFormProps) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    roomType: "",
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
          source: "Homepage Lead Form",
          issues: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setStatus("success");
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        roomType: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form className="grid gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
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
        <label htmlFor="email" className="text-sm font-semibold text-foreground">
          Email*
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={updateField("email")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          placeholder="you@company.com"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-semibold text-foreground">
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={updateField("phone")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
          placeholder="(555) 123-4567"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="room-type" className="text-sm font-semibold text-foreground">
          What kind of room?
        </label>
        <select
          id="room-type"
          name="room-type"
          value={form.roomType}
          onChange={updateField("roomType")}
          className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
        >
          <option value="">Choose a room type</option>
          {roomTypes.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2 lg:col-span-2">
        <label htmlFor="issues" className="text-sm font-semibold text-foreground">
          What isn’t working today?
        </label>
        <textarea
        id="issues"
        name="issues"
        rows={4}
        required
        value={form.message}
        onChange={updateField("message")}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
        placeholder="Describe the room, usage, and current pain points."
        />
      </div>
      <div className="lg:col-span-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal disabled:cursor-not-allowed disabled:opacity-80"
        >
          {status === "loading" ? "Sending…" : "Get my room plan"}
        </button>
      </div>
      {status === "success" ? (
        <p className="lg:col-span-2 text-sm font-semibold text-emerald-200">Thanks — your message has been sent. We’ll reach out soon.</p>
      ) : null}
      {status === "error" ? (
        <p className="lg:col-span-2 text-sm font-semibold text-red-200">{error || "Something went wrong. Please try again."}</p>
      ) : null}
    </form>
  );
}
