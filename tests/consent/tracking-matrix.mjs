/**
 * Consent tracking matrix (compliance P1-1g, Mark 2026-10-12), adapted from hiresabina.ai's
 * tests/consent/tracking-matrix.mjs (P1-1b) and dominusfoundry.com's (P1-1c): same states, same recording
 * rules. What is this site's: the pages, the storage key, Google Ads in the tracker predicate (callordut's Google
 * tag container for G-564V54PB0V carries the Ads destination AW-17409946688, so the ads hosts must be watched as
 * well as GA4), no LinkedIn and no Vercel Web Analytics, and no form state (the order bars form submission).
 * Point CONSENT_ORIGIN at a running build.
 *
 *   CONSENT_ORIGIN=http://localhost:4492 CONSENT_OUT=matrix.json node tests/consent/tracking-matrix.mjs
 *
 * Every state runs in a FRESH browser context (no shared storage). Every request is recorded by host.
 * ⛔ Nothing about a visitor leaves this machine: analytics and advertising collection endpoints are answered in
 * the browser with an empty 204 (the request is recorded, never delivered), every same-origin write is answered
 * with a fixture, and every other off-origin request is aborted.
 * NAMED EXCEPTION — the only request let through to Google: the gtag.js LOADER
 * (www.googletagmanager.com/gtag/js). Without it no collection request can be observed at all, so a clean result
 * would be vacuous. It is a public script download and carries no visitor data beyond what any GET carries.
 * Exit 1 on any failed assertion. CONSENT_LABEL only labels the output.
 * CONSENT_CHROMIUM: an installed Chromium/headless-shell binary. CONSENT_PLAYWRIGHT: path to a playwright
 * module (this repo does not depend on playwright, and installing was barred).
 */
import { writeFileSync } from 'node:fs';

const { chromium } = await import(process.env.CONSENT_PLAYWRIGHT || 'playwright');

const ORIGIN = process.env.CONSENT_ORIGIN || 'http://localhost:4492';
const OUT = process.env.CONSENT_OUT || '';
const LABEL = process.env.CONSENT_LABEL || 'candidate';
const PAGES = (process.env.CONSENT_PAGES || '/,/contact,/solutions,/privacy,/sms-terms').split(',');
const KEY = process.env.CONSENT_KEY || 'callord-consent';

// GA4 + Google Ads + the Google tag. Any request to google.com, googleadservices.com or doubleclick.net counts:
// this site embeds nothing else from those hosts (no maps, no fonts — next/font self-hosts), so the predicate is
// deliberately broad. Vercel Web Analytics and LinkedIn are watched too, as controls that must stay at zero.
const TRACKER_HOSTS = /(^|\.)(googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net|googleadservices\.com|googlesyndication\.com|google\.com|licdn\.com|linkedin\.com|va\.vercel-scripts\.com)$/;
const ADS = (h) => /(^|\.)(doubleclick\.net|googleadservices\.com|googlesyndication\.com)$/.test(h.host) || (/(^|\.)google\.com$/.test(h.host) && /^\/(pagead|rmkt|ccm|ads)\b/.test(h.path));
const LOADER = /^https:\/\/www\.googletagmanager\.com\/gtag\/js\?/;
const trackerOf = (u) => (TRACKER_HOSTS.test(u.hostname) ? u.hostname : (u.pathname.startsWith('/_vercel/insights') ? 'vercel-insights(same-origin)' : null));
const ANALYTICS_COOKIE = /^(_ga|_gid|_gat|_gcl|_gac|IDE|test_cookie|li_|_li)/;
const ANALYTICS_STORAGE = /^(_gcl|_ga)/;

let failures = 0; const results = [];
function ok(cond, label) { results.push({ ok: !!cond, label }); if (cond) console.log(`  ok   ${label}`); else { failures += 1; console.error(`  FAIL ${label}`); } }

async function fresh(browser, opts = {}) {
  const { gpcSignal = false, gpcHeader = false, js = true, seedAccept = false } = opts;
  const context = await browser.newContext({ javaScriptEnabled: js, extraHTTPHeaders: gpcHeader ? { 'Sec-GPC': '1' } : {} });
  if (gpcSignal) await context.addInitScript(() => { Object.defineProperty(Navigator.prototype, 'globalPrivacyControl', { get: () => true, configurable: true }); });
  if (seedAccept) await context.addInitScript((k) => { try { if (!localStorage.getItem(k)) localStorage.setItem(k, '1.accept.0'); } catch (e) { /* none */ } }, KEY);
  const rec = { phase: 'before', hits: [], writes: 0, pageErrors: [] };
  await context.route('**/*', async (route) => {
    const q = route.request(); const u = new URL(q.url());
    const t = trackerOf(u);
    if (t) {
      rec.hits.push({ phase: rec.phase, host: t, path: u.pathname, method: q.method(), url: q.url(), body: q.postData() || '' });
      if (LOADER.test(q.url())) return route.continue(); // the named exception above
      return route.fulfill({ status: 204, body: '' });
    }
    if (u.origin !== ORIGIN) return route.abort();
    if (q.method() === 'GET' || q.method() === 'HEAD') return route.continue();
    // Same-origin writes never reach the app (no lead email). None is expected: no form is submitted.
    rec.writes += 1;
    return route.fulfill({ status: 204, body: '' });
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => rec.pageErrors.push(String(e.message || e).slice(0, 200)));
  return { context, page, rec };
}
async function visit(page, path) { await page.goto(ORIGIN + path, { waitUntil: 'load' }); await page.waitForTimeout(2500); }
const hostsIn = (rec, phase) => [...new Set(rec.hits.filter((h) => !phase || h.phase === phase).map((h) => h.host))].sort();
const adsIn = (rec, phase) => rec.hits.filter((h) => (!phase || h.phase === phase) && ADS(h)).map((h) => `${h.host}${h.path}`);
const barCount = (page) => page.locator('[data-consent-bar]').count();
// The bar is React-rendered, so it appears only after hydration. On a loaded machine (load average 23-35 measured
// during this lane) hydration can exceed the fixed 2.5 s settle, so a bar that IS coming was counted as absent in
// 2 of 5 early runs. Where the bar is EXPECTED, wait for it (up to 10 s) and record how long it took; where it must
// be ABSENT (GPC, after a choice), the fixed wait stays, which only makes those checks stricter.
async function barAppears(page) {
  const t0 = Date.now();
  try { await page.locator('[data-consent-bar]').first().waitFor({ state: 'visible', timeout: 10000 }); return Date.now() - t0; } catch (e) { return null; }
}
async function leftovers(context, page) {
  const cookies = (await context.cookies()).map((c) => c.name).filter((n) => ANALYTICS_COOKIE.test(n));
  const storage = await page.evaluate((re) => { try { return Object.keys(localStorage).filter((k) => new RegExp(re).test(k)); } catch (e) { return ['<storage blocked>']; } }, ANALYTICS_STORAGE.source);
  return { cookies, storage };
}
// Marks every later request as phase "after" AT the click, so a hit fired while waiting is not miscounted.
async function choose(page, choice, rec) {
  const btn = page.locator(`[data-consent-bar] [data-consent="${choice}"]`);
  await btn.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  if (await btn.count() === 0) { if (rec) rec.phase = 'after'; return false; }
  if (rec) rec.phase = 'after';
  await btn.first().click(); await page.waitForTimeout(3000); return true;
}

async function main() {
  const browser = await chromium.launch(process.env.CONSENT_CHROMIUM ? { executablePath: process.env.CONSENT_CHROMIUM } : {});
  const matrix = { label: LABEL, origin: ORIGIN, measured_at: new Date().toISOString(), pages: PAGES, states: {} };
  try {
    // 1 initial: no choice made, every page
    { const { context, page, rec } = await fresh(browser);
      const bars = {}; const msAfterSettle = {};
      for (const p of PAGES) { await visit(page, p); const ms = await barAppears(page); msAfterSettle[p] = ms; bars[p] = ms === null ? 0 : await barCount(page); }
      const hosts = hostsIn(rec); const ads = adsIn(rec); const left = await leftovers(context, page);
      matrix.states.initial = { hosts, ads_requests: ads.length, ads_sample: ads.slice(0, 6), requests: rec.hits.length, bar_per_page: bars, bar_ms_after_2500ms_settle: msAfterSettle, ...left, page_errors: rec.pageErrors };
      ok(hosts.length === 0, `initial: zero analytics/advertising requests before any choice (${hosts.join(', ') || 'none'})`);
      ok(ads.length === 0, `initial: zero Google Ads requests (${ads.length})`);
      ok(left.cookies.length === 0 && left.storage.length === 0, `initial: no analytics cookies or storage (${[...left.cookies, ...left.storage].join(', ') || 'none'})`);
      ok(PAGES.every((p) => bars[p] > 0), `initial: the consent bar is shown on every page (${JSON.stringify(bars)})`);
      await context.close(); }

    // 2 reject
    { const { context, page, rec } = await fresh(browser);
      await visit(page, PAGES[0]); const clicked = await choose(page, 'reject', rec);
      for (const p of PAGES) await visit(page, p);
      const hosts = hostsIn(rec); const left = await leftovers(context, page);
      matrix.states.reject = { hosts, ads_requests: adsIn(rec).length, choice_made: clicked, bar_after: await barCount(page), ...left };
      ok(clicked, 'reject: "No analytics" button exists and was pressed');
      ok(hosts.length === 0, `reject: zero analytics/advertising requests (${hosts.join(', ') || 'none'})`);
      ok(left.cookies.length === 0 && left.storage.length === 0, `reject: no analytics cookies or storage (${[...left.cookies, ...left.storage].join(', ') || 'none'})`);
      ok(await barCount(page) === 0, 'reject: the bar does not come back on later pages');
      await context.close(); }

    // 3 accept: nothing before the click; GA4 AND the Ads destination after it (the positive control that the
    //   ads predicate fires, so the zeros above are not vacuous)
    { const { context, page, rec } = await fresh(browser);
      await visit(page, PAGES[0]); const before = hostsIn(rec);
      const clicked = await choose(page, 'accept', rec);
      for (const p of PAGES) await visit(page, p);
      const after = hostsIn(rec, 'after'); const adsAfter = adsIn(rec, 'after'); const left = await leftovers(context, page);
      const dl = rec.hits.filter((h) => /google-analytics|analytics\.google/.test(h.host) && /[?&]dl=[^&]*%3F/.test(h.url));
      matrix.states.accept = { hosts_before_choice: before, hosts_after_accept: after, ads_requests_after: adsAfter.length, ads_sample: [...new Set(adsAfter)].slice(0, 8), choice_made: clicked, ...left };
      ok(clicked && before.length === 0, `accept: nothing before the click (${before.join(', ') || 'none'})`);
      ok(after.includes('www.googletagmanager.com'), 'accept: Google tag loader requested after accept');
      ok(after.some((h) => /google-analytics\.com$|analytics\.google\.com$/.test(h)), 'accept: a GA4 collection request is made after accept (answered locally, never delivered)');
      ok(adsAfter.length > 0, `accept: Google Ads requests are made after accept (${[...new Set(adsAfter)].slice(0, 4).join(', ') || 'none'}) — the ads predicate fires`);
      ok(!after.some((h) => /licdn|linkedin|vercel/.test(h)), `accept: no LinkedIn or Vercel analytics (this site has neither) (${after.join(', ')})`);
      ok(dl.length === 0, 'accept: no GA4 hit carries a query string in its page location');
      await context.close(); }

    // 4 withdraw (accept, then the withdraw control on /privacy)
    { const { context, page, rec } = await fresh(browser);
      await visit(page, PAGES[0]); await choose(page, 'accept');
      await visit(page, '/privacy');
      const pre = await leftovers(context, page);
      const w = page.locator('[data-consent-withdraw]');
      const has = await w.count() > 0;
      if (has) { await Promise.all([page.waitForEvent('load', { timeout: 10000 }).catch(() => {}), w.first().click()]); await page.waitForTimeout(2500); }
      const post = await leftovers(context, page);
      rec.phase = 'after';
      for (const p of PAGES) await visit(page, p);
      const hosts = hostsIn(rec, 'after'); const end = await leftovers(context, page);
      matrix.states.withdraw = { withdraw_control_found: has, before_withdraw: pre, right_after_withdraw: post, hosts_after_withdraw: hosts, ads_requests_after: adsIn(rec, 'after').length, after_five_pages: end };
      ok(has, 'withdraw: /privacy has a withdraw control');
      ok(pre.cookies.some((n) => /^_ga/.test(n)) && pre.cookies.includes('_gcl_au'), `withdraw: _ga and _gcl_au existed before withdrawing, so the clearing check is not vacuous (${pre.cookies.join(', ') || 'none'})`);
      ok(post.cookies.length === 0 && post.storage.length === 0, `withdraw: _ga*, _gcl_au and _gcl_ls cleared (${[...post.cookies, ...post.storage].join(', ') || 'none'})`);
      ok(hosts.length === 0, `withdraw: zero analytics/advertising requests after withdrawing (${hosts.join(', ') || 'none'})`);
      ok(end.cookies.length === 0 && end.storage.length === 0, `withdraw: nothing re-created over five more pages (${[...end.cookies, ...end.storage].join(', ') || 'none'})`);
      await context.close(); }

    // 5 GPC: signal, and header, each ALSO with a stored accept that GPC must override
    for (const [name, opts] of [['gpc_signal', { gpcSignal: true }], ['gpc_header', { gpcHeader: true }], ['gpc_signal_over_stored_accept', { gpcSignal: true, seedAccept: true }], ['gpc_header_over_stored_accept', { gpcHeader: true, seedAccept: true }]]) {
      const { context, page, rec } = await fresh(browser, opts);
      let bar = 0;
      for (const p of PAGES) { await visit(page, p); bar += await barCount(page); }
      const hosts = hostsIn(rec);
      const state = await page.evaluate(() => (window.SiteConsent ? window.SiteConsent.state() : 'no-gate'));
      matrix.states[name] = { hosts, ads_requests: adsIn(rec).length, bar_shown: bar > 0, gate_state: state };
      ok(hosts.length === 0, `${name}: zero analytics/advertising requests (${hosts.join(', ') || 'none'})`);
      ok(bar === 0, `${name}: no consent prompt`);
      ok(state === 'gpc', `${name}: the gate reports gpc (${state})`);
      await context.close();
    }

    // 6 noscript
    { const { context, page, rec } = await fresh(browser, { js: false });
      for (const p of PAGES) await visit(page, p);
      const hosts = hostsIn(rec);
      matrix.states.noscript = { hosts };
      ok(hosts.length === 0, `noscript: zero analytics/advertising requests (${hosts.join(', ') || 'none'})`);
      await context.close(); }

    // 7 /privacy: content, and every Privacy link on the checked pages resolves to it
    { const { context, page } = await fresh(browser);
      const links = {};
      for (const p of PAGES) {
        await page.goto(ORIGIN + p, { waitUntil: 'load' });
        links[p] = await page.evaluate(() => [...document.querySelectorAll('a')].filter((a) => /privacy/i.test(a.textContent)).map((a) => `${a.textContent.trim()} -> ${new URL(a.href).pathname}`));
      }
      const bad = Object.entries(links).flatMap(([p, ls]) => ls.filter((l) => !/-> \/privacy$/.test(l)).map((l) => `${p}: ${l}`));
      const r = await page.goto(ORIGIN + '/privacy', { waitUntil: 'load' });
      const body = (await r.text()) || '';
      const text = body.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#x27;|&rsquo;/g, "'").replace(/\s+/g, ' ');
      const must = ['Google Analytics', 'Google Ads', 'Global Privacy Control', 'sales@callordut.com', 'A phone number alone is never permission to text you', 'hosting provider'];
      const mustNot = ['By using our website', 'Opt-out Browser Add-on', 'Vercel', '\\bIris\\b', '\\$[0-9]'];
      const missing = must.filter((m) => !text.includes(m));
      const present = mustNot.filter((m) => new RegExp(m).test(text));
      const control = await page.locator('[data-consent-choice]').count();
      matrix.states.privacy_page = { status: r && r.status(), required_missing: missing, banned_present: present, choice_control: control, privacy_links: links, links_not_to_privacy: bad };
      ok(r && r.status() === 200, `/privacy renders (status ${r && r.status()})`);
      ok(missing.length === 0, `/privacy states every required item (missing: ${missing.join('; ') || 'none'})`);
      ok(present.length === 0, `/privacy carries none of the banned/false items (present: ${present.join('; ') || 'none'})`);
      ok(control > 0, '/privacy carries the analytics choice / withdraw control');
      ok(PAGES.every((p) => links[p].length > 0) && bad.length === 0, `every checked page links to /privacy and every Privacy link resolves there (${bad.join('; ') || 'all'})`);
      await context.close(); }
  } finally {
    await browser.close();
  }
  matrix.checks = results; matrix.failures = failures;
  if (OUT) writeFileSync(OUT, JSON.stringify(matrix, null, 2) + '\n');
  console.log(`${LABEL}: ${results.length - failures} of ${results.length} checks passed`);
  process.exit(failures ? 1 : 0);
}
main().catch((e) => { console.error('  FAIL harness error:', e && e.stack || e); process.exit(2); });
