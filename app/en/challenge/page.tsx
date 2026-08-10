import type { Metadata } from "next";
import { Challenge } from "@/components/challenge/Challenge";

export const metadata: Metadata = {
  title: "Daily Challenge | HooperVault",
  description: "A fresh draft prompt every day. Build under a shared constraint, then compare your results with the community.",
  alternates: {
    canonical: "/en/challenge",
    languages: {
      en: "/en/challenge",
      "zh-CN": "/zh-CN/challenge",
    },
  },
  robots: { index: true, follow: true },
};

export default function DailyChallengePage() {
  return <Challenge lang="en" />;
}
