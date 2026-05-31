import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

/* Heritage primitives — server components, themed entirely via CSS vars
   so they render on the server and swap with [data-theme] without JS. */

export const FONT = {
  serif: "var(--font-serif)",
  sans: "var(--font-sans)",
  mono: "var(--font-mono)",
  display: "var(--font-display)",
  spectral: "var(--font-spectral)",
};

export function Wrap({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ maxWidth: 1340, margin: "0 auto", padding: "0 clamp(24px, 5vw, 56px)", ...style }}>
      {children}
    </div>
  );
}

export function Mono({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        fontFamily: FONT.mono,
        fontSize: 11,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--h-ink-faint)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function Roman({ n = "§", label }: { n?: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 28 }}>
      <span style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 22, color: "var(--h-teal)" }}>
        {n}
      </span>
      <span style={{ flex: 1, height: 1, background: "var(--h-rule)" }} />
      <Mono>{label}</Mono>
    </div>
  );
}

type BtnProps = {
  children: ReactNode;
  href: string;
  variant?: "solid" | "ink" | "outline";
  style?: CSSProperties;
  external?: boolean;
};

export function Btn({ children, href, variant = "solid", style, external }: BtnProps) {
  const base: CSSProperties = {
    fontFamily: FONT.sans,
    fontSize: 14,
    fontWeight: 500,
    padding: "14px 24px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    border: "none",
  };
  const v: CSSProperties =
    variant === "solid"
      ? { background: "var(--h-teal)", color: "var(--h-on-teal)" }
      : variant === "ink"
        ? { background: "var(--h-ink)", color: "var(--h-paper)" }
        : { background: "transparent", color: "var(--h-ink)", border: "1px solid var(--h-ink)" };
  const merged = { ...base, ...v, ...style };
  if (external) {
    return (
      <a className="h-btn" href={href} target="_blank" rel="noopener noreferrer" style={merged}>
        {children}
      </a>
    );
  }
  return (
    <Link className="h-btn" href={href} style={merged}>
      {children}
    </Link>
  );
}
