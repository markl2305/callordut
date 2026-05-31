import type { Metadata } from "next";
import { Wrap, Mono, Roman, FONT } from "../../components/heritage/primitives";
import { ForgeBlock, ClosingCTA } from "../../components/heritage/sections";

export const metadata: Metadata = {
  title: "The Forge Partnership | CalLord Unified Technologies",
  description:
    "CalLord is an exclusive AV & low-voltage partner of Forge — the operating system for commercial installation contractors. Hyperion LiDAR scan-to-estimate, federated documentation, and a system of record that outlives the install.",
  alternates: { canonical: "/partnerships/forge" },
};

function ForgeHero() {
  return (
    <section>
      <Wrap style={{ padding: "64px clamp(24px, 5vw, 56px) 0" }}>
        <Mono style={{ color: "var(--h-teal)" }}>An exclusive partnership</Mono>
        <h1 style={{ fontFamily: FONT.serif, fontSize: "clamp(46px, 6vw, 80px)", lineHeight: 1.0, fontWeight: 400, color: "var(--h-ink)", margin: "20px 0 0", letterSpacing: "-0.02em", maxWidth: 1040 }}>
          The tools most integrators<br />
          <span style={{ fontStyle: "italic", color: "var(--h-teal)" }}>don&apos;t bring to the table.</span>
        </h1>
        <p style={{ fontFamily: FONT.sans, fontSize: 19, lineHeight: 1.55, color: "var(--h-ink-soft)", marginTop: 26, maxWidth: 640 }}>
          CalLord is an exclusive AV &amp; low-voltage partner of Forge — the operating system built for
          commercial installation contractors. For you, that means faster design, tighter documentation,
          and a record of your systems that outlives the install.
        </p>
      </Wrap>
    </section>
  );
}

function ForgeValue() {
  const items = [
    { n: "I", t: "Faster, more accurate design", d: "Hyperion™ LiDAR captures your space in a single 60-second scan. We design from real measurements, not guesses — so estimates are tighter and surprises are fewer." },
    { n: "II", t: "Documentation that lasts", d: "Every device, drawing, and decision lives in one federated system of record. When you expand or service a room three years from now, the history is right there." },
    { n: "III", t: "One coordinated team", d: "Estimating, scheduling, and field work run through the same platform — so the crew on site is working from the same truth as the people who designed it." },
  ];
  return (
    <section>
      <Wrap style={{ padding: "88px clamp(24px, 5vw, 56px)" }}>
        <Roman label="What it means for your project" />
        <div className="cl-grid-3 cl-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid var(--h-rule)" }}>
          {items.map((it, i) => (
            <div key={it.n} style={{ padding: "32px 28px 0 0", borderRight: i < 2 ? "1px solid var(--h-rule)" : "none", paddingLeft: i > 0 ? 28 : 0 }}>
              <span style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 30, color: "var(--h-teal)" }}>{it.n}</span>
              <h4 style={{ fontFamily: FONT.serif, fontSize: 25, fontWeight: 400, color: "var(--h-ink)", margin: "12px 0 12px", letterSpacing: "-0.01em", lineHeight: 1.15 }}>{it.t}</h4>
              <p style={{ fontFamily: FONT.sans, fontSize: 14.5, color: "var(--h-ink-soft)", lineHeight: 1.62, margin: 0 }}>{it.d}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export default function ForgePartnershipPage() {
  return (
    <>
      <ForgeHero />
      <ForgeValue />
      <ForgeBlock variant="inner" />
      <ClosingCTA />
    </>
  );
}
