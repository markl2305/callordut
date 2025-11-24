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
            <div>
              Phone: <span className="text-foreground">(505) 315-7773</span>
            </div>
            <div>
              Email: <span className="text-foreground">sales@callordut.com</span>
            </div>
            <p className="mt-2 max-w-xs text-[13px] leading-relaxed">
              Nationwide projects welcome. Public entities can access our{" "}
              <Link href="/partnerships/cooperative-purchasing" className="font-semibold text-brand-teal underline-offset-2 hover:underline">
                cooperative purchasing option
              </Link>{" "}
              for pre-vetted compliance.
            </p>
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
