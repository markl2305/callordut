import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { CTASection } from "../../components/CTASection";
import { GlassPanel } from "../../components/GlassPanel";

export const metadata: Metadata = {
  title: "Cannabis Security & Compliance | Eagle Eye & Brivo Design",
  description:
    "Cameras, access control, and retention plans for cannabis dispensaries and grow facilities. Built on Eagle Eye Networks and Brivo to meet New Mexico and nationwide compliance requirements.",
};

const bestFor = [
  "Licensed dispensaries",
  "Grow + processing facilities",
  "Multi-site / MSO security teams",
  "Owners preparing for inspections",
];

const deliverables = [
  "Camera coverage maps with risers and critical asset focus",
  "Access control strategies and credential policies built on Brivo",
  "Video retention + storage planning calibrated to state rules",
  "Incident + audit logging configuration within Eagle Eye Networks",
  "Compliance-ready drawing set, device schedules, and documentation",
  "Audits of existing deployments with remediation roadmap",
];

const optionalUpgrades = [
  "Centralized monitoring dashboards",
  "Environmental sensors tied to alerting",
  "Visitor management workflows with camera tie-ins",
  "Integration with POS / inventory tracking",
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

export default function CannabisSecurityPage() {
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Core service</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">Cannabis Security & Compliance</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted lg:text-xl">
              Cameras, access control, retention, and documentation built explicitly for cannabis operators. Our systems are designed around
              <strong> Eagle Eye Networks</strong> and <strong> Brivo</strong> so you have modern cloud audit trails—not mystery DVRs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)]"
            >
              Plan my next build
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-brand-teal/70 px-6 py-3 text-base font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              Back to all services
            </Link>
          </div>
          </div>
        </section>

        <section className="mt-16 space-y-6 lg:mt-24">
          <h2 className="text-2xl font-semibold">Who this is for</h2>
          <div className="flex flex-wrap gap-2">
            {bestFor.map((item) => (
              <span key={item} className="rounded-full border border-brand-teal/50 px-4 py-2 text-sm font-semibold text-brand-teal">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-[1.1fr,0.9fr]">
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

        <CTASection
          title="Ready to plan your cannabis security rollout?"
          subtitle="Send us your floor plans, compliance timeline, and current pain points—we’ll map the next version on Eagle Eye + Brivo."
          primaryLabel="Talk to a designer"
          primaryHref="/contact"
        />
      </main>
    </div>
  );
}
