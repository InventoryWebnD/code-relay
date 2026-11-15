import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/seo";

const PAGES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/event", priority: 0.9, changeFrequency: "weekly" },
  { path: "/problem-statements", priority: 0.9, changeFrequency: "weekly" },
  { path: "/sponsors", priority: 0.7, changeFrequency: "weekly" },
  { path: "/past-editions", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
    images: p.path === "/" ? [`${SITE_URL}/opengraph-image`] : undefined,
  }));
}
