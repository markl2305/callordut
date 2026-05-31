import type { Metadata } from "next";
import { Wrap, Mono, Roman, Btn, FONT } from "../components/heritage/primitives";
import { TrustStrip, ForgeBlock, ClosingCTA } from "../components/heritage/sections";

export const metadata: Metadata = {
  title: "Commercial Security Systems | CalLord Unified Technologies",
  description:
    "Cloud video surveillance, access control, intercom, and multi-site monitoring — designed as one system and monitored as one. Eagle Eye Networks and Brivo at the core.",
  alternates: { canonical: "/security" },
};

function SecHero() {
  return (
    <section>
      <Wrap style={{ padding: "64px clamp(24px, 5vw, 56px) 0" }}>
        <Mono style={{ color: "var(--h-teal)" }}>Discipline I · Security Systems</Mono>
        <h1 style={{ fontFamily: FONT.serif, fontSize: "clamp(46px, 6vw, 80px)", lineHeight: 1.0, fontWeight: 400, color: "var(--h-ink)", margin: "20px 0 0", letterSpacing: "-0.02em", maxWidth: 1000 }}>
          See everything. Control access.<br />
          <span style={{ fontStyle: "italic", color: "var(--h-teal)" }}>Sleep at night.</span>
        </h1>
        <p style={{ fontFamily: FONT.sans, fontSize: 19, lineHeight: 1.55, color: "var(--h-ink-soft)", marginTop: 26, maxWidth: 620 }}>
          Cloud video surveillance, access control, and intrusion detection — designed as one system,
          monitored as one, and scaled cleanly across every site you operate.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <Btn href="/contact">Request a security assessment →</Btn>
          <Btn href="/av-integration" variant="outline">See AV Integration</Btn>
        </div>
      </Wrap>
    </section>
  );
}

function SecCapabilities() {
  const caps = [
    { n: "I", t: "Cloud Video Surveillance", d: "Eagle Eye Networks cameras with cloud retention, smart search, and analytics. Footage you can pull from anywhere — no on-site DVR to fail.", specs: ["Eagle Eye Networks", "30d+ retention", "AI smart search", "Mobile + web"] },
    { n: "II", t: "Access Control", d: "Brivo credentials, schedules, and audit trails. Provision and revoke access from one dashboard across every door and site.", specs: ["Brivo Access", "Mobile credentials", "Door schedules", "Full audit log"] },
    { n: "III", t: "Intercom & Visitor", d: "Entry intercom, video calling, and visitor management that routes to the right people and logs every entry.", specs: ["Video intercom", "Visitor logging", "Call routing", "Remote unlock"] },
    { n: "IV", t: "Multi-Site Monitoring", d: "One pane of glass for an entire portfolio — alerts, health, and footage unified across buildings and cities.", specs: ["Single dashboard", "Health alerts", "Portfolio view", "24/7 monitoring"] },
  ];
  return (
    <section>
      <Wrap style={{ padding: "88px clamp(24px, 5vw, 56px)" }}>
        <Roman label="Capabilities" />
        <div className="cl-grid-2 cl-reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid var(--h-rule)" }}>
          {caps.map((c, i) => (
            <div key={c.n} className="h-hover-cream" style={{ padding: 36, borderRight: i % 2 === 0 ? "1px solid var(--h-rule)" : "none", borderBottom: i < 2 ? "1px solid var(--h-rule)" : "none" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <span style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 24, color: "var(--h-teal)" }}>{c.n}</span>
                <h3 style={{ fontFamily: FONT.serif, fontSize: 26, fontWeight: 400, color: "var(--h-ink)", margin: 0, letterSpacing: "-0.015em" }}>{c.t}</h3>
              </div>
              <p style={{ fontFamily: FONT.sans, fontSize: 15, color: "var(--h-ink-soft)", lineHeight: 1.6, margin: "16px 0 0" }}>{c.d}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
                {c.specs.map((s) => (
                  <span key={s} style={{ fontFamily: FONT.mono, fontSize: 10.5, color: "var(--h-ink)", border: "1px solid var(--h-rule)", padding: "5px 10px", letterSpacing: "0.04em" }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function SecOutcomes() {
  const items = [
    { k: "One system, not four", d: "Cameras, doors, intercom, and alarms designed together — so they actually talk to each other." },
    { k: "Cloud-native by default", d: "No aging recorder in a closet. Footage and credentials live in the cloud, backed up and reachable." },
    { k: "Built to scale", d: "Add a door, a camera, or an entire building without rearchitecting what you already trust." },
  ];
  return (
    <section style={{ background: "var(--h-cream)", borderTop: "1px solid var(--h-rule)" }}>
      <Wrap style={{ padding: "88px clamp(24px, 5vw, 56px)" }}>
        <Roman label="Why it matters" />
        <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 400, color: "var(--h-ink)", margin: "0 0 44px", letterSpacing: "-0.02em", maxWidth: 760 }}>
          Security that holds up when you actually need it.
        </h2>
        <div className="cl-grid-3 cl-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid var(--h-rule)" }}>
          {items.map((it, i) => (
            <div key={it.k} style={{ padding: "28px 28px 28px 0", borderRight: i < 2 ? "1px solid var(--h-rule)" : "none", paddingLeft: i > 0 ? 28 : 0 }}>
              <h4 style={{ fontFamily: FONT.serif, fontSize: 24, fontWeight: 400, color: "var(--h-ink)", margin: "0 0 12px", letterSpacing: "-0.01em" }}>{it.k}</h4>
              <p style={{ fontFamily: FONT.sans, fontSize: 14.5, color: "var(--h-ink-soft)", lineHeight: 1.6, margin: 0 }}>{it.d}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export default function SecurityPage() {
  return (
    <>
      <SecHero />
      <TrustStrip />
      <SecCapabilities />
      <SecOutcomes />
      <ForgeBlock variant="inner" />
      <ClosingCTA />
    </>
  );
}
