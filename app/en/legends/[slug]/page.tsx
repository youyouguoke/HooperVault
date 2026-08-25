import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegendSkillPageComponent } from "@/components/seo/LegendSkillPage";
import { JsonLd, buildBreadcrumbList, buildArticleSchema } from "@/components/seo/JsonLd";
import { LEGEND_SKILL_PAGES, getLegendSkillPageById } from "@/data/seo-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEGEND_SKILL_PAGES.map((legend) => ({ slug: legend.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const legend = getLegendSkillPageById(slug);
  if (!legend) return { title: "Legend Skill Not Found" };
  return {
    title: `${legend.displayName} Legendary Skills`,
    description: legend.description,
    keywords: legend.keywords,
    openGraph: {
      type: "article",
      title: `${legend.displayName} Legendary Skills`,
      description: legend.description,
      url: `/en/legends/${legend.id}`,
      siteName: "HooperVault",
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
      locale: "en_US",
    },
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
  return (
    <>
      <JsonLd data={buildBreadcrumbList([
        { name: "Home", href: "/en" },
        { name: "Legend Skills", href: "/en/legends" },
        { name: legend.displayName, href: `/en/legends/${legend.id}` },
      ])} />
      <JsonLd data={buildArticleSchema({ title: `${legend.displayName} Legendary Skills`, description: legend.description, url: `/en/legends/${legend.id}` })} />
      <LegendSkillPageComponent legend={legend} lang="en" />
    </>
  );
}
