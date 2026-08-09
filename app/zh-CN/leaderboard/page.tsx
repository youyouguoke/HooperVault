import type { Metadata } from "next";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";

export const metadata: Metadata = {
  title: "排行榜 - 最佳 Hooper 构建 | HooperVault",
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
    title: "排行榜 | HooperVault",
    description: "社区最高评分的 Hooper 构建。",
    url: "/zh-CN/leaderboard",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "zh_CN",
  },
  robots: { index: true, follow: true },
};

export default function LeaderboardPage() {
  return <Leaderboard lang="zh-CN" />;
}
