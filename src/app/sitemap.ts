import type { MetadataRoute } from "next";

const baseUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["/", "/impressum", "/datenschutz"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.6,
  }));
}
