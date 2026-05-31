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
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="border border-rule bg-cream px-6 py-14 lg:px-12 lg:py-20">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal">Core service</p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl lg:text-6xl">
            Remote Installation Project Management
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft lg:text-xl">
            Keep the installers you trust. We handle the technical coordination, issue tracking, and documentation so every AV, smart room, or
            security rollout feels turnkey—without you becoming an integrator.
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
              Back to all services
            </Link>
          </div>
        </section>

        <section className="mt-20 space-y-6 lg:mt-28">
          <h2 className="font-serif text-2xl font-normal text-ink">Who this is for</h2>
          <div className="flex flex-wrap gap-2">
            {bestFor.map((item) => (
              <span key={item} className="border border-rule px-4 py-2 text-sm font-medium text-teal">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:mt-28 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="border border-rule bg-cream p-6 text-ink">
            <h3 className="font-serif text-2xl font-normal text-ink">What we deliver</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              We become the remote PM desk for AV, smart room, and security scopes—reviewing bids, chasing subs, signing off on punch lists,
              and packaging everything for leadership sign-off. You get one contact who speaks technical and operator language.
            </p>
          </div>
          <GlassPanel title="Deliverables">
            <ul className="space-y-2 text-sm">
              {deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 bg-teal" aria-hidden />
                  <span className="leading-relaxed text-ink-soft">{deliverable}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </section>

        <section className="mt-20 space-y-4 lg:mt-28">
          <h3 className="font-serif text-2xl font-normal text-ink">Optional program layers</h3>
          <ul className="space-y-2 text-sm text-ink-soft">
            {optionalUpgrades.map((upgrade) => (
              <li key={upgrade} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
                <span>{upgrade}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 space-y-6 lg:mt-24">
          <h3 className="font-serif text-2xl font-normal text-ink">For owners, GCs, and IT</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {roleBenefits.map((role) => (
              <div key={role.title} className="border border-rule bg-cream-deep p-5 text-ink">
                <p className="text-base font-medium text-ink">{role.title}</p>
                <ul className="mt-2 space-y-2 text-sm text-ink-soft">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 bg-teal" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-8 lg:mt-24">
          <h3 className="font-serif text-2xl font-normal text-ink">How it fits with the other services</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {otherServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="h-link border border-rule bg-cream p-5 text-sm text-ink transition hover:border-teal"
              >
                <p className="text-base font-medium text-ink">{service.title}</p>
                <p className="mt-2 leading-relaxed text-ink-soft">{service.copy}</p>
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
