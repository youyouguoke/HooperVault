import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FeaturedHoopers } from "@/components/leaderboard/FeaturedHoopers";
import {
  Trophy,
  Users,
  Calendar,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Flame,
} from "lucide-react";

export const metadata: Metadata = {
  title: "打造你的传奇",
  description:
    "融合传奇篮球技能，创建你的梦想 Hooper，模拟整个职业生涯，并与世界分享你的独特传奇。",
};

function FeaturedPlayerCard() {
  return (
    <div className="legendary-card rounded-xl p-4 w-full max-w-md transform rotate-y-[-10deg] hover:rotate-y-0 transition-transform duration-500 hover:scale-105 cursor-pointer perspective-1000 mx-auto">
      <div className="relative h-80 rounded-lg overflow-hidden mb-4 border border-white/10 bg-gradient-to-br from-[#333539] to-[#1a1c20]">
        <img
          src="/images/hero-card.jpg"
          alt="一张高度细致的未来风篮球运动员扣篮插画，配有戏剧性的场馆灯光。"
          className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
        />
        <div className="absolute top-4 right-4 bg-[#333539]/90 backdrop-blur border border-[#F2CA50]/50 text-[#F2CA50] font-[family-name:var(--font-space-grotesk)] text-2xl font-bold px-3 py-1 rounded">
          98
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide">Orion Steele</h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="bg-[#333539] text-[#D0C5AF] font-[family-name:var(--font-space-grotesk)] text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded">组织者</span>
            <span className="bg-[#F2CA50]/20 text-[#F2CA50] font-[family-name:var(--font-space-grotesk)] text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded border border-[#F2CA50]/30">传奇级别</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
          {[
            { label: "得分", value: 95 },
            { label: "防守", value: 88 },
            { label: "速度", value: 92 },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#1a1c20] p-2 rounded flex flex-col items-center">
              <span className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-wider text-[#A8A8B3]">{stat.label}</span>
              <span className={`font-[family-name:var(--font-space-grotesk)] text-2xl font-bold ${stat.label === "防守" ? "text-[#6CB9FF]" : "text-[#F2CA50]"}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        <div className="stadium-glow" />
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 min-h-[600px]">
            <div className="flex-1 space-y-6 md:space-y-8 z-10 text-center md:text-left">
              <h1 className="font-[family-name:var(--font-anton)] text-5xl sm:text-6xl lg:text-7xl text-white uppercase leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F2CA50] to-[#FF5E07]">
                打造你的传奇
              </h1>
              <p className="font-[family-name:var(--font-hanken-grotesk)] text-lg md:text-xl text-[#A8A8B3] max-w-xl mx-auto md:mx-0 leading-relaxed">
                融合传奇篮球技能，创建你的梦想 Hooper，模拟整个职业生涯，并与世界分享你的独特传奇。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Button asChild href="/zh-CN/build/mode" variant="secondary" size="xl">
                  <span className="flex items-center gap-2">
                    开始构建 <ChevronRight className="h-5 w-5" />
                  </span>
                </Button>
                <Button asChild href="/zh-CN/leaderboard" variant="outline" size="xl">
                  <span className="flex items-center gap-2">
                    探索 Hoopers <Users className="h-5 w-5" />
                  </span>
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4 text-sm text-[#A8A8B3]">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#F2CA50]" />
                  <span>3 分钟构建</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#F2CA50]" />
                  <span>82 场赛季模拟</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-[#F2CA50]" />
                  <span>分享结果</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center z-10 w-full">
              <FeaturedPlayerCard />
            </div>
          </div>
        </Container>
      </section>

      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide">如何运作</h2>
            <p className="mt-4 text-[#A8A8B3]">只需三个简单步骤创建你的 Hooper</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "选择传奇",
                desc: "在 13 个属性中抽取受篮球传奇启发的技能。",
                icon: Users,
              },
              {
                step: "02",
                title: "构建球员",
                desc: "选择位置，平衡优势，发现你的球风。",
                icon: Sparkles,
              },
              {
                step: "03",
                title: "创造传奇",
                desc: "模拟 82 场赛季，冲击 MVP、冠军或名人堂地位。",
                icon: Trophy,
              },
            ].map((item) => (
              <div key={item.step} className="glass-card rounded-xl p-8 text-center hover:bg-white/5 transition-colors">
                <div className="font-[family-name:var(--font-anton)] text-5xl text-[#F2CA50]/30 mb-4">{item.step}</div>
                <item.icon className="h-8 w-8 text-[#F2CA50] mx-auto mb-4" />
                <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-2">{item.title}</h3>
                <p className="text-[#A8A8B3] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide">精选 Hooper</h2>
              <p className="mt-2 text-[#A8A8B3]">社区中最令人印象深刻的构建</p>
            </div>
            <Link href="/zh-CN/leaderboard" className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#F2CA50] hover:text-[#F2CA50]/80 transition-colors">
              查看排行榜 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <FeaturedHoopers lang="zh-CN" />
          <div className="mt-6 md:hidden">
            <Button asChild href="/zh-CN/leaderboard" variant="outline" fullWidth>
              <span>查看排行榜</span>
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="glass-card rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF5E07]/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="h-5 w-5 text-[#FF5E07]" />
                <span className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#FF5E07] font-bold">每日挑战</span>
              </div>
              <h2 className="font-[family-name:var(--font-anton)] text-2xl md:text-3xl text-white uppercase tracking-wide mb-2">今日挑战</h2>
              <p className="text-[#A8A8B3] mb-4">Seed #20260805 &middot; 234 名玩家已加入</p>
              <p className="text-white font-medium">在没有精英投射的情况下打造一名冠军控球后卫。</p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button asChild href="/zh-CN/challenge" variant="secondary" size="lg">
                <span className="flex items-center gap-2">
                  挑战试试 <Calendar className="h-5 w-5" />
                </span>
              </Button>
              <Button asChild href="/zh-CN/guides" variant="outline" size="lg">
                <span>指南</span>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide mb-4">准备好构建你的 Hooper 了吗？</h2>
            <p className="text-lg text-[#A8A8B3] mb-8">
              数百万种组合。一个传奇。3 分钟内开启你的旅程。
            </p>
            <Button asChild href="/zh-CN/build/mode" variant="primary" size="xl">
              <span className="flex items-center justify-center gap-2">
                立即开始构建 <ChevronRight className="h-5 w-5" />
              </span>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
