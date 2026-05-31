import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Office Conference Room AV | SMB Meeting Rooms | CalLord",
  description:
    "Conference room AV for small and mid-sized businesses. Boardrooms, huddle rooms, and hybrid meeting spaces that just work.",
};

export default function OfficesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-16 lg:px-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Offices</p>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">Conference Room AV for Small &amp; Mid-Sized Businesses</h1>
        <p className="mt-3 text-base text-ink-soft">
          Boardrooms, huddle rooms, and hybrid meeting spaces where presentations just start — and calls just work.
        </p>
        <div className="mt-10 space-y-4 text-sm leading-relaxed text-ink-soft">
          <h2 className="font-serif text-2xl font-normal text-ink">The SMB Meeting Room Problem</h2>
          <ul className="space-y-3">
            <li>
              <strong className="font-medium text-ink">Every meeting starts with “Can you see my screen?”</strong> Wireless presentation should be instant. It rarely is.
            </li>
            <li>
              <strong className="font-medium text-ink">Remote participants are second-class citizens.</strong> Bad audio and video make hybrid meetings painful.
            </li>
            <li>
              <strong className="font-medium text-ink">Nobody knows how to use the room.</strong> Too many remotes, inputs, and outdated instructions.
            </li>
          </ul>
          <h2 className="font-serif text-2xl font-normal text-ink">How We Help</h2>
          <ul className="space-y-2">
            <li>One-touch simplicity — walk in, tap start, present.</li>
            <li>Hybrid meeting excellence — pro-grade cameras, microphones, and displays.</li>
            <li>Consistent standards — multi-room deployments that work the same way.</li>
            <li>Documentation &amp; support — user guides and ongoing help.</li>
          </ul>
        </div>
        <div className="mt-8 grid gap-3 text-sm text-teal">
          <Link href="/smart-room-design" className="h-link font-medium underline-offset-2 hover:underline">
            Get Design Packages →
          </Link>
          <Link href="/av-integration" className="h-link font-medium underline-offset-2 hover:underline">
            Full-Service Integration →
          </Link>
          <Link href="/room-types/executive-boardroom" className="h-link font-medium underline-offset-2 hover:underline">
            Executive Boardroom →
          </Link>
          <Link href="/room-types/team-meeting-room" className="h-link font-medium underline-offset-2 hover:underline">
            Team Meeting Room →
          </Link>
          <Link href="/room-types/small-hybrid-focus-pod" className="h-link font-medium underline-offset-2 hover:underline">
            Small Hybrid / Focus Pod →
          </Link>
        </div>
        <div className="mt-10">
          <h2 className="font-serif text-2xl font-normal text-ink">Ready for Meetings That Just Work?</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/smart-room-design"
              className="h-btn inline-flex items-center justify-center bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
            >
              Get Design Packages
            </Link>
            <Link
              href="/av-integration"
              className="h-btn inline-flex items-center justify-center border border-ink bg-transparent px-6 py-3.5 text-sm font-medium text-ink"
            >
              Full-Service Integration
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
