import { ReactNode } from "react";

interface GlassPanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

/* Panel in the site system: a card with an optional title. */
export function GlassPanel({ title, children, className = "" }: GlassPanelProps) {
  return (
    <div className={`cl-cardx cl-reveal ${className}`.trim()}>
      {title ? <h3 className="cl-cardx-title">{title}</h3> : null}
      <div className="cl-cardx-body">{children}</div>
    </div>
  );
}
