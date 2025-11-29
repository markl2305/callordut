import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Facility Security | Compliance Design | CalLord",
  description:
    "Security systems designed for cannabis compliance. Camera coverage, access control, and retention infrastructure for CO, NM, and AZ operations.",
};

export default function CannabisIndustryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-16 lg:px-0">
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Security & Compliance for Cannabis Operations</h1>
        <p className="mt-3 text-base text-slate-200">
          Camera systems, access control, and retention infrastructure designed to pass Colorado, New Mexico, and Arizona state inspections — first time, on schedule.
        </p>
        <div className="mt-10 space-y-4 text-sm leading-relaxed text-slate-200">
          <h2 className="text-2xl font-semibold text-foreground">The Compliance Challenge</h2>
          <ul className="space-y-3">
            <li>
              <strong className="text-foreground">Inspectors know the rules better than your installer.</strong> Generic security vendors often miss state-specific retention and integration requirements.
            </li>
            <li>
              <strong className="text-foreground">License deadlines don’t move.</strong> Rework costs revenue and time you don’t have.
            </li>
            <li>
              <strong className="text-foreground">One failure can cost your license.</strong> Incomplete coverage or undocumented access points become violations.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold text-foreground">How We Help</h2>
          <ul className="space-y-2">
            <li>State-specific compliance design for CO, NM, and AZ.</li>
            <li>Fixed-price, fixed-timeline execution so you know the plan.</li>
            <li>Eagle Eye & Brivo certified—cloud video and access control for regulated industries.</li>
            <li>Inspector-ready documentation before the inspector arrives.</li>
          </ul>
          <p className="mt-2 text-sm text-slate-200">If you fail inspection due to our design, we fix it free or refund your fee.</p>
        </div>
        <div className="mt-8 grid gap-3 text-sm text-brand-teal">
          <Link href="/cannabis-security" className="font-semibold underline-offset-2 hover:underline">
            Cannabis Security →
          </Link>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-foreground">Your License Deadline Isn’t Flexible</h2>
          <p className="mt-1 text-sm text-slate-200">30-minute assessment call. Fixed-price quote in 48 hours.</p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
          >
            Book Free Assessment
          </Link>
        </div>
      </main>
    </div>
  );
}
