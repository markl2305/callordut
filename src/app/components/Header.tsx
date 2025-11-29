"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "./BrandMark";

const primaryLinks = [
  { label: "Smart Rooms", href: "/smart-room-design" },
  { label: "Cannabis Security", href: "/cannabis-security" },
  { label: "AV Integration", href: "/av-integration" },
  {
    label: "Room Types",
    href: "/room-types",
    items: [
      { label: "Executive Boardroom", href: "/room-types/executive-boardroom" },
      { label: "Team Meeting Room", href: "/room-types/team-meeting-room" },
      { label: "Virtual Visit / Telehealth", href: "/room-types/virtual-visit-telehealth" },
      { label: "Training / All-Hands", href: "/room-types/training-all-hands" },
      { label: "Small Hybrid / Focus Pod", href: "/room-types/small-hybrid-focus-pod" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    items: [
      { label: "Senior Living", href: "/industries/senior-living" },
      { label: "Cannabis", href: "/industries/cannabis" },
      { label: "Hospitality", href: "/industries/hospitality" },
      { label: "Offices", href: "/industries/offices" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [roomTypesOpen, setRoomTypesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));
  const navLinks = primaryLinks;

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-800/60 bg-brand-sand shadow-md shadow-slate-950/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:py-4.5 lg:px-6 lg:py-5">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <BrandMark tagline="UNIFIED TECHNOLOGIES" textClassName="text-slate-900" />
        </Link>
        <nav className="hidden items-center gap-4 text-sm font-semibold text-slate-800 lg:flex">
          {navLinks.map((link) =>
            link.items ? (
              <div key={link.label} className="relative">
                <button
                  className="flex items-center gap-1 rounded-full px-3 py-2 transition hover:text-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
                  onClick={() =>
                    link.label === "Room Types"
                      ? setRoomTypesOpen((open) => !open)
                      : setIndustriesOpen((open) => !open)
                  }
                  aria-expanded={link.label === "Room Types" ? roomTypesOpen : industriesOpen}
                >
                  {link.label}
                  <span aria-hidden>▾</span>
                </button>
                {(link.label === "Room Types" ? roomTypesOpen : industriesOpen) ? (
                  <div className="absolute left-0 mt-2 min-w-[220px] rounded-2xl border border-white/10 bg-white/90 p-3 text-slate-900 shadow-xl shadow-slate-900/20">
                    <ul className="space-y-1 text-sm font-semibold">
                      {link.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block rounded-xl px-3 py-2 transition hover:bg-slate-100"
                            onClick={() => {
                              setRoomTypesOpen(false);
                              setIndustriesOpen(false);
                            }}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 transition hover:text-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal ${
                  isActive(link.href) ? "text-brand-teal" : ""
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a href="tel:+18666572383" className="text-sm font-semibold text-slate-800 hover:text-brand-teal">
            (866) 657-2383
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
            {navLinks.map((link) =>
              link.items ? (
                <div key={link.label} className="rounded-lg border border-slate-300/70 bg-white/60 px-3 py-2">
                  <button
                    className="flex w-full items-center justify-between text-left"
                    onClick={() =>
                      link.label === "Room Types"
                        ? setRoomTypesOpen((open) => !open)
                        : setIndustriesOpen((open) => !open)
                    }
                    aria-expanded={link.label === "Room Types" ? roomTypesOpen : industriesOpen}
                  >
                    <span>{link.label}</span>
                    <span aria-hidden>{(link.label === "Room Types" ? roomTypesOpen : industriesOpen) ? "▴" : "▾"}</span>
                  </button>
                  {(link.label === "Room Types" ? roomTypesOpen : industriesOpen) ? (
                    <div className="mt-2 space-y-1">
                      {link.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          className="block rounded-md px-2 py-1 text-xs font-semibold transition hover:bg-brand-teal/10"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2 transition hover:bg-white/60 hover:text-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="rounded-lg bg-brand-teal px-3 py-2 text-center font-semibold text-brand-slate transition hover:bg-brand-teal/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
            >
              Plan my next build
            </Link>
            <a
              href="tel:+18666572383"
              className="rounded-lg px-3 py-2 text-center font-semibold text-slate-800 transition hover:bg-white/60 hover:text-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
            >
              (866) 657-2383
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
