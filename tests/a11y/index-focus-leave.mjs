/**
 * B-03 (Codex review R2, B03-C3): the "Sections on this page" index must not stay open over a control that keyboard
 * focus has moved to. At phone width with the first-visit consent bar up, the reviewer's exact sequence was:
 *
 *   1. Tab to the header brand; press End.
 *   2. Tab to "Sections on this page"; Enter opens its index.
 *   3. Shift+Tab moves focus to the header Menu button; press Home.
 *
 * Before the fix the index stayed open and its fixed panel sat over three sides of the focused Menu ring.
 *
 *   A11Y_ORIGIN=http://localhost:4801 A11Y_OUT=index.json node tests/a11y/index-focus-leave.mjs
 *
 * Offline: a fresh context per theme at 390x844 (no consent stored, so the ask-first bar is shown), every off-origin
 * and every non-GET request is aborted and counted. Each theme must show: the bar present; Enter opened the index;
 * Shift+Tab landed on the Menu button; after Home, the page back at the top and 2.6 s more of settling, the index is closed (no .open, trigger
 * aria-expanded=false, panel not visible), Menu still has :focus-visible, and the topmost element at five points along
 * each edge of the Menu ring is the Menu button itself. Exit 1 on any failed assertion.
 */
import { writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const ORIGIN = new URL(process.env.A11Y_ORIGIN || 'http://localhost:4801').origin;
const OUT = process.env.A11Y_OUT || '';
const THEME_KEY = 'cl-theme';

const active = (page) =>
  page.evaluate(() => {
    const el = document.activeElement;
    return el ? { cls: el.className && typeof el.className === 'string' ? el.className : '', label: el.getAttribute('aria-label') || '' } : null;
  });

async function tabTo(page, sel, key = 'Tab', max = 80) {
  for (let i = 0; i < max; i++) {
    if (await page.evaluate((s) => !!document.activeElement?.matches(s), sel)) return i;
    await page.keyboard.press(key);
  }
  return -1;
}

// Smooth scrolling: wait until scrollY has held still for 400 ms (up to 6 s).
async function settled(page) {
  return page.evaluate(async () => {
    let last = -1, still = 0;
    for (let i = 0; i < 60 && still < 4; i++) {
      await new Promise((r) => setTimeout(r, 100));
      still = window.scrollY === last ? still + 1 : 0;
      last = window.scrollY;
    }
    return window.scrollY;
  });
}

async function run(browser, theme) {
  const ctx = await browser.newContext({ colorScheme: theme, viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(([k, v]) => { try { localStorage.setItem(k, v); } catch {} }, [THEME_KEY, theme]);
  const blocked = { offOrigin: 0, nonGet: 0 };
  await ctx.route('**/*', (r) => {
    const q = r.request();
    if (q.method() !== 'GET') { blocked.nonGet++; return r.abort(); }
    if (!q.url().startsWith('data:') && new URL(q.url()).origin !== ORIGIN) { blocked.offOrigin++; return r.abort(); }
    return r.continue();
  });
  const page = await ctx.newPage();
  const rec = { theme, fails: [] };
  const must = (ok, msg) => { if (!ok) rec.fails.push(msg); };
  try {
    await page.goto(ORIGIN + '/', { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(1500);
    rec.htmlTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme') || document.documentElement.className);
    rec.consentBar = await page.locator('[data-consent-bar]').count();
    must(rec.consentBar === 1, 'consent bar not shown');

    // 1. Tab to the header brand; End.
    rec.tabsToBrand = await tabTo(page, '.cl-brand');
    must(rec.tabsToBrand >= 0, 'never reached header brand');
    await page.keyboard.press('End');
    rec.scrollYAfterEnd = await settled(page);
    must(rec.scrollYAfterEnd > 0, 'End did not scroll the page');
    // 2. Tab to "Sections on this page"; Enter.
    rec.tabsToWhere = await tabTo(page, '.cl-where');
    must(rec.tabsToWhere >= 0, 'never reached Sections on this page');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    rec.openedByEnter = await page.evaluate(() => document.querySelector('.cl-index-pop')?.classList.contains('open') ?? false);
    must(rec.openedByEnter, 'Enter did not open the index');
    rec.focusAfterEnter = await active(page);
    // 3. Shift+Tab to Menu; Home.
    await page.keyboard.press('Shift+Tab');
    rec.focusAfterShiftTab = await active(page);
    must(rec.focusAfterShiftTab?.label === 'Menu', `Shift+Tab landed on ${JSON.stringify(rec.focusAfterShiftTab)}, not Menu`);
    await page.keyboard.press('Home');
    await settled(page);
    await page.waitForTimeout(1400);
    await page.waitForTimeout(1200);

    Object.assign(rec, await page.evaluate(() => {
      const pop = document.querySelector('.cl-index-pop');
      const where = document.querySelector('.cl-where');
      const menu = document.querySelector('.cl-menu-btn');
      const r = menu.getBoundingClientRect();
      const cs = getComputedStyle(menu);
      const off = parseFloat(cs.outlineOffset) || 0, w = parseFloat(cs.outlineWidth) || 0;
      const d = off + w / 2; // middle of the ring
      const pts = [];
      for (const f of [0.1, 0.3, 0.5, 0.7, 0.9]) {
        pts.push(['top', r.left + r.width * f, r.top - d], ['bottom', r.left + r.width * f, r.bottom + d]);
        pts.push(['left', r.left - d, r.top + r.height * f], ['right', r.right + d, r.top + r.height * f]);
      }
      const covered = pts.filter(([, x, y]) => {
        const top = document.elementFromPoint(x, y);
        return top && !menu.contains(top) && top.closest('.cl-index-pop');
      }).map(([e, x, y]) => `${e}@${x.toFixed(1)},${y.toFixed(1)}`);
      return {
        popOpen: pop?.classList.contains('open') ?? null,
        popVisibility: pop ? getComputedStyle(pop).visibility : null,
        whereExpanded: where?.getAttribute('aria-expanded') ?? null,
        menuFocused: document.activeElement === menu,
        menuFocusVisible: menu.matches(':focus-visible'),
        menuRect: { x: r.x, y: r.y, w: r.width, h: r.height },
        scrollY: window.scrollY,
        ringPointsCoveredByIndex: covered,
      };
    }));
    must(rec.scrollY === 0, `Home left the page at scrollY ${rec.scrollY}, not the top`);
    must(rec.popOpen === false, 'index still open after focus left it');
    must(rec.popVisibility === 'hidden', `index panel visibility ${rec.popVisibility}`);
    must(rec.whereExpanded === 'false', `trigger aria-expanded=${rec.whereExpanded}`);
    must(rec.menuFocused && rec.menuFocusVisible, 'Menu lost focus or :focus-visible');
    must(rec.ringPointsCoveredByIndex.length === 0, `index covers Menu ring at ${rec.ringPointsCoveredByIndex.join(' ')}`);
    rec.shot = `index-focus-leave-${theme}.png`;
    if (OUT) await page.screenshot({ path: OUT.replace(/[^/]*$/, rec.shot) });
  } catch (e) {
    rec.fails.push(String(e).slice(0, 300));
  }
  rec.blocked = blocked;
  must(blocked.offOrigin === 0 && blocked.nonGet === 0, `blocked requests ${JSON.stringify(blocked)}`);
  await ctx.close();
  return rec;
}

const browser = await chromium.launch();
const results = [];
try {
  for (const theme of ['light', 'dark']) results.push(await run(browser, theme));
} finally {
  await browser.close();
}
const failed = results.filter((r) => r.fails.length);
if (OUT) writeFileSync(OUT, JSON.stringify({ origin: ORIGIN, results }, null, 2));
for (const r of results) console.log(`${r.theme}: ${r.fails.length ? 'FAIL ' + r.fails.join('; ') : 'PASS'} (menu y=${r.menuRect?.y?.toFixed(2)}, covered ${r.ringPointsCoveredByIndex?.length ?? '?'}/20)`);
console.log(failed.length ? `FAIL ${failed.length}/${results.length}` : `PASS ${results.length}/${results.length}`);
process.exit(failed.length ? 1 : 0);
