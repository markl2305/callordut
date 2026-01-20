import Link from "next/link";
import Image from "next/image";
import { CTASection } from "../components/CTASection";
import { RoomTypesShowcase } from "../components/RoomTypesShowcase";
import { SectionHeader } from "../components/SectionHeader";
import { ServiceCard } from "../components/ServiceCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | AV Integration, Smart Rooms & Cannabis Security",
  description:
    "Explore CalLord’s four core services: AV integration & systems, cannabis security & compliance, smart room design & documentation, and remote installation project management.",
};

const challenges = [
  {
    title: "Integration chaos",
    body: "Multiple vendors, unclear scopes, and undocumented gear make every upgrade feel risky.",
    solution: "We document the stack, specify partner platforms, and hand installers a kit of parts tied to each room type.",
  },
  {
    title: "Rooms that drift out of spec",
    body: "Executive and hospitality spaces lose polish after a few ad-hoc tweaks.",
    solution: "We storyboard the experience, capture as-built packages, and keep remote PM in the loop so every site mirrors HQ.",
  },
  {
    title: "Compliance + security pressure",
    body: "Cannabis and member-based venues need provable access and video history.",
    solution: "Security zones run on Eagle Eye Networks + Brivo with retention, credential, and audit trails baked in.",
  },
  {
    title: "Budget + staffing constraints",
    body: "Small teams can’t babysit AV crews or manage punch lists.",
    solution: "We stage rollouts, coordinate local installers, and stay available for support without bloating headcount.",
  },
];

const crossIndustryServices = [
  "Discovery & design workshops for rooms, venues, and member clubs.",
  "Room templates, elevations, and documentation you can hand to any installer.",
  "Security layouts, compliance audits, and inspection-ready packages.",
  "Remote installation project management with punch lists + commissioning videos.",
  "Support and maintenance retainer options as your footprint grows.",
];

const services = [
  {
    title: "AV Integration & Systems",
    description: "Rooms, displays, audio paths, and microphones that boot fast and work every time.",
    bullets: [
      "Discovery, requirements, and room templates",
      "Display, audio, microphone, and camera layout",
      "Control strategies from simplified presets to custom flows",
      "Commissioning and as-built documentation",
    ],
    href: "/services/av-integration",
    icon: <Image src="/services-av-integration-icon.png" alt="AV integration icon" width={48} height={48} className="h-12 w-12" />,
  },
  {
    title: "Cannabis Security & Compliance",
    description: "Camera, access control, and retention plans built with Eagle Eye Networks and Brivo.",
    bullets: [
      "Coverage maps and critical asset focus",
      "Access control design with restricted zones",
      "Retention/storage planning matched to regulations",
      "Audits and documentation packages for inspectors",
    ],
    href: "/services/cannabis-security",
    icon: <Image src="/services-cannabis-security-icon.png" alt="Cannabis security icon" width={48} height={48} className="h-12 w-12" />,
  },
  {
    title: "Smart Room Design & Documentation",
    description: "Virtual visit suites, hybrid rooms, and executive offices that guide the operator.",
    bullets: [
      "Room discovery and storyboarding",
      "Camera/mic placement and acoustics",
      "Platform-agnostic design (Teams, Zoom, Meet)",
      "Drawings, elevations, and training materials",
    ],
    href: "/services/smart-rooms",
    icon: <Image src="/services-smart-rooms-icon.png" alt="Smart room design icon" width={48} height={48} className="h-12 w-12" />,
  },
  {
    title: "Remote Project Management",
    description: "We coordinate your preferred installers so you keep control without babysitting the process.",
    bullets: [
      "Bid + scope review against design intent",
      "Installer coordination and punch lists",
      "Commissioning checklists and QA",
      "As-built packages and warranty handoff",
    ],
    href: "/services/project-management",
    icon: <Image src="/services-remote-project-management-icon.png" alt="Remote project management icon" width={48} height={48} className="h-12 w-12" />,
  },
  {
    title: "Custom Solutions & Hospitality",
    description: "Tailored AV + security for venues, member clubs, boutique hotels, and one-of-a-kind spaces.",
    bullets: [
      "Custom discovery with architects and creative teams",
      "Infrastructure planning so tech disappears into the design",
      "Room recipes for speakeasies, lounges, and mixed-use venues",
      "Full documentation plus remote coordination and support",
    ],
    href: "/services/custom-solutions",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M4 6h16M7 12h10M9 18h6" strokeLinecap="round" />
        <path d="M6 4v16M18 4v16" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-6 lg:px-6">
        <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.8)] lg:px-12 lg:py-20">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Our services</p>
            <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              One partner for AV, smart rooms, and security.
            </h1>
            <p className="text-lg leading-relaxed text-muted lg:text-xl">
              No more juggling AV vendors, IT contractors, and security integrators. CalLord designs the stack, documents every detail, and coordinates the install so your team can get back to actual work.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
              >
                Schedule Free Assessment
              </Link>
              <Link
                href="#room-types"
                className="rounded-full border border-brand-teal/70 px-6 py-3 text-base font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
              >
                Explore room types
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-20 space-y-6 lg:mt-28">
          <SectionHeader
            title="Tailored AV, smart rooms, and security for every environment"
            subtitle="From small businesses and senior communities to cannabis facilities, hospitality venues, and member clubs, we design cohesive systems that feel finished—without resurrecting industry silos."
          />
          <p className="text-sm leading-relaxed text-muted">
            Whether it’s a boardroom, a private speakeasy, or a statewide rollout of telehealth suites, the toolkit stays the same: documented design,
            repeatable room patterns, and support that extends well past day-one turnover.
          </p>
        </section>

        <section className="mt-20 space-y-8 lg:mt-28">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
              <h3 className="text-2xl font-semibold text-foreground">Common challenges</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                {challenges.map((item) => (
                  <li key={item.title}>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="leading-relaxed">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-600/60 bg-slate-900/80 p-6 text-slate-100 shadow-md shadow-black/50">
              <h3 className="text-2xl font-semibold text-slate-50">How we solve it</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                {challenges.map((item) => (
                  <li key={item.solution}>
                    <p className="font-semibold text-slate-50">{item.title}</p>
                    <p className="leading-relaxed">{item.solution}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-20 space-y-6 lg:mt-28">
          <SectionHeader
            title="Cross-industry services"
            subtitle="A consistent set of services supports every deployment, whether it’s a hospitality suite, cannabis grow, or member clubhouse."
          />
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
            <ul className="space-y-3 text-sm text-slate-200">
              {crossIndustryServices.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20 lg:mt-24">
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-brand-teal uppercase tracking-[0.2em]">Custom & hospitality builds</p>
                <p className="mt-2 text-lg font-semibold text-foreground">Need something outside the template?</p>
                <p className="text-sm leading-relaxed text-slate-200">
                  From bespoke hospitality venues to mixed-use cannabis spaces, we map custom AV + security plans that stay serviceable.
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                    <span>Protect the guest experience with discreet installs, lighting cues, and operator-friendly controls.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                    <span>Coordinate with architects and fabricators so tech disappears into the design intent.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                    <span>Document service paths and support plans that keep boutique venues calm after opening night.</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/services/custom-solutions"
                className="inline-flex items-center rounded-full border border-brand-teal/70 px-6 py-3 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
              >
                Explore custom solutions
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-20 space-y-8 lg:mt-28">
          <SectionHeader
            title="Four core offerings"
            subtitle="Each service stands alone, but they’re strongest when combined into a single roadmap."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} tone="sand" />
            ))}
          </div>
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-5 text-sm text-slate-200 shadow-md shadow-black/40">
            Have a hospitality venue or unusual space?{" "}
            <Link href="/services/custom-solutions" className="font-semibold text-brand-teal">
              Explore our custom solutions →
            </Link>
          </div>
        </section>

        <section
          id="room-types"
          className="mt-20 space-y-8 border-t border-brand-teal/20 pt-12 lg:mt-28 lg:pt-16"
        >
          <RoomTypesShowcase
            heading="Systems and rooms we build again and again"
            subheading="Years of repeatable deployments mean your next space benefits from every lesson learned."
          />
        </section>

        <CTASection
          title="Tell us what you’re building next"
          subtitle="Share a quick brief about your rooms, cannabis facility, or upcoming rollout—we’ll reply with a plan and options."
          primaryLabel="Schedule Free Assessment"
          primaryHref="/contact"
        />
      </main>
    </div>
  );
}
