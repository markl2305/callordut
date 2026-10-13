/**
 * Config-before-gate under streamed HTML (callordut V2 sync, Codex integration review F1, 2026-10-13). Adopted from
 * that review's stream-order.mjs probe and generalised to every prerendered root-layout route.
 *
 *   CONSENT_APP=. CONSENT_OUT=stream.json node tests/consent/stream-order.mjs        (after `npm run build`)
 *   CONSENT_STREAM_ROUTES=/,/privacy   a subset (default: every prerendered HTML route in .next)
 *   CONSENT_STREAM_DELAY_MS=1500       the delayed case's suffix delay (default 1500)
 *
 * For each route it serves THAT route's unchanged built HTML (.next/server/app/<route>.html) from a local server,
 * split immediately before `<script id="consent-config"`: the prefix at once, the suffix after the delay (or at once,
 * the control). /_next and /public assets are served from the build at once. Every off-origin request is answered in
 * the browser with an empty 204, so nothing leaves this machine (the Google loader included: the gate defines gtag
 * itself, which is all the "accept" case needs). No form is submitted.
 * Cases per route, each a fresh browser context:
 *   first-visit  (immediate and delayed): E1 every execution of the gate saw window.CONSENT_CONFIG; E2 after
 *                hydration the bar is visible with this site's wording; E3 pressing its Allow stores the choice under
 *                `callord-consent` in BOTH stores, state accept, gtag created.
 *   stored-reject / stored-accept (delayed): an existing `callord-consent` choice is honoured: no bar, that state.
 * Plus, per route, the byte order in the built HTML: the config block precedes every reference to /consent/consent.js,
 * and no <script src="/consent/consent.js"> tag (async or not) exists outside it.
 * Exit 1 on any failed expectation, 2 on a harness error.
 */
import http from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const APP = path.resolve(process.env.CONSENT_APP || '.');
const OUT = process.env.CONSENT_OUT || '';
const KEY = process.env.CONSENT_STORAGE_KEY || 'callord-consent';
const DELAY = Number(process.env.CONSENT_STREAM_DELAY_MS || 1500);
const WORDING = process.env.CONSENT_BAR_WORDING || 'cookieless Google Ads measurement';
const MARK = '<script id="consent-config"';
const HTML_DIR = path.join(APP, '.next/server/app');

// route -> built HTML file. Every *.html under .next/server/app except Next's own _not-found/_global-error.
function builtRoutes() {
  const out = {};
  const walk = (dir) => { for (const f of readdirSync(dir)) { const p = path.join(dir, f); if (statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) {
    const rel = '/' + path.relative(HTML_DIR, p).replace(/\.html$/, '');
    if (/^\/_/.test(rel)) continue;
    out[rel === '/index' ? '/' : rel] = p;
  } } };
  walk(HTML_DIR);
  return out;
}
const ALL = builtRoutes();
const ROUTES = (process.env.CONSENT_STREAM_ROUTES ? process.env.CONSENT_STREAM_ROUTES.split(',') : Object.keys(ALL).sort());

let failures = 0; const results = [];
const ok = (c, label) => { results.push({ ok: !!c, label }); console.log(`  ${c ? 'ok  ' : 'FAIL'} ${label}`); if (!c) failures += 1; };

// Byte order in the built HTML (the instrument the review used: the gate reference vs the config block).
function order(html) {
  const cfg = html.indexOf(MARK);
  const refs = []; let i = -1; while ((i = html.indexOf('/consent/consent.js', i + 1)) !== -1) refs.push(i);
  const tags = [...html.matchAll(/<script\b[^>]*\bsrc="\/consent\/consent\.js"[^>]*>/g)].map((m) => ({ at: m.index, tag: m[0] }));
  const cfgEnd = cfg === -1 ? -1 : html.indexOf('</script>', cfg);
  return { config_at: cfg, config_end: cfgEnd, gate_refs: refs, gate_script_tags: tags,
    config_first: cfg !== -1 && refs.length > 0 && refs.every((r) => r > cfg), no_tag_outside_config: tags.every((t) => t.at > cfg && t.at < cfgEnd) };
}

let current = { html: '', at: 0, delay: 0 };
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/__route') { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.write(current.html.slice(0, current.at)); setTimeout(() => res.end(current.html.slice(current.at)), current.delay); return; }
  const file = p.startsWith('/_next/') ? path.join(APP, '.next', p.slice(7)) : path.join(APP, 'public', p);
  if (existsSync(file) && statSync(file).isFile()) {
    res.writeHead(200, { 'Content-Type': p.endsWith('.js') ? 'text/javascript' : p.endsWith('.css') ? 'text/css' : p.endsWith('.woff2') ? 'font/woff2' : 'application/octet-stream' });
    res.end(readFileSync(file));
  } else { res.writeHead(404); res.end(); }
});

async function visit(browser, origin, { seed = null, accept = false }) {
  const ctx = await browser.newContext({ serviceWorkers: 'block' });
  await ctx.route('**/*', (r) => (new URL(r.request().url()).origin === origin ? r.continue() : r.fulfill({ status: 204, body: '' })));
  await ctx.addInitScript(([k, s]) => {
    const runs = []; window.__gateRuns = runs; let v;
    Object.defineProperty(window, 'SiteConsent', { configurable: true, get() { return v; }, set(x) { runs.push({ configPresent: !!window.CONSENT_CONFIG, readyState: document.readyState }); v = x; } });
    if (s) try { if (!localStorage.getItem(k)) localStorage.setItem(k, s); } catch (e) { /* none */ }
  }, [KEY, seed]);
  const page = await ctx.newPage(); const errors = [];
  page.on('pageerror', (e) => errors.push(String(e.message || e).slice(0, 160)));
  await page.goto(origin + '/__route', { waitUntil: 'load' });
  const barShown = await page.locator('[data-consent-bar]').first().waitFor({ state: 'visible', timeout: 6000 }).then(() => true).catch(() => false);
  await page.waitForTimeout(barShown ? 200 : 1500);
  const before = await page.evaluate(() => ({ runs: window.__gateRuns, bar: (document.querySelector('[data-consent-bar]') || {}).textContent || null, bars: document.querySelectorAll('[data-consent-bar]').length, state: window.SiteConsent ? window.SiteConsent.state() : 'no-gate', configKey: window.CONSENT_CONFIG && window.CONSENT_CONFIG.storageKey }));
  let after = null;
  if (accept && barShown) {
    await page.locator('[data-consent-bar] [data-consent="accept"]').first().click(); await page.waitForTimeout(400);
    after = await page.evaluate((k) => ({ storage: (() => { try { return localStorage.getItem(k); } catch (e) { return null; } })(), cookie: (document.cookie.match(new RegExp('(?:^|; )' + k + '=([^;]*)')) || [])[1] || null, state: window.SiteConsent.state(), gtag: typeof window.gtag === 'function' }), KEY);
  }
  await ctx.close();
  return { barShown, before, after, errors };
}

let browser;
const out = { app: APP, delay_ms: DELAY, routes: ROUTES.length, measured_at: new Date().toISOString(), rows: {} };
try {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const origin = 'http://127.0.0.1:' + server.address().port;
  browser = await chromium.launch();
  for (const route of ROUTES) {
    const file = ALL[route];
    if (!file) { ok(false, `${route}: built HTML exists`); continue; }
    const html = readFileSync(file, 'utf8'); const o = order(html);
    const row = out.rows[route] = { order: o };
    ok(o.config_at !== -1, `${route}: built HTML carries the config block`);
    ok(o.config_first, `${route}: the config block (byte ${o.config_at}) precedes every /consent/consent.js reference (${o.gate_refs.join(', ') || 'none'})`);
    ok(o.no_tag_outside_config, `${route}: no <script src="/consent/consent.js"> tag outside the config block (${o.gate_script_tags.map((t) => t.at + ' ' + t.tag).join(' | ') || 'none'})`);
    if (o.config_at === -1) continue;
    for (const [name, delay] of [['immediate', 0], ['delayed', DELAY]]) {
      current = { html, at: o.config_at, delay };
      const v = await visit(browser, origin, { accept: true });
      row[`first_visit_${name}`] = v;
      ok(v.before.runs.length > 0 && v.before.runs.every((x) => x.configPresent), `${route} ${name}: E1 every gate execution saw the config (${JSON.stringify(v.before.runs)})`);
      ok(v.barShown && v.before.bars === 1 && (v.before.bar || '').includes(WORDING), `${route} ${name}: E2 the site's bar is visible after hydration ("${(v.before.bar || 'none').slice(0, 60)}")`);
      ok(v.after && /^1\.accept\.\d+$/.test(v.after.storage || '') && /^1\.accept\.\d+$/.test(decodeURIComponent(v.after.cookie || '')) && v.after.state === 'accept' && v.after.gtag, `${route} ${name}: E3 Allow writes ${KEY} in both stores, state accept, gtag created (${JSON.stringify(v.after)})`);
    }
    for (const choice of ['reject', 'accept']) {
      current = { html, at: o.config_at, delay: DELAY };
      const v = await visit(browser, origin, { seed: `1.${choice}.${Date.now()}` });
      row[`stored_${choice}_delayed`] = v;
      ok(v.before.state === choice && v.before.bars === 0 && v.before.runs.every((x) => x.configPresent), `${route} delayed: an existing ${KEY} ${choice} is honoured, no bar (state ${v.before.state}, bars ${v.before.bars})`);
    }
  }
} catch (e) {
  ok(false, `harness error: ${String(e && e.message || e).split('\n')[0]}`); failures += 1;
} finally {
  if (browser) await browser.close();
  await new Promise((r) => server.close(r));
}
out.results = results; out.failures = failures;
if (OUT) writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`stream-order: ${results.length - failures} of ${results.length} checks passed (${ROUTES.length} routes, delay ${DELAY} ms)`);
process.exit(failures ? 1 : 0);
