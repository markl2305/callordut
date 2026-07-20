import Link from "next/link";
import { CANNABIS_CONTENT_ENABLED } from "@/config/flags";

export const metadata = {
  title: "Industries | CalLord Unified Technologies",
  description: "Explore how CalLord serves senior living, hospitality, offices, and cannabis operators with smart rooms, AV, and security.",
};

const baseIndustries = [
  { label: "Senior Living", href: "/industries/senior-living" },
  { label: "Hospitality", href: "/industries/hospitality" },
  { label: "Offices", href: "/industries/offices" },
];

// Kept in sync with the flag that gates /industries/cannabis itself — so this
// index never links (or omits) a card the underlying page won't render.
const industries = CANNABIS_CONTENT_ENABLED
  ? [...baseIndustries, { label: "Cannabis", href: "/industries/cannabis" }]
  : baseIndustries;

export default function IndustriesIndexPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-16 lg:px-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Industries</p>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">Industries</h1>
        <p className="mt-3 text-base text-ink-soft">
          AV, smart rooms, and security for teams that can’t afford downtime.
        </p>
        <div className="mt-8 grid gap-0 border-t border-rule sm:grid-cols-2">
          {industries.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="h-hover-cream border-b border-rule p-6 font-serif text-xl font-normal text-ink sm:border-r sm:[&:nth-child(even)]:border-r-0"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
