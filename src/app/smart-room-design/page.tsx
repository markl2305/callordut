import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Cards, Dashes, Sequence, LinkRow, CloseBand } from "../components/system/Blocks";

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
  { lead: "Fast delivery:", text: "Start procurement quickly with 3–7 day turnaround" },
  { lead: "Budget certainty:", text: "Fixed pricing — no hourly surprises" },
  { lead: "Installer-ready:", text: "Complete drawings and schedules ready to bid" },
  { lead: "Vendor-neutral:", text: "Specs you can bid competitively with any installer" },
  { lead: "Scalable:", text: "Ideal for multi-location rollouts and standards" },
  { lead: "Clear execution:", text: "Complete cable schedules and setup steps" },
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
    <>
      <PageHero
        eyebrow="Delivered in 3–7 Days"
        title="Professional Conference Room"
        accent="Design"
        lead={
          <>
            <p>
              Complete D-Tools documentation, equipment specifications, signal flow diagrams, and installation guidance. 100% remote delivery.
              Nationwide. Fixed pricing. No surprises. No hidden fees.
            </p>
            <p>
              <strong>Fixed pricing. No surprises. No hidden fees.</strong>
            </p>
          </>
        }
        primary={{ label: "Schedule Free Assessment", href: "/contact" }}
        secondary={{ label: "See Packages", href: "#pricing" }}
      />

      <Section
        title="You've Seen It Before"
        lead={<p>Meetings delayed. Technology that doesn&apos;t work. Frustrated teams.</p>}
        split
      >
        <Dashes
          items={[
            { lead: "Echoes and feedback ruin meetings.", text: "Proper mic/DSP design fixes it at the source." },
            { lead: "HDMI hunting wastes time.", text: "Clean signal routing makes sharing instant." },
            { lead: "Confusing controls kill adoption.", text: "We design for simplicity and provide user guides." },
          ]}
        />
        <div className="cl-cardx cl-cardx-accent cl-reveal" style={{ marginTop: 24 }}>
          <p className="cl-cardx-body">
            <strong>Bottom line: most AV failures begin at the design stage. Professional system design prevents them before they start.</strong>
          </p>
        </div>
      </Section>

      <Section
        id="pricing"
        tone="cream"
        title="Choose Your Package"
        lead={<p>Select the package that fits your room size and complexity. All include complete D-Tools documentation and installation guidance.</p>}
      >
        <Cards
          cols={3}
          items={pricing.map((tier) => ({
            k: tier.badge,
            title: tier.name,
            body: (
              <>
                <p className="cl-h2" style={{ margin: "4px 0 6px" }}>
                  {tier.price}
                </p>
                <p>{tier.bestFor}</p>
              </>
            ),
            bullets: tier.includes,
            extra: (
              <div className="cl-actions" style={{ marginTop: "auto", paddingTop: 20 }}>
                <Link className="cl-btn cl-btn-teal" href="/contact">
                  Schedule Free Assessment
                </Link>
              </div>
            ),
          }))}
        />
      </Section>

      <Section title="From Consultation to Documentation in 3–7 Days">
        <Sequence
          steps={process.map((step, idx) => ({
            n: String(idx + 1).padStart(2, "0"),
            title: step.title,
            body: <p>{step.body}</p>,
          }))}
        />
      </Section>

      <Section tone="cream" title="Professional Expertise Without the Enterprise Price Tag" split>
        <Dashes items={benefits} />
      </Section>

      <Section title="What You Receive">
        <Dashes cols={2} items={deliverables.map((item) => ({ text: item }))} />
      </Section>

      <Section tone="cream" title="Common Questions">
        <Cards cols={2} items={faqs.map((item) => ({ title: item.q, body: <p>{item.a}</p> }))} />
      </Section>

      <Section title="Related Room Types">
        <LinkRow links={related.map((item) => ({ label: `${item.label} →`, href: item.href }))} />
      </Section>

      <CloseBand
        title="Ready to"
        accent="Get Started?"
        lead={<p>Schedule your free 15-minute consultation. We&apos;ll recommend the right package and answer your questions.</p>}
        primary={{ label: "Schedule Free Assessment", href: "/contact" }}
        secondary={{ label: "Call (505) 520-1779", href: "tel:+15055201779" }}
      />
    </>
  );
}
