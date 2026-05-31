interface PillBadgeProps {
  children: React.ReactNode;
}

export function PillBadge({ children }: PillBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 border border-teal/40 bg-teal/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-teal">
      {children}
    </span>
  );
}
