"use client";

import { useEffect } from "react";

/* Home page behaviour, ported from the approved mock-up: the hero's systems-on
   overlay (played once on load, replayable), FIG. 01 hotspots, the Security / AV
   switch with its room-plan overlays, and the walkthrough rail. The markup is
   server-rendered and complete without this (both panels show with JS off). */
export function HomeEffects() {
  useEffect(() => {
    const $ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => c.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => Array.from(c.querySelectorAll<T>(s));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const off: Array<() => void> = [];
    const on = (t: EventTarget, ev: string, fn: EventListener, opt?: AddEventListenerOptions) => {
      t.addEventListener(ev, fn, opt);
      off.push(() => t.removeEventListener(ev, fn, opt));
    };

    /* Systems on, once */
    const hero = $("#top");
    const systemsOn = () => {
      if (!hero || reduce.matches) return;
      hero.classList.remove("on");
      void hero.offsetWidth;
      hero.classList.add("on");
    };
    const replay = $("#replay");
    if (replay) on(replay, "click", systemsOn);
    const img = $<HTMLImageElement>("#heroMedia img");
    if (img) {
      if (img.complete) systemsOn();
      else on(img, "load", systemsOn, { once: true });
    }

    /* Hotspots: tap toggles; Escape or a tap elsewhere closes */
    const hsb = $$<HTMLButtonElement>(".cl-home .hs button");
    const closeAll = () => hsb.forEach((x) => x.setAttribute("aria-expanded", "false"));
    hsb.forEach((b) =>
      on(b, "click", () => {
        const open = b.getAttribute("aria-expanded") !== "true";
        closeAll();
        b.setAttribute("aria-expanded", String(open));
      })
    );
    on(window, "keydown", (e) => {
      if ((e as KeyboardEvent).key === "Escape") closeAll();
    });
    on(window, "click", (e) => {
      if (!(e.target as Element).closest?.(".hs")) closeAll();
    });

    /* Disciplines switch (tabs; arrow keys, Home/End) */
    const sw = $("#switch");
    if (sw) {
      const tabs = $$<HTMLButtonElement>('[role="tab"]', sw);
      const sel = (v: string, focus?: boolean) => {
        sw.dataset.v = v;
        tabs.forEach((t) => {
          const isOn = t.id === "tab-" + v;
          t.setAttribute("aria-selected", String(isOn));
          t.tabIndex = isOn ? 0 : -1;
          if (isOn && focus) t.focus();
        });
        $$(".cl-home .panel").forEach((p) => p.classList.toggle("on", p.id === "p-" + v));
        $$(".cl-home .plan .lay").forEach((l) => l.classList.remove("on"));
        const lay = $("#lay-" + v);
        if (lay) {
          void lay.getBoundingClientRect();
          lay.classList.add("on");
        }
      };
      tabs.forEach((t) => on(t, "click", () => sel(t.id.slice(4))));
      on(sw, "keydown", (e) => {
        const k = (e as KeyboardEvent).key;
        if (k === "ArrowRight" || k === "ArrowLeft") {
          e.preventDefault();
          sel(sw.dataset.v === "sec" ? "av" : "sec", true);
        } else if (k === "Home" || k === "End") {
          e.preventDefault();
          sel(k === "Home" ? "sec" : "av", true);
        }
      });
    }

    /* Walkthrough rail: draws and lights each step as you scroll */
    const steps = $("#steps");
    const stepEls = steps ? $$(".step", steps) : [];
    let tick = false;
    const frame = () => {
      tick = false;
      if (!steps) return;
      const vh = window.innerHeight;
      const r = steps.getBoundingClientRect();
      const drawn = reduce.matches ? 1 : Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      steps.style.setProperty("--draw", drawn.toFixed(3));
      stepEls.forEach((s) => s.classList.toggle("lit", reduce.matches || s.getBoundingClientRect().top < vh * 0.6));
    };
    on(
      window,
      "scroll",
      () => {
        if (!tick) {
          tick = true;
          requestAnimationFrame(frame);
        }
      },
      { passive: true }
    );
    on(window, "resize", frame);
    document.documentElement.setAttribute("data-home-js", "");
    frame();

    return () => {
      off.forEach((f) => f());
      document.documentElement.removeAttribute("data-home-js");
    };
  }, []);

  return null;
}
