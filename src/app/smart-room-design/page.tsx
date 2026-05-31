import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, Stagger, StaggerItem, GlowCard } from "../components/MotionWrappers";

export const metadata: Metadata = {
  title: "Professional Conference Room Design | 3–7 Day Delivery | CalLord",
  description:
    "Fixed-price conference room design packages. D-Tools documentation, equipment specs, signal flow diagrams, and installation guidance. $2,500–$8,000. Nationwide.",
};

const pricing = [
  {
    name: "Essential",
    price: "$2,500",
    bestFor: "Rooms up to 10 people, standard AV requirements",
    includes: ["Room audio tuning specifications", "Display and signal routing", "Equipment list with specs", "Cable schedules", "Installation guidance document"],
  },
  {
    name: "Professional",
    price: "$4,500",
    bestFor: "Rooms up to 20 people, control systems required",
    includes: ["Everything in Essential", "Control system programming specs", "Rack elevation drawings", "Network diagram", "User operation guide"],
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "$8,000",
    bestFor: "Complex rooms, multi-display, custom requirements",
    includes: ["Everything in Professional", "Multiple room coordination", "Custom control UI design", "Training documentation", "Dedicated project manager"],
  },
];

const process = [
  { title: "Discovery Call (15 minutes)", body: "We align on room size, budget, and requirements." },
  { title: "Package Selection", body: "Essential ($2,500), Professional ($4,500), or Enterprise ($8,000)." },
  { title: "Design & Documentation", body: "D-Tools files, diagrams, specs, cable schedules, and install guidance." },
  { title: "Handoff", body: "Hand off to your installer, get competitive bids, or DIY with our guidance." },
];

const benefits = [
  "Fast delivery: Start procurement quickly with 3–7 day turnaround",
  "Budget certainty: Fixed pricing — no hourly surprises",
  "Installer-ready: Complete drawings and schedules ready to bid",
  "Vendor-neutral: Specs you can bid competitively with any installer",
  "Scalable: Ideal for multi-location rollouts and standards",
  "Clear execution: Complete cable schedules and setup steps",
];

const deliverables = [
  "System schematics",
  "Signal flow diagrams",
  "Equipment specifications",
  "Network diagrams",
  "Cable schedules",
  "Rack elevations (Professional/Enterprise)",
  "Installation guidance",
  "User operation guides (Professional/Enterprise)",
];

const faqs = [
  { q: "Can I install this myself?", a: "Essential can work for experienced facilities teams. Professional and Enterprise typically require a professional installer due to control system complexity." },
  { q: "What if I need revisions?", a: "Minor revisions within 14 days are included. Major scope changes are quoted separately." },
  { q: "Do you sell equipment?", a: "No — we provide pure design consultancy. This keeps our recommendations vendor-neutral and in your best interest." },
  { q: "How quickly can we start?", a: "Most projects begin within 3–5 business days. Rush delivery (48–72 hours) is sometimes available for a 50% expedite fee." },
];

const related = [
  { label: "Executive Boardroom", href: "/room-types/executive-boardroom" },
  { label: "Team Meeting Room", href: "/room-types/team-meeting-room" },
  { label: "Training / All-Hands Space", href: "/room-types/training-all-hands" },
];

export default function SmartRoomDesignPage() {
  return (
    <div className="min-h-screen bg-background text-foreground noise-overlay">
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-16 lg:px-0">

        {/* Hero */}
        <FadeIn>
          <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#0c1222] via-[#0a1020] to-background p-8 lg:px-12 lg:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(39,154,146,0.1),transparent_50%)]" />
            <div className="relative">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                <span className="text-gradient">Professional Conference Room</span> Design
              </h1>
              <p className="mt-2 text-lg font-medium text-brand-teal">Delivered in 3–7 Days</p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                Complete D-Tools documentation, equipment specifications, signal flow diagrams, and installation guidance. 100% remote delivery.
                Nationwide. Fixed pricing. No surprises. No hidden fees.
              </p>
              <p className="mt-3 text-sm font-semibold text-foreground">Fixed pricing. No surprises. No hidden fees.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-[#070a14] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(39,154,146,0.6)]">
                  Schedule Free Assessment
                </Link>
                <Link href="#pricing" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-teal/30">
                  See Packages
                </Link>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Pain Points */}
        <FadeIn className="mt-14">
          <section className="glass-card rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-foreground">You've Seen It Before</h2>
            <p className="mt-2 text-sm text-muted">Meetings delayed. Technology that doesn't work. Frustrated teams.</p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
              <p><strong className="text-foreground">Echoes and feedback ruin meetings.</strong> Proper mic/DSP design fixes it at the source.</p>
              <p><strong className="text-foreground">HDMI hunting wastes time.</strong> Clean signal routing makes sharing instant.</p>
              <p><strong className="text-foreground">Confusing controls kill adoption.</strong> We design for simplicity and provide user guides.</p>
              <p className="font-semibold text-foreground">Bottom line: most AV failures begin at the design stage. Professional system design prevents them before they start.</p>
            </div>
          </section>
        </FadeIn>

        {/* Pricing */}
        <section id="pricing" className="mt-14 space-y-5">
          <FadeIn>
            <h2 className="text-2xl font-semibold text-foreground">Choose Your Package</h2>
            <p className="text-sm text-muted">Select the package that fits your room size and complexity. All include complete D-Tools documentation and installation guidance.</p>
          </FadeIn>
          <Stagger className="grid gap-4 lg:grid-cols-3">
            {pricing.map((tier) => (
              <StaggerItem key={tier.name}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-brand-teal/20 via-transparent to-brand-teal/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-foreground">{tier.name}</h3>
                      {tier.badge ? (
                        <span className="rounded-full bg-brand-teal/15 px-3 py-1 text-xs font-semibold text-brand-teal ring-1 ring-brand-teal/20">{tier.badge}</span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-3xl font-semibold text-gradient-teal">{tier.price}</p>
                    <p className="mt-1 text-sm text-muted">{tier.bestFor}</p>
                    <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-300">
                      {tier.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-teal px-4 py-2.5 text-sm font-semibold text-[#070a14] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_-10px_rgba(39,154,146,0.5)]">
                      Schedule Free Assessment
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Process */}
        <section className="mt-14">
          <FadeIn>
            <h2 className="text-2xl font-semibold text-foreground">From Consultation to Documentation in 3–7 Days</h2>
          </FadeIn>
          <Stagger className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, idx) => (
              <StaggerItem key={step.title}>
                <div className="glass-card glass-card-hover rounded-2xl p-5 h-full transition-all duration-300">
                  <div className="mb-3 text-sm font-bold text-brand-teal/50">{String(idx + 1).padStart(2, "0")}</div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Benefits + Deliverables */}
        <FadeIn className="mt-14">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass-card rounded-3xl p-6">
              <h2 className="text-2xl font-semibold text-foreground">Professional Expertise Without the Enterprise Price Tag</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {benefits.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-3xl p-6">
              <h2 className="text-2xl font-semibold text-foreground">What You Receive</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* FAQ */}
        <FadeIn className="mt-14">
          <section className="glass-card rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-foreground">Common Questions</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              {faqs.map((item) => (
                <div key={item.q}>
                  <p className="font-semibold text-foreground">{item.q}</p>
                  <p className="mt-1 text-muted">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* CTA */}
        <FadeIn className="mt-14">
          <section className="relative overflow-hidden rounded-3xl">
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-brand-teal/30 via-transparent to-brand-teal/10" />
            <div className="relative rounded-3xl bg-[#070a14]/95 p-8">
              <h2 className="text-2xl font-semibold text-foreground">Ready to Get Started?</h2>
              <p className="mt-2 text-sm text-muted">Schedule your free 15-minute consultation. We'll recommend the right package and answer your questions.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-[#070a14] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(39,154,146,0.6)]">
                  Schedule Free Assessment
                </Link>
                <Link href="tel:+18666572383" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-teal/30">
                  Call (866) 657-2383
                </Link>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Related */}
        <FadeIn className="mt-14">
          <h3 className="text-xl font-semibold text-foreground">Related Room Types</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link key={item.href} href={item.href} className="glass-card glass-card-hover rounded-2xl p-4 text-sm font-semibold text-brand-teal transition-all duration-300">
                {item.label} →
              </Link>
            ))}
          </div>
        </FadeIn>
      </main>
    </div>
  );
}
