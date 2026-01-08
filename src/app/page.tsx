import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { siteConfig } from "../config/site";
import { FooterCTAForm } from "./components/FooterCTAForm";

export const metadata: Metadata = {
  title: "CalLord Unified Technologies | Smart Rooms, AV & Security Design",
  description:
    "AV systems, smart rooms, and security designed for senior living, cannabis, offices, and hospitality. Documented. Supported. Done right. Serving New Mexico, Colorado, and Arizona.",
  openGraph: {
    title: "CalLord Unified Technologies | Smart Rooms, AV & Security Design",
    description:
      "AV systems, smart rooms, and security designed for senior living, cannabis, offices, and hospitality. Documented. Supported. Done right. Serving New Mexico, Colorado, and Arizona.",
    url: siteConfig.website,
    siteName: siteConfig.shortName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalLord Unified Technologies | Smart Rooms, AV & Security Design",
    description:
      "AV systems, smart rooms, and security designed for senior living, cannabis, offices, and hospitality. Documented. Supported. Done right.",
  },
};

const heroPillars = [
  {
    title: "Smart Room Design",
    subtitle: "Fixed-price packages. 3–7 day delivery.",
    body: "Professional D-Tools documentation, equipment specs, and installation guidance — without hiring a full-time AV engineer.",
    cta: { label: "See Design Packages", href: "/smart-room-design" },
  },
  {
    title: "Full-Service AV Integration",
    subtitle: "Design. Install. Support.",
    body: "End-to-end AV systems for conference rooms, displays, audio, and control — managed from discovery through long-term support.",
    cta: { label: "Tell Us About Your Space", href: "/contact" },
  },
];

const heroSecurityServices = [
  {
    title: "Property Security",
    subtitle: "Portfolio-ready, cloud-native protection.",
    body: "Unified security for properties that need visibility, accountability, and a clean upgrade path.",
    cta: { label: "Explore Property Security", href: "/solutions/property-security" },
  },
  {
    title: "Multifamily Security",
    subtitle: "Resident safety, simplified operations.",
    body: "Cloud video and access control for apartments, condos, and mixed-use communities.",
    cta: { label: "See Multifamily Security", href: "/solutions/multifamily-security" },
  },
  {
    title: "Cannabis Security",
    subtitle: "Pass your inspection - first time, on schedule.",
    body: "State-compliant camera, access control, and retention systems for Colorado, New Mexico, and Arizona operators.",
    cta: { label: "Book Free Assessment", href: "/cannabis-security" },
  },
];

const trustStats = [
  { label: "Rooms Delivered", value: "250+" },
  { label: "Avg. Response", value: "<1hr" },
  { label: "Uptime Target", value: "99.5%" },
];

const trustLogos = ["Eagle Eye Networks", "Brivo", "Q-SYS", "Shure", "Biamp"];

const serveCards = [
  {
    title: "Senior Living Communities",
    body: "Private virtual visit rooms, common-area AV, and camera coverage that keeps residents connected without tech friction.",
    href: "/industries/senior-living",
  },
  {
    title: "Cannabis Operations",
    body: "Cameras, access control, retention policies, and compliance audits designed for state regulations and inspections.",
    href: "/industries/cannabis",
  },
  {
    title: "Hospitality & Private Clubs",
    body: "Discreet AV, lighting cues, and security paths that protect the vibe for lounges, boutique hotels, and private clubs.",
    href: "/industries/hospitality",
  },
  {
    title: "Small & Mid-Sized Offices",
    body: "Boardrooms, huddle rooms, displays, audio, and camera systems where presentations just start.",
    href: "/industries/offices",
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

const roomTemplates = [
  { title: "Executive Boardroom", href: "/room-types/executive-boardroom", useCases: "10–18 people • Quarterly board calls • Investor updates" },
  { title: "Team Meeting Room", href: "/room-types/team-meeting-room", useCases: "6–10 people • Weekly syncs • Workshops" },
  { title: "Virtual Visit / Telehealth", href: "/room-types/virtual-visit-telehealth", useCases: "Private visits • Telehealth • Consultations" },
  { title: "Small Hybrid / Focus Pod", href: "/room-types/small-hybrid-focus-pod", useCases: "1–4 people • Hybrid calls • Focus work" },
];

const differentiators = [
  {
    title: "Operator-First Design",
    body: "We speak in floor plans and outcomes — not boxes and part numbers. Every system is designed for the people who use it daily.",
  },
  {
    title: "Security-Ready by Design",
    body: "AV and rooms are designed with camera coverage, access control, and compliance in mind — especially for regulated industries like cannabis.",
  },
  {
    title: "Future-Ready Rooms",
    body: "Systems are designed to be upgraded in pieces — not ripped out every time platforms change. Your investment lasts.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-4 lg:px-6">
        <section
          id="hero"
          className="relative isolate overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.8)] lg:px-12 lg:py-20"
        >
          <div className="absolute inset-0">
            <Image
              src="/hero-conference-room.webp.png"
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
                  Rooms That Just Work
                </h1>
                <p className="text-lg font-semibold leading-relaxed text-muted lg:text-xl">For Teams Who Can’t Afford Bad Calls</p>
                <p className="text-base leading-relaxed text-slate-200 lg:text-lg">
                  AV systems, smart rooms, and security designed for multifamily, senior living, cannabis, offices, and hospitality. Documented. Supported. Done right.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="#footer-cta"
                  className="rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
                >
                  Get Started
                </Link>
                <Link
                  href="#room-types"
                  className="rounded-full border border-brand-teal/70 px-6 py-3 text-base font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
                >
                  See Room Templates
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(39,154,146,0.35),transparent_45%),radial-gradient(circle_at_100%_0%,rgba(249,115,22,0.15),transparent_45%)]" />
              <div className="relative z-10 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Security</div>
                {heroSecurityServices.map((card) => (
                  <div
                    key={card.title}
                    className="flex h-full flex-col justify-between rounded-2xl border border-slate-600/60 bg-slate-900/80 p-4 text-slate-100 shadow-inner shadow-black/40"
                  >
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                      <p className="text-sm font-semibold text-brand-teal">{card.subtitle}</p>
                      <p className="text-sm leading-relaxed text-slate-200">{card.body}</p>
                    </div>
                    <Link
                      href={card.cta.href}
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-teal px-4 py-2 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
                    >
                      {card.cta.label}
                    </Link>
                  </div>
                ))}
                {heroPillars.map((card) => (
                  <div
                    key={card.title}
                    className="flex h-full flex-col justify-between rounded-2xl border border-slate-600/60 bg-slate-900/80 p-4 text-slate-100 shadow-inner shadow-black/40"
                  >
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                      <p className="text-sm font-semibold text-brand-teal">{card.subtitle}</p>
                      <p className="text-sm leading-relaxed text-slate-200">{card.body}</p>
                    </div>
                    <Link
                      href={card.cta.href}
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-teal px-4 py-2 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
                    >
                      {card.cta.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-md shadow-black/40 lg:mt-24 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr,0.9fr] lg:items-center">
            <dl className="grid grid-cols-2 gap-4 text-slate-100 sm:grid-cols-3">
              {trustStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-600/50 bg-slate-900/60 p-4 text-center shadow-inner shadow-black/30">
                  <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">{stat.label}</dt>
                  <dd className="text-2xl font-semibold text-brand-teal">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap items-center gap-3">
              {trustLogos.map((logo) => (
                <div
                  key={logo}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-100 transition hover:border-brand-teal/50 hover:text-brand-teal"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="industries"
          className="mt-16 space-y-8 border-t border-brand-teal/20 pt-12 lg:mt-24 lg:pt-16"
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">Built for Teams Who Can’t Afford Downtime</h2>
            <p className="max-w-3xl text-lg leading-relaxed text-muted">
              We focus on environments where every meeting, resident check-in, or virtual visit actually matters.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {serveCards.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40 transition hover:-translate-y-1 hover:border-brand-teal/50 hover:shadow-[0_20px_60px_-45px_rgba(22,199,182,0.9)]"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal/10 text-sm font-semibold text-brand-teal ring-1 ring-brand-teal/30">
                  ●
                </div>
                <div className="mb-4 h-0.5 w-16 rounded-full bg-brand-teal/50 transition group-hover:w-20" aria-hidden />
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.body}</p>
                <span className="mt-3 inline-flex items-center text-xs font-semibold text-brand-teal transition group-hover:text-brand-teal/80">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="process" className="mt-16 space-y-8 lg:mt-24">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">From Idea to “It Just Works”</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">A clear path so your team knows exactly what happens next.</p>
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
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">Start With a Proven Design</h2>
            <p className="max-w-3xl text-lg leading-relaxed text-muted">
              We’ve engineered room configurations that work — so you don’t start from scratch. Pick a template, customize for your space, and skip the trial-and-error.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {roomTemplates.map((room) => (
              <Link
                key={room.title}
                href={room.href}
                className="group rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40 transition hover:-translate-y-1 hover:border-brand-teal/50 hover:shadow-[0_20px_60px_-45px_rgba(22,199,182,0.9)]"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-teal" aria-hidden />
                  <h3 className="text-xl font-semibold text-foreground">{room.title}</h3>
                </div>
                <p className="text-sm text-slate-200">{room.useCases}</p>
                <span className="mt-3 inline-flex items-center text-xs font-semibold text-brand-teal transition group-hover:text-brand-teal/80">
                  View template →
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/room-types"
            className="inline-flex items-center text-sm font-semibold text-brand-teal underline-offset-2 hover:underline"
          >
            View All Room Types →
          </Link>
        </section>

        <section id="why" className="mt-16 space-y-8 lg:mt-24">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">Why Teams Choose CalLord</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">Design, delivery, and support all speak the language of operators.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {differentiators.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40 transition hover:-translate-y-1 hover:border-brand-teal/50 hover:shadow-[0_20px_60px_-45px_rgba(22,199,182,0.9)]"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal/15 text-sm font-semibold text-brand-teal ring-1 ring-brand-teal/30">
                  ◎
                </div>
                <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{value.body}</p>
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
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col justify-between rounded-2xl border border-brand-teal/30 bg-white/90 p-5 text-slate-900 shadow-[0_25px_80px_-60px_rgba(12,60,55,0.35)] ring-1 ring-brand-teal/10">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold">Eagle Eye Networks</p>
                <span className="rounded-full bg-brand-teal/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal ring-1 ring-brand-teal/30">
                  Security
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">Cloud video surveillance + retention for regulated facilities.</p>
            </div>
            <div className="flex flex-col justify-between rounded-2xl border border-brand-teal/30 bg-white/90 p-5 text-slate-900 shadow-[0_25px_80px_-60px_rgba(12,60,55,0.35)] ring-1 ring-brand-teal/10">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold">Brivo</p>
                <span className="rounded-full bg-brand-teal/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal ring-1 ring-brand-teal/30">
                  Access
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">Cloud access control and credentialing for secure paths and storage.</p>
            </div>
            <div className="rounded-2xl border border-white/50 bg-white/90 p-4 text-sm font-semibold text-slate-800 ring-1 ring-brand-teal/10 transition hover:-translate-y-0.5 hover:border-brand-teal hover:text-brand-teal">
              <p>Q-SYS / Teams Rooms</p>
              <p className="mt-2 text-xs font-normal text-slate-600">Flexible AV ecosystems for boardrooms, hybrid rooms, and specialty spaces.</p>
            </div>
            <div className="rounded-2xl border border-white/50 bg-white/90 p-4 text-sm font-semibold text-slate-800 ring-1 ring-brand-teal/10 transition hover:-translate-y-0.5 hover:border-brand-teal hover:text-brand-teal">
              <p>Shure / Biamp</p>
              <p className="mt-2 text-xs font-normal text-slate-600">Professional microphones, DSP, and audio distribution for clear calls.</p>
            </div>
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
          id="footer-cta"
          className="mt-16 space-y-8 rounded-3xl border border-brand-teal/30 bg-gradient-to-br from-brand-teal/15 via-brand-teal/10 to-brand-slate/40 px-6 py-12 lg:mt-24 lg:px-12"
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">
              Tell Us About One Space
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-muted">
              Give us a room or area, a rough budget, and how you use it today. We’ll come back with a simple plan and options.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/30 lg:p-6">
            <div className="flex flex-col gap-2 text-sm text-slate-200 lg:flex-row lg:items-center lg:justify-between">
              <span>Prefer to talk? Call us directly.</span>
              <Link href="tel:+18666572383" className="font-semibold text-brand-teal underline-offset-2 hover:underline">
                (866) 657-2383
              </Link>
            </div>
            <div className="mt-4">
              <FooterCTAForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
