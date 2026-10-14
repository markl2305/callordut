"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Reveal once. Mounts in the layout, re-scans on each route. Anything already on
   screen shows at once; the rest fades up the first time it scrolls in, then is
   left alone. Hiding is CSS gated on [data-js] (system.css), so with JS off
   everything is visible; with reduced motion it is an opacity fade only. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".cl-reveal:not(.cl-in)"));
    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("cl-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("cl-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => (el.getBoundingClientRect().top < window.innerHeight ? el.classList.add("cl-in") : io.observe(el)));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
