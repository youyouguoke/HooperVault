import type { Metadata } from "next";
import { Challenge } from "@/components/challenge/Challenge";
import { JsonLd, buildBreadcrumbList } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Vault Challenge — Daily Draft Prompt",
  description: "A fresh Vault Challenge every day. Build under a shared constraint, then compare your results with the community on the HooperVault leaderboard.",
  keywords: ["hooper vault", "basketball player builder", "vault challenge", "daily draft", "NBA build game"],
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "Daily Challenge",
    description: "A fresh draft prompt every day. Build under a shared constraint, then compare your results with the community.",
    url: "/en/challenge",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
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
  return (
    <>
      <JsonLd data={buildBreadcrumbList([{ name: "Home", href: "/en" }, { name: "Daily Challenge", href: "/en/challenge" }])} />
      <Challenge lang="en" />
    </>
  );
}
