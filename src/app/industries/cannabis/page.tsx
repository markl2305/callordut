import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CANNABIS_CONTENT_ENABLED } from "@/config/flags";

const metadataBase: Metadata = {
  title: "Cannabis Facility Security | Compliance Design | CalLord",
  description:
    "Security systems designed for cannabis compliance. Camera coverage, access control, and retention infrastructure for CO, NM, and AZ operations.",
};
const metadataHidden: Metadata = {
  title: "Industries | CalLord",
  description: "Security and AV solutions for regulated, hospitality, and commercial environments.",
};

export function generateMetadata(): Metadata {
  if (!CANNABIS_CONTENT_ENABLED) {
    // TEMP: Cannabis content hidden for insurance audit
    return { ...metadataHidden, robots: { index: false, follow: false } };
  }

  return metadataBase;
}

export default function CannabisIndustryPage() {
  if (!CANNABIS_CONTENT_ENABLED) {
    // TEMP: Cannabis content hidden for insurance audit
    redirect("/industries");
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-16 lg:px-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Cannabis</p>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">Security &amp; Compliance for Cannabis Operations</h1>
        <p className="mt-3 text-base text-ink-soft">
          Camera systems, access control, and retention infrastructure designed to pass Colorado, New Mexico, and Arizona state inspections — first time, on schedule.
        </p>
        <div className="mt-10 space-y-4 text-sm leading-relaxed text-ink-soft">
          <h2 className="font-serif text-2xl font-normal text-ink">The Compliance Challenge</h2>
          <ul className="space-y-3">
            <li>
              <strong className="font-medium text-ink">Inspectors know the rules better than your installer.</strong> Generic security vendors often miss state-specific retention and integration requirements.
            </li>
            <li>
              <strong className="font-medium text-ink">License deadlines don’t move.</strong> Rework costs revenue and time you don’t have.
            </li>
            <li>
              <strong className="font-medium text-ink">One failure can cost your license.</strong> Incomplete coverage or undocumented access points become violations.
            </li>
          </ul>
          <h2 className="font-serif text-2xl font-normal text-ink">How We Help</h2>
          <ul className="space-y-2">
            <li>State-specific compliance design for CO, NM, and AZ.</li>
            <li>Fixed-price, fixed-timeline execution so you know the plan.</li>
            <li>Eagle Eye &amp; Brivo certified—cloud video and access control for regulated industries.</li>
            <li>Inspector-ready documentation before the inspector arrives.</li>
          </ul>
          <p className="mt-2 text-sm text-ink-soft">If you fail inspection due to our design, we fix it free or refund your fee.</p>
        </div>
        <div className="mt-8 grid gap-3 text-sm text-teal">
          <Link href="/cannabis-security" className="h-link font-medium underline-offset-2 hover:underline">
            Cannabis Security →
          </Link>
        </div>
        <div className="mt-10">
          <h2 className="font-serif text-2xl font-normal text-ink">Your License Deadline Isn’t Flexible</h2>
          <p className="mt-1 text-sm text-ink-soft">30-minute assessment call. Fixed-price quote in 48 hours.</p>
          <Link
            href="/contact"
            className="h-btn mt-4 inline-flex items-center justify-center bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
          >
            Schedule Free Assessment
          </Link>
        </div>
      </main>
    </div>
  );
}
