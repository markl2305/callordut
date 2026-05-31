import Link from "next/link";
import type { Metadata } from "next";
import { CTASection } from "../../components/CTASection";
import { GlassPanel } from "../../components/GlassPanel";

export const metadata: Metadata = {
  title: "AV Integration & Conference Room Systems | CalLord UT",
  description:
    "Design-led AV integration for conference rooms, hybrid boardrooms, and training spaces. Clear documentation, rock-solid joins, and systems your operators actually trust.",
};

const bestFor = [
  "Executive leaders & boardrooms",
  "Small & mid-sized businesses",
  "Multi-site teams with remote staff",
  "Operators who need repeatable rooms",
];

const deliverables = [
  "Room discovery sessions and requirements gathering",
  "Equipment lists with procurement-ready detail",
  "Display, audio, microphone, and camera layout drawings",
  "Control strategy mapped to presets and user roles",
  "Rack elevation, cabling, and network coordination",
  "Commissioning plans plus as-built documentation",
  "Operator training handoff with recordings and cheat sheets",
];

const optionalUpgrades = [
  "Dual or panoramic displays for hybrid collaboration",
  "Multi-camera speaker tracking and framing",
  "Lighting + shade presets tied to the control surface",
  "Environmental monitoring and occupancy insights",
  "Room booking signage tied to Teams/Google/365",
];

const otherServices = [
  {
    title: "Smart Room Design & Documentation",
    copy: "Document the rooms, telehealth suites, and pods so every site looks like HQ without flying out the whole team.",
    href: "/services/smart-rooms",
  },
  {
    title: "Remote Installation Project Management",
    copy: "Keep your preferred installers while we quarterback bids, punch lists, and sign-off for every room.",
    href: "/services/project-management",
  },
];

export default function AvIntegrationPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="border border-rule bg-cream px-6 py-14 lg:px-12 lg:py-20">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal">Core service</p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl lg:text-6xl">AV Integration & Systems</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft lg:text-xl">
            Conference rooms, collaboration spaces, and pods that feel like a finished product—not a science project. We standardize the
            display/audio/mic mix, dial in the control flow, and hand you documentation that survives leadership turnover.
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
              We treat every room like a mini product release. That means discovery with the people who actually have to host the call,
              design packages that installers can follow, and documentation that lets you replicate the space across locations.
            </p>
          </div>
          <GlassPanel title="Deliverables">
            <ul className="space-y-2 text-sm">
              {deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 bg-teal" aria-hidden />
                  <span className="leading-relaxed">{deliverable}</span>
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
          title="Ready to plan your AV integration?"
          subtitle="Tell us which rooms or campuses need help and we’ll build a phased roadmap based on your gear, timeline, and operators."
          primaryLabel="Schedule Free Assessment"
          primaryHref="/contact"
        />
      </main>
    </div>
  );
}
