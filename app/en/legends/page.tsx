import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JsonLd, buildBreadcrumbList, buildItemListSchema } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { LEGEND_SKILL_PAGES } from "@/data/seo-content";

export const metadata: Metadata = {
  title: "Legend Skills",
  description: "Browse legendary basketball skill inspirations for your Hooper build. Shooting, playmaking, defense, and mental skills.",
  alternates: {
    canonical: "/en/legends",
    languages: {
      en: "/en/legends",
      "zh-CN": "/zh-CN/legends",
      "x-default": "/en/legends",
    },
  },
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "Legend Skills",
    description: "Browse legendary basketball skill inspirations for your Hooper build. Shooting, playmaking, defense, and mental skills.",
    url: "/en/legends",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
};

const ICONS: Record<string, string> = {
  Mental: "🧠",
  Playmaking: "⚡",
  Interior: "💪",
  Defense: "🛡️",
  Shooting: "🎯",
};

export default function LegendSkillsIndexPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([{ name: "Home", href: "/en" }, { name: "Legend Skills", href: "/en/legends" }])} />
      <JsonLd data={buildItemListSchema(LEGEND_SKILL_PAGES.map(l => ({ name: l.displayName, url: `/en/legends/${l.id}` })))} />
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-10">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">
              Skill Library
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide mb-4">
              Legend Skills
            </h1>
            <p className="text-lg text-[#A8A8B3]">
              Find the legendary skill inspiration for your next build.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {LEGEND_SKILL_PAGES.map((legend) => (
              <Link
                key={legend.id}
                href={`/en/legends/${legend.id}`}
                className="group glass-card rounded-2xl p-6 hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{ICONS[legend.category] || "🏀"}</span>
                  <span className="text-xs uppercase tracking-wider text-[#A8A8B3] font-bold">{legend.category}</span>
                </div>
                <h2 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors">
                  {legend.displayName}
                </h2>
                <p className="text-sm text-[#A8A8B3] mt-2 line-clamp-2">{legend.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm text-[#F2CA50]">
                  View Skills <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
