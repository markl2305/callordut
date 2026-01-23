import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CTASection } from "../../components/CTASection";
import { GlassPanel } from "../../components/GlassPanel";
import { CannabisAssessmentForm } from "./CannabisAssessmentForm";
import { CannabisChecklistForm } from "./CannabisChecklistForm";
import { CANNABIS_CONTENT_ENABLED } from "@/config/flags";

const metadataBase: Metadata = {
  title: "Cannabis Security Systems that pass inspection the first time",
  description:
    "Compliant cannabis security for licensed facilities in NM, CO, AZ. Camera, access, monitoring, and documentation designed to meet state requirements and protect your license.",
};
const metadataHidden: Metadata = {
  title: "Security Services | CalLord",
  description: "Compliance-ready security design and documentation for high-security commercial environments.",
};

const bestFor = [
  "Dispensaries heading to first inspection",
  "Cultivation / processing sites that outgrew DIY",
  "Multi-site operators standardizing templates",
  "Teams burned by generic AV/security vendors",
];

const complianceFocus = [
  "Designed to meet state cannabis security regulations (NM, CO, AZ)",
  "Camera, access, intrusion, and monitoring inspectors understand",
  "Full documentation for inspections and renewals",
];

const deliverables = [
  "Camera coverage maps with risers and critical asset focus",
  "Access control layouts, credentials, and policies inspectors can verify",
  "Video retention + storage planning calibrated to state rules",
  "Intrusion + monitoring-ready design with audit logging configured",
  "Compliance-ready drawing set, device schedules, and documentation",
  "Remediation roadmaps for existing deployments that need to pass",
];

const optionalUpgrades = [
  "Centralized monitoring dashboards",
  "Environmental sensors tied to alerting",
  "Visitor management workflows with camera tie-ins",
  "Integration with POS / inventory tracking",
];

const trustBand = [
  "Video surveillance design + install experience",
  "Access control & intrusion coordination",
  "Remote monitoring ready (cloud-first stacks)",
  "Locally owned in the Southwest",
  "Specialized in cannabis facilities",
];

const whatYouGet = [
  "Designs mapped to NM, CO, AZ cannabis requirements",
  "Camera, access, and alarm layouts inspectors can verify",
  "Documentation packages for regulators and renewals",
  "Coordination with IT and monitoring providers",
];

const whatsAtStake = [
  "Revenue loss during shutdowns if you fail inspection",
  "Scrambling under inspector pressure without a plan",
  "Higher costs when rushed upgrades are forced",
];

const howItWorks = [
  "Share facility details: floor plan, license, notes, timeline",
  "Map requirements to your layout: cameras, access, intrusion, retention",
  "Deliver a clear plan + quote so you can move with confidence",
];

const inspectionChecklist = [
  "Coverage map showing every critical asset and ingress",
  "Retention policy proof (30/60/90-day) exported from Eagle Eye",
  "Access control roster with role-based rules",
  "Incident log + audit trail exported from Eagle Eye / Brivo",
  "Visitor + delivery procedures tied to specific cameras",
  "Contact tree for regulators and law enforcement",
];

const otherServices = [
  {
    title: "AV Integration & Systems",
    copy: "We often pair security zones with operator-ready conference rooms so leadership and compliance keep the same language.",
    href: "/services/av-integration",
  },
  {
    title: "Smart Room Design & Documentation",
    copy: "Telehealth and consultation rooms in dispensaries or clinics benefit from the same drawings and narrative clarity.",
    href: "/services/smart-rooms",
  },
  {
    title: "Remote Installation Project Management",
    copy: "If you already have trusted local integrators, we’ll quarterback them so every site mirrors the same security template.",
    href: "/services/project-management",
  },
];

export function generateMetadata(): Metadata {
  if (!CANNABIS_CONTENT_ENABLED) {
    // TEMP: Cannabis content hidden for insurance audit
    return { ...metadataHidden, robots: { index: false, follow: false } };
  }

  return metadataBase;
}

export default function CannabisSecurityPage() {
  if (!CANNABIS_CONTENT_ENABLED) {
    // TEMP: Cannabis content hidden for insurance audit
    redirect("/solutions");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_35px_110px_-60px_rgba(0,0,0,0.9)] lg:px-12 lg:py-20">
          <div className="absolute inset-0">
            <Image
              src="/cannabis-security-dispensary-interior.png"
              alt="Modern cannabis dispensary with visible security cameras"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/70 to-slate-950/90" aria-hidden />
          </div>
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Security</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Cannabis Security Systems that pass inspection the first time
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted lg:text-xl">
              Compliant cannabis security for licensed facilities in NM, CO, AZ—camera, access, monitoring, and documentation designed to meet state requirements and protect your license. We still cover broader commercial security, but cannabis is a core specialization.
            </p>
            <p className="mt-3 text-sm text-slate-200">
              Built on Eagle Eye Networks + Brivo for cloud audit trails inspectors understand. No mystery DVRs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#assessment-form"
                className="rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)]"
                data-cta="hero-primary-compliance-assessment"
              >
                Schedule Free Assessment
              </Link>
              <Link
                href="#checklist-form"
                className="rounded-full border border-brand-teal/70 px-6 py-3 text-base font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
                data-cta="hero-secondary-checklist"
              >
                Get the Cannabis Security Checklist
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-20 space-y-6 lg:mt-28">
          <h2 className="text-2xl font-semibold">Who this is for</h2>
          <div className="flex flex-wrap gap-2">
            {bestFor.map((item) => (
              <span key={item} className="rounded-full border border-brand-teal/50 px-4 py-2 text-sm font-semibold text-brand-teal">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40 lg:mt-20">
          <h3 className="text-2xl font-semibold">Compliance focus</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-200">
            {complianceFocus.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 grid gap-6 lg:mt-28 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
            <h3 className="text-2xl font-semibold">What we deliver</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              Compliance is all about documentation, provable coverage, and clear operating procedures. We map every zone, build the
              camera/door plan inside Eagle Eye + Brivo, and leave you with a package that makes inspectors nod instead of frown.
            </p>
          </div>
          <GlassPanel title="Deliverables" className="shadow-[0_20px_60px_-50px_rgba(242,232,220,0.35)]">
            <ul className="space-y-2 text-sm">
              {deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-400" aria-hidden />
                  <span className="leading-relaxed text-slate-200">{deliverable}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </section>

        <section className="mt-16 rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40 lg:mt-24">
          <h3 className="text-2xl font-semibold">Built on Eagle Eye Networks & Brivo</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            We exclusively design cannabis deployments on Eagle Eye Networks (video) and Brivo (access). That keeps your operations cloud-first,
            makes remote management simple, and gives regulators the audit logs they now expect. No more on-site DVR closets that overheat or go unchecked for months.
          </p>
        </section>

        <section className="mt-16 grid gap-4 rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-sm text-slate-100 shadow-md shadow-black/40 lg:mt-24 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Trusted in regulated environments</h3>
            <p className="mt-2 leading-relaxed text-slate-200">
              We design and manage security for regulated operators and vendors—cannabis is a core focus, and we still support broader commercial security requirements.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {trustBand.map((item) => (
              <span key={item} className="rounded-full border border-brand-teal/50 px-3 py-1.5 text-xs font-semibold text-brand-teal">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-[1.05fr,0.95fr]">
          <GlassPanel title="What you get">
            <ul className="space-y-2 text-sm">
              {whatYouGet.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-400" aria-hidden />
                  <span className="leading-relaxed text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
            <h3 className="text-2xl font-semibold">What’s at stake</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              Failed inspections can pause operations, incur fines, and force rushed upgrades. We design to pass the first time.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {whatsAtStake.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="#assessment-form"
              className="mt-5 inline-flex w-full justify-center rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
              data-cta="stake-midpage"
            >
              Talk to a Cannabis Security Designer
            </Link>
          </div>
        </section>

        <section id="assessment-form" className="mt-16 space-y-4 lg:mt-24">
          <h3 className="text-2xl font-semibold text-foreground">Request a Free Compliance Assessment</h3>
          <p className="text-sm text-slate-200">Higher intent? Share the essentials and we’ll map a compliant plan and schedule time.</p>
          <CannabisAssessmentForm />
        </section>

        <section id="checklist-form" className="mt-16 space-y-4 lg:mt-24">
          <h3 className="text-2xl font-semibold text-foreground">Get the Cannabis Security Checklist</h3>
          <p className="text-sm text-slate-200">Lower friction—tell us where you operate and we’ll send the checklist immediately.</p>
          <CannabisChecklistForm />
        </section>

        <section className="mt-16 rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40 lg:mt-24">
          <h3 className="text-2xl font-semibold">How it works</h3>
          <ol className="mt-3 space-y-3 text-sm text-slate-200">
            {howItWorks.map((step, idx) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-0.5 h-6 w-6 rounded-full bg-brand-teal text-center text-xs font-bold text-brand-slate">{idx + 1}</span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 space-y-4 lg:mt-24">
          <h3 className="text-2xl font-semibold">Optional upgrades & variants</h3>
          <ul className="space-y-2 text-sm text-muted">
            {optionalUpgrades.map((upgrade) => (
              <li key={upgrade} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                <span>{upgrade}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 space-y-6 lg:mt-24">
          <h3 className="text-2xl font-semibold text-foreground">Before your next inspection</h3>
          <GlassPanel>
            <ul className="space-y-3 text-sm">
              {inspectionChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-400" aria-hidden />
                  <span className="leading-relaxed text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-200">
              Want the full Cannabis Security Inspection Checklist? Request it via the form and select the checklist option—we’ll send the coverage, access, and documentation basics you need.
            </p>
          </GlassPanel>
        </section>

        <section className="mt-16 space-y-8 lg:mt-24">
          <h3 className="text-2xl font-semibold">How it fits with the other services</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {otherServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-sm text-slate-100 shadow-md shadow-black/40 transition hover:-translate-y-0.5 hover:border-brand-teal/50"
              >
                <p className="text-base font-semibold text-foreground">{service.title}</p>
                <p className="mt-2 leading-relaxed">{service.copy}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40 lg:mt-24">
          <h3 className="text-2xl font-semibold">Testimonials</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">Client feedback coming soon.</p>
        </section>

        <section className="mt-16 space-y-6 lg:mt-24">
          <h3 className="text-2xl font-semibold">FAQs</h3>
          <div className="space-y-4 text-sm text-slate-200">
            <div>
              <p className="font-semibold text-foreground">Do you focus on cannabis only?</p>
              <p className="mt-1 leading-relaxed">Cannabis is a core specialization. We also support broader commercial/enterprise security needs with the same documentation rigor.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Can you fix a failed inspection?</p>
              <p className="mt-1 leading-relaxed">Yes. We audit what failed, remediate gaps, and deliver documentation inspectors expect.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Do you handle install?</p>
              <p className="mt-1 leading-relaxed">We design and can manage installation partners, ensuring the build matches the approved plan.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Which states do you cover?</p>
              <p className="mt-1 leading-relaxed">Cannabis focus in NM, CO, AZ. We also support broader security elsewhere as needed.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Can you work with existing systems?</p>
              <p className="mt-1 leading-relaxed">Yes. We integrate or replace where needed and map everything to state requirements.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">How fast can you move?</p>
              <p className="mt-1 leading-relaxed">We prioritize urgent inspections and can stage a rapid plan with phased rollout.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Will you coordinate with legal/compliance teams?</p>
              <p className="mt-1 leading-relaxed">Yes. We work directly with compliance and legal stakeholders to align on requirements and documentation.</p>
            </div>
          </div>
        </section>

        <CTASection
          title="Ready for a cannabis security plan that passes inspection?"
          subtitle="Send your floor plans, license details, and timeline—we’ll map cameras, access, and monitoring to state requirements and get you ready for inspection."
          primaryLabel="Schedule Free Assessment"
          primaryHref="#assessment-form"
          secondaryLabel="Get the Cannabis Security Checklist"
          secondaryHref="#checklist-form"
        />
      </main>
    </div>
  );
}
