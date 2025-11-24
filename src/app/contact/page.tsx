import { SectionHeader } from "../components/SectionHeader";

const interestAreas = [
  "AV integration",
  "Cannabis security",
  "Smart rooms",
  "Remote project management",
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-6 lg:px-6">
        <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.8)] lg:px-12 lg:py-20">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Get started</p>
            <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Tell us what you’re building.
            </h1>
            <p className="text-lg leading-relaxed text-muted lg:text-xl">
              A couple of sentences about your rooms, sites, or cannabis facilities is enough to begin. No RFP required.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-sm text-slate-100 shadow-md shadow-black/40 lg:mt-12">
          <div className="flex flex-col gap-2 text-slate-200 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-semibold text-slate-50">Call or email us directly</p>
              <p>Nationwide projects welcome—no state or industry restrictions.</p>
            </div>
            <div className="space-y-1 text-slate-50">
              <div>
                Phone: <a className="font-semibold text-brand-teal" href="tel:15053157773">(505) 315-7773</a>
              </div>
              <div>
                Email:{" "}
                <a className="font-semibold text-brand-teal" href="mailto:sales@callordut.com">
                  sales@callordut.com
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-8 lg:mt-24">
          <SectionHeader
            title="Project intake"
            subtitle="We’ll reply with a quick plan, clarifying questions, and a time to review live if you’d like."
          />
          <form
            className="grid gap-4 rounded-3xl border border-brand-teal/30 bg-gradient-to-br from-brand-teal/15 via-brand-teal/10 to-brand-slate/40 px-6 py-10 lg:grid-cols-2 lg:px-12"
            action="#"
            method="post"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-foreground">
                Name*
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="org" className="text-sm font-semibold text-foreground">
                Organization / Community*
              </label>
              <input
                id="org"
                name="organization"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                placeholder="Company, campus, or facility"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email*
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                placeholder="you@company.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-semibold text-foreground">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-semibold text-foreground">
                Location (city/state or region)*
              </label>
              <input
                id="location"
                name="location"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                placeholder="e.g., Phoenix, AZ or Mountain West"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">What you’re building*</label>
              <div className="grid gap-2 sm:grid-cols-2">
                {interestAreas.map((area) => (
                  <label key={area} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground">
                    <input type="checkbox" name="interests" value={area} className="h-4 w-4 rounded border-white/40 bg-card" />
                    <span>{area}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2 lg:col-span-2">
              <label htmlFor="project" className="text-sm font-semibold text-foreground">
                Tell us about your rooms or project*
              </label>
              <textarea
                id="project"
                name="project"
                rows={5}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                placeholder="Room types, challenges today, success looks like..."
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="timeline" className="text-sm font-semibold text-foreground">
                Timeline
              </label>
              <input
                id="timeline"
                name="timeline"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                placeholder="e.g., Pilot in Q2, rollout by Q4"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="budget" className="text-sm font-semibold text-foreground">
                Budget range
              </label>
              <input
                id="budget"
                name="budget"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                placeholder="Rough range is fine"
              />
            </div>
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
              >
                Send my project brief
              </button>
            </div>
          </form>
        </section>

        <section className="mt-12 rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-sm text-slate-200 shadow-md shadow-black/40 lg:mt-16">
          <p className="text-slate-200">
            Prefer to skip the form? Email us at{" "}
            <a href="mailto:sales@callordut.com" className="font-semibold text-brand-teal">
              sales@callordut.com
            </a>{" "}
            or call <a href="tel:+15053157773" className="font-semibold text-brand-teal">(505) 315-7773</a>. We work with teams nationwide.
          </p>
        </section>
      </main>
    </div>
  );
}
