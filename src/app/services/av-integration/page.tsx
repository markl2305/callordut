import type { Metadata } from "next";
import { CTASection } from "../../components/CTASection";
import { GlassPanel } from "../../components/GlassPanel";
import { PageHero, Section, Cards, Dashes } from "../../components/system/Blocks";

export const metadata: Metadata = {
  title: "AV Integration & Conference Room Systems | CalLord UT",
  description:
    "Design-led AV integration for conference rooms, hybrid boardrooms, and training spaces. Clear documentation, rock-solid joins, and systems your operators actually trust.",
};

const bestFor = [
  "Executive leaders & boardrooms",
  "Small & mid-sized businesses",
  "Multi-site teams with remote staff",
  "Operators who need repeatable rooms",
];

const deliverables = [
  "Room discovery sessions and requirements gathering",
  "Equipment lists with procurement-ready detail",
  "Display, audio, microphone, and camera layout drawings",
  "Control strategy mapped to presets and user roles",
  "Rack elevation, cabling, and network coordination",
  "Commissioning plans plus as-built documentation",
  "Operator training handoff with recordings and cheat sheets",
];

const optionalUpgrades = [
  "Dual or panoramic displays for hybrid collaboration",
  "Multi-camera speaker tracking and framing",
  "Lighting + shade presets tied to the control surface",
  "Environmental monitoring and occupancy insights",
  "Room booking signage tied to Teams/Google/365",
];

const otherServices = [
  {
    title: "Smart Room Design & Documentation",
    copy: "Document the rooms, telehealth suites, and pods so every site looks like HQ without flying out the whole team.",
    href: "/services/smart-rooms",
  },
  {
    title: "Remote Installation Project Management",
    copy: "Keep your preferred installers while we quarterback bids, punch lists, and sign-off for every room.",
    href: "/services/project-management",
  },
];

export default function AvIntegrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Core service"
        title="AV Integration & Systems"
        lead={
          <p>
            Conference rooms, collaboration spaces, and pods that feel like a finished product—not a science project. We standardize the
            display/audio/mic mix, dial in the control flow, and hand you documentation that survives leadership turnover.
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
            We treat every room like a mini product release. That means discovery with the people who actually have to host the call,
            design packages that installers can follow, and documentation that lets you replicate the space across locations.
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

      <Section title="Optional upgrades & variants">
        <Dashes cols={2} items={optionalUpgrades.map((upgrade) => ({ text: upgrade }))} />
      </Section>

      <Section tone="cream" title="How it fits with the other services">
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
        title="Ready to plan your AV integration?"
        subtitle="Tell us which rooms or campuses need help and we’ll build a phased roadmap based on your gear, timeline, and operators."
        primaryLabel="Schedule Free Assessment"
        primaryHref="/contact"
      />
    </>
  );
}
