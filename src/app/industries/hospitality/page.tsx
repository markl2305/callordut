import type { Metadata } from "next";
import { PageHero, Section, Dashes, Cards, LinkRow, CloseBand } from "../../components/system/Blocks";

export const metadata: Metadata = {
  title: "Hospitality AV & Security | Hotels, Lounges, Private Clubs | CalLord",
  description:
    "Discreet AV integration and security for hospitality venues. Event-ready technology that protects the vibe.",
};

export default function HospitalityPage() {
  return (
    <>
      <PageHero
        eyebrow="Hospitality"
        title="AV &amp; Security for"
        accent="Hospitality Venues"
        lead={<p>Discreet technology that protects the vibe — for lounges, boutique hotels, private clubs, and event spaces.</p>}
        primary={{ label: "Tell Us About Your Space", href: "/contact" }}
      />
      <Section mark="Hospitality" title="Hospitality-Specific Challenges" split>
        <Dashes
          items={[
            { lead: "Technology that breaks the atmosphere.", text: "Visible cables and clunky controls ruin the experience." },
            { lead: "Events that go sideways.", text: "Presenters can’t connect, music cuts out, lighting is wrong." },
            { lead: "Security without the security feel.", text: "Guests expect safety without feeling surveilled." },
          ]}
        />
      </Section>
      <Section tone="cream" mark="Hospitality" title="How We Help">
        <Cards
          cols={4}
          items={[
            { n: "I", body: <p>Invisible integration — hidden equipment and concealed cabling.</p> },
            { n: "II", body: <p>Event-ready AV — presentations, music, and lighting that just work.</p> },
            { n: "III", body: <p>Discreet security — coverage without intruding on guests.</p> },
            { n: "IV", body: <p>24/7 support availability for critical events.</p> },
          ]}
        />
        <div style={{ marginTop: 28 }}>
          <LinkRow
            links={[
              { label: "AV Integration →", href: "/av-integration" },
              { label: "Smart Room Design →", href: "/smart-room-design" },
            ]}
          />
        </div>
      </Section>
      <CloseBand title="Protect the Vibe While" accent="Protecting the Venue" primary={{ label: "Tell Us About Your Space", href: "/contact" }} />
    </>
  );
}
