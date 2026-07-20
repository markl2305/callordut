import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CANNABIS_CONTENT_ENABLED } from "@/config/flags";
import s from "./page.module.css";

const metadataBase: Metadata = {
  title: "Cannabis Security & Compliance | CalLord Unified Technologies",
  description:
    "Security compliance packages for New Mexico cannabis establishments, built straight from 16.8.2 NMAC — every camera, lock, log, and procedure traced to the rule it satisfies.",
};
const metadataHidden: Metadata = {
  title: "Security Services | CalLord",
  description: "Compliance-ready security design and documentation for high-security commercial environments.",
};

const DOSSIER = [
  { n: "i.", t: "Limited-access areas", cite: "16.8.2.10 · intro, J" },
  { n: "ii.", t: "Security alarm system", cite: "16.8.2.10 · A–C" },
  { n: "iii.", t: "Video surveillance", cite: "16.8.2.10 · D–E" },
  { n: "iv.", t: "Recording & retention", cite: "16.8.2.10 · F–G" },
  { n: "v.", t: "Incident response", cite: "16.8.2.8 · M" },
  { n: "vi.", t: "Diagrams & amendments", cite: "16.8.2.24 / .32 / .38" },
];

const RECEIPTS = [
  { num: "1280×720", what: "Minimum camera resolution, every camera, permanently mounted and fixed.", src: "16.8.2.10(D) NMAC" },
  { num: "15 fps", what: "Minimum frame rate — continuous 24 hours, or motion-activated.", src: "16.8.2.10(F)(1) NMAC" },
  { num: "30 d / 12 mo", what: "Footage retention — thirty days standard, twelve months after any incident.", src: "16.8.2.10(F)(3) NMAC" },
  { num: "5 min", what: "Alarm alert window to designated employees — and law enforcement if necessary.", src: "16.8.2.10(A) NMAC" },
  { num: "24 hr", what: "Deadline to report any theft, robbery, break-in, or breach to the Division.", src: "16.8.2.8(M) NMAC" },
  { num: "20 ft", what: "Lit, camera-recordable radius required at every perimeter entry point.", src: "16.8.2.10(L) NMAC" },
];

const PACKAGES = [
  {
    rn: "i.", name: "License Application Security Plan", featured: false,
    desc: "The complete security exhibit for your application, built from the rule text.",
    items: ["Full facility security plan", "Surveillance & alarm specifications", "Required SOPs and training docs", "Citation index for the reviewer", "Revised free until accepted"],
    cta: "Scope my application",
  },
  {
    rn: "ii. — most requested", name: "Operational Compliance Package", featured: true,
    desc: "For licensed operators: close every gap between how you run and what the rule requires.",
    items: ["Scored gap assessment vs. the statute", "Remediation plan, prioritized by risk", "Updated SOPs, logs, and signage", "Deficiency-notice response support", "Staff walkthrough & handoff"],
    cta: "Get my gap score",
  },
  {
    rn: "iii.", name: "Audit-Ready Retainer", featured: false,
    desc: "Quarterly assurance that your posture matches the current rulebook.",
    items: ["Quarterly mock inspections", "Rule-change monitoring & alerts", "SOP and document upkeep", "New-hire security training", "Priority response on notices"],
    cta: "Talk retainers",
  },
];

const GUARDS = [
  { t: "Statutory floors, enforced in code", p: 'Enter a 20-day retention period or a 12-fps camera and Themis refuses the entry — citing the subsection and the floor you missed. A package below the statute cannot be produced. Not "shouldn’t." Cannot.' },
  { t: "Nothing skipped silently", p: "Every requirement resolves as compliant or not-applicable — and N/A demands a written justification that prints into the package the reviewer reads." },
  { t: "Generation gated at 100%", p: "The package will not generate until every requirement is resolved. An incomplete filing is not an output the system can express." },
  { t: "Every line carries its citation", p: "The finished package is a citation-mapped dossier — timestamped, versioned, and traceable to the exact rule each section satisfies." },
  { t: "Rule changes get checked backward, not just forward", p: "When the rule map updates, run a backward compliance pass and Themis re-checks every package you've already signed off on — flagging anything the amendment knocked out of compliance, not just what you file next." },
];

const STEPS = [
  { rn: "I", t: "Map the rulebook", p: "The regulation, decomposed requirement by requirement — the same list the reviewer works from." },
  { rn: "II", t: "Assess the gap", p: "Your facility and procedures, scored against every requirement. You see what’s missing and what it risks." },
  { rn: "III", t: "Build the package", p: "Plans, specs, SOPs, and training docs — assembled, cross-cited, submission-formatted in ten business days." },
  { rn: "IV", t: "Defend it", p: "The Division has questions, we answer them. Anything kicked back, we revise free until accepted." },
];

export function generateMetadata(): Metadata {
  if (!CANNABIS_CONTENT_ENABLED) {
    // TEMP: Cannabis content hidden for insurance audit
    return { ...metadataHidden, robots: { index: false, follow: false } };
  }

  return metadataBase;
}

export default function CannabisSecurityPage() {
  if (!CANNABIS_CONTENT_ENABLED) {
    // TEMP: Cannabis content hidden for insurance audit
    redirect("/solutions");
  }

  return (
    <div>
      {/* Site-wide <Header /> (rendered by the root layout) replaces the package's
          own nav/strip here — this page starts directly at the hero. */}
      <header className={s.hero} id="top">
        <div className={`${s.wrap} ${s.heroGrid}`}>
          <div>
            <span className={s.eyebrow}>§ I · Cannabis Security &amp; Compliance</span>
            <h1>The license lives or dies on the <em className={s.serifEm}>security plan.</em></h1>
            <p className={s.lede}>
              Every cannabis establishment in New Mexico stands or falls on 16.8.2 NMAC. We build security
              compliance packages straight from the statute — every camera, lock, log, and procedure traced
              to the rule it satisfies. <em className={s.serifEm}>The regulation is the spec.</em>
            </p>
            <div className={s.ctas}>
              <a className={s.btnSolid} href="#contact">Get your free gap score →</a>
              <a className={s.btnGhost} href="#themis">See the engine</a>
            </div>
            <span className={s.fig}>Fixed price · Ten business days · Revised free until accepted</span>
          </div>
          <div>
            <div className={s.dossier} aria-label="A compliance package assembling itself">
              <div className={s.dossierHead}>
                <b>Security Compliance Package</b>
                <span>REF 26-0114 · NM RETAILER</span>
              </div>
              <ul>
                {DOSSIER.map((row) => (
                  <li key={row.n}>
                    <span className={s.rn}>{row.n}</span>
                    <span className={s.item}><b>{row.t}</b><span>{row.cite}</span></span>
                    <span className={s.tick}>✓</span>
                  </li>
                ))}
              </ul>
              <div className={s.stampline}>SUBMISSION-READY · VALIDATED AGAINST THE STATUTE</div>
            </div>
            <p className={s.fig} style={{ marginTop: 12 }}>Fig. 01 · The package, assembling itself</p>
          </div>
        </div>
      </header>

      <div className={s.receipts} id="receipts">
        <div className={s.wrap}>
          <div className={s.receiptsHead}>
            <span className={s.eyebrow} style={{ margin: 0 }}>§ II</span>
            <h2>The Receipts.</h2>
            <p>Every number below is the statute — in the open, not buried in the notes.</p>
          </div>
          <div className={s.recGrid}>
            {RECEIPTS.map((r) => (
              <div className={s.rec} key={r.src}>
                <span className={s.num}>{r.num}</span>
                <p>{r.what}</p>
                <span className={s.src}>{r.src}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className={s.section} id="packages">
        <div className={s.wrap}>
          <div className={s.secHead}>
            <span className={s.eyebrow}>§ III · The Packages</span>
            <h2>Three ways in. <em className={s.serifEm}>One standard.</em></h2>
            <p>Applying, operating, or preparing to be inspected — the package meets you where the Division will.</p>
          </div>
          <div className={s.pkgGrid}>
            {PACKAGES.map((p) => (
              <div className={p.featured ? s.pkgFeat : s.pkg} key={p.name}>
                <span className={s.rn}>{p.rn}</span>
                <h3>{p.name}</h3>
                <p className={s.desc}>{p.desc}</p>
                <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <a className={s.pkgBtn} href="#contact">{p.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.themis} id="themis">
        <div className={s.wrap}>
          <div className={s.secHead}>
            <span className={s.eyebrow}>§ IV · Themis — the engine</span>
            <h2>The tool that <em className={s.serifEm}>refuses</em> to file a mistake.</h2>
            <p>
              Themis is our in-house compliance engine — the rulebook, decomposed into a requirement map with
              the statute&rsquo;s own floors wired in as validation. Try the builder yourself, or we&rsquo;ll
              show it to you live on the first call. Watching it reject a non-compliant input is the whole pitch.
            </p>
            <div style={{ marginTop: 20 }}>
              <a className={s.btnSolid} href="/tools/themis">Open the Themis builder →</a>
            </div>
          </div>
          <div className={s.themisGrid}>
            <ul className={s.guardList}>
              {GUARDS.map((g) => (
                <li key={g.t}><b>{g.t}</b><p>{g.p}</p></li>
              ))}
            </ul>
            <div className={s.defect}>
              <span className={s.figLabel}>Fig. 02 · Proof the map works</span>
              <p>While mapping the current rule, Themis flagged a cross-reference defect in the state&rsquo;s own published regulation:</p>
              <span className={s.monoLine}>
                16.8.2.10(F)(3) → &ldquo;Subsection N of 16.8.2.8&rdquo;<br />
                16.8.2.8(N) = license non-transferability.<br />
                The reporting rule now sits at 16.8.2.8(M).
              </span>
              <p>
                The 2024 amendment re-lettered 16.8.2.8 without updating the security rule&rsquo;s cross-reference.
                We read the rulebook closely enough to catch the state&rsquo;s own drafting error — that&rsquo;s the
                standard your filing gets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={s.method} id="method">
        <div className={s.wrap}>
          <div className={s.secHead}>
            <span className={s.eyebrow}>§ V · The Method</span>
            <h2>From walkthrough to <em className={s.serifEm}>accepted.</em></h2>
          </div>
          <div className={s.steps}>
            {STEPS.map((st) => (
              <div className={s.step} key={st.rn}>
                <span className={s.rn}>{st.rn}</span>
                <h3>{st.t}</h3>
                <p>{st.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.cta} id="contact">
        <div className={s.wrap}>
          <span className={s.eyebrow}>§ VI · The Ask</span>
          <h2>Find out what the reviewer will find. <em className={s.serifEm}>First.</em></h2>
          <p>
            The gap score is a free, twenty-minute teardown of your security posture against the state&rsquo;s
            requirement checklist. You keep the scorecard either way.
          </p>
          <div className={s.ctaRow}>
            <a className={s.btnSolid} href="mailto:sales@callordut.com">Book the gap score →</a>
            <a className={s.btnGhost} href="tel:+18666572383">(866) 657-2383</a>
          </div>
          <p className={`${s.fig} ${s.fine}`}>No hardware pitch · No obligation · Just the list</p>
        </div>
      </section>

      {/* Site-wide <Footer /> (rendered by the root layout) closes the page —
          the package's own standalone footer was dropped to avoid duplication. */}
    </div>
  );
}
