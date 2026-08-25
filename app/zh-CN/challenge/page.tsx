import type { Metadata } from "next";
import { Challenge } from "@/components/challenge/Challenge";

export const metadata: Metadata = {
  title: "每日挑战",
  description: "每天一个全新挑战。在共享约束下构建，与社区比较你的成果。",
  alternates: {
    canonical: "/zh-CN/challenge",
    languages: {
      en: "/en/challenge",
      "zh-CN": "/zh-CN/challenge",
    },
  },
  robots: { index: true, follow: true },
};

export default function DailyChallengePage() {
  return <Challenge lang="zh-CN" />;
}
