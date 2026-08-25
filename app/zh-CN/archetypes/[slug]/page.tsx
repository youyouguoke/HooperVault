import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchetypePage } from "@/components/seo/ArchetypePage";
import { JsonLd, buildBreadcrumbList, buildArticleSchema } from "@/components/seo/JsonLd";
import { ARCHETYPES, getArchetypeById } from "@/data/seo-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARCHETYPES.map((archetype) => ({ slug: archetype.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const archetype = getArchetypeById(slug);
  if (!archetype) return { title: "球风未找到" };
  return {
    title: `${archetype.nameZh} 球风`,
    description: archetype.descriptionZh,
    keywords: archetype.keywordsZh,
    openGraph: {
      type: "article",
      title: `${archetype.nameZh} 球风`,
      description: archetype.descriptionZh,
      url: `/zh-CN/archetypes/${archetype.id}`,
      siteName: "HooperVault",
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
      locale: "zh_CN",
    },
    alternates: {
      canonical: `/zh-CN/archetypes/${archetype.id}`,
      languages: {
        en: `/en/archetypes/${archetype.id}`,
        "zh-CN": `/zh-CN/archetypes/${archetype.id}`,
        "x-default": `/en/archetypes/${archetype.id}`,
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const archetype = getArchetypeById(slug);
  if (!archetype) return notFound();
  return (
    <>
      <JsonLd data={buildBreadcrumbList([
        { name: "首页", href: "/zh-CN" },
        { name: "球风", href: "/zh-CN/archetypes" },
        { name: archetype.nameZh, href: `/zh-CN/archetypes/${archetype.id}` },
      ])} />
      <JsonLd data={buildArticleSchema({ title: `${archetype.nameZh} 球风`, description: archetype.descriptionZh, url: `/zh-CN/archetypes/${archetype.id}` })} />
      <ArchetypePage archetype={archetype} lang="zh-CN" />
    </>
  );
}
