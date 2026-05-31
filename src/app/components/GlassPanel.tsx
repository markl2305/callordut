import { ReactNode } from "react";

interface GlassPanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function GlassPanel({ title, children, className = "" }: GlassPanelProps) {
  return (
    <div className={`border border-rule bg-cream p-8 ${className}`}>
      {title ? <h3 className="font-serif text-lg font-normal text-ink">{title}</h3> : null}
      <div className="mt-3 text-ink-soft">{children}</div>
    </div>
  );
}
