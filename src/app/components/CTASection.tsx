import Link from "next/link";
import { FadeIn } from "./MotionWrappers";

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
    <FadeIn className="mt-20 lg:mt-28">
      <section className="relative overflow-hidden rounded-3xl">
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-brand-teal/30 via-transparent to-brand-teal/10" />
        <div className="relative rounded-3xl bg-[#070a14]/95 px-6 py-12 lg:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(39,154,146,0.1),transparent_60%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">{title}</h2>
              <p className="max-w-2xl text-base leading-relaxed text-muted">{subtitle}</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-3 text-center text-base font-semibold text-[#070a14] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(39,154,146,0.6)]"
              >
                {primaryLabel}
              </Link>
              {secondaryLabel && secondaryHref ? (
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-center text-base font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-teal/30"
                >
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
