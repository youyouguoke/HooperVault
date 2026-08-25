import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "HooperVault 博客 | 篮球球员构建器指南与策略",
  description: "HooperVault 篮球球员构建器的草拟策略指南、构建分析、球风解读和赛季模拟技巧。",
  alternates: {
    canonical: "/zh-CN/blog",
    languages: { en: "/en/blog", "zh-CN": "/zh-CN/blog", "x-default": "/en/blog" },
  },
  robots: { index: false, follow: true },
};

export default function ZhCNBlogPage() {
  redirect("/en/blog");
}
