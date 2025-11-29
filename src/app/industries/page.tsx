import Link from "next/link";

export const metadata = {
  title: "Industries | CalLord Unified Technologies",
  description: "Explore how CalLord serves senior living, cannabis, hospitality, and offices with smart rooms, AV, and security.",
};

const industries = [
  { label: "Senior Living", href: "/industries/senior-living" },
  { label: "Cannabis", href: "/industries/cannabis" },
  { label: "Hospitality", href: "/industries/hospitality" },
  { label: "Offices", href: "/industries/offices" },
];

export default function IndustriesIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-16 lg:px-0">
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Industries</h1>
        <p className="mt-3 text-base text-slate-200">
          AV, smart rooms, and security for teams that can’t afford downtime.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {industries.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-sm font-semibold text-foreground shadow-md shadow-black/30 transition hover:-translate-y-0.5 hover:border-brand-teal/50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
