"use client";

import useSiteConsent, { chooseConsent } from "./useSiteConsent";

// The withdraw / change control for public/consent/consent.js on /privacy (compliance P1-1g, Mark 2026-10-12).
// Under Global Privacy Control the signal wins and there is nothing to change here.
const SAYS = {
  gpc: "Your browser is sending a Global Privacy Control signal, so Google Analytics and Google Ads measurement stay off on this site and you will not be asked.",
  accept: "You allowed Google Analytics and cookieless Google Ads measurement on this browser.",
  reject: "You chose no analytics on this browser: nothing is sent to Google Analytics or Google Ads.",
  none: "You have not made a choice on this browser, so nothing has been sent to Google Analytics or Google Ads.",
  nojs: "With JavaScript off, this site sends nothing to Google Analytics or Google Ads.",
} as const;

const BUTTON: React.CSSProperties = {
  font: "inherit",
  minHeight: 44,
  padding: ".5rem 1rem",
  cursor: "pointer",
  border: "2px solid var(--h-ink, #1d1a15)",
  borderRadius: 2,
  background: "transparent",
  color: "var(--h-ink, #1d1a15)",
  fontWeight: 600,
};

export default function ConsentChoice() {
  const raw = useSiteConsent();
  const state: keyof typeof SAYS = raw === "loading" ? "nojs" : raw || "none";
  return (
    <div data-consent-choice={state} className="mt-3 border border-rule bg-paper p-5">
      <p role="status" className="font-medium text-ink">
        {SAYS[state]}
      </p>
      {state !== "gpc" && state !== "nojs" && (
        <div className="mt-4 flex flex-wrap gap-3">
          {state !== "reject" && (
            <button type="button" style={BUTTON} data-consent-withdraw="" onClick={() => chooseConsent("reject")}>
              {state === "accept" ? "Withdraw: no analytics" : "No thanks"}
            </button>
          )}
          {state !== "accept" && (
            <button type="button" style={BUTTON} data-consent-allow="" onClick={() => chooseConsent("accept")}>
              Allow
            </button>
          )}
        </div>
      )}
    </div>
  );
}
