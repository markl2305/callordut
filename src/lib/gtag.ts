export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// The consent gate's one answer (public/consent/consent.js rule 7): may any vendor run on this page now? False before a
// choice, after "No thanks", under Global Privacy Control and after a withdrawal on this page. Never decide on the
// stored choice (state() === "accept") instead.
const consentAllowed = () =>
  typeof window !== "undefined" &&
  !!(window as unknown as { SiteConsent?: { allowed: () => boolean } }).SiteConsent?.allowed();

export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !consentAllowed()) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    // B-19: automatic user-provided-data collection stays off on every config call (src/app/layout.tsx).
    user_data: null,
  });
};

export const event = (action: string, params: Record<string, any> = {}) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !consentAllowed()) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
};
