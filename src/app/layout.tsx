import type { Metadata } from "next";
import { Newsreader, Spectral, Space_Grotesk, Inter_Tight, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "./components/heritage/Header";
import { Footer } from "./components/heritage/Footer";
import { ThemeScript } from "./components/heritage/ThemeScript";
import { RevealObserver } from "./components/heritage/RevealObserver";
import { JsonLd } from "./components/JsonLd";
import { siteConfig } from "../config/site";

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

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        {gaMeasurementId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaMeasurementId}', { send_page_view: true });
                `,
              }}
            />
          </>
        ) : null}
      </head>
      <body
        className={`${newsreader.variable} ${spectral.variable} ${spaceGrotesk.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <JsonLd />
        <Header />
        <RevealObserver />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
