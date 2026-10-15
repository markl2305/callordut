import Link from "next/link";
import type { Metadata } from "next";
import { SolutionsLeadForm } from "../components/SolutionsLeadForm";
import { PageHero, Section, Cards, Dashes } from "../components/system/Blocks";

export const metadata: Metadata = {
  title: "Services | AV Integration, Smart Rooms & Security",
  description:
    "Explore CalLord’s core services: AV integration & systems, smart room design & documentation, and remote installation project management.",
};

const croOfferings = [
  {
    title: "AV Integration & Systems",
    pain: "Calls that start late, touchpanels nobody trusts, and gear that feels stitched together.",
    promise: "We standardize rooms so start buttons, presets, and documentation feel the same everywhere.",
    bullets: ["One-touch join flows", "Audio + camera tuned for your table", "Room templates for rollout"],
    fit: ["Leadership rooms", "Client-facing spaces", "Multi-site teams"],
    href: "/services/av-integration",
  },
  {
    title: "Smart Room Design & Documentation",
    pain: "Virtual visit rooms that feel improvised and small pods with laptop-quality AV.",
    promise: "Operator-friendly rooms with drawings, elevations, and training handoffs.",
    bullets: ["Journey-mapped user flows", "Platform-agnostic design", "Staff-ready guides"],
    fit: ["Senior living", "Care teams", "Remote-first teams"],
    href: "/services/smart-rooms",
  },
  {
    title: "Remote Project Management",
    pain: "Installers need direction, but you don’t have time to babysit bids, subs, and punch lists.",
    promise: "We coordinate the technical details so your preferred partners deliver exactly what was designed.",
    bullets: ["Bid + scope review", "Punch lists + commissioning", "As-built + warranty packages"],
    fit: ["Owners/IT", "GCs", "Architects"],
    href: "/services/project-management",
  },
];

const faq = [
  {
    q: "Do you only work in certain regions?",
    a: "We’re remote-native. We partner with trusted installers or your preferred team anywhere in the U.S., keeping standards identical via documentation and video walk-throughs.",
  },
  {
    q: "Can you work with our existing AV or security vendors?",
    a: "Yes. We often quarterback projects where local vendors already have contracts. We provide the design, documentation, and oversight so everyone aligns on the plan.",
  },
  {
    q: "What industries do you serve?",
    a: "Our sweet spot spans small business, senior living and care environments, hospitality venues, and mission-driven organizations that can’t afford failed calls or compliance issues.",
  },
  {
    q: "Do you do one-off rooms?",
    a: "We can start with a single pilot room or facility, but we always leave you with templates and expansion guidance so scaling feels simple.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Campaign landing"
        title="AV, smart rooms, and security that feel"
        accent="finished—day one."
        lead={
          <p>
            CalLord Unified Technologies designs operator-friendly rooms, security, and remote-friendly project management for teams that can’t afford failed calls or messy inspections.
          </p>
        }
        primary={{ label: "Schedule Free Assessment", href: "/contact" }}
        secondary={{ label: "Download sample room layouts", href: "#contact" }}
      />

      <Section title="Why teams choose CalLord" split>
        <Dashes
          items={[
            { text: "Design-first, documentation-heavy approach so nothing is tribal knowledge." },
            { text: "Remote-friendly project guidance with async video walkthroughs and clear status." },
            {
              text: (
                <>
                  Security and compliance delivered with <strong>Eagle Eye Networks</strong> + <strong>Brivo</strong>.
                </>
              ),
            },
            { text: "Built for teams that can’t afford failed calls, sloppy rooms, or inspection drama." },
          ]}
        />
      </Section>

      <Section
        tone="cream"
        mark="Which fits you?"
        title="Three pathways, one partner."
        lead={<p>Pick the track that matches your current pain. We can start with one—or combine them into a rollout plan.</p>}
      >
        <Cards
          cols={3}
          items={croOfferings.map((offering) => ({
            k: offering.title,
            body: (
              <>
                <p>{offering.pain}</p>
                <p>
                  <strong>{offering.promise}</strong>
                </p>
              </>
            ),
            bullets: offering.bullets,
            extra: (
              <div style={{ marginTop: 16 }}>
                <p className="cl-team-role">This is for you if…</p>
                <ul className="cl-cardx-body" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {offering.fit.map((fit) => (
                    <li key={fit}>• {fit}</li>
                  ))}
                </ul>
              </div>
            ),
            href: offering.href,
            linkLabel: "Learn more →",
          }))}
        />
        <div className="cl-actions" style={{ marginTop: 28, justifyContent: "center" }}>
          <Link href="#contact" className="cl-btn cl-btn-teal">
            Schedule Free Assessment
          </Link>
        </div>
      </Section>

      <Section>
        <div className="cl-cardx cl-cardx-accent cl-reveal">
          <h3 className="cl-cardx-title">“They documented everything so well that our staff stopped texting IT for help.”</h3>
          <p className="cl-cardx-body">Director of Operations, regional senior-living group</p>
        </div>
      </Section>

      <Section tone="cream" title="Questions we get from campaigns">
        <Cards cols={2} items={faq.map((item) => ({ title: item.q, body: <p>{item.a}</p> }))} />
      </Section>

      <Section
        id="contact"
        title="Ready for a plan?"
        lead={<p>No hard sell. We’ll review your rooms, ask a few questions, and recommend a path—even if that means a different partner.</p>}
        split
      >
        <div className="cl-cardx cl-reveal">
          <SolutionsLeadForm services={croOfferings.map((offering) => offering.title)} />
        </div>
      </Section>
    </>
  );
}
