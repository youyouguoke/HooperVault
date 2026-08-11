"use client";

import { ChevronRight, Swords, Shield, Zap, Target, Dices, Star, Sparkles } from "lucide-react";
import { SeoPageHeader, SeoSection, RelatedLinks } from "@/components/seo/SeoPage";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import type { Archetype } from "@/data/seo-content";
import { BUILDS, LEGEND_SKILL_PAGES } from "@/data/seo-content";

const ICONS: Record<string, typeof Swords> = {
  "two-way-superstar": Shield,
  "legendary-slasher": Swords,
  "floor-general": Zap,
  "splash-legend": Target,
  "rim-protector": Shield,
  "versatile-wing": Star,
};

const UI = {
  strengths: { en: "Strengths", "zh-CN": "优势" },
  weaknesses: { en: "Weaknesses", "zh-CN": "劣势" },
  keyAttributes: { en: "Key Attributes", "zh-CN": "核心属性" },
  recommendedPosition: { en: "Recommended Position", "zh-CN": "推荐位置" },
  potentialOvr: { en: "Potential OVR", "zh-CN": "潜力总评" },
  inspiration: { en: "Legendary Inspiration", "zh-CN": "传奇灵感" },
  buildThis: { en: "Build a {name}", "zh-CN": "打造{name}" },
  relatedBuilds: { en: "Related Builds", "zh-CN": "相关构建" },
  relatedLegends: { en: "Related Legend Skills", "zh-CN": "相关传奇技能" },
  disclaimer: { en: "Player names and skill references are used for entertainment and informational purposes only.", "zh-CN": "球员名称及技能参考仅用于娱乐和信息展示。" },
};

function t(key: keyof typeof UI, lang: "en" | "zh-CN"): string {
  return UI[key][lang];
}

export function ArchetypePage({ archetype, lang }: { archetype: Archetype; lang: "en" | "zh-CN" }) {
  const isZh = lang === "zh-CN";
  const name = isZh ? archetype.nameZh : archetype.name;
  const description = isZh ? archetype.descriptionZh : archetype.description;
  const strengths = isZh ? archetype.strengthsZh : archetype.strengths;
  const weaknesses = isZh ? archetype.weaknessesZh : archetype.weaknesses;
  const position = isZh ? archetype.recommendedPositionZh : archetype.recommendedPosition;
  const Icon = ICONS[archetype.id] || Sparkles;

  const ctaHref = `/${lang}/build/team?mode=classic`;
  const ctaLabel = t("buildThis", lang).replace("{name}", name);

  const relatedBuildLinks = BUILDS.slice(0, 4).map((b) => ({
    href: `/${lang}/builds/${b.slug}`,
    label: isZh ? b.titleZh : b.title,
  }));

  const relatedLegendLinks = LEGEND_SKILL_PAGES.slice(0, 3).map((l) => ({
    href: `/${lang}/legends/${l.id}`,
    label: isZh ? l.displayNameZh : l.displayName,
  }));

  return (
    <>
      <SeoPageHeader title={name} subtitle={description} ctaHref={ctaHref} ctaLabel={ctaLabel} lang={lang} />

      <SeoSection>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <div className="h-20 w-20 rounded-2xl bg-[#F2CA50]/10 border border-[#F2CA50]/20 flex items-center justify-center mb-4">
              <Icon className="h-10 w-10 text-[#F2CA50]" />
            </div>
            <h2 className="font-[family-name:var(--font-anton)] text-3xl text-white uppercase tracking-wide mb-2">{name}</h2>
            <p className="text-[#A8A8B3]">{position}</p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#A8A8B3] mb-1">{t("recommendedPosition", lang)}</div>
                <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#F2CA50]">{position}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#A8A8B3] mb-1">{t("potentialOvr", lang)}</div>
                <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#F2CA50]">{archetype.potentialOvr}+</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#F2CA50]" /> {t("strengths", lang)}
            </h2>
            <ul className="space-y-3">
              {strengths.map((s) => (
                <li key={s} className="flex items-center gap-3 text-[#A8A8B3]">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#F2CA50]" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-6 flex items-center gap-2">
              <Target className="h-5 w-5 text-[#FF5E07]" /> {t("weaknesses", lang)}
            </h2>
            <ul className="space-y-3">
              {weaknesses.map((w) => (
                <li key={w} className="flex items-center gap-3 text-[#A8A8B3]">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#FF5E07]" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">
            {t("inspiration", lang)}
          </h2>
          <p className="text-[#A8A8B3] text-lg leading-relaxed">
            {isZh
              ? `${name} 球风灵感来源于篮球历史上一些最具代表性的球员所展现出的技术和比赛风格。`
              : `The ${name} archetype draws inspiration from the techniques and play styles seen across basketball history. It reflects the spirit of legendary players without claiming official affiliation.`}
          </p>
          <div className="mt-6">
            <Button asChild href={ctaHref} variant="primary" size="lg">
              <span className="flex items-center justify-center gap-2" onClick={() => trackEvent("start_build", { source: "archetype_page", archetype: archetype.id, lang })}>
                {ctaLabel} <ChevronRight className="h-5 w-5" />
              </span>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-4">
              {t("relatedBuilds", lang)}
            </h3>
            <RelatedLinks links={relatedBuildLinks} lang={lang} />
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
