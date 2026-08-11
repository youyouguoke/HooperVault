import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuildGuidePage } from "@/components/seo/BuildGuidePage";
import { BUILDS, getBuildBySlug } from "@/data/seo-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return BUILDS.map((build) => ({ slug: build.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const build = getBuildBySlug(params.slug);
  if (!build) return { title: "构建未找到 | HooperVault" };
  return {
    title: `${build.titleZh} | HooperVault`,
    description: build.descriptionZh,
    keywords: build.keywordsZh,
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

export default function Page({ params }: { params: { slug: string } }) {
  const build = getBuildBySlug(params.slug);
  if (!build) return notFound();
  return <BuildGuidePage build={build} lang="zh-CN" />;
}
