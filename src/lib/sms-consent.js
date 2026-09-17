/**
 * Single source of truth for the SMS opt-in disclosure — BOTH halves of it.
 *
 * Ported from dominusfoundry.com `src/lib/sms-consent.js`, the pattern that
 * cleared carrier review for the Dominus Foundry 10DLC campaign (CEKZSSI).
 * Framework-neutral on purpose: the checkbox that DISPLAYS the disclosure and
 * the API route that RECORDS the grant both import from here, so the text a
 * visitor sees and the text stored as evidence cannot drift apart.
 *
 * Why this exists on callordut.com (2026-09-17): the CalLord campaign CV939HT
 * described "an SMS consent checkbox" on /contact, but every form here bundled
 * texting into a single "By submitting, you agree to receive calls and text
 * messages" sentence — the pattern carrier compliance guidance disqualifies.
 *
 * Carrier requirements this encodes (TCR / CTIA):
 *   - SMS consent is its own affirmative act, never bundled with calls or email.
 *   - Unchecked by default: the component sets no `checked`/`defaultChecked`.
 *   - Discloses message frequency, that rates may apply, STOP and HELP, and
 *     links the message-program privacy policy and SMS terms.
 *
 * The wording must agree with the registered campaign record and /sms-terms.
 * If you change it here, change it in all three.
 */

export const SEGMENTS = [
  {
    text:
      "I agree to receive SMS/text messages from CalLord Unified Technologies at the phone " +
      "number provided. Message frequency varies (typically 1–10 msgs/mo). " +
      "Message and data rates may apply. Reply STOP to opt out, HELP for help. " +
      "Consent is not a condition of purchase. View our ",
  },
  { text: "SMS Terms", href: "/sms-terms" },
  { text: " and " },
  { text: "Privacy Policy", href: "/privacy" },
  { text: "." },
];

export const SMS_CONSENT_TEXT = SEGMENTS.map((s) => s.text).join("");

// Bump whenever SEGMENTS changes. Stored with each grant.
export const SMS_CONSENT_VERSION = "2026-09-17.v1";

/** The non-SMS notice shown under every form. Texts are NOT covered by it. */
export const CONTACT_NOTICE =
  "By submitting, you agree that CalLord Unified Technologies may contact you by phone or email " +
  "about your request. Text messages are sent only if you check the SMS consent box. " +
  "We do not sell your information.";

/**
 * Only a genuinely ticked box counts: `true` from a React boolean, or `"on"`
 * from FormData. Everything else — absent, "", "true" as a string, 1 — is a
 * refusal. Widening this set is a compliance decision, not a convenience one.
 */
export function readSmsConsent(raw) {
  return raw === true || raw === "on";
}

/**
 * Evidence record for one submission. A ticked box with no phone number is
 * recorded as claimed-but-not-granted. Timestamp is server-side.
 */
export function buildConsentRecord({ raw, phone = "", sourceForm = "", req }) {
  const claimed = readSmsConsent(raw);
  const granted = claimed && String(phone).trim() !== "";
  return {
    granted,
    claimed_without_phone: claimed && !granted,
    recorded_at: new Date().toISOString(),
    disclosure_version: SMS_CONSENT_VERSION,
    disclosure_text: SMS_CONSENT_TEXT,
    phone: String(phone).trim(),
    source_form: sourceForm || "unknown",
    ip: req?.headers?.get("x-forwarded-for") || "unknown",
    user_agent: req?.headers?.get("user-agent") || "unknown",
  };
}

/** The consent block appended to every lead notification email. */
export function renderConsentForEmail(record) {
  return [
    "",
    "--- SMS CONSENT (10DLC evidence) ---",
    `SMS Consent: ${record.granted ? "GRANTED" : "NOT GRANTED"}`,
    `Recorded At: ${record.recorded_at}`,
    `Disclosure Version: ${record.disclosure_version}`,
    `Disclosure Shown: ${record.disclosure_text}`,
    record.claimed_without_phone
      ? "Note: the box was checked but no phone number was supplied — not recorded as consent."
      : null,
    `IP: ${record.ip}`,
    `User Agent: ${record.user_agent}`,
  ].filter(Boolean);
}
