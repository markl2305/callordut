import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { Mono, FONT } from "./primitives";

const COLS: { h: string; items: { label: string; href: string; external?: boolean }[] }[] = [
  {
    h: "Services",
    items: [
      { label: "Security Systems", href: "/security" },
      { label: "AV Integration", href: "/av-integration" },
      { label: "Smart Room Design", href: "/smart-room-design" },
      { label: "Project Management", href: "/services/project-management" },
      { label: "Cannabis Security", href: "/services/cannabis-security" },
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
    <footer style={{ background: "var(--h-cream)", borderTop: "1px solid var(--h-rule)" }}>
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "64px clamp(24px, 5vw, 56px) 36px" }}>
        <div className="cl-grid-footer" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <BrandMark size={46} haloBg="var(--h-logo-bg-alt)" />
              <div style={{ lineHeight: 1 }}>
                <div style={{ fontFamily: FONT.display, fontSize: 23, color: "var(--h-logo-name)", fontWeight: 600, letterSpacing: "-0.01em" }}>
                  CalLord
                </div>
                <div style={{ fontFamily: FONT.display, fontSize: 9, color: "var(--h-logo-sub)", fontWeight: 400, letterSpacing: "0.22em", marginTop: 4, textTransform: "uppercase" }}>
                  Unified Technologies
                </div>
              </div>
            </div>
            <p style={{ fontFamily: FONT.sans, fontSize: 14.5, color: "var(--h-ink-soft)", lineHeight: 1.6, marginTop: 20, maxWidth: 340 }}>
              Commercial security and audiovisual integration. Two disciplines, one accountable partner —
              designed, installed, and supported for the long term.
            </p>
            <div style={{ marginTop: 22 }}>
              <a href="tel:+18666572383" style={{ fontFamily: FONT.serif, fontSize: 22, color: "var(--h-ink)", textDecoration: "none" }}>
                (866) 657-2383
              </a>
              <a href="mailto:sales@callordut.com" style={{ display: "block", marginTop: 6, textDecoration: "none" }}>
                <Mono>sales@callordut.com</Mono>
              </a>
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <Mono>{c.h}</Mono>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
                {c.items.map((it) =>
                  it.external ? (
                    <a key={it.label} href={it.href} target="_blank" rel="noopener noreferrer" className="h-link" style={{ fontFamily: FONT.sans, fontSize: 15, color: "var(--h-ink)", textDecoration: "none" }}>
                      {it.label}
                    </a>
                  ) : (
                    <Link key={it.label} href={it.href} className="h-link" style={{ fontFamily: FONT.sans, fontSize: 15, color: "var(--h-ink)", textDecoration: "none" }}>
                      {it.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Compliance / 10DLC disclosure — load-bearing, preserved from prior footer */}
        <p style={{ fontFamily: FONT.sans, fontSize: 12.5, color: "var(--h-ink-faint)", lineHeight: 1.6, marginTop: 44, maxWidth: 820 }}>
          By contacting us you agree we may call or text (SMS/MMS) about your request. Message frequency
          varies. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help. We do not
          sell your information. See our{" "}
          <Link href="/privacy" style={{ color: "var(--h-teal)", textDecoration: "none" }}>Privacy Policy</Link>{" "}
          and{" "}
          <Link href="/sms-terms" style={{ color: "var(--h-teal)", textDecoration: "none" }}>SMS Terms</Link>.
        </p>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--h-rule)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <Mono>CalLord Unified Technologies LLC · © 2026</Mono>
          <Mono style={{ color: "var(--h-teal)" }}>Exclusive Forge partner</Mono>
        </div>
      </div>
    </footer>
  );
}
