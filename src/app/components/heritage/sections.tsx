/* ── Platform row ───────────────────────────────────────────── */
export function TrustStrip({ inline = false }: { inline?: boolean }) {
  const partners = ["Eagle Eye Networks", "Brivo", "Q-SYS", "Shure", "Crestron"];
  const row = (
    <div className="cl-platforms cl-reveal">
      <span className="lbl">Built on platforms you trust</span>
      {partners.map((p) => (
        <span key={p}>{p}</span>
      ))}
    </div>
  );
  if (inline) return row;
  return (
    <section>
      <div className="cl-shell">{row}</div>
    </section>
  );
}

/* ── Closing call to action used by every page ──────────────── */
export function ClosingCTA() {
  return (
    <section className="cl-chap cl-close" id="start" data-name="Start a project" aria-labelledby="h-close">
      <div className="cl-shell">
        <h2 className="cl-reveal" id="h-close">
          Tell us about one space. <span className="cl-t">We&apos;ll send back a plan.</span>
        </h2>
        <a className="cl-btn cl-btn-ink cl-reveal" href="/contact">
          Request a walkthrough →
        </a>
      </div>
    </section>
  );
}
