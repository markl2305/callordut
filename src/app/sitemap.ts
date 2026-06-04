import type { MetadataRoute } from "next";
import { siteConfig } from "../config/site";
import { allArticles } from "../lib/learn";

// All indexable routes. /thank-you is intentionally excluded (post-form utility page).
const ROUTES = [
  "",
  "/learn",
  "/about",
  "/services",
  "/services/av-integration",
  "/services/smart-rooms",
  "/services/project-management",
  "/services/custom-solutions",
  "/services/cannabis-security",
  "/av-integration",
  "/smart-room-design",
  "/security",
  "/cannabis-security",
  "/industries",
  "/industries/cannabis",
  "/industries/hospitality",
  "/industries/offices",
  "/industries/senior-living",
  "/solutions",
  "/solutions/financial-institutions",
  "/solutions/multifamily-security",
  "/room-types",
  "/room-types/executive-boardroom",
  "/room-types/small-hybrid-focus-pod",
  "/room-types/team-meeting-room",
  "/room-types/training-all-hands",
  "/room-types/virtual-visit-telehealth",
  "/partnerships/forge",
  "/partnerships/cooperative-purchasing",
  "/contact",
  "/privacy",
  "/sms-terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.website.replace(/\/$/, "");
  const now = new Date();
  const staticRoutes = ROUTES.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : route.split("/").length > 2 ? 0.6 : 0.8,
  }));
  const learnRoutes = allArticles().map((a) => ({
    url: `${base}${a.url}`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...staticRoutes, ...learnRoutes];
}
