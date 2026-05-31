"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Mounts once in the layout. Observes every .cl-reveal element and adds .cl-in
   when it scrolls into view (fade/slide up). Re-scans on route change. Safety:
   reveals everything after 900ms in case nothing intersects. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".cl-reveal"));
    if (reduce) {
      els.forEach((el) => el.classList.add("cl-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cl-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => {
      if (!el.classList.contains("cl-in")) io.observe(el);
    });

    const safety = window.setTimeout(() => {
      els.forEach((el) => el.classList.add("cl-in"));
    }, 900);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [pathname]);

  return null;
}
