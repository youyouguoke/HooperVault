import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "篮球球员构建器 | 创建你的自定义 NBA 风格球员",
  description: "通过草拟传奇技能、选择球风并在完整82场比赛赛季模拟中测试你的创作，打造自定义篮球球员。免费浏览器工具。",
  keywords: ["篮球球员构建器", "创建篮球球员", "自定义篮球球员", "NBA 球员构建器"],
  alternates: {
    canonical: "/zh-CN/basketball-player-builder",
    languages: { en: "/en/basketball-player-builder", "zh-CN": "/zh-CN/basketball-player-builder", "x-default": "/en/basketball-player-builder" },
  },
  robots: { index: false, follow: true },
};

export default function ZhCNBasketballPlayerBuilderPage() {
  // zh-CN version coming soon — redirect to EN for now
  redirect("/en/basketball-player-builder");
}
