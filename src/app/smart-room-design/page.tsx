import type { Metadata } from "next";
import Link from "next/link";

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
    includes: [
      "Room audio tuning specifications",
      "Display and signal routing",
      "Equipment list with specs",
      "Cable schedules",
      "Installation guidance document",
    ],
  },
  {
    name: "Professional",
    price: "$4,500",
    bestFor: "Rooms up to 20 people, control systems required",
    includes: [
      "Everything in Essential",
      "Control system programming specs",
      "Rack elevation drawings",
      "Network diagram",
      "User operation guide",
    ],
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "$8,000",
    bestFor: "Complex rooms, multi-display, custom requirements",
    includes: [
      "Everything in Professional",
      "Multiple room coordination",
      "Custom control UI design",
      "Training documentation",
      "Dedicated project manager",
    ],
  },
];

const process = [
  {
    title: "Discovery Call (15 minutes)",
    body: "We align on room size, budget, and requirements.",
  },
  {
    title: "Package Selection",
    body: "Essential ($2,500), Professional ($4,500), or Enterprise ($8,000).",
  },
  {
    title: "Design & Documentation",
    body: "D-Tools files, diagrams, specs, cable schedules, and install guidance.",
  },
  {
    title: "Handoff",
    body: "Hand off to your installer, get competitive bids, or DIY with our guidance.",
  },
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
  {
    q: "Can I install this myself?",
    a: "Essential can work for experienced facilities teams. Professional and Enterprise typically require a professional installer due to control system complexity.",
  },
  {
    q: "What if I need revisions?",
    a: "Minor revisions within 14 days are included. Major scope changes are quoted separately.",
  },
  {
    q: "Do you sell equipment?",
    a: "No — we provide pure design consultancy. This keeps our recommendations vendor-neutral and in your best interest.",
  },
  {
    q: "How quickly can we start?",
    a: "Most projects begin within 3–5 business days. Rush delivery (48–72 hours) is sometimes available for a 50% expedite fee.",
  },
];

const related = [
  { label: "Executive Boardroom", href: "/room-types/executive-boardroom" },
  { label: "Team Meeting Room", href: "/room-types/team-meeting-room" },
  { label: "Training / All-Hands Space", href: "/room-types/training-all-hands" },
];

export default function SmartRoomDesignPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-16 lg:px-0">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-black/40">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Professional Conference Room Design</h1>
          <p className="mt-2 text-lg font-semibold text-brand-teal">Delivered in 3–7 Days</p>
          <p className="mt-4 text-base text-slate-200">
            Complete D-Tools documentation, equipment specifications, signal flow diagrams, and installation guidance. 100% remote delivery.
            Nationwide. Fixed pricing. No surprises. No hidden fees.
          </p>
          <p className="mt-3 text-sm font-semibold text-foreground">Fixed pricing. No surprises. No hidden fees.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
            >
              Schedule Free Assessment
            </Link>
            <Link
              href="#pricing"
              className="rounded-full border border-brand-teal/70 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              See Packages
            </Link>
          </div>
        </section>

        <section className="mt-14 space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-md shadow-black/30">
          <h2 className="text-2xl font-semibold text-foreground">You’ve Seen It Before</h2>
          <p className="text-sm text-slate-200">Meetings delayed. Technology that doesn’t work. Frustrated teams.</p>
          <div className="space-y-3 text-sm leading-relaxed text-slate-200">
            <p>
              <strong className="text-foreground">Echoes and feedback ruin meetings.</strong> Proper mic/DSP design fixes it at the source.
            </p>
            <p>
              <strong className="text-foreground">HDMI hunting wastes time.</strong> Clean signal routing makes sharing instant.
            </p>
            <p>
              <strong className="text-foreground">Confusing controls kill adoption.</strong> We design for simplicity and provide user guides.
            </p>
            <p className="font-semibold text-foreground">
              Bottom line: most AV failures begin at the design stage. Professional system design prevents them before they start.
            </p>
          </div>
        </section>

        <section id="pricing" className="mt-14 space-y-5">
          <h2 className="text-2xl font-semibold text-foreground">Choose Your Package</h2>
          <p className="text-sm text-slate-200">
            Select the package that fits your room size and complexity. All include complete D-Tools documentation and installation guidance.
          </p>
          <div className="grid gap-4 lg:grid-cols-3">
            {pricing.map((tier) => (
              <div
                key={tier.name}
                className="flex h-full flex-col rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40 transition hover:-translate-y-1 hover:border-brand-teal/50"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">{tier.name}</h3>
                  {tier.badge ? (
                    <span className="rounded-full bg-brand-teal/20 px-3 py-1 text-xs font-semibold text-brand-teal">{tier.badge}</span>
                  ) : null}
                </div>
                <p className="mt-2 text-3xl font-semibold text-brand-teal">{tier.price}</p>
                <p className="mt-1 text-sm text-slate-200">{tier.bestFor}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-teal px-4 py-2 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
                >
                  Schedule Free Assessment
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 space-y-5">
          <h2 className="text-2xl font-semibold text-foreground">From Consultation to Documentation in 3–7 Days</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, idx) => (
              <div
                key={step.title}
                className="relative overflow-hidden rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40"
              >
                <div className="absolute right-4 top-4 text-sm font-semibold text-brand-teal/60">{String(idx + 1).padStart(2, "0")}</div>
                <div className="mb-3 h-0.5 w-14 rounded-full bg-brand-teal/40" aria-hidden />
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
            <h2 className="text-2xl font-semibold text-foreground">Professional Expertise Without the Enterprise Price Tag</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
            <h2 className="text-2xl font-semibold text-foreground">What You Receive</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14 space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-md shadow-black/30">
          <h2 className="text-2xl font-semibold text-foreground">Common Questions</h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-200">
            {faqs.map((item) => (
              <div key={item.q}>
                <p className="font-semibold text-foreground">{item.q}</p>
                <p className="mt-1">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-md shadow-black/30">
          <h2 className="text-2xl font-semibold text-foreground">Ready to Get Started?</h2>
          <p className="text-sm text-slate-200">
            Schedule your free 15-minute consultation. We’ll recommend the right package and answer your questions.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
            >
              Schedule Free Assessment
            </Link>
            <Link
              href="tel:+18666572383"
              className="inline-flex items-center justify-center rounded-full border border-brand-teal/70 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              Call (866) 657-2383
            </Link>
          </div>
        </section>

        <section className="mt-14 space-y-3">
          <h3 className="text-xl font-semibold text-foreground">Related Room Types</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-4 text-sm font-semibold text-brand-teal shadow-md shadow-black/40 transition hover:-translate-y-0.5 hover:border-brand-teal"
              >
                {item.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
