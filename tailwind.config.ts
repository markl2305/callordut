import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "brand-teal": "#279A92",
        "brand-sand": "#F2E8DC",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
