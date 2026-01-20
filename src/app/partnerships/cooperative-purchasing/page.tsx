import Link from "next/link";

const eligibleOrgs = [
  "Public schools and charter networks",
  "Municipalities and county agencies",
  "State colleges and member-driven institutions",
  "Libraries, museums, and community venues",
];

export default function CooperativePurchasingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-4xl px-4 pb-20 pt-10 lg:px-0">
        <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_35px_110px_-60px_rgba(0,0,0,0.9)] lg:px-12 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Cooperative purchasing</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Statewide cooperative program for public entities.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            CalLord Unified Technologies participates in a statewide cooperative purchasing program that offers discounted pricing,
            pre-vetted compliance paperwork, and simplified procurement for public schools, municipalities, and other eligible agencies.
          </p>
        </section>

        <section className="mt-16 space-y-6 lg:mt-24">
          <h2 className="text-2xl font-semibold">Who can use the program?</h2>
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
            <ul className="space-y-2 text-sm text-slate-200">
              {eligibleOrgs.map((org) => (
                <li key={org} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                  <span className="leading-relaxed">{org}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16 space-y-4 lg:mt-24">
          <h2 className="text-2xl font-semibold">What you get</h2>
          <div className="rounded-3xl border border-brand-sand/60 bg-brand-sand/30 p-6 text-brand-slate shadow-[0_20px_60px_-50px_rgba(242,232,220,0.8)]">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Discounted pricing on AV, smart-room, and security scopes.</li>
              <li>Pre-approved contract language and compliance documentation.</li>
              <li>Faster onboarding of vendors like Eagle Eye Networks and Brivo.</li>
              <li>Point-of-contact at CalLord to shepherd requisitions and reporting.</li>
            </ul>
          </div>
        </section>

        <section className="mt-16 space-y-4 lg:mt-24">
          <h2 className="text-2xl font-semibold">Next steps</h2>
          <p className="text-sm leading-relaxed text-muted">
            If your district, city, or agency needs access to the cooperative paperwork or would like to confirm eligibility, reach out and we’ll connect you with the program administrator plus provide scope templates.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
          >
            Schedule Free Assessment
          </Link>
        </section>
      </main>
    </div>
  );
}
