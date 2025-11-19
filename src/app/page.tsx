"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Smart Rooms", href: "#room-types" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#why" },
  { label: "Contact", href: "#lead-form" },
];

const industries = [
  {
    title: "Senior living & healthcare",
    copy: "Private virtual visit rooms, common-area AV, and camera monitoring where it matters without tech friction.",
  },
  {
    title: "Small & mid-sized offices",
    copy: "Boardrooms, huddle rooms, displays, audio, and camera systems where presentations just start.",
  },
  {
    title: "Nonprofits & member clubs",
    copy: "Reliable AV for donor updates, board meetings, hybrid events, and thoughtful security coverage.",
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

const roomTypes = [
  {
    name: "Executive Boardroom",
    bullets: [
      "Single-touch start / join",
      "Integrated displays and audio for the whole space",
      "Camera framing matched to the table",
      "Room and access paths considered together",
    ],
    tag: "Teams / Zoom",
  },
  {
    name: "Team Huddle Room",
    bullets: [
      "Fast start meetings",
      "Auto-switching inputs",
      "Clean cable management",
      "Security views or monitoring where it matters",
      "Camera and audio tuned so remote teammates don’t feel second-class",
    ],
    tag: "Hybrid",
  },
  {
    name: "Virtual Visit Room",
    bullets: [
      "Private acoustics",
      "Simple family access",
      "Clear signage and controls",
      "Privacy plus clear audio and camera framing",
    ],
    tag: "Family",
  },
  {
    name: "Training / All-hands Room",
    bullets: [
      "Presenter / audience audio balance",
      "Multi-camera angles",
      "Recording-ready signal path",
    ],
    tag: "Live / Stream",
  },
  {
    name: "Senior Community Family Room",
    bullets: [
      "Self-serve touch panel",
      "Assisted setup if needed",
      "Comfort-first seating layouts",
    ],
    tag: "Care",
  },
  {
    name: "Hybrid Office Pod",
    bullets: ["Bookable slots", "Acoustic treatments", "Quick-turn joins"],
    tag: "Pods",
  },
  {
    name: "Security & Surveillance Zones",
    bullets: [
      "Camera coverage designed for your floorplan",
      "Remote viewing and alerts",
      "Partners like Eagle Eye and Brivo",
    ],
    tag: "Security",
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

const partners = [
  "Video Platform",
  "Control",
  "Cameras",
  "Audio DSP",
  "Displays",
  "Room Booking",
];

function LogoMark() {
  return (
    <div className="flex items-center gap-2 rounded-full bg-card px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-brand-teal ring-1 ring-white/10">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-teal/10 text-brand-orange">
        CL
      </span>
      <div className="leading-tight text-left text-foreground">
        <div>CalLord UT</div>
        <div className="text-[11px] font-medium text-muted">
          Smart Rooms & AV
        </div>
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-brand-teal-alt/10 px-3 py-1 text-xs font-semibold text-brand-teal-alt ring-1 ring-brand-teal-alt/30">
      {children}
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const heroStats = useMemo(
    () => [
      { label: "Rooms delivered", value: "250+" },
      { label: "Avg. response", value: "<1hr" },
      { label: "Uptime target", value: "99.5%" },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-white/5 bg-brand-slate/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
          <Link href="#hero" className="flex items-center gap-3" onClick={closeMenu}>
            <LogoMark />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-muted lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 transition hover:text-brand-teal-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-alt"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Link
              href="#lead-form"
              className="rounded-full bg-brand-teal-alt px-4 py-2 text-sm font-semibold text-brand-slate transition hover:bg-brand-teal-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-alt"
            >
              Schedule a Consult
            </Link>
          </div>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm font-semibold text-foreground transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-alt lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>
        {menuOpen ? (
          <div className="border-t border-white/5 bg-brand-slate/95 px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-3 text-sm font-semibold text-muted">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-alt"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#lead-form"
                onClick={closeMenu}
                className="rounded-lg bg-brand-teal-alt px-3 py-2 text-center font-semibold text-brand-slate transition hover:bg-brand-teal-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-alt"
              >
                Schedule a Consult
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-28 lg:px-6">
        <section
          id="hero"
          className="relative isolate overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.8)] lg:px-12 lg:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(22,199,182,0.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(249,115,22,0.14),transparent_30%),radial-gradient(circle_at_60%_70%,rgba(22,199,182,0.2),transparent_35%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr,0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-teal ring-1 ring-white/10">
                CalLord Unified Technologies
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
              </div>
              <div className="space-y-4">
                <h1 className="text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                  AV, smart rooms, and security that make your spaces feel effortless.
                </h1>
                <p className="text-lg leading-relaxed text-muted lg:text-xl">
                  CalLord designs and delivers AV systems, smart rooms, and security for small businesses and senior communities — from conference rooms to virtual visit suites and cannabis facilities — so your people can connect clearly without wrestling the tech.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                href="#lead-form"
                className="rounded-full bg-gradient-to-r from-brand-teal-alt via-brand-teal to-brand-teal-strong px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:opacity-90 hover:shadow-[0_10px_35px_-18px_rgba(22,199,182,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-alt"
              >
                Plan my next build
              </Link>
              <Link
                href="#room-types"
                className="rounded-full border border-brand-teal-alt px-6 py-3 text-base font-semibold text-brand-teal-alt transition hover:-translate-y-0.5 hover:bg-brand-teal-alt hover:text-brand-slate hover:shadow-[0_10px_30px_-20px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-alt"
              >
                See example builds
              </Link>
            </div>
              <dl className="relative grid max-w-lg grid-cols-2 gap-4 overflow-hidden rounded-2xl border border-white/5 bg-card/80 p-4 text-sm text-muted sm:grid-cols-3">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-sand/12 via-transparent to-transparent" aria-hidden />
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-card-muted/80 p-3 ring-1 ring-white/5">
                    <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                      {stat.label}
                    </dt>
                    <dd className="text-2xl font-semibold text-brand-teal-alt">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div className="absolute -left-10 -top-6 hidden h-24 w-24 rounded-[28px] bg-brand-orange/20 blur-2xl lg:block" aria-hidden />
              <div className="absolute -right-6 top-10 hidden h-28 w-28 rounded-[32px] bg-brand-teal/25 blur-2xl lg:block" aria-hidden />
              <div className="relative space-y-4 rounded-3xl border border-white/5 bg-card/80 p-4 backdrop-blur">
                <div className="grid grid-cols-[1.4fr,1fr] gap-3 rounded-2xl border border-white/10 bg-card-muted/80 p-4 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.6)]">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>Executive Boardroom</span>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold text-brand-teal ring-1 ring-brand-teal/30">
                        Live call
                      </span>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-[#0f2238] to-[#0b1324] p-4 ring-1 ring-white/10">
                      <div className="flex items-center justify-between text-[11px] text-muted">
                        <span>Gallery</span>
                        <span className="h-2 w-2 rounded-full bg-emerald-400" aria-label="Call connected" />
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] text-muted">
                        <div className="rounded-xl bg-white/5 px-3 py-4 text-foreground">Camera</div>
                        <div className="rounded-xl bg-white/5 px-3 py-4">Mic Array</div>
                        <div className="rounded-xl bg-white/5 px-3 py-4">Display</div>
                      </div>
                      <div className="mt-3 flex items-center justify-between rounded-xl bg-brand-teal/10 px-3 py-2 text-xs font-semibold text-brand-teal ring-1 ring-brand-teal/30">
                        <span>Auto framing</span>
                        <span>On</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-muted">
                      <div className="flex items-center justify-between text-xs">
                        <span>Room readiness</span>
                        <span className="font-semibold text-brand-teal">OK</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-white/10">
                        <div className="h-2 w-[82%] rounded-full bg-brand-teal" aria-hidden />
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-muted">
                        Single-touch join, auto input switching, and guided lighting scenes.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-muted">
                      <div className="flex items-center justify-between">
                        <span>Next up</span>
                        <span className="rounded-full bg-brand-orange/15 px-2 py-1 text-[10px] font-semibold text-brand-orange">
                          5 min
                        </span>
                      </div>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between rounded-xl bg-card p-2">
                          <span>Design review</span>
                          <span className="text-foreground">3p</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-card p-2">
                          <span>Resident visit</span>
                          <span className="text-foreground">4p</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-brand-teal/20 bg-brand-teal/5 p-4 text-sm text-muted ring-1 ring-brand-teal/30">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-sand/14 via-transparent to-transparent" aria-hidden />
                  <div className="flex items-center gap-2 text-brand-teal font-semibold">
                    <span className="flex h-2 w-2 rounded-full bg-brand-teal" aria-hidden /> Smart room status
                  </div>
                  <p className="mt-2 leading-relaxed text-muted">
                    AV paths verified, microphones balanced, and auto-recovery enabled for the next call.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Pill>Teams ready</Pill>
                    <Pill>Zoom ready</Pill>
                    <Pill>Recording enabled</Pill>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="industries"
          className="mt-16 space-y-8 border-t border-brand-sand/20 pt-12 lg:mt-24 lg:pt-16"
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
                className="group rounded-2xl border border-white/5 bg-card p-5 transition hover:-translate-y-1 hover:border-brand-teal/40 hover:shadow-[0_20px_60px_-45px_rgba(22,199,182,0.9)]"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal/10 text-sm font-semibold text-brand-teal ring-1 ring-brand-teal/30">
                  ●
                </div>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.copy}</p>
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
                className="relative overflow-hidden rounded-2xl border border-white/5 bg-card p-5 transition hover:-translate-y-1 hover:border-brand-teal/40 hover:shadow-[0_20px_60px_-45px_rgba(22,199,182,0.9)]"
              >
                <div className="absolute right-4 top-4 text-sm font-semibold text-brand-teal/60">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="room-types"
          className="mt-16 space-y-8 border-t border-brand-sand/20 pt-12 lg:mt-24 lg:pt-16"
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">
              Systems and rooms we build again and again.
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-muted">
              We template AV, smart-room flows, and security patterns so each new space gets the benefit of the last one we built.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roomTypes.map((room) => (
              <div
                key={room.name}
                className="group flex flex-col rounded-2xl border border-white/5 bg-card p-5 transition hover:-translate-y-1 hover:border-brand-teal/40 hover:shadow-[0_20px_60px_-45px_rgba(22,199,182,0.9)]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{room.name}</h3>
                  <Pill>{room.tag}</Pill>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {room.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
                className="rounded-2xl border border-white/5 bg-card p-5 transition hover:-translate-y-1 hover:border-brand-teal/40 hover:shadow-[0_20px_60px_-45px_rgba(22,199,182,0.9)]"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/15 text-sm font-semibold text-brand-orange ring-1 ring-brand-orange/30">
                  ◎
                </div>
                <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-8 rounded-3xl bg-brand-sand px-6 py-10 text-slate-900 lg:mt-24 lg:px-12">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Powered by platforms you already trust.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-700">
              Example vendor categories shown. We tailor platforms like video, control, cameras, and access to each project.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex h-16 items-center justify-center rounded-2xl border border-brand-teal-alt/20 bg-card text-sm font-semibold text-muted transition hover:border-brand-teal/40 hover:text-foreground"
                aria-label={`${partner} placeholder logo`}
              >
                {partner}
              </div>
            ))}
          </div>
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
          <form
            className="grid gap-4 lg:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              // TODO: Hook up to backend or CRM endpoint.
            }}
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-foreground">
                Name*
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal-alt focus:outline-none focus:ring-2 focus:ring-brand-teal-alt/50"
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
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal-alt focus:outline-none focus:ring-2 focus:ring-brand-teal-alt/50"
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
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal-alt focus:outline-none focus:ring-2 focus:ring-brand-teal-alt/50"
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
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal-alt focus:outline-none focus:ring-2 focus:ring-brand-teal-alt/50"
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
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground focus:border-brand-teal-alt focus:outline-none focus:ring-2 focus:ring-brand-teal-alt/50"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose a room type
                </option>
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
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal-alt focus:outline-none focus:ring-2 focus:ring-brand-teal-alt/50"
                placeholder="Describe the room, usage, and current pain points."
              />
            </div>
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-brand-teal-alt px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal-strong hover:shadow-[0_10px_30px_-20px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-alt"
              >
                Get my room plan
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-card-muted py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-6">
          <div className="space-y-3">
            <LogoMark />
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Smart rooms, AV, and security design for teams that care about the experience.
            </p>
            <div className="text-sm text-muted">
              <div>
                Phone: <span className="text-foreground">(505) 000-0000</span>
              </div>
              <div>
                Email: <span className="text-foreground">hello@callordut.com</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm font-semibold text-muted sm:grid-cols-3">
            <Link href="#hero" className="transition hover:text-foreground">
              Home
            </Link>
            <Link href="#room-types" className="transition hover:text-foreground">
              Smart Rooms
            </Link>
            <Link href="#process" className="transition hover:text-foreground">
              Process
            </Link>
            <Link href="#why" className="transition hover:text-foreground">
              About
            </Link>
            <Link href="#lead-form" className="transition hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
