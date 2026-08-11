import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchetypePage } from "@/components/seo/ArchetypePage";
import { ARCHETYPES, getArchetypeById } from "@/data/seo-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARCHETYPES.map((archetype) => ({ slug: archetype.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const archetype = getArchetypeById(slug);
  if (!archetype) return { title: "球风未找到 | HooperVault" };
  return {
    title: `${archetype.nameZh} 球风 | HooperVault`,
    description: archetype.descriptionZh,
    keywords: archetype.keywordsZh,
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
  return <ArchetypePage archetype={archetype} lang="zh-CN" />;
}
