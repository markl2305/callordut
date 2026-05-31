import Link from "next/link";
import { CTASection } from "../../components/CTASection";

const scenarios = [
  "Boutique hospitality venues and speakeasies with non-standard footprints",
  "Mixed-use spaces that need to shift between live events, meetings, and member experiences",
  "Historic or architecturally sensitive rooms where infrastructure must disappear",
  "Large custom facilities that blend retail, operations, and compliance zones",
];

const inclusions = [
  "Custom discovery sessions with architects, fabricators, and operations teams",
  "Infrastructure planning for power, network, acoustics, and concealment",
  "Detailed drawings, elevations, and equipment schedules tailored to unique constraints",
  "End-to-end project management with installer coordination and remote commissioning",
  "Support plans so unusual builds stay maintainable long-term",
];

const reasons = [
  "We translate big creative visions into grounded infrastructure plans engineers can sign off on.",
  "AV, lighting, signage, and security are documented together so the final experience feels intentional.",
  "Scalability and serviceability are built in from day one—even when the space is one-of-a-kind.",
  "Hospitality-friendly support: operators get clear playbooks and a single point of contact for tweaks.",
];

export default function CustomSolutionsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="border border-rule bg-cream px-6 py-14 lg:px-12 lg:py-20">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal">Custom solutions</p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">Tailored AV & security for unique spaces.</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            When your venue, hospitality concept, or custom build doesn’t fit a room template, CalLord maps every detail—from infrastructure
            to control surfaces—so the finished experience feels intentional and scalable.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="h-btn bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
            >
              Schedule Free Assessment
            </Link>
            <Link
              href="/services"
              className="h-btn border border-ink bg-transparent px-6 py-3.5 text-sm font-medium text-ink"
            >
              Back to services
            </Link>
          </div>
        </section>

        <section className="mt-20 space-y-6 lg:mt-28">
          <h2 className="font-serif text-2xl font-normal text-ink">Where custom work makes sense</h2>
          <div className="border border-rule bg-cream p-6 text-ink">
            <ul className="space-y-3 text-sm text-ink-soft">
              {scenarios.map((scenario) => (
                <li key={scenario} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
                  <span className="leading-relaxed">{scenario}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20 space-y-6 lg:mt-28">
          <h2 className="font-serif text-2xl font-normal text-ink">What’s included</h2>
          <div className="border border-rule bg-cream-deep p-6 text-ink">
            <ul className="space-y-3 text-sm text-ink-soft">
              {inclusions.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20 space-y-6 lg:mt-28">
          <h2 className="font-serif text-2xl font-normal text-ink">Why teams choose us for custom work</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason} className="border border-rule bg-cream p-5 text-ink">
                <p className="text-sm leading-relaxed text-ink-soft">{reason}</p>
              </div>
            ))}
          </div>
        </section>

        <CTASection
          title="Ready to map a unique space?"
          subtitle="Share drawings, mood boards, or a rough vision—we’ll translate it into a buildable plan and coordinate the right partners."
          primaryLabel="Schedule Free Assessment"
          primaryHref="/contact"
        />
      </main>
    </div>
  );
}
