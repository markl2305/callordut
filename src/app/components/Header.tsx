"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FocusEvent, useState } from "react";
import { BrandMark } from "./BrandMark";

type DropdownType = "smartRooms" | "security" | "industries";

type NavLink =
  | { label: string; href: string }
  | { label: string; href: string; dropdown: DropdownType; items: { label: string; href: string }[] };

const primaryLinks: NavLink[] = [
  {
    label: "Smart Rooms",
    href: "/smart-room-design",
    dropdown: "smartRooms",
    items: [
      { label: "Executive Boardrooms", href: "/room-types/executive-boardroom" },
      { label: "Team Meeting Rooms", href: "/room-types/team-meeting-room" },
      { label: "Virtual Visit / Telehealth", href: "/room-types/virtual-visit-telehealth" },
      { label: "Focus Pods", href: "/room-types/small-hybrid-focus-pod" },
      { label: "View All Room Types", href: "/room-types" },
    ],
  },
  {
    label: "Security",
    href: "/solutions",
    dropdown: "security",
    items: [
      { label: "Multifamily Security", href: "/solutions/multifamily-security" },
      { label: "Banking / Financial Institutions", href: "/solutions/financial-institutions" },
    ],
  },
  { label: "AV Integration", href: "/av-integration" },
  {
    label: "Industries",
    href: "/industries",
    dropdown: "industries",
    items: [
      { label: "Multifamily", href: "/solutions/multifamily-security" },
      { label: "Senior Living", href: "/industries/senior-living" },
      { label: "Hospitality", href: "/industries/hospitality" },
      { label: "Small & Mid-Sized Offices", href: "/industries/offices" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [smartRoomsOpen, setSmartRoomsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);
  const closeDropdowns = () => {
    setSmartRoomsOpen(false);
    setIndustriesOpen(false);
    setSecurityOpen(false);
  };
  const closeMenu = () => {
    setMenuOpen(false);
    closeDropdowns();
  };
  const openDropdown = (type: DropdownType) => {
    setSmartRoomsOpen(type === "smartRooms");
    setIndustriesOpen(type === "industries");
    setSecurityOpen(type === "security");
  };
  const toggleMobileDropdown = (type: DropdownType) => {
    if (type === "smartRooms") {
      setSmartRoomsOpen((open) => {
        const next = !open;
        if (next) {
          setIndustriesOpen(false);
          setSecurityOpen(false);
        }
        return next;
      });
      return;
    }
    if (type === "industries") {
      setIndustriesOpen((open) => {
        const next = !open;
        if (next) {
          setSmartRoomsOpen(false);
          setSecurityOpen(false);
        }
        return next;
      });
      return;
    }
    setSecurityOpen((open) => {
      const next = !open;
      if (next) {
        setSmartRoomsOpen(false);
        setIndustriesOpen(false);
      }
      return next;
    });
  };
  const handleDropdownBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocus = event.relatedTarget as Node | null;
    if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
      closeDropdowns();
    }
  };
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
            "items" in link ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => openDropdown(link.dropdown)}
                onMouseLeave={closeDropdowns}
                onFocus={() => openDropdown(link.dropdown)}
                onBlur={handleDropdownBlur}
              >
                <button
                  className="flex items-center gap-1 rounded-full px-3 py-2 transition hover:text-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
                  type="button"
                  aria-expanded={
                    link.dropdown === "smartRooms" ? smartRoomsOpen : link.dropdown === "industries" ? industriesOpen : securityOpen
                  }
                >
                  {link.label}
                  <span aria-hidden>▾</span>
                </button>
                {(link.dropdown === "smartRooms" ? smartRoomsOpen : link.dropdown === "industries" ? industriesOpen : securityOpen) ? (
                  <div className="absolute left-0 top-full min-w-[220px] rounded-2xl border border-white/10 bg-white/90 p-3 text-slate-900 shadow-xl shadow-slate-900/20">
                    <ul className="space-y-1 text-sm font-semibold">
                      {link.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block rounded-xl px-3 py-2 transition hover:bg-slate-100"
                            onClick={closeDropdowns}
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
          <a href="tel:+18666572383" className="text-sm font-semibold text-slate-900 hover:text-brand-teal">
            (866) 657-2383
          </a>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-full bg-brand-teal px-5 text-sm font-semibold text-brand-slate whitespace-nowrap transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
          >
            Schedule Free Assessment
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
              "items" in link ? (
                <div key={link.label} className="rounded-lg border border-slate-300/70 bg-white/60 px-3 py-2">
                  <button
                    className="flex w-full items-center justify-between text-left"
                    onClick={() => toggleMobileDropdown(link.dropdown)}
                    aria-expanded={
                      link.dropdown === "smartRooms" ? smartRoomsOpen : link.dropdown === "industries" ? industriesOpen : securityOpen
                    }
                  >
                    <span>{link.label}</span>
                    <span aria-hidden>
                      {(link.dropdown === "smartRooms" ? smartRoomsOpen : link.dropdown === "industries" ? industriesOpen : securityOpen)
                        ? "▴"
                        : "▾"}
                    </span>
                  </button>
                  {(link.dropdown === "smartRooms" ? smartRoomsOpen : link.dropdown === "industries" ? industriesOpen : securityOpen) ? (
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
              className="inline-flex items-center justify-center rounded-lg bg-brand-teal px-3 py-2 text-center font-semibold text-brand-slate transition hover:bg-brand-teal/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
            >
              Schedule Free Assessment
            </Link>
            <a
              href="tel:+18666572383"
              className="rounded-lg px-3 py-2 text-center font-semibold text-slate-900 transition hover:bg-white/60 hover:text-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
            >
              (866) 657-2383
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
