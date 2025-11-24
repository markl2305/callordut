interface PillBadgeProps {
  children: React.ReactNode;
}

export function PillBadge({ children }: PillBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal ring-1 ring-brand-teal/30">
      {children}
    </span>
  );
}
