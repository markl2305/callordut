import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  bullets: string[];
  href?: string;
  icon?: React.ReactNode;
  tone?: "dark" | "sand";
}

/* Service card in the site system: icon tile, display title, lead, dash list, link. */
export function ServiceCard({ title, description, bullets, href, icon }: ServiceCardProps) {
  const content = (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {icon ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              borderRadius: 14,
              color: "var(--teal)",
              background: "color-mix(in srgb, var(--teal) 10%, transparent)",
              border: "1px solid color-mix(in srgb, var(--teal) 30%, transparent)",
            }}
          >
            {icon}
          </div>
        ) : null}
        <h3 className="cl-cardx-title">{title}</h3>
      </div>
      <p className="cl-cardx-body">{description}</p>
      <ul className="cl-dash">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <span className="cl-textlink cl-cardx-link">
        Learn more
        <span aria-hidden style={{ marginLeft: 4 }}>→</span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="cl-cardx cl-cardx-a cl-reveal">
        {content}
      </Link>
    );
  }

  return <div className="cl-cardx cl-reveal">{content}</div>;
}
