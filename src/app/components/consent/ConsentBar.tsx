"use client";

import Link from "next/link";
import useSiteConsent, { chooseConsent } from "./useSiteConsent";

// The analytics choice (compliance P1-1g, Mark 2026-10-12/13). The decision logic is the shared gate,
// public/consent/consent.js (hiresabina.ai's file at d0c2a21, copied byte-identical); only the bar's wording and
// placement are this site's. The gate runs with autoBar:false (set in the layout's CONSENT_CONFIG), and this
// component reads the gate's state through its `siteconsent` hook. Mark ruled 2026-10-13 that where Google Ads is
// linked to the GA4 tag, the one choice is named honestly as covering Google Analytics AND cookieless Google Ads
// measurement; the shared file's built-in bar does not say that, so it is not used here. Markup hooks
// (data-consent-bar, data-consent) match the shared bar so the same tracking-matrix harness drives it. Placement
// is site CSS (globals.css, [data-consent-bar]). Nothing renders until the gate reports "no choice yet": not under
// Global Privacy Control, not after a choice, and not with JavaScript off.
export const BAR_TEXT =
  "We use Google Analytics and cookieless Google Ads measurement only if you allow it. Nothing is sent until you choose.";

export default function ConsentBar() {
  const state = useSiteConsent();
  if (state !== null) return null;
  return (
    <div role="region" aria-label="Analytics choice" data-consent-bar="" className="cl-consent-bar">
      <p>
        {BAR_TEXT}{" "}
        <Link href="/privacy#analytics">Privacy Policy</Link>
      </p>
      {(
        [
          ["accept", "Allow"],
          ["reject", "No thanks"],
        ] as const
      ).map(([choice, label]) => (
        <button key={choice} type="button" data-consent={choice} onClick={() => chooseConsent(choice)}>
          {label}
        </button>
      ))}
    </div>
  );
}
