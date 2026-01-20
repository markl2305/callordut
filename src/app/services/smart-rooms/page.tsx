import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { CTASection } from "../../components/CTASection";
import { GlassPanel } from "../../components/GlassPanel";

export const metadata: Metadata = {
  title: "Smart Room Design & Documentation | CalLord UT",
  description:
    "Virtual visit suites, hybrid offices, and immersive rooms documented with drawings, elevations, and touchpanel flows so every operator knows what to expect.",
};

const bestFor = [
  "Senior living & healthcare",
  "Small & mid-sized businesses",
  "Remote-first teams",
  "Executive assistants / operations leaders",
];

const deliverables = [
  "Discovery workshops and journey mapping",
  "Platform-agnostic design (Teams, Zoom, Meet, telehealth)",
  "Camera, microphone, and lighting placement for real conversations",
  "Room storyboard + signage so operators know exactly what happens",
  "Drawings, elevations, and spec sheets for installers",
  "Training materials, videos, and laminated quick guides",
];

const optionalUpgrades = [
  "Room booking panels tied to Teams/Google/365",
  "Occupancy sensors + analytics dashboards",
  "Environmental controls (lighting, shades, HVAC scenes)",
  "Assistive listening + translation feeds",
  "Brand-forward signage + wayfinding",
];

const otherServices = [
  {
    title: "AV Integration & Systems",
    copy: "When the room needs custom control or large-format displays, the AV team ensures it matches the rest of your fleet.",
    href: "/services/av-integration",
  },
  {
    title: "Cannabis Security & Compliance",
    copy: "Virtual visit and telehealth suites often need integrated security + privacy policies from the start.",
    href: "/services/cannabis-security",
  },
  {
    title: "Remote Installation Project Management",
    copy: "Use your preferred local installers while we quarterback punch lists, QA, and documentation for each smart room rollout.",
    href: "/services/project-management",
  },
];

export default function SmartRoomsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_35px_110px_-60px_rgba(0,0,0,0.9)] lg:px-12 lg:py-20">
          <div className="absolute inset-0">
            <Image
              src="/smart-room-virtual-visit-interior.png"
              alt="Small hybrid meeting room with display and camera"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/70 to-slate-950/90" aria-hidden />
          </div>
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Core service</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Smart Room Design & Documentation
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted lg:text-xl">
              Virtual visit suites, hybrid pods, and executive spaces become effortless when the choreography, signage, and documentation are in place.
              We design the room experience and leave a repeatable recipe so every site feels familiar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)]"
              >
                Schedule Free Assessment
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

        <section className="mt-20 grid gap-6 lg:mt-28 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
            <h3 className="text-2xl font-semibold">What we deliver</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              Smart rooms are defined by clarity: signage, touchpoints, and documentation that make staff feel confident. We prototype the
              experience, translate it into drawings and storyboards, and hand installers a package they can replicate anywhere.
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

        <section className="mt-20 space-y-4 lg:mt-28">
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

        <section className="mt-20 space-y-8 lg:mt-28">
          <h3 className="text-2xl font-semibold">How it fits with the other services</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {otherServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-sm text-slate-100 shadow-md shadow-black/40 transition hover:-translate-y-0.5 hover:border-brand-teal/50"
              >
                <p className="text-base font-semibold text-foreground">{service.title}</p>
                <p className="mt-2 leading-relaxed text-slate-200">{service.copy}</p>
              </Link>
            ))}
          </div>
        </section>

        <CTASection
          title="Ready to plan your next smart room rollout?"
          subtitle="Send us the rooms, use cases, and timeline—we’ll deliver the documentation and choreography that makes them effortless."
          primaryLabel="Schedule Free Assessment"
          primaryHref="/contact"
        />
      </main>
    </div>
  );
}
