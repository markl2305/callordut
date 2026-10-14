/* ── Platform row ───────────────────────────────────────────── */
export function TrustStrip({ inline = false }: { inline?: boolean }) {
  const partners = ["Eagle Eye Networks", "Brivo", "Q-SYS", "Shure", "Crestron"];
  const row = (
    <div className="cl-platforms cl-reveal">
      <span className="lbl">Built on platforms you trust</span>
      {partners.map((p) => (
        <span key={p}>{p}</span>
      ))}
    </div>
  );
  if (inline) return row;
  return (
    <section>
      <div className="cl-shell">{row}</div>
    </section>
  );
}

/* ── Closing call to action used by every page ──────────────── */
export function ClosingCTA() {
  return (
    <section className="cl-chap cl-close" id="start" data-name="Start a project" aria-labelledby="h-close">
      <div className="cl-shell">
        <h2 className="cl-reveal" id="h-close">
          Tell us about one space. <span className="cl-t">We&apos;ll send back a plan.</span>
        </h2>
        <a className="cl-btn cl-btn-ink cl-reveal" href="/contact">
          Request a walkthrough →
        </a>
      </div>
    </section>
  );
}

/* ── Forge band — brand-separated, its own dark identity ─────── */
export function ForgeBlock({ variant = "home" }: { variant?: "home" | "inner" }) {
  const roman = ["i", "ii", "iii", "iv"];
  const rows = [
    { t: "Hyperion™ LiDAR scanning", s: "60s scan to estimate · iOS-native" },
    { t: "The Chest", s: "Estimating · docs · scheduling, one system" },
    { t: "Federated documentation", s: "One system of record, every project" },
    { t: "Charter access", s: "First-in-line for every tool that ships" },
  ];
  return (
    <section className="cl-chap cl-forge" id="forge" data-name="The Forge partnership" aria-labelledby="h-forge">
      <div className="cl-shell">
        <div className="cl-forge-mast">
          <b>FORGE™</b>
          <span>FIDE&nbsp;ET&nbsp;FAMILIA</span>
          <span>DOMINUS FOUNDRY · MMXXVI</span>
        </div>
        <p className="cl-secmark">
          <span className="s">§</span>OUR PARTNER PLATFORM
        </p>
        <div className="cl-forge-grid">
          <div>
            <h2 className="cl-reveal" id="h-forge">
              Built and run <span className="o">on Forge.</span>
            </h2>
            <p className="cl-reveal" style={{ marginTop: 22 }}>
              CalLord is an exclusive AV &amp; low-voltage partner of <em>Forge</em> —
              the operating system built for commercial installation contractors. Every project we design
              and document runs on the Forge platform.
            </p>
            <p className="cl-reveal">
              That means tools most integrators don&apos;t have at the table — LiDAR scan-to-estimate,
              federated documentation, and a chest of field software built for the trade. Faster design,
              tighter documentation, and a system of record that outlives the install.
            </p>
            <div className="acts cl-reveal">
              <a className="cl-btn cl-btn-ember" href="https://buildwithforge.app" target="_blank" rel="noopener noreferrer">
                Visit buildwithforge.app →
              </a>
              {variant === "home" && (
                <a className="cl-btn cl-btn-line" href="/partnerships/forge">
                  How it helps you →
                </a>
              )}
            </div>
          </div>
          <div>
            <div className="cl-tiles-h">
              <span>ON THE PLATFORM</span>
              <span>IV · AV</span>
            </div>
            <div className="cl-ftiles">
              {rows.map((r, i) => (
                <div key={r.t} className="cl-ftile cl-reveal" style={{ ["--i" as string]: i }}>
                  <i>{roman[i]}.</i>
                  <div>
                    <b>{r.t}</b>
                    <span>{r.s}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="cl-forge-foot">
          <span>
            FORGE™ · HYPERION™ · THE CHEST are marks of Dominus Foundry™ LLC. CalLord Unified Technologies
            is an independent integrator and exclusive AV · low-voltage partner of Forge.
          </span>
          <span className="r">SAME CRAFT · NEW TOOLS</span>
        </div>
      </div>
    </section>
  );
}
