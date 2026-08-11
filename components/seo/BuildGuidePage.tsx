"use client";

import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SeoPageHeader, SeoSection, RelatedLinks } from "@/components/seo/SeoPage";
import type { BuildTarget } from "@/data/seo-content";
import { ARCHETYPES, LEGEND_SKILL_PAGES } from "@/data/seo-content";
import { ATTRIBUTES, type Attribute } from "@/data/legends";
import { trackEvent } from "@/lib/analytics";

const ATTRIBUTE_LABELS: Record<Attribute, string> = {
  shooting: "3PT",
  mid_range: "Mid",
  finishing: "Finishing",
  dunk: "Dunk",
  passing: "Passing",
  ball_handle: "Handle",
  perimeter_defense: "Perim D",
  interior_defense: "Interior D",
  block: "Block",
  rebound: "Rebound",
  speed: "Speed",
  strength: "Strength",
  clutch: "Clutch",
};

const UI = {
  potential: { en: "Potential OVR", "zh-CN": "潜力总评" },
  position: { en: "Position", "zh-CN": "位置" },
  archetype: { en: "Archetype", "zh-CN": "球风" },
  attributeProfile: { en: "Attribute Profile", "zh-CN": "属性配置" },
  recommendedSkills: { en: "Recommended Skills", "zh-CN": "推荐技能" },
  howToBuild: { en: "How to Build This Hooper", "zh-CN": "如何构建这个 Hooper" },
  tryThisBuild: { en: "Try This Build", "zh-CN": "试试这个构建" },
  relatedArchetypes: { en: "Related Archetypes", "zh-CN": "相关球风" },
  relatedLegends: { en: "Related Legend Skills", "zh-CN": "相关传奇技能" },
  disclaimer: { en: "Player names and skill references are used for entertainment and informational purposes only.", "zh-CN": "球员名称及技能参考仅用于娱乐和信息展示。" },
};

function t(key: keyof typeof UI, lang: "en" | "zh-CN"): string {
  return UI[key][lang];
}

export function BuildGuidePage({ build, lang }: { build: BuildTarget; lang: "en" | "zh-CN" }) {
  const isZh = lang === "zh-CN";
  const title = isZh ? build.titleZh : build.title;
  const description = isZh ? build.descriptionZh : build.description;
  const archetype = isZh ? build.archetypeZh : build.archetype;
  const position = isZh ? build.positionZh : build.position;
  const summary = isZh ? build.summaryZh : build.summary;

  const attributeBars = (Object.entries(build.targetAttrs) as [Attribute, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([attr, value]) => ({ attr, label: ATTRIBUTE_LABELS[attr], value }));

  const ctaHref = `/${lang}/build/team?mode=classic`;

  const relatedArchetypeLinks = ARCHETYPES.slice(0, 3).map((a) => ({
    href: `/${lang}/archetypes/${a.id}`,
    label: isZh ? a.nameZh : a.name,
  }));

  const relatedLegendLinks = LEGEND_SKILL_PAGES.slice(0, 3).map((l) => ({
    href: `/${lang}/legends/${l.id}`,
    label: isZh ? l.displayNameZh : l.displayName,
  }));

  return (
    <>
      <SeoPageHeader
        title={title}
        subtitle={description}
        ctaHref={ctaHref}
        ctaLabel={t("tryThisBuild", lang)}
        lang={lang}
      />

      <SeoSection>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-[10px] uppercase tracking-widest text-[#A8A8B3] mb-2">{t("position", lang)}</div>
            <div className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#F2CA50]">{position}</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-[10px] uppercase tracking-widest text-[#A8A8B3] mb-2">{t("archetype", lang)}</div>
            <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">{archetype}</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-[10px] uppercase tracking-widest text-[#A8A8B3] mb-2">{t("potential", lang)}</div>
            <div className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#F2CA50]">{build.potentialOvr}+</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-6">
              {t("attributeProfile", lang)}
            </h2>
            <div className="space-y-4">
              {attributeBars.map(({ attr, label, value }) => (
                <div key={attr} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#A8A8B3]">{label}</span>
                    <span className="font-bold text-white">{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#F2CA50]"
                      style={{ width: `${Math.min(value, 99)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-6">
              {t("recommendedSkills", lang)}
            </h2>
            <ul className="space-y-3">
              {build.recommendedSkills.map((skillId) => {
                // Map skill IDs to readable names (best-effort)
                const nameMap: Record<string, string> = {
                  "deep-range": "Deep Range",
                  "clutch-shooter": "Clutch Shooter",
                  "off-ball-gravity": "Off-Ball Gravity",
                  "basketball-iq": "Basketball IQ",
                  "mamba-mentality": "Mamba Mentality",
                  "mamba-focus": "Mamba Focus",
                  "perimeter-lock": "Perimeter Lock",
                  "midrange-mastery": "Midrange Mastery",
                  "backboard-breaker": "Backboard Breaker",
                  "post-presence": "Post Presence",
                  "footwork-master": "Footwork Master",
                  "fundamental-d": "Fundamental Defense",
                  "rim-protector": "Rim Protector",
                  "rebound-machine": "Rebound Machine",
                  "court-vision": "Court Vision",
                  "no-look-pass": "No-Look Pass",
                };
                return (
                  <li key={skillId} className="flex items-center gap-3 bg-[#1a1c20]/50 p-3 rounded-lg border border-white/5">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50]" />
                    <span className="text-white">{nameMap[skillId] || skillId}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-8 glass-card rounded-2xl p-6 md:p-8">
          <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">
            {t("howToBuild", lang)}
          </h2>
          <p className="text-[#A8A8B3] text-lg leading-relaxed">{summary}</p>
          <div className="mt-6">
            <Button asChild href={ctaHref} variant="primary" size="lg">
              <span className="flex items-center justify-center gap-2" onClick={() => trackEvent("start_build", { source: "build_guide", build: build.slug, lang })}>
                {t("tryThisBuild", lang)} <ChevronRight className="h-5 w-5" />
              </span>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-4">
              {t("relatedArchetypes", lang)}
            </h3>
            <RelatedLinks links={relatedArchetypeLinks} lang={lang} />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-4">
              {t("relatedLegends", lang)}
            </h3>
            <RelatedLinks links={relatedLegendLinks} lang={lang} />
          </div>
        </div>

        <p className="mt-12 text-xs text-[#A8A8B3]/60 text-center">{t("disclaimer", lang)}</p>
      </SeoSection>
    </>
  );
}
