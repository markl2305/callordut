import type { Metadata } from "next";
import { PageHero, Section, Dashes, Cards, LinkRow, CloseBand } from "../../components/system/Blocks";

export const metadata: Metadata = {
  title: "Office Conference Room AV | SMB Meeting Rooms | CalLord",
  description:
    "Conference room AV for small and mid-sized businesses. Boardrooms, huddle rooms, and hybrid meeting spaces that just work.",
};

export default function OfficesPage() {
  return (
    <>
      <PageHero
        eyebrow="Offices"
        title="Conference Room AV for"
        accent="Small &amp; Mid-Sized Businesses"
        lead={<p>Boardrooms, huddle rooms, and hybrid meeting spaces where presentations just start — and calls just work.</p>}
        primary={{ label: "Get Design Packages", href: "/smart-room-design" }}
        secondary={{ label: "Full-Service Integration", href: "/av-integration" }}
      />
      <Section mark="Offices" title="The SMB Meeting Room Problem" split>
        <Dashes
          items={[
            { lead: "Every meeting starts with “Can you see my screen?”", text: "Wireless presentation should be instant. It rarely is." },
            { lead: "Remote participants are second-class citizens.", text: "Bad audio and video make hybrid meetings painful." },
            { lead: "Nobody knows how to use the room.", text: "Too many remotes, inputs, and outdated instructions." },
          ]}
        />
      </Section>
      <Section tone="cream" mark="Offices" title="How We Help">
        <Cards
          cols={4}
          items={[
            { n: "I", body: <p>One-touch simplicity — walk in, tap start, present.</p> },
            { n: "II", body: <p>Hybrid meeting excellence — pro-grade cameras, microphones, and displays.</p> },
            { n: "III", body: <p>Consistent standards — multi-room deployments that work the same way.</p> },
            { n: "IV", body: <p>Documentation &amp; support — user guides and ongoing help.</p> },
          ]}
        />
        <div style={{ marginTop: 28 }}>
          <LinkRow
            links={[
              { label: "Get Design Packages →", href: "/smart-room-design" },
              { label: "Full-Service Integration →", href: "/av-integration" },
              { label: "Executive Boardroom →", href: "/room-types/executive-boardroom" },
              { label: "Team Meeting Room →", href: "/room-types/team-meeting-room" },
              { label: "Small Hybrid / Focus Pod →", href: "/room-types/small-hybrid-focus-pod" },
            ]}
          />
        </div>
      </Section>
      <CloseBand
        title="Ready for Meetings"
        accent="That Just Work?"
        primary={{ label: "Get Design Packages", href: "/smart-room-design" }}
        secondary={{ label: "Full-Service Integration", href: "/av-integration" }}
      />
    </>
  );
}
