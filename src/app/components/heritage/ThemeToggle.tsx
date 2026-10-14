"use client";

import { useEffect, useRef, useState } from "react";

type Choice = "system" | "light" | "dark";
const OPTS: { v: Choice; label: string }[] = [
  { v: "system", label: "Auto" },
  { v: "light", label: "Light" },
  { v: "dark", label: "Dark" },
];

const EVT = "cl-theme-change";

function apply(c: Choice) {
  const d = document.documentElement;
  const dark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  d.setAttribute("data-theme-choice", c);
  d.setAttribute("data-theme", c === "system" ? (dark ? "dark" : "light") : c);
}

/* Auto / Light / Dark segmented control. Every instance (nav, menu sheet) stays in sync. */
export function ThemeToggle() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const segRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const read = () => (document.documentElement.getAttribute("data-theme-choice") as Choice) || "system";
    const first = requestAnimationFrame(() => setChoice(read()));
    const onChange = () => setChoice(read());
    window.addEventListener(EVT, onChange);
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onSys = () => {
      if (read() === "system") apply("system");
    };
    mq?.addEventListener?.("change", onSys);
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener(EVT, onChange);
      mq?.removeEventListener?.("change", onSys);
    };
  }, []);

  useEffect(() => {
    const place = () => {
      const seg = segRef.current;
      const th = thumbRef.current;
      const on = seg?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
      if (seg && th && on && on.offsetWidth) {
        th.style.width = on.offsetWidth + "px";
        th.style.transform = `translateX(${on.offsetLeft - 3}px)`;
      }
    };
    place();
    const ro = typeof ResizeObserver !== "undefined" && segRef.current ? new ResizeObserver(place) : null;
    if (ro && segRef.current) ro.observe(segRef.current);
    document.fonts?.ready.then(place);
    return () => ro?.disconnect();
  }, [choice]);

  const pick = (c: Choice) => {
    try {
      if (c === "system") localStorage.removeItem("cl-theme");
      else localStorage.setItem("cl-theme", c);
    } catch {
      /* storage unavailable: the choice still applies to this page */
    }
    const go = () => apply(c);
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (doc.startViewTransition && !reduce) doc.startViewTransition(go);
    else go();
    setChoice(c);
    window.dispatchEvent(new Event(EVT));
  };

  return (
    <div className="cl-seg" role="group" aria-label="Appearance" ref={segRef}>
      <span className="thumb" aria-hidden="true" ref={thumbRef} style={choice ? undefined : { width: 0 }} />
      {OPTS.map((o) => (
        <button key={o.v} type="button" aria-pressed={choice === o.v} onClick={() => pick(o.v)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
