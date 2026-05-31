import { FONT } from "./primitives";

/* The CalLord monoline mark — teal C stroke + L overlaid, with a halo in the
   surface colour holding the gap where the L crosses the C. Themed via CSS vars. */

const pt = (cx: number, cy: number, r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
};
const f = (n: number) => Math.round(n * 100) / 100;

function crescentStroke(cx: number, cy: number, rad: number, gap: number) {
  const [x1, y1] = pt(cx, cy, rad, gap);
  const [x2, y2] = pt(cx, cy, rad, 360 - gap);
  return `M ${f(x1)} ${f(y1)} A ${rad} ${rad} 0 1 1 ${f(x2)} ${f(y2)}`;
}

export function BrandMark({ size = 42, haloBg }: { size?: number; haloBg?: string }) {
  const sw = 13;
  const cArc = crescentStroke(54, 60, 34, 36);
  const bg = haloBg || "var(--h-logo-bg)";
  return (
    <div style={{ width: size, height: size, flexShrink: 0 }}>
      <svg viewBox="0 0 120 120" width="100%" height="100%" role="img" aria-label="CalLord">
        <path d={cArc} fill="none" stroke="var(--h-logo-c)" strokeWidth={sw} strokeLinecap="round" />
        <path d="M70 26 V94 H98" fill="none" stroke={bg} strokeWidth={sw + 12} strokeLinecap="round" />
        <path
          d="M70 26 V94 H98"
          fill="none"
          stroke="var(--h-logo-l)"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function BrandLockup({ markSize = 42, nameSize = 21, subSize = 8.5 }: { markSize?: number; nameSize?: number; subSize?: number }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 13 }}>
      <BrandMark size={markSize} />
      <span style={{ lineHeight: 1 }}>
        <span
          style={{
            display: "block",
            fontFamily: FONT.display,
            fontWeight: 600,
            fontSize: nameSize,
            letterSpacing: "-0.01em",
            color: "var(--h-logo-name)",
          }}
        >
          CalLord
        </span>
        <span
          style={{
            display: "block",
            fontFamily: FONT.display,
            fontWeight: 400,
            fontSize: subSize,
            letterSpacing: "0.22em",
            color: "var(--h-logo-sub)",
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          Unified Technologies
        </span>
      </span>
    </span>
  );
}
