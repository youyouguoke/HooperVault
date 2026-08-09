import type { Metadata } from "next";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";

export const metadata: Metadata = {
  title: "Leaderboard - Top Hooper Builds | HooperVault",
  description: "See the highest-rated Hooper builds created by the community. Compare Overall ratings, archetypes, and positions.",
  alternates: {
    canonical: "/en/leaderboard",
    languages: {
      en: "/en/leaderboard",
      "zh-CN": "/zh-CN/leaderboard",
    },
  },
  openGraph: {
    type: "website",
    title: "Leaderboard | HooperVault",
    description: "The highest-rated Hooper builds from the community.",
    url: "/en/leaderboard",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function LeaderboardPage() {
  return <Leaderboard lang="en" />;
}
