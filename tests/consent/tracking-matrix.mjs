/**
 * Consent tracking matrix (compliance P1-1b, Mark 2026-10-12; v2 2026-10-12 for anvil reviews 1h-R1 F1/F2,
 * 1c-R1 F2/F4, 1c-R2 F1/F4). Reusable on any site that loads public/consent/consent.js: point CONSENT_ORIGIN at a
 * running build.
 *
 *   CONSENT_ORIGIN=http://localhost:4472 CONSENT_OUT=matrix.json node tests/consent/tracking-matrix.mjs
 *
 * Every state runs in a FRESH browser context (no shared storage). EVERY request that is not an ordinary
 * same-origin request is written to that state's ledger (phase, kind, host, origin, method, URL, body, what was done
 * with it), including the ones that are aborted, and every ledger is kept in the output.
 * ⛔ Nothing about a visitor leaves this machine: analytics collection endpoints are answered in the browser with an
 * empty 204 (recorded, never delivered), every same-origin write is answered with a fixture, and every other
 * off-origin request is aborted. The Google (gtag.js for CONSENT_GA_ID), Vercel and LinkedIn loaders are served from
 * tests/consent/fixtures (cached real vendor code, pinned in SHA256SUMS, so their real collectors run with no
 * network); NOTHING is fetched live (anvil gate-v2 R1 F2). A gtag.js for any other id has no fixture and is answered
 * with an empty 204, so its checks fail rather than pass. CONSENT_GA_FIXTURE overrides the gtag fixture file.
 * CONSENT_BLOCK_LOADERS=1 aborts every loader instead; the checks that need an executed loader are then recorded
 * NOT_MEASURED, never passed.
 *
 * Classes (anvil 1h-R1 F2): `/_vercel/insights/*` is first-party ONLY on this page's own origin; the same path on any
 * other origin is an unknown host. An unknown off-origin host fails the run in EVERY state and phase.
 * CONSENT_SELFTEST=<mutant> injects one synthetic request (or overlay) so tests/consent/harness-selftest.mjs can prove
 * the run then fails. Exit 1 on any failed assertion.
 *
 * callordut.com port (V2 sync, 2026-10-13), from hiresabina 02ab7f0. Adapted ONLY: route lists, storage key, this site's
 * vendor loaders (GA4 with a linked Google Ads destination; no LinkedIn, no Vercel), the privacy page's heading and link
 * pages, and CONSENT_SKIP section names so long suites split into separate foreground runs. Without this site's own
 * container fixture (tests/consent/fixtures/gtag-js-G-564V54PB0V.js) every check that needs the real GA/Ads container to
 * EXECUTE is recorded NOT_MEASURED, naming that file, never passed. Sections: initial, reject, accept, withdraw, gpc,
 * gpc-stored, forged, expiry, private, noscript, form, privacy, referrer, layout, order.
 * order (review F1, 2026-10-13): every route's SERVED HTML carries the config block before every /consent/consent.js
 * reference, and no <script src="/consent/consent.js"> tag exists outside that block (React hoists an async JSX
 * script tag ahead of inline scripts; tests/consent/stream-order.mjs proves the consequence under a slow response).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { vendorHost, VERCEL_PATH } from './vendor-hosts.mjs';

const ORIGIN = new URL(process.env.CONSENT_ORIGIN || 'http://localhost:4472').origin;
const OUT = process.env.CONSENT_OUT || '';
const LABEL = process.env.CONSENT_LABEL || 'candidate';
const GA_ID = process.env.CONSENT_GA_ID || 'G-564V54PB0V';
const KEY = process.env.CONSENT_STORAGE_KEY || 'callord-consent';
const PAGES = (process.env.CONSENT_PAGES || '/,/contact,/solutions,/privacy,/sms-terms').split(',');
// Every HTML route a visitor can load: callordut's 38 prerendered HTML routes (build manifest, 2026-10-13).
const ALL_ROUTES = (process.env.CONSENT_ALL_ROUTES || '/,/about,/av-integration,/contact,/eula,/industries,/industries/hospitality,/industries/offices,/industries/senior-living,/learn,/learn/av/commercial-av-integration-cost-per-room-2026-pricing-by-room-typ,/learn/av/crestron-av-integrator-new-mexico-callord-ut,/learn/av/government-chamber-av-design-requirements-systems-and-callord-ut,/learn/integrator/callord-ut-vs-d-tools-solutions360-specifi-which-integrator-is-r,/learn/security/av-integration-vs-security-company-why-callord-ut-does-both,/learn/security/brivo-access-control-installer-in-albuquerque-callord-ut,/learn/security/eagle-eye-networks-integration-callord-ut-video-platform-partner,/partnerships/cooperative-purchasing,/partnerships/forge,/privacy,/room-types,/room-types/executive-boardroom,/room-types/small-hybrid-focus-pod,/room-types/team-meeting-room,/room-types/training-all-hands,/room-types/virtual-visit-telehealth,/security,/services,/services/av-integration,/services/custom-solutions,/services/project-management,/services/smart-rooms,/smart-room-design,/sms-terms,/solutions,/solutions/financial-institutions,/solutions/multifamily-security,/thank-you').split(',');
const ASSESSMENT_AND_HOME = (process.env.CONSENT_SEED_ROUTES || '/,/contact,/privacy').split(',');
// This site has no private HTML page (privatePaths is ^/api); an empty list records the state NOT_APPLICABLE.
const PRIVATE_ROUTES = (process.env.CONSENT_PRIVATE_ROUTES ?? '').split(',').filter(Boolean);
const LAYOUT_ROUTES = (process.env.CONSENT_LAYOUT_ROUTES || PAGES.join(',')).split(',');
const SKIP = new Set((process.env.CONSENT_SKIP ?? 'form').split(',').filter(Boolean)); // form: no /evaluate here, and submission is barred
// Region (Mark 2026-10-14/15; ported from hiresabina f8ee005): every request of every state carries
// x-vercel-ip-country: CONSENT_COUNTRY, as Vercel's edge would. Unset (the default) is the missing-header case. This
// whole matrix is the ASK-FIRST matrix: run it unset and with an ask-first country (e.g. DE);
// tests/consent/geo-matrix.mjs covers the default-on region.
const COUNTRY = process.env.CONSENT_COUNTRY || '';
// This site's vendors: GA4 (with the linked Ads destination) only. LinkedIn and Vercel are asserted ABSENT.
const VENDORS = new Set((process.env.CONSENT_VENDORS || 'ga4').split(','));
const PRIVACY_H1 = new RegExp(process.env.CONSENT_PRIVACY_H1 || 'Privacy Policy', 'i');
const PRIVACY_LINK_PAGES = (process.env.CONSENT_PRIVACY_LINK_PAGES || PAGES.join(',')).split(',');
// Off-origin hosts a page may legitimately ask for that are NOT analytics. Still aborted and still in the ledger; just
// not "unknown". hiresabina's, measured 2026-10-12: the LocateFaith verified badge (footer image) and the Google Fonts
// stylesheet on the static assessment page. Another site passes its own list (an empty value means none).
const ALLOWED_HOSTS = new Set((process.env.CONSENT_ALLOWED_HOSTS ?? '').split(',').filter(Boolean)); // callordut: none (next/font self-hosts)
const SENTINEL = { name: 'Zq Sentinel Person', company: 'Zq Sentinel Roofing Co', email: 'zq-sentinel@example.invalid', phone: '5055550199', website: 'zq-sentinel.example' };
const ANALYTICS_KEYS = /(^|[^a-z])(_ga|_gid|gclid|client_id|cid|tid|_gl|li_fat_id|fbclid|lintrk)([^a-z]|$)/i;
// Vercel's loader stays silent in an automated browser (navigator.webdriver or "Headless" in the UA); every context
// presents as an ordinary Chrome so its real collection request is produced and inspected.
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36';

// Analytics and advertising hosts, including Google's collection aliases on www.google.com (/g/collect,
// /measurement/conversion, /pagead), DoubleClick, Google Ads and Vercel's script/collector hosts (anvil 1c-R1 F4).
// The same normalised family classification the gate uses (tests/consent/vendor-hosts.mjs mirrors consent.js rule 8):
// regional google.<cc>, trailing-dot, mixed-case, port and IDNA spellings are all trackers.
const isTrackerHost = (host) => vendorHost(host);
// GA4 collection hosts. callordut port: this site's container also posts GA4 to analytics.google.com/g/collect
// (observed on the gate-fixture page, 2026-10-13), an alias hiresabina's container never used; both count as GA4.
const GA_HOST = /(^|\.)(google-analytics\.com|analytics\.google\.com)$/;
const BLOCK_LOADERS = process.env.CONSENT_BLOCK_LOADERS === '1';
const fixture = (f) => readFileSync(new URL(`./fixtures/${f}`, import.meta.url), 'utf8');
// The real gtag.js container for this site's GA id, cached once (fixtures/README.md). No live loader exception.
const GA_LOADER = (() => { try { return process.env.CONSENT_GA_FIXTURE ? readFileSync(process.env.CONSENT_GA_FIXTURE, 'utf8') : fixture(`gtag-js-${GA_ID}.js`); } catch (e) { return undefined; } })();
const gaLoaderFor = (u) => (u.origin + u.pathname === 'https://www.googletagmanager.com/gtag/js' && u.searchParams.get('id') === GA_ID ? GA_LOADER : undefined);
const CACHED_OFF_ORIGIN = {
  'https://snap.licdn.com/li.lms-analytics/insight.min.js': fixture('linkedin-insight.min.js'),
  'https://snap.licdn.com/li.lms-analytics/insight.beta.min.js': fixture('linkedin-insight.beta.min.js'),
  'https://snap.licdn.com/li.lms-analytics/insight.old.min.js': fixture('linkedin-insight.old.min.js'),
};
const VERCEL_LOADER = fixture('vercel-insights-script.js');

// A second origin the harness itself serves, so a visitor can ARRIVE by a real link with a query-bearing referrer
// (anvil 1h-R1 F1). It answers with Referrer-Policy: unsafe-url so the browser hands the full URL over.
const REF_ORIGIN = 'http://consent-referrer.test';
const REF_SECRET = 'zq-ref-secret';
const PAGE_SECRET = 'zq-page-secret';
const FRAG_SECRET = 'zq-frag-secret';
// A gate-only page on this origin that loads Vercel through consent.js itself (vercel: true), the mode the sibling
// sites use; this site loads Vercel through the React <Analytics /> component instead. Both modes are tested.
const STATIC_FIXTURE = '/__consent-fixture/static';
const staticFixtureHtml = () => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Consent gate fixture</title>
<script>window.CONSENT_CONFIG=${JSON.stringify({ storageKey: KEY, privacyHref: '/privacy', ga4: GA_ID, vercel: true, privatePaths: '^/(api|chat)(/|$)' })};</script>
<script src="/consent/consent.js"></script></head><body><main><h1>Consent gate fixture</h1><p><a href="/privacy">Privacy</a></p></main></body></html>`;

const SELFTEST = process.env.CONSENT_SELFTEST || '';
const MUTANTS = {
  'unknown-after-accept': { on: 'accept', url: 'https://review-unknown.invalid/probe-after-accept' },
  'vercel-path-after-accept': { on: 'accept', url: 'https://review-unknown.invalid/_vercel/insights/view' },
  'unknown-after-withdraw': { on: 'withdraw', url: 'https://review-unknown.invalid/probe-after-withdraw' },
  'unknown-before-choice': { on: 'load', url: 'https://review-unknown.invalid/probe-before-choice' },
  'shadow-overlap': { on: 'overlay' },
};
if (SELFTEST && !MUTANTS[SELFTEST]) { console.error(`unknown CONSENT_SELFTEST ${SELFTEST}`); process.exit(2); }

function classify(u) {
  if (u.origin === ORIGIN) return VERCEL_PATH.test(u.pathname) ? { kind: 'tracker', host: 'vercel-insights(same-origin)' } : { kind: 'first-party', host: u.host };
  if (u.origin === REF_ORIGIN) return { kind: 'fixture', host: u.host };
  if (isTrackerHost(u.hostname)) return { kind: 'tracker', host: u.hostname };
  if (ALLOWED_HOSTS.has(u.hostname)) return { kind: 'allowed', host: u.hostname };
  return { kind: 'unknown', host: u.hostname || u.protocol };
}

let failures = 0; const results = [];
function ok(cond, label) { results.push({ ok: !!cond, label }); if (cond) console.log(`  ok   ${label}`); else { failures += 1; console.error(`  FAIL ${label}`); } }
function notMeasured(label) { results.push({ ok: null, label: 'NOT_MEASURED ' + label }); console.log(`  N/M  ${label}`); }
const needsLoader = (cond, label) => (BLOCK_LOADERS ? notMeasured(label) : ok(cond, label));
// Checks that need this site's real GA/Ads container to EXECUTE: NOT_MEASURED (naming the file) when it is not committed.
const GA_FIXTURE_FILE = process.env.CONSENT_GA_FIXTURE || `tests/consent/fixtures/gtag-js-${GA_ID}.js`;
const needsGa = (cond, label) => (GA_LOADER === undefined ? notMeasured(`${label} — missing ${GA_FIXTURE_FILE}`) : needsLoader(cond, label));
const run = (section) => !SKIP.has(section);

async function fresh(browser, opts = {}) {
  const { gpcSignal = false, gpcHeader = false, js = true, seedCookie = null, seedStorage = null, viewport = null } = opts;
  const context = await browser.newContext({
    javaScriptEnabled: js, userAgent: UA, serviceWorkers: 'block',
    ...(viewport ? { viewport } : {}), extraHTTPHeaders: { ...(gpcHeader ? { 'Sec-GPC': '1' } : {}), ...(COUNTRY ? { 'x-vercel-ip-country': COUNTRY } : {}) },
  });
  await context.addInitScript(() => { Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false, configurable: true }); });
  // This host's own choice cookie is the Secure __Host-<storageKey> (consent.js rule 5). The cookie API cannot set a
  // __Host- cookie for an http origin, so it is planted once per context through document.cookie on this origin
  // (Chromium treats localhost as secure); a plain marker cookie keeps it to once.
  if (seedCookie) await context.addInitScript(([origin, k, v]) => {
    if (location.origin !== origin || /(^|; )seed_choice_done=1/.test(document.cookie)) return;
    document.cookie = '__Host-' + k + '=' + v + '; Path=/; Max-Age=15552000; SameSite=Lax; Secure';
    document.cookie = 'seed_choice_done=1; Path=/';
  }, [ORIGIN, KEY, seedCookie]);
  if (seedStorage) await context.addInitScript(([k, v]) => { try { if (!localStorage.getItem(k)) localStorage.setItem(k, v); } catch (e) { /* none */ } }, [KEY, seedStorage]);
  if (gpcSignal) await context.addInitScript(() => { Object.defineProperty(Navigator.prototype, 'globalPrivacyControl', { get: () => true, configurable: true }); });
  const m = MUTANTS[SELFTEST];
  if (m && m.url) {
    await context.addInitScript((mut) => {
      const fire = () => { if (window.__consentMutantFired) return; window.__consentMutantFired = 1; fetch(mut.url, { mode: 'no-cors' }).catch(() => {}); };
      if (mut.on === 'load') { fire(); return; }
      addEventListener('siteconsent', (e) => {
        try {
          if (e.detail === 'accept') sessionStorage.setItem('consent-mutant-accepted', '1');
          if (mut.on === 'accept' && e.detail === 'accept') fire();
          if (mut.on === 'withdraw' && e.detail === 'reject' && sessionStorage.getItem('consent-mutant-accepted') === '1') fire();
        } catch (x) { /* none */ }
      });
    }, m);
  }
  if (m && m.on === 'overlay') {
    // A fixed control inside an OPEN shadow root, UNDER the bar (z-index 1 < the bar's 50) where the bar renders: the
    // shape of the chat launcher anvil 1c-R2 F1 found covered, invisible to document.querySelectorAll.
    // Only on this site's own pages: on the referring origin's page it would cover the link the arrival states click.
    await context.addInitScript((origin) => {
      if (location.origin !== origin) return;
      addEventListener('DOMContentLoaded', () => {
        const host = document.createElement('div'); host.id = 'consent-overlay-mutant';
        const root = host.attachShadow({ mode: 'open' });
        // Two placements, both under the bar where it can render (hiresabina f8ee005): top-left for an in-flow bar at the
        // top of the page (this site's), and bottom-centre for a site that floats the strip at the viewport bottom.
        root.innerHTML = '<button type="button" style="position:fixed;top:8px;left:8px;width:120px;height:32px;z-index:1">mutant</button>' +
          '<button type="button" style="position:fixed;bottom:24px;left:50%;transform:translateX(-50%);width:120px;height:32px;z-index:1">mutant</button>';
        document.documentElement.appendChild(host);
      });
    }, ORIGIN);
  }
  const rec = { phase: 'before', ledger: [], navigations: [], assess: [], pageErrors: [] };
  await context.route('**/*', async (route) => {
    const q = route.request(); const u = new URL(q.url());
    const c = classify(u);
    if (c.kind === 'first-party') {
      if (q.isNavigationRequest()) rec.navigations.push({ phase: rec.phase, url: q.url(), referer: (await q.allHeaders())['referer'] || '' });
      if (u.pathname === STATIC_FIXTURE) return route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: staticFixtureHtml() });
      if (q.method() === 'GET' || q.method() === 'HEAD') return route.continue();
      if (u.pathname === '/api/assess') {
        rec.assess.push({ raw: q.postData() || '', json: q.postDataJSON() });
        return route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ ok: true, id: 'matrix-fixture', reached_human: true, interview_grant: 'matrix-grant-' + 'x'.repeat(48) }) });
      }
      if (u.pathname === '/api/evaluate/site') return route.fulfill({ status: 202, contentType: 'application/json', body: '{"ok":true,"claim":"queued"}' });
      if (u.pathname.startsWith('/api/book-with-mark/')) return route.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false}' });
      return route.fulfill({ status: 204, body: '' });
    }
    // type: the browser's resource type, i.e. the transport (fetch, xhr, ping = sendBeacon, image, script, document =
    // iframe, ...). The gate's guard covers fetch/beacon/XHR/image only (consent.js rule 8); script/iframe are NOT covered.
    const entry = { phase: rec.phase, kind: c.kind, host: c.host, origin: u.origin, method: q.method(), url: q.url(), body: q.postData() || '', type: q.resourceType(), action: '' };
    rec.ledger.push(entry);
    if (c.kind === 'fixture') {
      entry.action = 'fixture';
      return route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', headers: { 'referrer-policy': 'unsafe-url' },
        body: `<!doctype html><title>source</title><a id="consent-visit" href="${ORIGIN}${rec.target || '/privacy'}">Visit</a>` });
    }
    if (c.kind === 'tracker') {
      const cached = c.host === 'vercel-insights(same-origin)' && u.pathname === '/_vercel/insights/script.js' ? VERCEL_LOADER : (CACHED_OFF_ORIGIN[u.origin + u.pathname] ?? gaLoaderFor(u));
      if (cached !== undefined) { entry.action = BLOCK_LOADERS ? 'aborted-loader' : 'cached-loader'; return BLOCK_LOADERS ? route.abort() : route.fulfill({ status: 200, contentType: 'text/javascript', body: cached }); }
      entry.action = 'answered-204';
      return route.fulfill({ status: 204, body: '' });
    }
    entry.action = 'aborted';
    return route.abort();
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => rec.pageErrors.push(String(e.message || e).slice(0, 200)));
  return { context, page, rec };
}
async function visit(page, path) { await page.goto(ORIGIN + path, { waitUntil: 'load' }); await page.waitForTimeout(2500); }
const trackers = (rec, phase) => rec.ledger.filter((h) => h.kind === 'tracker' && (!phase || h.phase === phase));
const hostsIn = (rec, phase) => [...new Set(trackers(rec, phase).map((h) => h.host))].sort();
const barCount = (page) => page.locator('[data-consent-bar]').count();
// Marks every later request with the new phase AT the click, so a hit fired while waiting is not miscounted.
async function choose(page, choice, rec, phase = 'after') {
  const btn = page.locator(`[data-consent-bar] [data-consent="${choice}"]`);
  if (rec) rec.phase = phase;
  if (await btn.count() === 0) return false;
  await btn.click(); await page.waitForTimeout(3000); return true;
}
// Every state ends here: the ledger is kept, and an unknown off-origin host fails the state whatever the phase.
function finish(matrix, name, rec, summary) {
  const unknown = rec.ledger.filter((h) => h.kind === 'unknown');
  matrix.states[name] = { ...summary, unknown_off_origin: unknown.map((h) => `${h.phase} ${h.method} ${h.url}`), page_errors: rec.pageErrors, ledger: rec.ledger };
  ok(unknown.length === 0, `${name}: zero requests to unknown off-origin hosts in any phase (${unknown.map((h) => h.phase + ' ' + h.url).join(', ') || 'none'})`);
}

// Every interactive control on the page, INCLUDING those inside open shadow roots (anvil 1c-R2 F1), that the bar
// covers at a point where it is on top; and whether the bar's own buttons are themselves on top at their centres.
async function overlap(page) {
  return page.evaluate(() => {
    const bar = document.querySelector('[data-consent-bar]');
    if (!bar) return { bar: null };
    const SEL = 'a[href],button,input,select,textarea,summary,[tabindex]:not([tabindex="-1"]),[role="button"],[role="link"]';
    const controls = []; let shadowRoots = 0;
    const walk = (root) => { root.querySelectorAll(SEL).forEach((el) => controls.push(el)); root.querySelectorAll('*').forEach((el) => { if (el.shadowRoot) { shadowRoots += 1; walk(el.shadowRoot); } }); };
    walk(document);
    const deepAt = (x, y) => { let el = document.elementFromPoint(x, y); while (el && el.shadowRoot) { const inner = el.shadowRoot.elementFromPoint(x, y); if (!inner || inner === el) break; el = inner; } return el; };
    const inBar = (el) => { for (let n = el; n; n = n.parentNode || n.host) if (n === bar) return true; return false; };
    const name = (el) => `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40)}"${el.getRootNode() !== document ? ' (shadow)' : ''}`;
    const br = bar.getBoundingClientRect();
    const covered = [];
    for (const el of controls) {
      if (inBar(el)) continue;
      const r = el.getBoundingClientRect(); const st = getComputedStyle(el);
      // pointer-events: none (inherited, so a closed popover's links) cannot take a click, so nothing can block one.
      if (r.width < 1 || r.height < 1 || st.visibility === 'hidden' || st.display === 'none' || st.pointerEvents === 'none') continue;
      const ix = Math.max(r.left, br.left), iy = Math.max(r.top, br.top), ax = Math.min(r.right, br.right), ay = Math.min(r.bottom, br.bottom);
      if (ax - ix < 1 || ay - iy < 1) continue;
      const pts = [[(ix + ax) / 2, (iy + ay) / 2], [r.left + r.width / 2, r.top + r.height / 2]];
      if (pts.some(([x, y]) => x >= 0 && y >= 0 && x < innerWidth && y < innerHeight && inBar(deepAt(x, y) || document.body))) covered.push(name(el));
    }
    // Tested at the centre of EACH line box (getClientRects), not of the bounding box (2026-10-15): at 320px the bar's
    // "Privacy notice" link wraps onto two lines, and the centre of its bounding box then falls on the bar's own
    // paragraph text, which read as "obscured" although nothing covers it. One line box gives the same point as before,
    // and every line box of a wrapped control must be on top, so this is no weaker.
    const obscured = [...bar.querySelectorAll('button,a')].filter((b) => [...b.getClientRects()].some((r) => {
      if (r.width < 1 || r.height < 1) return false;
      const x = r.left + r.width / 2, y = r.top + r.height / 2;
      if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) return false; // scrolled away: not a cover
      const top = deepAt(x, y); return !(top === b || b.contains(top));
    })).map(name);
    return { bar: { top: br.top, bottom: br.bottom, left: br.left, right: br.right }, controls: controls.length, shadowRoots, covered, obscured, overflowX: document.documentElement.scrollWidth - innerWidth };
  });
}

async function main() {
  const browser = await chromium.launch();
  const matrix = { label: LABEL, origin: ORIGIN, selftest: SELFTEST || null, country: COUNTRY || null, block_loaders: BLOCK_LOADERS, measured_at: new Date().toISOString(), pages: PAGES, states: {} };
  try {
    // 1 initial: no choice made
    if (run('initial')) { const { context, page, rec } = await fresh(browser);
      let bar = null;
      for (const p of ALL_ROUTES) { await visit(page, p); if (bar === null) bar = await barCount(page); }
      const hosts = hostsIn(rec);
      ok(hosts.length === 0, `initial: zero analytics/advertising requests before any choice, ${ALL_ROUTES.length} routes (${hosts.join(', ') || 'none'})`);
      ok(bar > 0, 'initial: the consent bar is shown');
      finish(matrix, 'initial', rec, { hosts, bar_shown: bar > 0 });
      await context.close(); }

    // 1b order: config block before any gate reference in the served HTML of every route
    if (run('order')) {
      const rows = {};
      for (const r of ALL_ROUTES) {
        const res = await fetch(ORIGIN + r); const html = await res.text();
        const cfg = html.indexOf('<script id="consent-config"'); const cfgEnd = cfg === -1 ? -1 : html.indexOf('</script>', cfg);
        const refs = []; let i = -1; while ((i = html.indexOf('/consent/consent.js', i + 1)) !== -1) refs.push(i);
        const tags = [...html.matchAll(/<script\b[^>]*\bsrc="\/consent\/consent\.js"[^>]*>/g)].map((m) => m.index);
        rows[r] = { status: res.status, config_at: cfg, gate_refs: refs, gate_script_tags_outside_config: tags.filter((t) => !(t > cfg && t < cfgEnd)) };
        ok(res.status === 200 && cfg !== -1 && refs.length > 0 && refs.every((x) => x > cfg) && rows[r].gate_script_tags_outside_config.length === 0,
          `order ${r}: config block (byte ${cfg}) precedes every gate reference (${refs.join(', ') || 'none'}); gate <script> tags outside it: ${rows[r].gate_script_tags_outside_config.length}`);
      }
      matrix.states.order = { routes: ALL_ROUTES.length, rows };
    }

    // 2 reject
    if (run('reject')) { const { context, page, rec } = await fresh(browser);
      await visit(page, PAGES[0]); const clicked = await choose(page, 'reject', rec);
      for (const p of PAGES) await visit(page, p);
      const hosts = hostsIn(rec); const barAfter = await barCount(page);
      ok(clicked, 'reject: "No analytics" button exists and was pressed');
      ok(hosts.length === 0, `reject: zero analytics requests (${hosts.join(', ') || 'none'})`);
      ok(barAfter === 0, 'reject: the bar does not come back on later pages');
      finish(matrix, 'reject', rec, { hosts, choice_made: clicked, bar_after: barAfter });
      await context.close(); }

    // 3 accept
    if (run('accept')) { const { context, page, rec } = await fresh(browser);
      await visit(page, PAGES[0]); const before = hostsIn(rec, 'before');
      const clicked = await choose(page, 'accept', rec);
      for (const p of PAGES) await visit(page, p);
      const after = hostsIn(rec, 'after');
      ok(clicked && before.length === 0, `accept: nothing before the click (${before.join(', ') || 'none'})`);
      ok(after.includes('www.googletagmanager.com'), 'accept: GA4 loader requested after accept');
      needsGa(after.some((h) => GA_HOST.test(h)), 'accept: a GA4 collection request is made after accept (answered locally, never delivered)');
      if (VENDORS.has('linkedin')) ok(after.includes('snap.licdn.com'), 'accept: LinkedIn Insight loader requested after accept (pages that render the app layout)');
      else ok(!after.some((h) => /licdn|linkedin/.test(h)), `accept: no LinkedIn request (this site has no LinkedIn tag) (${after.join(', ')})`);
      if (VENDORS.has('vercel')) {
        ok(after.includes('vercel-insights(same-origin)'), 'accept: Vercel Web Analytics requested after accept');
        needsLoader(trackers(rec, 'after').some((h) => h.url === ORIGIN + '/_vercel/insights/view' && h.method === 'POST'), 'accept: the real Vercel loader posts a page view to /_vercel/insights/view (answered locally)');
      } else ok(!after.some((h) => /vercel/.test(h)), `accept: no Vercel analytics request (this site has none) (${after.join(', ')})`);
      // Linked Google Ads (sibling notes §3): the Ads collection after Accept can only be observed by EXECUTING this
      // site's real container. Without its committed fixture that is NOT_MEASURED, never a pass.
      needsGa(trackers(rec, 'after').some((h) => /googlesyndication|googleadservices|doubleclick|google\.[a-z.]+$/.test(h.host) && /AW-17409946688|17409946688/.test(h.url + h.body)), 'accept: linked Google Ads (AW-17409946688) collection requests occur after Accept, answered locally');
      const leaky = trackers(rec).filter((h) => GA_HOST.test(h.host) && /[?&]dl=[^&]*(%3F|%23)/.test(h.url));
      ok(leaky.length === 0, 'accept: no GA4 hit carries a query string or fragment in its page location');
      needsGa(rec.ledger.some((h) => h.url.startsWith('https://www.googletagmanager.com/gtag/js') && h.action === 'cached-loader'), `accept: the GA4 loader is the committed fixture for ${GA_ID}, not a live fetch`);
      // Linked-Ads observation (anvil gate-v2 R1 F2): every Google endpoint the real container asked for, by host+path.
      const google = [...new Set(trackers(rec).filter((h) => /google|doubleclick/.test(h.host)).map((h) => { const u = new URL(h.url); return `${h.method} ${u.host}${u.pathname} [${h.action}]`; }))];
      console.log(`  info accept: Google endpoints requested after accept: ${google.join(' | ') || 'none'}`);
      finish(matrix, 'accept', rec, { hosts_before_choice: before, hosts_after_accept: after, choice_made: clicked, google_endpoints: google });
      await context.close(); }

    // 4 withdraw (accept, then "no analytics" on /privacy). Observation starts BEFORE the click (anvil 1h-R1 F2).
    if (run('withdraw')) { const { context, page, rec } = await fresh(browser);
      await visit(page, PAGES[0]); await choose(page, 'accept', rec, 'accepted');
      await visit(page, '/privacy');
      const w = page.locator('[data-consent-withdraw]');
      const has = await w.count() > 0;
      rec.phase = 'withdraw-click';
      if (has) { await Promise.all([page.waitForEvent('load', { timeout: 10000 }).catch(() => {}), w.click()]); await page.waitForTimeout(2500); }
      rec.phase = 'after';
      for (const p of PAGES) await visit(page, p);
      const atClick = hostsIn(rec, 'withdraw-click'); const hosts = hostsIn(rec, 'after');
      const cookies = (await context.cookies()).map((c) => c.name).filter((n) => /^(_ga|_gid|li_|_li)/.test(n));
      ok(has, 'withdraw: /privacy has a withdraw control');
      ok(trackers(rec, 'accepted').length > 0 || BLOCK_LOADERS, `withdraw: control fires, trackers ran before withdrawing (${hostsIn(rec, 'accepted').join(', ') || 'none'})`);
      ok(atClick.length === 0, `withdraw: zero analytics requests from the click through the reload (${atClick.join(', ') || 'none'})`);
      ok(hosts.length === 0, `withdraw: zero analytics requests after withdrawing (${hosts.join(', ') || 'none'})`);
      ok(cookies.length === 0, `withdraw: first-party analytics cookies cleared (${cookies.join(', ') || 'none'})`);
      finish(matrix, 'withdraw', rec, { hosts_at_click: atClick, hosts_after_withdraw: hosts, withdraw_control_found: has, analytics_cookies_left: cookies });
      await context.close(); }

    // 5 GPC: signal, and header, each ALSO with a stored accept that GPC must override
    const nowAccept = () => `1.accept.${Date.now()}`;
    for (const [name, opts] of (run('gpc') ? [['gpc_signal', { gpcSignal: true }], ['gpc_header', { gpcHeader: true }], ['gpc_signal_over_stored_accept', { gpcSignal: true, seedStorage: nowAccept() }], ['gpc_header_over_stored_accept', { gpcHeader: true, seedStorage: nowAccept() }]] : [])) {
      const { context, page, rec } = await fresh(browser, opts);
      let bar = 0;
      for (const p of PAGES) { await visit(page, p); bar += await barCount(page); }
      const hosts = hostsIn(rec);
      const state = await page.evaluate(() => (window.SiteConsent ? window.SiteConsent.state() : 'no-gate'));
      ok(hosts.length === 0, `${name}: zero analytics requests (${hosts.join(', ') || 'none'})`);
      ok(bar === 0, `${name}: no consent prompt`);
      ok(state === 'gpc', `${name}: the gate reports gpc (${state})`);
      finish(matrix, name, rec, { hosts, bar_shown: bar > 0, gate_state: state });
      await context.close();
    }

    // 5b anvil r1 F1: GPC with a stored accept, each URL in its OWN fresh context, both storage mechanisms.
    for (const [gname, gopts] of (run('gpc-stored') ? [['header', { gpcHeader: true }], ['signal', { gpcSignal: true }]] : [])) {
      for (const [sname, key] of [['cookie', 'seedCookie'], ['localStorage', 'seedStorage']]) {
        for (const path of ASSESSMENT_AND_HOME) {
          const name = `gpc_${gname}_stored_accept_${sname}_${path}`;
          const { context, page, rec } = await fresh(browser, { ...gopts, [key]: nowAccept() });
          await visit(page, path);
          const hosts = hostsIn(rec);
          const state = await page.evaluate(() => (window.SiteConsent ? window.SiteConsent.state() : 'no-gate'));
          const gpcCookie = (await context.cookies()).some((c) => c.name === 'consent_gpc' && c.value === '1');
          ok(hosts.length === 0 && state === 'gpc', `${name}: zero tracker requests, gate state gpc (${hosts.join(', ') || 'none'}; ${state})`);
          if (gname === 'header') ok(gpcCookie, `${name}: the server set consent_gpc=1 on this document`);
          finish(matrix, name, rec, { hosts, gate_state: state, consent_gpc_cookie: gpcCookie });
          await context.close();
        }
      }
    }

    // 5c forged / wrong-version stored choice is no choice: bar shown, nothing loads
    for (const [sname, key] of (run('forged') ? [['cookie', 'seedCookie'], ['localStorage', 'seedStorage']] : [])) {
      for (const path of ASSESSMENT_AND_HOME) {
        const name = `forged_version_${sname}_${path}`;
        const { context, page, rec } = await fresh(browser, { [key]: `999.accept.${Date.now()}` });
        await visit(page, path);
        const hosts = hostsIn(rec);
        const state = await page.evaluate(() => (window.SiteConsent ? window.SiteConsent.state() : 'no-gate'));
        const bar = await barCount(page);
        ok(hosts.length === 0 && state === null && bar > 0, `${name}: treated as no choice, bar shown, zero tracker requests (${hosts.join(', ') || 'none'}; ${state})`);
        finish(matrix, name, rec, { hosts, gate_state: state, bar_shown: bar > 0 });
        await context.close();
      }
    }

    // 5d the stored choice lasts 180 days in BOTH stores (gate v2): 181 days old is no choice; 179 still counts.
    const DAY = 864e5;
    for (const [sname, key] of (run('expiry') ? [['cookie', 'seedCookie'], ['localStorage', 'seedStorage']] : [])) {
      for (const days of [179, 181]) {
        const name = `stored_accept_${days}d_${sname}`;
        const { context, page, rec } = await fresh(browser, { [key]: `1.accept.${Date.now() - days * DAY}` });
        await visit(page, '/');
        const hosts = hostsIn(rec);
        const state = await page.evaluate(() => (window.SiteConsent ? window.SiteConsent.state() : 'no-gate'));
        const bar = await barCount(page);
        if (days === 181) ok(hosts.length === 0 && state === null && bar > 0, `${name}: expired, treated as no choice, bar shown, zero tracker requests (${hosts.join(', ') || 'none'}; ${state})`);
        else ok(state === 'accept' && bar === 0 && hosts.includes('www.googletagmanager.com'), `${name}: still a choice, no bar, GA4 loads (${hosts.join(', ') || 'none'}; ${state})`);
        finish(matrix, name, rec, { hosts, gate_state: state, bar_shown: bar > 0 });
        await context.close();
      }
    }

    // 5e private routes load nothing even after a stored accept; control: the same seed on / does load
    if (run('private') && PRIVATE_ROUTES.length === 0) notMeasured('private route with stored accept: NOT_APPLICABLE, this site has no private HTML page (privatePaths ^/api)');
    for (const path of (run('private') ? PRIVATE_ROUTES : [])) {
      const { context, page, rec } = await fresh(browser, { seedCookie: nowAccept(), seedStorage: nowAccept() });
      await visit(page, path);
      const hosts = hostsIn(rec);
      const state = await page.evaluate(() => (window.SiteConsent ? window.SiteConsent.state() : 'no-gate'));
      rec.phase = 'control';
      await visit(page, '/');
      const control = hostsIn(rec, 'control');
      ok(hosts.length === 0 && state === 'accept', `private ${path}: stored accept, zero tracker requests (${hosts.join(', ') || 'none'}; ${state})`);
      ok(control.includes('www.googletagmanager.com'), `private ${path}: control fires, the same seeded browser loads GA4 on / (${control.join(', ') || 'none'})`);
      finish(matrix, `private_route_stored_accept_${path}`, rec, { hosts, gate_state: state, control_on_home: control });
      await context.close();
    }

    // 6 noscript
    if (run('noscript')) { const { context, page, rec } = await fresh(browser, { js: false });
      for (const p of ALL_ROUTES) await visit(page, p);
      const hosts = hostsIn(rec);
      ok(hosts.length === 0, `noscript: zero analytics requests, ${ALL_ROUTES.length} routes (${hosts.join(', ') || 'none'})`);
      finish(matrix, 'noscript', rec, { hosts, routes: ALL_ROUTES.length });
      await context.close(); }

    // 7 the /evaluate form after accept: the save payload carries no analytics id, and no analytics hit carries what was typed
    if (run('form')) { const { context, page, rec } = await fresh(browser);
      await visit(page, '/evaluate'); await choose(page, 'accept', rec);
      await page.selectOption('#serviceType', 'hvac');
      await page.fill('#callsNum', '60');
      await page.click('#teamSize .segb[data-value="16-50"]'); await page.click('#revRange .segb[data-value="1M-5M"]');
      await page.fill('#bizUrl', SENTINEL.website);
      await page.click('#startBtn');
      await page.waitForSelector('#stepPain.on', { timeout: 5000 });
      const tiles = page.locator('#pgrid .pcard'); await tiles.nth(0).click(); await tiles.nth(1).click();
      await page.click('#painNext');
      for (const s of [2, 3, 4, 5]) {
        await page.waitForSelector(`#step${s}.on`, { timeout: 5000 });
        await page.evaluate((st) => { for (const el of document.querySelectorAll(`#step${st} input`)) { if (!el.classList.contains('unset') && el.value !== '') continue; el.value = el.type === 'number' ? '1200' : String(Math.round((+el.min + +el.max) / 2)); el.dispatchEvent(new Event('input', { bubbles: true })); } }, s);
        await page.click(`#step${s} .btnf`);
      }
      await page.waitForSelector('#step6.on', { timeout: 5000 });
      const privacyHref = await page.locator('#step6 .prt a').getAttribute('href');
      await page.fill('#gN', SENTINEL.name); await page.fill('#gB', SENTINEL.company); await page.fill('#gE', SENTINEL.email); await page.fill('#gP', SENTINEL.phone);
      await page.click('#submitBtn');
      await page.waitForSelector('#step7.on', { timeout: 10000 });
      await page.waitForTimeout(3000);
      const saved = rec.assess[0];
      const keys = saved ? JSON.stringify(Object.keys(saved.json)) + JSON.stringify(Object.keys(saved.json.inputs || {})) : '';
      const typed = Object.values(SENTINEL);
      const enc = (s) => [s, encodeURIComponent(s), encodeURIComponent(s).replace(/%20/g, '+')];
      // Every recorded off-origin attempt, not only the recognised trackers (anvil 1c-R1 F4).
      const leaks = rec.ledger.filter((h) => typed.some((v) => enc(v).some((e) => (h.url + h.body).includes(e))));
      const gaEvents = [...new Set(trackers(rec).flatMap((h) => [...(h.url + '\n' + h.body).matchAll(/(?:^|[?&\n])en=([^&\n]+)/g)].map((x) => decodeURIComponent(x[1]))))].sort();
      ok(rec.assess.length === 1, 'form: exactly one POST /api/assess');
      ok(saved && !ANALYTICS_KEYS.test(keys) && !/_ga|gclid|client_id|li_fat_id/.test(saved.raw), `form: the save payload carries no analytics identifier (keys ${keys})`);
      needsLoader(trackers(rec).some((h) => GA_HOST.test(h.host)), 'form: a GA4 collection request was made on this page (so the leak check below is not vacuous)');
      needsLoader(leaks.length === 0, `form: no off-origin or analytics request contains anything typed into the form (${leaks.length})`);
      ok(privacyHref === '/privacy', `form: the "Privacy Policy" label points at /privacy (${privacyHref})`);
      finish(matrix, 'evaluate_form_after_accept', rec, {
        assess_posts: rec.assess.length, assess_keys: keys, analytics_key_hits: (keys.match(ANALYTICS_KEYS) || []).filter(Boolean),
        analytics_hosts: hostsIn(rec, 'after'), ga4_event_names: gaEvents,
        typed_values_in_off_origin_requests: leaks.map((h) => h.host + ' ' + h.url.slice(0, 160)), privacy_label_href: privacyHref,
      });
      await context.close(); }

    // 8 /privacy renders, and every Privacy link on the main pages resolves to it
    if (run('privacy')) { const { context, page, rec } = await fresh(browser);
      const r = await page.goto(ORIGIN + '/privacy', { waitUntil: 'load' });
      const h1 = (await page.locator('h1').first().textContent().catch(() => '')) || '';
      const links = {};
      for (const p of [...new Set([...PRIVACY_LINK_PAGES, '/privacy'])]) {
        await page.goto(ORIGIN + p, { waitUntil: 'load' });
        links[p] = await page.evaluate(() => [...document.querySelectorAll('a')].filter((a) => /privacy/i.test(a.textContent) && !/trust/i.test(a.textContent)).map((a) => `${a.textContent.trim()} -> ${new URL(a.href).pathname}`));
      }
      const bad = Object.entries(links).flatMap(([p, ls]) => ls.filter((l) => !/-> \/privacy$/.test(l)).map((l) => `${p}: ${l}`));
      ok(r && r.status() === 200 && PRIVACY_H1.test(h1), `/privacy renders (status ${r && r.status()}, h1 "${h1.trim()}")`);
      ok(Object.values(links).every((ls) => ls.length > 0), 'every checked page has a Privacy link');
      ok(bad.length === 0, `every Privacy link resolves to /privacy (${bad.join('; ') || 'all'})`);
      finish(matrix, 'privacy_page', rec, { status: r && r.status(), h1: h1.trim(), privacy_links: links, links_not_to_privacy: bad });
      await context.close(); }

    // 9 anvil 1h-R1 F1: a visitor ARRIVES by a real link from another origin whose Referrer-Policy is unsafe-url, on a
    // page address that itself carries a query and a fragment. After Accept (clicked, or already stored), no vendor
    // may receive the incoming referrer's query, and GA4/Vercel may not receive the page's query or fragment. Both
    // Vercel loader modes: the React <Analytics /> (/privacy) and consent.js's own loader (vercel: true, on the static
    // assessment page and on a generic gate-only fixture page a sibling site can reuse unchanged).
    const REF_TARGETS = (process.env.CONSENT_REFERRER_TARGETS || `react:/privacy,gate-fixture:${STATIC_FIXTURE}`).split(',').map((x) => [x.slice(0, x.indexOf(':')), x.slice(x.indexOf(':') + 1)]);
    for (const [mode, target] of (run('referrer') ? REF_TARGETS : [])) {
      for (const arrival of ['click-accept', 'stored-accept']) {
        const name = `referrer_${mode}_${arrival}`;
        const { context, page, rec } = await fresh(browser, arrival === 'stored-accept' ? { seedStorage: nowAccept() } : {});
        rec.target = `${target}?${PAGE_SECRET}=1#${FRAG_SECRET}`;
        await page.goto(`${REF_ORIGIN}/source?${REF_SECRET}=1`);
        rec.phase = 'arrival';
        await Promise.all([page.waitForURL(`${ORIGIN}/**`), page.locator('#consent-visit').click()]);
        await page.waitForLoadState('load');
        const arrived = await page.evaluate(() => ({ href: location.href, gateState: window.SiteConsent ? window.SiteConsent.state() : 'no-gate' }));
        // The instrument: the Referer the BROWSER sent on the arriving navigation (the DOM value may already be narrowed).
        const nav = rec.navigations.find((n) => n.phase === 'arrival');
        const sentReferrer = nav ? nav.referer : '';
        const domReferrer = await page.evaluate(() => document.referrer);
        if (arrival === 'click-accept') { await page.waitForTimeout(1000); await choose(page, 'accept', rec, 'after'); } else { await page.waitForTimeout(3000); rec.phase = 'after'; }
        await page.waitForTimeout(1500);
        const domReferrerAfter = await page.evaluate(() => document.referrer);
        const t = trackers(rec);
        const all = rec.ledger.filter((h) => h.kind !== 'fixture');
        const blob = (h) => { try { return decodeURIComponent(h.url + '\n' + h.body); } catch (e) { return h.url + '\n' + h.body; } };
        const refLeaks = all.filter((h) => blob(h).includes(REF_SECRET));
        const vercelViews = t.filter((h) => h.url === ORIGIN + '/_vercel/insights/view' && h.method === 'POST');
        const vercelBodies = vercelViews.map((h) => { try { return JSON.parse(h.body); } catch (e) { return {}; } });
        const gaHits = t.filter((h) => GA_HOST.test(h.host) && /\/g\/collect/.test(h.url));
        const gaDr = gaHits.map((h) => { const u = new URL(h.url); return u.searchParams.get('dr') || (new URLSearchParams(h.body.split('\n')[0] || '')).get('dr') || ''; });
        const pageLeaks = [...gaHits, ...vercelViews].filter((h) => blob(h).includes(PAGE_SECRET) || blob(h).includes(FRAG_SECRET));
        const linkedinCollect = t.filter((h) => /linkedin\.com$/.test(h.host) && /\/collect/.test(h.url));
        const browserReferrer = rec.ledger.find((h) => h.kind === 'fixture');
        ok(arrived.href.includes(PAGE_SECRET), `${name}: arrived by a real link on ${arrived.href.replace(ORIGIN, '')} (gate ${arrived.gateState})`);
        ok(sentReferrer.includes(REF_SECRET), `${name}: control fires, the browser sent a query-bearing Referer on the arriving navigation (${sentReferrer || 'none'})`);
        // The harness's own static fixture loads Vercel through the gate (vercel: true); this site's pages have none.
        if (mode !== 'react' || VENDORS.has('vercel')) {
          needsLoader(vercelViews.length > 0, `${name}: the real Vercel loader posted a page view (${vercelViews.length})`);
          needsLoader(vercelBodies.length > 0 && vercelBodies.every((b) => b.r === `${REF_ORIGIN}/source`), `${name}: Vercel's referrer field r is origin + path only (${vercelBodies.map((b) => b.r).join(', ') || 'none'})`);
        } else ok(vercelViews.length === 0, `${name}: no Vercel page view (this site has no Vercel analytics) (${vercelViews.length})`);
        needsGa(gaHits.length > 0 && gaDr.every((d) => d === `${REF_ORIGIN}/source`), `${name}: GA4's dr is origin + path only (${gaDr.join(', ') || 'none'})`);
        ok(refLeaks.length === 0, `${name}: no recorded request carries the incoming referrer's query (${refLeaks.map((h) => h.host).join(', ') || 'none'})`);
        ok(pageLeaks.length === 0, `${name}: no GA4 or Vercel request carries the page's query or fragment (${pageLeaks.map((h) => h.host).join(', ') || 'none'})`);
        finish(matrix, name, rec, {
          arrived: arrived.href, referer_header_sent: sentReferrer, document_referrer_on_arrival: domReferrer, document_referrer_after_accept: domReferrerAfter, fixture_requests: browserReferrer ? 1 : 0,
          vercel_r: vercelBodies.map((b) => b.r), vercel_o: vercelBodies.map((b) => b.o), ga_dr: gaDr,
          // Measured, not asserted: LinkedIn's tag reads location.href itself (page query and fragment included).
          linkedin_collect_carries_page_query: linkedinCollect.some((h) => blob(h).includes(PAGE_SECRET)),
          linkedin_collect_requests: linkedinCollect.length,
        });
        await context.close();
      }
    }

    // 10 the bar covers no control and is not itself covered, including controls inside open shadow roots
    // (anvil 1c-R2 F1), at the top and the bottom of every route; five widths (hiresabina review F5, 2026-10-14: 320,
    // 390, 768, 1280, 1440). The page is measured once the bar has mounted (it mounts after hydration).
    const VIEWPORTS = (process.env.CONSENT_LAYOUT_VIEWPORTS || '320x844,390x844,768x900,1280x720,1440x900').split(',').map((v) => { const [width, height] = v.split('x').map(Number); return { width, height }; });
    const settle = async (page, sel) => { await page.waitForSelector(sel, { timeout: 8000 }).catch(() => {}); await page.waitForTimeout(150); };
    // Waits until the page has stopped scrolling (smooth scroll may be on for in-page moves), at most 2 s.
    const still = (page) => page.evaluate(() => new Promise((res) => { let y = scrollY, n = 0; const t = setInterval(() => { if (scrollY === y) { if (++n >= 3) { clearInterval(t); res(); } } else { y = scrollY; n = 0; } }, 60); setTimeout(() => { clearInterval(t); res(); }, 2000); }));
    for (const viewport of (run('layout') ? VIEWPORTS : [])) {
      const name = `layout_${viewport.width}x${viewport.height}`;
      const { context, page, rec } = await fresh(browser, { viewport });
      const rows = {};
      for (const p of LAYOUT_ROUTES) {
        await page.goto(ORIGIN + p, { waitUntil: 'load' }); await settle(page, '[data-consent-bar]');
        for (const where of ['top', 'bottom']) {
          await page.evaluate((w) => window.scrollTo({ top: w === 'top' ? 0 : document.documentElement.scrollHeight, behavior: 'instant' }), where);
          await still(page);
          const o = await overlap(page);
          rows[`${p} ${where}`] = o;
          if (!o.bar) { ok(false, `${name} ${p} ${where}: the bar is rendered`); continue; }
          ok(o.covered.length === 0 && o.obscured.length === 0 && o.overflowX <= 0, `${name} ${p} ${where}: bar covers no control and is not covered (${o.controls} controls, ${o.shadowRoots} shadow roots; covered ${o.covered.join(', ') || 'none'}; obscured ${o.obscured.join(', ') || 'none'}; overflowX ${o.overflowX})`);
        }
      }
      finish(matrix, name, rec, { viewport, rows });
      await context.close();
    }

    // 11 reopen (hiresabina review F5): the choice re-opened from "Your privacy choices", on every route and width, with
    // a stored choice so no first-visit bar is up. Measured where the page leaves the visitor after the click, and at
    // the bottom of the page; then Close removes it and leaves no overflow. Hit tests, as in 10.
    for (const viewport of (run('reopen') ? VIEWPORTS : [])) {
      const name = `reopen_${viewport.width}x${viewport.height}`;
      const { context, page, rec } = await fresh(browser, { viewport, seedCookie: `1.reject.${Date.now()}` });
      const rows = {};
      for (const p of LAYOUT_ROUTES) {
        await page.goto(ORIGIN + p, { waitUntil: 'load' }); await page.waitForTimeout(300);
        const link = page.locator('footer [data-consent-open]').first();
        if (!(await link.count())) { ok(false, `${name} ${p}: a "Your privacy choices" link exists`); continue; }
        await link.scrollIntoViewIfNeeded(); await link.click();
        await settle(page, '[data-consent-reopened]'); await still(page); // the in-page scroll may be smooth
        for (const where of ['open', 'bottom']) {
          if (where === 'bottom') { await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })); await still(page); }
          const o = await overlap(page);
          rows[`${p} ${where}`] = o;
          if (!o.bar) { ok(false, `${name} ${p} ${where}: the re-opened choice is rendered`); continue; }
          const inView = o.bar.top >= 0 && o.bar.bottom <= viewport.height + 1;
          ok(o.covered.length === 0 && o.obscured.length === 0 && o.overflowX <= 0 && (where !== 'open' || inView), `${name} ${p} ${where}: re-opened choice${where === 'open' ? ' in view,' : ''} covers no control and is not covered (${o.controls} controls; covered ${o.covered.join(', ') || 'none'}; obscured ${o.obscured.join(', ') || 'none'}; overflowX ${o.overflowX}; bar ${Math.round(o.bar.top)}-${Math.round(o.bar.bottom)})`);
        }
        await page.locator('[data-consent-reopened] [data-consent-close]').click(); await page.waitForTimeout(300);
        const after = await page.evaluate(() => ({ bars: document.querySelectorAll('[data-consent-bar]').length, overflowX: document.documentElement.scrollWidth - innerWidth }));
        rows[`${p} closed`] = after;
        ok(after.bars === 0 && after.overflowX <= 0, `${name} ${p}: Close removes it, no overflow left (${JSON.stringify(after)})`);
      }
      finish(matrix, name, rec, { viewport, rows });
      await context.close();
    }
  } finally {
    await browser.close();
  }
  matrix.checks = results; matrix.failures = failures;
  const nm = results.filter((r) => r.ok === null).length;
  matrix.not_measured = nm;
  if (OUT) writeFileSync(OUT, JSON.stringify(matrix, null, 2) + '\n');
  console.log(`${LABEL}: ${results.length - failures - nm} of ${results.length - nm} checks passed, ${nm} NOT_MEASURED`);
  process.exit(failures ? 1 : 0);
}
main().catch((e) => { console.error('  FAIL harness error:', e && e.stack || e); process.exit(2); });
