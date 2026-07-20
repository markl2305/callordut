"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLockup } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";
import { FONT } from "./primitives";
import { CANNABIS_CONTENT_ENABLED } from "@/config/flags";

type Item = { label: string; href: string };
type NavEntry = { label: string; href: string; items?: Item[] };

// Cannabis entries are gated by the same flag that controls whether the
// underlying pages render — otherwise the nav dead-ends into a redirect
// with no explanation whenever the flag is off (see CANNABIS_CONTENT_ENABLED).
const NAV: NavEntry[] = [
  {
    label: "Security",
    href: "/security",
    items: [
      { label: "Security Systems Overview", href: "/security" },
      { label: "Multifamily Security", href: "/solutions/multifamily-security" },
      { label: "Financial Institutions", href: "/solutions/financial-institutions" },
      ...(CANNABIS_CONTENT_ENABLED ? [{ label: "Cannabis Facility Security", href: "/services/cannabis-security" }] : []),
    ],
  },
  {
    label: "AV Integration",
    href: "/av-integration",
    items: [
      { label: "AV Integration Overview", href: "/av-integration" },
      { label: "Smart Room Design", href: "/smart-room-design" },
      { label: "Room Types", href: "/room-types" },
      { label: "Project Management", href: "/services/project-management" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    items: [
      { label: "Senior Living", href: "/industries/senior-living" },
      { label: "Hospitality", href: "/industries/hospitality" },
      { label: "Offices", href: "/industries/offices" },
      ...(CANNABIS_CONTENT_ENABLED ? [{ label: "Cannabis", href: "/industries/cannabis" }] : []),
    ],
  },
  { label: "The Forge Partnership", href: "/partnerships/forge" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const linkStyle = (active: boolean) => ({
    fontFamily: FONT.sans,
    fontSize: 13.5,
    color: active ? "var(--h-teal)" : "var(--h-ink)",
    textDecoration: "none",
    fontWeight: active ? 600 : 450,
    cursor: "pointer",
    display: "inline-block" as const,
    paddingBottom: 4,
    borderBottom: active ? "1.5px solid var(--h-teal)" : "1.5px solid transparent",
    whiteSpace: "nowrap" as const,
  });

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--h-nav-bg)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--h-rule)",
        transition: "background .4s ease, border-color .4s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1340,
          margin: "0 auto",
          padding: "14px clamp(24px, 5vw, 56px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
          <BrandLockup />
        </Link>

        {/* Desktop nav */}
        <nav className="cl-nav-desktop" style={{ display: "flex", gap: 26, alignItems: "center" }}>
          {NAV.map((entry) =>
            entry.items ? (
              <div
                key={entry.label}
                style={{ position: "relative", display: "flex", alignItems: "center" }}
                onMouseEnter={() => setOpen(entry.label)}
                onMouseLeave={() => setOpen(null)}
              >
                <Link href={entry.href} style={linkStyle(!!isActive(entry.href))} className="h-link">
                  {entry.label}
                </Link>
                {open === entry.label && (
                  <div style={{ position: "absolute", left: 0, top: "100%", paddingTop: 14 }}>
                    <div
                      style={{
                        minWidth: 240,
                        background: "var(--h-paper)",
                        border: "1px solid var(--h-rule)",
                        boxShadow: "0 20px 50px -24px rgba(0,0,0,0.4)",
                        padding: 8,
                      }}
                    >
                      {entry.items.map((it) => (
                        <Link
                          key={it.href}
                          href={it.href}
                          className="h-hover-cream"
                          style={{
                            display: "block",
                            padding: "10px 14px",
                            fontFamily: FONT.sans,
                            fontSize: 14,
                            color: "var(--h-ink)",
                            textDecoration: "none",
                          }}
                        >
                          {it.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={entry.href} href={entry.href} className="h-link" style={linkStyle(!!isActive(entry.href))}>
                {entry.label}
              </Link>
            )
          )}
        </nav>

        <div className="cl-nav-actions" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <ThemeToggle />
          <Link
            href="/contact"
            className="cl-cta-desktop"
            style={{
              fontFamily: FONT.sans,
              fontSize: 13,
              fontWeight: 500,
              background: "var(--h-ink)",
              color: "var(--h-paper)",
              padding: "10px 18px",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
          >
            Request a walkthrough
          </Link>
          <button
            className="cl-burger"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              display: "none",
              width: 38,
              height: 38,
              placeItems: "center",
              background: "transparent",
              border: "1px solid var(--h-rule)",
              color: "var(--h-ink)",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="cl-mobile-menu"
          style={{
            borderTop: "1px solid var(--h-rule)",
            background: "var(--h-paper)",
            padding: "16px clamp(24px, 5vw, 56px) 24px",
          }}
        >
          {NAV.map((entry) => (
            <div key={entry.label} style={{ borderTop: "1px solid var(--h-rule-soft)", padding: "12px 0" }}>
              <Link
                href={entry.href}
                onClick={() => setMenuOpen(false)}
                style={{ fontFamily: FONT.serif, fontSize: 20, color: "var(--h-ink)", textDecoration: "none" }}
              >
                {entry.label}
              </Link>
              {entry.items && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10, paddingLeft: 4 }}>
                  {entry.items.map((it) => (
                    <Link
                      key={it.href}
                      href={it.href}
                      onClick={() => setMenuOpen(false)}
                      style={{ fontFamily: FONT.sans, fontSize: 14, color: "var(--h-ink-soft)", textDecoration: "none" }}
                    >
                      {it.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              textAlign: "center",
              marginTop: 18,
              fontFamily: FONT.sans,
              fontSize: 14,
              fontWeight: 500,
              background: "var(--h-ink)",
              color: "var(--h-paper)",
              padding: "14px 18px",
              textDecoration: "none",
            }}
          >
            Request a walkthrough →
          </Link>
        </div>
      )}
    </header>
  );
}
