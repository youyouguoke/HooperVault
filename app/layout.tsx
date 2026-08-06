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
    canonical: "https://hoopervault.com/en",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${spaceGrotesk.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0B12] text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
