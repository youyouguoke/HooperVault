import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { BUILDS } from "@/data/seo-content";

export const metadata: Metadata = {
  title: "Build Guides | HooperVault",
  description: "Browse the best basketball player builds for HooperVault. Shooter, defender, slasher, playmaker, and all-around superstar builds with recommended skills.",
  alternates: {
    canonical: "/en/builds",
    languages: {
      en: "/en/builds",
      "zh-CN": "/zh-CN/builds",
      "x-default": "/en/builds",
    },
  },
};

export default function BuildGuidesIndexPage() {
  return (
    <>
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

          <div className="mt-12 text-center">
            <Button asChild href="/en/build/mode" variant="primary" size="lg">
              <span className="flex items-center justify-center gap-2">Start Building <ChevronRight className="h-5 w-5" /></span>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
