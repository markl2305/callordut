import { Wrap, Mono, Btn, FONT } from "./primitives";

/* ── Platform trust strip ───────────────────────────────────── */
export function TrustStrip() {
  const partners = ["Eagle Eye Networks", "Brivo", "Q-SYS", "Shure", "Crestron"];
  return (
    <section style={{ borderTop: "1px solid var(--h-rule)", borderBottom: "1px solid var(--h-rule)", background: "var(--h-cream)" }}>
      <Wrap style={{ padding: "26px clamp(24px, 5vw, 56px)", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
        <Mono>Built on platforms you trust</Mono>
        <div style={{ display: "flex", gap: 30, flexWrap: "wrap", flex: 1, justifyContent: "space-between" }}>
          {partners.map((p) => (
            <span key={p} style={{ fontFamily: FONT.serif, fontSize: 19, color: "var(--h-ink-soft)", letterSpacing: "0.01em" }}>
              {p}
            </span>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ── Closing CTA used by every page ─────────────────────────── */
export function ClosingCTA() {
  return (
    <section>
      <Wrap style={{ padding: "90px clamp(24px, 5vw, 56px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(36px, 4.4vw, 56px)", fontWeight: 400, color: "var(--h-ink)", margin: 0, letterSpacing: "-0.025em", lineHeight: 1, maxWidth: 720 }}>
            Tell us about one space.{" "}
            <span style={{ fontStyle: "italic", color: "var(--h-teal)" }}>We&apos;ll send back a plan.</span>
          </h2>
          <Btn href="/contact" variant="ink" style={{ padding: "18px 28px" }}>
            Request a walkthrough →
          </Btn>
        </div>
      </Wrap>
    </section>
  );
}

/* ── Forge co-brand block — brand-separated, its own dark identity ── */
const F = {
  black: "#0A0A0A",
  panel: "#131210",
  line: "rgba(237,230,218,0.15)",
  lineSoft: "rgba(237,230,218,0.08)",
  bone: "#EDE6DA",
  boneSoft: "rgba(237,230,218,0.66)",
  boneFaint: "rgba(237,230,218,0.4)",
  ember: "#E2632A",
  iron: "#9A9180",
  serif: FONT.spectral,
  mono: FONT.mono,
  sans: FONT.sans,
};

export function ForgeBlock({ variant = "home" }: { variant?: "home" | "inner" }) {
  const roman = ["i", "ii", "iii", "iv"];
  const rows = [
    { t: "Hyperion™ LiDAR scanning", s: "60s scan to estimate · iOS-native" },
    { t: "The Chest", s: "Estimating · docs · scheduling, one system" },
    { t: "Federated documentation", s: "One system of record, every project" },
    { t: "Charter access", s: "First-in-line for every tool that ships" },
  ];
  return (
    <section style={{ background: F.black, color: F.bone, position: "relative", overflow: "hidden", fontFamily: F.sans }}>
      <div style={{ position: "absolute", top: -120, right: -80, width: 460, height: 460, background: `radial-gradient(circle, ${F.ember}22 0%, transparent 65%)`, filter: "blur(30px)", pointerEvents: "none" }} />
      <Wrap style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px clamp(24px, 5vw, 56px)", borderBottom: `1px solid ${F.line}`, position: "relative", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: F.serif, fontSize: 18, letterSpacing: "0.34em", color: F.bone, fontWeight: 500 }}>
          FORGE<span style={{ fontSize: 10, verticalAlign: "super", color: F.ember }}>™</span>
        </span>
        <span style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.28em", color: F.ember }}>FIDE&nbsp;ET&nbsp;FAMILIA</span>
        <span style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.18em", color: F.boneFaint }}>DOMINUS FOUNDRY · MMXXVI</span>
      </Wrap>
      <Wrap style={{ padding: "84px clamp(24px, 5vw, 56px) 40px", position: "relative" }}>
        <div className="cl-grid-split" style={{ display: "grid", gridTemplateColumns: "1fr 0.82fr", gap: 64, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 22, color: F.ember }}>§</span>
              <span style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: "0.2em", color: F.iron }}>OUR PARTNER PLATFORM</span>
            </div>
            <h2 style={{ fontFamily: F.serif, fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 400, color: F.bone, margin: "20px 0 0", letterSpacing: "-0.02em", lineHeight: 1.0 }}>
              Built and run<br />on <span style={{ fontStyle: "italic", color: F.ember }}>Forge.</span>
            </h2>
            <p style={{ fontFamily: F.sans, fontSize: 17, color: F.boneSoft, lineHeight: 1.62, marginTop: 26, maxWidth: 520 }}>
              CalLord is an exclusive AV &amp; low-voltage partner of <em style={{ fontStyle: "normal", color: F.bone }}>Forge</em> —
              the operating system built for commercial installation contractors. Every project we design
              and document runs on the Forge platform.
            </p>
            <p style={{ fontFamily: F.sans, fontSize: 17, color: F.boneSoft, lineHeight: 1.62, marginTop: 18, maxWidth: 520 }}>
              That means tools most integrators don&apos;t have at the table — LiDAR scan-to-estimate,
              federated documentation, and a chest of field software built for the trade. Faster design,
              tighter documentation, and a system of record that outlives the install.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
              <a href="https://buildwithforge.app" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: F.mono, fontSize: 12.5, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: F.black, background: F.ember, textDecoration: "none", padding: "15px 24px" }}>
                Visit buildwithforge.app →
              </a>
              {variant === "home" && (
                <a href="/partnerships/forge" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: F.mono, fontSize: 12.5, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: F.bone, background: "transparent", border: `1px solid ${F.line}`, textDecoration: "none", padding: "15px 24px" }}>
                  How it helps you →
                </a>
              )}
            </div>
          </div>
          <div style={{ border: `1px solid ${F.line}`, background: F.panel, padding: 30 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontFamily: F.mono, fontSize: 10.5, letterSpacing: "0.2em", color: F.boneFaint }}>ON THE PLATFORM</span>
              <span style={{ fontFamily: F.mono, fontSize: 10.5, letterSpacing: "0.18em", color: F.ember }}>IV · AV</span>
            </div>
            {rows.map((r, i) => (
              <div key={r.t} style={{ display: "flex", gap: 16, padding: "18px 0", borderTop: `1px solid ${F.lineSoft}` }}>
                <span style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 20, color: F.ember, minWidth: 28 }}>{roman[i]}.</span>
                <div>
                  <div style={{ fontFamily: F.serif, fontSize: 19, color: F.bone, letterSpacing: "0.01em" }}>{r.t}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 11, color: F.boneFaint, marginTop: 4, letterSpacing: "0.04em" }}>{r.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 56, paddingTop: 20, borderTop: `1px solid ${F.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <span style={{ fontFamily: F.mono, fontSize: 10, lineHeight: 1.6, letterSpacing: "0.04em", color: F.boneFaint, maxWidth: 760 }}>
            FORGE™ · HYPERION™ · THE CHEST are marks of Dominus Foundry™ LLC. CalLord Unified Technologies
            is an independent integrator and exclusive AV · low-voltage partner of Forge.
          </span>
          <span style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.18em", color: F.ember }}>SAME CRAFT · NEW TOOLS</span>
        </div>
      </Wrap>
    </section>
  );
}
