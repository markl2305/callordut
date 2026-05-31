import type { Metadata } from "next";
import { SectionHeader } from "../components/SectionHeader";
import { siteConfig } from "../../config/site";
import { ContactForm } from "./ContactForm";
import { FadeIn } from "../components/MotionWrappers";

export const metadata: Metadata = {
  title: "Tell Us About Your Rooms | CalLord Unified Technologies",
  description:
    "Share your spaces, timelines, and priorities. CalLord Unified Technologies replies within one business day with next steps for AV, smart rooms, or security.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground noise-overlay">
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-6 lg:px-6">

        <FadeIn>
          <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#0c1222] via-[#0a1020] to-background px-6 py-14 lg:px-12 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(39,154,146,0.1),transparent_50%)]" />
            <div className="relative space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-teal">Get started</span>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">Tell us about your rooms.</h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted lg:text-xl">
                Share a bit about your spaces, timelines, and priorities — we'll reply within one business day with next steps.
              </p>
              <p className="text-sm text-slate-400">
                Expect a quick acknowledgment, then a short set of clarifying questions or a time to review live. No spam, no endless drip sequences.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <span>
                  Call us: <a className="font-semibold text-brand-teal" href={siteConfig.phoneHref}>{siteConfig.phone}</a>
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-brand-teal/50 sm:inline-block" aria-hidden />
                <span>
                  Email: <a className="font-semibold text-brand-teal" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </span>
              </div>
            </div>
          </section>
        </FadeIn>

        <section className="mt-16 space-y-8 lg:mt-24">
          <SectionHeader
            title="Project intake"
            subtitle="We'll follow up within one business day with a plan and a time to review if helpful."
          />
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </section>

        <FadeIn className="mt-12 lg:mt-16">
          <section className="glass-card rounded-3xl p-6 text-sm text-muted">
            <p>
              Prefer to skip the form? Email us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand-teal">{siteConfig.email}</a>{" "}
              or call <a href={siteConfig.phoneHref} className="font-semibold text-brand-teal">{siteConfig.phone}</a>. {siteConfig.serviceArea}
            </p>
          </section>
        </FadeIn>
      </main>
    </div>
  );
}
