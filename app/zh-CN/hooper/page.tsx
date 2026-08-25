import type { Metadata } from "next";
import { Suspense } from "react";
import { HooperResultClient } from "./ResultClient";

const ogImageMeta = {
  url: "/images/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "HooperVault 上的一个传奇 Hooper 构建",
};

export const metadata: Metadata = {
  title: "你的 Hooper 传奇",
  description: "在 HooperVault 查看你创建的 Hooper 传奇卡。",
  alternates: {
    canonical: "/zh-CN/hooper",
    languages: {
      en: "/en/hooper",
      "zh-CN": "/zh-CN/hooper",
    },
  },
  openGraph: {
    type: "website",
    title: "你的 Hooper 传奇",
    description: "在 HooperVault 查看这个传奇 Hooper 构建。",
    url: "/zh-CN/hooper",
    images: [ogImageMeta],
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "你的 Hooper 传奇",
    description: "在 HooperVault 查看这个传奇 Hooper 构建。",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// NOTE: This is a temporary static-export result page. Per-slug dynamic OG images
// require Cloudflare Pages Functions + HTMLRewriter + workers-og (the "C" option)
// and will be handled in a follow-up infrastructure spike.
export default function HooperPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111317]" />}>
      <HooperResultClient lang="zh-CN" />
    </Suspense>
  );
}
