// Utility helpers for GA4/Ads form tracking.
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const googleAdsSendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_SEND_TO;

type LeadEventPayload = {
  formName?: string;
  value?: number;
};

function gtagSafe(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const gtagFn = (window as typeof window & { gtag?: (...a: unknown[]) => void }).gtag;
  if (typeof gtagFn !== "function") return;
  gtagFn(...args);
}

// Fire GA4 generate_lead and (optionally) Google Ads conversion events.
export function trackLead({ formName = "Form submission", value = 1 }: LeadEventPayload = {}) {
  if (!gaMeasurementId) return;
  gtagSafe("event", "generate_lead", {
    event_category: "lead",
    event_label: formName,
    form_name: formName,
    value,
  });

  if (googleAdsSendTo) {
    gtagSafe("event", "conversion", {
      send_to: googleAdsSendTo,
      form_name: formName,
      value,
    });
  }
}
