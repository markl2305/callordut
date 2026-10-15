import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./system.css";
import { Header } from "./components/heritage/Header";
import { Footer } from "./components/heritage/Footer";
import { ThemeScript } from "./components/heritage/ThemeScript";
import { RevealObserver } from "./components/heritage/RevealObserver";
import { JsonLd } from "./components/JsonLd";
import { siteConfig } from "../config/site";
import ConsentBar from "./components/consent/ConsentBar";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Commercial Security & AV Integration | CalLord Unified Technologies",
  description:
    "CalLord Unified Technologies designs, installs, and supports commercial security systems and audiovisual integration. Two disciplines, one accountable partner — and an exclusive Forge platform partner.",
  icons: { icon: "/icon.svg" },
  metadataBase: new URL(siteConfig.website),
  openGraph: {
    title: "Commercial Security & AV Integration | CalLord Unified Technologies",
    description:
      "Commercial security and audiovisual integration. Two disciplines, one accountable partner — designed, installed, and supported for the long term.",
    url: siteConfig.website,
    siteName: siteConfig.shortName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Security & AV Integration | CalLord Unified Technologies",
    description:
      "Commercial security and audiovisual integration. Two disciplines, one accountable partner.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaMeasurementId =
    process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  // Read by public/consent/consent.js (hiresabina.ai's gate v2 at 02ab7f0, copied byte-identical). The Google tag
  // for this GA4 id also carries the Google Ads destination (AW-17409946688 is configured inside the Google tag, not
  // in this repo), so gating this one loader gates both. The bar is the gate's own; its wording is this config's.
  const CONSENT_CONFIG = `window.CONSENT_CONFIG=${JSON.stringify({
    storageKey: "callord-consent",
    privacyHref: "/privacy",
    ga4: gaMeasurementId || null,
    linkedin: null,
    vercel: false,
    autoBar: false, // ConsentBar calls SiteConsent.mountBar() after hydration
    privatePaths: "^/api(/|$)",
    // src/proxy.ts sets __Host-consent_region on every document, so this site may be default-on outside the ask-first
    // region. Set only together with that edge step: a site without it must not set this (hiresabina review F2).
    regionalDefault: true,
    // Mark 2026-10-13: Google Ads is linked to this GA4 tag, so the one choice is named as covering both.
    barText: "We use Google Analytics and cookieless Google Ads measurement only if you allow it. Nothing is sent until you choose.",
    // Consent by region (Mark 2026-10-14/15, shared memory 77550c45): outside the EU/EEA, UK and Switzerland analytics
    // are on by default, so the choice re-opened there from "Your privacy choices" must not say "only if you allow it".
    // It names the same two Google services as barText (Mark 2026-10-13).
    optOutText: "We use Google Analytics and cookieless Google Ads measurement to understand how this site is used and whether our ads lead to visits. You can turn them off here at any time.",
    acceptLabel: "Allow",
    rejectLabel: "No thanks",
  })};` +
    // Google Consent Mode defaults, queued before any tag exists (no network: gtag.js loads only once the gate allows it).
    // Mark 2026-10-13: Google Ads linked in GA4 is one choice, named honestly as "Google Analytics and cookieless
    // Google Ads measurement". So even after Allow, ad storage, ad user data and ad personalization stay DENIED:
    // no _gcl cookies or storage, no remarketing; Ads receives only restricted, cookieless measurement pings.
    `(function(){var w=window;w.dataLayer=w.dataLayer||[];function g(){w.dataLayer.push(arguments)}` +
    `g('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});` +
    `g('set','ads_data_redaction',true);})();` +
    // The gate is loaded FROM THIS SAME INLINE BLOCK, after the config and the defaults above have run (review F1,
    // 2026-10-13). A JSX <script async src> is hoisted by React ahead of the config in the built HTML, and under a
    // slow HTML response the gate then ran with no config: no bar, wrong storage key. A script this block creates
    // cannot exist before the block has executed, so the order holds whatever React, caching or chunk timing do.
    // Dynamically inserted, it is async (the gate's documented Next mode); data-consent-gate makes this idempotent.
    `(function(d){if(d.querySelector('script[data-consent-gate]'))return;var s=d.createElement('script');` +
    `s.src='/consent/consent.js';s.async=true;s.setAttribute('data-consent-gate','');` +
    `(d.head||d.documentElement).appendChild(s);})(document);`;

  return (
    <html lang="en" className={`${interTight.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
        {/* Consent gate (compliance P1-1g, Mark 2026-10-12; by region, Mark 2026-10-14/15). Google Analytics 4 and
            Google Ads load ONLY after a visitor presses "Allow" in the EU/EEA, UK, Switzerland or an unknown country,
            and by default elsewhere unless turned off, never under Global Privacy Control (the
            navigator.globalPrivacyControl signal, or the consent_gpc cookie src/proxy.ts sets from Sec-GPC), and
            never from the server: public/consent/consent.js creates the tag in the browser, so with JavaScript
            off nothing is sent. */}
        {/* One inline block: config, Consent Mode defaults, then it inserts the gate. No separate gate tag. */}
        <script id="consent-config" dangerouslySetInnerHTML={{ __html: CONSENT_CONFIG }} />
      </head>
      <body className="antialiased">
        <JsonLd />
        <Header />
        <RevealObserver />
        <main id="main">{children}</main>
        <Footer />
        <ConsentBar />
      </body>
    </html>
  );
}
