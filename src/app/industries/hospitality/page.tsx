import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hospitality AV & Security | Hotels, Lounges, Private Clubs | CalLord",
  description:
    "Discreet AV integration and security for hospitality venues. Event-ready technology that protects the vibe.",
};

export default function HospitalityPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-16 lg:px-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Hospitality</p>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">AV &amp; Security for Hospitality Venues</h1>
        <p className="mt-3 text-base text-ink-soft">
          Discreet technology that protects the vibe — for lounges, boutique hotels, private clubs, and event spaces.
        </p>
        <div className="mt-10 space-y-4 text-sm leading-relaxed text-ink-soft">
          <h2 className="font-serif text-2xl font-normal text-ink">Hospitality-Specific Challenges</h2>
          <ul className="space-y-3">
            <li>
              <strong className="font-medium text-ink">Technology that breaks the atmosphere.</strong> Visible cables and clunky controls ruin the experience.
            </li>
            <li>
              <strong className="font-medium text-ink">Events that go sideways.</strong> Presenters can’t connect, music cuts out, lighting is wrong.
            </li>
            <li>
              <strong className="font-medium text-ink">Security without the security feel.</strong> Guests expect safety without feeling surveilled.
            </li>
          </ul>
          <h2 className="font-serif text-2xl font-normal text-ink">How We Help</h2>
          <ul className="space-y-2">
            <li>Invisible integration — hidden equipment and concealed cabling.</li>
            <li>Event-ready AV — presentations, music, and lighting that just work.</li>
            <li>Discreet security — coverage without intruding on guests.</li>
            <li>24/7 support availability for critical events.</li>
          </ul>
        </div>
        <div className="mt-8 grid gap-3 text-sm text-teal">
          <Link href="/av-integration" className="h-link font-medium underline-offset-2 hover:underline">
            AV Integration →
          </Link>
          <Link href="/smart-room-design" className="h-link font-medium underline-offset-2 hover:underline">
            Smart Room Design →
          </Link>
        </div>
        <div className="mt-10">
          <h2 className="font-serif text-2xl font-normal text-ink">Protect the Vibe While Protecting the Venue</h2>
          <Link
            href="/contact"
            className="h-btn mt-4 inline-flex items-center justify-center bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
          >
            Tell Us About Your Space
          </Link>
        </div>
      </main>
    </div>
  );
}
