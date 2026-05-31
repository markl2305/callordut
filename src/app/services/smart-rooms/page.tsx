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
    title: "Remote Installation Project Management",
    copy: "Use your preferred local installers while we quarterback punch lists, QA, and documentation for each smart room rollout.",
    href: "/services/project-management",
  },
];

export default function SmartRoomsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="relative overflow-hidden border border-rule bg-cream px-6 py-14 lg:px-12 lg:py-20">
          <div className="absolute inset-0">
            <Image
              src="/smart-room-virtual-visit-interior.png"
              alt="Small hybrid meeting room with display and camera"
              fill
              priority
              className="object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-cream/80" aria-hidden />
          </div>
          <div className="relative">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal">Core service</p>
            <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl lg:text-6xl">
              Smart Room Design & Documentation
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft lg:text-xl">
              Virtual visit suites, hybrid pods, and executive spaces become effortless when the choreography, signage, and documentation are in place.
              We design the room experience and leave a repeatable recipe so every site feels familiar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="h-btn bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
              >
                Schedule Free Assessment
              </Link>
              <Link
                href="/services"
                className="h-btn border border-ink bg-transparent px-6 py-3.5 text-sm font-medium text-ink"
              >
                Back to all services
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-20 space-y-6 lg:mt-28">
          <h2 className="font-serif text-2xl font-normal text-ink">Who this is for</h2>
          <div className="flex flex-wrap gap-2">
            {bestFor.map((item) => (
              <span key={item} className="border border-rule px-4 py-2 text-sm font-medium text-teal">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:mt-28 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="border border-rule bg-cream p-6 text-ink">
            <h3 className="font-serif text-2xl font-normal text-ink">What we deliver</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Smart rooms are defined by clarity: signage, touchpoints, and documentation that make staff feel confident. We prototype the
              experience, translate it into drawings and storyboards, and hand installers a package they can replicate anywhere.
            </p>
          </div>
          <GlassPanel title="Deliverables">
            <ul className="space-y-2 text-sm">
              {deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 bg-teal" aria-hidden />
                  <span className="leading-relaxed text-ink-soft">{deliverable}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </section>

        <section className="mt-20 space-y-4 lg:mt-28">
          <h3 className="font-serif text-2xl font-normal text-ink">Optional upgrades & variants</h3>
          <ul className="space-y-2 text-sm text-ink-soft">
            {optionalUpgrades.map((upgrade) => (
              <li key={upgrade} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
                <span>{upgrade}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 space-y-8 lg:mt-28">
          <h3 className="font-serif text-2xl font-normal text-ink">How it fits with the other services</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {otherServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="h-link border border-rule bg-cream p-5 text-sm text-ink transition hover:border-teal"
              >
                <p className="text-base font-medium text-ink">{service.title}</p>
                <p className="mt-2 leading-relaxed text-ink-soft">{service.copy}</p>
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
