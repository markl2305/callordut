import Link from "next/link";
import type { Metadata } from "next";
import { SolutionsLeadForm } from "../components/SolutionsLeadForm";

export const metadata: Metadata = {
  title: "Services | AV Integration, Smart Rooms & Security",
  description:
    "Explore CalLord’s core services: AV integration & systems, smart room design & documentation, and remote installation project management.",
};

const croOfferings = [
  {
    title: "AV Integration & Systems",
    pain: "Calls that start late, touchpanels nobody trusts, and gear that feels stitched together.",
    promise: "We standardize rooms so start buttons, presets, and documentation feel the same everywhere.",
    bullets: ["One-touch join flows", "Audio + camera tuned for your table", "Room templates for rollout"],
    fit: ["Leadership rooms", "Client-facing spaces", "Multi-site teams"],
    href: "/services/av-integration",
  },
  {
    title: "Smart Room Design & Documentation",
    pain: "Virtual visit rooms that feel improvised and small pods with laptop-quality AV.",
    promise: "Operator-friendly rooms with drawings, elevations, and training handoffs.",
    bullets: ["Journey-mapped user flows", "Platform-agnostic design", "Staff-ready guides"],
    fit: ["Senior living", "Care teams", "Remote-first teams"],
    href: "/services/smart-rooms",
  },
  {
    title: "Remote Project Management",
    pain: "Installers need direction, but you don’t have time to babysit bids, subs, and punch lists.",
    promise: "We coordinate the technical details so your preferred partners deliver exactly what was designed.",
    bullets: ["Bid + scope review", "Punch lists + commissioning", "As-built + warranty packages"],
    fit: ["Owners/IT", "GCs", "Architects"],
    href: "/services/project-management",
  },
];

const faq = [
  {
    q: "Do you only work in certain regions?",
    a: "We’re remote-native. We partner with trusted installers or your preferred team anywhere in the U.S., keeping standards identical via documentation and video walk-throughs.",
  },
  {
    q: "Can you work with our existing AV or security vendors?",
    a: "Yes. We often quarterback projects where local vendors already have contracts. We provide the design, documentation, and oversight so everyone aligns on the plan.",
  },
  {
    q: "What industries do you serve?",
    a: "Our sweet spot spans small business, senior living and care environments, hospitality venues, and mission-driven organizations that can’t afford failed calls or compliance issues.",
  },
  {
    q: "Do you do one-off rooms?",
    a: "We can start with a single pilot room or facility, but we always leave you with templates and expansion guidance so scaling feels simple.",
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#112033] to-[#0b1220] px-6 py-14 shadow-[0_35px_100px_-50px_rgba(0,0,0,0.9)] lg:px-12 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Campaign landing</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            AV, smart rooms, and security that feel finished—day one.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted lg:text-xl">
            CalLord Unified Technologies designs operator-friendly rooms, security, and remote-friendly project management for teams that can’t afford failed calls or messy inspections.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)]"
            >
              Schedule Free Assessment
            </Link>
            <Link
              href="#contact"
              className="rounded-full border border-brand-teal/70 px-6 py-3 text-base font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              Download sample room layouts
            </Link>
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-brand-sand/60 bg-brand-sand/40 px-6 py-10 text-brand-slate shadow-[0_25px_80px_-60px_rgba(242,232,220,0.9)]">
          <h2 className="text-2xl font-semibold">Why teams choose CalLord</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li>Design-first, documentation-heavy approach so nothing is tribal knowledge.</li>
            <li>Remote-friendly project guidance with async video walkthroughs and clear status.</li>
            <li>Security and compliance delivered with <strong>Eagle Eye Networks</strong> + <strong>Brivo</strong>.</li>
            <li>Built for teams that can’t afford failed calls, sloppy rooms, or inspection drama.</li>
          </ul>
        </section>

        <section className="mt-20 space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Which fits you?</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">Three pathways, one partner.</h2>
            <p className="mt-2 text-lg text-muted">Pick the track that matches your current pain. We can start with one—or combine them into a rollout plan.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {croOfferings.map((offering) => (
              <div
                key={offering.title}
                className="flex h-full flex-col rounded-2xl border border-brand-sand/60 bg-brand-sand/10 p-5 text-foreground shadow-[0_25px_80px_-60px_rgba(242,232,220,0.8)]"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">{offering.title}</div>
                <p className="mt-3 text-sm text-muted">{offering.pain}</p>
                <p className="mt-2 text-base font-semibold text-brand-sand/90">{offering.promise}</p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {offering.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">This is for you if…</div>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {offering.fit.map((fit) => (
                    <li key={fit}>• {fit}</li>
                  ))}
                </ul>
                <Link
                  href={offering.href}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-brand-teal transition hover:text-brand-teal/80"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="#contact"
              className="inline-flex rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
            >
              Schedule Free Assessment
            </Link>
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
          <h3 className="text-2xl font-semibold">“They documented everything so well that our staff stopped texting IT for help.”</h3>
          <p className="mt-3 text-sm text-slate-200">Director of Operations, regional senior-living group</p>
        </section>

        <section id="contact" className="mt-20 space-y-6">
          <div className="rounded-3xl border border-brand-sand/50 bg-brand-sand/30 p-6 text-brand-slate">
            <h3 className="text-2xl font-semibold">Ready for a plan?</h3>
            <p className="mt-2 text-sm text-slate-700">
              No hard sell. We’ll review your rooms, ask a few questions, and recommend a path—even if that means a different partner.
            </p>
            <SolutionsLeadForm services={croOfferings.map((offering) => offering.title)} />
          </div>
        </section>

        <section className="mt-20 space-y-6">
          <h3 className="text-2xl font-semibold">Questions we get from campaigns</h3>
          <div className="space-y-4">
            {faq.map((item) => (
              <div key={item.q} className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-4 text-slate-100 shadow-md shadow-black/40">
                <p className="text-sm font-semibold text-slate-50">{item.q}</p>
                <p className="mt-2 text-sm text-slate-200">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
