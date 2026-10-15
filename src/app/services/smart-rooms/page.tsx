import type { Metadata } from "next";
import { CTASection } from "../../components/CTASection";
import { GlassPanel } from "../../components/GlassPanel";
import { PageHero, Section, Cards, Dashes, Figure } from "../../components/system/Blocks";

export const metadata: Metadata = {
  title: "Smart Room Design & Documentation | CalLord UT",
  description:
    "Virtual visit suites, hybrid offices, and immersive rooms documented with drawings, elevations, and touchpanel flows so every operator knows what to expect.",
};

const bestFor = [
  "Senior living & healthcare",
  "Small & mid-sized businesses",
  "Remote-first teams",
  "Executive assistants / operations leaders",
];

const deliverables = [
  "Discovery workshops and journey mapping",
  "Platform-agnostic design (Teams, Zoom, Meet, telehealth)",
  "Camera, microphone, and lighting placement for real conversations",
  "Room storyboard + signage so operators know exactly what happens",
  "Drawings, elevations, and spec sheets for installers",
  "Training materials, videos, and laminated quick guides",
];

const optionalUpgrades = [
  "Room booking panels tied to Teams/Google/365",
  "Occupancy sensors + analytics dashboards",
  "Environmental controls (lighting, shades, HVAC scenes)",
  "Assistive listening + translation feeds",
  "Brand-forward signage + wayfinding",
];

const otherServices = [
  {
    title: "AV Integration & Systems",
    copy: "When the room needs custom control or large-format displays, the AV team ensures it matches the rest of your fleet.",
    href: "/services/av-integration",
  },
  {
    title: "Remote Installation Project Management",
    copy: "Use your preferred local installers while we quarterback punch lists, QA, and documentation for each smart room rollout.",
    href: "/services/project-management",
  },
];

export default function SmartRoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Core service"
        title="Smart Room Design & Documentation"
        lead={
          <p>
            Virtual visit suites, hybrid pods, and executive spaces become effortless when the choreography, signage, and documentation are in place.
            We design the room experience and leave a repeatable recipe so every site feels familiar.
          </p>
        }
        primary={{ label: "Schedule Free Assessment", href: "/contact" }}
        secondary={{ label: "Back to all services", href: "/services" }}
      >
        <Figure
          src="/smart-room-virtual-visit-interior.png"
          alt="Small hybrid meeting room with display and camera"
          priority
          ratio="16 / 7"
        />
      </PageHero>

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
            Smart rooms are defined by clarity: signage, touchpoints, and documentation that make staff feel confident. We prototype the
            experience, translate it into drawings and storyboards, and hand installers a package they can replicate anywhere.
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
        title="Ready to plan your next smart room rollout?"
        subtitle="Send us the rooms, use cases, and timeline—we’ll deliver the documentation and choreography that makes them effortless."
        primaryLabel="Schedule Free Assessment"
        primaryHref="/contact"
      />
    </>
  );
}
