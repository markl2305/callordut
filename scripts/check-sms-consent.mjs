#!/usr/bin/env node
/**
 * SMS consent check (cmp-callord-sms-1012). Runs against a BUILT app:
 *
 *   npm run build && node scripts/check-sms-consent.mjs [appDir] [port]
 *
 * It starts `next start` itself (RESEND_API_KEY removed from its env, so the
 * contact route throws at `new Resend()` before any network call and no mail
 * is sent), then checks:
 *   (a) the rendered pages carry no "phone number = opt-in" sentence, with a
 *       positive control that must fire on every page, and state the one rule;
 *   (b) the SMS checkbox on /contact renders unchecked;
 *   (c) a submission with the box unchecked records no SMS consent, and one
 *       with it checked records the full receipt, whose text matches what
 *       /contact renders.
 * Exit 0 = all pass, 1 = a check failed, 2 = the harness itself failed.
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const appDir = path.resolve(process.argv[2] || ".");
const port = Number(process.argv[3] || 4317);
const base = `http://127.0.0.1:${port}`;

const PAGES = ["/", "/contact", "/privacy", "/sms-terms", "/solutions"];
const OLD_SENTENCES = [
  "entering your mobile phone number on any form",
  "When you submit a form on callordut.com and provide your phone number",
  "You opt in by providing your phone number and submitting a form",
  // round 2: the form notice that contradicted the phone route (F2), the
  // unsupported verbal-record promise (F3), and the keyword path Mark ruled out
  "We text you only if you check the SMS box",
  "We record that agreement",
  "texting a keyword",
];
// round 2: the web and phone sentences of the rule, hardcoded so a build
// whose shared source says something else fails rather than agrees with itself
const RULE_WEB_TEXT =
  "On our website, the only way to agree to texts is the separate SMS box on our contact form, which starts unchecked. Leaving it unchecked authorizes no text messages.";
const RULE_PHONE_TEXT = "On a call, we may ask whether you want service texts about your request, and you can say no.";
const FORM_PAGES = ["/contact", "/solutions"];
// F1: caller-chosen versions that must never resolve to disclosure text
const BAD_VERSIONS = ["__proto__", "constructor", "toString", "hasOwnProperty", "valueOf", `made-up-${Date.now()}`];
const CONTROL = "CalLord Unified Technologies";
const RULE = "A phone number alone is never permission to text you.";

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
}

function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:])/g, "$1");
}
const norm = (s) => String(s).replace(/\s+/g, " ").replace(/\s+([.,;:])/g, "$1").trim();
const count = (hay, needle) => hay.split(needle).length - 1;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const env = { ...process.env, PORT: String(port), NODE_ENV: "production" };
delete env.RESEND_API_KEY;
delete env.CONTACT_RECIPIENT_EMAIL;

const nextBin = path.join(appDir, "node_modules", ".bin", "next");
const server = spawn(nextBin, ["start", "-p", String(port), "-H", "127.0.0.1"], { cwd: appDir, env });
let log = "";
server.stdout.on("data", (d) => (log += d));
server.stderr.on("data", (d) => (log += d));

async function main() {
  // wait for the server
  let up = false;
  for (let i = 0; i < 60 && !up; i++) {
    try {
      const r = await fetch(`${base}/`);
      up = r.ok;
    } catch {
      await sleep(500);
    }
  }
  if (!up) {
    console.error("harness: server did not come up\n" + log);
    return 2;
  }

  // (a) rendered pages
  const pages = {};
  for (const p of PAGES) {
    const r = await fetch(`${base}${p}`);
    const html = await r.text();
    pages[p] = { status: r.status, html, text: textOf(html) };
    check(`(a) ${p} status 200`, r.status === 200, `status=${r.status}`);
    const ctl = count(pages[p].text, CONTROL);
    check(`(a) ${p} control "${CONTROL}" > 0`, ctl > 0, `count=${ctl}`);
    for (const s of OLD_SENTENCES) {
      const n = count(pages[p].text.toLowerCase(), s.toLowerCase());
      check(`(a) ${p} old sentence "${s.slice(0, 40)}…" = 0`, n === 0, `count=${n}`);
    }
    const rule = count(pages[p].text, RULE);
    check(`(a) ${p} states the rule`, rule > 0, `count=${rule}`);
    const web = count(pages[p].text, RULE_WEB_TEXT);
    const phone = count(pages[p].text, RULE_PHONE_TEXT);
    check(`(a) ${p} states the web sentence of the rule`, web > 0, `count=${web}`);
    check(`(a) ${p} states the phone sentence of the rule`, phone > 0, `count=${phone}`);
  }
  // F2: each form's notice repeats the rule's web sentence, so the page shows
  // it twice (footer rule + notice) and nothing that contradicts it
  for (const p of FORM_PAGES) {
    const web = count(pages[p].text, RULE_WEB_TEXT);
    check(`(a) ${p} form notice uses the rule's web sentence`, web >= 2, `count=${web}`);
  }

  // (b) checkbox renders unchecked
  const boxes = pages["/contact"].html.match(/<input[^>]*name="smsConsent"[^>]*>/g) || [];
  check("(b) /contact renders an SMS checkbox", boxes.length > 0, `found=${boxes.length}`);
  const checkedBoxes = boxes.filter((b) => /\schecked(=|\s|\/?>)/.test(b));
  check("(b) every SMS checkbox renders unchecked", boxes.length > 0 && checkedBoxes.length === 0, boxes.join(" | "));

  // (c) submissions → receipts
  const run = `chk-${Date.now()}`;
  let n = 0;
  const submit = async (tag, extra) => {
    n += 1;
    const r = await fetch(`${base}/api/contact`, {
      method: "POST",
      // one address per request so the route's 5/min per-IP limit never refuses a probe
      headers: { "Content-Type": "application/json", "x-forwarded-for": `198.51.100.${n}` },
      body: JSON.stringify({
        name: "Consent Check",
        email: "consent-check@example.com",
        phone: "+15055550100",
        message: "automated consent check, not a lead",
        source: `${run}-${tag}`,
        ...extra,
      }),
    });
    return r.status;
  };
  // the version the candidate's form sends; absent on origin/main
  let version = "";
  let mod = null;
  try {
    mod = await import(pathToFileURL(path.join(appDir, "src/lib/sms-consent.js")).href);
    version = mod.SMS_CONSENT_VERSION || "";
  } catch (e) {
    console.log(`note: could not import sms-consent.js (${e.message})`);
  }
  const st1 = await submit("unchecked", { smsConsent: false, smsConsentVersion: version });
  const st2 = await submit("checked", { smsConsent: true, smsConsentVersion: version });
  const st3 = await submit("noversion", { smsConsent: true });
  const stN = [];
  for (const v of BAD_VERSIONS) stN.push(await submit(`badver-${v}`, { smsConsent: true, smsConsentVersion: v }));
  stN.push(await submit("emptyphone", { smsConsent: true, smsConsentVersion: version, phone: "" }));
  stN.push(await submit("blankphone", { smsConsent: true, smsConsentVersion: version, phone: "   " }));
  console.log(`note: route statuses ${[st1, st2, st3, ...stN].join("/")} (500 expected: no Resend key, so nothing is sent; 400 = refused before the receipt)`);
  await sleep(500);

  const records = {};
  for (const line of log.split("\n")) {
    const i = line.indexOf("sms_consent_record ");
    if (i < 0) continue;
    try {
      const rec = JSON.parse(line.slice(i + "sms_consent_record ".length));
      if (String(rec.source_form).startsWith(run)) records[rec.source_form.slice(run.length + 1)] = rec;
    } catch {}
  }

  const un = records.unchecked;
  check("(c) unchecked submission recorded a receipt", !!un, JSON.stringify(un));
  check(
    "(c) unchecked → no SMS consent",
    !!un && un.granted === false && Array.isArray(un.purposes) && un.purposes.length === 0 && un.affirmative_action === "none",
    un && `granted=${un.granted} purposes=${JSON.stringify(un.purposes)} action=${un.affirmative_action}`
  );

  const ck = records.checked;
  check("(c) checked submission recorded a receipt", !!ck, JSON.stringify(ck));
  const need = ["consent_id", "seller", "purposes", "affirmative_action", "phone", "recorded_at", "disclosure_version", "disclosure_text"];
  const missing = ck ? need.filter((k) => ck[k] === undefined || ck[k] === null || ck[k] === "") : need;
  check("(c) checked receipt has every field", missing.length === 0, `missing=${JSON.stringify(missing)}`);
  check(
    "(c) checked → granted, service only, checkbox action, seller, number",
    !!ck &&
      ck.granted === true &&
      JSON.stringify(ck.purposes) === '["service"]' &&
      ck.marketing === false &&
      ck.affirmative_action === "checkbox_checked" &&
      ck.seller === "CalLord Unified Technologies LLC" &&
      ck.phone === "+15055550100",
    ck && `granted=${ck.granted} purposes=${JSON.stringify(ck.purposes)} action=${ck.affirmative_action} seller=${ck.seller}`
  );
  const shown = ck?.disclosure_text ? norm(ck.disclosure_text) : "";
  check(
    "(c) receipt text == text rendered next to the /contact checkbox",
    shown !== "" && pages["/contact"].text.includes(shown),
    shown.slice(0, 80)
  );

  const nv = records.noversion;
  check("(c) checked but no disclosure version → not consent", !!nv && nv.granted === false, nv && `granted=${nv.granted} note=${nv.note}`);

  // F1 negatives through the real route: no grant, no purposes, no text, a note
  const denied = (r) =>
    !!r && r.granted === false && Array.isArray(r.purposes) && r.purposes.length === 0 && r.disclosure_text == null && typeof r.note === "string" && r.note !== "";
  const show = (r) => r && `granted=${r.granted} purposes=${JSON.stringify(r.purposes)} text=${JSON.stringify(r.disclosure_text)} note=${r.note}`;
  for (const v of BAD_VERSIONS) {
    const r = records[`badver-${v}`];
    check(`(c) API version "${v}" → no grant, no text, a note`, denied(r), r ? show(r) : "no receipt logged");
  }
  // empty-phone cases keep a known version, so their text may be present; the grant must not be
  for (const tag of ["emptyphone", "blankphone"]) {
    const r = records[tag];
    const ok = !!r && r.granted === false && Array.isArray(r.purposes) && r.purposes.length === 0 && typeof r.note === "string" && r.note !== "";
    check(`(c) API ${tag} → no grant, a note`, ok, r ? show(r) : "no receipt logged");
  }

  // F1 negatives against the module directly (no route, no rate limit)
  if (!mod?.buildConsentRecord) {
    check("(c) module buildConsentRecord importable", false, "not importable");
  } else {
    const req = { headers: new Headers() };
    for (const v of BAD_VERSIONS) {
      const r = mod.buildConsentRecord({ raw: true, version: v, phone: "+15055550100", sourceForm: "direct", req });
      check(`(c) module version "${v}" → no grant, no text, a note`, denied(r), show(r));
    }
    for (const ph of ["", "   "]) {
      const r = mod.buildConsentRecord({ raw: true, version, phone: ph, sourceForm: "direct", req });
      const ok = r.granted === false && r.purposes.length === 0 && typeof r.note === "string" && r.note !== "";
      check(`(c) module phone ${JSON.stringify(ph)} → no grant, a note`, ok, show(r));
    }
  }

  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed} of ${results.length} checks passed`);
  return failed ? 1 : 0;
}

let rc = 2;
try {
  rc = await main();
} catch (e) {
  console.error("harness error:", e);
  rc = 2;
} finally {
  server.kill("SIGTERM");
}
process.exit(rc);
