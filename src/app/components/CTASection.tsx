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
  primaryLabel = "Request a walkthrough",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <FadeIn className="mt-20 lg:mt-28">
      <section className="border border-rule bg-cream px-6 py-12 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-ink lg:text-4xl">{title}</h2>
            <p className="max-w-2xl text-base leading-relaxed text-ink-soft">{subtitle}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <Link
              href={primaryHref}
              className="h-btn inline-flex items-center justify-center bg-ink px-6 py-3.5 text-sm font-medium text-paper"
            >
              {primaryLabel} →
            </Link>
            {secondaryLabel && secondaryHref ? (
              <Link
                href={secondaryHref}
                className="h-btn inline-flex items-center justify-center border border-ink bg-transparent px-6 py-3.5 text-sm font-medium text-ink"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
