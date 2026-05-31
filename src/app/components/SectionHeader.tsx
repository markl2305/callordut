import { FadeIn } from "./MotionWrappers";

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeader({ kicker, title, subtitle, align = "left" }: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <FadeIn>
      <div className={`space-y-3 ${alignment}`}>
        {kicker ? (
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-teal">{kicker}</span>
        ) : null}
        <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">{title}</h2>
        {subtitle ? <p className="max-w-3xl text-base leading-relaxed text-muted">{subtitle}</p> : null}
      </div>
    </FadeIn>
  );
}
