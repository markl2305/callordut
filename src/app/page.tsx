import Link from "next/link";
import Image from "next/image";
import { RoomTypesShowcase } from "./components/RoomTypesShowcase";

const industries = [
  {
    title: "Senior living communities",
    copy: "Private virtual visit rooms, common-area AV, and camera coverage that keeps residents connected without tech friction.",
  },
  {
    title: "Small & mid-sized offices",
    copy: "Boardrooms, huddle rooms, displays, audio, and camera systems where presentations just start.",
  },
  {
    title: "Hospitality venues & member clubs",
    copy: "Discreet AV, lighting cues, and security paths that protect the vibe for lounges, boutique hotels, and private clubs.",
  },
  {
    title: "Remote-first hubs",
    copy: "Local pods, hybrid collab AV, signage, and security where distributed teams feel natural.",
  },
];

const processSteps = [
  {
    title: "Discover",
    copy: "We map your rooms, users, and existing gear so we know what we’re building on.",
  },
  {
    title: "Design",
    copy: "We design audio, video, and control in plain language and schematics.",
  },
  {
    title: "Deliver",
    copy: "We manage install and configuration with local partners so the room is ready to use.",
  },
  {
    title: "Support",
    copy: "We stay available for tweaks, expansions, and new rooms as you grow.",
  },
];

const values = [
  {
    title: "Operator-first design",
    copy: "We speak in floor plans and outcomes for AV, rooms, and security zones — not boxes and part numbers.",
  },
  {
    title: "Security-ready by design",
    copy: "We design AV and rooms with camera coverage, access, and compliance-heavy industries like cannabis in mind.",
  },
  {
    title: "Future-ready rooms",
    copy: "Rooms and systems are designed to be upgraded in pieces — not ripped out every time platforms change.",
  },
];

const securityPartners = [
  {
    name: "Eagle Eye Networks",
    copy: "Cloud video surveillance + retention that keeps cannabis and regulated facilities compliant.",
  },
  {
    name: "Brivo",
    copy: "Cloud access control and credentialing so doors, storage, and delivery paths stay documented.",
  },
];

const supportingPartners = [
  {
    name: "Q-SYS / Teams Rooms",
    copy: "Flexible AV ecosystems for boardrooms, hybrid huddle rooms, and specialty spaces.",
  },
  {
    name: "Shure / Biamp",
    copy: "Audio, microphones, and DSP for operator-friendly experiences.",
  },
];

const heroFeatures = [
  {
    title: "AV Integration & Systems",
    copy: "Conference rooms, displays, audio, microphones, and touchpoints that feel consistent and reliable every single call.",
    href: "/services/av-integration",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-10 w-10 text-brand-teal"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <rect x="3" y="4" width="18" height="12" rx="2.5" className="opacity-80" />
        <path d="M7 20h10" strokeLinecap="round" />
        <path d="M12 8v4" strokeLinecap="round" />
        <path d="M9 12h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Cannabis Security & Compliance",
    copy: "Cameras, access control, retention policies, and compliance audits designed for cannabis regulations and inspections.",
    href: "/services/cannabis-security",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-10 w-10 text-brand-teal"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          d="M4 9h10l6 3-6 3H4a1.5 1.5 0 0 1-1.5-1.5V10.5A1.5 1.5 0 0 1 4 9Z"
          className="opacity-80"
        />
        <path d="M14 12v3.5c0 3.5-2.5 5-5 5" strokeLinecap="round" />
        <path d="M18 11v3.5c0 2.5-1.2 4.5-3.5 5.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Smart Room Design & Documentation",
    copy: "Smart rooms, virtual visit suites, and hybrid spaces backed by drawings, elevations, and as-built documentation.",
    href: "/services/smart-rooms",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-10 w-10 text-brand-teal"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <rect x="4" y="4" width="16" height="16" rx="2.5" className="opacity-80" />
        <path d="M4 10h16" strokeLinecap="round" />
        <path d="M10 4v16" strokeLinecap="round" />
        <circle cx="15" cy="15" r="2.25" />
      </svg>
    ),
  },
  {
    title: "Remote Installation Project Management",
    copy: "Coordinating third-party installers, punch lists, and commissioning so operators don’t have to chase the details.",
    href: "/services/project-management",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-10 w-10 text-brand-teal"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="8" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M7.7 7.2 16.4 8.7M10.4 16.1l5.1-6.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const serviceLines = [
  {
    title: "AV Integration & Systems",
    href: "/services/av-integration",
    iconSrc: "/services-av-integration-icon.png",
    iconAlt: "AV integration icon",
    bullets: [
      "Room audio tuning and DSP alignment",
      "Microphones, speakers, and acoustic treatments",
      "Display integration for dual and ultra-wide canvases",
      "Operator-friendly control surfaces and presets",
      "Project documentation and signal path diagrams",
    ],
  },
  {
    title: "Cannabis Security & Compliance",
    href: "/services/cannabis-security",
    iconSrc: "/services-cannabis-security-icon.png",
    iconAlt: "Cannabis security icon",
    bullets: [
      "Camera layout and coverage design",
      "Access control, badging, and paths",
      "Retention and secure storage planning",
      "Compliance-focused audit walk-throughs",
      "Inspector-ready reports and drawings",
    ],
  },
  {
    title: "Smart Room Design & Documentation",
    href: "/services/smart-rooms",
    iconSrc: "/services-smart-rooms-icon.png",
    iconAlt: "Smart room design icon",
    bullets: [
      "Discovery, programming, and user journeys",
      "Design drawings, elevations, and spec sheets",
      "Equipment lists plus procurement support",
      "Reusable room templates and naming",
      "Training decks and handoff materials",
    ],
  },
  {
    title: "Remote Installation Project Management",
    href: "/services/project-management",
    iconSrc: "/services-remote-project-management-icon.png",
    iconAlt: "Remote project management icon",
    bullets: [
      "Vet and coordinate trusted local installers",
      "Remote commissioning and QA punch lists",
      "Operator acceptance and sign-off",
      "Issue tracking until the room just works",
      "Warranty, support, and future expansion plans",
    ],
  },
];

const roomTypes = [
  { name: "Executive Boardroom" },
  { name: "Team Meeting Room" },
  { name: "Training / All-Hands Space" },
  { name: "Virtual Visit / Telehealth Room" },
  { name: "Small Hybrid / Focus Pod" },
];

function HeroFeatureGrid({ className = "" }: { className?: string }) {
  const gridClasses = ["grid gap-4 sm:grid-cols-2", className].filter(Boolean).join(" ");

  return (
    <div className={gridClasses}>
      {heroFeatures.map((feature) => (
        <Link
          key={feature.title}
          href={feature.href}
          className="group rounded-2xl border border-slate-600/60 bg-slate-900/70 p-4 text-slate-100 shadow-md shadow-black/40 transition hover:-translate-y-1 hover:border-brand-teal/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-brand-teal/30 bg-brand-teal/10 p-2 text-brand-teal">{feature.icon}</div>
            <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">{feature.copy}</p>
          <span className="mt-3 inline-flex items-center text-xs font-semibold text-brand-teal transition group-hover:text-brand-teal/80">
            Learn more →
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  const heroStats = [
    { label: "Rooms delivered", value: "250+" },
    { label: "Avg. response", value: "<1hr" },
    { label: "Uptime target", value: "99.5%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-4 lg:px-6">
        <section
          id="hero"
          className="relative isolate overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.8)] lg:px-12 lg:py-20"
        >
          <div className="absolute inset-0">
            <Image
              src="/hero-conference-room.png"
              alt="Modern conference room designed for hybrid meetings"
              fill
              priority
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/90"
              aria-hidden
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(22,199,182,0.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(249,115,22,0.14),transparent_30%),radial-gradient(circle_at_60%_70%,rgba(22,199,182,0.2),transparent_35%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr,0.95fr] lg:items-start">
            <div className="space-y-8 pt-4">
              <div className="space-y-4">
                <h1 className="text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                  AV, smart rooms, and security that make your spaces feel effortless.
                </h1>
                <p className="text-lg leading-relaxed text-muted lg:text-xl">
                  CalLord integrates AV, smart rooms, and security as one design-led system — documented patterns, trusted platforms, and long-term support — so operators in offices, senior communities, cannabis, and hospitality know every space will just work.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="#lead-form"
                  className="rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
                >
                  Plan my next build
                </Link>
                <Link
                  href="#room-types"
                  className="rounded-full border border-brand-teal/70 px-6 py-3 text-base font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
                >
                  See example builds
                </Link>
              </div>
              <div className="lg:hidden">
                <HeroFeatureGrid />
              </div>
              <dl className="relative grid max-w-lg grid-cols-2 gap-4 overflow-hidden rounded-2xl border border-slate-600/60 bg-slate-900/70 p-4 text-sm text-slate-200 shadow-md shadow-black/40 sm:grid-cols-3">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-sand/12 via-transparent to-transparent" aria-hidden />
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-slate-600/50 bg-slate-900/60 p-3 text-slate-100 shadow-inner shadow-black/30">
                    <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">
                      {stat.label}
                    </dt>
                    <dd className="text-2xl font-semibold text-brand-teal">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="hidden lg:block">
              <div className="relative overflow-hidden rounded-3xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(39,154,146,0.35),transparent_45%),radial-gradient(circle_at_100%_0%,rgba(249,115,22,0.15),transparent_45%)]" />
                <HeroFeatureGrid className="relative z-10" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-8 border-t border-brand-teal/20 pt-12 lg:mt-24 lg:pt-16">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">
              What we build and support
            </p>
            <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">
              Four equal service lines, one operator-first partner.
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-muted">
              AV systems, cannabis security, smart room documentation, and remote installation project management all move together so nothing gets dropped.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {serviceLines.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="flex flex-col rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40 transition hover:-translate-y-1 hover:border-brand-teal/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={service.iconSrc}
                    alt={service.iconAlt}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-xl object-contain"
                  />
                  <div>
                    <span className="block h-1 w-12 rounded-full bg-brand-teal" aria-hidden />
                    <h3 className="mt-3 text-lg font-semibold text-foreground">{service.title}</h3>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-4 inline-flex items-center text-xs font-semibold text-brand-teal">
                  View service →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="industries"
          className="mt-16 space-y-8 border-t border-brand-teal/20 pt-12 lg:mt-24 lg:pt-16"
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">
              Built for teams who can’t afford bad calls.
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-muted">
              We focus on environments where every meeting, resident check-in, or virtual visit actually matters — rooms, displays, camera systems, and security spaces that have to work the first time.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {industries.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40 transition hover:-translate-y-1 hover:border-brand-teal/50 hover:shadow-[0_20px_60px_-45px_rgba(22,199,182,0.9)]"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal/10 text-sm font-semibold text-brand-teal ring-1 ring-brand-teal/30">
                  ●
                </div>
                <div className="mb-4 h-0.5 w-16 rounded-full bg-brand-teal/50 transition group-hover:w-20" aria-hidden />
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="process" className="mt-16 space-y-8 lg:mt-24">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">
              From idea to “it just works.”
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              A clear path so your team knows exactly what happens next.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="relative overflow-hidden rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40 transition hover:-translate-y-1 hover:border-brand-teal/50 hover:shadow-[0_20px_60px_-45px_rgba(22,199,182,0.9)]"
              >
                <div className="absolute right-4 top-4 text-sm font-semibold text-brand-teal/60">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mb-4 h-0.5 w-14 rounded-full bg-brand-teal/40" aria-hidden />
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-200">{step.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="room-types"
          className="mt-16 space-y-8 border-t border-brand-teal/20 pt-12 lg:mt-24 lg:pt-16"
        >
          <RoomTypesShowcase
            heading="Systems and rooms we build again and again."
            subheading="Template-driven AV, smart rooms, and security flows mean every new space gets the lessons from the last."
          />
        </section>

        <section id="why" className="mt-16 space-y-8 lg:mt-24">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">
              Why teams choose CalLord over “just buying gear.”
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              Design, delivery, and support all speak the language of operators.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40 transition hover:-translate-y-1 hover:border-brand-teal/50 hover:shadow-[0_20px_60px_-45px_rgba(22,199,182,0.9)]"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal/15 text-sm font-semibold text-brand-teal ring-1 ring-brand-teal/30">
                  ◎
                </div>
                <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{value.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-8 rounded-3xl bg-brand-sand px-6 py-10 text-slate-900 lg:mt-24 lg:px-12">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold lg:text-4xl">Powered by platforms you already trust.</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Security and compliance are grounded in Eagle Eye Networks (cloud video) and Brivo (cloud access). AV stacks layer in modern DSP, control, and room platforms that stay supportable long-term.
              </p>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {securityPartners.map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col justify-between rounded-2xl border border-brand-teal/30 bg-white/90 p-5 text-slate-900 shadow-[0_25px_80px_-60px_rgba(12,60,55,0.35)] ring-1 ring-brand-teal/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-lg font-semibold">{partner.name}</p>
                  <span className="rounded-full bg-brand-teal/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal ring-1 ring-brand-teal/30">
                    Security
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{partner.copy}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {supportingPartners.map((partner) => (
              <div
                key={partner.name}
                className="rounded-2xl border border-white/50 bg-white/90 p-4 text-sm font-semibold text-slate-800 ring-1 ring-brand-teal/10 transition hover:-translate-y-0.5 hover:border-brand-teal hover:text-brand-teal"
              >
                <p>{partner.name}</p>
                <p className="mt-2 text-xs font-normal text-slate-600">{partner.copy}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-700">
            Curious about cooperative purchasing options for public entities?{" "}
            <Link href="/partnerships/cooperative-purchasing" className="font-semibold text-brand-teal underline-offset-2 hover:underline">
              Learn about our statewide program
            </Link>
            .
          </p>
        </section>

        <section
          id="lead-form"
          className="mt-16 space-y-8 rounded-3xl border border-brand-teal/30 bg-gradient-to-br from-brand-teal/15 via-brand-teal/10 to-brand-slate/40 px-6 py-12 lg:mt-24 lg:px-12"
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">
              Tell us about one space. We’ll show you what it could be.
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-muted">
              Give us a room or area, a rough budget, and how you use it today — AV, smart rooms, or security. We’ll come back with a simple plan and options.
            </p>
          </div>
          <form className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-foreground">
                Name*
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-semibold text-foreground">
                Company / Community*
              </label>
              <input
                id="company"
                name="company"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                placeholder="e.g., Willow Grove Senior Living"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                placeholder="you@company.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-semibold text-foreground">
                Phone (optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="room-type" className="text-sm font-semibold text-foreground">
                What kind of room?
              </label>
              <select
                id="room-type"
                name="room-type"
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
              >
                <option value="">Choose a room type</option>
                {roomTypes.map((room) => (
                  <option key={room.name} value={room.name}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 lg:col-span-2">
              <label htmlFor="issues" className="text-sm font-semibold text-foreground">
                What isn’t working today?
              </label>
              <textarea
                id="issues"
                name="issues"
                rows={4}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                placeholder="Describe the room, usage, and current pain points."
              />
            </div>
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
              >
                Get my room plan
              </button>
            </div>
          </form>
        </section>
      </main>

    </div>
  );
}
