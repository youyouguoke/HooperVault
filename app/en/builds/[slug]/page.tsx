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
  if (!build) return { title: "Build Not Found | HooperVault" };
  return {
    title: `${build.title} | HooperVault`,
    description: build.description,
    keywords: build.keywords,
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

export default function Page({ params }: { params: { slug: string } }) {
  const build = getBuildBySlug(params.slug);
  if (!build) return notFound();
  return <BuildGuidePage build={build} lang="en" />;
}
