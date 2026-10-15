import type { Metadata } from "next";
import { CTASection } from "../../components/CTASection";
import { PageHero, Section, Cards, Dashes } from "../../components/system/Blocks";

export const metadata: Metadata = {
  title: "Cloud-Native Security for Multifamily Communities",
  description:
    "AI-powered video surveillance and cloud access control for multifamily properties, designed and deployed by CalLord Unified Technologies using Eagle Eye Networks and Brivo.",
};

const trustStrip = [
  "Cloud-native, centrally managed security",
  "Ideal for apartments, condos, and mixed-use",
  "Supports single sites or multi-property portfolios",
  "Reduces on-site infrastructure and maintenance",
];

const coreCapabilities = [
  {
    title: "AI Video Surveillance (Eagle Eye Networks)",
    bullets: [
      "AI-based alerts for loitering, motion, and unusual activity",
      "Smart search across all cameras",
      "Centralized monitoring for entrances, parking, and common areas",
      "Secure cloud video storage",
    ],
  },
  {
    title: "Cloud Access Control (Brivo)",
    bullets: [
      "Centralized access management for buildings and amenities",
      "Mobile credentials for residents and staff",
      "Role-based permissions for leasing, maintenance, and vendors",
      "Full access event logs",
    ],
  },
  {
    title: "Unified Security Platform",
    bullets: [
      "Video and access events in one system",
      "Faster incident review and resolution",
      "Improved accountability",
      "Reduced operational overhead",
    ],
  },
  {
    title: "Portfolio-Ready & Reliable",
    bullets: ["Designed for multi-property management", "Cloud redundancy and uptime", "Easier audits and reporting", "Scales without adding on-site servers"],
  },
];

const useCases = [
  "Building and unit entry monitoring",
  "Parking garages and common areas",
  "After-hours access tracking",
  "Incident investigation and evidence export",
  "Centralized management across properties",
];

const whyCallord = [
  "Experience with multifamily and mixed-use properties",
  "Certified deployment and support",
  "Clean upgrades from legacy systems",
  "Design-first approach",
  "Ongoing service and lifecycle support",
];

export default function MultifamilySecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Multifamily"
        title="Cloud-Native Security for"
        accent="Multifamily Communities"
        lead={
          <>
            <p>AI-powered video surveillance and modern access control for apartments, condos, and mixed-use properties.</p>
            <p>
              CalLord Unified Technologies designs and deploys cloud-native physical security systems for multifamily properties. By combining Eagle Eye
              Networks&apos; AI video surveillance with Brivo&apos;s cloud access control, we deliver a unified platform that improves safety, visibility, and
              resident experience.
            </p>
          </>
        }
        primary={{ label: "Schedule Free Assessment", href: "/contact" }}
        secondary={{ label: "See the Platform", href: "#platform" }}
      />

      <Section mark="Trust strip" title="Designed for modern properties." accent="Built to scale across portfolios." split>
        <div className="cl-chips cl-reveal">
          {trustStrip.map((item) => (
            <span key={item} className="cl-chip">
              {item}
            </span>
          ))}
        </div>
      </Section>

      <Section
        tone="cream"
        title="More Than Cameras. Real Security Intelligence."
        lead={
          <>
            <p>Multifamily security requires more than recording video. It requires insight, control, and fast response.</p>
            <p>
              By integrating Eagle Eye&apos;s AI-powered cloud video with Brivo&apos;s cloud access control, CalLord delivers a unified security system that
              helps protect residents, staff, and property while simplifying operations.
            </p>
          </>
        }
      />

      <Section title="Core Capabilities">
        <Cards cols={2} items={coreCapabilities.map((capability) => ({ title: capability.title, bullets: capability.bullets }))} />
      </Section>

      <Section tone="cream" title="Built for Real-World Multifamily Operations" split>
        <Dashes items={useCases.map((item) => ({ text: item }))} />
      </Section>

      <Section
        title="Why Property Owners Choose CalLord"
        lead={
          <p>
            CalLord Unified Technologies designs and deploys security systems that work in the real world. We focus on clean design, reliable
            deployment, and long-term support for property owners and managers.
          </p>
        }
        split
      >
        <Cards cols={2} items={[{ title: "What you can expect", bullets: whyCallord }]} />
      </Section>

      <Section
        id="platform"
        tone="cream"
        title="Industry-Leading Platforms."
        accent="One Unified System."
        lead={
          <p>
            CalLord partners with Eagle Eye Networks and Brivo to deliver a complete cloud-native security solution that combines AI video
            surveillance and modern access control into a single, cohesive platform.
          </p>
        }
      />

      <CTASection
        title="Modernize Your Multifamily Security"
        subtitle="Whether you manage a single building or a full portfolio, CalLord can design and deploy a modern security system built for today's multifamily environments."
        primaryLabel="Schedule Free Assessment"
        primaryHref="/contact"
      />
    </>
  );
}
