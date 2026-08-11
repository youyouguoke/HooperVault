"use client";

import { ChevronRight, Star, Target, Shield, Zap, Brain, Flame } from "lucide-react";
import { SeoPageHeader, SeoSection, RelatedLinks } from "@/components/seo/SeoPage";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { LEGENDS } from "@/data/legends";
import type { LegendSkillPage } from "@/data/seo-content";
import { BUILDS, ARCHETYPES } from "@/data/seo-content";

const ICONS: Record<string, typeof Star> = {
  Mental: Brain,
  Playmaking: Zap,
  Interior: Flame,
  Defense: Shield,
  Shooting: Target,
};

const UI = {
  category: { en: "Skill Category", "zh-CN": "技能类别" },
  inspiration: { en: "Inspiration", "zh-CN": "灵感来源" },
  skills: { en: "Signature Skills", "zh-CN": "招牌技能" },
  draftThese: { en: "Draft These Skills", "zh-CN": "抽取这些技能" },
  relatedBuilds: { en: "Related Builds", "zh-CN": "相关构建" },
  relatedArchetypes: { en: "Related Archetypes", "zh-CN": "相关球风" },
  disclaimer: { en: "HooperVault is an independent fan-made project. Player names and skill references are used for entertainment and informational purposes only and do not imply official endorsement.", "zh-CN": "HooperVault 是独立粉丝项目。球员名称及技能参考仅用于娱乐和信息展示，不代表官方背书。" },
};

function t(key: keyof typeof UI, lang: "en" | "zh-CN"): string {
  return UI[key][lang];
}

export function LegendSkillPageComponent({ legend, lang }: { legend: LegendSkillPage; lang: "en" | "zh-CN" }) {
  const isZh = lang === "zh-CN";
  const displayName = isZh ? legend.displayNameZh : legend.displayName;
  const description = isZh ? legend.descriptionZh : legend.description;
  const category = isZh ? legend.categoryZh : legend.category;
  const inspiration = isZh ? legend.inspirationNoteZh : legend.inspirationNote;
  const Icon = ICONS[legend.category] || Star;

  const legendData = LEGENDS.find((l) => l.id === legend.id);
  const skills = legendData?.skills || [];

  const ctaHref = `/${lang}/build/team?mode=classic`;

  const relatedBuildLinks = BUILDS.slice(0, 4).map((b) => ({
    href: `/${lang}/builds/${b.slug}`,
    label: isZh ? b.titleZh : b.title,
  }));

  const relatedArchetypeLinks = ARCHETYPES.slice(0, 3).map((a) => ({
    href: `/${lang}/archetypes/${a.id}`,
    label: isZh ? a.nameZh : a.name,
  }));

  return (
    <>
      <SeoPageHeader title={`${displayName}`} subtitle={description} ctaHref={ctaHref} ctaLabel={t("draftThese", lang)} lang={lang} />

      <SeoSection>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <div className="h-20 w-20 rounded-2xl bg-[#F2CA50]/10 border border-[#F2CA50]/20 flex items-center justify-center mb-4">
              <Icon className="h-10 w-10 text-[#F2CA50]" />
            </div>
            <h2 className="font-[family-name:var(--font-anton)] text-3xl text-white uppercase tracking-wide mb-2">{displayName}</h2>
            <p className="text-[#A8A8B3]">{category}</p>
          </div>

          <div className="glass-card rounded-2xl p-8 flex flex-col justify-center">
            <div className="text-[10px] uppercase tracking-widest text-[#A8A8B3] mb-2">{t("category", lang)}</div>
            <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#F2CA50] mb-6">{category}</div>
            <div className="text-[10px] uppercase tracking-widest text-[#A8A8B3] mb-2">{t("inspiration", lang)}</div>
            <p className="text-[#A8A8B3] leading-relaxed">{inspiration}</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-6 flex items-center gap-2">
            <Star className="h-5 w-5 text-[#F2CA50]" /> {t("skills", lang)}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-[#1a1c20]/50 rounded-xl p-4 border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-white">{skill.name}</h3>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${
                    skill.rarity === "legendary" ? "bg-[#F2CA50]/10 text-[#F2CA50] border border-[#F2CA50]/30" :
                    skill.rarity === "epic" ? "bg-[#6CB9FF]/10 text-[#6CB9FF] border border-[#6CB9FF]/30" :
                    "bg-white/5 text-[#A8A8B3] border border-white/10"
                  }`}>{skill.rarity}</span>
                </div>
                <p className="text-sm text-[#A8A8B3]">{skill.description}</p>
                <div className="mt-2 text-sm text-[#F2CA50]">+{skill.bonus} {skill.attribute.replace(/_/g, " ")}</div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button asChild href={ctaHref} variant="primary" size="lg">
              <span className="flex items-center justify-center gap-2" onClick={() => trackEvent("start_build", { source: "legend_skill_page", legend: legend.id, lang })}>
                {t("draftThese", lang)} <ChevronRight className="h-5 w-5" />
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
              {t("relatedArchetypes", lang)}
            </h3>
            <RelatedLinks links={relatedArchetypeLinks} lang={lang} />
          </div>
        </div>

        <p className="mt-12 text-xs text-[#A8A8B3]/60 text-center">{t("disclaimer", lang)}</p>
      </SeoSection>
    </>
  );
}
