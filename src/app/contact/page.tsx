import type { Metadata } from "next";
import { SectionHeader } from "../components/SectionHeader";
import { siteConfig } from "../../config/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Tell Us About Your Rooms | CalLord Unified Technologies",
  description:
    "Share your spaces, timelines, and priorities. CalLord Unified Technologies replies within one business day with next steps for AV, smart rooms, or security.",
};

export default function ContactPage() {
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
          <ContactForm />
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
