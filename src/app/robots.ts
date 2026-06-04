import type { MetadataRoute } from "next";
import { siteConfig } from "../config/site";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.website.replace(/\/$/, "");
  return {
    // Allow all crawlers — including AI answer-engine bots (GPTBot, PerplexityBot,
    // ClaudeBot, Google-Extended) which fall under "*" — so the site can be cited.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/thank-you"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
