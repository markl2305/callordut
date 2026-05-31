import Link from "next/link";

const eligibleOrgs = [
  "Public schools and charter networks",
  "Municipalities and county agencies",
  "State colleges and member-driven institutions",
  "Libraries, museums, and community venues",
];

export default function CooperativePurchasingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-4xl px-4 pb-20 pt-10 lg:px-0">
        <section className="bg-cream border border-rule px-6 py-14 lg:px-12 lg:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Cooperative purchasing</p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">
            Statewide cooperative program for public entities.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            CalLord Unified Technologies participates in a statewide cooperative purchasing program that offers discounted pricing,
            pre-vetted compliance paperwork, and simplified procurement for public schools, municipalities, and other eligible agencies.
          </p>
        </section>

        <section className="mt-16 space-y-6 lg:mt-24">
          <h2 className="font-serif text-2xl font-normal text-ink">Who can use the program?</h2>
          <div className="bg-cream border border-rule p-6">
            <ul className="space-y-2 text-sm text-ink-soft">
              {eligibleOrgs.map((org) => (
                <li key={org} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
                  <span className="leading-relaxed">{org}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16 space-y-4 lg:mt-24">
          <h2 className="font-serif text-2xl font-normal text-ink">What you get</h2>
          <div className="bg-cream border border-rule p-6 text-ink">
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>Discounted pricing on AV, smart-room, and security scopes.</li>
              <li>Pre-approved contract language and compliance documentation.</li>
              <li>Faster onboarding of vendors like Eagle Eye Networks and Brivo.</li>
              <li>Point-of-contact at CalLord to shepherd requisitions and reporting.</li>
            </ul>
          </div>
        </section>

        <section className="mt-16 space-y-4 lg:mt-24">
          <h2 className="font-serif text-2xl font-normal text-ink">Next steps</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            If your district, city, or agency needs access to the cooperative paperwork or would like to confirm eligibility, reach out and we’ll connect you with the program administrator plus provide scope templates.
          </p>
          <Link
            href="/contact"
            className="h-btn inline-flex items-center bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
          >
            Schedule Free Assessment
          </Link>
        </section>
      </main>
    </div>
  );
}
