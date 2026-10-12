/**
 * Consent tracking matrix (compliance P1-1g, Mark 2026-10-12/13), adapted from hiresabina.ai's
 * tests/consent/tracking-matrix.mjs (P1-1b) and dominusfoundry.com's (P1-1c). Point CONSENT_ORIGIN at a running
 * build:
 *
 *   CONSENT_ORIGIN=http://localhost:4492 CONSENT_OUT=matrix.json node tests/consent/tracking-matrix.mjs
 *
 * What is this site's: the pages, the storage key, Google Ads (callordut's Google tag for G-564V54PB0V carries the
 * Ads destination AW-17409946688, so Ads collection must be watched as well as GA4), and Mark's 2026-10-13 ruling
 * that the one choice covers Google Analytics and COOKIELESS Google Ads measurement (so no _gcl cookie or storage,
 * even after Allow). No form is ever submitted (the order bars it).
 *
 * Recording (round 2, after the dominusfoundry review's F4):
 *   - EVERY off-origin request is recorded, including the ones this harness aborts. Zero-request assertions in the
 *     no-choice states count ALL recorded off-origin attempts, not only the ones the predicate recognises.
 *   - The tracker predicate names the known collection hosts and paths (TRACKERS below) so the report can say WHAT
 *     fired; it never decides what is counted.
 * ⛔ Nothing about a visitor leaves this machine: tracker requests are answered in the browser with an empty 204
 * (recorded, never delivered), every same-origin write is answered with a fixture, every other off-origin request
 * is aborted (and recorded).
 * NAMED EXCEPTION — REAL_LOADER: the gtag.js loader (www.googletagmanager.com/gtag/js) is fetched for real.
 * Without it no collection request can be observed, so a clean result would be vacuous. It is a public script
 * download. CONSENT_BLOCK_LOADER=1 answers it with a 204 too (then the accept-state positives are NOT_MEASURED).
 * Exit 1 on any failed assertion. CONSENT_CHROMIUM: an installed Chromium/headless-shell binary.
 * CONSENT_PLAYWRIGHT: path to a playwright module (this repo does not depend on playwright; installing was barred).
 * CONSENT_ROUTES: comma list of every HTML route, for the all-routes GPC state (default: PAGES).
 * CONSENT_SHOTS: directory for the viewport screenshots (optional).
 */
import { writeFileSync, mkdirSync } from 'node:fs';

const { chromium } = await import(process.env.CONSENT_PLAYWRIGHT || 'playwright');

const ORIGIN = process.env.CONSENT_ORIGIN || 'http://localhost:4492';
const OUT = process.env.CONSENT_OUT || '';
const LABEL = process.env.CONSENT_LABEL || 'candidate';
const PAGES = (process.env.CONSENT_PAGES || '/,/contact,/solutions,/privacy,/sms-terms').split(',');
const ROUTES = (process.env.CONSENT_ROUTES || PAGES.join(',')).split(',').filter(Boolean);
const KEY = process.env.CONSENT_KEY || 'callord-consent';
const SHOTS = process.env.CONSENT_SHOTS || '';
const BLOCK_LOADER = process.env.CONSENT_BLOCK_LOADER === '1';

// host regex, optional path regex. Required by the round-2 order: google-analytics.com, googletagmanager.com,
// www.google.com/g/collect, www.google.com/measurement/conversion, google.com/pagead, googleads.g.doubleclick.net,
// googleadservices.com, va.vercel-scripts.com, /_vercel/insights, licdn.com, elevenlabs. Plus the rest of Google's
// collection aliases seen on this estate.
const TRACKERS = [
  ['google-analytics', /(^|\.)google-analytics\.com$/], ['google-analytics', /(^|\.)analytics\.google\.com$/],
  ['googletagmanager', /(^|\.)googletagmanager\.com$/],
  ['google.com/g/collect', /(^|\.)google\.com$/, /^\/g\/collect/],
  ['google.com/measurement/conversion', /(^|\.)google\.com$/, /^\/measurement\/conversion/],
  ['google.com/pagead', /(^|\.)google\.com$/, /^\/pagead\b/],
  ['google.com/rmkt', /(^|\.)google\.com$/, /^\/rmkt\b/],
  ['google.com/ccm', /(^|\.)google\.com$/, /^\/ccm\b/],
  ['googleads.g.doubleclick.net', /^googleads\.g\.doubleclick\.net$/],
  ['doubleclick.net', /(^|\.)doubleclick\.net$/],
  ['googleadservices', /(^|\.)googleadservices\.com$/], ['googlesyndication', /(^|\.)googlesyndication\.com$/],
  ['va.vercel-scripts.com', /^va\.vercel-scripts\.com$/],
  ['licdn/linkedin', /(^|\.)(licdn|linkedin)\.com$/],
  ['elevenlabs', /elevenlabs/],
];
const ADS = /^(google\.com\/(pagead|rmkt|ccm|measurement)|googleads|doubleclick|googleadservices|googlesyndication)/;
const LOADER = /^https:\/\/www\.googletagmanager\.com\/gtag\/js\?/;
function classify(u) {
  if (u.origin === ORIGIN) return u.pathname.startsWith('/_vercel/insights') ? 'vercel-insights(same-origin)' : null;
  for (const [name, host, path] of TRACKERS) if (host.test(u.hostname) && (!path || path.test(u.pathname))) return name;
  return 'other-off-origin:' + u.hostname;
}
const ANALYTICS_COOKIE = /^(_ga|_gid|_gat|_gcl|_gac|IDE|test_cookie|li_|_li)/;
const ANALYTICS_STORAGE = /^(_gcl|_ga)/;

let failures = 0; const results = [];
function ok(cond, label) { results.push({ ok: !!cond, label }); if (cond) console.log(`  ok   ${label}`); else { failures += 1; console.error(`  FAIL ${label}`); } }

async function fresh(browser, opts = {}) {
  const { gpcSignal = false, gpcHeader = false, js = true, seedAccept = null, viewport = null } = opts;
  const context = await browser.newContext({ javaScriptEnabled: js, extraHTTPHeaders: gpcHeader ? { 'Sec-GPC': '1' } : {}, ...(viewport ? { viewport } : {}) });
  if (gpcSignal) await context.addInitScript(() => { Object.defineProperty(Navigator.prototype, 'globalPrivacyControl', { get: () => true, configurable: true }); });
  if (seedAccept === 'storage') await context.addInitScript((k) => { try { if (!localStorage.getItem(k)) localStorage.setItem(k, '1.accept.0'); } catch (e) { /* none */ } }, KEY);
  if (seedAccept === 'cookie') await context.addCookies([{ name: KEY, value: '1.accept.0', url: ORIGIN }]);
  const rec = { phase: 'before', hits: [], writes: 0, pageErrors: [] };
  await context.route('**/*', async (route) => {
    const q = route.request(); const u = new URL(q.url());
    const kind = classify(u);
    if (kind) {
      const real = !BLOCK_LOADER && LOADER.test(q.url());
      rec.hits.push({ phase: rec.phase, kind, host: u.hostname, path: u.pathname, method: q.method(), url: q.url(), body: q.postData() || '', handled: real ? 'real-loader' : (kind.startsWith('other-off-origin') ? 'aborted' : 'fulfilled-204') });
      if (real) return route.continue();
      if (kind.startsWith('other-off-origin')) return route.abort();
      return route.fulfill({ status: 204, body: '' });
    }
    if (q.method() === 'GET' || q.method() === 'HEAD') return route.continue();
    rec.writes += 1; // same-origin writes never reach the app; none is expected (no form is submitted)
    return route.fulfill({ status: 204, body: '' });
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => rec.pageErrors.push(String(e.message || e).slice(0, 200)));
  return { context, page, rec };
}
async function visit(page, path) { await page.goto(ORIGIN + path, { waitUntil: 'load' }); await page.waitForTimeout(2500); }
const kindsIn = (rec, phase) => [...new Set(rec.hits.filter((h) => !phase || h.phase === phase).map((h) => h.kind))].sort();
const countIn = (rec, phase) => rec.hits.filter((h) => !phase || h.phase === phase).length;
const adsIn = (rec, phase) => rec.hits.filter((h) => (!phase || h.phase === phase) && ADS.test(h.kind));
const barCount = (page) => page.locator('[data-consent-bar]').count();
// The bar is React-rendered after hydration; where it is EXPECTED, wait for it (up to 10 s) and record how long it
// took after the 2.5 s settle. Where it must be ABSENT, the fixed wait stays (stricter).
async function barAppears(page) {
  const t0 = Date.now();
  try { await page.locator('[data-consent-bar]').first().waitFor({ state: 'visible', timeout: 10000 }); return Date.now() - t0; } catch (e) { return null; }
}
async function leftovers(context, page) {
  const cookies = (await context.cookies()).map((c) => c.name).filter((n) => ANALYTICS_COOKIE.test(n));
  const storage = await page.evaluate((re) => { try { return Object.keys(localStorage).filter((k) => new RegExp(re).test(k)); } catch (e) { return ['<storage blocked>']; } }, ANALYTICS_STORAGE.source);
  return { cookies, storage };
}
async function choose(page, choice, rec) {
  const btn = page.locator(`[data-consent-bar] [data-consent="${choice}"]`);
  await btn.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  if (await btn.count() === 0) { if (rec) rec.phase = 'after'; return false; }
  if (rec) rec.phase = 'after';
  await btn.first().click(); await page.waitForTimeout(3000); return true;
}
const zeroLine = (rec, phase) => `${countIn(rec, phase)} attempts${countIn(rec, phase) ? ': ' + kindsIn(rec, phase).join(', ') : ''}`;

// Runs in the page at maximum scroll: which visible content (links, controls, text, images) does the bar overlap?
// Runs in the page at maximum scroll: which visible content does the bar overlap? Counted: every non-empty TEXT
// NODE (measured with a Range, so text in any element — span, div, td — is seen), every link/control, and every
// image or svg. Round 2 lesson: an element-selector version missed the footer's span-only bottom row.
const MEASURE_COVER = () => {
  const bar = document.querySelector('[data-consent-bar]');
  if (!bar) return { bar: false };
  const b = bar.getBoundingClientRect();
  const covered = [];
  const hit = (x, what) => {
    if (x.width === 0 || x.height === 0 || x.bottom <= 0 || x.top >= innerHeight) return;
    const overlap = Math.min(x.bottom, b.bottom) - Math.max(x.top, b.top);
    if (overlap > 0 && Math.min(x.right, b.right) > Math.max(x.left, b.left)) covered.push(`${what} y=${Math.round(x.top)}-${Math.round(x.bottom)} overlap=${Math.round(overlap)}`);
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.nodeValue.trim() || bar.contains(n)) continue;
    const el = n.parentElement; if (!el || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(el.tagName)) continue;
    const st = getComputedStyle(el); if (st.visibility === 'hidden' || st.display === 'none' || +st.opacity === 0) continue;
    const r = document.createRange(); r.selectNodeContents(n);
    for (const x of r.getClientRects()) hit(x, `text "${n.nodeValue.trim().slice(0, 40)}"`);
  }
  for (const e of document.querySelectorAll('a, button, input, select, textarea, img, svg')) {
    if (bar.contains(e)) continue;
    hit(e.getBoundingClientRect(), `${e.tagName.toLowerCase()} "${(e.textContent || e.getAttribute('alt') || e.getAttribute('aria-label') || '').trim().slice(0, 40)}"`);
  }
  const atBottom = Math.abs(scrollY + innerHeight - document.documentElement.scrollHeight) <= 2;
  return { bar: true, bar_top: Math.round(b.top), bar_bottom: Math.round(b.bottom), viewport_h: innerHeight, at_max_scroll: atBottom, covered };
};

async function main() {
  const browser = await chromium.launch(process.env.CONSENT_CHROMIUM ? { executablePath: process.env.CONSENT_CHROMIUM } : {});
  const matrix = { label: LABEL, origin: ORIGIN, measured_at: new Date().toISOString(), pages: PAGES, routes_all: ROUTES, real_loader_exception: !BLOCK_LOADER, states: {} };
  try {
    // 1 initial: no choice made, every page
    { const { context, page, rec } = await fresh(browser);
      const bars = {}; const ms = {};
      for (const p of PAGES) { await visit(page, p); ms[p] = await barAppears(page); bars[p] = ms[p] === null ? 0 : await barCount(page); }
      const left = await leftovers(context, page);
      matrix.states.initial = { off_origin_attempts: countIn(rec), kinds: kindsIn(rec), ads_requests: adsIn(rec).length, bar_per_page: bars, bar_ms_after_2500ms_settle: ms, ...left, page_errors: rec.pageErrors, sample: rec.hits.slice(0, 12).map((h) => `${h.handled} ${h.kind} ${h.url.slice(0, 140)}`) };
      ok(countIn(rec) === 0, `initial: zero off-origin requests of ANY kind before a choice (${zeroLine(rec)})`);
      ok(left.cookies.length === 0 && left.storage.length === 0, `initial: no analytics cookies or storage (${[...left.cookies, ...left.storage].join(', ') || 'none'})`);
      ok(PAGES.every((p) => bars[p] > 0), `initial: the consent bar is shown on every page (${JSON.stringify(bars)})`);
      const text = await page.locator('[data-consent-bar]').first().textContent().catch(() => '');
      matrix.states.initial.bar_text = text;
      ok(/Google Analytics/.test(text) && /cookieless Google Ads measurement/.test(text), `initial: the bar names Google Analytics and cookieless Google Ads measurement ("${(text || '').slice(0, 120)}")`);
      ok(rec.pageErrors.length === 0, `initial: no page errors (${rec.pageErrors.length})`);
      await context.close(); }

    // 2 reject
    { const { context, page, rec } = await fresh(browser);
      await visit(page, PAGES[0]); const clicked = await choose(page, 'reject', rec);
      for (const p of PAGES) await visit(page, p);
      const left = await leftovers(context, page);
      matrix.states.reject = { off_origin_attempts: countIn(rec), kinds: kindsIn(rec), choice_made: clicked, bar_after: await barCount(page), ...left };
      ok(clicked, 'reject: "No thanks" button exists and was pressed');
      ok(countIn(rec) === 0, `reject: zero off-origin requests (${zeroLine(rec)})`);
      ok(left.cookies.length === 0 && left.storage.length === 0, `reject: no analytics cookies or storage (${[...left.cookies, ...left.storage].join(', ') || 'none'})`);
      ok(await barCount(page) === 0, 'reject: the bar does not come back on later pages');
      await context.close(); }

    // 3 accept: nothing before the click; GA4 and cookieless Ads measurement after it
    { const { context, page, rec } = await fresh(browser);
      await visit(page, PAGES[0]); const before = countIn(rec, 'before');
      const clicked = await choose(page, 'accept', rec);
      for (const p of PAGES) await visit(page, p);
      const after = kindsIn(rec, 'after'); const ads = adsIn(rec, 'after'); const left = await leftovers(context, page);
      const dl = rec.hits.filter((h) => /google-analytics/.test(h.kind) && /[?&]dl=[^&]*%3F/.test(h.url));
      const consent = await page.evaluate(() => (window.dataLayer || []).filter((a) => a && a[0] === 'consent').map((a) => [a[0], a[1], a[2]]));
      const adsParams = ads.map((h) => { const s = new URL(h.url).searchParams; return { kind: h.kind, npa: s.get('npa'), gcs: s.get('gcs'), gcd: s.get('gcd'), tid: s.get('tid') }; });
      const other = rec.hits.filter((h) => h.kind.startsWith('other-off-origin'));
      matrix.states.accept = { attempts_before_choice: before, kinds_after_accept: after, ads_requests_after: ads.length, ads_params: adsParams.slice(0, 8), consent_commands: consent, other_off_origin: other.map((h) => h.url.slice(0, 160)), choice_made: clicked, ...left };
      ok(clicked && before === 0, `accept: nothing before the click (${before})`);
      ok(after.includes('googletagmanager'), 'accept: Google tag loader requested after accept');
      ok(after.includes('google-analytics'), 'accept: a GA4 collection request is made after accept (answered locally, never delivered)');
      ok(ads.length > 0, `accept: Google Ads measurement requests occur after accept (${[...new Set(ads.map((h) => h.kind))].join(', ') || 'none'}) — the ads predicate fires`);
      ok(left.cookies.filter((n) => /^_g(cl|ac)/.test(n)).length === 0 && left.storage.filter((n) => /^_gcl/.test(n)).length === 0, `accept: cookieless Ads — no _gcl*/_gac* cookie or storage (${[...left.cookies, ...left.storage].join(', ') || 'none'})`);
      ok(left.cookies.some((n) => /^_ga/.test(n)), `accept: Google Analytics cookies are set after Allow (positive control: ${left.cookies.join(', ') || 'none'})`);
      ok(consent.length > 0 && consent.every((c) => c[1] !== 'update') && JSON.stringify(consent[0]).includes('"ad_storage":"denied"') && JSON.stringify(consent[0]).includes('"ad_user_data":"denied"') && JSON.stringify(consent[0]).includes('"ad_personalization":"denied"'), `accept: Consent Mode defaults deny ad_storage, ad_user_data, ad_personalization, never updated (${JSON.stringify(consent).slice(0, 200)})`);
      ok(ads.length > 0 && ads.every((h) => !/rmkt|pagead\/viewthroughconversion/.test(h.url)), 'accept: no remarketing or view-through hit');
      ok(other.length === 0, `accept: no other off-origin request (${other.length})`);
      ok(!after.some((k) => /licdn|vercel|elevenlabs/.test(k)), `accept: no LinkedIn, Vercel or ElevenLabs (${after.join(', ')})`);
      ok(dl.length === 0, 'accept: no GA4 hit carries a query string in its page location');
      await context.close(); }

    // 4 withdraw (accept, then the withdraw control on /privacy). _gcl_au/_gcl_aw are SEEDED before withdrawing,
    //   because the candidate is cookieless for Ads and would otherwise give the clearing check nothing to clear.
    { const { context, page, rec } = await fresh(browser);
      await visit(page, PAGES[0]); await choose(page, 'accept');
      await visit(page, '/privacy');
      await context.addCookies(['_gcl_au', '_gcl_aw'].map((name) => ({ name, value: 'GCL.seed', url: ORIGIN })));
      await page.evaluate(() => { try { localStorage.setItem('_gcl_ls', 'seed'); } catch (e) { /* none */ } });
      const pre = await leftovers(context, page);
      const w = page.locator('[data-consent-withdraw]');
      const has = await w.count() > 0;
      if (has) { await Promise.all([page.waitForEvent('load', { timeout: 10000 }).catch(() => {}), w.first().click()]); await page.waitForTimeout(2500); }
      const post = await leftovers(context, page);
      rec.phase = 'after';
      for (const p of PAGES) await visit(page, p);
      const end = await leftovers(context, page);
      matrix.states.withdraw = { withdraw_control_found: has, before_withdraw: pre, right_after_withdraw: post, attempts_after_withdraw: countIn(rec, 'after'), kinds_after: kindsIn(rec, 'after'), after_five_pages: end };
      ok(has, 'withdraw: /privacy has a withdraw control');
      ok(pre.cookies.some((n) => /^_ga/.test(n)) && pre.cookies.includes('_gcl_au') && pre.storage.includes('_gcl_ls'), `withdraw: _ga*, _gcl_au and _gcl_ls present before withdrawing (${[...pre.cookies, ...pre.storage].join(', ') || 'none'})`);
      ok(post.cookies.length === 0 && post.storage.length === 0, `withdraw: _ga*, _gcl* and _gcl_ls cleared (${[...post.cookies, ...post.storage].join(', ') || 'none'})`);
      ok(countIn(rec, 'after') === 0, `withdraw: zero off-origin requests after withdrawing (${zeroLine(rec, 'after')})`);
      ok(end.cookies.length === 0 && end.storage.length === 0, `withdraw: nothing re-created over five more pages (${[...end.cookies, ...end.storage].join(', ') || 'none'})`);
      await context.close(); }

    // 5 GPC on the five pages: signal, and header, each ALSO with a stored accept that GPC must override
    for (const [name, opts] of [['gpc_signal', { gpcSignal: true }], ['gpc_header', { gpcHeader: true }], ['gpc_signal_over_stored_accept', { gpcSignal: true, seedAccept: 'storage' }], ['gpc_header_over_stored_accept', { gpcHeader: true, seedAccept: 'storage' }]]) {
      const { context, page, rec } = await fresh(browser, opts);
      let bar = 0;
      for (const p of PAGES) { await visit(page, p); bar += await barCount(page); }
      const state = await page.evaluate(() => (window.SiteConsent ? window.SiteConsent.state() : 'no-gate'));
      matrix.states[name] = { off_origin_attempts: countIn(rec), kinds: kindsIn(rec), bar_shown: bar > 0, gate_state: state };
      ok(countIn(rec) === 0, `${name}: zero off-origin requests (${zeroLine(rec)})`);
      ok(bar === 0, `${name}: no consent prompt`);
      ok(state === 'gpc', `${name}: the gate reports gpc (${state})`);
      await context.close();
    }

    // 5b Sec-GPC header + stored Accept (local storage, and separately the cookie) on EVERY HTML route, plus a
    //   dotted path: the proxy must set consent_gpc on each document response, and nothing may load.
    for (const seed of ['storage', 'cookie']) {
      const { context, page, rec } = await fresh(browser, { gpcHeader: true, seedAccept: seed });
      const perRoute = {}; const missing = [];
      for (const r of ROUTES) {
        await context.clearCookies({ name: 'consent_gpc' });
        const before = countIn(rec);
        const resp = await page.goto(ORIGIN + r, { waitUntil: 'load' }); await page.waitForTimeout(1200);
        const setCookie = ((await resp.headerValue('set-cookie')) || '');
        const state = await page.evaluate(() => (window.SiteConsent ? window.SiteConsent.state() : 'no-gate'));
        perRoute[r] = { status: resp.status(), set_consent_gpc: /consent_gpc=1/.test(setCookie), gate_state: state, attempts: countIn(rec) - before };
        if (!perRoute[r].set_consent_gpc || state !== 'gpc' || perRoute[r].attempts) missing.push(r);
      }
      matrix.states[`gpc_header_stored_accept_${seed}_all_routes`] = { routes: ROUTES.length, failing_routes: missing, per_route: perRoute, total_attempts: countIn(rec) };
      ok(missing.length === 0, `GPC header + stored Accept (${seed}) on all ${ROUTES.length} HTML routes: consent_gpc set, state gpc, 0 requests (failing: ${missing.join(', ') || 'none'})`);
      await context.close();
    }
    { // dotted path: the hiresabina F1 bypass class. Any path with a dot still gets the cookie from the proxy.
      const { context, page } = await fresh(browser, { gpcHeader: true });
      const resp = await page.goto(ORIGIN + '/zq-matrix.html', { waitUntil: 'load' });
      const sc = (await resp.headerValue('set-cookie')) || '';
      matrix.states.gpc_dotted_path = { path: '/zq-matrix.html', status: resp.status(), set_cookie: sc.slice(0, 120) };
      ok(/consent_gpc=1/.test(sc), `GPC header on a dotted path (/zq-matrix.html, status ${resp.status()}) still sets consent_gpc`);
      await context.close(); }

    // 6 noscript
    { const { context, page, rec } = await fresh(browser, { js: false });
      for (const p of PAGES) await visit(page, p);
      matrix.states.noscript = { off_origin_attempts: countIn(rec), kinds: kindsIn(rec) };
      ok(countIn(rec) === 0, `noscript: zero off-origin requests (${zeroLine(rec)})`);
      await context.close(); }

    // 7 the bar never covers content at page bottom (dominusfoundry review F1), 390x844 and 1280x720
    { const ui = {}; const mutant = {};
      if (SHOTS) mkdirSync(SHOTS, { recursive: true });
      for (const vp of [{ width: 390, height: 844 }, { width: 1280, height: 720 }]) {
        const { context, page } = await fresh(browser, { viewport: vp });
        for (const p of PAGES) {
          await page.goto(ORIGIN + p, { waitUntil: 'load' }); await barAppears(page);
          await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(600);
          const r = await page.evaluate(MEASURE_COVER);
          if (SHOTS) await page.screenshot({ path: `${SHOTS}/bar-${vp.width}${p.replace(/\//g, '_') || '_'}.png` });
          ui[`${vp.width}x${vp.height} ${p}`] = r;
          if (p === PAGES[0]) {
            // FIRING CONTROL: the round-1 placement (position:fixed, out of flow) must be detected as covering
            // footer content, or this check cannot fail.
            await page.addStyleTag({ content: '.cl-consent-bar{position:fixed!important;left:0;right:0;bottom:0}' });
            await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(400);
            mutant[`${vp.width}x${vp.height}`] = await page.evaluate(MEASURE_COVER);
          }
        }
        await context.close();
      }
      matrix.states.ui = ui; matrix.states.ui_fixed_bar_mutant = mutant;
      const mutantFired = Object.keys(mutant).length === 2 && Object.values(mutant).every((r) => r.bar && (r.covered || []).length > 0);
      ok(mutantFired, `ui control: a position:fixed bar IS detected covering content at both viewports (${Object.entries(mutant).map(([k, r]) => `${k}: ${r.bar ? (r.covered || []).length + ' covered' : 'no bar'}`).join('; ')})`);
      const bad = Object.entries(ui).filter(([, r]) => !r.bar || !r.at_max_scroll || (r.covered || []).length);
      ok(bad.length === 0, `ui: at page bottom the bar covers nothing, 390x844 and 1280x720, all ${PAGES.length} pages (${bad.map(([k, r]) => `${k}: ${r.bar ? (r.covered || []).slice(0, 2).join(' | ') || 'not at max scroll' : 'no bar'}`).join('; ') || 'clean'})`);
    }
    // 8 /privacy: content, and every Privacy link on the checked pages resolves to it
    { const { context, page } = await fresh(browser);
      const links = {};
      for (const p of PAGES) {
        await page.goto(ORIGIN + p, { waitUntil: 'load' });
        links[p] = await page.evaluate(() => [...document.querySelectorAll('a')].filter((a) => /privacy/i.test(a.textContent)).map((a) => `${a.textContent.trim()} -> ${new URL(a.href).pathname}`));
      }
      const bad = Object.entries(links).flatMap(([p, ls]) => ls.filter((l) => !/-> \/privacy$/.test(l)).map((l) => `${p}: ${l}`));
      const r = await page.goto(ORIGIN + '/privacy', { waitUntil: 'load' });
      const body = (await r.text()) || '';
      const text = body.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#x27;|&rsquo;/g, "'").replace(/&ldquo;|&rdquo;|&quot;/g, '"').replace(/\s+/g, ' ');
      const must = ['Google Analytics', 'cookieless Google Ads measurement', 'enhanced conversions', 'Global Privacy Control', 'sales@callordut.com', 'A phone number alone is never permission to text you', 'hosting provider', 'expires after 180 days', 'has no expiry'];
      const mustNot = ['By using our website', 'Opt-out Browser Add-on', 'Vercel', 'remembers your choice for 180 days', '_gcl_au', '\\bIris\\b', '\\$[0-9]'];
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
