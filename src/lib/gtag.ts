export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const event = (action: string, params: Record<string, any> = {}) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  window.gtag("event", action, params);
};
