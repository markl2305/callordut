import type { Metadata } from "next";
import { CTASection } from "../../components/CTASection";
import { GlassPanel } from "../../components/GlassPanel";
import { PageHero, Section, Cards, Dashes } from "../../components/system/Blocks";

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
    <>
      <PageHero
        eyebrow="Core service"
        title="Remote Installation Project Management"
        lead={
          <p>
            Keep the installers you trust. We handle the technical coordination, issue tracking, and documentation so every AV, smart room, or
            security rollout feels turnkey—without you becoming an integrator.
          </p>
        }
        primary={{ label: "Schedule Free Assessment", href: "/contact" }}
        secondary={{ label: "Back to all services", href: "/services" }}
       />

      <Section title="Who this is for">
        <div className="cl-chips cl-reveal">
          {bestFor.map((item) => (
            <span key={item} className="cl-chip">
              {item}
            </span>
          ))}
        </div>
      </Section>

      <Section
        tone="cream"
        title="What we deliver"
        lead={
          <p>
            We become the remote PM desk for AV, smart room, and security scopes—reviewing bids, chasing subs, signing off on punch lists,
            and packaging everything for leadership sign-off. You get one contact who speaks technical and operator language.
          </p>
        }
        split
      >
        <GlassPanel title="Deliverables">
          <ul className="cl-dash">
            {deliverables.map((deliverable) => (
              <li key={deliverable}>{deliverable}</li>
            ))}
          </ul>
        </GlassPanel>
      </Section>

      <Section title="Optional program layers">
        <Dashes cols={2} items={optionalUpgrades.map((upgrade) => ({ text: upgrade }))} />
      </Section>

      <Section tone="cream" title="For owners, GCs, and IT">
        <Cards cols={3} items={roleBenefits.map((role) => ({ title: role.title, bullets: role.bullets }))} />
      </Section>

      <Section tone="paper" title="How it fits with the other services">
        <Cards
          cols={2}
          items={otherServices.map((service) => ({
            title: service.title,
            body: <p>{service.copy}</p>,
            href: service.href,
          }))}
        />
      </Section>

      <CTASection
        title="Ready to plan your remote project management play?"
        subtitle="Send us the installer roster, scopes, and schedule—we’ll build the coordination plan and keep everyone honest."
        primaryLabel="Schedule Free Assessment"
        primaryHref="/contact"
      />
    </>
  );
}
