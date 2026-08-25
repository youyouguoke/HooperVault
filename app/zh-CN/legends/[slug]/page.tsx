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
  if (!legend) return { title: "传奇技能未找到" };
  return {
    title: `${legend.displayNameZh} 传奇技能`,
    description: legend.descriptionZh,
    keywords: legend.keywordsZh,
    openGraph: {
      type: "article",
      title: `${legend.displayNameZh} 传奇技能`,
      description: legend.descriptionZh,
      url: `/zh-CN/legends/${legend.id}`,
      siteName: "HooperVault",
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
      locale: "zh_CN",
    },
    alternates: {
      canonical: `/zh-CN/legends/${legend.id}`,
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
        { name: "首页", href: "/zh-CN" },
        { name: "传奇技能", href: "/zh-CN/legends" },
        { name: legend.displayNameZh, href: `/zh-CN/legends/${legend.id}` },
      ])} />
      <JsonLd data={buildArticleSchema({ title: `${legend.displayNameZh} 传奇技能`, description: legend.descriptionZh, url: `/zh-CN/legends/${legend.id}` })} />
      <LegendSkillPageComponent legend={legend} lang="zh-CN" />
    </>
  );
}
