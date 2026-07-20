import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Themis — Cannabis Security Compliance Builder | CalLord",
  description:
    "Themis maps New Mexico cannabis security regulation (16.8.2 NMAC) to a requirement-by-requirement builder with statutory floors enforced in code.",
  // Not yet backed by the live Forge rule-map engine — keep out of the index
  // until NEXT_PUBLIC_THEMIS_ENGINE_URL points at callord.buildwithforge.app.
  robots: { index: false, follow: false },
};

export default function ThemisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
