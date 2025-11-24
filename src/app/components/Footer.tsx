import Link from "next/link";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-card-muted py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-6">
        <div className="space-y-3">
          <BrandMark />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Smart rooms, AV, and security design for teams that care about the experience.
          </p>
          <div className="text-sm text-muted">
            <div className="text-foreground font-semibold">CalLord Unified Technologies LLC</div>
            <div>13170 Central Ave SE Suite B537</div>
            <div>Albuquerque, NM 87123, United States</div>
            <div className="mt-2">
              Phone:{" "}
              <a href="tel:+15052075211" className="text-foreground hover:text-brand-teal">
                (505) 207-5211
              </a>
            </div>
            <div>
              Email:{" "}
              <a href="mailto:sales@callordut.com" className="text-foreground hover:text-brand-teal">
                sales@callordut.com
              </a>
            </div>
            <p className="mt-2 max-w-xs text-[13px] leading-relaxed">
              Nationwide projects welcome. Public entities can access our{" "}
              <Link href="/partnerships/cooperative-purchasing" className="font-semibold text-brand-teal underline-offset-2 hover:underline">
                cooperative purchasing option
              </Link>{" "}
              for pre-vetted compliance.
            </p>
            <div className="mt-3 flex gap-4 text-xs font-semibold">
              <Link href="/privacy" className="transition hover:text-brand-teal">
                Privacy Policy
              </Link>
              <span className="text-white/30">|</span>
              <span className="text-white/60">Terms (coming soon)</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm font-semibold text-muted sm:grid-cols-3">
          <Link href="/" className="transition hover:text-brand-teal">
            Home
          </Link>
          <Link href="/services" className="transition hover:text-brand-teal">
            Services
          </Link>
          <Link href="/about" className="transition hover:text-brand-teal">
            About
          </Link>
          <Link href="/services/av-integration" className="transition hover:text-brand-teal">
            AV Integration
          </Link>
          <Link href="/services/cannabis-security" className="transition hover:text-brand-teal">
            Cannabis Security
          </Link>
          <Link href="/services/custom-solutions" className="transition hover:text-brand-teal">
            Custom Solutions
          </Link>
          <Link href="/contact" className="transition hover:text-brand-teal">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
