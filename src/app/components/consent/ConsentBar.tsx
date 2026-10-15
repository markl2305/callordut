"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import useSiteConsent, { type SiteConsentWindow } from "./useSiteConsent";

// Mounts public/consent/consent.js's own bar after hydration (inserted before it, React's re-render would drop it).
// The gate (v2, copied byte-identical from hiresabina) runs with autoBar:false; the bar's wording is the layout's
// CONSENT_CONFIG (barText, acceptLabel, rejectLabel). The gate inserts it in normal flow at the top of <body>, above
// this site's sticky header, so it covers nothing. It shows only when there is no choice yet in the ask-first region
// (state null): not under Global Privacy Control, not after a choice, not in the default-on region (state 'default',
// Mark 2026-10-14/15), and not with JavaScript off. "Your privacy choices" in the footer re-opens it on request.
export default function ConsentBar() {
  const state = useSiteConsent();
  const pathname = usePathname();
  useEffect(() => {
    const c = (window as unknown as SiteConsentWindow).SiteConsent;
    if (state === null && c) c.mountBar();
  }, [state, pathname]);
  return null;
}
