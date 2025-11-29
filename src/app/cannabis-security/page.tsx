import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Security Systems | Colorado, New Mexico, Arizona | CalLord",
  description:
    "Pass your cannabis facility inspection first time. State-compliant security design for dispensaries and cultivation. Eagle Eye & Brivo certified. Free assessment.",
};

const valueProps = [
  "State-specific compliance roadmap (CO Title 16, NM regulations, AZ requirements)",
  "Partner-backed execution through Eagle Eye & Brivo certified teams",
  "Fixed-price quotes within 48 hours of assessment call",
  "No payment until you approve scope and timeline",
];

const problems = [
  {
    title: "Wrong Retention Periods",
    body: "Colorado requires 90 days. Pennsylvania requires 4 years. One size does not fit all — and inspectors know it.",
  },
  {
    title: "Incomplete Biometric Integration",
    body: "Your cameras work, but they’re not tied to your Metrc system. That’s an automatic compliance failure in most states.",
  },
  {
    title: "No Redundancy Plan",
    body: "A single DVR failure = lost footage = lost license. State regulators don’t accept “equipment malfunction” as an excuse.",
  },
];

const steps = [
  {
    title: "Free Assessment Call",
    duration: "30 minutes",
    body: "We review your floor plans, current equipment, and state requirements. You get a compliance gap analysis on the call.",
  },
  {
    title: "Fixed-Price Quote",
    duration: "48 hours",
    body: "We send a detailed scope covering exactly what’s needed to pass inspection. You approve before we start.",
  },
  {
    title: "Partner-Backed Execution",
    duration: "2–4 weeks",
    body: "Our Eagle Eye/Brivo certified teams build your system. We manage the install and prep your documentation for regulators.",
  },
];

const testimonials = [
  {
    quote: "Passed Colorado MED inspection on first try. Mark knew exactly what the inspectors would look for.",
    name: "Operations Manager, Cultivation facility, Denver",
  },
  {
    quote: "We were 3 weeks from license deadline and our system wasn’t compliant. Mark got us approved in 12 days.",
    name: "Owner, Dispensary, Albuquerque",
  },
  {
    quote: "Worth every dollar to not deal with the regulatory maze ourselves. System works flawlessly.",
    name: "Multi-site operator, Phoenix",
  },
];

const faqs = [
  {
    q: "Do you install in my state?",
    a: "We currently serve Colorado, New Mexico, and Arizona. If you’re expanding to other legal states, we can coordinate through our partner network.",
  },
  {
    q: "How much does this cost?",
    a: "Depends on your facility size and current equipment. Small dispensaries typically run $25K–$50K all-in. Large cultivation operations $100K–$200K. We provide exact quotes after the assessment call.",
  },
  {
    q: "What if I already have cameras installed?",
    a: "We evaluate your existing setup during the assessment call. Often we can integrate what you have and add compliance layers — biometrics, retention servers, state tracking integration.",
  },
  {
    q: "Can’t I just buy equipment and install it myself?",
    a: "You can — but if it doesn’t meet state-specific retention, resolution, or integration requirements, you’ll fail inspection and lose weeks rebuilding. We ensure compliance before equipment is ordered.",
  },
];

export default function CannabisSecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-16 lg:px-0">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-black/40">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Pass Your Cannabis Facility Inspection</h1>
          <p className="mt-2 text-lg font-semibold text-brand-teal">First Time. On Schedule.</p>
          <p className="mt-4 text-base text-slate-200">
            State-compliant security design for Colorado, New Mexico, and Arizona cultivation and dispensary operators. We engineer compliant systems so you pass inspection — without delays, rework, or surprise costs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact#assessment-form"
              className="rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
            >
              Book Free Compliance Assessment
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-brand-teal/70 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              Contact Us
            </Link>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-md shadow-black/30">
          <h2 className="text-2xl font-semibold text-foreground">Key Value</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            {valueProps.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Implementation Partners</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100 ring-1 ring-white/20">Eagle Eye Networks</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100 ring-1 ring-white/20">Brivo</span>
          </div>
        </section>

        <section className="mt-12 space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-md shadow-black/30">
          <h2 className="text-2xl font-semibold text-foreground">Why Most Cannabis Security Installations Fail Inspection</h2>
          <p className="text-sm text-slate-200">State regulators are strict. These three mistakes account for 80% of compliance failures.</p>
          <div className="grid gap-4 md:grid-cols-3">
            {problems.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-md shadow-black/30">
          <h2 className="text-2xl font-semibold text-foreground">Three Steps to Compliance Approval</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div key={step.title} className="relative rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40">
                <div className="absolute right-4 top-4 text-sm font-semibold text-brand-teal/60">{String(idx + 1).padStart(2, "0")}</div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-xs font-semibold text-brand-teal">{step.duration}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-brand-teal/40 bg-brand-teal/10 p-5 text-brand-slate shadow-inner shadow-black/20">
            <h3 className="text-lg font-semibold text-foreground">Our Guarantee</h3>
            <p className="mt-2 text-sm text-slate-100">If you fail inspection due to our design, we fix it free or refund your fee.</p>
          </div>
        </section>

        <section className="mt-12 space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-md shadow-black/30">
          <h2 className="text-2xl font-semibold text-foreground">What Cannabis Operators Say</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.quote} className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40">
                <p className="text-sm leading-relaxed text-slate-100">“{item.quote}”</p>
                <p className="mt-3 text-xs font-semibold text-slate-300">{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-md shadow-black/30">
          <h2 className="text-2xl font-semibold text-foreground">Common Questions</h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-200">
            {faqs.map((item) => (
              <div key={item.q}>
                <p className="font-semibold text-foreground">{item.q}</p>
                <p className="mt-1">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-md shadow-black/30">
          <h2 className="text-2xl font-semibold text-foreground">Your License Deadline Isn’t Flexible</h2>
          <p className="text-sm text-slate-200">30-minute call. No obligation. Fixed-price quote within 48 hours if you want to proceed.</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact#assessment-form"
              className="inline-flex items-center justify-center rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
            >
              Book Free Compliance Assessment
            </Link>
            <Link
              href="tel:+18666572383"
              className="inline-flex items-center justify-center rounded-full border border-brand-teal/70 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              Call (866) 657-2383
            </Link>
          </div>
        </section>

        <section className="mt-12 space-y-3">
          <h3 className="text-xl font-semibold text-foreground">Cannabis Industry Resources</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/industries/cannabis"
              className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-4 text-sm font-semibold text-brand-teal shadow-md shadow-black/40 transition hover:-translate-y-0.5 hover:border-brand-teal"
            >
              Cannabis Industry Overview →
            </Link>
            <Link
              href="/about"
              className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-4 text-sm font-semibold text-brand-teal shadow-md shadow-black/40 transition hover:-translate-y-0.5 hover:border-brand-teal"
            >
              Security Technology Partners →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
