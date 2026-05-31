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
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="border border-rule bg-cream px-6 py-14 lg:px-12 lg:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Multifamily</p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl lg:text-6xl">
            Cloud-Native Security for Multifamily Communities
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft lg:text-xl">
            AI-powered video surveillance and modern access control for apartments, condos, and mixed-use properties.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            CalLord Unified Technologies designs and deploys cloud-native physical security systems for multifamily properties. By combining Eagle Eye
            Networks&apos; AI video surveillance with Brivo&apos;s cloud access control, we deliver a unified platform that improves safety, visibility, and
            resident experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="h-btn bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
            >
              Schedule Free Assessment
            </Link>
            <Link
              href="#platform"
              className="h-btn border border-ink px-6 py-3.5 text-sm font-medium text-ink"
            >
              See the Platform
            </Link>
          </div>
        </section>

        <section className="mt-16 border border-rule bg-cream p-6 text-ink lg:mt-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Trust strip</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-serif text-2xl font-normal text-ink">Designed for modern properties. Built to scale across portfolios.</h2>
            <div className="flex flex-wrap gap-2 text-sm text-ink-soft">
              {trustStrip.map((item) => (
                <span key={item} className="border border-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-teal">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 space-y-4 lg:mt-28">
          <SectionHeader title="More Than Cameras. Real Security Intelligence." />
          <p className="text-sm leading-relaxed text-ink-soft">
            Multifamily security requires more than recording video. It requires insight, control, and fast response.
          </p>
          <p className="text-sm leading-relaxed text-ink-soft">
            By integrating Eagle Eye&apos;s AI-powered cloud video with Brivo&apos;s cloud access control, CalLord delivers a unified security system that
            helps protect residents, staff, and property while simplifying operations.
          </p>
        </section>

        <section className="mt-20 space-y-8 lg:mt-28">
          <SectionHeader title="Core Capabilities" />
          <div className="grid gap-6 md:grid-cols-2">
            {coreCapabilities.map((capability) => (
              <div
                key={capability.title}
                className="border border-rule bg-cream p-6 text-sm text-ink"
              >
                <h3 className="font-serif text-base font-normal text-ink">{capability.title}</h3>
                <ul className="mt-3 space-y-2 text-ink-soft">
                  {capability.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 space-y-4 lg:mt-28">
          <SectionHeader title="Built for Real-World Multifamily Operations" />
          <ul className="space-y-2 text-sm text-ink-soft">
            {useCases.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 grid gap-6 lg:mt-28 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="border border-rule bg-cream p-6 text-ink">
            <h3 className="font-serif text-2xl font-normal text-ink">Why Property Owners Choose CalLord</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              CalLord Unified Technologies designs and deploys security systems that work in the real world. We focus on clean design, reliable
              deployment, and long-term support for property owners and managers.
            </p>
          </div>
          <div className="border border-rule bg-cream p-6 text-ink">
            <h3 className="font-serif text-lg font-normal text-ink">What you can expect</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {whyCallord.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="platform" className="mt-20 border border-rule bg-cream p-6 text-ink lg:mt-28">
          <h3 className="font-serif text-2xl font-normal text-ink">Industry-Leading Platforms. One Unified System.</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            CalLord partners with Eagle Eye Networks and Brivo to deliver a complete cloud-native security solution that combines AI video
            surveillance and modern access control into a single, cohesive platform.
          </p>
        </section>

        <CTASection
          title="Modernize Your Multifamily Security"
          subtitle="Whether you manage a single building or a full portfolio, CalLord can design and deploy a modern security system built for today's multifamily environments."
          primaryLabel="Schedule Free Assessment"
          primaryHref="/contact"
        />
      </main>
    </div>
  );
}
