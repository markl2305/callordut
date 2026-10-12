"use client";

import Link from "next/link";
import useSiteConsent, { chooseConsent } from "./useSiteConsent";

// The analytics/advertising choice (compliance P1-1g, Mark 2026-10-12). The decision logic is the shared gate,
// public/consent/consent.js (hiresabina.ai's file, copied byte-identical); only the bar is this site's own. The
// shared file's built-in bar names "Google Analytics, Vercel Web Analytics", which is wrong here: this site has
// no Vercel analytics, and its Google tag also carries Google Ads. So the gate runs with autoBar:false and this
// bar says what this site actually loads. It keeps the shared markup hooks (data-consent-bar, data-consent) so
// the same tracking-matrix harness drives it. Nothing renders until the gate reports "no choice yet": not under
// Global Privacy Control, not after a choice, and not with JavaScript off.
export default function ConsentBar() {
  const state = useSiteConsent();
  if (state !== null) return null;
  return (
    <div
      role="region"
      aria-label="Analytics and advertising choice"
      data-consent-bar=""
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: ".6rem 1rem",
        padding: ".75rem 1rem",
        fontSize: ".9rem",
        lineHeight: 1.45,
        background: "#1d1a15",
        color: "#efe7d8",
        borderTop: "1px solid rgba(239,231,216,.25)",
      }}
    >
      <p style={{ margin: 0, flex: "1 1 22rem" }}>
        We use Google Analytics and Google Ads (advertising measurement and remarketing) only if you allow it.
        Nothing is sent until you choose.{" "}
        <Link href="/privacy" style={{ color: "inherit", textDecoration: "underline" }}>
          Privacy Policy
        </Link>
      </p>
      {(
        [
          ["accept", "Allow analytics and ads"],
          ["reject", "No analytics or ads"],
        ] as const
      ).map(([choice, label]) => (
        <button
          key={choice}
          type="button"
          data-consent={choice}
          onClick={() => chooseConsent(choice)}
          style={{
            font: "inherit",
            minHeight: 44,
            padding: ".5rem 1rem",
            cursor: "pointer",
            border: "1px solid #efe7d8",
            borderRadius: 2,
            background: choice === "accept" ? "#efe7d8" : "transparent",
            color: choice === "accept" ? "#1d1a15" : "#efe7d8",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
