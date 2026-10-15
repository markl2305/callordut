import Image from "next/image";
import Link from "next/link";
import { SmsConsentRule } from "../SmsConsentRule";

const COLS: { h: string; items: { label: string; href: string; external?: boolean }[] }[] = [
  {
    h: "Services",
    items: [
      { label: "Security Systems", href: "/security" },
      { label: "AV Integration", href: "/av-integration" },
      { label: "Smart Room Design", href: "/smart-room-design" },
      { label: "Project Management", href: "/services/project-management" },
    ],
  },
  {
    h: "Industries",
    items: [
      { label: "Senior Living", href: "/industries/senior-living" },
      { label: "Hospitality", href: "/industries/hospitality" },
      { label: "Offices", href: "/industries/offices" },
      { label: "Multifamily", href: "/solutions/multifamily-security" },
      { label: "Financial Institutions", href: "/solutions/financial-institutions" },
    ],
  },
  {
    h: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "The Forge Partnership", href: "/partnerships/forge" },
      { label: "Cooperative Purchasing", href: "/partnerships/cooperative-purchasing" },
      { label: "Contact", href: "/contact" },
      { label: "buildwithforge.app", href: "https://buildwithforge.app", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="cl-foot">
      <div className="cl-shell">
        <div className="cl-foot-grid">
          <div className="cl-foot-brand">
            <Link className="cl-brand" href="/" aria-label="CalLord Unified Technologies, home">
              <span className="mk">
                <Image src="/heritage/cl-mark-black.png" alt="" width={30} height={30} />
              </span>
              <span>
                <b>CalLord</b>
                <small>Unified Technologies</small>
              </span>
            </Link>
            <p>
              Commercial security and audiovisual integration. Two disciplines, one accountable partner —
              designed, installed, and supported for the long term.
            </p>
            <a className="tel" href="tel:+15055201779">
              (505) 520-1779
            </a>
            <br />
            <a className="mail" href="mailto:sales@callordut.com">
              sales@callordut.com
            </a>
          </div>
          {COLS.map((c) => (
            <nav key={c.h} className="cl-foot-col" aria-label={c.h}>
              <h2>{c.h}</h2>
              {c.items.map((it) =>
                it.external ? (
                  <a key={it.label} href={it.href} target="_blank" rel="noopener noreferrer">
                    {it.label}
                  </a>
                ) : (
                  <Link key={it.label} href={it.href}>
                    {it.label}
                  </Link>
                )
              )}
            </nav>
          ))}
        </div>

        {/* Compliance / 10DLC disclosure — load-bearing, rendered verbatim from src/lib/sms-consent.js */}
        <div className="cl-legal">
          <SmsConsentRule />
          <p>
            We do not sell your information. See our{" "}
            <Link href="/privacy">Privacy Policy</Link>{" "}
            and{" "}
            <Link href="/sms-terms">SMS Terms</Link>.
          </p>
          {/* Mark 2026-10-14/15 (shared memory 77550c45): on every page, in every region. public/consent/consent.js
              re-opens the Allow / No thanks choice on click (data-consent-open); with JavaScript off or under Global
              Privacy Control it is an ordinary link to the choice on the privacy notice. A plain <a>, not <Link>, so
              the gate's capture-phase handler sees the click before the client-side router. */}
          <p>
            <a href="/privacy#analytics-choice" data-consent-open="">
              Your privacy choices
            </a>
          </p>
        </div>

        <div className="cl-foot-end">
          <span>CalLord Unified Technologies LLC · © 2026</span>
          <span>Exclusive Forge partner</span>
        </div>
      </div>
    </footer>
  );
}
