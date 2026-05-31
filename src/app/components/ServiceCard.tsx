import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  bullets: string[];
  href?: string;
  icon?: React.ReactNode;
  tone?: "dark" | "sand";
}

export function ServiceCard({ title, description, bullets, href, icon }: ServiceCardProps) {
  const content = (
    <div className="h-hover-cream flex h-full flex-col border border-rule bg-paper p-6">
      <div className="flex items-center gap-3">
        {icon ? <div className="border border-teal/30 bg-teal/10 p-3 text-teal">{icon}</div> : null}
        <h3 className="font-serif text-xl font-normal text-ink">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-ink">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span className="mt-1 font-mono text-xs text-teal" aria-hidden>—</span>
            <span className="leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 inline-flex items-center text-sm font-medium text-teal">
        Learn more
        <span aria-hidden className="ml-1">→</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal">
        {content}
      </Link>
    );
  }

  return content;
}
