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
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_35px_110px_-60px_rgba(0,0,0,0.9)] lg:px-12 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Custom solutions</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">Tailored AV & security for unique spaces.</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            When your venue, hospitality concept, or custom build doesn’t fit a room template, CalLord maps every detail—from infrastructure
            to control surfaces—so the finished experience feels intentional and scalable.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)]"
            >
              Schedule Free Assessment
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-brand-teal/70 px-6 py-3 text-base font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              Back to services
            </Link>
          </div>
        </section>

        <section className="mt-20 space-y-6 lg:mt-28">
          <h2 className="text-2xl font-semibold">Where custom work makes sense</h2>
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
            <ul className="space-y-3 text-sm text-slate-200">
              {scenarios.map((scenario) => (
                <li key={scenario} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                  <span className="leading-relaxed">{scenario}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20 space-y-6 lg:mt-28">
          <h2 className="text-2xl font-semibold">What’s included</h2>
          <div className="rounded-3xl border border-brand-sand/60 bg-brand-sand/30 p-6 text-brand-slate shadow-[0_20px_60px_-50px_rgba(242,232,220,0.8)]">
            <ul className="space-y-3 text-sm text-slate-700">
              {inclusions.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20 space-y-6 lg:mt-28">
          <h2 className="text-2xl font-semibold">Why teams choose us for custom work</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason} className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40">
                <p className="text-sm leading-relaxed text-slate-200">{reason}</p>
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
