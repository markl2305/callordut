"use client";

import { useEffect, useState } from "react";

// 'default': no choice yet in the default-on region (outside the EU/EEA, UK and Switzerland), where analytics run
// unless turned off (public/consent/consent.js rule 12). null: no choice yet in the ask-first region.
export type ConsentState = "gpc" | "accept" | "reject" | "default" | null;
export type SiteConsentWindow = {
  SiteConsent?: {
    state: () => ConsentState;
    allowed: () => boolean;
    set: (choice: "accept" | "reject") => void;
    mountBar: () => void;
  };
};

// The visitor's analytics choice from public/consent/consent.js: 'gpc' | 'accept' | 'reject' | 'default' | null, or
// 'loading' until the (async) gate has run. Re-renders on every change.
export default function useSiteConsent(): ConsentState | "loading" {
  const [state, setState] = useState<ConsentState | "loading">("loading");
  useEffect(() => {
    const read = () => {
      const c = (window as unknown as SiteConsentWindow).SiteConsent;
      if (c) setState(c.state());
    };
    read();
    window.addEventListener("siteconsent", read);
    return () => window.removeEventListener("siteconsent", read);
  }, []);
  return state;
}

// Records a choice. A withdraw also removes Google's browser-storage key (_gcl_ls), which the shared gate's cookie
// clearing does not reach; the gate itself clears the _ga* and _gcl_* cookies and reloads if a tag was running.
export function chooseConsent(choice: "accept" | "reject") {
  const c = (window as unknown as SiteConsentWindow).SiteConsent;
  if (!c) return;
  if (choice === "reject") {
    try {
      Object.keys(window.localStorage)
        .filter((k) => /^(_gcl|_ga)/.test(k))
        .forEach((k) => window.localStorage.removeItem(k));
    } catch {
      /* storage blocked: nothing was stored there either */
    }
  }
  c.set(choice);
}
