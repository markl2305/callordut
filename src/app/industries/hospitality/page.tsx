import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hospitality AV & Security | Hotels, Lounges, Private Clubs | CalLord",
  description:
    "Discreet AV integration and security for hospitality venues. Event-ready technology that protects the vibe.",
};

export default function HospitalityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-16 lg:px-0">
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">AV & Security for Hospitality Venues</h1>
        <p className="mt-3 text-base text-slate-200">
          Discreet technology that protects the vibe — for lounges, boutique hotels, private clubs, and event spaces.
        </p>
        <div className="mt-10 space-y-4 text-sm leading-relaxed text-slate-200">
          <h2 className="text-2xl font-semibold text-foreground">Hospitality-Specific Challenges</h2>
          <ul className="space-y-3">
            <li>
              <strong className="text-foreground">Technology that breaks the atmosphere.</strong> Visible cables and clunky controls ruin the experience.
            </li>
            <li>
              <strong className="text-foreground">Events that go sideways.</strong> Presenters can’t connect, music cuts out, lighting is wrong.
            </li>
            <li>
              <strong className="text-foreground">Security without the security feel.</strong> Guests expect safety without feeling surveilled.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold text-foreground">How We Help</h2>
          <ul className="space-y-2">
            <li>Invisible integration — hidden equipment and concealed cabling.</li>
            <li>Event-ready AV — presentations, music, and lighting that just work.</li>
            <li>Discreet security — coverage without intruding on guests.</li>
            <li>24/7 support availability for critical events.</li>
          </ul>
        </div>
        <div className="mt-8 grid gap-3 text-sm text-brand-teal">
          <Link href="/av-integration" className="font-semibold underline-offset-2 hover:underline">
            AV Integration →
          </Link>
          <Link href="/smart-room-design" className="font-semibold underline-offset-2 hover:underline">
            Smart Room Design →
          </Link>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-foreground">Protect the Vibe While Protecting the Venue</h2>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
          >
            Tell Us About Your Space
          </Link>
        </div>
      </main>
    </div>
  );
}
