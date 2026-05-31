"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { trackLead } from "@/lib/analytics";
import { event as gaEvent } from "@/lib/gtag";

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
      if (typeof window !== "undefined") {
        console.log("Firing GA lead_submit");
        gaEvent("lead_submit", {
          form_id: "callord_home_lead_form",
          page_location: window.location.href,
          page_path: window.location.pathname,
        });
      }
      trackLead({ formName: "Homepage Lead Form" });
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
    <form className="grid gap-5 lg:grid-cols-2" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          Name*
        </label>
        <input
          id="name"
          name="name"
          required
          value={form.name}
          onChange={updateField("name")}
          className="w-full border-0 border-b border-ink bg-transparent py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-teal focus:outline-none"
          placeholder="Your name"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="company" className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          Company / Community*
        </label>
        <input
          id="company"
          name="company"
          required
          value={form.company}
          onChange={updateField("company")}
          className="w-full border-0 border-b border-ink bg-transparent py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-teal focus:outline-none"
          placeholder="e.g., Willow Grove Senior Living"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          Email*
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={updateField("email")}
          className="w-full border-0 border-b border-ink bg-transparent py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-teal focus:outline-none"
          placeholder="you@company.com"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={updateField("phone")}
          className="w-full border-0 border-b border-ink bg-transparent py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-teal focus:outline-none"
          placeholder="(555) 123-4567"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="room-type" className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          What kind of room?
        </label>
        <select
          id="room-type"
          name="room-type"
          value={form.roomType}
          onChange={updateField("roomType")}
          className="w-full border-0 border-b border-ink bg-transparent py-2.5 text-sm text-ink focus:border-teal focus:outline-none"
        >
          <option value="">Choose a room type</option>
          {roomTypes.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 lg:col-span-2">
        <label htmlFor="issues" className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          What isn’t working today?
        </label>
        <textarea
        id="issues"
        name="issues"
        rows={4}
        required
        value={form.message}
        onChange={updateField("message")}
        className="w-full resize-y border-0 border-b border-ink bg-transparent py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-teal focus:outline-none"
        placeholder="Describe the room, usage, and current pain points."
        />
      </div>
      <div className="lg:col-span-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-btn inline-flex items-center justify-center bg-ink px-6 py-3.5 text-sm font-medium text-paper disabled:cursor-not-allowed disabled:opacity-80"
        >
          {status === "loading" ? "Sending…" : "Schedule Free Assessment"}
        </button>
        <p className="mt-3 text-xs text-ink-faint">
          By submitting, you agree to receive calls and text messages (SMS/MMS) about your request. Message and data rates may apply. We do not sell your information. See our{" "}
          <Link href="/privacy" className="text-teal hover:underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      {status === "success" ? (
        <p className="lg:col-span-2 text-sm font-medium text-teal">Thanks — your message has been sent. We’ll reach out soon.</p>
      ) : null}
      {status === "error" ? (
        <p className="lg:col-span-2 text-sm font-medium text-[#b4452a]">{error || "Something went wrong. Please try again."}</p>
      ) : null}
    </form>
  );
}
