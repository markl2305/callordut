# Heritage Rebrand — Handoff

Branch: `heritage-rebrand` (off `main` @ e8d4ddd). Goal: re-skin **all** callordut.com
pages into the new "heritage" design (warm cream/teal editorial, light/dark toggle,
brand-separated Forge co-brand block) from the `CalLord Website-2.zip` package.

## Design system (DONE)
- `src/app/globals.css` — heritage tokens as CSS vars (`--h-*`) under `[data-theme]`,
  mapped into Tailwind `@theme` (`bg-paper text-ink border-rule text-teal` …) + legacy
  aliases so not-yet-reskinned utility classes don't look alien. `.cl-reveal` motion,
  responsive helpers (`.cl-grid-2/3/4`, `.cl-grid-split`, header `.cl-nav-desktop` etc).
- `src/app/components/heritage/`:
  - `primitives.tsx` — `Wrap`, `Mono`, `Roman`, `Btn`, `FONT` (CSS-var font map).
  - `BrandMark.tsx` — `BrandMark` (monoline C+L SVG) + `BrandLockup`.
  - `Header.tsx` (client) — sticky nav, dropdowns covering deep pages, theme toggle, mobile.
  - `Footer.tsx` — full link map + 10DLC SMS/privacy disclosure (load-bearing, preserved).
  - `ThemeScript.tsx` (no-flash, default light) · `ThemeToggle.tsx` (client) · `RevealObserver.tsx` (client).
  - `sections.tsx` — `TrustStrip`, `ClosingCTA`, `ForgeBlock` (own dark+ember palette).
- `layout.tsx` — next/font (Newsreader/Spectral/Space Grotesk/Inter Tight/JetBrains Mono),
  ThemeScript in head, heritage Header/Footer + RevealObserver, **dropped dead ElevenLabs
  widget**, kept GA4. Package assets in `public/heritage/`.

## Routes
- `/` (home), `/security` (NEW), `/av-integration`, `/partnerships/forge` (NEW), `/contact`
  — all 5 designed pages PORTED + verified 200, no errors. Contact form wired to real
  Resend `/api/contact` with honeypot + GA `lead_submit` + SMS consent text.

## TODO — re-skin remaining pages (Task #4)
about, privacy, sms-terms, thank-you, services/* (av-integration, cannabis-security,
custom-solutions, project-management, smart-rooms), industries/* (cannabis, hospitality,
offices, senior-living), industries/page, solutions/* (financial-institutions,
multifamily-security), solutions/page, room-types/* (6) + room-types/page + RoomTypeTemplate,
partnerships/cooperative-purchasing, smart-room-design. Keep all content/SEO/forms; swap
dark Tailwind classes → heritage tokens, use heritage primitives where it reads cleaner.

## Then (Task #5)
`next build` clean → preview verify light/dark all routes → commit → push → merge main →
Vercel deploy (project `callordut` / dominus) → probe callordut.com live.
