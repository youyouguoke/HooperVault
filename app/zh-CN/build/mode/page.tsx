import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Eye, EyeOff, Zap, ChevronRight, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "选择选秀模式 | HooperVault",
  description: "在 HooperVault 选择经典、盲选或混沌选秀模式，打造你的终极篮球球员。",
};

const modes = [
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
    badge: "P1",
    difficulty: "困难",
    href: "/zh-CN/build/team?mode=blind",
  },
  {
    id: "chaos",
    title: "混沌选秀",
    description: "意外的技能，意外的传奇。",
    details: "每轮都有随机修正，高风险、高回报、无限重玩价值。",
    icon: Zap,
    badge: "P1",
    difficulty: "狂野",
    href: "/zh-CN/build/team?mode=chaos",
  },
];

export default function ModePage() {
  return (
    <>
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-8">
        <div className="stadium-glow" />
        <Container>
          <div className="text-center max-w-2xl mx-auto relative z-10">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">
              Step 1 of 5
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl text-white uppercase tracking-wide mb-4">
              选择选秀模式
            </h1>
            <p className="text-lg text-[#A8A8B3]">
              你想怎样构建你的 Hooper？
            </p>
          </div>
        </Container>
      </div>

      <Section className="relative">
        <Container>
          <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
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
                    <span className="text-[#A8A8B3]">难度</span>
                    <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-white">{mode.difficulty}</span>
                  </div>
                  <Button
                    asChild
                    href={mode.href}
                    variant={mode.id === "classic" ? "primary" : "outline"}
                    fullWidth
                    size="lg"
                  >
                    <span className="flex items-center justify-center gap-2">
                      开始 {mode.title} <ChevronRight className="h-5 w-5" />
                    </span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

