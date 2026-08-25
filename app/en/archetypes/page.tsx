import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JsonLd, buildBreadcrumbList, buildItemListSchema } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { ARCHETYPES } from "@/data/seo-content";

export const metadata: Metadata = {
  title: "Archetypes",
  description: "Explore every basketball archetype in HooperVault. Splash Legend, Floor General, Rim Protector, Two-Way Superstar and more.",
  alternates: {
    canonical: "/en/archetypes",
    languages: {
      en: "/en/archetypes",
      "zh-CN": "/zh-CN/archetypes",
      "x-default": "/en/archetypes",
    },
  },
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "Archetypes",
    description: "Explore every basketball archetype in HooperVault. Splash Legend, Floor General, Rim Protector, Two-Way Superstar and more.",
    url: "/en/archetypes",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
};

const ICONS = {
  "two-way-superstar": "🛡️",
  "legendary-slasher": "⚔️",
  "floor-general": "⚡",
  "splash-legend": "🎯",
  "rim-protector": "🧱",
  "versatile-wing": "⭐",
};

export default function ArchetypesIndexPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([{ name: "Home", href: "/en" }, { name: "Archetypes", href: "/en/archetypes" }])} />
      <JsonLd data={buildItemListSchema(ARCHETYPES.map(a => ({ name: a.name, url: `/en/archetypes/${a.id}` })))} />
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-10">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">
              Play Styles
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide mb-4">
              Archetypes
            </h1>
            <p className="text-lg text-[#A8A8B3]">
              Discover the identity your Hooper can become.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ARCHETYPES.map((archetype) => (
              <Link
                key={archetype.id}
                href={`/en/archetypes/${archetype.id}`}
                className="group glass-card rounded-2xl p-6 hover:bg-white/5 transition-all"
              >
                <div className="text-3xl mb-3">{ICONS[archetype.id as keyof typeof ICONS] || "🏀"}</div>
                <h2 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors">
                  {archetype.name}
                </h2>
                <p className="text-sm text-[#A8A8B3] mt-2 line-clamp-2">{archetype.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm text-[#F2CA50]">
                  View Archetype <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
