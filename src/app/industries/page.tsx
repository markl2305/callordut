import { PageHero, Section, Cards } from "../components/system/Blocks";
import { ClosingCTA } from "../components/heritage/sections";

export const metadata = {
  title: "Industries | CalLord Unified Technologies",
  description: "Explore how CalLord serves senior living, hospitality, and office teams with smart rooms, AV, and security.",
};

const industries = [
  { label: "Senior Living", href: "/industries/senior-living" },
  { label: "Hospitality", href: "/industries/hospitality" },
  { label: "Offices", href: "/industries/offices" },
];

export default function IndustriesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Industries"
        lead={<p>AV, smart rooms, and security for teams that can’t afford downtime.</p>}
      />
      <Section>
        <Cards
          cols={3}
          as="h2"
          items={industries.map((item, i) => ({ n: ["I", "II", "III"][i], title: item.label, href: item.href, linkLabel: "→" }))}
        />
      </Section>
      <ClosingCTA />
    </>
  );
}
