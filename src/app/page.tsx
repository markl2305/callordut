import Image from "next/image";
import { ForgeBlock, ClosingCTA, TrustStrip } from "./components/heritage/sections";
import { HomeEffects } from "./HomeEffects";

const HOTSPOTS = [
  { n: 1, left: "41.5%", top: "51.7%", label: "Dual presentation" },
  { n: 2, left: "50.4%", top: "34.5%", label: "Ceiling displays" },
  { n: 3, left: "60%", top: "65%", label: "Dais audio · Shure" },
  { n: 4, left: "70.4%", top: "43.9%", label: "PTZ camera" },
  { n: 5, left: "34.6%", top: "72%", label: "Q-SYS" },
];

const STATS = [
  { v: "250+", k: "Rooms & sites delivered" },
  { v: "<1 hr", k: "Support response" },
  { v: "99.5%", k: "Uptime target" },
  { v: "24/7", k: "Monitoring" },
];

const STEPS = [
  { n: "I", t: "Discover", d: "We walk the space, map every room, and learn how your people actually use it." },
  { n: "II", t: "Design", d: "Signal flow, equipment, and access — specified in plain language and full drawings." },
  { n: "III", t: "Deliver", d: "Installed and commissioned by vetted crews, verified room by room before handoff." },
  { n: "IV", t: "Support", d: "One number to call. We stay on as the building changes and grows." },
];

const d = (ms: number) => ({ ["--d" as string]: ms });
const i = (n: number) => ({ ["--i" as string]: n });

function Hero() {
  return (
    <section className="hero" id="top" data-photo-hero="" aria-labelledby="h1">
      <div className="hero-media" id="heroMedia">
        <Image
          src="/heritage/nmfa-chamber.jpg"
          alt="The New Mexico Finance Authority council chamber: two wall displays above the dais, three ceiling displays, dais microphones and a wall-mounted camera."
          fill
          priority
          sizes="100vw"
        />
        <svg className="sys" viewBox="0 0 1300 731" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="fovGrad" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0" stopColor="#3fe0cc" stopOpacity=".55" />
              <stop offset="1" stopColor="#3fe0cc" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* wall displays */}
          <rect className="scr-fill" style={d(0)} x="446" y="326" width="186" height="104" rx="3" />
          <rect className="scr" style={d(0)} x="446" y="326" width="186" height="104" rx="3" />
          <rect className="scr-fill" style={d(120)} x="669" y="329" width="181" height="102" rx="3" />
          <rect className="scr" style={d(120)} x="669" y="329" width="181" height="102" rx="3" />
          {/* ceiling displays */}
          <path className="scr" style={d(260)} d="M177 152 L371 199 L369 290 L178 262 Z" />
          <rect className="scr" style={d(340)} x="553" y="205" width="194" height="98" rx="3" />
          <path className="scr" style={d(420)} d="M858 202 L1059 183 L1057 286 L860 302 Z" />
          {/* dais microphones */}
          {[
            [439, 462, 500],
            [717, 460, 600],
            [792, 507, 700],
            [975, 470, 800],
            [1130, 482, 900],
          ].map(([cx, cy, ms]) => (
            <g key={cx}>
              <circle className="mic" style={d(ms)} cx={cx} cy={cy} r="3.5" />
              <circle className="ring" style={d(ms)} cx={cx} cy={cy} r="9" />
            </g>
          ))}
          {/* PTZ camera and its field of view */}
          <path className="fov" d="M915 321 L560 640 L1250 640 Z" />
          <circle className="cam" cx="915" cy="321" r="5" />
        </svg>
      </div>
      <div className="cl-shell hero-in">
        <p className="cl-eyebrow">Commercial Security &amp; AV Integration</p>
        <h1 className="cl-display" id="h1">
          The systems a building runs on — <span className="cl-t">designed to last.</span>
        </h1>
        <p className="cl-lead">
          CalLord designs, installs, and supports the security and audiovisual systems behind
          offices, government chambers, and the buildings people depend on. Two disciplines, one accountable partner.
        </p>
        <div className="cl-actions">
          <a className="cl-btn cl-btn-teal" href="/contact">
            Start a project <span aria-hidden="true">→</span>
          </a>
          <a className="cl-btn cl-btn-glass" href="#disciplines">
            Our two disciplines
          </a>
        </div>
        <div className="hero-cap">
          <span>
            <span className="dot" aria-hidden="true" />
            FLAGSHIP INSTALL · NEW MEXICO FINANCE AUTHORITY
          </span>
          <button className="replay" id="replay" type="button">
            Systems on ↻<span className="cl-sr"> — play the room&apos;s systems switching on again</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Flagship() {
  return (
    <section className="cl-chap" id="flagship" data-name="The flagship" aria-label="Flagship install">
      <div className="cl-shell">
        <figure className="fig-wrap" style={{ margin: 0 }}>
          <div className="fig cl-reveal" id="fig">
            <Image
              src="/heritage/nmfa-chamber.jpg"
              alt="Council chamber at the New Mexico Finance Authority, delivered by CalLord."
              width={2600}
              height={1463}
              sizes="(max-width: 1232px) 100vw, 1200px"
            />
            <span className="fig-flag">FLAGSHIP INSTALL · NEW MEXICO FINANCE AUTHORITY</span>
            {HOTSPOTS.map((h) => (
              <div key={h.n} className="hs" style={{ left: h.left, top: h.top }}>
                <button type="button" aria-expanded="false" aria-describedby={`t${h.n}`}>
                  {h.n}
                </button>
                <span className="tip" id={`t${h.n}`} role="tooltip">
                  <small>{String(h.n).padStart(2, "0")}</small>
                  {h.label}
                </span>
              </div>
            ))}
          </div>
          <figcaption className="fig-cap">
            <span>Fig. 01 · Council chamber — dual presentation, ceiling displays, dais audio</span>
            <span className="r">Q-SYS · Shure · PTZ camera</span>
          </figcaption>
        </figure>
        <ol className="fig-legend" aria-hidden="true">
          {HOTSPOTS.map((h) => (
            <li key={h.n}>
              <span>{h.n}</span>
              {h.label}
            </li>
          ))}
        </ol>

        <div style={{ marginTop: 48 }}>
          <TrustStrip inline />
        </div>
        <div className="readout cl-reveal">
          {STATS.map((s) => (
            <div key={s.k}>
              <b>{s.v}</b>
              <span>{s.k}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Disciplines() {
  return (
    <section className="cl-chap" id="disciplines" data-name="What we do" aria-labelledby="h-disc" style={{ paddingTop: 0 }}>
      <div className="cl-shell">
        <p className="cl-secmark">
          <span className="s">§</span>What we do
        </p>
        <div className="disc-head">
          <h2 className="cl-h2 cl-reveal" id="h-disc">
            Two disciplines. <span className="cl-t">One standard of care.</span>
          </h2>
          <div className="switch cl-reveal" role="tablist" aria-label="Disciplines" id="switch" data-v="sec">
            <span className="thumb" aria-hidden="true" />
            <button type="button" role="tab" id="tab-sec" aria-selected="true" aria-controls="p-sec" tabIndex={0}>
              Security
            </button>
            <button type="button" role="tab" id="tab-av" aria-selected="false" aria-controls="p-av" tabIndex={-1}>
              AV Integration
            </button>
          </div>
        </div>
        <div className="disc">
          <div>
            <div className="panel on" id="p-sec" role="tabpanel" aria-labelledby="tab-sec">
              <span className="num">I</span>
              <span className="k">Security Systems</span>
              <h3>See everything. Control access. Sleep at night.</h3>
              <p>
                Cloud video surveillance, access control, and intrusion detection — designed as one system and monitored as one. Eagle Eye and Brivo at the core, with a clean upgrade path as you grow.
              </p>
              <ul>
                <li>Cloud video surveillance</li>
                <li>Access control &amp; credentials</li>
                <li>Intercom &amp; visitor management</li>
                <li>Multi-site, single pane of glass</li>
              </ul>
              <a className="cl-textlink" href="/security">
                Explore Security Systems →
              </a>
            </div>
            <div className="panel" id="p-av" role="tabpanel" aria-labelledby="tab-av">
              <span className="num">II</span>
              <span className="k">AV Integration</span>
              <h3>Rooms where the technology simply disappears.</h3>
              <p>
                Boardrooms, council chambers, conference rooms, and command spaces — engineered so the meeting starts on time and the picture is always right. Documented to D-Tools, supported for the long term.
              </p>
              <ul>
                <li>Conference &amp; boardrooms</li>
                <li>Audio, video &amp; control</li>
                <li>Digital signage &amp; displays</li>
                <li>Programming &amp; commissioning</li>
              </ul>
              <a className="cl-textlink" href="/av-integration">
                Explore AV Integration →
              </a>
            </div>
          </div>
          <figure className="plan-wrap cl-reveal">
            <div className="plan" aria-hidden="true">
              <Image src="/room-executive-boardroom-topdown.png" alt="" width={1456} height={816} sizes="(max-width: 900px) 100vw, 640px" />
              <svg viewBox="0 0 900 504" preserveAspectRatio="xMidYMid slice">
                <g className="lay on" id="lay-sec">
                  <path className="cone draw" style={i(0)} d="M110 70 L300 150 L210 240 Z" />
                  <path className="cone draw" style={i(1)} d="M790 70 L600 150 L690 240 Z" />
                  <path className="cone draw" style={i(2)} d="M110 434 L300 354 L210 264 Z" />
                  <path className="cone draw" style={i(3)} d="M790 434 L600 354 L690 264 Z" />
                  <circle className="door-ring draw" style={i(4)} cx="447" cy="482" r="16" />
                  <circle className="door" cx="447" cy="482" r="5" />
                  <circle className="door-ring draw" style={i(5)} cx="30" cy="248" r="16" />
                  <circle className="door" cx="30" cy="248" r="5" />
                  <circle className="door-ring draw" style={i(6)} cx="872" cy="248" r="16" />
                  <circle className="door" cx="872" cy="248" r="5" />
                </g>
                <g className="lay" id="lay-av">
                  <rect className="scrn draw" style={i(0)} x="405" y="36" width="94" height="24" rx="3" />
                  <rect className="tbl draw" style={i(1)} x="196" y="198" width="502" height="120" rx="4" />
                  <circle className="spk draw" style={i(2)} cx="232" cy="106" r="58" />
                  <circle className="spk draw" style={i(3)} cx="660" cy="114" r="58" />
                  <circle className="spk draw" style={i(4)} cx="240" cy="412" r="58" />
                  <circle className="spk draw" style={i(5)} cx="660" cy="412" r="58" />
                  <rect className="scrn draw" style={i(6)} x="404" y="236" width="96" height="40" rx="3" />
                </g>
              </svg>
            </div>
            <figcaption className="plan-cap">Illustrative coverage</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function HowWeWork() {
  return (
    <section className="cl-chap work" id="how" data-name="How we work" aria-labelledby="h-how">
      <div className="cl-shell">
        <p className="cl-secmark">
          <span className="s">§</span>How we work
        </p>
        <div className="work-grid">
          <div className="work-head">
            <h2 className="cl-h2 cl-reveal" id="h-how">
              From walkthrough to <span className="cl-t">“it just works.”</span>
            </h2>
          </div>
          <div className="steps" id="steps">
            <span className="rail" aria-hidden="true" />
            {STEPS.map((s) => (
              <div key={s.n} className="step">
                <span className="rn">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="cl-home" data-index-named="">
      <Hero />
      <Flagship />
      <Disciplines />
      <HowWeWork />
      <ForgeBlock variant="home" />
      <ClosingCTA />
      <HomeEffects />
    </div>
  );
}
