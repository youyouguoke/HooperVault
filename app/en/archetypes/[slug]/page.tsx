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
  if (!archetype) return { title: "Archetype Not Found" };
  return {
    title: `${archetype.name} Archetype`,
    description: archetype.description,
    keywords: archetype.keywords,
    openGraph: {
      type: "article",
      title: `${archetype.name} Archetype`,
      description: archetype.description,
      url: `/en/archetypes/${archetype.id}`,
      siteName: "HooperVault",
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
      locale: "en_US",
    },
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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const archetype = getArchetypeById(slug);
  if (!archetype) return notFound();
  return (
    <>
      <JsonLd data={buildBreadcrumbList([
        { name: "Home", href: "/en" },
        { name: "Archetypes", href: "/en/archetypes" },
        { name: archetype.name, href: `/en/archetypes/${archetype.id}` },
      ])} />
      <JsonLd data={buildArticleSchema({ title: `${archetype.name} Archetype`, description: archetype.description, url: `/en/archetypes/${archetype.id}` })} />
      <ArchetypePage archetype={archetype} lang="en" />
    </>
  );
}
