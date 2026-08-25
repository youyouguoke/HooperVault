import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuildGuidePage } from "@/components/seo/BuildGuidePage";
import { JsonLd, buildBreadcrumbList, buildArticleSchema } from "@/components/seo/JsonLd";
import { BUILDS, getBuildBySlug } from "@/data/seo-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return BUILDS.map((build) => ({ slug: build.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const build = getBuildBySlug(slug);
  if (!build) return { title: "Build Not Found" };
  return {
    title: build.title,
    description: build.description,
    keywords: build.keywords,
    openGraph: {
      type: "article",
      title: build.title,
      description: build.description,
      url: `/en/builds/${build.slug}`,
      siteName: "HooperVault",
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
      locale: "en_US",
    },
    alternates: {
      canonical: `/en/builds/${build.slug}`,
      languages: {
        en: `/en/builds/${build.slug}`,
        "zh-CN": `/zh-CN/builds/${build.slug}`,
        "x-default": `/en/builds/${build.slug}`,
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const build = getBuildBySlug(slug);
  if (!build) return notFound();
  return (
    <>
      <JsonLd data={buildBreadcrumbList([
        { name: "Home", href: "/en" },
        { name: "Build Guides", href: "/en/builds" },
        { name: build.title, href: `/en/builds/${build.slug}` },
      ])} />
      <JsonLd data={buildArticleSchema({ title: build.title, description: build.description, url: `/en/builds/${build.slug}` })} />
      <BuildGuidePage build={build} lang="en" />
    </>
  );
}
