import type { Metadata } from "next";
import { CTASection } from "../../components/CTASection";
import { PageHero, Section, Cards, Dashes } from "../../components/system/Blocks";

export const metadata: Metadata = {
  title: "Cloud-Native Physical Security for Banks & Credit Unions",
  description:
    "AI-powered video surveillance and cloud access control for banks and credit unions, designed and deployed by CalLord Unified Technologies using Eagle Eye Networks and Brivo.",
};

const trustStrip = [
  "Cloud-native security architecture",
  "Designed for branches, ATMs, and operations centers",
  "Centralized visibility across all locations",
  "Reduced reliance on legacy on-prem systems",
];

const coreCapabilities = [
  {
    title: "AI Video Surveillance (Eagle Eye Networks)",
    bullets: [
      "AI-powered alerts for unusual activity",
      "Smart search across all cameras",
      "Centralized monitoring for branches and ATMs",
      "Secure cloud video storage",
    ],
  },
  {
    title: "Cloud Access Control (Brivo)",
    bullets: [
      "Centralized door and credential management",
      "Mobile and role-based access",
      "Instant access changes without site visits",
      "Full access event logging",
    ],
  },
  {
    title: "Unified Security Platform",
    bullets: [
      "Video and access events in one system",
      "Faster investigations and incident review",
      "Improved accountability and reporting",
      "Reduced operational complexity",
    ],
  },
  {
    title: "Compliance & Reliability",
    bullets: [
      "Designed for regulated financial environments",
      "Cloud redundancy and uptime",
      "Simplified audit and evidence retrieval",
      "Reduced risk from aging infrastructure",
    ],
  },
];

const useCases = [
  "Branch and lobby security",
  "ATM monitoring and fraud investigation",
  "After-hours access auditing",
  "Incident review and evidence export",
  "Centralized security management",
];

const whyCallord = [
  "Experience with banking and regulated clients",
  "Vendor-certified deployment and support",
  "Clean migrations from legacy DVR/NVR systems",
  "Design-first, security-focused approach",
  "Ongoing service and lifecycle support",
];

export default function FinancialInstitutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Financial institutions"
        title="Cloud-Native Physical Security for"
        accent="Banks &amp; Credit Unions"
        lead={
          <>
            <p>AI-powered video surveillance and access control, designed and deployed by CalLord Unified Technologies.</p>
            <p>
              CalLord Unified Technologies designs and deploys modern, cloud-native physical security systems for financial institutions. By
              combining Eagle Eye Networks&apos; AI video surveillance with Brivo&apos;s cloud access control, we deliver a unified security platform
              built for today&apos;s banking environment.
            </p>
          </>
        }
        primary={{ label: "Schedule Free Assessment", href: "/contact" }}
        secondary={{ label: "See the Platform", href: "#platform" }}
      />

      <Section mark="Trust strip" title="Built for regulated environments." accent="Designed for distributed banking." split>
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
        title="So Much More Than Cameras"
        lead={
          <>
            <p>Modern banking security requires more than video recording. It requires intelligence, visibility, and control.</p>
            <p>
              By integrating Eagle Eye&apos;s AI-powered cloud video with Brivo&apos;s cloud access control, CalLord delivers a unified security system
              that improves safety, speeds investigations, and simplifies operations.
            </p>
          </>
        }
      />

      <Section title="Core Capabilities">
        <Cards cols={2} items={coreCapabilities.map((capability) => ({ title: capability.title, bullets: capability.bullets }))} />
      </Section>

      <Section tone="cream" title="Designed for Real-World Banking Operations" split>
        <Dashes items={useCases.map((item) => ({ text: item }))} />
      </Section>

      <Section
        title="Why Financial Institutions Choose CalLord"
        lead={
          <p>
            CalLord Unified Technologies is a trusted security integrator for regulated environments. We design, deploy, and support physical
            security systems that scale with your institution and adapt to evolving threats.
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
            CalLord partners with Eagle Eye Networks and Brivo to deliver a complete cloud-native security solution — combining AI video
            surveillance and modern access control into a single, cohesive platform.
          </p>
        }
      />

      <CTASection
        title="Let’s Modernize Your Security Infrastructure"
        subtitle="If your institution is ready to move beyond legacy security systems, CalLord can help you design and deploy a modern, cloud-native solution."
        primaryLabel="Schedule Free Assessment"
        primaryHref="/contact"
      />
    </>
  );
}
