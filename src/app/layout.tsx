import type { Metadata } from "next";
import { Newsreader, Spectral, Space_Grotesk, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/heritage/Header";
import { Footer } from "./components/heritage/Footer";
import { ThemeScript } from "./components/heritage/ThemeScript";
import { RevealObserver } from "./components/heritage/RevealObserver";
import { JsonLd } from "./components/JsonLd";
import { siteConfig } from "../config/site";
import ConsentBar from "./components/consent/ConsentBar";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});
const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    // Mark 2026-10-13: Google Ads is linked to this GA4 tag, so the one choice is named as covering both.
    barText: "We use Google Analytics and cookieless Google Ads measurement only if you allow it. Nothing is sent until you choose.",
    acceptLabel: "Allow",
    rejectLabel: "No thanks",
  })};` +
    // Google Consent Mode defaults, queued before any tag exists (no network: gtag.js loads only after Allow).
    // Mark 2026-10-13: Google Ads linked in GA4 is one choice, named honestly as "Google Analytics and cookieless
    // Google Ads measurement". So even after Allow, ad storage, ad user data and ad personalization stay DENIED:
    // no _gcl cookies or storage, no remarketing; Ads receives only restricted, cookieless measurement pings.
    `(function(){var w=window;w.dataLayer=w.dataLayer||[];function g(){w.dataLayer.push(arguments)}` +
    `g('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});` +
    `g('set','ads_data_redaction',true);})();`;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        {/* Consent gate (compliance P1-1g, Mark 2026-10-12). Google Analytics 4 and Google Ads load ONLY after a
            visitor presses "Allow", never under Global Privacy Control (the
            navigator.globalPrivacyControl signal, or the consent_gpc cookie src/proxy.ts sets from Sec-GPC), and
            never from the server: public/consent/consent.js creates the tag in the browser, so with JavaScript
            off nothing is sent. */}
        <script id="consent-config" dangerouslySetInnerHTML={{ __html: CONSENT_CONFIG }} />
        <script async src="/consent/consent.js" />
      </head>
      <body
        className={`${newsreader.variable} ${spectral.variable} ${spaceGrotesk.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <JsonLd />
        <Header />
        <RevealObserver />
        <main>{children}</main>
        <Footer />
        <ConsentBar />
      </body>
    </html>
  );
}
