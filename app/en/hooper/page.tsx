import type { Metadata } from "next";
import { Suspense } from "react";
import { HooperResultClient } from "./ResultClient";

export const metadata: Metadata = {
  title: "Your Hooper Legacy",
  description: "View your created Hooper legacy card on HooperVault.",
  alternates: {
    canonical: "/en/hooper",
    languages: {
      en: "/en/hooper",
      "zh-CN": "/zh-CN/hooper",
    },
  },
  openGraph: {
    type: "website",
    title: "Your Hooper Legacy",
    description: "View this legendary Hooper build on HooperVault.",
    url: "/en/hooper",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "A legendary Hooper build on HooperVault",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Hooper Legacy",
    description: "View this legendary Hooper build on HooperVault.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HooperPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111317]" />}>
      <HooperResultClient lang="en" />
    </Suspense>
  );
}
