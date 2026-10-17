/**
 * B-19 (Mark 2026-10-17, "Turn it off"): automatic user-provided-data collection is OFF in this site's own code, so it
 * holds even while the Google console setting is ON (the cached container ships it ON: __ogt_1p_data_v2 auto email,
 * phone and address for G-564V54PB0V and the linked AW-17409946688).
 *
 *   CONSENT_ORIGIN=http://localhost:4801 CONSENT_OUT=upd.json node tests/consent/user-data-off.mjs
 *
 * ⛔ Offline, as tracking-matrix.mjs: gtag.js for CONSENT_GA_ID is served from tests/consent/fixtures (the real container,
 * pinned in SHA256SUMS); every other analytics/advertising request is answered here with an empty 204 and recorded,
 * never delivered; every same-origin write is answered with a fixture; every other off-origin request is aborted and
 * fails the run. Nothing is fetched live.
 *
 * Each state is a FRESH context in an ask-first region (x-vercel-ip-country: CONSENT_COUNTRY, default DE), so analytics
 * start only on a real press of "Allow analytics". Then the form page (CONSENT_FORM_PATH) is loaded, its name, email and
 * phone fields are filled with synthetic values, a test-only form with synthetic street/city/region/postal/country
 * fields is added to the page, two site events and one Ads conversion are sent and the form is submitted (answered locally).
 *   - shipped: the site exactly as built.
 *   - stress:  the same, plus a test-only Consent Mode update granting ad_user_data and ad_storage before the page's
 *              own scripts. The site denies those, and the container does not attach user data while they are denied,
 *              so "shipped" alone cannot show the off setting doing anything; with them granted, the container's
 *              automatic collection is free to run, and only the site's off setting can stop it. On a build without
 *              the setting, dominusfoundry's container sends www.google.com/ccm/form-data/<Ads id> with ec_mode=a and em
 *              in this state (2026-10-17).
 * Both states must show: every gtag `config` command runs with user_data null in effect (its own parameter, or a
 * global `set` queued before it), and no `set`/`config`/`event` supplies user data; zero ccm/form-data requests; no
 * user-data parameter (em, pn/ph, fn, ln, sa, ct, rg, co, pc, ec_mode/eme/emd and the raw/encrypted variants) in any
 * Google request URL or body line; no synthetic value, raw or SHA-256 (hex, base64, base64url), anywhere in a request;
 * and analytics still on (a GA4 collect and an Ads collection request after Allow). "shipped" also allows no
 * automatic-detection report (ec_sel/ec_meta/ec_m/ec_lat/ec_s); "stress" records those (see DETECT_KEYS). Exit 1 on any
 * failed assertion.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright';
import { vendorHost } from './vendor-hosts.mjs';

const ORIGIN = new URL(process.env.CONSENT_ORIGIN || 'http://localhost:4801').origin;
const OUT = process.env.CONSENT_OUT || '';
const GA_ID = process.env.CONSENT_GA_ID || 'G-564V54PB0V';
const ADS_ID = process.env.CONSENT_ADS_ID || 'AW-17409946688';
const FORM_PATH = process.env.CONSENT_FORM_PATH || '/contact';
const COUNTRY = process.env.CONSENT_COUNTRY ?? 'DE';
const LOADER = readFileSync(process.env.CONSENT_GA_FIXTURE || new URL(`./fixtures/gtag-js-${GA_ID}.js`, import.meta.url), 'utf8');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36';
const SYN = {
  name: 'Qzxfirst Qzxlast', first: 'Qzxfirst', last: 'Qzxlast', email: 'qzx.b19.probe@example.com', phone: '+15055550142',
  company: 'Qzx Probe Co', street: '742 Qzxstreet Lane', city: 'Qzxcity', region: 'NM', postal: '87001', country: 'US',
};
// Google's user-provided-data hit parameters (the container's own map: em pn fn ln sa ct rg co pc ec rem rpn rfn rln rsa,
// plus the enhanced-conversion envelope ec_mode/eme/emd/ecsid and ph): the data itself.
const USER_KEYS = new Set(['em', 'ph', 'pn', 'fn', 'ln', 'sa', 'ct', 'rg', 'co', 'pc', 'rem', 'rpn', 'rfn', 'rln', 'rsa', 'upd', 'ec_mode', 'eme', 'emd', 'ecsid', '_&ecsid2', 'gap.rp']);
// The automatic detector's report ABOUT a field it found (selector, tag, visibility, value length, gmail flag, latency,
// status), not the value. Forbidden in "shipped". In "stress" it is recorded, not asserted: in callordut's container
// (__ccd_pre_auto_pii, a Google eligibility flag) it is sent on Ads conversion hits only while ad_storage is granted,
// which these sites never grant; no gtag parameter turns that detector off (2026-10-17, see reports/B19-OFF.md).
const DETECT_KEYS = new Set(['ec_sel', 'ec_meta', 'ec_m', 'ec_s', 'ec_lat']);
const sha = (s) => createHash('sha256').update(s).digest();
const NEEDLES = [];
for (const v of [SYN.email, SYN.phone, SYN.phone.slice(1), SYN.first, SYN.last, SYN.street, SYN.city, SYN.postal].flatMap((x) => [x, x.toLowerCase()])) {
  const d = sha(v);
  if (v.length >= 7) NEEDLES.push(v); // a short raw value (a postal code) can occur by chance in a random id; its hashes cannot
  NEEDLES.push(d.toString('hex'), d.toString('base64').replace(/=+$/, ''), d.toString('base64url'));
}
const STRESS_JS = `(function(){window.dataLayer=window.dataLayer||[];function g(){dataLayer.push(arguments)}g('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});})();`;

let failures = 0; const results = [];
function ok(cond, label) { results.push({ ok: !!cond, label }); if (cond) console.log(`  ok   ${label}`); else { failures += 1; console.error(`  FAIL ${label}`); } }

async function run(browser, state) {
  const context = await browser.newContext({ userAgent: UA, serviceWorkers: 'block', extraHTTPHeaders: COUNTRY ? { 'x-vercel-ip-country': COUNTRY } : {} });
  await context.addInitScript(() => { Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false, configurable: true }); });
  if (state === 'stress') await context.addInitScript(STRESS_JS);
  const rec = { phase: 'before', ledger: [] };
  await context.route('**/*', async (route) => {
    const q = route.request(); const u = new URL(q.url());
    if (u.origin === ORIGIN) {
      if (q.method() === 'GET' || q.method() === 'HEAD') return route.continue();
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    }
    const entry = { phase: rec.phase, host: u.hostname, method: q.method(), type: q.resourceType(), url: q.url(), body: q.postData() || '', action: '' };
    rec.ledger.push(entry);
    if (vendorHost(u.hostname)) {
      if (u.origin + u.pathname === 'https://www.googletagmanager.com/gtag/js' && u.searchParams.get('id') === GA_ID) { entry.action = 'cached-loader'; return route.fulfill({ status: 200, contentType: 'text/javascript', body: LOADER }); }
      entry.action = 'answered-204';
      return route.fulfill({ status: 204, body: '' });
    }
    entry.action = 'aborted-unknown';
    return route.abort();
  });
  const page = await context.newPage();
  await page.goto(ORIGIN + '/', { waitUntil: 'load' }); await page.waitForTimeout(2500);
  const accept = page.locator('[data-consent-bar] [data-consent="accept"]');
  const barShown = (await accept.count()) > 0;
  rec.phase = 'after';
  if (barShown) { await accept.click(); await page.waitForTimeout(3000); }
  await page.goto(ORIGIN + FORM_PATH, { waitUntil: 'load' }); await page.waitForTimeout(3000);
  const fill = async (sel, v) => { const l = (typeof sel === 'string' ? page.locator(sel) : sel).first(); if (!(await l.count())) return false; await l.click(); await l.fill(v); await l.blur(); return true; };
  const byName = page.locator('form input[name="fullName"], form input[name="name"], form input[name="firstName"]');
  const filled = {
    name: await fill((await byName.count()) ? byName : page.locator('form').getByLabel(/^\s*(full )?name\s*$/i), SYN.name),
    email: await fill('form input[type="email"], form input[name="email"]', SYN.email),
    phone: await fill('form input[type="tel"], form input[name="phone"]', SYN.phone),
  };
  // A test-only form with synthetic address fields, so automatic address detection has something to find.
  await page.evaluate((s) => {
    const f = document.createElement('form'); f.id = 'b19-address-form'; f.setAttribute('onsubmit', 'return false');
    const add = (name, ac, v) => { const i = document.createElement('input'); i.name = name; i.autocomplete = ac; i.value = v; f.appendChild(i); };
    add('first_name', 'given-name', s.first); add('last_name', 'family-name', s.last); add('street', 'street-address', s.street);
    add('city', 'address-level2', s.city); add('region', 'address-level1', s.region); add('postal_code', 'postal-code', s.postal);
    add('country', 'country', s.country); add('email2', 'email', s.email); add('phone2', 'tel', s.phone);
    document.body.appendChild(f);
  }, SYN);
  await page.waitForTimeout(1500);
  // The site's own lead events, plus an Ads conversion event to the linked Ads id (a gtag conversion with send_to): the
  // conversion hit is where the container attaches automatically detected fields (ec_* / em) when it is allowed to.
  await page.evaluate((ads) => { if (typeof window.gtag === 'function') { window.gtag('event', 'b19_after_fill'); window.gtag('event', 'generate_lead', { value: 1 }); window.gtag('event', 'conversion', { send_to: ads + '/b19-test-label', value: 1 }); } }, ADS_ID);
  await page.waitForTimeout(2500);
  const submit = page.locator('form button[type="submit"]').first();
  const submitted = (await submit.count()) > 0;
  if (submitted) await submit.click({ noWaitAfter: true }).catch(() => {});
  await page.waitForTimeout(5000);
  const commands = await page.evaluate(() => (window.dataLayer || []).map((a) => {
    try { return { args: JSON.parse(JSON.stringify(Array.from(a), (k, v) => (v === undefined ? '__undefined__' : v))) }; } catch (e) { return { args: null }; }
  }).filter((c) => Array.isArray(c.args) && typeof c.args[0] === 'string'));
  await context.close();
  return { state, barShown, filled, submitted, commands, ledger: rec.ledger };
}

// Each config command, with the user_data in effect when it ran: its own parameter, else the latest global `set`.
function configsWithUserData(commands) {
  let global; let seenSet = false; const out = [];
  for (const { args } of commands) {
    const [cmd, a1, a2] = args;
    if (cmd === 'set') {
      if (a1 === 'user_data') { global = a2; seenSet = true; } else if (a1 && typeof a1 === 'object' && 'user_data' in a1) { global = a1.user_data; seenSet = true; }
    } else if (cmd === 'config') {
      const own = a2 && typeof a2 === 'object' && 'user_data' in a2;
      out.push({ id: a1, effective: own ? a2.user_data : (seenSet ? global : '__unset__'), via: own ? 'config' : (seenSet ? 'set' : 'none') });
    }
  }
  return out;
}
const suppliesUserData = ({ args }) => {
  const objs = args.filter((x) => x && typeof x === 'object');
  if (args[0] === 'set' && args[1] === 'user_data') return args[2] !== null;
  return objs.some((o) => 'user_data' in o && o.user_data !== null);
};
function paramSets(h) {
  const u = new URL(h.url);
  return [u.searchParams, ...String(h.body).split('\n').filter(Boolean).map((l) => new URLSearchParams(l))];
}

function check(r) {
  const S = r.state;
  const hits = r.ledger.filter((h) => h.phase === 'after' && h.action === 'answered-204');
  const ga4 = hits.filter((h) => /\/g\/collect$/.test(new URL(h.url).pathname));
  const ads = hits.filter((h) => h.url.includes(ADS_ID.replace(/^AW-/, '')) || /\/ccm\/collect$|\/pagead\/|\/rmkt\//.test(new URL(h.url).pathname));
  ok(r.barShown, `${S}: the consent bar is shown and "Allow analytics" was pressed`);
  ok(r.ledger.filter((h) => h.phase === 'before').length === 0, `${S}: nothing sent to Google before the press (${r.ledger.filter((h) => h.phase === 'before').length})`);
  ok(r.filled.email && r.filled.phone && r.filled.name, `${S}: the form's name, email and phone fields were filled with synthetic values (${JSON.stringify(r.filled)})`);
  ok(r.ledger.some((h) => h.action === 'cached-loader'), `${S}: the real container was served from the fixture after Allow`);
  ok(ga4.length > 0, `${S}: analytics stay on: GA4 collect requests after Allow (${ga4.length}, answered locally)`);
  ok(ads.length > 0, `${S}: Ads measurement stays on: Ads collection requests after Allow (${ads.length}, answered locally)`);
  const configs = configsWithUserData(r.commands);
  ok(configs.some((c) => c.id === GA_ID), `${S}: a gtag config command for ${GA_ID} ran (${configs.map((c) => c.id).join(', ') || 'none'})`);
  const notOff = configs.filter((c) => c.effective !== null);
  ok(configs.length > 0 && notOff.length === 0, `${S}: every gtag config command runs with user_data null in effect (${configs.map((c) => `${c.id} via ${c.via}: ${JSON.stringify(c.effective)}`).join('; ')})`);
  const supplying = r.commands.filter(suppliesUserData);
  ok(supplying.length === 0, `${S}: no set/config/event command supplies user data (${supplying.map((c) => JSON.stringify(c.args).slice(0, 120)).join('; ') || 'none'})`);
  const formData = hits.filter((h) => /\/ccm\/form-data\//.test(new URL(h.url).pathname));
  ok(formData.length === 0, `${S}: zero ccm/form-data (automatic user-data) requests (${formData.map((h) => h.method + ' ' + h.url.slice(0, 90)).join(' | ') || 'none'})`);
  const withKeys = []; const detect = [];
  // www.googletagmanager.com/td is the tag's own diagnostics ping (its ct= is a counter, not a city); it is still in the
  // synthetic-value check below.
  for (const h of hits.filter((x) => !/^https:\/\/www\.googletagmanager\.com\/td$/.test(x.url.split('?')[0]))) {
    const keys = new Set(); const dk = new Set();
    for (const p of paramSets(h)) for (const k of p.keys()) { if (USER_KEYS.has(k)) keys.add(`${k}=${p.get(k)}`); if (DETECT_KEYS.has(k)) dk.add(`${k}=${p.get(k)}`); }
    const where = `${new URL(h.url).host}${new URL(h.url).pathname}`;
    if (keys.size) withKeys.push(`${where} [${[...keys].join(' ')}]`);
    if (dk.size) detect.push(`${where} [${[...dk].join(' ')}]`);
  }
  ok(withKeys.length === 0, `${S}: no user-data parameter (em/ph/pn/name/address/ec_mode/eme/emd) in any Google request (${hits.length} checked; ${withKeys.join(' | ') || 'none'})`);
  if (S === 'shipped') ok(detect.length === 0, `${S}: no automatic-detection report (ec_sel/ec_meta/ec_m/ec_lat/ec_s) in any Google request (${detect.join(' | ') || 'none'})`);
  else { results.push({ ok: null, label: `NOTE ${S}: automatic-detection reports (field location/metadata, not values): ${detect.length}`, detail: detect }); console.log(`  note ${S}: automatic-detection reports, field metadata not values (${detect.length}${detect.length ? ': ' + detect.map((d) => d.slice(0, 160)).join(' | ') : ''})`); }
  const leaked = hits.filter((h) => { let raw = h.url + '\n' + h.body; try { raw += '\n' + decodeURIComponent(raw); } catch (e) { /* keep raw */ } return NEEDLES.some((n) => raw.includes(n)); });
  ok(leaked.length === 0, `${S}: no synthetic value, raw or SHA-256, in any Google request (${leaked.map((h) => h.url.slice(0, 90)).join(' | ') || 'none'})`);
  const unknown = r.ledger.filter((h) => h.action === 'aborted-unknown');
  ok(unknown.length === 0, `${S}: zero requests to unknown off-origin hosts (${unknown.map((h) => h.url).join(', ') || 'none'})`);
  return { state: S, configs, ga4: ga4.length, ads: ads.length, form_data: formData.length, user_keys: withKeys, detection_reports: detect, leaked: leaked.length, submitted: r.submitted };
}

const browser = await chromium.launch();
const out = { origin: ORIGIN, ga_id: GA_ID, ads_id: ADS_ID, form_path: FORM_PATH, country: COUNTRY || null, measured_at: new Date().toISOString(), states: {} };
try {
  for (const state of ['shipped', 'stress']) {
    console.log(`# ${state}`);
    const r = await run(browser, state);
    out.states[state] = { summary: check(r), commands: r.commands, ledger: r.ledger };
  }
} finally { await browser.close(); }
out.results = results; out.failures = failures;
if (OUT) writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(failures ? `\nRED: ${failures} failed` : '\nGREEN: all passed');
process.exit(failures ? 1 : 0);
