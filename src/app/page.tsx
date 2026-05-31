import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { siteConfig } from "../config/site";
import { FooterCTAForm } from "./components/FooterCTAForm";
import { FadeIn, Stagger, StaggerItem, AnimatedCounter, GlowCard } from "./components/MotionWrappers";

export const metadata: Metadata = {
  title: "CalLord Unified Technologies | Smart Rooms, AV & Security Design",
  description:
    "AV systems, smart rooms, and security designed for senior living, offices, and hospitality. Documented. Supported. Done right. Serving New Mexico, Colorado, and Arizona.",
  openGraph: {
    title: "CalLord Unified Technologies | Smart Rooms, AV & Security Design",
    description:
      "AV systems, smart rooms, and security designed for senior living, offices, and hospitality. Documented. Supported. Done right. Serving New Mexico, Colorado, and Arizona.",
    url: siteConfig.website,
    siteName: siteConfig.shortName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalLord Unified Technologies | Smart Rooms, AV & Security Design",
    description:
      "AV systems, smart rooms, and security designed for senior living, offices, and hospitality. Documented. Supported. Done right.",
  },
};

const trustStats = [
  { label: "Rooms Delivered", value: 250, suffix: "+" },
  { label: "Avg. Response", value: 1, prefix: "<", suffix: "hr" },
  { label: "Uptime Target", value: 99.5, suffix: "%" },
];

const trustLogos = ["Eagle Eye Networks", "Brivo", "Shure", "Microsoft Teams Rooms"];

const serveCards = [
  {
    title: "Senior Living Communities",
    body: "Private virtual visit rooms, common-area AV, and camera coverage that keeps residents connected without tech friction.",
    href: "/industries/senior-living",
    icon: "🏥",
  },
  {
    title: "Hospitality & Private Clubs",
    body: "Discreet AV, lighting cues, and security paths that protect the vibe for lounges, boutique hotels, and private clubs.",
    href: "/industries/hospitality",
    icon: "🏨",
  },
  {
    title: "Small & Mid-Sized Offices",
    body: "Boardrooms, huddle rooms, displays, audio, and camera systems where presentations just start.",
    href: "/industries/offices",
    icon: "🏢",
  },
  {
    title: "Multifamily Properties",
    body: "Unified security for properties that need visibility, accountability, and a clean upgrade path.",
    href: "/solutions/multifamily-security",
    icon: "🏘️",
  },
];

const processSteps = [
  { step: "01", title: "Discover", copy: "We map your rooms, users, and existing gear so we know what we're building on." },
  { step: "02", title: "Design", copy: "We design audio, video, and control in plain language and schematics." },
  { step: "03", title: "Deliver", copy: "We manage install and configuration with local partners so the room is ready to use." },
  { step: "04", title: "Support", copy: "We stay available for tweaks, expansions, and new rooms as you grow." },
];

const roomTemplates = [
  { title: "Executive Boardroom", href: "/room-types/executive-boardroom", useCases: "10–18 people  •  Board calls  •  Investor updates", image: "/room-executive-boardroom.png" },
  { title: "Team Meeting Room", href: "/room-types/team-meeting-room", useCases: "6–10 people  •  Weekly syncs  •  Workshops", image: "/room-team-meeting.png" },
  { title: "Virtual Visit / Telehealth", href: "/room-types/virtual-visit-telehealth", useCases: "Private visits  •  Telehealth  •  Consultations", image: "/room-generic.png" },
  { title: "Small Hybrid / Focus Pod", href: "/room-types/small-hybrid-focus-pod", useCases: "1–4 people  •  Hybrid calls  •  Focus work", image: "/room-small-hybrid-focus-pod.png" },
];

const differentiators = [
  {
    title: "Operator-First Design",
    body: "We speak in floor plans and outcomes — not boxes and part numbers. Every system is designed for the people who use it daily.",
    icon: "◎",
  },
  {
    title: "Security-Ready by Design",
    body: "AV and rooms are designed with camera coverage, access control, and compliance in mind for regulated environments.",
    icon: "◈",
  },
  {
    title: "Future-Ready Rooms",
    body: "Systems are designed to be upgraded in pieces — not ripped out every time platforms change. Your investment lasts.",
    icon: "◇",
  },
];

const platforms = [
  { name: "Eagle Eye Networks", tag: "Security", description: "Cloud video surveillance + retention for regulated facilities." },
  { name: "Brivo", tag: "Access", description: "Cloud access control and credentialing for secure paths and storage." },
  { name: "Shure", tag: "Audio", description: "Professional microphones and audio processing for clear, reliable sound." },
  { name: "Microsoft Teams Rooms", tag: "Collaboration", description: "Native integration for Teams-based organizations and hybrid work." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground noise-overlay">
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-4 lg:px-6">

        {/* ── HERO ── */}
        <section className="relative isolate overflow-hidden rounded-3xl">
          <div className="absolute inset-0">
            <Image
              src="/hero-conference-room.webp.png"
              alt="Modern conference room designed for hybrid meetings"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#070a14]/80 via-[#070a14]/60 to-[#070a14]/95" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(39,154,146,0.15),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(39,154,146,0.08),transparent_50%)]" />

          <div className="relative px-6 py-20 lg:px-14 lg:py-28">
            <FadeIn delay={0.1}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
                AV &bull; Security &bull; Smart Rooms
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
                <span className="text-gradient">Rooms That</span>{" "}
                <span className="text-foreground">Just Work</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.35}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300 lg:text-xl">
                AV systems, smart rooms, and security designed for multifamily, senior living, offices, and hospitality.{" "}
                <span className="text-foreground font-medium">Documented. Supported. Done right.</span>
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="#footer-cta"
                  className="group relative inline-flex items-center justify-center rounded-full bg-brand-teal px-7 py-3.5 text-base font-semibold text-[#070a14] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(39,154,146,0.6)]"
                >
                  Schedule Free Assessment
                </Link>
                <Link
                  href="#room-types"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-base font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-teal/30 hover:bg-white/10"
                >
                  See Room Templates
                  <span className="text-brand-teal">→</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <FadeIn className="mt-16 lg:mt-20">
          <section className="grid gap-6 lg:grid-cols-[1fr,1fr] lg:items-center">
            <div className="grid grid-cols-3 gap-3">
              {trustStats.map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-5 text-center">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted">{stat.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold text-brand-teal lg:text-3xl">
                    {stat.label === "Avg. Response" ? (
                      <><span className="text-lg">&lt;</span>1<span className="text-lg">hr</span></>
                    ) : stat.label === "Uptime Target" ? (
                      <>99.5<span className="text-lg">%</span></>
                    ) : (
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    )}
                  </dd>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
              {trustLogos.map((logo) => (
                <span
                  key={logo}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 transition-colors duration-300 hover:border-brand-teal/30 hover:text-brand-teal"
                >
                  {logo}
                </span>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* ── DIVIDER ── */}
        <div className="section-divider mx-auto mt-20 max-w-2xl lg:mt-28" />

        {/* ── INDUSTRIES ── */}
        <section id="industries" className="mt-16 lg:mt-24">
          <FadeIn>
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-teal">Who we serve</span>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-5xl">
                Built for Teams Who Can't Afford Downtime
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-muted">
                We focus on environments where every meeting, resident check-in, or virtual visit actually matters.
              </p>
            </div>
          </FadeIn>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2">
            {serveCards.map((item) => (
              <StaggerItem key={item.title}>
                <Link href={item.href} className="group block h-full">
                  <GlowCard className="h-full">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-lg ring-1 ring-brand-teal/20">
                        {item.icon}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          Learn more <span>→</span>
                        </span>
                      </div>
                    </div>
                  </GlowCard>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ── DIVIDER ── */}
        <div className="section-divider mx-auto mt-20 max-w-2xl lg:mt-28" />

        {/* ── PROCESS ── */}
        <section id="process" className="mt-16 lg:mt-24">
          <FadeIn>
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-teal">How we work</span>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-5xl">
                From Idea to &ldquo;It Just Works&rdquo;
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-muted">
                A clear path so your team knows exactly what happens next.
              </p>
            </div>
          </FadeIn>
          <Stagger className="relative mt-10">
            {/* Timeline connector */}
            <div className="absolute left-[22px] top-8 bottom-8 hidden w-px bg-gradient-to-b from-brand-teal/40 via-brand-teal/20 to-transparent lg:block" />
            <div className="grid gap-4 lg:gap-0">
              {processSteps.map((step) => (
                <StaggerItem key={step.step}>
                  <div className="group flex items-start gap-5 rounded-2xl p-4 transition-colors duration-300 hover:bg-white/[0.02] lg:py-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-teal/30 bg-brand-teal/10 text-sm font-bold text-brand-teal transition-all duration-300 group-hover:bg-brand-teal group-hover:text-[#070a14]">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{step.copy}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </section>

        {/* ── DIVIDER ── */}
        <div className="section-divider mx-auto mt-20 max-w-2xl lg:mt-28" />

        {/* ── ROOM TEMPLATES ── */}
        <section id="room-types" className="mt-16 lg:mt-24">
          <FadeIn>
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-teal">Room templates</span>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-5xl">
                Start With a Proven Design
              </h2>
              <p className="max-w-3xl text-base leading-relaxed text-muted">
                We've engineered room configurations that work — so you don't start from scratch. Pick a template, customize for your space, and skip the trial-and-error.
              </p>
            </div>
          </FadeIn>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2">
            {roomTemplates.map((room) => (
              <StaggerItem key={room.title}>
                <Link href={room.href} className="group relative block overflow-hidden rounded-2xl">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070a14] via-[#070a14]/60 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-xl font-semibold text-foreground">{room.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{room.useCases}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-teal">
                      View template <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn delay={0.2} className="mt-6">
            <Link
              href="/room-types"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-teal transition-colors hover:text-brand-teal-alt"
            >
              View All Room Types →
            </Link>
          </FadeIn>
        </section>

        {/* ── DIVIDER ── */}
        <div className="section-divider mx-auto mt-20 max-w-2xl lg:mt-28" />

        {/* ── WHY CALLORD ── */}
        <section id="why" className="mt-16 lg:mt-24">
          <FadeIn>
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-teal">The difference</span>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-5xl">
                Why Teams Choose CalLord
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-muted">
                Design, delivery, and support all speak the language of operators.
              </p>
            </div>
          </FadeIn>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {differentiators.map((value) => (
              <StaggerItem key={value.title}>
                <GlowCard>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-teal/20 to-brand-teal/5 text-lg text-brand-teal ring-1 ring-brand-teal/20">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{value.body}</p>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ── DIVIDER ── */}
        <div className="section-divider mx-auto mt-20 max-w-2xl lg:mt-28" />

        {/* ── PLATFORMS ── */}
        <section className="mt-16 lg:mt-24">
          <FadeIn>
            <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-brand-teal/[0.06] via-transparent to-transparent p-8 lg:p-12">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-teal">Technology partners</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
                Powered by Platforms You Already Trust
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                Security and compliance are grounded in Eagle Eye Networks and Brivo. AV stacks layer in professional audio and collaboration platforms that stay supportable long-term.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {platforms.map((p) => (
                  <div
                    key={p.name}
                    className="glass-card glass-card-hover rounded-2xl p-5 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-foreground">{p.name}</span>
                      <span className="rounded-full bg-brand-teal/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-teal ring-1 ring-brand-teal/20">
                        {p.tag}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-muted">{p.description}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-muted">
                Curious about cooperative purchasing options for public entities?{" "}
                <Link href="/partnerships/cooperative-purchasing" className="font-semibold text-brand-teal underline-offset-2 hover:underline">
                  Learn about our statewide program
                </Link>
                .
              </p>
            </div>
          </FadeIn>
        </section>

        {/* ── CTA ── */}
        <section id="footer-cta" className="mt-20 lg:mt-28">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-brand-teal/30 via-transparent to-brand-teal/10" />
              <div className="relative rounded-3xl bg-[#070a14]/95 px-6 py-12 lg:px-14">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(39,154,146,0.12),transparent_60%)]" />
                <div className="relative space-y-3">
                  <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-5xl">
                    Tell Us About One Space
                  </h2>
                  <p className="max-w-2xl text-base leading-relaxed text-muted">
                    Give us a room or area, a rough budget, and how you use it today. We'll come back with a simple plan and options.
                  </p>
                </div>
                <div className="relative mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm lg:p-8">
                  <div className="flex flex-col gap-2 text-sm text-muted lg:flex-row lg:items-center lg:justify-between">
                    <span>Prefer to talk? Call us directly.</span>
                    <Link href="tel:+18666572383" className="font-semibold text-brand-teal underline-offset-2 hover:underline">
                      (866) 657-2383
                    </Link>
                  </div>
                  <div className="mt-5">
                    <FooterCTAForm />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>
    </div>
  );
}
