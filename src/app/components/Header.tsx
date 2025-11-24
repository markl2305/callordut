"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "./BrandMark";

const defaultNavLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Room Types", href: "/room-types" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const pathname = usePathname();
  const croNavLinks = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  const activeNavLinks = pathname?.startsWith("/solutions") ? croNavLinks : defaultNavLinks;

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-800/60 bg-brand-sand shadow-md shadow-slate-950/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:py-4.5 lg:px-6 lg:py-5">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <BrandMark tagline="UNIFIED TECHNOLOGIES" textClassName="text-slate-900" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-800 lg:flex">
          {activeNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 transition hover:text-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a href="tel:+15052075211" className="text-sm font-semibold text-slate-800 hover:text-brand-teal">
            (505) 207-5211
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-brand-teal px-4 py-2 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
          >
            Plan my next build
          </Link>
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-sm font-semibold text-slate-900 transition hover:bg-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>
      {menuOpen ? (
        <div className="border-t border-slate-800/50 bg-brand-sand px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3 text-sm font-semibold text-slate-800">
            {activeNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-2 transition hover:bg-white/60 hover:text-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="rounded-lg bg-brand-teal px-3 py-2 text-center font-semibold text-brand-slate transition hover:bg-brand-teal/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
            >
              Plan my next build
            </Link>
            <a
              href="tel:+15052075211"
              className="rounded-lg px-3 py-2 text-center font-semibold text-slate-800 transition hover:bg-white/60 hover:text-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
            >
              (505) 207-5211
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
