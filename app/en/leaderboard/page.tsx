import type { Metadata } from "next";
import { Suspense } from "react";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";
import { JsonLd, buildBreadcrumbList } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Vault Leaderboard — Top Hooper Builds",
  description: "See the highest-rated Hooper builds on the Vault Leaderboard. Compare Overall ratings, archetypes, and positions. Filter by draft mode.",
  keywords: ["hooper vault", "basketball player builder", "vault leaderboard", "NBA build game", "top builds"],
  alternates: {
    canonical: "/en/leaderboard",
    languages: {
      en: "/en/leaderboard",
      "zh-CN": "/zh-CN/leaderboard",
    },
  },
  openGraph: {
    type: "website",
    title: "Leaderboard",
    description: "The highest-rated Hooper builds from the community.",
    url: "/en/leaderboard",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function LeaderboardPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([{ name: "Home", href: "/en" }, { name: "Leaderboard", href: "/en/leaderboard" }])} />
      <Suspense fallback={<div className="text-center py-20"><div className="inline-block w-8 h-8 border-2 border-[#F2CA50]/30 border-t-[#F2CA50] rounded-full animate-spin" /></div>}>
        <Leaderboard lang="en" />
      </Suspense>
    </>
  );
}
