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
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal">{kicker}</span>
        ) : null}
        <h2 className="font-serif text-3xl font-normal tracking-tight text-ink lg:text-4xl">{title}</h2>
        {subtitle ? <p className="max-w-3xl text-base leading-relaxed text-ink-soft">{subtitle}</p> : null}
      </div>
    </FadeIn>
  );
}
