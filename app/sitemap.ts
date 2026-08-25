import type { MetadataRoute } from "next";
import { BUILDS, LEGEND_SKILL_PAGES, ARCHETYPES } from "@/data/seo-content";

export const dynamic = "force-static";

const SITE_URL = "https://hoopervault.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/en`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/zh-CN`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/en/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/zh-CN/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/en/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/zh-CN/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/en/builds`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/zh-CN/builds`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/en/archetypes`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/zh-CN/archetypes`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/en/legends`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/zh-CN/legends`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/en/leaderboard`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/zh-CN/leaderboard`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/en/challenge`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/zh-CN/challenge`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/en/build/mode`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/zh-CN/build/mode`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/en/basketball-player-builder`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/en/build-a-bucket-nba-game`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/zh-CN/build-a-bucket-nba-game`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/en/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/en/blog/build-a-bucket-nba-game`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/en/blog/how-to-get-99-overall`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/en/blog/classic-vs-blind-vs-chaos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/en/blog/best-archetypes-ranked`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/en/blog/basketball-player-builder-achievements`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/en/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },

    { url: `${SITE_URL}/en/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/zh-CN/basketball-player-builder`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/zh-CN/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/zh-CN/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/zh-CN/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic build pages
  const buildPages: MetadataRoute.Sitemap = BUILDS.flatMap((build) => [
    { url: `${SITE_URL}/en/builds/${build.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/zh-CN/builds/${build.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 },
  ]);

  // Dynamic legend pages
  const legendPages: MetadataRoute.Sitemap = LEGEND_SKILL_PAGES.flatMap((legend) => [
    { url: `${SITE_URL}/en/legends/${legend.id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/zh-CN/legends/${legend.id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 },
  ]);

  // Dynamic archetype pages
  const archetypePages: MetadataRoute.Sitemap = ARCHETYPES.flatMap((archetype) => [
    { url: `${SITE_URL}/en/archetypes/${archetype.id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/zh-CN/archetypes/${archetype.id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 },
  ]);

  return [...staticPages, ...buildPages, ...legendPages, ...archetypePages];
}
