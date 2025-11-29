import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { siteConfig } from "../config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Rooms, AV & Security Design | CalLord Unified Technologies",
  description:
    "CalLord Unified Technologies designs AV systems, smart rooms, and cannabis security so every meeting, resident check-in, and virtual visit just works. Based in Albuquerque, serving teams nationwide.",
  icons: [
    { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { rel: "icon", url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    { rel: "icon", url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
  ],
  metadataBase: new URL(siteConfig.website),
  openGraph: {
    title: "Smart Rooms, AV & Security Design | CalLord Unified Technologies",
    description:
      "CalLord Unified Technologies designs AV systems, smart rooms, and cannabis security so every meeting, resident check-in, and virtual visit just works.",
    url: siteConfig.website,
    siteName: siteConfig.shortName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Rooms, AV & Security Design | CalLord Unified Technologies",
    description:
      "AV integration, smart rooms, and cannabis security designed for operators. Based in Albuquerque, serving teams nationwide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId =
    process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="afterInteractive"
        />
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        <main className="pt-20 lg:pt-28">{children}</main>
        <elevenlabs-convai agent-id="agent_8401kb8nr99ffnb9m236xyabwjyx"></elevenlabs-convai>
        <Footer />
      </body>
    </html>
  );
}
