interface SectionHeaderProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

/* Section head in the site system: § mark, display h2, lead. */
export function SectionHeader({ kicker, title, subtitle, align = "left" }: SectionHeaderProps) {
  return (
    <div className="cl-sec-head" style={align === "center" ? { marginInline: "auto", textAlign: "center" } : undefined}>
      {kicker ? (
        <p className="cl-secmark">
          <span className="s">§</span>
          {kicker}
        </p>
      ) : null}
      <h2 className="cl-h2 cl-reveal">{title}</h2>
      {subtitle ? <p className="cl-lead cl-sec-lead cl-reveal">{subtitle}</p> : null}
    </div>
  );
}
