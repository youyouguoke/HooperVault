import type { Metadata } from "next";

const siteUrl = "https://hoopervault.com";
const ogImageMeta = {
  url: "/images/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "HooperVault - 用传奇技能打造你的梦想篮球球员",
};

export const metadata: Metadata = {
  title: "HooperVault - 打造你的终极 Hooper",
  description:
    "融合传奇篮球技能，构建你的梦想球员，模拟职业生涯，并创造可分享的球员传奇。专为篮球迷打造的篮球构建模拟器。",
  keywords: [
    "篮球模拟器",
    "创建篮球球员",
    "NBA 构建游戏",
    "篮球构建生成器",
    "篮球传奇模拟器",
  ],
  alternates: {
    canonical: "/zh-CN",
    languages: {
      en: "/en",
      "zh-CN": "/zh-CN",
    },
  },
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "HooperVault - 打造你的终极 Hooper",
    description:
      "融合传奇篮球技能，构建你的梦想球员，模拟职业生涯，并创造可分享的球员传奇。",
    url: "/zh-CN",
    images: [ogImageMeta],
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "HooperVault - 打造你的终极 Hooper",
    description:
      "融合传奇篮球技能，构建你的梦想球员，模拟职业生涯，并创造可分享的球员传奇。",
    images: [`${siteUrl}/images/og-default.jpg`],
  },
};

export default function ZhCNLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
