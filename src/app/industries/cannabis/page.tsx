import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CANNABIS_CONTENT_ENABLED } from "@/config/flags";
import { CTASection } from "../../components/CTASection";
import { GlassPanel } from "../../components/GlassPanel";

const metadataBase: Metadata = {
  title: "Cannabis Facility Security & Compliance Technology | CalLord",
  description:
    "Themis, our compliance engine, decomposes 16.8.2 NMAC into a requirement map with statutory floors enforced in code — plus a backward compliance pass that re-checks every signed-off package when the rule changes.",
};
const metadataHidden: Metadata = {
  title: "Industries | CalLord",
  description: "Security and AV solutions for regulated, hospitality, and commercial environments.",
};

const challenges = [
  {
    title: "Inspectors know the rule better than a generic installer",
    body: "Camera specs, retention windows, and access-log requirements are state-specific and change on their own schedule. A vendor who last checked the statute at bid time is already behind.",
  },
  {
    title: "License deadlines don't move",
    body: "A rework cycle costs revenue and calendar time you don't have. The design has to be right against the rule the first time it's submitted.",
  },
  {
    title: "One undocumented gap can cost the license",
    body: "Incomplete coverage, an unlogged access point, or a retention period that quietly falls short of the floor becomes a violation — not a warning.",
  },
];

const engineFeatures = [
  {
    title: "The rulebook, decomposed into code",
    body: "Themis breaks the statute into a requirement-by-requirement map — the same list an inspector works from — with the statute's own numeric floors (resolution, frame rate, retention days, alert windows) wired in as validation, not just a checklist item.",
  },
  {
    title: "It refuses to file a mistake",
    body: "Enter a retention period below the statutory floor and Themis rejects the entry outright, citing the exact subsection you're short on. A package that doesn't clear the statute is not an output the system can produce.",
  },
  {
    title: "Every line carries its citation",
    body: "The finished package is a citation-mapped dossier, not a generic template — timestamped, versioned, and traceable line-by-line to the rule it satisfies.",
  },
];

const recordKeeping = [
  "Every completed package exports as a portable, timestamped record — client, license type, premises, and every resolved requirement with its supporting detail.",
  "Records are yours: no vendor lock-in, no waiting on a portal outage before an inspection. Load a saved package back into Themis at any time to review or resume it.",
  "N/A determinations are never silent — each one carries the written justification that prints straight into the package a reviewer reads.",
];

export function generateMetadata(): Metadata {
  if (!CANNABIS_CONTENT_ENABLED) {
    // TEMP: Cannabis content hidden for insurance audit
    return { ...metadataHidden, robots: { index: false, follow: false } };
  }

  return metadataBase;
}

export default function CannabisIndustryPage() {
  if (!CANNABIS_CONTENT_ENABLED) {
    // TEMP: Cannabis content hidden for insurance audit
    redirect("/industries");
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-16 lg:px-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Cannabis</p>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">
          Security &amp; compliance technology for cannabis operations
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">
          We design camera, access, and retention infrastructure to pass New Mexico, Colorado, and Arizona
          inspections the first time — and we built the compliance engine behind it in-house, so the plan is
          traceable to the rule text instead of a generic template.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/services/cannabis-security"
            className="h-btn inline-flex items-center justify-center bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
            data-cta="industries-cannabis-hero-security"
          >
            See the Cannabis Security service →
          </Link>
          <Link
            href="/tools/themis"
            className="h-btn inline-flex items-center justify-center border border-ink px-6 py-3.5 text-sm font-medium text-ink"
            data-cta="industries-cannabis-hero-themis"
          >
            Try the Themis builder
          </Link>
        </div>

        <section className="mt-20 space-y-6 lg:mt-28">
          <h2 className="font-serif text-2xl font-normal text-ink">The compliance challenge</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {challenges.map((c) => (
              <div key={c.title} className="border border-rule bg-cream p-5 text-sm text-ink-soft">
                <p className="font-serif text-base font-normal text-ink">{c.title}</p>
                <p className="mt-2 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 lg:mt-28">
          <div className="border border-rule bg-ink p-8 text-paper lg:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal-bright">Themis · our compliance engine</p>
            <h2 className="mt-3 font-serif text-3xl font-normal leading-tight lg:text-4xl">
              The leading-edge piece: a rule engine, not a checklist
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper/80">
              Every other cannabis security vendor hands you a PDF checklist. We built Themis — a compliance
              engine that encodes the statute itself, so the floors it enforces are the floors the Division
              enforces. It&rsquo;s live today at <Link href="/tools/themis" className="underline decoration-teal-bright/60 underline-offset-2 hover:text-teal-bright">/tools/themis</Link>.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {engineFeatures.map((f) => (
                <div key={f.title}>
                  <p className="text-sm font-medium text-paper">{f.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-paper/70">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:mt-28 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="border border-rule bg-cream p-6 text-ink">
            <h3 className="font-serif text-2xl font-normal">Your compliance record — kept, and accessible</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              A compliance package isn&rsquo;t worth much if it sits in one inbox. Every package Themis builds
              exports as a complete, self-contained record you hold and can reload at any time — for a renewal,
              an internal audit, or the moment an inspector asks a question you weren&rsquo;t expecting.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              {recordKeeping.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <GlassPanel title="Rule changes, watched — and checked backward">
            <p className="text-sm leading-relaxed">
              Cannabis regulation doesn&rsquo;t hold still. When 16.8.2 NMAC amends — a retention window
              extends, a resolution floor rises — Themis&rsquo; rule map updates to match. The part that matters
              is what happens to the packages you already signed off on.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              Themis&rsquo; <strong className="font-medium text-ink">backward compliance pass</strong> re-runs
              every previously completed package against the current rule map and tells you exactly which
              facilities have drifted out of compliance because the rule moved — not because anything changed
              on site. Run it any time from the builder&rsquo;s toolbar; no re-entry required, and nothing is
              treated as compliant just because it was compliant last time.
            </p>
            <Link
              href="/tools/themis"
              className="h-btn mt-5 inline-flex w-full items-center justify-center bg-ink px-5 py-3.5 text-sm font-medium text-paper"
              data-cta="industries-cannabis-backward-pass"
            >
              Run a backward compliance pass
            </Link>
          </GlassPanel>
        </section>

        <section className="mt-20 space-y-4 lg:mt-28">
          <h2 className="font-serif text-2xl font-normal text-ink">How we help</h2>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
              <span>State-specific compliance design for New Mexico, Colorado, and Arizona — built on the current statute, not a generic template.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
              <span>Fixed-price, fixed-timeline execution, ten business days from a resolved Themis package to submission-ready.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
              <span>Eagle Eye Networks &amp; Brivo certified — cloud-first video and access control built for the audit logs regulators expect.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
              <span>Inspector-ready documentation before the inspector arrives, and a backward compliance pass whenever the rule changes after.</span>
            </li>
          </ul>
          <p className="text-sm text-ink-soft">If you fail inspection due to our design, we fix it free or refund your fee.</p>
        </section>

        <CTASection
          title="Your license deadline isn't flexible."
          subtitle="30-minute assessment call, fixed-price quote in 48 hours — or start with the Themis builder and see the engine reject a non-compliant entry yourself."
          primaryLabel="Schedule Free Assessment"
          primaryHref="/services/cannabis-security#contact"
          secondaryLabel="Try the Themis builder"
          secondaryHref="/tools/themis"
        />
      </main>
    </div>
  );
}
