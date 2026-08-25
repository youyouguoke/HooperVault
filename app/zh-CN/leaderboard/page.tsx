import type { Metadata } from "next";
import { Suspense } from "react";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";

export const metadata: Metadata = {
  title: "排行榜 - 最佳 Hooper 构建",
  description: "查看社区创建的最高评分 Hooper 构建。比较总评、球风和位置。",
  alternates: {
    canonical: "/zh-CN/leaderboard",
    languages: {
      en: "/en/leaderboard",
      "zh-CN": "/zh-CN/leaderboard",
    },
  },
  openGraph: {
    type: "website",
    title: "排行榜",
    description: "社区最高评分的 Hooper 构建。",
    url: "/zh-CN/leaderboard",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "zh_CN",
  },
  robots: { index: true, follow: true },
};

export default function LeaderboardPage() {
  return <Suspense fallback={<div className="text-center py-20"><div className="inline-block w-8 h-8 border-2 border-[#F2CA50]/30 border-t-[#F2CA50] rounded-full animate-spin" /></div>}><Leaderboard lang="zh-CN" /></Suspense>;
}
