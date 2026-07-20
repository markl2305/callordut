"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { type Field, type Item, type Section } from "./rules";
import { evaluateItemRemote, loadRuleMap, verifyPackageRemote, type ServerPackageVerdict } from "./engine";
import { validateItemFields } from "./validate";
import { auditPackage, needsReview, type PortfolioResult, type SavedPackage } from "./audit";
import s from "./page.module.css";

type ItemState = { status: "todo" | "done" | "na"; fields: Record<string, string | boolean>; na: string };

function initItems(sections: Section[]): Record<string, ItemState> {
  const out: Record<string, ItemState> = {};
  sections.forEach((sec) => sec.items.forEach((it) => { out[it.id] = { status: "todo", fields: {}, na: "" }; }));
  return out;
}

export default function ThemisBuilder() {
  const [sections, setSections] = useState<Section[]>([]);
  const [ruleMapVersion, setRuleMapVersion] = useState("Loading rule map…");
  const [active, setActive] = useState(0);
  const [items, setItems] = useState<Record<string, ItemState>>({});
  const [client, setClient] = useState("");
  const [lic, setLic] = useState("Retailer (dispensary)");
  const [premise, setPremise] = useState("");
  const [naOpen, setNaOpen] = useState<Record<string, boolean>>({});
  const [naText, setNaText] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [view, setView] = useState<"builder" | "pkg" | "audit">("builder");
  const [genDate, setGenDate] = useState("");
  const [portfolio, setPortfolio] = useState<PortfolioResult[]>([]);
  const [auditExpanded, setAuditExpanded] = useState<Record<string, boolean>>({});
  const [auditBusy, setAuditBusy] = useState(false);
  const [serverVerdict, setServerVerdict] = useState<ServerPackageVerdict>(null);
  const [genBusy, setGenBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadRuleMap().then((map) => {
      if (cancelled) return;
      setSections(map.sections);
      setRuleMapVersion(map.version);
      setItems((prev) => {
        const fresh = initItems(map.sections);
        for (const k in fresh) if (prev[k]) fresh[k] = prev[k];
        return fresh;
      });
    });
    return () => { cancelled = true; };
  }, []);

  const total = Object.keys(items).length;
  const done = Object.values(items).filter((i) => i.status !== "todo").length;
  const allDone = total > 0 && done === total;
  const sec: Section | undefined = sections[active];

  const setField = (id: string, k: string, v: string | boolean) =>
    setItems((st) => ({ ...st, [id]: { ...st[id], fields: { ...st[id].fields, [k]: v } } }));
  const setErr = (id: string, msg: string) => setErrors((e) => ({ ...e, [id]: msg }));
  const setStatus = (id: string, status: ItemState["status"], na?: string) => {
    setItems((st) => ({ ...st, [id]: { ...st[id], status, na: na ?? st[id].na } }));
    setErr(id, "");
  };

  async function markDone(it: Item) {
    const st = items[it.id];
    const err = validateItemFields(it, st.fields);
    if (err) return setErr(it.id, err);
    // Local check passed — the engine holds the actual verdict. If it's
    // unreachable the local pass stands (offline fallback).
    const verdict = await evaluateItemRemote(it.id, st.fields);
    if (verdict && !verdict.ok && verdict.violation) {
      return setErr(it.id, `${verdict.violation.violation_message} (${verdict.violation.citation})`);
    }
    setStatus(it.id, "done");
  }

  function markNA(id: string) {
    const t = (naText[id] || "").trim();
    if (t.length < 15) return setErr(id, "A substantive justification (15+ characters) is required to record N/A — this text appears in the package the reviewer reads.");
    setStatus(id, "na", t);
  }

  const resolvedSummary = (it: Item, st: ItemState) =>
    st.status === "na" ? "Marked N/A: " + st.na
      : it.fields.map((f) => (f.type === "check" ? "✓ " + f.label : `${f.label}: ${st.fields[f.k]}`)).join("\n");

  async function generatePackage() {
    setGenBusy(true);
    try {
      // The engine countersigns the package: every disposition is re-run
      // server-side against the current rule map. A refusal shows exactly
      // which items the statute knocks back. Engine unreachable → the
      // package still generates, marked "local validation only".
      const verdict = await verifyPackageRemote(lic, items);
      if (verdict && !verdict.ready) {
        const failed = verdict.items.filter((i) => !i.ok && i.violation);
        for (const f of failed) setErr(f.itemId, `${f.violation!.violation_message} (${f.violation!.citation})`);
        setItems((st) => {
          const next = { ...st };
          for (const f of failed) if (next[f.itemId]) next[f.itemId] = { ...next[f.itemId], status: "todo" };
          return next;
        });
        alert(`The engine refused to certify this package: ${failed.length} item(s) fail the current rule map. Each is reopened with the statutory reason shown.`);
        return;
      }
      setServerVerdict(verdict);
      const now = new Date();
      setGenDate(now.toLocaleDateString() + " " + now.toLocaleTimeString());
      setView("pkg");
      window.scrollTo({ top: 0 });
    } finally {
      setGenBusy(false);
    }
  }

  function exportJson() {
    const payload = {
      client, lic, premise, items,
      savedAt: new Date().toISOString(),
      ruleMap: ruleMapVersion,
      serverVerification: serverVerdict
        ? { verifiedAt: serverVerdict.verifiedAt, rulemapVersion: serverVerdict.rulemapVersion, counts: serverVerdict.counts }
        : null,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (client || "package").replace(/\s+/g, "-").toLowerCase() + "-nm-compliance.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function importJson() {
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = ".json";
    inp.onchange = () => {
      const file = inp.files?.[0];
      if (!file) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const p = JSON.parse(String(r.result));
          if (!p.items) throw new Error("bad file");
          setClient(p.client || "");
          setLic(p.lic || "Retailer (dispensary)");
          setPremise(p.premise || "");
          setItems((st) => {
            const next = { ...st };
            for (const k in next) if (p.items[k]) next[k] = p.items[k];
            return next;
          });
        } catch { alert("That file could not be read as a saved package."); }
      };
      r.readAsText(file);
    };
    inp.click();
  }

  function runAudit() {
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = ".json";
    inp.multiple = true;
    inp.onchange = () => {
      const files = Array.from(inp.files || []);
      if (!files.length) return;
      setAuditBusy(true);
      Promise.all(
        files.map(
          (file) =>
            new Promise<PortfolioResult | null>((resolve) => {
              const r = new FileReader();
              r.onload = () => {
                try {
                  const p = JSON.parse(String(r.result)) as SavedPackage;
                  if (!p.items) throw new Error("bad file");
                  resolve(auditPackage(sections, file.name, p));
                } catch {
                  resolve(null);
                }
              };
              r.onerror = () => resolve(null);
              r.readAsText(file);
            })
        )
      ).then((results) => {
        const good = results.filter((r): r is PortfolioResult => r !== null);
        if (good.length < files.length) {
          alert(`${files.length - good.length} of ${files.length} file(s) could not be read as a saved package and were skipped.`);
        }
        setPortfolio((prev) => [...good, ...prev]);
        setAuditBusy(false);
      });
    };
    inp.click();
  }

  function fieldRow(it: Item, f: Field) {
    const st = items[it.id];
    if (f.type === "check")
      return (
        <label className={s.checkrow} key={f.k}>
          <input type="checkbox" checked={!!st.fields[f.k]} onChange={(e) => setField(it.id, f.k, e.target.checked)} />
          <span>{f.label}</span>
        </label>
      );
    const hint = f.min !== undefined ? "STATUTE FLOOR: " + f.min : f.max !== undefined ? "STATUTE CEILING: " + f.max : "";
    return (
      <div className={s.field} key={f.k}>
        <label>{f.label}</label>
        {f.type === "textarea" ? (
          <textarea value={String(st.fields[f.k] ?? "")} onChange={(e) => setField(it.id, f.k, e.target.value)} />
        ) : (
          <input type={f.type} value={String(st.fields[f.k] ?? "")} onChange={(e) => setField(it.id, f.k, e.target.value)} />
        )}
        {hint && <span className={s.hint}>{hint}</span>}
      </div>
    );
  }

  const naCount = Object.values(items).filter((i) => i.status === "na").length;

  if (!sec) {
    return (
      <div className={s.topbar}>
        <span className={s.brand}>
          <Image src="/brand/logo-monogram.png" alt="" width={26} height={24} />
          Themis · CalLord
          <span className={s.ruleref}>{ruleMapVersion}</span>
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className={s.topbar}>
        <span className={s.brand}>
          <Image src="/brand/logo-monogram.png" alt="" width={26} height={24} />
          Themis · CalLord
          <span className={s.ruleref}>{ruleMapVersion}</span>
        </span>
        <span className={s.actions}>
          <button className={s.tbtn} onClick={() => setView(view === "audit" ? "builder" : "audit")} title="Re-check signed-off packages against the current rule map">
            {view === "audit" ? "← Back to builder" : "Backward compliance pass"}
          </button>
          <button className={s.tbtn} onClick={exportJson} title="Download progress as JSON">Export progress</button>
          <button className={s.tbtn} onClick={importJson} title="Load a saved JSON file">Load</button>
          <button className={s.tbtnPrimary} disabled={!allDone || genBusy} onClick={generatePackage}>
            {genBusy ? "Verifying…" : "Generate package"}
          </button>
        </span>
      </div>

      {view === "builder" && (
        <>
          <div className={s.app}>
            <aside className={s.aside}>
              <div className={s.clientBox}>
                <label htmlFor="clientName">Client / DBA</label>
                <input id="clientName" type="text" value={client} onChange={(e) => setClient(e.target.value)} placeholder="e.g. High Desert Provisions LLC" />
                <label htmlFor="licType">License type</label>
                <select id="licType" value={lic} onChange={(e) => setLic(e.target.value)}>
                  <option>Retailer (dispensary)</option>
                  <option>Producer (cultivation)</option>
                  <option>Manufacturer</option>
                  <option>Vertically integrated</option>
                  <option>Courier</option>
                </select>
                <label htmlFor="premiseAddr">Premises address</label>
                <input id="premiseAddr" type="text" value={premise} onChange={(e) => setPremise(e.target.value)} placeholder="Street, city, NM" />
              </div>
              <ul className={s.navlist}>
                {sections.map((secn: Section, i: number) => {
                  const d = secn.items.filter((it) => items[it.id]?.status !== "todo").length;
                  const full = d === secn.items.length;
                  const partial = d > 0 && !full;
                  return (
                    <li key={secn.id}>
                      <button className={i === active ? s.active : undefined} onClick={() => { setActive(i); window.scrollTo({ top: 0 }); }}>
                        <span className={`${s.navdot} ${full ? s.full : partial ? s.partial : ""}`}>{full ? "✓" : ""}</span>
                        <span className={s.navTitle}>{secn.title}</span>
                        <span className={s.navCount}>{d}/{secn.items.length}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>
            <main className={s.main}>
              <span className={s.secCite}>{sec.cite}</span>
              <h2>{sec.title}</h2>
              <p className={s.secDesc}>{sec.desc}</p>
              {sec.items.map((it) => {
                const st = items[it.id];
                if (!st) return null;
                const isDone = st.status === "done";
                const isNA = st.status === "na";
                return (
                  <div className={`${s.req} ${isDone ? s.done : ""} ${isNA ? s.na : ""}`} key={it.id}>
                    <div className={s.reqHead}>
                      <div className={s.reqStatus}>{isDone ? "✓" : isNA ? "N/A" : ""}</div>
                      <div className={s.reqMain}>
                        <span className={s.reqCite}>{it.cite}</span>
                        <span className={s.reqTitle}>{it.title}</span>
                        <p className={s.reqText}>{it.text}</p>
                      </div>
                    </div>
                    <div className={s.reqBody}>
                      {st.status === "todo" ? (
                        <>
                          {it.fields.map((f) => fieldRow(it, f))}
                          <div className={s.reqActions}>
                            <button className={s.rbtn} onClick={() => markDone(it)}>Mark compliant</button>
                            {it.allowNA && (
                              <button className={s.rbtnGhost} onClick={() => setNaOpen((o) => ({ ...o, [it.id]: !o[it.id] }))}>Not applicable…</button>
                            )}
                          </div>
                          {it.allowNA && naOpen[it.id] && (
                            <div className={s.naBox}>
                              <div className={s.field}>
                                <label>Justification required — why does this requirement not apply?</label>
                                <textarea value={naText[it.id] || ""} placeholder={it.naHint || ""} onChange={(e) => setNaText((t) => ({ ...t, [it.id]: e.target.value }))} />
                              </div>
                              <button className={s.rbtn} onClick={() => markNA(it.id)}>Record N/A with justification</button>
                            </div>
                          )}
                          {errors[it.id] && <p className={s.reqError}>⚠ {errors[it.id]}</p>}
                        </>
                      ) : (
                        <>
                          <p className={s.resolved}>{resolvedSummary(it, st)}</p>
                          <div className={s.reqActions}>
                            <button className={s.rbtnUndo} onClick={() => setStatus(it.id, "todo")}>Reopen</button>
                          </div>
                          <p className={s.guardNote}>LOCKED · VALIDATED AGAINST {it.cite.toUpperCase()}</p>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </main>
          </div>
          <div className={s.footbar}>
            <div className={s.progressWrap}>
              <div className={s.progressLabel}>
                <span>PACKAGE COMPLETION</span>
                <span>{done} / {total} REQUIREMENTS RESOLVED</span>
              </div>
              <div className={s.bar}><div style={{ width: `${total ? (done / total) * 100 : 0}%` }} /></div>
            </div>
            <span className={s.genHint}>
              {allDone ? "All requirements resolved. Package generation unlocked." : "Every requirement must be marked compliant or N/A (with justification) before generation unlocks."}
            </span>
          </div>
        </>
      )}

      {view === "audit" && (
        <div className={s.auditview}>
          <div className={s.auditIntro}>
            <h2>Backward compliance pass</h2>
            <p>
              Upload one or more packages exported from this builder — everything you&rsquo;ve previously signed off on.
              Themis re-runs every requirement against today&rsquo;s rule map ({ruleMapVersion}) and flags anything a
              statutory change has knocked out of compliance: a floor that moved, a requirement that&rsquo;s new, or one
              that&rsquo;s been renumbered out from under a saved answer.
            </p>
          </div>
          <div className={s.dropzone}>
            <p>Select saved package files (.json) — export them from the builder&rsquo;s &ldquo;Export progress&rdquo; button.</p>
            <button className={s.tbtnPrimary} onClick={runAudit} disabled={auditBusy} style={{ color: "var(--cl-ink)" }}>
              {auditBusy ? "Checking…" : "Upload packages to re-check"}
            </button>
          </div>

          {portfolio.length === 0 ? (
            <p className={s.auditEmpty}>No packages checked yet in this session. Nothing is stored — re-run this pass any time the rule map updates.</p>
          ) : (
            portfolio.map((r, idx) => {
              const key = `${r.fileName}-${idx}`;
              const open = !!auditExpanded[key];
              const flagged = r.entries.filter((e) => needsReview(e.kind));
              return (
                <div className={s.auditCard} key={key}>
                  <div className={s.auditHead} onClick={() => setAuditExpanded((o) => ({ ...o, [key]: !o[key] }))}>
                    <div>
                      <h3>{r.client}</h3>
                      <div className={s.auditMeta}>
                        {r.lic} · {r.premise} · signed off {r.savedAt !== "—" ? new Date(r.savedAt).toLocaleDateString() : "—"} against {r.ruleMapAtSave}
                      </div>
                    </div>
                    <span className={r.clean ? s.auditBadgeClean : s.auditBadgeReview}>
                      {r.clean ? "STILL COMPLIANT" : `${flagged.length} NEEDS REVIEW`}
                    </span>
                  </div>
                  {open && (
                    <div className={s.auditBody}>
                      {flagged.length === 0 ? (
                        <p className={s.auditEmpty}>Every resolved requirement still validates against the current rule map.</p>
                      ) : (
                        flagged.map((e) => (
                          <div className={s.auditRow} key={e.id}>
                            <span className={`${s.auditDot} ${s[e.kind]}`} />
                            <div>
                              <span className={s.auditKind}>{e.kind === "drift" ? "No longer compliant" : e.kind === "new" ? "New requirement" : e.kind === "removed" ? "Renumbered / removed" : "Left incomplete"}</span>
                              <b>{e.title}</b>
                              <span className={s.c}>{e.cite}</span>
                              <p>{e.message}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {view === "pkg" && (
        <div className={s.pkgview}>
          <div className={s.pkgBar}>
            <button className={s.pkgBack} onClick={() => setView("builder")}>← Back to builder</button>
            <button className={s.tbtnPrimary} onClick={() => window.print()}>Download PDF</button>
          </div>
          <div className={s.pkgCover}>
            <span className={s.pkgStamp}>SUBMISSION-READY</span>
            <span className={s.mono}>SECURITY COMPLIANCE PACKAGE · NEW MEXICO · 16.8.2 NMAC · THEMIS™ BY CALLORD</span>
            <h1>{client || "[Client name]"}</h1>
            <p className={s.pkgSub}>{lic} · {premise || "[Premises address]"}</p>
            <div className={s.pkgMeta}>
              <span>GENERATED<b>{genDate}</b></span>
              <span>REQUIREMENTS RESOLVED<b>{total} of {total}</b></span>
              <span>MARKED N/A (JUSTIFIED)<b>{naCount}</b></span>
              <span>RULE MAP VERSION<b>{ruleMapVersion}</b></span>
              <span>
                SERVER VERIFICATION
                <b>
                  {serverVerdict
                    ? `Engine-certified ${new Date(serverVerdict.verifiedAt).toLocaleString()} · ${serverVerdict.rulemapVersion}`
                    : "Local validation only — engine unreachable at generation"}
                </b>
              </span>
            </div>
          </div>
          {sections.map((secn) => (
            <div className={s.pkgSection} key={secn.id}>
              <h2>{secn.title}</h2>
              <span className={s.cite}>{secn.cite}</span>
              {secn.items.map((it) => {
                const st = items[it.id];
                if (!st) return null;
                return (
                  <div className={s.pkgItem} key={it.id}>
                    <span className={st.status === "na" ? s.pkgDotNa : s.pkgDot}>{st.status === "na" ? "—" : "✓"}</span>
                    <div>
                      <b>{it.title}</b>
                      <span className={s.c}>{it.cite}</span>
                      <p className={s.pkgDetail}>{resolvedSummary(it, st).replace("Marked N/A: ", "Not applicable — ")}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          <p className={s.disclaimer}>
            Prepared with Themis™, the CalLord compliance engine — a Dominus Foundry company. This package maps facility
            documentation to New Mexico Cannabis Control Division security regulations (16.8.2 NMAC) as of the rule-map
            version shown above. It is a compliance work product, not legal advice; final filings should be reviewed
            against the current New Mexico Register.
          </p>
        </div>
      )}
    </div>
  );
}
