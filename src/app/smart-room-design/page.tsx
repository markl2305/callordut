import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Professional Conference Room Design | 3–7 Day Delivery | CalLord",
  description:
    "Fixed-price conference room design packages. D-Tools documentation, equipment specs, signal flow diagrams, and installation guidance. $2,500–$8,000. Nationwide.",
};

export default function SmartRoomDesignPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-16 lg:px-0">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-black/40">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Professional Conference Room Design</h1>
          <p className="mt-2 text-lg font-semibold text-brand-teal">Delivered in 3–7 Days</p>
          <p className="mt-4 text-base text-slate-200">
            Complete D-Tools documentation, equipment specifications, signal flow diagrams, and installation guidance. 100% remote delivery.
            Nationwide. Fixed pricing. No surprises. No hidden fees.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/"
              className="rounded-full border border-brand-teal/70 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
