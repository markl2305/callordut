import type { Metadata } from "next";
import { Wrap, Mono, FONT } from "../components/heritage/primitives";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | CalLord Unified Technologies",
  description:
    "Tell us about one space — a rough budget and how you use it today is enough. We come back with a simple plan and options, usually within the week.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const rows = [
    { k: "Phone", v: "(866) 657-2383", href: "tel:+18666572383" },
    { k: "Email", v: "sales@callordut.com", href: "mailto:sales@callordut.com" },
    { k: "Response time", v: "Under 1 hour, business hours" },
  ];
  return (
    <section>
      <Wrap style={{ padding: "64px clamp(24px, 5vw, 56px) 90px" }}>
        <div className="cl-grid-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div>
            <Mono style={{ color: "var(--h-teal)" }}>Contact</Mono>
            <h1 style={{ fontFamily: FONT.serif, fontSize: "clamp(46px, 5.6vw, 68px)", fontWeight: 400, color: "var(--h-ink)", margin: "20px 0 0", letterSpacing: "-0.025em", lineHeight: 1 }}>
              Tell us about<br />
              <span style={{ fontStyle: "italic", color: "var(--h-teal)" }}>one space.</span>
            </h1>
            <p style={{ fontFamily: FONT.sans, fontSize: 17, color: "var(--h-ink-soft)", lineHeight: 1.62, marginTop: 24, maxWidth: 440 }}>
              A rough budget and how you use the space today is enough. We come back with a simple plan
              and options — usually within the week.
            </p>
            <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 24 }}>
              {rows.map((r) => (
                <div key={r.k} style={{ borderTop: "1px solid var(--h-rule)", paddingTop: 16 }}>
                  <Mono>{r.k}</Mono>
                  {r.href ? (
                    <a href={r.href} style={{ display: "block", fontFamily: FONT.serif, fontSize: 24, color: "var(--h-ink)", marginTop: 6, textDecoration: "none" }}>
                      {r.v}
                    </a>
                  ) : (
                    <div style={{ fontFamily: FONT.serif, fontSize: 24, color: "var(--h-ink)", marginTop: 6 }}>{r.v}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </Wrap>
    </section>
  );
}
