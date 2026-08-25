import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JsonLd, buildBreadcrumbList, buildItemListSchema } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { BUILDS } from "@/data/seo-content";

export const metadata: Metadata = {
  title: "Build Guides",
  description: "Browse the best basketball player builds for HooperVault. Shooter, defender, slasher, playmaker, and all-around superstar builds with recommended skills.",
  alternates: {
    canonical: "/en/builds",
    languages: {
      en: "/en/builds",
      "zh-CN": "/zh-CN/builds",
      "x-default": "/en/builds",
    },
  },
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "Build Guides",
    description: "Browse the best basketball player builds for HooperVault. Shooter, defender, slasher, playmaker, and all-around superstar builds.",
    url: "/en/builds",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
};

export default function BuildGuidesIndexPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([{ name: "Home", href: "/en" }, { name: "Build Guides", href: "/en/builds" }])} />
      <JsonLd data={buildItemListSchema(BUILDS.map(b => ({ name: b.title, url: `/en/builds/${b.slug}` })))} />
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-10">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">
              Build Library
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide mb-4">
              Build Guides
            </h1>
            <p className="text-lg text-[#A8A8B3]">
              Find the best basketball player builds, from sharpshooters to defensive monsters.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {BUILDS.map((build) => (
              <Link
                key={build.slug}
                href={`/en/builds/${build.slug}`}
                className="group glass-card rounded-2xl p-6 hover:bg-white/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors">
                      {build.title}
                    </h2>
                    <p className="text-sm text-[#A8A8B3] mt-1">{build.archetype} · {build.position}</p>
                  </div>
                  <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#F2CA50]">{build.potentialOvr}+</span>
                </div>
                <p className="text-sm text-[#A8A8B3] line-clamp-2">{build.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm text-[#F2CA50]">
                  View Build <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-2 max-w-2xl mx-auto">
            <Link href="/en/blog/build-a-bucket-nba-game" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
              <span className="text-white font-medium text-sm group-hover:text-[#F2CA50] transition-colors">Build a Bucket NBA Game</span>
              <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
            </Link>
            <Link href="/en/blog/how-to-get-99-overall" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
              <span className="text-white font-medium text-sm group-hover:text-[#F2CA50] transition-colors">How to Get 99 Overall</span>
              <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
            </Link>
          </div>
          <div className="mt-6 text-center">
            <Button asChild href="/en/build/mode" variant="primary" size="lg">
              <span className="flex items-center justify-center gap-2">Start Building <ChevronRight className="h-5 w-5" /></span>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
