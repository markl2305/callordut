import { ReactNode } from "react";

interface GlassPanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function GlassPanel({ title, children, className = "" }: GlassPanelProps) {
  return (
    <div className={`rounded-3xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm ${className}`}>
      {title ? <h3 className="text-lg font-semibold text-foreground">{title}</h3> : null}
      <div className="mt-3 text-slate-300">{children}</div>
    </div>
  );
}
