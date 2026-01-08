import Link from "next/link";
import type { Metadata } from "next";
import { CTASection } from "../../components/CTASection";
import { SectionHeader } from "../../components/SectionHeader";

export const metadata: Metadata = {
  title: "Cloud-Native Security for Multifamily Communities",
  description:
    "AI-powered video surveillance and cloud access control for multifamily properties, designed and deployed by CalLord Unified Technologies using Eagle Eye Networks and Brivo.",
};

const trustStrip = [
  "Cloud-native, centrally managed security",
  "Ideal for apartments, condos, and mixed-use",
  "Supports single sites or multi-property portfolios",
  "Reduces on-site infrastructure and maintenance",
];

const coreCapabilities = [
  {
    title: "AI Video Surveillance (Eagle Eye Networks)",
    bullets: [
      "AI-based alerts for loitering, motion, and unusual activity",
      "Smart search across all cameras",
      "Centralized monitoring for entrances, parking, and common areas",
      "Secure cloud video storage",
    ],
  },
  {
    title: "Cloud Access Control (Brivo)",
    bullets: [
      "Centralized access management for buildings and amenities",
      "Mobile credentials for residents and staff",
      "Role-based permissions for leasing, maintenance, and vendors",
      "Full access event logs",
    ],
  },
  {
    title: "Unified Security Platform",
    bullets: [
      "Video and access events in one system",
      "Faster incident review and resolution",
      "Improved accountability",
      "Reduced operational overhead",
    ],
  },
  {
    title: "Portfolio-Ready & Reliable",
    bullets: ["Designed for multi-property management", "Cloud redundancy and uptime", "Easier audits and reporting", "Scales without adding on-site servers"],
  },
];

const useCases = [
  "Building and unit entry monitoring",
  "Parking garages and common areas",
  "After-hours access tracking",
  "Incident investigation and evidence export",
  "Centralized management across properties",
];

const whyCallord = [
  "Experience with multifamily and mixed-use properties",
  "Certified deployment and support",
  "Clean upgrades from legacy systems",
  "Design-first approach",
  "Ongoing service and lifecycle support",
];

export default function MultifamilySecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_35px_110px_-60px_rgba(0,0,0,0.9)] lg:px-12 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Multifamily</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Cloud-Native Security for Multifamily Communities
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted lg:text-xl">
            AI-powered video surveillance and modern access control for apartments, condos, and mixed-use properties.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            CalLord Unified Technologies designs and deploys cloud-native physical security systems for multifamily properties. By combining Eagle Eye
            Networks&apos; AI video surveillance with Brivo&apos;s cloud access control, we deliver a unified platform that improves safety, visibility, and
            resident experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)]"
            >
              Request a Property Security Assessment
            </Link>
            <Link
              href="#platform"
              className="rounded-full border border-brand-teal/70 px-6 py-3 text-base font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              See the Platform
            </Link>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40 lg:mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Trust strip</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Designed for modern properties. Built to scale across portfolios.</h2>
            <div className="flex flex-wrap gap-2 text-sm text-slate-200">
              {trustStrip.map((item) => (
                <span key={item} className="rounded-full border border-brand-teal/50 px-4 py-2 text-xs font-semibold text-brand-teal">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-4 lg:mt-24">
          <SectionHeader title="More Than Cameras. Real Security Intelligence." />
          <p className="text-sm leading-relaxed text-slate-200">
            Multifamily security requires more than recording video. It requires insight, control, and fast response.
          </p>
          <p className="text-sm leading-relaxed text-slate-200">
            By integrating Eagle Eye&apos;s AI-powered cloud video with Brivo&apos;s cloud access control, CalLord delivers a unified security system that
            helps protect residents, staff, and property while simplifying operations.
          </p>
        </section>

        <section className="mt-16 space-y-8 lg:mt-24">
          <SectionHeader title="Core Capabilities" />
          <div className="grid gap-4 md:grid-cols-2">
            {coreCapabilities.map((capability) => (
              <div
                key={capability.title}
                className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-6 text-sm text-slate-100 shadow-md shadow-black/40"
              >
                <h3 className="text-base font-semibold text-foreground">{capability.title}</h3>
                <ul className="mt-3 space-y-2 text-slate-200">
                  {capability.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-4 lg:mt-24">
          <SectionHeader title="Built for Real-World Multifamily Operations" />
          <ul className="space-y-2 text-sm text-slate-200">
            {useCases.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
            <h3 className="text-2xl font-semibold text-foreground">Why Property Owners Choose CalLord</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              CalLord Unified Technologies designs and deploys security systems that work in the real world. We focus on clean design, reliable
              deployment, and long-term support for property owners and managers.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
            <h3 className="text-lg font-semibold text-foreground">What you can expect</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {whyCallord.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="platform" className="mt-16 rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40 lg:mt-24">
          <h3 className="text-2xl font-semibold text-foreground">Industry-Leading Platforms. One Unified System.</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            CalLord partners with Eagle Eye Networks and Brivo to deliver a complete cloud-native security solution that combines AI video
            surveillance and modern access control into a single, cohesive platform.
          </p>
        </section>

        <CTASection
          title="Modernize Your Property Security"
          subtitle="Whether you manage a single building or a full portfolio, CalLord can design and deploy a modern security system built for today's multifamily environments."
          primaryLabel="Schedule a Consultation"
          primaryHref="/contact"
        />
      </main>
    </div>
  );
}
