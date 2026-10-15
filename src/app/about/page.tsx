import Image from "next/image";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CTASection } from "../components/CTASection";
import { PageHero, Section, Sequence, Cards, Dashes, Figure } from "../components/system/Blocks";

export const metadata: Metadata = {
  title: "About CalLord Unified Technologies | Design-Led AV & Security",
  description:
    "Meet the team behind CalLord UT and our design-first approach to AV, smart rooms, and security for operators nationwide.",
};

const processSteps = [
  { title: "Discover", description: "Site walks, remote interviews, and call recordings tell us how your team actually works and where rooms break down." },
  { title: "Design & Documentation", description: "We turn requirements into schematics, elevations, and room templates that anyone on the project can understand." },
  { title: "Coordinate & Build", description: "We guide local installers, GCs, and IT teams so every trade knows what happens when." },
  { title: "Commission & Verify", description: "Room testing, labeling, punch lists, and recordings ensure the space works before anyone important walks in." },
  { title: "Support & Iterate", description: "We stay available for tweaks, expansions, and ongoing documentation updates as your footprint grows." },
];

const audiences = [
  { title: "Small & mid-size businesses", bullets: ["Executive rooms that never stall before a board call", "Hybrid spaces where remote teammates sound equal", "Documentation that outlives employee turnover"] },
  { title: "Senior living communities", bullets: ["Virtual visit rooms that respect privacy", "Nurse stations and common areas with dependable AV", "Clear instructions for staff handoffs"] },
  { title: "Hospitality groups", bullets: ["Guest-facing AV that feels effortless", "Discrete security and access control planning", "Documentation that scales across locations"] },
  { title: "Nonprofits & mission-driven orgs", bullets: ["Town hall and donor update spaces", "Volunteer-friendly controls", "Budgets respected without cutting reliability"] },
];

const principles = [
  "Documentation is a deliverable, not an afterthought. Every room ships with drawings, labels, and an update path.",
  "Operator-friendly design beats spec-sheet flexing. If the room embarrasses someone on Monday morning, we missed.",
  "Security and compliance matter even in AV projects, so we design with Eagle Eye + Brivo expectations baked in.",
  "Long-term relationships win—we leave behind templates so future rooms build faster, even if another installer executes.",
];

const team = [
  { name: "Mark Lord", title: "Co-Founder", image: "/mark.jpeg", bio: "Mark focuses on strategic direction, partnerships, and long-term vision at CalLord Unified Technologies. He works to ensure the company delivers practical, reliable technology solutions that support real operational needs." },
  { name: "Patrick Calandro, CTS", title: "Co-Founder & Chief Operations Officer", image: "/patrick.jpeg", bio: "Patrick leads operations, systems design, and project execution across CalLord's deployments. With deep experience in integrated technology environments, he ensures projects are delivered cleanly, reliably, and to specification." },
  { name: "Brianna Lord", title: "Business Manager", image: "/bri.jpeg", bio: "Brianna manages business operations, marketing coordination, and client communications. She ensures internal processes, messaging, and customer touchpoints remain organized, consistent, and professional." },
  { name: "Amanda Martinez", title: "Project Manager", image: "/amanda.jpeg", bio: "Amanda coordinates project timelines, vendor communication, and delivery milestones. She bridges client needs with technical execution to keep projects moving smoothly from planning through completion." },
  { name: "Joshua Dworsky", title: "Engineering Manager", image: "/joshua.jpeg", bio: "Joshua leads engineering and system architecture for CalLord projects. He is responsible for ensuring solutions are technically sound, secure, and aligned with real-world operational requirements." },
  { name: "Trevor Garcia", title: "Information Technology Technician", image: "/trevor.jpeg", bio: "Trevor supports installation, configuration, and on-site technical execution. He works hands-on with systems and infrastructure to ensure deployments are completed accurately and perform as intended." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About CalLord Unified Technologies"
        title="We design rooms that don't embarrass you"
        accent="on Monday morning."
        lead={
          <p>
            CalLord is a design-led AV, smart room, and security partner for teams that can&apos;t afford failed calls or compliance drama. We obsess over documentation, operator experience, and remote collaboration so your rooms feel effortless every time you tap &quot;Join&quot;.
          </p>
        }
        primary={{ label: "Schedule Free Assessment", href: "/contact" }}
        secondary={{ label: "See our services", href: "/services" }}
      >
        <Figure src="/about-designer-desk-av-drawings.png" alt="AV designer desk with technical room drawings" priority ratio="16 / 7" />
      </PageHero>

      <Section
        mark="Who we are"
        title="Design-first integrators with a documentation habit"
        lead={<p>We started CalLord to fix meeting rooms that only &apos;the AV person&apos; could start, to translate complex security requirements into clear drawings, and to remove the chaos from working with out-of-town installers.</p>}
      >
        <Cards
          cols={2}
          items={[
            { body: <p>Every room starts with operator interviews and recordings. We map how teams speak about their spaces so the final documentation feels native—plain-language call flows, annotated drawings, and inventory lists that live in the same shared folder as the rest of your projects. No mystery boxes.</p> },
            { body: <p>Because our projects regularly span multiple sites, we built remote collaboration into our DNA. Clear rev-control, video walkthroughs, and modern platforms mean a GC in Albuquerque, an IT lead in Denver, and a compliance officer in Phoenix are all staring at the same truth.</p> },
          ]}
        />
      </Section>

      <Section
        tone="cream"
        mark="How we work"
        title="From idea to support, every step is documented"
        lead={<p>We borrowed the rigor of product teams: kickoff notes, structured reviews, and issue tracking so you always know what&apos;s next.</p>}
        split
      >
        <Sequence steps={processSteps.map((step, index) => ({ n: String(index + 1).padStart(2, "0"), title: step.title, body: <p>{step.description}</p> }))} />
      </Section>

      <Section mark="Team" title="People who keep rooms calm" lead={<p>A focused team covering strategy, operations, project delivery, and hands-on execution.</p>}>
        <div className="cl-cards cl-cols-2">
          {team.map((member, i) => (
            <div key={member.name} className="cl-cardx cl-team cl-reveal" style={{ ["--i" as string]: i % 4 } as CSSProperties}>
              <Image src={member.image} alt={member.name} width={72} height={72} className="cl-team-photo" sizes="72px" />
              <div>
                <p className="cl-team-role">{member.title}</p>
                <h3 className="cl-cardx-title">{member.name}</h3>
                <p className="cl-cardx-body">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream" mark="Who we serve" title="Rooms and systems for teams who can't afford failure" lead={<p>We focus on operators who carry a real reputational or regulatory cost if tech flakes out.</p>}>
        <Cards cols={2} items={audiences.map((a) => ({ title: a.title, bullets: a.bullets }))} />
      </Section>

      <Section mark="Values & principles" title="What guides every build" lead={<p>These are the habits and guardrails that shape every CalLord project.</p>}>
        <div className="cl-split cl-split-even">
          <Dashes items={principles.map((p) => ({ text: p }))} />
          <div className="cl-cardx cl-cardx-accent cl-reveal">
            <h3 className="cl-cardx-title">What matters to us when we build for you</h3>
            <p className="cl-cardx-body">
              We treat every space like it needs to survive a leadership offsite or a compliance inspection. That means obsessive documentation, calm operators, and platforms that can be supported long after the ribbon-cutting.
            </p>
          </div>
        </div>
      </Section>

      <CTASection
        title="Ready to stop apologizing for your conference rooms?"
        subtitle="We'll audit your current rooms, outline a phased plan, and coordinate local partners so Monday morning feels calm."
        primaryLabel="Schedule Free Assessment"
        primaryHref="/contact"
        secondaryLabel="See our services"
        secondaryHref="/services"
      />
    </>
  );
}
