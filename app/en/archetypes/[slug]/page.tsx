import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchetypePage } from "@/components/seo/ArchetypePage";
import { ARCHETYPES, getArchetypeById } from "@/data/seo-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARCHETYPES.map((archetype) => ({ slug: archetype.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const archetype = getArchetypeById(params.slug);
  if (!archetype) return { title: "Archetype Not Found | HooperVault" };
  return {
    title: `${archetype.name} Archetype | HooperVault`,
    description: archetype.description,
    keywords: archetype.keywords,
    alternates: {
      canonical: `/en/archetypes/${archetype.id}`,
      languages: {
        en: `/en/archetypes/${archetype.id}`,
        "zh-CN": `/zh-CN/archetypes/${archetype.id}`,
        "x-default": `/en/archetypes/${archetype.id}`,
      },
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const archetype = getArchetypeById(params.slug);
  if (!archetype) return notFound();
  return <ArchetypePage archetype={archetype} lang="en" />;
}
