import { PageHero, Section, Dashes, CloseBand } from "../../components/system/Blocks";

const eligibleOrgs = [
  "Public schools and charter networks",
  "Municipalities and county agencies",
  "State colleges and member-driven institutions",
  "Libraries, museums, and community venues",
];

export default function CooperativePurchasingPage() {
  return (
    <>
      <PageHero
        eyebrow="Cooperative purchasing"
        title="Statewide cooperative program"
        accent="for public entities."
        lead={
          <p>
            CalLord Unified Technologies participates in a statewide cooperative purchasing program that offers discounted pricing,
            pre-vetted compliance paperwork, and simplified procurement for public schools, municipalities, and other eligible agencies.
          </p>
        }
        primary={{ label: "Schedule Free Assessment", href: "/contact" }}
      />
      <Section mark="Cooperative purchasing" title="Who can use the program?" split>
        <Dashes items={eligibleOrgs.map((org) => ({ text: org }))} />
      </Section>
      <Section tone="cream" mark="Cooperative purchasing" title="What you get" split>
        <Dashes
          items={[
            { text: "Discounted pricing on AV, smart-room, and security scopes." },
            { text: "Pre-approved contract language and compliance documentation." },
            { text: "Faster onboarding of vendors like Eagle Eye Networks and Brivo." },
            { text: "Point-of-contact at CalLord to shepherd requisitions and reporting." },
          ]}
        />
      </Section>
      <CloseBand
        title="Next steps"
        lead={
          <p>
            If your district, city, or agency needs access to the cooperative paperwork or would like to confirm eligibility, reach out and we’ll connect you with the program administrator plus provide scope templates.
          </p>
        }
        primary={{ label: "Schedule Free Assessment", href: "/contact" }}
      />
    </>
  );
}
