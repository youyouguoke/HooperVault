import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegendSkillPageComponent } from "@/components/seo/LegendSkillPage";
import { LEGEND_SKILL_PAGES, getLegendSkillPageById } from "@/data/seo-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEGEND_SKILL_PAGES.map((legend) => ({ slug: legend.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const legend = getLegendSkillPageById(slug);
  if (!legend) return { title: "Legend Skill Not Found | HooperVault" };
  return {
    title: `${legend.displayName} Legendary Skills | HooperVault`,
    description: legend.description,
    keywords: legend.keywords,
    alternates: {
      canonical: `/en/legends/${legend.id}`,
      languages: {
        en: `/en/legends/${legend.id}`,
        "zh-CN": `/zh-CN/legends/${legend.id}`,
        "x-default": `/en/legends/${legend.id}`,
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const legend = getLegendSkillPageById(slug);
  if (!legend) return notFound();
  return <LegendSkillPageComponent legend={legend} lang="en" />;
}
