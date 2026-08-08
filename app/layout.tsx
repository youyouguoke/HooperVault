import type { Metadata } from "next";
import { Anton, Space_Grotesk, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const siteUrl = "https://hoopervault.com";
const ogImage = `${siteUrl}/images/og-default.jpg`;
const ogImageMeta = {
  url: "/images/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "HooperVault - Build your dream basketball player with legendary skills",
};

export const metadata: Metadata = {
  title: {
    default: "HooperVault - Build Your Ultimate Hooper",
    template: "%s | HooperVault",
  },
  description:
    "Combine legendary basketball skills, build your dream player, simulate your career, and create a shareable legacy. The basketball build simulator for NBA fans.",
  keywords: [
    "basketball simulator",
    "create basketball player",
    "NBA build game",
    "basketball build generator",
    "basketball legacy simulator",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      "zh-CN": "/zh-CN",
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
    site: "@hoopervault",
    title: "HooperVault - Build Your Ultimate Hooper",
    description:
      "Combine legendary basketball skills, build your dream player, simulate your career, and create a shareable legacy.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HooperVault",
  url: siteUrl,
  description:
    "A basketball build simulator where you draft legendary skills, create your dream Hooper, and simulate a shareable legacy.",
  inLanguage: ["en", "zh-CN"],
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/en/hooper?slug={{search_term_string}}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${spaceGrotesk.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0B0B12] text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
