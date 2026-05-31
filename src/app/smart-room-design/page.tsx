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
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-16 lg:px-0">

        {/* Hero */}
        <FadeIn>
          <section className="bg-cream border border-rule p-8 lg:px-12 lg:py-16">
            <div>
              <h1 className="font-serif text-4xl font-normal leading-tight sm:text-5xl text-ink">
                <span className="text-teal">Professional Conference Room</span> Design
              </h1>
              <p className="mt-2 text-lg font-medium text-teal">Delivered in 3–7 Days</p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
                Complete D-Tools documentation, equipment specifications, signal flow diagrams, and installation guidance. 100% remote delivery.
                Nationwide. Fixed pricing. No surprises. No hidden fees.
              </p>
              <p className="mt-3 text-sm font-medium text-ink">Fixed pricing. No surprises. No hidden fees.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="h-btn bg-teal px-6 py-3.5 text-sm font-medium text-on-teal">
                  Schedule Free Assessment
                </Link>
                <Link href="#pricing" className="h-btn border border-ink px-6 py-3.5 text-sm font-medium text-ink">
                  See Packages
                </Link>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Pain Points */}
        <FadeIn className="mt-14">
          <section className="bg-cream border border-rule p-8">
            <h2 className="font-serif text-2xl font-normal text-ink">You've Seen It Before</h2>
            <p className="mt-2 text-sm text-ink-soft">Meetings delayed. Technology that doesn't work. Frustrated teams.</p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
              <p><strong className="text-ink">Echoes and feedback ruin meetings.</strong> Proper mic/DSP design fixes it at the source.</p>
              <p><strong className="text-ink">HDMI hunting wastes time.</strong> Clean signal routing makes sharing instant.</p>
              <p><strong className="text-ink">Confusing controls kill adoption.</strong> We design for simplicity and provide user guides.</p>
              <p className="font-medium text-ink">Bottom line: most AV failures begin at the design stage. Professional system design prevents them before they start.</p>
            </div>
          </section>
        </FadeIn>

        {/* Pricing */}
        <section id="pricing" className="mt-14 space-y-5">
          <FadeIn>
            <h2 className="font-serif text-2xl font-normal text-ink">Choose Your Package</h2>
            <p className="text-sm text-ink-soft">Select the package that fits your room size and complexity. All include complete D-Tools documentation and installation guidance.</p>
          </FadeIn>
          <Stagger className="grid gap-4 lg:grid-cols-3">
            {pricing.map((tier) => (
              <StaggerItem key={tier.name}>
                <div className="flex h-full flex-col">
                  <div className="flex h-full flex-col bg-cream border border-rule p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl font-normal text-ink">{tier.name}</h3>
                      {tier.badge ? (
                        <span className="bg-teal/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-teal">{tier.badge}</span>
                      ) : null}
                    </div>
                    <p className="mt-2 font-serif text-3xl font-normal text-teal">{tier.price}</p>
                    <p className="mt-1 text-sm text-ink-soft">{tier.bestFor}</p>
                    <ul className="mt-4 flex-1 space-y-2 text-sm text-ink-soft">
                      {tier.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-teal" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="h-btn mt-6 inline-flex items-center justify-center bg-teal px-6 py-3.5 text-sm font-medium text-on-teal">
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
            <h2 className="font-serif text-2xl font-normal text-ink">From Consultation to Documentation in 3–7 Days</h2>
          </FadeIn>
          <Stagger className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, idx) => (
              <StaggerItem key={step.title}>
                <div className="h-hover-cream bg-cream border border-rule p-5 h-full">
                  <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-teal/40">{String(idx + 1).padStart(2, "0")}</div>
                  <h3 className="font-serif text-lg font-normal text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Benefits + Deliverables */}
        <FadeIn className="mt-14">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-cream border border-rule p-6">
              <h2 className="font-serif text-2xl font-normal text-ink">Professional Expertise Without the Enterprise Price Tag</h2>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                {benefits.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-cream border border-rule p-6">
              <h2 className="font-serif text-2xl font-normal text-ink">What You Receive</h2>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* FAQ */}
        <FadeIn className="mt-14">
          <section className="bg-cream border border-rule p-8">
            <h2 className="font-serif text-2xl font-normal text-ink">Common Questions</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              {faqs.map((item) => (
                <div key={item.q}>
                  <p className="font-medium text-ink">{item.q}</p>
                  <p className="mt-1 text-ink-soft">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* CTA */}
        <FadeIn className="mt-14">
          <section className="bg-ink p-8">
            <h2 className="font-serif text-2xl font-normal text-paper">Ready to Get Started?</h2>
            <p className="mt-2 text-sm text-paper/70">Schedule your free 15-minute consultation. We'll recommend the right package and answer your questions.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="h-btn bg-teal px-6 py-3.5 text-sm font-medium text-on-teal">
                Schedule Free Assessment
              </Link>
              <Link href="tel:+18666572383" className="h-btn border border-paper px-6 py-3.5 text-sm font-medium text-paper">
                Call (866) 657-2383
              </Link>
            </div>
          </section>
        </FadeIn>

        {/* Related */}
        <FadeIn className="mt-14">
          <h3 className="font-serif text-xl font-normal text-ink">Related Room Types</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link key={item.href} href={item.href} className="h-hover-cream bg-cream border border-rule p-4 text-sm font-medium text-teal">
                {item.label} →
              </Link>
            ))}
          </div>
        </FadeIn>
      </main>
    </div>
  );
}
