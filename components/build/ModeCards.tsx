"use client";

import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, ChevronRight, Info } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type ModeDef = {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: typeof Eye;
  badge: string;
  difficulty: string;
  href: string;
};

const MODES_EN: ModeDef[] = [
  {
    id: "classic",
    title: "Classic Draft",
    description: "See your choices. Build with strategy.",
    details: "Pick legendary skills with full transparency. Perfect for first-time players and strategic builders.",
    icon: Eye,
    badge: "Recommended",
    difficulty: "Normal",
    href: "/en/build/team?mode=classic",
  },
  {
    id: "blind",
    title: "Blind Draft",
    description: "Choose by ability, not reputation.",
    details: "Legend names are hidden. Focus purely on skill bonuses and surprise synergies.",
    icon: EyeOff,
    badge: "Challenge",
    difficulty: "Hard",
    href: "/en/build/team?mode=blind",
  },
];

const MODES_ZH: ModeDef[] = [
  {
    id: "classic",
    title: "经典选秀",
    description: "看清选项，策略构建。",
    details: "透明地选择传奇技能。适合新手和喜欢策略规划的玩家。",
    icon: Eye,
    badge: "推荐",
    difficulty: "普通",
    href: "/zh-CN/build/team?mode=classic",
  },
  {
    id: "blind",
    title: "盲选选秀",
    description: "只看能力，不看名气。",
    details: "隐藏传奇姓名，只关注技能加成和惊喜协同。",
    icon: EyeOff,
    badge: "挑战",
    difficulty: "困难",
    href: "/zh-CN/build/team?mode=blind",
  },
];

const LABELS = {
  startPrefix: { en: "Start", zhCN: "开始" },
  difficulty: { en: "Difficulty", zhCN: "难度" },
};

export function ModeCards({ lang = "en" }: { lang?: "en" | "zh-CN" }) {
  const modes = lang === "zh-CN" ? MODES_ZH : MODES_EN;
  const diffLabel = lang === "zh-CN" ? LABELS.difficulty.zhCN : LABELS.difficulty.en;
  const startLabel = lang === "zh-CN" ? LABELS.startPrefix.zhCN : LABELS.startPrefix.en;

  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
      {modes.map((mode) => (
        <div
          key={mode.id}
          className={`glass-card rounded-2xl p-8 flex flex-col hover:bg-white/5 transition-all duration-300 ${
            mode.id === "classic"
              ? "border-[#F2CA50]/30 shadow-[0_0_30px_rgba(242,202,80,0.08)]"
              : ""
          }`}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="h-14 w-14 rounded-xl bg-[#F2CA50]/10 border border-[#F2CA50]/20 flex items-center justify-center">
              <mode.icon className="h-7 w-7 text-[#F2CA50]" />
            </div>
            <span className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-wider px-2 py-1 rounded bg-[#1a1c20] text-[#A8A8B3]">
              {mode.badge}
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-2">
            {mode.title}
          </h2>
          <p className="text-[#A8A8B3] mb-4">{mode.description}</p>
          <div className="flex items-center gap-2 text-sm text-[#F2CA50] mb-6">
            <Info className="h-4 w-4" />
            <span>{mode.details}</span>
          </div>
          <div className="mt-auto space-y-4">
            <div className="flex items-center justify-between text-sm border-t border-white/8 pt-4">
              <span className="text-[#A8A8B3]">{diffLabel}</span>
              <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-white">{mode.difficulty}</span>
            </div>
            <Button
              asChild
              href={mode.href}
              variant={mode.id === "classic" ? "primary" : "outline"}
              fullWidth
              size="lg"
            >
              <span
                className="flex items-center justify-center gap-2"
                onClick={() => {
                  trackEvent("start_build", { mode: mode.id, lang });
                }}
              >
                {startLabel} {mode.title} <ChevronRight className="h-5 w-5" />
              </span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
