import { ReactNode } from "react";

interface GlassPanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function GlassPanel({ title, children, className = "" }: GlassPanelProps) {
  const baseClasses = "rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-xl";
  const merged = [baseClasses, className].filter(Boolean).join(" ");

  return (
    <div className={merged}>
      {title ? <h3 className="text-lg font-semibold text-slate-50">{title}</h3> : null}
      <div className="mt-3 text-slate-200">{children}</div>
    </div>
  );
}
