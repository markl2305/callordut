import { CTASection } from "../../components/CTASection";
import { PageHero, Section, Cards, Dashes } from "../../components/system/Blocks";

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
    <>
      <PageHero
        eyebrow="Custom solutions"
        title="Tailored AV & security for"
        accent="unique spaces."
        lead={
          <p>
            When your venue, hospitality concept, or custom build doesn’t fit a room template, CalLord maps every detail—from infrastructure
            to control surfaces—so the finished experience feels intentional and scalable.
          </p>
        }
        primary={{ label: "Schedule Free Assessment", href: "/contact" }}
        secondary={{ label: "Back to services", href: "/services" }}
      />

      <Section title="Where custom work makes sense" split>
        <Dashes items={scenarios.map((scenario) => ({ text: scenario }))} />
      </Section>

      <Section tone="cream" title="What’s included" split>
        <Dashes items={inclusions.map((item) => ({ text: item }))} />
      </Section>

      <Section title="Why teams choose us for custom work">
        <Cards cols={2} items={reasons.map((reason) => ({ body: <p>{reason}</p> }))} />
      </Section>

      <CTASection
        title="Ready to map a unique space?"
        subtitle="Share drawings, mood boards, or a rough vision—we’ll translate it into a buildable plan and coordinate the right partners."
        primaryLabel="Schedule Free Assessment"
        primaryHref="/contact"
      />
    </>
  );
}
