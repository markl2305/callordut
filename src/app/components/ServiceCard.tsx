import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  bullets: string[];
  href?: string;
  icon?: React.ReactNode;
  tone?: "dark" | "sand";
}

export function ServiceCard({ title, description, bullets, href, icon, tone = "dark" }: ServiceCardProps) {
  const baseClasses =
    "flex h-full flex-col rounded-2xl border p-5 ring-1 transition hover:-translate-y-1 hover:shadow-[0_25px_80px_-50px_rgba(39,154,146,0.8)]";
  const toneClasses =
    tone === "sand"
      ? "border-brand-sand/60 bg-brand-sand/20 text-foreground ring-brand-sand/40 hover:border-brand-teal/60 hover:ring-brand-teal/40"
      : "border-slate-600/60 bg-slate-900/70 text-slate-100 shadow-md shadow-black/40 hover:border-brand-teal/50";

  const content = (
    <div className={`${baseClasses} ${toneClasses}`}>
      <div className="flex items-center gap-3">
        {icon ? <div className="rounded-2xl border border-brand-teal/30 bg-brand-teal/10 p-3 text-brand-teal">{icon}</div> : null}
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-200">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-200">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
            <span className="leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 inline-flex items-center text-sm font-semibold text-brand-teal transition hover:text-brand-teal/80">
        Learn more
        <span aria-hidden className="ml-1">→</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal">
        {content}
      </Link>
    );
  }

  return content;
}
