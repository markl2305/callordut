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
];
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
  }

  // (b) checkbox renders unchecked
  const boxes = pages["/contact"].html.match(/<input[^>]*name="smsConsent"[^>]*>/g) || [];
  check("(b) /contact renders an SMS checkbox", boxes.length > 0, `found=${boxes.length}`);
  const checkedBoxes = boxes.filter((b) => /\schecked(=|\s|\/?>)/.test(b));
  check("(b) every SMS checkbox renders unchecked", boxes.length > 0 && checkedBoxes.length === 0, boxes.join(" | "));

  // (c) submissions → receipts
  const run = `chk-${Date.now()}`;
  const submit = async (tag, extra) => {
    const r = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
  try {
    const mod = await import(pathToFileURL(path.join(appDir, "src/lib/sms-consent.js")).href);
    version = mod.SMS_CONSENT_VERSION || "";
  } catch (e) {
    console.log(`note: could not import sms-consent.js (${e.message})`);
  }
  const st1 = await submit("unchecked", { smsConsent: false, smsConsentVersion: version });
  const st2 = await submit("checked", { smsConsent: true, smsConsentVersion: version });
  const st3 = await submit("noversion", { smsConsent: true });
  console.log(`note: route statuses ${st1}/${st2}/${st3} (500 expected: no Resend key, so nothing is sent)`);
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
