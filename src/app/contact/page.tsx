 "use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { siteConfig } from "../../config/site";

export const metadata = {
  title: "Tell Us About Your Rooms | CalLord Unified Technologies",
  description:
    "Share your spaces, timelines, and priorities. CalLord Unified Technologies replies within one business day with next steps for AV, smart rooms, or security.",
};

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

export default function ContactPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name")?.toString().trim() ?? "",
      email: formData.get("email")?.toString().trim() ?? "",
      phone: formData.get("phone")?.toString().trim() ?? "",
      company: formData.get("company")?.toString().trim() ?? "",
      roomType: formData.get("room-type")?.toString() ?? "",
      message: formData.get("project")?.toString().trim() ?? "",
      heardFrom: formData.get("heard-from")?.toString().trim() ?? "",
      honeypot: formData.get("company_website")?.toString().trim() ?? "",
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError("Name, email, and project details are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/thank-you");
      } else {
        setError("Something went wrong sending your message. Please try again or call us directly.");
      }
    } catch (err) {
      console.error("Contact form submission failed", err);
      setError("Something went wrong sending your message. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-6 lg:px-6">
        <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.8)] lg:px-12 lg:py-20">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Get started</p>
            <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">Tell us about your rooms.</h1>
            <p className="text-lg leading-relaxed text-muted lg:text-xl">
              Share a bit about your spaces, timelines, and priorities — we’ll reply within one business day with next steps.
            </p>
            <p className="text-sm text-slate-300">
              Expect a quick acknowledgment, then a short set of clarifying questions or a time to review live. No spam, no endless drip sequences.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <span>
                Call us: <a className="font-semibold text-brand-teal" href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-brand-teal/70 sm:inline-block" aria-hidden />
              <span>
                Email: <a className="font-semibold text-brand-teal" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </span>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-8 lg:mt-24">
          <SectionHeader
            title="Project intake"
            subtitle="We’ll follow up within one business day with a plan and a time to review if helpful."
          />
          <form
            className="grid gap-4 rounded-3xl border border-brand-teal/30 bg-gradient-to-br from-brand-teal/15 via-brand-teal/10 to-brand-slate/40 px-6 py-10 lg:grid-cols-2 lg:px-12"
            onSubmit={handleSubmit}
          >
            <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-foreground">
                Name*
              </label>
              <input
                id="name"
                name="name"
                required
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
                defaultValue=""
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
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                placeholder="Room types, challenges today, timeline, success looks like..."
              />
            </div>
            <div className="lg:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isSubmitting ? "Sending…" : "Plan my next build"}
              </button>
            </div>
            {error ? <p className="lg:col-span-2 text-sm font-semibold text-red-200">{error}</p> : null}
          </form>
        </section>

        <section className="mt-12 rounded-3xl border border-white/5 bg-card/80 p-6 text-sm text-muted lg:mt-16">
          <p>
            Prefer to skip the form? Email us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand-teal">
              {siteConfig.email}
            </a>{" "}
            or call <a href={siteConfig.phoneHref} className="font-semibold text-brand-teal">{siteConfig.phone}</a>. {siteConfig.serviceArea}
          </p>
        </section>
      </main>
    </div>
  );
}
