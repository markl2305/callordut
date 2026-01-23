import Link from "next/link";
import type { Metadata } from "next";
import { CTASection } from "../../components/CTASection";
import { GlassPanel } from "../../components/GlassPanel";

export const metadata: Metadata = {
  title: "Remote Installation Project Management | CalLord UT",
  description:
    "We coordinate your preferred installers, punch lists, and commissioning so you don’t have to babysit the AV or security install.",
};

const bestFor = [
  "Owners & operators with trusted installers",
  "GCs / architects juggling many trades",
  "IT teams responsible for rooms after turnover",
  "Multi-site rollouts that need consistency",
];

const deliverables = [
  "Bid and scope review against the design intent",
  "Installer coordination, RFIs, and schedule alignment",
  "Punch lists, commissioning checklists, and QA",
  "Remote or on-site support during install",
  "As-built documentation, warranty packets, and training handoffs",
  "Issue tracking until leadership signs off",
];

const optionalUpgrades = [
  "On-site punch list visits",
  "Video walkthroughs + recorded commissioning sessions",
  "Template libraries for future GC partners",
  "Proactive maintenance + expansion planning",
];

const roleBenefits = [
  {
    title: "For owners",
    bullets: ["Plain-language updates tied to budget + timeline", "Risk tracking so you can escalate before it’s critical"],
  },
  {
    title: "For GCs / architects",
    bullets: ["Submittal + mark-up management", "Coordination meetings handled by someone who speaks AV + security"],
  },
  {
    title: "For IT teams",
    bullets: ["Network + naming standards enforced", "Documentation + training so IT can support the room day two"],
  },
];

const otherServices = [
  {
    title: "AV Integration & Systems",
    copy: "Let us manage installers while the AV design stays locked and consistent across every site.",
    href: "/services/av-integration",
  },
  {
    title: "Smart Room Design & Documentation",
    copy: "Once the smart-room recipe is defined, remote PM keeps installers honest and handoffs clean.",
    href: "/services/smart-rooms",
  },
];

export default function ProjectManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_35px_110px_-60px_rgba(0,0,0,0.9)] lg:px-12 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Core service</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Remote Installation Project Management
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted lg:text-xl">
            Keep the installers you trust. We handle the technical coordination, issue tracking, and documentation so every AV, smart room, or
            security rollout feels turnkey—without you becoming an integrator.
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
              Back to all services
            </Link>
          </div>
        </section>

        <section className="mt-20 space-y-6 lg:mt-28">
          <h2 className="text-2xl font-semibold">Who this is for</h2>
          <div className="flex flex-wrap gap-2">
            {bestFor.map((item) => (
              <span key={item} className="rounded-full border border-brand-teal/50 px-4 py-2 text-sm font-semibold text-brand-teal">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:mt-28 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
            <h3 className="text-2xl font-semibold">What we deliver</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              We become the remote PM desk for AV, smart room, and security scopes—reviewing bids, chasing subs, signing off on punch lists,
              and packaging everything for leadership sign-off. You get one contact who speaks technical and operator language.
            </p>
          </div>
          <GlassPanel title="Deliverables" className="shadow-[0_20px_60px_-50px_rgba(242,232,220,0.35)]">
            <ul className="space-y-2 text-sm">
              {deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-400" aria-hidden />
                  <span className="leading-relaxed text-slate-200">{deliverable}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </section>

        <section className="mt-20 space-y-4 lg:mt-28">
          <h3 className="text-2xl font-semibold">Optional program layers</h3>
          <ul className="space-y-2 text-sm text-muted">
            {optionalUpgrades.map((upgrade) => (
              <li key={upgrade} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                <span>{upgrade}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 space-y-6 lg:mt-24">
          <h3 className="text-2xl font-semibold">For owners, GCs, and IT</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {roleBenefits.map((role) => (
              <div key={role.title} className="rounded-2xl border border-brand-sand/60 bg-brand-sand/30 p-5 text-brand-slate shadow-[0_20px_60px_-50px_rgba(242,232,220,0.8)]">
                <p className="text-base font-semibold">{role.title}</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-8 lg:mt-24">
          <h3 className="text-2xl font-semibold">How it fits with the other services</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {otherServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-sm text-slate-100 shadow-md shadow-black/40 transition hover:-translate-y-0.5 hover:border-brand-teal/50"
              >
                <p className="text-base font-semibold text-foreground">{service.title}</p>
                <p className="mt-2 leading-relaxed text-slate-200">{service.copy}</p>
              </Link>
            ))}
          </div>
        </section>

        <CTASection
          title="Ready to plan your remote project management play?"
          subtitle="Send us the installer roster, scopes, and schedule—we’ll build the coordination plan and keep everyone honest."
          primaryLabel="Schedule Free Assessment"
          primaryHref="/contact"
        />
      </main>
    </div>
  );
}
