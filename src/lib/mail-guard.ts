/**
 * MAIL ABUSE GUARD — ported for audit F-0056.
 *
 * These public lead forms send TWO mails: a notification to a server-fixed inbox, and an
 * autoresponder to the address in the request body. The first is why most public contact
 * forms are safe. The second is the finding: an unauthenticated caller names the
 * recipient, and the platform's shared RESEND_API_KEY delivers.
 *
 * ⚠ WHAT THIS FILE IS NOT. `rateLimit` is a FIXED-WINDOW counter held in the module scope
 * of one serverless isolate. It is not sliding, and it is not shared between isolates,
 * regions or cold starts — forge-web's own copy says so of itself, and the header there
 * calling it "sliding window" is wrong. So it bounds a single noisy sender and does
 * NOTHING against a distributed one. It is a volume bound, not an authorization control,
 * and the arbitrary-recipient authority is removed separately by pinning the autoresponder
 * to the submitted address and escaping what goes into it.
 *
 * Ported rather than shared because these are four standalone repositories with no common
 * package. The copies are deliberate duplication, not an oversight.
 */

type Entry = { count: number; resetAt: number };
const store = new Map<string, Entry>();

const EVICTION_INTERVAL = 5 * 60 * 1000;
let lastEviction = Date.now();

function evictExpired(): void {
  const now = Date.now();
  if (now - lastEviction < EVICTION_INTERVAL) return;
  lastEviction = now;
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  limit: number;
};

export function rateLimit(key: string, limit = 5, windowMs = 60_000): RateLimitResult {
  evictExpired();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs, limit };
  }

  entry.count++;
  if (entry.count > limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt, limit };
  }
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt, limit };
}

/** Vercel sets x-forwarded-for and overwrites it, so a direct client cannot spoof it.
 *  An upstream proxy in front of Vercel would change that. */
export function getClientIp(headers: Headers): string {
  const xff = headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return headers.get('x-real-ip') || 'unknown';
}

/**
 * Escape for interpolation into an HTML mail body.
 *
 * The autoresponder templates interpolate caller-supplied fields directly. Combined with a
 * caller-chosen recipient that is a phishing primitive: attacker content, attacker
 * recipient, the platform's own sending domain. Escaping the five HTML-significant
 * characters removes the injection; the length cap keeps a single field from becoming the
 * whole message.
 */
export function escapeHtml(value: unknown, maxLen = 200): string {
  const s = String(value ?? '').slice(0, maxLen);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Plaintext bodies cannot be HTML-injected, but an unbounded field still lets a caller
 *  compose the whole message. Cap and strip control characters. */
export function escapeText(value: unknown, maxLen = 2000): string {
  return String(value ?? '')
    .slice(0, maxLen)
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
}

/**
 * Escape for a mail SUBJECT line — and this is NOT escapeText.
 *
 * `escapeText` above deliberately PRESERVES \t, \n and \r: its regex skips \u0009,
 * \u000A and \u000D because a plaintext body legitimately contains newlines. A subject
 * line is a header, and CR/LF in a header is the injection vector — a caller-supplied
 * value carrying a newline can append headers of its own. So the subject needs the
 * opposite treatment from the body, and reusing escapeText here would have looked
 * correct while leaving the actual vector open (audit F-0066).
 *
 * ⛔ NOT escapeHtml either: a subject is not HTML, so escaping `&` and `<` there would
 * render literal `&amp;` in the recipient's mail client — a display bug dressed as a fix.
 */
export function escapeSubject(value: unknown, maxLen = 150): string {
  return String(value ?? '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLen);
}

/** RFC-shaped enough to reject a header-injection attempt or a non-address. */
export function isPlausibleEmail(value: unknown): value is string {
  return typeof value === 'string'
    && value.length <= 254
    && /^[^\s@,;:<>"'\\]+@[^\s@,;:<>"'\\]+\.[a-z]{2,}$/i.test(value);
}
