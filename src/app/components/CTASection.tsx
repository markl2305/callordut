import { CloseBand } from "./system/Blocks";

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/* The page's closing call to action, in the site system's close band. */
export function CTASection({
  title,
  subtitle,
  primaryLabel = "Request a walkthrough",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <CloseBand
      title={title}
      lead={<p>{subtitle}</p>}
      primary={{ label: `${primaryLabel} →`, href: primaryHref }}
      secondary={secondaryLabel && secondaryHref ? { label: secondaryLabel, href: secondaryHref } : undefined}
    />
  );
}
