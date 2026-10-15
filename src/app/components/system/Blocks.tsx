import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

/* Page-composition blocks for the site system (styles in system.css, "Page blocks").
   Server components; every block renders its copy as given — title + accent are
   rendered "title accent" so the sentence is unchanged, only the accent is styled. */

type Action = { label: ReactNode; href: string; external?: boolean };

function Btn({ a, variant }: { a: Action; variant: "teal" | "ghost" | "ink" }) {
  const cls = `cl-btn cl-btn-${variant}`;
  if (a.external)
    return (
      <a className={cls} href={a.href} target="_blank" rel="noopener noreferrer">
        {a.label}
      </a>
    );
  return (
    <Link className={cls} href={a.href}>
      {a.label}
    </Link>
  );
}

function Title({ title, accent }: { title: ReactNode; accent?: ReactNode }) {
  if (!accent) return <>{title}</>;
  return (
    <>
      {title} <span className="cl-t">{accent}</span>
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  primary = { label: "Request a walkthrough", href: "/contact" },
  secondary,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  accent?: ReactNode;
  lead?: ReactNode;
  primary?: Action | null;
  secondary?: Action;
  children?: ReactNode;
}) {
  return (
    <section className="cl-hero-band">
      <div className="cl-shell cl-pagehead">
        <p className="cl-eyebrow">{eyebrow}</p>
        <h1 className="cl-display">
          <Title title={title} accent={accent} />
        </h1>
        {lead ? <div className="cl-lead cl-hero-lead">{lead}</div> : null}
        {primary || secondary ? (
          <div className="cl-actions">
            {primary ? <Btn a={primary} variant="teal" /> : null}
            {secondary ? <Btn a={secondary} variant="ghost" /> : null}
          </div>
        ) : null}
        {children ? <div className="cl-hero-extra">{children}</div> : null}
      </div>
    </section>
  );
}

export function Section({
  id,
  mark,
  title,
  accent,
  lead,
  tone = "paper",
  split = false,
  children,
}: {
  id?: string;
  mark?: ReactNode;
  title?: ReactNode;
  accent?: ReactNode;
  lead?: ReactNode;
  tone?: "paper" | "cream";
  split?: boolean;
  children?: ReactNode;
}) {
  const head = (
    <div className="cl-sec-head">
      {title ? (
        <h2 className="cl-h2 cl-reveal">
          <Title title={title} accent={accent} />
        </h2>
      ) : null}
      {lead ? <div className="cl-lead cl-sec-lead cl-reveal">{lead}</div> : null}
    </div>
  );
  return (
    <section id={id} className={`cl-chap cl-sec cl-tone-${tone}`}>
      <div className="cl-shell">
        {mark ? (
          <p className="cl-secmark">
            <span className="s">§</span>
            {mark}
          </p>
        ) : null}
        {split ? (
          <div className="cl-split">
            <div className="cl-split-head">{head}</div>
            <div>{children}</div>
          </div>
        ) : (
          <>
            {title || lead ? head : null}
            {children ? <div className="cl-sec-body">{children}</div> : null}
          </>
        )}
      </div>
    </section>
  );
}

export type CardItem = {
  n?: ReactNode;
  k?: ReactNode;
  title?: ReactNode;
  body?: ReactNode;
  bullets?: ReactNode[];
  chips?: ReactNode[];
  href?: string;
  linkLabel?: ReactNode;
  media?: ReactNode;
  extra?: ReactNode;
};

export function Cards({ items, cols = 3, as = "h3" }: { items: CardItem[]; cols?: 2 | 3 | 4; as?: "h3" | "h2" }) {
  const H = as;
  return (
    <div className={`cl-cards cl-cols-${cols}`}>
      {items.map((it, i) => {
        const inner = (
          <>
            {it.media ? <div className="cl-cardx-media">{it.media}</div> : null}
            {it.n || it.k ? (
              <div className="cl-cardx-top">
                {it.n ? <span className="n">{it.n}</span> : null}
                {it.k ? <span className="k">{it.k}</span> : null}
              </div>
            ) : null}
            {it.title ? <H className="cl-cardx-title">{it.title}</H> : null}
            {it.body ? <div className="cl-cardx-body">{it.body}</div> : null}
            {it.bullets?.length ? (
              <ul className="cl-dash">
                {it.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            ) : null}
            {it.chips?.length ? (
              <div className="cl-chips">
                {it.chips.map((c, j) => (
                  <span key={j} className="cl-chip">
                    {c}
                  </span>
                ))}
              </div>
            ) : null}
            {it.extra}
            {it.href && it.linkLabel ? <span className="cl-textlink cl-cardx-link">{it.linkLabel}</span> : null}
          </>
        );
        const style = { ["--i" as string]: i % 4 } as CSSProperties;
        return it.href ? (
          <Link key={i} href={it.href} className="cl-cardx cl-cardx-a cl-reveal" style={style}>
            {inner}
          </Link>
        ) : (
          <div key={i} className="cl-cardx cl-reveal" style={style}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}

/* Ruled key/value rows, as on the AV Integration flagship spec. */
export function Rows({ items }: { items: { k: ReactNode; v: ReactNode }[] }) {
  return (
    <div className="cl-rows cl-reveal">
      {items.map((r, i) => (
        <div key={i} className="cl-row">
          <span className="k">{r.k}</span>
          <span className="v">{r.v}</span>
        </div>
      ))}
    </div>
  );
}

/* Ruled list with teal dashes; optional bold lead-in per item. */
export function Dashes({ items, cols = 1 }: { items: { lead?: ReactNode; text: ReactNode }[]; cols?: 1 | 2 }) {
  return (
    <ul className={`cl-dashes cl-cols-${cols} cl-reveal`}>
      {items.map((it, i) => (
        <li key={i}>
          {it.lead ? <strong>{it.lead}</strong> : null}
          {it.lead ? " " : null}
          {it.text}
        </li>
      ))}
    </ul>
  );
}

/* The walkthrough rail from the home page, drawn and lit (static). */
export function Sequence({ steps }: { steps: { n: ReactNode; title: ReactNode; body?: ReactNode }[] }) {
  return (
    <ol className="cl-seq">
      {steps.map((s, i) => (
        <li key={i} className="cl-seq-step cl-reveal" style={{ ["--i" as string]: i } as CSSProperties}>
          <span className="rn">{s.n}</span>
          <h3>{s.title}</h3>
          {s.body ? <div className="cl-seq-body">{s.body}</div> : null}
        </li>
      ))}
    </ol>
  );
}

export function Readout({ items }: { items: { v: ReactNode; k: ReactNode }[] }) {
  return (
    <div className="cl-readout cl-reveal">
      {items.map((s, i) => (
        <div key={i}>
          <b>{s.v}</b>
          <span>{s.k}</span>
        </div>
      ))}
    </div>
  );
}

export function Figure({
  src,
  alt,
  caption,
  priority,
  ratio = "16 / 8",
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  priority?: boolean;
  ratio?: string;
}) {
  return (
    <figure className="cl-figure cl-reveal">
      <div className="cl-figure-frame" style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 1232px) 100vw, 1200px" style={{ objectFit: "cover" }} />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/* Quiet link row: "Explore →" links set as pills. */
export function LinkRow({ links }: { links: { label: ReactNode; href: string }[] }) {
  return (
    <div className="cl-linkrow cl-reveal">
      {links.map((l, i) => (
        <Link key={i} href={l.href} className="cl-linkpill">
          {l.label}
        </Link>
      ))}
    </div>
  );
}

/* Close band: the page's own closing call to action in the home page's close style. */
export function CloseBand({
  title,
  accent,
  lead,
  primary,
  secondary,
  children,
}: {
  title: ReactNode;
  accent?: ReactNode;
  lead?: ReactNode;
  primary?: Action;
  secondary?: Action;
  children?: ReactNode;
}) {
  return (
    <section className="cl-chap cl-close cl-closeband">
      <div className="cl-shell">
        <h2 className="cl-reveal">
          <Title title={title} accent={accent} />
        </h2>
        {lead ? <div className="cl-lead cl-close-lead cl-reveal">{lead}</div> : null}
        {children}
        {primary || secondary ? (
          <div className="cl-actions cl-close-actions cl-reveal">
            {primary ? <Btn a={primary} variant="ink" /> : null}
            {secondary ? <Btn a={secondary} variant="ghost" /> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
