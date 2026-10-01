import Image from "next/image";
import { Wrap, Mono, Roman, Btn, FONT } from "./components/heritage/primitives";
import { TrustStrip, ForgeBlock, ClosingCTA } from "./components/heritage/sections";

function HomeHero() {
  return (
    <section style={{ position: "relative" }}>
      <Wrap style={{ padding: "64px clamp(24px, 5vw, 56px) 0" }}>
        <Mono style={{ color: "var(--h-teal)" }}>Commercial Security &amp; AV Integration</Mono>
        <h1 style={{ fontFamily: FONT.serif, fontSize: "clamp(48px, 6.4vw, 86px)", lineHeight: 1.0, fontWeight: 400, color: "var(--h-ink)", margin: "22px 0 0", letterSpacing: "-0.02em", maxWidth: 1100 }}>
          The systems a building runs on —<br />
          <span style={{ fontStyle: "italic", color: "var(--h-teal)" }}>designed to last.</span>
        </h1>
        <div className="cl-grid-split" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, marginTop: 30, alignItems: "end" }}>
          <p style={{ fontFamily: FONT.sans, fontSize: 18, lineHeight: 1.55, color: "var(--h-ink-soft)", margin: 0, maxWidth: 520 }}>
            CalLord designs, installs, and supports the security and audiovisual systems behind
            offices, government chambers, and the buildings people depend on. Two disciplines, one accountable partner.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <Btn href="/contact">Start a project →</Btn>
            <Btn href="/av-integration" variant="outline">Our two disciplines</Btn>
          </div>
        </div>
      </Wrap>

      <Wrap style={{ padding: "40px clamp(24px, 5vw, 56px) 0" }}>
        <figure className="cl-reveal" style={{ margin: 0, border: "1px solid var(--h-rule)", background: "var(--h-cream)", padding: 10 }}>
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16 / 8" }}>
            <Image
              src="/heritage/nmfa-chamber.jpg"
              alt="New Mexico Finance Authority council chamber — CalLord AV install"
              fill
              priority
              sizes="(max-width: 1340px) 100vw, 1320px"
              style={{ objectFit: "cover" }}
            />
            <div style={{ position: "absolute", left: 18, bottom: 16, display: "flex", alignItems: "center", gap: 10, background: "rgba(10,9,8,0.6)", backdropFilter: "blur(6px)", padding: "8px 14px" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--h-teal-bright)", boxShadow: "0 0 8px var(--h-teal-bright)" }} />
              <span style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.12em", color: "#F1EBE0" }}>FLAGSHIP INSTALL · NEW MEXICO FINANCE AUTHORITY</span>
            </div>
          </div>
          <figcaption style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, flexWrap: "wrap", gap: 8 }}>
            <Mono>Fig. 01 · Council chamber — dual presentation, ceiling displays, dais audio</Mono>
            <Mono style={{ color: "var(--h-teal)" }}>Q-SYS · Shure · PTZ camera</Mono>
          </figcaption>
        </figure>
      </Wrap>
    </section>
  );
}

function HomeStats() {
  const stats = [
    { v: "250+", k: "Rooms & sites delivered" },
    { v: "<1 hr", k: "Support response" },
    { v: "99.5%", k: "Uptime target" },
    { v: "24/7", k: "Monitoring" },
  ];
  return (
    <section>
      <Wrap style={{ padding: "64px clamp(24px, 5vw, 56px) 0" }}>
        <div className="cl-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid var(--h-rule)", borderBottom: "1px solid var(--h-rule)" }}>
          {stats.map((s, i) => (
            <div key={s.k} style={{ padding: "30px 26px", borderLeft: i > 0 ? "1px solid var(--h-rule)" : "none" }}>
              <div style={{ fontFamily: FONT.serif, fontSize: 46, fontWeight: 400, color: "var(--h-ink)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{s.v}</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 14, color: "var(--h-ink-soft)", marginTop: 6 }}>{s.k}</div>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function HomePillars() {
  const pillars = [
    {
      num: "I", tag: "Security Systems", href: "/security", title: "See everything. Control access. Sleep at night.",
      body: "Cloud video surveillance, access control, and intrusion detection — designed as one system and monitored as one. Eagle Eye and Brivo at the core, with a clean upgrade path as you grow.",
      points: ["Cloud video surveillance", "Access control & credentials", "Intercom & visitor management", "Multi-site, single pane of glass"],
    },
    {
      num: "II", tag: "AV Integration", href: "/av-integration", title: "Rooms where the technology simply disappears.",
      body: "Boardrooms, council chambers, conference rooms, and command spaces — engineered so the meeting starts on time and the picture is always right. Documented to D-Tools, supported for the long term.",
      points: ["Conference & boardrooms", "Audio, video & control", "Digital signage & displays", "Programming & commissioning"],
    },
  ];
  return (
    <section>
      <Wrap style={{ padding: "88px clamp(24px, 5vw, 56px)" }}>
        <Roman label="What we do" />
        <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(34px, 4vw, 46px)", fontWeight: 400, color: "var(--h-ink)", margin: "0 0 8px", letterSpacing: "-0.02em", maxWidth: 800 }}>
          Two disciplines. One standard of care.
        </h2>
        <div className="cl-grid-2 cl-reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, marginTop: 48, border: "1px solid var(--h-rule)" }}>
          {pillars.map((p, i) => (
            <a key={p.num} href={p.href} className="h-hover-cream" style={{ display: "block", textDecoration: "none", padding: 40, borderRight: i === 0 ? "1px solid var(--h-rule)" : "none", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <span style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 26, color: "var(--h-teal)" }}>{p.num}</span>
                <Mono style={{ color: "var(--h-teal)" }}>{p.tag}</Mono>
              </div>
              <h3 style={{ fontFamily: FONT.serif, fontSize: 32, fontWeight: 400, color: "var(--h-ink)", margin: "20px 0 16px", letterSpacing: "-0.015em", lineHeight: 1.1 }}>{p.title}</h3>
              <p style={{ fontFamily: FONT.sans, fontSize: 15.5, color: "var(--h-ink-soft)", lineHeight: 1.6, margin: 0 }}>{p.body}</p>
              <div style={{ marginTop: 26, borderTop: "1px solid var(--h-rule-soft)", paddingTop: 20, display: "grid", gap: 11 }}>
                {p.points.map((pt) => (
                  <div key={pt} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                    <span style={{ color: "var(--h-teal)", fontFamily: FONT.mono, fontSize: 12 }}>—</span>
                    <span style={{ fontFamily: FONT.sans, fontSize: 14.5, color: "var(--h-ink)" }}>{pt}</span>
                  </div>
                ))}
              </div>
              <span style={{ display: "inline-block", marginTop: 26, fontFamily: FONT.sans, fontSize: 14, color: "var(--h-teal)", borderBottom: "1px solid var(--h-teal)", paddingBottom: 2 }}>
                Explore {p.tag} →
              </span>
            </a>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function HomeApproach() {
  const steps = [
    { n: "I", t: "Discover", d: "We walk the space, map every room, and learn how your people actually use it." },
    { n: "II", t: "Design", d: "Signal flow, equipment, and access — specified in plain language and full drawings." },
    { n: "III", t: "Deliver", d: "Installed and commissioned by vetted crews, verified room by room before handoff." },
    { n: "IV", t: "Support", d: "One number to call. We stay on as the building changes and grows." },
  ];
  return (
    <section style={{ background: "var(--h-cream)", borderTop: "1px solid var(--h-rule)" }}>
      <Wrap style={{ padding: "88px clamp(24px, 5vw, 56px)" }}>
        <Roman label="How we work" />
        <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(34px, 4vw, 46px)", fontWeight: 400, color: "var(--h-ink)", margin: "0 0 48px", letterSpacing: "-0.02em" }}>
          From walkthrough to <span style={{ fontStyle: "italic", color: "var(--h-teal)" }}>&ldquo;it just works.&rdquo;</span>
        </h2>
        <div className="cl-grid-4 cl-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: "1px solid var(--h-rule)" }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ padding: "28px 24px", borderRight: i < 3 ? "1px solid var(--h-rule)" : "none", paddingLeft: i > 0 ? 24 : 0 }}>
              <span style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 34, color: "var(--h-teal)" }}>{s.n}</span>
              <h4 style={{ fontFamily: FONT.serif, fontSize: 26, fontWeight: 400, color: "var(--h-ink)", margin: "12px 0 12px", letterSpacing: "-0.01em" }}>{s.t}</h4>
              <p style={{ fontFamily: FONT.sans, fontSize: 14, color: "var(--h-ink-soft)", lineHeight: 1.55, margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <HomeStats />
      <HomePillars />
      <HomeApproach />
      <ForgeBlock variant="home" />
      <ClosingCTA />
    </>
  );
}
