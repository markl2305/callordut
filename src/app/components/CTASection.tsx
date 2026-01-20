import Link from "next/link";

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  title,
  subtitle,
  primaryLabel = "Schedule Free Assessment",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="mt-20 rounded-3xl border border-brand-teal/30 bg-gradient-to-br from-brand-teal/15 via-brand-teal/10 to-brand-slate/40 px-6 py-12 lg:mt-28 lg:px-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">{title}</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-3 text-center text-base font-semibold leading-snug text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center rounded-full border border-brand-teal/70 px-6 py-3 text-center text-base font-semibold leading-snug text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
