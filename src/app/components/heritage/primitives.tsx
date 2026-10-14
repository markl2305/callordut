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
    <div style={{ maxWidth: 1232, margin: "0 auto", padding: "0 16px", ...style }}>
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
    <p className="cl-secmark">
      <span className="s">{n}</span>
      {label}
    </p>
  );
}

type BtnProps = {
  children: ReactNode;
  href: string;
  variant?: "solid" | "ink" | "outline";
  style?: CSSProperties;
  external?: boolean;
};

const VARIANT = { solid: "cl-btn-teal", ink: "cl-btn-ink", outline: "cl-btn-ghost" } as const;

/* Pill buttons from the site system (system.css). `style` is ignored for padding so
   every button keeps the same height. */
export function Btn({ children, href, variant = "solid", style, external }: BtnProps) {
  const cls = `cl-btn ${VARIANT[variant]}`;
  const rest: CSSProperties = { ...style };
  delete rest.padding;
  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer" style={rest}>
        {children}
      </a>
    );
  }
  return (
    <Link className={cls} href={href} style={rest}>
      {children}
    </Link>
  );
}
