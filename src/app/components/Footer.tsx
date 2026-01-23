import Link from "next/link";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-card-muted py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-6">
        <div className="space-y-3">
          <BrandMark />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Smart rooms, AV, and security design for teams that care about the experience.
          </p>
          <p className="mt-2 max-w-xs text-[13px] leading-relaxed">
            By contacting us you agree we may call or text (SMS/MMS) about your request; message and data rates may apply. We do not sell your information. See our{" "}
            <Link href="/privacy" className="font-semibold text-brand-teal underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="mt-2 max-w-xs text-[13px] leading-relaxed">
            Nationwide projects welcome. Public entities can access our{" "}
            <Link href="/partnerships/cooperative-purchasing" className="font-semibold text-brand-teal underline-offset-2 hover:underline">
              cooperative purchasing option
            </Link>{" "}
            for pre-vetted compliance.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-6 text-sm font-semibold text-muted sm:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground">Services</p>
            <div className="flex flex-col gap-2">
              <Link href="/smart-room-design" className="transition hover:text-brand-teal">
                Smart Room Design
              </Link>
              <Link href="/av-integration" className="transition hover:text-brand-teal">
                AV Integration
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground">Industries</p>
            <div className="flex flex-col gap-2">
              <Link href="/industries/senior-living" className="transition hover:text-brand-teal">
                Senior Living
              </Link>
              <Link href="/industries/hospitality" className="transition hover:text-brand-teal">
                Hospitality
              </Link>
              <Link href="/industries/offices" className="transition hover:text-brand-teal">
                Offices
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground">Room Types</p>
            <div className="flex flex-col gap-2">
              <Link href="/room-types/executive-boardroom" className="transition hover:text-brand-teal">
                Executive Boardroom
              </Link>
              <Link href="/room-types/team-meeting-room" className="transition hover:text-brand-teal">
                Team Meeting Room
              </Link>
              <Link href="/room-types/virtual-visit-telehealth" className="transition hover:text-brand-teal">
                Virtual Visit Room
              </Link>
              <Link href="/room-types" className="transition hover:text-brand-teal">
                All Room Types →
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground">Company</p>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="transition hover:text-brand-teal">
                About
              </Link>
              <Link href="/contact" className="transition hover:text-brand-teal">
                Contact
              </Link>
              <Link href="/partnerships/cooperative-purchasing" className="transition hover:text-brand-teal">
                Cooperative Purchasing
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-4 border-t border-white/10 px-4 pt-6 text-xs text-muted lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-foreground font-semibold">CalLord Unified Technologies LLC</span>
          <span className="text-white/30">|</span>
          <span>© 2025 CalLord Unified Technologies</span>
          <span className="text-white/30">|</span>
          <Link href="/privacy" className="hover:text-brand-teal">
            Privacy Policy
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:border-l lg:border-white/10 lg:pl-6">
          <a href="tel:+18666572383" className="hover:text-brand-teal">
            (866) 657-2383
          </a>
          <span className="text-white/30">|</span>
          <a href="mailto:sales@callordut.com" className="hover:text-brand-teal">
            sales@callordut.com
          </a>
        </div>
      </div>
    </footer>
  );
}
