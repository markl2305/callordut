import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CANNABIS_CONTENT_ENABLED } from "@/config/flags";

const metadataBase: Metadata = {
  title: "Cannabis Security Systems | Colorado, New Mexico, Arizona | CalLord",
  description:
    "Pass your cannabis facility inspection first time. State-compliant security design for dispensaries and cultivation. Eagle Eye & Brivo certified. Free assessment.",
};
const metadataHidden: Metadata = {
  title: "Security Systems | CalLord",
  description: "Specialty high-security commercial solutions and compliance-ready security design.",
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

export function generateMetadata(): Metadata {
  if (!CANNABIS_CONTENT_ENABLED) {
    // TEMP: Cannabis content hidden for insurance audit
    return { ...metadataHidden, robots: { index: false, follow: false } };
  }

  return metadataBase;
}

export default function CannabisSecurityPage() {
  if (!CANNABIS_CONTENT_ENABLED) {
    // TEMP: Cannabis content hidden for insurance audit
    redirect("/solutions");
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-16 lg:px-0">
        <section className="border border-rule bg-cream p-8 text-ink">
          <h1 className="font-serif text-4xl font-normal leading-tight tracking-tight sm:text-5xl">Pass Your Cannabis Facility Inspection</h1>
          <p className="mt-2 font-serif text-lg italic text-teal">First Time. On Schedule.</p>
          <p className="mt-4 text-base text-ink-soft">
            State-compliant security design for Colorado, New Mexico, and Arizona cultivation and dispensary operators. We engineer compliant systems so you pass inspection — without delays, rework, or surprise costs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact#assessment-form"
              className="h-btn inline-flex items-center justify-center bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
            >
              Schedule Free Assessment
            </Link>
            <Link
              href="/contact"
              className="h-btn inline-flex items-center justify-center border border-ink px-6 py-3.5 text-sm font-medium text-ink"
            >
              Contact Sales
            </Link>
          </div>
        </section>

        <section className="mt-12 border border-rule bg-cream p-8 text-ink">
          <h2 className="font-serif text-2xl font-normal text-ink">Key Value</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            {valueProps.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-ink-faint">Implementation Partners</span>
            <span className="border border-rule px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.04em] text-ink">Eagle Eye Networks</span>
            <span className="border border-rule px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.04em] text-ink">Brivo</span>
          </div>
        </section>

        <section className="mt-12 space-y-6 border border-rule bg-cream p-8 text-ink">
          <h2 className="font-serif text-2xl font-normal text-ink">Why Most Cannabis Security Installations Fail Inspection</h2>
          <p className="text-sm text-ink-soft">State regulators are strict. These three mistakes account for 80% of compliance failures.</p>
          <div className="grid gap-4 md:grid-cols-3">
            {problems.map((item) => (
              <div key={item.title} className="border border-rule bg-paper p-5 text-ink">
                <h3 className="font-serif text-lg font-normal text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-6 border border-rule bg-cream p-8 text-ink">
          <h2 className="font-serif text-2xl font-normal text-ink">Three Steps to Compliance Approval</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div key={step.title} className="relative border border-rule bg-paper p-5 text-ink">
                <div className="absolute right-4 top-4 font-serif text-sm italic text-teal/60">{String(idx + 1).padStart(2, "0")}</div>
                <h3 className="font-serif text-lg font-normal text-ink">{step.title}</h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.04em] text-teal">{step.duration}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="border border-rule bg-teal/10 p-5 text-ink">
            <h3 className="font-serif text-lg font-normal text-ink">Our Guarantee</h3>
            <p className="mt-2 text-sm text-ink-soft">If you fail inspection due to our design, we fix it free or refund your fee.</p>
          </div>
        </section>

        <section className="mt-12 space-y-5 border border-rule bg-cream p-8 text-ink">
          <h2 className="font-serif text-2xl font-normal text-ink">What Cannabis Operators Say</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.quote} className="border border-rule bg-paper p-5 text-ink">
                <p className="font-serif text-sm leading-relaxed text-ink">“{item.quote}”</p>
                <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.04em] text-ink-faint">{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-5 border border-rule bg-cream p-8 text-ink">
          <h2 className="font-serif text-2xl font-normal text-ink">Common Questions</h2>
          <div className="space-y-4 text-sm leading-relaxed text-ink-soft">
            {faqs.map((item) => (
              <div key={item.q}>
                <p className="font-medium text-ink">{item.q}</p>
                <p className="mt-1">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-5 border border-rule bg-cream p-8 text-ink">
          <h2 className="font-serif text-2xl font-normal text-ink">Your License Deadline Isn’t Flexible</h2>
          <p className="text-sm text-ink-soft">30-minute call. No obligation. Fixed-price quote within 48 hours if you want to proceed.</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact#assessment-form"
              className="h-btn inline-flex items-center justify-center bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
            >
              Schedule Free Assessment
            </Link>
            <Link
              href="tel:+18666572383"
              className="h-btn inline-flex items-center justify-center border border-ink px-6 py-3.5 text-sm font-medium text-ink"
            >
              Call (866) 657-2383
            </Link>
          </div>
        </section>

        <section className="mt-12 space-y-3">
          <h3 className="font-serif text-xl font-normal text-ink">Cannabis Industry Resources</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/industries/cannabis"
              className="h-hover-cream border border-rule bg-cream p-4 text-sm font-medium text-teal"
            >
              Cannabis Industry Overview →
            </Link>
            <Link
              href="/about"
              className="h-hover-cream border border-rule bg-cream p-4 text-sm font-medium text-teal"
            >
              Security Technology Partners →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
