import type { Metadata } from "next";

const siteUrl = "https://hoopervault.com";
const ogImageMeta = {
  url: "/images/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "HooperVault - Build your dream basketball player with legendary skills",
};

export const metadata: Metadata = {
  title: "HooperVault - Build Your Ultimate Hooper",
  description:
    "Combine legendary basketball skills, build your dream player, simulate your career, and create a shareable legacy. The basketball build simulator for NBA fans.",
  keywords: [
    "basketball simulator",
    "create basketball player",
    "NBA build game",
    "basketball build generator",
    "basketball legacy simulator",
  ],
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      "zh-CN": "/zh-CN",
      "x-default": "/en",
    },
  },
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "HooperVault - Build Your Ultimate Hooper",
    description:
      "Combine legendary basketball skills, build your dream player, simulate your career, and create a shareable legacy.",
    url: "/en",
    images: [ogImageMeta],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HooperVault - Build Your Ultimate Hooper",
    description:
      "Combine legendary basketball skills, build your dream player, simulate your career, and create a shareable legacy.",
    images: [`${siteUrl}/images/og-default.jpg`],
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
