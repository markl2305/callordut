import type { Metadata } from "next";
import { PageHero, Section, Dashes, Cards, LinkRow, CloseBand } from "../../components/system/Blocks";

export const metadata: Metadata = {
  title: "Senior Living AV & Security | Virtual Visit Rooms | CalLord",
  description:
    "AV and security systems for senior living communities. Virtual visit rooms, common-area displays, and camera coverage that keeps residents connected.",
};

export default function SeniorLivingPage() {
  return (
    <>
      <PageHero
        eyebrow="Senior Living"
        title="AV &amp; Technology for"
        accent="Senior Living Communities"
        lead={<p>Virtual visit rooms, common-area displays, and security systems that keep residents connected — without tech friction for staff or families.</p>}
        primary={{ label: "Start a Conversation", href: "/contact" }}
      />
      <Section mark="Senior Living" title="Challenges We Solve" split>
        <Dashes
          items={[
            { lead: "Virtual Visit Frustration.", text: "Family members can’t hear or see their loved ones clearly. Staff waste time troubleshooting instead of caring for residents." },
            { lead: "Common Area Chaos.", text: "TVs in dining rooms and lounges are too quiet, too loud, or showing the wrong content. Residents complain. Staff juggle remotes." },
            { lead: <>Security &amp; Safety Gaps.</>, text: "Camera coverage is inconsistent. Access points aren’t documented. When incidents happen, footage is missing or unusable." },
          ]}
        />
      </Section>
      <Section tone="cream" mark="Senior Living" title="How We Help">
        <Cards
          cols={4}
          items={[
            { n: "I", body: <p>Private Virtual Visit Rooms — acoustically treated, easy-to-use video calling spaces.</p> },
            { n: "II", body: <p>Common Area AV — zoned audio, scheduled content, and simple controls for staff.</p> },
            { n: "III", body: <p>Security Coverage — camera systems designed for compliance and incident documentation.</p> },
            { n: "IV", body: <p>Staff-Friendly Design — systems that don’t require an IT degree to operate.</p> },
          ]}
        />
        <div style={{ marginTop: 28 }}>
          <LinkRow
            links={[
              { label: "Smart Room Design →", href: "/smart-room-design" },
              { label: "AV Integration →", href: "/av-integration" },
              { label: "Virtual Visit / Telehealth Room →", href: "/room-types/virtual-visit-telehealth" },
            ]}
          />
        </div>
      </Section>
      <CloseBand title="Let’s Design Spaces Your Residents" accent="and Families Deserve" primary={{ label: "Start a Conversation", href: "/contact" }} />
    </>
  );
}
