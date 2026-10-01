import type { NextConfig } from "next";

// Removed 2026-10-01 (Mark, addendum item 20): the excluded vertical's pages,
// compliance tool and downloads. Each old URL 308s to the main security page
// so held links and indexed URLs still land somewhere real.
const REMOVED_TO_SECURITY = [
  "/cannabis-security",
  "/services/cannabis-security",
  "/industries/cannabis",
  "/tools/themis",
  "/Cannabis%20Facility%20Security%20Readiness%20Checklist.pdf",
  "/cannabis-security-dispensary-interior.png",
  "/services-cannabis-security-icon.png",
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/solutions/property-security",
        destination: "/solutions/multifamily-security",
        permanent: true,
      },
      ...REMOVED_TO_SECURITY.map((source) => ({
        source,
        destination: "/security",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
