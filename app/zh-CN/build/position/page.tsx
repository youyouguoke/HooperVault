"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ChevronRight, Users, Zap, Shield, Target, ArrowUpRight } from "lucide-react";

const positions = [
  {
    id: "PG",
    name: "控球后卫",
    role: "组织者",
    description: "球场指挥官。 elite 传球、控球和速度。",
    strengths: ["传球", "控球", "速度"],
    weakness: "内线防守",
    icon: Zap,
  },
  {
    id: "SG",
    name: "得分后卫",
    role: "得分手",
    description: "外线威胁。 strong 投射和无球跑动。",
    strengths: ["三分", "中距离", "速度"],
    weakness: "篮板",
    icon: Target,
  },
  {
    id: "SF",
    name: "小前锋",
    role: "全能侧翼",
    description: "瑞士军刀。 balanced 得分、防守和运动能力。",
    strengths: ["终结", "外线防守", "速度"],
    weakness: "组织",
    icon: ArrowUpRight,
  },
  {
    id: "PF",
    name: "大前锋",
    role: "内线力量",
    description: " hybrid 内线。 strong 终结、篮板和内线防守。",
    strengths: ["篮板", "内线防守", "力量"],
    weakness: "控球",
    icon: Users,
  },
  {
    id: "C",
    name: "中锋",
    role: "护框者",
    description: "防守支柱。 elite 护框、篮板和力量。",
    strengths: ["盖帽", "篮板", "力量"],
    weakness: "速度",
    icon: Shield,
  },
];

export default function PositionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111317]" />}>
      <PositionPageInner />
    </Suspense>
  );
}

function PositionPageInner() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "classic";
  const team = searchParams.get("team") || "";
  const seed = searchParams.get("seed") || "20260805";

  const buildHref = (positionId: string) => {
    const params = new URLSearchParams();
    params.set("position", positionId);
    params.set("mode", mode);
    if (team) params.set("team", team);
    params.set("seed", seed);
    return `/zh-CN/build/draft?${params.toString()}`;
  };

  return (
    <>
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-8">
        <div className="stadium-glow" />
        <Container>
          <div className="text-center max-w-2xl mx-auto relative z-10">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">
              第 3 步（共 5 步）
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl text-white uppercase tracking-wide mb-4">
              选择你的位置
            </h1>
            <p className="text-lg text-[#A8A8B3]">
              你的位置是构建的基础。
            </p>
          </div>
        </Container>
      </div>

      <Section className="relative">
        <Container>
          <div className="grid gap-4 max-w-5xl mx-auto">
            {positions.map((pos) => (
              <Link
                key={pos.id}
                href={buildHref(pos.id)}
                className="group glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:bg-white/5 hover:border-[#F2CA50]/30 transition-all duration-300"
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F2CA50]/20 to-[#FF5E07]/10 border border-[#F2CA50]/20">
                  <span className="font-[family-name:var(--font-anton)] text-3xl text-[#F2CA50]">{pos.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors">
                      {pos.name}
                    </h2>
                    <span className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-wider px-2 py-1 rounded bg-[#F2CA50]/10 text-[#F2CA50] border border-[#F2CA50]/20">
                      {pos.role}
                    </span>
                  </div>
                  <p className="text-[#A8A8B3] mb-4">{pos.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {pos.strengths.map((s) => (
                      <span key={s} className="text-xs font-medium text-white bg-[#1a1c20] px-2 py-1 rounded">
                        {s}
                      </span>
                    ))}
                    <span className="text-xs font-medium text-[#A8A8B3] bg-[#1a1c20] px-2 py-1 rounded">
                      弱点: {pos.weakness}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 self-end md:self-center">
                  <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#F2CA50] group-hover:border-[#F2CA50] transition-colors">
                    <ChevronRight className="h-5 w-5 text-white group-hover:text-[#0B0B12] transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
