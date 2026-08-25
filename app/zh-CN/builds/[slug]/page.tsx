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
  if (!build) return { title: "构建未找到" };
  return {
    title: build.titleZh,
    description: build.descriptionZh,
    keywords: build.keywordsZh,
    openGraph: {
      type: "article",
      title: build.titleZh,
      description: build.descriptionZh,
      url: `/zh-CN/builds/${build.slug}`,
      siteName: "HooperVault",
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
      locale: "zh_CN",
    },
    alternates: {
      canonical: `/zh-CN/builds/${build.slug}`,
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
        { name: "首页", href: "/zh-CN" },
        { name: "构建指南", href: "/zh-CN/builds" },
        { name: build.titleZh, href: `/zh-CN/builds/${build.slug}` },
      ])} />
      <JsonLd data={buildArticleSchema({ title: build.titleZh, description: build.descriptionZh, url: `/zh-CN/builds/${build.slug}` })} />
      <BuildGuidePage build={build} lang="zh-CN" />
    </>
  );
}
