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
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="border border-rule bg-cream px-6 py-14 lg:px-12 lg:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Campaign landing</p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl lg:text-6xl">
            AV, smart rooms, and security that feel finished—day one.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft lg:text-xl">
            CalLord Unified Technologies designs operator-friendly rooms, security, and remote-friendly project management for teams that can’t afford failed calls or messy inspections.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="h-btn bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
            >
              Schedule Free Assessment
            </Link>
            <Link
              href="#contact"
              className="h-btn border border-ink px-6 py-3.5 text-sm font-medium text-ink"
            >
              Download sample room layouts
            </Link>
          </div>
        </section>

        <section className="mt-20 border border-rule bg-cream px-6 py-10 text-ink">
          <h2 className="font-serif text-2xl font-normal text-ink">Why teams choose CalLord</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-soft">
            <li>Design-first, documentation-heavy approach so nothing is tribal knowledge.</li>
            <li>Remote-friendly project guidance with async video walkthroughs and clear status.</li>
            <li>Security and compliance delivered with <strong>Eagle Eye Networks</strong> + <strong>Brivo</strong>.</li>
            <li>Built for teams that can’t afford failed calls, sloppy rooms, or inspection drama.</li>
          </ul>
        </section>

        <section className="mt-20 space-y-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Which fits you?</p>
            <h2 className="mt-3 font-serif text-3xl font-normal text-ink">Three pathways, one partner.</h2>
            <p className="mt-2 text-lg text-ink-soft">Pick the track that matches your current pain. We can start with one—or combine them into a rollout plan.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {croOfferings.map((offering) => (
              <div
                key={offering.title}
                className="flex h-full flex-col border border-rule bg-cream p-5 text-ink"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">{offering.title}</div>
                <p className="mt-3 text-sm text-ink-soft">{offering.pain}</p>
                <p className="mt-2 text-base font-medium text-ink">{offering.promise}</p>
                <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                  {offering.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-teal">This is for you if…</div>
                <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                  {offering.fit.map((fit) => (
                    <li key={fit}>• {fit}</li>
                  ))}
                </ul>
                <Link
                  href={offering.href}
                  className="h-link mt-4 inline-flex items-center text-sm font-medium text-teal"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="#contact"
              className="h-btn inline-flex bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
            >
              Schedule Free Assessment
            </Link>
          </div>
        </section>

        <section className="mt-20 border border-rule bg-cream p-6 text-ink">
          <h3 className="font-serif text-2xl font-normal text-ink">“They documented everything so well that our staff stopped texting IT for help.”</h3>
          <p className="mt-3 text-sm text-ink-soft">Director of Operations, regional senior-living group</p>
        </section>

        <section id="contact" className="mt-20 space-y-6">
          <div className="border border-rule bg-cream p-6 text-ink">
            <h3 className="font-serif text-2xl font-normal text-ink">Ready for a plan?</h3>
            <p className="mt-2 text-sm text-ink-soft">
              No hard sell. We’ll review your rooms, ask a few questions, and recommend a path—even if that means a different partner.
            </p>
            <SolutionsLeadForm services={croOfferings.map((offering) => offering.title)} />
          </div>
        </section>

        <section className="mt-20 space-y-6">
          <h3 className="font-serif text-2xl font-normal text-ink">Questions we get from campaigns</h3>
          <div className="space-y-4">
            {faq.map((item) => (
              <div key={item.q} className="border border-rule bg-cream p-4 text-ink">
                <p className="text-sm font-medium text-ink">{item.q}</p>
                <p className="mt-2 text-sm text-ink-soft">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
