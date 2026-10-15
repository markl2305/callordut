"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

type Item = { label: string; href: string };
type NavEntry = { label: string; href: string; items?: Item[] };

const NAV: NavEntry[] = [
  {
    label: "Security",
    href: "/security",
    items: [
      { label: "Security Systems Overview", href: "/security" },
      { label: "Multifamily Security", href: "/solutions/multifamily-security" },
      { label: "Financial Institutions", href: "/solutions/financial-institutions" },
    ],
  },
  {
    label: "AV Integration",
    href: "/av-integration",
    items: [
      { label: "AV Integration Overview", href: "/av-integration" },
      { label: "Smart Room Design", href: "/smart-room-design" },
      { label: "Room Types", href: "/room-types" },
      { label: "Project Management", href: "/services/project-management" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    items: [
      { label: "Senior Living", href: "/industries/senior-living" },
      { label: "Hospitality", href: "/industries/hospitality" },
      { label: "Offices", href: "/industries/offices" },
    ],
  },
  { label: "About", href: "/about" },
];

type Section = { id: string; name: string; el: HTMLElement };

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "section";

/* The sections a reader can jump between: the named sections on a page that opts in
   (data-index-named), otherwise the page's own h2 headings. */
function collectSections(): Section[] {
  const main = document.querySelector("main");
  if (!main) return [];
  if (main.querySelector("[data-index-named]")) {
    return Array.from(main.querySelectorAll<HTMLElement>("[data-name]")).map((el) => ({
      id: el.id,
      name: el.dataset.name || "",
      el,
    }));
  }
  const used = new Set<string>();
  return Array.from(main.querySelectorAll<HTMLElement>("h2"))
    .filter((h) => h.offsetParent !== null && (h.textContent || "").trim())
    .map((h) => {
      if (!h.id) {
        let id = slug(h.textContent || "");
        while (used.has(id) || document.getElementById(id)) id += "-x";
        h.id = id;
      }
      used.add(h.id);
      return { id: h.id, name: (h.textContent || "").replace(/\s+/g, " ").trim(), el: h };
    });
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [over, setOver] = useState(isHome);
  const [sections, setSections] = useState<Section[]>([]);
  const [cur, setCur] = useState(0);
  const [popOpen, setPopOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const whereRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDialogElement>(null);
  const sheetInRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname?.startsWith(href + "/"));

  /* Re-read the page's sections on each route. */
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setPopOpen(false);
      setSections(collectSections());
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  /* Nav material, progress, where-am-I. */
  useEffect(() => {
    let tick = false;
    const frame = () => {
      tick = false;
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const hero = document.querySelector<HTMLElement>("main [data-photo-hero]");
      const navH = navRef.current?.offsetHeight || 64;
      setOver(!!hero && y < hero.offsetTop + hero.offsetHeight - navH - 10);
      progRef.current?.style.setProperty("--prog", h > 0 ? (y / h).toFixed(4) : "0");
      const vh = window.innerHeight;
      let k = 0;
      sections.forEach((s, i) => {
        if (s.el.getBoundingClientRect().top <= vh * 0.35) k = i;
      });
      setCur(k);
    };
    const onScroll = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(frame);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    frame();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections, pathname]);

  const closePop = useCallback((focus?: boolean) => {
    setPopOpen(false);
    if (focus) whereRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!popOpen) return;
    popRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePop(true);
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!popRef.current?.contains(t) && !whereRef.current?.contains(t)) closePop();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [popOpen, closePop]);

  const openSheet = () => {
    const d = sheetRef.current;
    if (!d) return;
    d.showModal();
    requestAnimationFrame(() => sheetInRef.current?.classList.add("in"));
  };
  const closeSheet = useCallback(() => {
    const d = sheetRef.current;
    if (!d?.open) return;
    sheetInRef.current?.classList.remove("in");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => d.close(), reduce ? 0 : 200);
  }, []);

  useEffect(() => {
    closeSheet();
  }, [pathname, closeSheet]);

  const showWhere = sections.length >= 2;
  const curName = sections[cur]?.name || "";

  return (
    <>
      <a className="cl-skip" href="#main">
        Skip to content
      </a>
      <header ref={navRef} className={`cl-nav${over ? " cl-over" : ""}`}>
        <div className="cl-shell cl-nav-in">
          <Link className="cl-brand" href="/" aria-label="CalLord Unified Technologies, home">
            <span className="mk">
              <Image src="/heritage/cl-mark-black.png" alt="" width={30} height={30} />
            </span>
            <span>
              <b>CalLord</b>
              <small>Unified Technologies</small>
            </span>
          </Link>
          <nav aria-label="Primary" style={{ marginLeft: "auto" }} className="cl-links-wrap">
            <ul className="cl-links">
              {NAV.map((entry) => (
                <li key={entry.label}>
                  <Link href={entry.href} aria-current={isActive(entry.href) ? "page" : undefined}>
                    {entry.label}
                  </Link>
                  {entry.items && (
                    <div className="cl-drop">
                      <div className="cl-drop-in">
                        {entry.items.map((it) => (
                          <Link key={it.href} href={it.href}>
                            {it.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="cl-nav-right">
            {showWhere && (
              <button
                ref={whereRef}
                type="button"
                className="cl-where"
                aria-expanded={popOpen}
                aria-controls="cl-index-pop"
                aria-label={`Sections on this page. Current: ${curName}`}
                onClick={() => setPopOpen((o) => !o)}
              >
                <span className="n" aria-hidden="true">
                  {pad(cur + 1)}
                </span>
                <span aria-hidden="true">{curName}</span>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M2.5 4.5 6 8l3.5-3.5" />
                </svg>
              </button>
            )}
            <ThemeToggle />
            <Link className="cl-btn cl-btn-teal" href="/contact">
              Request a walkthrough
            </Link>
            <button
              ref={menuBtnRef}
              type="button"
              className="cl-menu-btn"
              aria-haspopup="dialog"
              aria-label="Menu"
              onClick={openSheet}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M2 6h14M2 12h14" />
              </svg>
            </button>
          </div>
        </div>
        <div className="cl-progress" ref={progRef} aria-hidden="true" />
      </header>

      {showWhere && (
        <nav
          ref={popRef}
          id="cl-index-pop"
          className={`cl-index-pop${popOpen ? " open" : ""}`}
          aria-label="Sections on this page"
          aria-hidden={!popOpen}
        >
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={i === cur ? "true" : undefined}
              tabIndex={popOpen ? 0 : -1}
              onClick={() => closePop()}
            >
              <span className="n">{pad(i + 1)}</span>
              {s.name}
            </a>
          ))}
        </nav>
      )}

      <dialog
        ref={sheetRef}
        className="cl-sheet"
        aria-label="Menu"
        onClick={(e) => {
          if (e.target === sheetRef.current) closeSheet();
        }}
        onClose={() => menuBtnRef.current?.focus()}
      >
        <div className="cl-sheet-in" ref={sheetInRef}>
          <div className="cl-sheet-top">
            <span className="cl-brand">
              <b>CalLord</b>
            </span>
            <button type="button" className="cl-close-btn" aria-label="Close menu" onClick={closeSheet}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M2 2l10 10M12 2 2 12" />
              </svg>
            </button>
          </div>
          <nav aria-label="Menu">
            {NAV.map((entry) => (
              <div key={entry.label}>
                <Link href={entry.href} onClick={closeSheet}>
                  {entry.label} <span aria-hidden="true">→</span>
                </Link>
                {entry.items
                  ?.filter((it) => it.href !== entry.href)
                  .map((it) => (
                    <Link key={it.href} href={it.href} className="sub" onClick={closeSheet}>
                      {it.label}
                    </Link>
                  ))}
              </div>
            ))}
            <Link href="/contact" onClick={closeSheet}>
              Contact <span aria-hidden="true">→</span>
            </Link>
          </nav>
          <ThemeToggle />
          <Link className="cl-btn cl-btn-teal" href="/contact" onClick={closeSheet}>
            Request a walkthrough
          </Link>
        </div>
      </dialog>
    </>
  );
}
