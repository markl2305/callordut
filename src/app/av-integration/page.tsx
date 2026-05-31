import type { Metadata } from "next";
import Image from "next/image";
import { Wrap, Mono, Roman, Btn, FONT } from "../components/heritage/primitives";
import { ForgeBlock, ClosingCTA } from "../components/heritage/sections";

export const metadata: Metadata = {
  title: "AV Integration & Smart Rooms | CalLord Unified Technologies",
  description:
    "Boardrooms, council chambers, conference rooms, and command spaces engineered so the meeting starts on time and the picture is always right. Q-SYS, Crestron, Shure — documented and supported.",
  alternates: { canonical: "/av-integration" },
};

function AvHero() {
  return (
    <section>
      <Wrap style={{ padding: "64px clamp(24px, 5vw, 56px) 0" }}>
        <Mono style={{ color: "var(--h-teal)" }}>Discipline II · AV Integration</Mono>
        <h1 style={{ fontFamily: FONT.serif, fontSize: "clamp(46px, 6vw, 80px)", lineHeight: 1.0, fontWeight: 400, color: "var(--h-ink)", margin: "20px 0 0", letterSpacing: "-0.02em", maxWidth: 1000 }}>
          Rooms where the technology<br />
          <span style={{ fontStyle: "italic", color: "var(--h-teal)" }}>simply disappears.</span>
        </h1>
        <p style={{ fontFamily: FONT.sans, fontSize: 19, lineHeight: 1.55, color: "var(--h-ink-soft)", marginTop: 26, maxWidth: 620 }}>
          Boardrooms, council chambers, conference rooms, and command spaces — engineered so the
          meeting starts on time, the picture is always right, and the system is supported for the long haul.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <Btn href="/contact">Plan a room →</Btn>
          <Btn href="/security" variant="outline">See Security Systems</Btn>
        </div>
      </Wrap>
      <Wrap style={{ padding: "40px clamp(24px, 5vw, 56px) 0" }}>
        <figure className="cl-reveal" style={{ margin: 0, border: "1px solid var(--h-rule)", background: "var(--h-cream)", padding: 10 }}>
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16 / 8" }}>
            <Image src="/heritage/nmfa-chamber.jpg" alt="New Mexico Finance Authority council chamber" fill priority sizes="(max-width: 1340px) 100vw, 1320px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, flexWrap: "wrap", gap: 8 }}>
            <Mono>New Mexico Finance Authority · council chamber</Mono>
            <Mono style={{ color: "var(--h-teal)" }}>Dual displays · ceiling-mount confidence monitors · dais audio · PTZ</Mono>
          </figcaption>
        </figure>
      </Wrap>
    </section>
  );
}

function AvCase() {
  const specs = [
    { k: "Displays", v: "Dual presentation + ceiling-mounted confidence monitors for the dais" },
    { k: "Audio", v: "Per-seat dais microphones with DSP — every member heard, no feedback" },
    { k: "Camera", v: "PTZ camera for broadcast and remote participation" },
    { k: "Acoustics", v: "Suspended acoustic clouds tuned for an open, hard-ceiling chamber" },
  ];
  return (
    <section>
      <Wrap style={{ padding: "88px clamp(24px, 5vw, 56px)" }}>
        <Roman label="Flagship · New Mexico Finance Authority" />
        <div className="cl-grid-split" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(30px, 3.6vw, 40px)", fontWeight: 400, color: "var(--h-ink)", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.08 }}>
              A government chamber the public can actually follow.
            </h2>
            <p style={{ fontFamily: FONT.sans, fontSize: 16, color: "var(--h-ink-soft)", lineHeight: 1.62, marginTop: 20 }}>
              The brief: a council space where board members, staff, and the public can all see and hear
              every word — in the room and on the stream. We engineered the displays, dais audio, camera,
              and acoustics as one coordinated system, then documented every component for the long term.
            </p>
          </div>
          <div style={{ border: "1px solid var(--h-rule)" }}>
            {specs.map((s, i) => (
              <div key={s.k} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 16, padding: "18px 24px", borderTop: i > 0 ? "1px solid var(--h-rule)" : "none" }}>
                <Mono style={{ color: "var(--h-teal)" }}>{s.k}</Mono>
                <span style={{ fontFamily: FONT.sans, fontSize: 15, color: "var(--h-ink)", lineHeight: 1.5 }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

function AvCapabilities() {
  const caps = [
    { n: "I", t: "Conference & Boardrooms", d: "One-touch join, automatic camera framing, and audio that picks up every seat.", specs: ["Teams / Zoom Rooms", "Auto-framing camera", "Ceiling / table mics"] },
    { n: "II", t: "Council & Command", d: "Multi-display chambers, dais microphones, voting-ready audio, and broadcast feeds.", specs: ["Dais audio + DSP", "PTZ broadcast", "Confidence monitors"] },
    { n: "III", t: "Digital Signage", d: "Wayfinding, lobby displays, and content scheduling that stays on without babysitting.", specs: ["Content scheduling", "Lobby & wayfinding", "Remote management"] },
    { n: "IV", t: "Programming & Support", d: "Q-SYS and Crestron configuration — commissioned, documented, and supported.", specs: ["Q-SYS · Crestron", "D-Tools docs", "Long-term support"] },
  ];
  return (
    <section style={{ background: "var(--h-cream)", borderTop: "1px solid var(--h-rule)" }}>
      <Wrap style={{ padding: "88px clamp(24px, 5vw, 56px)" }}>
        <Roman label="Capabilities" />
        <div className="cl-grid-2 cl-reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid var(--h-rule)", background: "var(--h-paper)" }}>
          {caps.map((c, i) => (
            <div key={c.n} style={{ padding: 36, borderRight: i % 2 === 0 ? "1px solid var(--h-rule)" : "none", borderBottom: i < 2 ? "1px solid var(--h-rule)" : "none" }}>
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

export default function AvPage() {
  return (
    <>
      <AvHero />
      <AvCase />
      <AvCapabilities />
      <ForgeBlock variant="inner" />
      <ClosingCTA />
    </>
  );
}
