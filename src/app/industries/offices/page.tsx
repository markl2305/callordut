import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Office Conference Room AV | SMB Meeting Rooms | CalLord",
  description:
    "Conference room AV for small and mid-sized businesses. Boardrooms, huddle rooms, and hybrid meeting spaces that just work.",
};

export default function OfficesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-16 lg:px-0">
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Conference Room AV for Small & Mid-Sized Businesses</h1>
        <p className="mt-3 text-base text-slate-200">
          Boardrooms, huddle rooms, and hybrid meeting spaces where presentations just start — and calls just work.
        </p>
        <div className="mt-10 space-y-4 text-sm leading-relaxed text-slate-200">
          <h2 className="text-2xl font-semibold text-foreground">The SMB Meeting Room Problem</h2>
          <ul className="space-y-3">
            <li>
              <strong className="text-foreground">Every meeting starts with “Can you see my screen?”</strong> Wireless presentation should be instant. It rarely is.
            </li>
            <li>
              <strong className="text-foreground">Remote participants are second-class citizens.</strong> Bad audio and video make hybrid meetings painful.
            </li>
            <li>
              <strong className="text-foreground">Nobody knows how to use the room.</strong> Too many remotes, inputs, and outdated instructions.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold text-foreground">How We Help</h2>
          <ul className="space-y-2">
            <li>One-touch simplicity — walk in, tap start, present.</li>
            <li>Hybrid meeting excellence — pro-grade cameras, microphones, and displays.</li>
            <li>Consistent standards — multi-room deployments that work the same way.</li>
            <li>Documentation & support — user guides and ongoing help.</li>
          </ul>
        </div>
        <div className="mt-8 grid gap-3 text-sm text-brand-teal">
          <Link href="/smart-room-design" className="font-semibold underline-offset-2 hover:underline">
            Get Design Packages →
          </Link>
          <Link href="/av-integration" className="font-semibold underline-offset-2 hover:underline">
            Full-Service Integration →
          </Link>
          <Link href="/room-types/executive-boardroom" className="font-semibold underline-offset-2 hover:underline">
            Executive Boardroom →
          </Link>
          <Link href="/room-types/team-meeting-room" className="font-semibold underline-offset-2 hover:underline">
            Team Meeting Room →
          </Link>
          <Link href="/room-types/small-hybrid-focus-pod" className="font-semibold underline-offset-2 hover:underline">
            Small Hybrid / Focus Pod →
          </Link>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-foreground">Ready for Meetings That Just Work?</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/smart-room-design"
              className="inline-flex items-center justify-center rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
            >
              Get Design Packages
            </Link>
            <Link
              href="/av-integration"
              className="inline-flex items-center justify-center rounded-full border border-brand-teal/70 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              Full-Service Integration
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
