import Link from "next/link";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050810] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-6">
        <div className="max-w-sm space-y-4">
          <BrandMark />
          <p className="text-sm leading-relaxed text-muted">
            Smart rooms, AV, and security design for teams that care about the experience.
          </p>
          <p className="text-[13px] leading-relaxed text-slate-500">
            By contacting us you agree we may call or text (SMS/MMS) about your request. Message frequency varies. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help. We do not sell your information. See our{" "}
            <Link href="/privacy" className="font-medium text-brand-teal underline-offset-2 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/sms-terms" className="font-medium text-brand-teal underline-offset-2 hover:underline">
              SMS Terms
            </Link>
            .
          </p>
          <p className="text-[13px] leading-relaxed text-slate-500">
            Nationwide projects welcome. Public entities can access our{" "}
            <Link href="/partnerships/cooperative-purchasing" className="font-medium text-brand-teal underline-offset-2 hover:underline">
              cooperative purchasing option
            </Link>{" "}
            for pre-vetted compliance.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-4 sm:gap-6 lg:gap-8 text-sm sm:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Services</p>
            <div className="flex flex-col gap-2 text-slate-400">
              <Link href="/smart-room-design" className="transition-colors hover:text-brand-teal">Smart Room Design</Link>
              <Link href="/av-integration" className="transition-colors hover:text-brand-teal">AV Integration</Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Industries</p>
            <div className="flex flex-col gap-2 text-slate-400">
              <Link href="/industries/senior-living" className="transition-colors hover:text-brand-teal">Senior Living</Link>
              <Link href="/industries/hospitality" className="transition-colors hover:text-brand-teal">Hospitality</Link>
              <Link href="/industries/offices" className="transition-colors hover:text-brand-teal">Offices</Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Room Types</p>
            <div className="flex flex-col gap-2 text-slate-400">
              <Link href="/room-types/executive-boardroom" className="transition-colors hover:text-brand-teal">Executive Boardroom</Link>
              <Link href="/room-types/team-meeting-room" className="transition-colors hover:text-brand-teal">Team Meeting Room</Link>
              <Link href="/room-types/virtual-visit-telehealth" className="transition-colors hover:text-brand-teal">Virtual Visit Room</Link>
              <Link href="/room-types" className="transition-colors hover:text-brand-teal">All Room Types →</Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Company</p>
            <div className="flex flex-col gap-2 text-slate-400">
              <Link href="/about" className="transition-colors hover:text-brand-teal">About</Link>
              <Link href="/contact" className="transition-colors hover:text-brand-teal">Contact</Link>
              <Link href="/partnerships/cooperative-purchasing" className="transition-colors hover:text-brand-teal">Cooperative Purchasing</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider mx-auto mt-10 max-w-6xl" />
      <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-4 px-4 text-xs text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-medium text-slate-400">CalLord Unified Technologies LLC</span>
          <span className="text-white/10">|</span>
          <span>&copy; 2026 CalLord Unified Technologies</span>
          <span className="text-white/10">|</span>
          <Link href="/privacy" className="hover:text-brand-teal">Privacy Policy</Link>
          <span className="text-white/10">|</span>
          <Link href="/sms-terms" className="hover:text-brand-teal">SMS Terms</Link>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:border-l lg:border-white/[0.06] lg:pl-6">
          <a href="tel:+18666572383" className="hover:text-brand-teal">(866) 657-2383</a>
          <span className="text-white/10">|</span>
          <a href="mailto:sales@callordut.com" className="hover:text-brand-teal">sales@callordut.com</a>
        </div>
      </div>
    </footer>
  );
}
