/**
 * Single source of truth for CalLord's SMS consent: the rule, the checkbox
 * disclosure, and the receipt each submission records.
 *
 * Ported from dominusfoundry.com `src/lib/sms-consent.js`, the pattern that
 * cleared carrier review for the Dominus Foundry 10DLC campaign (CEKZSSI).
 * Framework-neutral on purpose: the checkbox that DISPLAYS the disclosure, the
 * footer / privacy / sms-terms pages that STATE the rule, and the API route
 * that RECORDS the grant all import from here, so they cannot drift apart.
 *
 * Why this exists on callordut.com (2026-09-17): the CalLord campaign CV939HT
 * described "an SMS consent checkbox" on /contact, but every form here bundled
 * texting into a single "By submitting, you agree to receive calls and text
 * messages" sentence — the pattern carrier compliance guidance disqualifies.
 *
 * 2026-10-12 (cmp-callord-sms-1012): /sms-terms and /privacy still said that
 * entering a phone number on a form was an opt-in, while the footer said only
 * the checkbox or verbal agreement was. One rule now, stated from SMS_RULE.
 * Messages are service-only (Mark, attested 2026-10-11: service SMS active,
 * no marketing program). A marketing SMS program would need its own,
 * separate permission — nothing here grants it.
 *
 * Carrier requirements this encodes (TCR / CTIA):
 *   - SMS consent is its own affirmative act, never bundled with calls or email.
 *   - Unchecked by default: the component sets no `checked`/`defaultChecked`.
 *   - Discloses message frequency, that rates may apply, STOP and HELP, and
 *     links the message-program privacy policy and SMS terms.
 *
 * The wording must agree with the registered campaign record. If you change
 * SEGMENTS, bump SMS_CONSENT_VERSION and keep the old text in DISCLOSURE_HISTORY.
 */

export const SELLER = "CalLord Unified Technologies LLC";

/** The only purpose a CalLord SMS grant covers today. */
export const SMS_PURPOSE_SERVICE = "service";

/**
 * THE RULE, in plain language. Footer, /privacy and /sms-terms render these
 * sentences verbatim; the forms render RULE_HEADLINE in their notice.
 */
export const RULE_HEADLINE = "A phone number alone is never permission to text you.";

export const SMS_RULE = [
  RULE_HEADLINE,
  `${SELLER} sends text messages only if you check the separate SMS box on our contact form, which starts unchecked, or if you agree out loud during a call or meeting with us. We record that agreement, and verbal agreement covers service messages only.`,
  "Service messages (appointment, scheduling, and job updates about your request) and marketing messages are separate purposes that need separate permission. We do not send marketing text messages, and checking the SMS box does not sign you up for any.",
  "Leaving the box unchecked authorizes no text messages. You can still request a quote, and we will reply by phone or email.",
  "Message frequency varies. Message and data rates may apply. Reply STOP to opt out, or HELP for help.",
];

export const SEGMENTS = [
  {
    text:
      `Optional: text me about this request. I agree to receive service text messages from ${SELLER} ` +
      "at the mobile number I entered: appointment, scheduling, and job updates about my request. " +
      "No marketing messages. Message frequency varies (typically 1–10 msgs/mo). " +
      "Message and data rates may apply. Reply STOP to opt out, HELP for help. " +
      "Not required to request a quote or to buy anything. View our ",
  },
  { text: "SMS Terms", href: "/sms-terms" },
  { text: " and " },
  { text: "Privacy Policy", href: "/privacy" },
  { text: "." },
];

export const SMS_CONSENT_TEXT = SEGMENTS.map((s) => s.text).join("");

// Bump whenever SEGMENTS changes. Sent by the form and stored with each receipt.
export const SMS_CONSENT_VERSION = "2026-10-12.v2";

/**
 * Every disclosure text that has ever been shown next to the checkbox, by
 * version. A receipt stores the text of the version the form says it showed;
 * a version not listed here cannot be tied to any text and is not a grant.
 */
export const DISCLOSURE_HISTORY = {
  "2026-09-17.v1":
    "I agree to receive SMS/text messages from CalLord Unified Technologies at the phone " +
    "number provided. Message frequency varies (typically 1–10 msgs/mo). " +
    "Message and data rates may apply. Reply STOP to opt out, HELP for help. " +
    "Consent is not a condition of purchase. View our SMS Terms and Privacy Policy.",
  [SMS_CONSENT_VERSION]: SMS_CONSENT_TEXT,
};

/** The non-SMS notice shown under every form. Texts are NOT covered by it. */
export const CONTACT_NOTICE =
  `By submitting, you agree that ${SELLER} may contact you by phone or email about your request. ` +
  `${RULE_HEADLINE} We text you only if you check the SMS box. We do not sell your information.`;

/**
 * Only a genuinely ticked box counts: `true` from a React boolean, or `"on"`
 * from FormData. Everything else — absent, "", "true" as a string, 1 — is a
 * refusal. Widening this set is a compliance decision, not a convenience one.
 */
export function readSmsConsent(raw) {
  return raw === true || raw === "on";
}

/**
 * Consent receipt for one submission, recorded whether or not consent was
 * given. A grant needs all three: the box checked, a phone number, and a
 * disclosure version we can tie to exact text. Timestamp is server-side.
 */
export function buildConsentRecord({ raw, version, phone = "", sourceForm = "", req }) {
  const checked = readSmsConsent(raw);
  const number = String(phone).trim();
  const versionShown = typeof version === "string" && version ? version : null;
  const textShown = versionShown ? DISCLOSURE_HISTORY[versionShown] ?? null : null;
  const granted = checked && number !== "" && textShown !== null;

  let note = null;
  if (checked && number === "") note = "box checked but no phone number supplied; not consent";
  else if (checked && textShown === null) note = "box checked but disclosure version unknown; not consent";

  return {
    consent_id: globalThis.crypto?.randomUUID?.() ?? `c-${Date.now()}`,
    granted,
    channel: "sms",
    seller: SELLER,
    purposes: granted ? [SMS_PURPOSE_SERVICE] : [],
    marketing: false,
    affirmative_action: checked ? "checkbox_checked" : "none",
    phone: number,
    recorded_at: new Date().toISOString(),
    disclosure_version: versionShown,
    disclosure_text: textShown,
    note,
    source_form: sourceForm || "unknown",
    ip: req?.headers?.get("x-forwarded-for") || "unknown",
    user_agent: req?.headers?.get("user-agent") || "unknown",
  };
}

/** The consent receipt appended to every lead notification email. */
export function renderConsentForEmail(record) {
  return [
    "",
    "--- SMS CONSENT RECEIPT (10DLC evidence) ---",
    `SMS Consent: ${record.granted ? "GRANTED" : "NOT GRANTED"}`,
    `Consent ID: ${record.consent_id}`,
    `Seller: ${record.seller}`,
    `Purpose: ${record.purposes.length ? record.purposes.join(", ") : "none"} (marketing: no)`,
    `Affirmative Action: ${record.affirmative_action}`,
    `Phone: ${record.phone || "(none)"}`,
    `Recorded At: ${record.recorded_at}`,
    `Disclosure Version: ${record.disclosure_version ?? "(none sent)"}`,
    `Disclosure Shown: ${record.disclosure_text ?? "(unknown)"}`,
    record.note ? `Note: ${record.note}` : null,
    `Source Form: ${record.source_form}`,
    `IP: ${record.ip}`,
    `User Agent: ${record.user_agent}`,
  ].filter(Boolean);
}
