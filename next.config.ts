import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/solutions/property-security",
        destination: "/solutions/multifamily-security",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
