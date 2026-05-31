"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";
    setMode(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    setMode((m) => {
      const next = m === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("cl-theme", next);
      } catch {
        /* ignore */
      }
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  };

  const dark = mode === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      style={{
        width: 38,
        height: 38,
        display: "grid",
        placeItems: "center",
        background: "transparent",
        border: "1px solid var(--h-rule)",
        color: "var(--h-ink)",
        cursor: "pointer",
        padding: 0,
        flexShrink: 0,
      }}
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      {mounted && dark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="4.2" />
          <path
            d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M20 14.5A8.2 8.2 0 0 1 9.5 4 6.6 6.6 0 1 0 20 14.5z" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
