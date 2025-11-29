import type { Metadata } from "next";
import Link from "next/link";

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
  },
  {
    title: "Documentation You Can Actually Use",
    body: "Every project includes complete as-built documentation, signal flow diagrams, and user guides. When your IT person changes, the knowledge doesn’t leave.",
  },
  {
    title: "Long-Term Partnership",
    body: "We don’t disappear after install. Ongoing support, system tweaks, and expansion planning are part of how we work.",
  },
];

const partners = [
  { name: "Q-SYS", note: "Flexible AV ecosystems for boardrooms, hybrid rooms, and specialty spaces" },
  { name: "Shure", note: "Professional microphones and audio processing" },
  { name: "Biamp", note: "DSP and audio distribution for clear, reliable sound" },
  { name: "Microsoft Teams Rooms", note: "Native integration for Teams-based organizations" },
];

const process = [
  "Discovery — We map your rooms, users, workflows, and existing equipment",
  "Design — System architecture, equipment selection, and documentation",
  "Installation — Coordinated install with our team or trusted local partners",
  "Commissioning — Testing, tuning, and user training",
  "Support — Ongoing availability for optimization and expansion",
];

const relatedRooms = [
  { label: "Executive Boardroom", href: "/room-types/executive-boardroom" },
  { label: "Team Meeting Room", href: "/room-types/team-meeting-room" },
  { label: "Training / All-Hands Space", href: "/room-types/training-all-hands" },
  { label: "Small Hybrid / Focus Pod", href: "/room-types/small-hybrid-focus-pod" },
];

export default function AvIntegrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-16 lg:px-0">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-black/40">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">AV Integration & Systems</h1>
          <p className="mt-2 text-lg font-semibold text-brand-teal">Conference rooms, displays, audio, and control that just work.</p>
          <p className="mt-4 text-base text-slate-200">
            We design, install, and support AV systems for organizations that can’t afford bad calls, failed presentations, or technology that frustrates your team.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
            >
              Start a Conversation
            </Link>
            <Link
              href="#services"
              className="rounded-full border border-brand-teal/70 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              View Services
            </Link>
          </div>
        </section>

        <section id="services" className="mt-12 space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-md shadow-black/30">
          <h2 className="text-2xl font-semibold text-foreground">What We Build and Support</h2>
          <ul className="mt-4 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
            {services.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-md shadow-black/30">
          <h2 className="text-2xl font-semibold text-foreground">Why CalLord for AV Integration</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {differentiators.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-md shadow-black/30">
          <h2 className="text-2xl font-semibold text-foreground">Powered by Platforms You Trust</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="rounded-2xl border border-white/50 bg-white/90 p-4 text-sm font-semibold text-slate-800 ring-1 ring-brand-teal/10 transition hover:-translate-y-0.5 hover:border-brand-teal hover:text-brand-teal"
              >
                <p>{partner.name}</p>
                <p className="mt-2 text-xs font-normal text-slate-600">{partner.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-md shadow-black/30">
          <h2 className="text-2xl font-semibold text-foreground">How We Work</h2>
          <ol className="space-y-3 text-sm text-slate-200">
            {process.map((item, idx) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 h-6 w-6 rounded-full bg-brand-teal text-center text-xs font-bold text-brand-slate">{idx + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12 space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-md shadow-black/30">
          <h2 className="text-2xl font-semibold text-foreground">Let’s Talk About Your Space</h2>
          <p className="text-sm text-slate-200">
            Tell us about your room, your challenges, and your goals. We’ll come back with options.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
            >
              Start a Conversation
            </Link>
            <Link
              href="tel:+18666572383"
              className="inline-flex items-center justify-center rounded-full border border-brand-teal/70 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              Call (866) 657-2383
            </Link>
          </div>
        </section>

        <section className="mt-12 space-y-3">
          <h3 className="text-xl font-semibold text-foreground">Explore Room Types</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedRooms.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-4 text-sm font-semibold text-brand-teal shadow-md shadow-black/40 transition hover:-translate-y-0.5 hover:border-brand-teal"
              >
                {item.label} →
              </Link>
            ))}
            <Link
              href="/room-types"
              className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-4 text-sm font-semibold text-brand-teal shadow-md shadow-black/40 transition hover:-translate-y-0.5 hover:border-brand-teal"
            >
              View All Room Types →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
