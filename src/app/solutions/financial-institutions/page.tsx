import Link from "next/link";
import type { Metadata } from "next";
import { CTASection } from "../../components/CTASection";
import { SectionHeader } from "../../components/SectionHeader";

export const metadata: Metadata = {
  title: "Cloud-Native Physical Security for Banks & Credit Unions",
  description:
    "AI-powered video surveillance and cloud access control for banks and credit unions, designed and deployed by CalLord Unified Technologies using Eagle Eye Networks and Brivo.",
};

const trustStrip = [
  "Cloud-native security architecture",
  "Designed for branches, ATMs, and operations centers",
  "Centralized visibility across all locations",
  "Reduced reliance on legacy on-prem systems",
];

const coreCapabilities = [
  {
    title: "AI Video Surveillance (Eagle Eye Networks)",
    bullets: [
      "AI-powered alerts for unusual activity",
      "Smart search across all cameras",
      "Centralized monitoring for branches and ATMs",
      "Secure cloud video storage",
    ],
  },
  {
    title: "Cloud Access Control (Brivo)",
    bullets: [
      "Centralized door and credential management",
      "Mobile and role-based access",
      "Instant access changes without site visits",
      "Full access event logging",
    ],
  },
  {
    title: "Unified Security Platform",
    bullets: [
      "Video and access events in one system",
      "Faster investigations and incident review",
      "Improved accountability and reporting",
      "Reduced operational complexity",
    ],
  },
  {
    title: "Compliance & Reliability",
    bullets: [
      "Designed for regulated financial environments",
      "Cloud redundancy and uptime",
      "Simplified audit and evidence retrieval",
      "Reduced risk from aging infrastructure",
    ],
  },
];

const useCases = [
  "Branch and lobby security",
  "ATM monitoring and fraud investigation",
  "After-hours access auditing",
  "Incident review and evidence export",
  "Centralized security management",
];

const whyCallord = [
  "Experience with banking and regulated clients",
  "Vendor-certified deployment and support",
  "Clean migrations from legacy DVR/NVR systems",
  "Design-first, security-focused approach",
  "Ongoing service and lifecycle support",
];

export default function FinancialInstitutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_35px_110px_-60px_rgba(0,0,0,0.9)] lg:px-12 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Financial institutions</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Cloud-Native Physical Security for Banks & Credit Unions
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted lg:text-xl">
            AI-powered video surveillance and access control, designed and deployed by CalLord Unified Technologies.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            CalLord Unified Technologies designs and deploys modern, cloud-native physical security systems for financial institutions. By
            combining Eagle Eye Networks&apos; AI video surveillance with Brivo&apos;s cloud access control, we deliver a unified security platform
            built for today&apos;s banking environment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)]"
            >
              Schedule Free Assessment
            </Link>
            <Link
              href="#platform"
              className="rounded-full border border-brand-teal/70 px-6 py-3 text-base font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              See the Platform
            </Link>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40 lg:mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Trust strip</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Built for regulated environments. Designed for distributed banking.</h2>
            <div className="flex flex-wrap gap-2 text-sm text-slate-200">
              {trustStrip.map((item) => (
                <span key={item} className="rounded-full border border-brand-teal/50 px-4 py-2 text-xs font-semibold text-brand-teal">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 space-y-4 lg:mt-28">
          <SectionHeader title="So Much More Than Cameras" />
          <p className="text-sm leading-relaxed text-slate-200">
            Modern banking security requires more than video recording. It requires intelligence, visibility, and control.
          </p>
          <p className="text-sm leading-relaxed text-slate-200">
            By integrating Eagle Eye&apos;s AI-powered cloud video with Brivo&apos;s cloud access control, CalLord delivers a unified security system
            that improves safety, speeds investigations, and simplifies operations.
          </p>
        </section>

        <section className="mt-20 space-y-8 lg:mt-28">
          <SectionHeader title="Core Capabilities" />
          <div className="grid gap-6 md:grid-cols-2">
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

        <section className="mt-20 space-y-4 lg:mt-28">
          <SectionHeader title="Designed for Real-World Banking Operations" />
          <ul className="space-y-2 text-sm text-slate-200">
            {useCases.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 grid gap-6 lg:mt-28 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
            <h3 className="text-2xl font-semibold text-foreground">Why Financial Institutions Choose CalLord</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              CalLord Unified Technologies is a trusted security integrator for regulated environments. We design, deploy, and support physical
              security systems that scale with your institution and adapt to evolving threats.
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

        <section id="platform" className="mt-20 rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40 lg:mt-28">
          <h3 className="text-2xl font-semibold text-foreground">Industry-Leading Platforms. One Unified System.</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            CalLord partners with Eagle Eye Networks and Brivo to deliver a complete cloud-native security solution — combining AI video
            surveillance and modern access control into a single, cohesive platform.
          </p>
        </section>

        <CTASection
          title="Let’s Modernize Your Security Infrastructure"
          subtitle="If your institution is ready to move beyond legacy security systems, CalLord can help you design and deploy a modern, cloud-native solution."
          primaryLabel="Schedule Free Assessment"
          primaryHref="/contact"
        />
      </main>
    </div>
  );
}
