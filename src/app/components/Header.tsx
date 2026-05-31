"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FocusEvent, useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      setSmartRoomsOpen((open) => { const next = !open; if (next) { setIndustriesOpen(false); setSecurityOpen(false); } return next; });
      return;
    }
    if (type === "industries") {
      setIndustriesOpen((open) => { const next = !open; if (next) { setSmartRoomsOpen(false); setSecurityOpen(false); } return next; });
      return;
    }
    setSecurityOpen((open) => { const next = !open; if (next) { setSmartRoomsOpen(false); setIndustriesOpen(false); } return next; });
  };
  const handleDropdownBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocus = event.relatedTarget as Node | null;
    if (!nextFocus || !event.currentTarget.contains(nextFocus)) closeDropdowns();
  };
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));
  const navLinks = primaryLinks;
  const isDropdownOpen = (type: DropdownType) =>
    type === "smartRooms" ? smartRoomsOpen : type === "industries" ? industriesOpen : securityOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#070a14]/80 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-b border-transparent bg-[#070a14]/40 backdrop-blur-md"
      }`}
    >
      <div className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 lg:px-6 ${scrolled ? "py-3" : "py-4 lg:py-5"}`}>
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <BrandMark />
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-medium text-slate-300 lg:flex">
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
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 transition-colors duration-200 hover:text-foreground ${
                    isDropdownOpen(link.dropdown) ? "text-foreground" : ""
                  }`}
                  type="button"
                  aria-expanded={isDropdownOpen(link.dropdown)}
                >
                  {link.label}
                  <span className="text-[10px] text-muted" aria-hidden>▾</span>
                </button>
                {isDropdownOpen(link.dropdown) ? (
                  <div className="absolute left-0 top-full pt-1">
                    <div className="min-w-[220px] rounded-xl border border-white/[0.08] bg-[#0c1222]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
                      <ul className="space-y-0.5 text-sm">
                        {link.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block rounded-lg px-3 py-2 text-slate-300 transition-colors duration-200 hover:bg-white/[0.06] hover:text-foreground"
                              onClick={closeDropdowns}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 transition-colors duration-200 hover:text-foreground ${
                  isActive(link.href) ? "text-brand-teal" : ""
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:+18666572383" className="text-sm font-medium text-slate-400 transition-colors hover:text-foreground">
            (866) 657-2383
          </a>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-full bg-brand-teal px-5 text-sm font-semibold text-[#070a14] whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_-10px_rgba(39,154,146,0.5)]"
          >
            Free Assessment
          </Link>
        </div>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-sm text-slate-300 transition-colors hover:border-brand-teal/30 hover:text-foreground lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen ? (
        <div className="border-t border-white/[0.06] bg-[#070a14]/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 text-sm font-medium text-slate-300">
            {navLinks.map((link) =>
              "items" in link ? (
                <div key={link.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                  <button
                    className="flex w-full items-center justify-between text-left"
                    onClick={() => toggleMobileDropdown(link.dropdown)}
                    aria-expanded={isDropdownOpen(link.dropdown)}
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] text-muted" aria-hidden>
                      {isDropdownOpen(link.dropdown) ? "▴" : "▾"}
                    </span>
                  </button>
                  {isDropdownOpen(link.dropdown) ? (
                    <div className="mt-2 space-y-1">
                      {link.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          className="block rounded-md px-2 py-1.5 text-xs text-slate-400 transition-colors hover:text-brand-teal"
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
                  className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.04] hover:text-foreground"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-brand-teal px-3 py-2.5 text-center font-semibold text-[#070a14] transition-all duration-300"
            >
              Free Assessment
            </Link>
            <a
              href="tel:+18666572383"
              className="rounded-lg px-3 py-2.5 text-center text-slate-400 transition-colors hover:text-foreground"
            >
              (866) 657-2383
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
