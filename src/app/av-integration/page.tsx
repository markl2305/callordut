import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, Stagger, StaggerItem, GlowCard } from "../components/MotionWrappers";

export const metadata: Metadata = {
  title: "AV Integration Services | Conference Rooms & Displays | CalLord",
  description:
    "Full-service AV integration for conference rooms, displays, audio, and video conferencing. Design, installation, and ongoing support for SMBs.",
};

const services = [
  "Room audio tuning and DSP alignment",
  "Microphones, speakers, and acoustic treatments",
  "Display integration for dual and ultra-wide configurations",
  "Operator-friendly control surfaces and presets",
  "Video conferencing system integration (Teams, Zoom, Meet)",
  "Digital signage and lobby displays",
  "Project documentation and signal path diagrams",
  "Ongoing support and system optimization",
];

const differentiators = [
  {
    title: "Operator-First Design",
    body: "We design for the people who use the room daily — not for the spec sheet. Controls are intuitive. Cables are hidden. The system just works.",
    icon: "◎",
  },
  {
    title: "Documentation You Can Actually Use",
    body: "Every project includes complete as-built documentation, signal flow diagrams, and user guides. When your IT person changes, the knowledge doesn't leave.",
    icon: "◈",
  },
  {
    title: "Long-Term Partnership",
    body: "We don't disappear after install. Ongoing support, system tweaks, and expansion planning are part of how we work.",
    icon: "◇",
  },
];

const partners = [
  { name: "Shure", note: "Professional microphones and audio processing", tag: "Audio" },
  { name: "Microsoft Teams Rooms", note: "Native integration for Teams-based organizations", tag: "Collaboration" },
];

const process = [
  { step: "01", text: "Discovery — We map your rooms, users, workflows, and existing equipment" },
  { step: "02", text: "Design — System architecture, equipment selection, and documentation" },
  { step: "03", text: "Installation — Coordinated install with our team or trusted local partners" },
  { step: "04", text: "Commissioning — Testing, tuning, and user training" },
  { step: "05", text: "Support — Ongoing availability for optimization and expansion" },
];

const relatedRooms = [
  { label: "Executive Boardroom", href: "/room-types/executive-boardroom" },
  { label: "Team Meeting Room", href: "/room-types/team-meeting-room" },
  { label: "Training / All-Hands Space", href: "/room-types/training-all-hands" },
  { label: "Small Hybrid / Focus Pod", href: "/room-types/small-hybrid-focus-pod" },
];

export default function AvIntegrationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground noise-overlay">
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-16 lg:px-0">

        {/* Hero */}
        <FadeIn>
          <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#0c1222] via-[#0a1020] to-background px-6 py-14 lg:px-12 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(39,154,146,0.1),transparent_50%)]" />
            <div className="relative">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-teal">Core service</span>
              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                <span className="text-gradient">AV Integration</span> & Systems
              </h1>
              <p className="mt-2 text-lg font-medium text-brand-teal">Conference rooms, displays, audio, and control that just work.</p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                We design, install, and support AV systems for organizations that can't afford bad calls, failed presentations, or technology that frustrates your team.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-[#070a14] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(39,154,146,0.6)]"
                >
                  Start a Conversation
                </Link>
                <Link
                  href="#services"
                  className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-teal/30 hover:bg-white/10"
                >
                  View Services
                </Link>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Services */}
        <FadeIn className="mt-12">
          <section id="services" className="glass-card rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-foreground">What We Build and Support</h2>
            <ul className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              {services.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>

        {/* Differentiators */}
        <section className="mt-12">
          <FadeIn>
            <h2 className="text-2xl font-semibold text-foreground">Why CalLord for AV Integration</h2>
          </FadeIn>
          <Stagger className="mt-6 grid gap-4 md:grid-cols-3">
            {differentiators.map((item) => (
              <StaggerItem key={item.title}>
                <GlowCard className="h-full">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal/10 text-lg text-brand-teal ring-1 ring-brand-teal/20">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Partners */}
        <FadeIn className="mt-12">
          <section className="glass-card rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-foreground">Powered by Platforms You Trust</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all duration-300 hover:border-brand-teal/20 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{partner.name}</span>
                    <span className="rounded-full bg-brand-teal/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-teal ring-1 ring-brand-teal/20">
                      {partner.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{partner.note}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Process */}
        <section className="mt-12">
          <FadeIn>
            <h2 className="text-2xl font-semibold text-foreground">How We Work</h2>
          </FadeIn>
          <Stagger className="mt-6">
            {process.map((item) => (
              <StaggerItem key={item.step}>
                <div className="group flex items-start gap-4 rounded-xl p-3 transition-colors duration-300 hover:bg-white/[0.02]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-teal/30 bg-brand-teal/10 text-xs font-bold text-brand-teal transition-all duration-300 group-hover:bg-brand-teal group-hover:text-[#070a14]">
                    {item.step}
                  </span>
                  <span className="text-sm leading-relaxed text-slate-300">{item.text}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* CTA */}
        <FadeIn className="mt-14">
          <section className="relative overflow-hidden rounded-3xl">
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-brand-teal/30 via-transparent to-brand-teal/10" />
            <div className="relative rounded-3xl bg-[#070a14]/95 p-8">
              <h2 className="text-2xl font-semibold text-foreground">Let's Talk About Your Space</h2>
              <p className="mt-2 text-sm text-muted">Tell us about your room, your challenges, and your goals. We'll come back with options.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-[#070a14] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(39,154,146,0.6)]"
                >
                  Start a Conversation
                </Link>
                <Link
                  href="tel:+18666572383"
                  className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-teal/30"
                >
                  Call (866) 657-2383
                </Link>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Related Rooms */}
        <FadeIn className="mt-12">
          <h3 className="text-xl font-semibold text-foreground">Explore Room Types</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedRooms.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="glass-card glass-card-hover rounded-2xl p-4 text-sm font-semibold text-brand-teal transition-all duration-300"
              >
                {item.label} →
              </Link>
            ))}
            <Link
              href="/room-types"
              className="glass-card glass-card-hover rounded-2xl p-4 text-sm font-semibold text-brand-teal transition-all duration-300"
            >
              View All Room Types →
            </Link>
          </div>
        </FadeIn>
      </main>
    </div>
  );
}
