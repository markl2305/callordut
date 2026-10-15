import Link from "next/link";
import Image from "next/image";
import { CTASection } from "../components/CTASection";
import { RoomTypesShowcase } from "../components/RoomTypesShowcase";
import { ServiceCard } from "../components/ServiceCard";
import { PageHero, Section, Cards, Dashes } from "../components/system/Blocks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | AV Integration, Smart Rooms & Security",
  description:
    "Explore CalLord’s core services: AV integration & systems, smart room design & documentation, remote installation project management, and custom solutions.",
};

const challenges = [
  {
    title: "Integration chaos",
    body: "Multiple vendors, unclear scopes, and undocumented gear make every upgrade feel risky.",
    solution: "We document the stack, specify partner platforms, and hand installers a kit of parts tied to each room type.",
  },
  {
    title: "Rooms that drift out of spec",
    body: "Executive and hospitality spaces lose polish after a few ad-hoc tweaks.",
    solution: "We storyboard the experience, capture as-built packages, and keep remote PM in the loop so every site mirrors HQ.",
  },
  {
    title: "Compliance + security pressure",
    body: "Regulated venues and member-based clubs need provable access and video history.",
    solution: "Security zones run on Eagle Eye Networks + Brivo with retention, credential, and audit trails baked in.",
  },
  {
    title: "Budget + staffing constraints",
    body: "Small teams can’t babysit AV crews or manage punch lists.",
    solution: "We stage rollouts, coordinate local installers, and stay available for support without bloating headcount.",
  },
];

const crossIndustryServices = [
  "Discovery & design workshops for rooms, venues, and member clubs.",
  "Room templates, elevations, and documentation you can hand to any installer.",
  "Security layouts, compliance audits, and inspection-ready packages.",
  "Remote installation project management with punch lists + commissioning videos.",
  "Support and maintenance retainer options as your footprint grows.",
];

const services = [
  {
    title: "AV Integration & Systems",
    description: "Rooms, displays, audio paths, and microphones that boot fast and work every time.",
    bullets: [
      "Discovery, requirements, and room templates",
      "Display, audio, microphone, and camera layout",
      "Control strategies from simplified presets to custom flows",
      "Commissioning and as-built documentation",
    ],
    href: "/services/av-integration",
    icon: <Image src="/services-av-integration-icon.png" alt="AV integration icon" width={48} height={48} className="h-12 w-12" />,
  },
  {
    title: "Smart Room Design & Documentation",
    description: "Virtual visit suites, hybrid rooms, and executive offices that guide the operator.",
    bullets: [
      "Room discovery and storyboarding",
      "Camera/mic placement and acoustics",
      "Platform-agnostic design (Teams, Zoom, Meet)",
      "Drawings, elevations, and training materials",
    ],
    href: "/services/smart-rooms",
    icon: <Image src="/services-smart-rooms-icon.png" alt="Smart room design icon" width={48} height={48} className="h-12 w-12" />,
  },
  {
    title: "Remote Project Management",
    description: "We coordinate your preferred installers so you keep control without babysitting the process.",
    bullets: [
      "Bid + scope review against design intent",
      "Installer coordination and punch lists",
      "Commissioning checklists and QA",
      "As-built packages and warranty handoff",
    ],
    href: "/services/project-management",
    icon: <Image src="/services-remote-project-management-icon.png" alt="Remote project management icon" width={48} height={48} className="h-12 w-12" />,
  },
  {
    title: "Custom Solutions & Hospitality",
    description: "Tailored AV + security for venues, member clubs, boutique hotels, and one-of-a-kind spaces.",
    bullets: [
      "Custom discovery with architects and creative teams",
      "Infrastructure planning so tech disappears into the design",
      "Room recipes for speakeasies, lounges, and mixed-use venues",
      "Full documentation plus remote coordination and support",
    ],
    href: "/services/custom-solutions",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M4 6h16M7 12h10M9 18h6" strokeLinecap="round" />
        <path d="M6 4v16M18 4v16" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="One partner for AV, smart rooms,"
        accent="and security."
        lead={
          <p>
            No more juggling AV vendors, IT contractors, and security integrators. CalLord designs the stack, documents every detail, and coordinates the install so your team can get back to actual work.
          </p>
        }
        primary={{ label: "Schedule Free Assessment", href: "/contact" }}
        secondary={{ label: "Explore room types", href: "#room-types" }}
      />

      <Section
        title="Tailored AV, smart rooms, and security for every environment"
        lead={
          <p>
            From small businesses and senior communities to hospitality venues and member clubs, we design cohesive systems that feel finished—without resurrecting industry silos.
          </p>
        }
      >
        <p className="cl-lead cl-reveal">
          Whether it’s a boardroom, a private speakeasy, or a statewide rollout of telehealth suites, the toolkit stays the same: documented design,
          repeatable room patterns, and support that extends well past day-one turnover.
        </p>
      </Section>

      <Section tone="cream">
        <Cards
          cols={2}
          items={[
            {
              title: "Common challenges",
              extra: (
                <Dashes items={challenges.map((item) => ({ lead: item.title, text: item.body }))} />
              ),
            },
            {
              title: "How we solve it",
              extra: (
                <Dashes items={challenges.map((item) => ({ lead: item.title, text: item.solution }))} />
              ),
            },
          ]}
        />
      </Section>

      <Section
        title="Cross-industry services"
        lead={<p>A consistent set of services supports every deployment, whether it’s a hospitality suite or member clubhouse.</p>}
        split
      >
        <Dashes items={crossIndustryServices.map((item) => ({ text: item }))} />
      </Section>

      <Section
        tone="cream"
        mark="Custom & hospitality builds"
        title="Need something outside the template?"
        lead={
          <p>
            From bespoke hospitality venues to mixed-use community spaces, we map custom AV + security plans that stay serviceable.
          </p>
        }
        split
      >
        <Dashes
          items={[
            { text: "Protect the guest experience with discreet installs, lighting cues, and operator-friendly controls." },
            { text: "Coordinate with architects and fabricators so tech disappears into the design intent." },
            { text: "Document service paths and support plans that keep boutique venues calm after opening night." },
          ]}
        />
        <div className="cl-actions" style={{ marginTop: 28 }}>
          <Link href="/services/custom-solutions" className="cl-btn cl-btn-ghost">
            Explore custom solutions
          </Link>
        </div>
      </Section>

      <Section
        title="Four core offerings"
        lead={<p>Each service stands alone, but they’re strongest when combined into a single roadmap.</p>}
      >
        <div className="cl-cards cl-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} tone="sand" />
          ))}
        </div>
        <div className="cl-cardx cl-cardx-accent cl-reveal" style={{ marginTop: 24 }}>
          <p className="cl-cardx-body">
            Have a hospitality venue or unusual space?{" "}
            <Link href="/services/custom-solutions" className="cl-textlink">
              Explore our custom solutions →
            </Link>
          </p>
        </div>
      </Section>

      <Section id="room-types" tone="cream">
        <RoomTypesShowcase
          heading="Systems and rooms we build again and again"
          subheading="Years of repeatable deployments mean your next space benefits from every lesson learned."
        />
      </Section>

      <CTASection
        title="Tell us what you’re building next"
        subtitle="Share a quick brief about your rooms or upcoming rollout—we’ll reply with a plan and options."
        primaryLabel="Schedule Free Assessment"
        primaryHref="/contact"
      />
    </>
  );
}
