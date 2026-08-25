import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JsonLd, buildBreadcrumbList, buildFAQSchema, buildHowToSchema } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "指南",
  description: "学习如何草拟传奇技能、打造梦想篮球球员、模拟82场比赛赛季并分享你的传奇。HooperVault 完整新手指南。",
  keywords: ["hoopervault 指南", "篮球构建指南", "如何打造 hooper", "草拟指南", "篮球模拟器指南"],
  alternates: {
    canonical: "/zh-CN/guides",
    languages: { en: "/en/guides", "zh-CN": "/zh-CN/guides", "x-default": "/en/guides" },
  },
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "指南",
    description: "学习如何草拟传奇技能、打造梦想篮球球员、模拟82场比赛赛季并分享你的传奇。",
    url: "/zh-CN/guides",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "zh_CN",
  },
};

export default function GuidesPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([{ name: "首页", href: "/zh-CN" }, { name: "指南", href: "/zh-CN/guides" }])} />
      <JsonLd data={buildHowToSchema(
        "如何在 HooperVault 打造你的 Hooper",
        "通过5个简单步骤创建你的梦想篮球球员：草拟技能、选择模式、读取球风、模拟赛季、分享传奇。",
        [
          { name: "选择传奇", text: "草拟13个传奇技能，涵盖投射、终结、组织、防守和心理五大属性。" },
          { name: "选择模式", text: "经典模式显示所有属性评分，盲选模式隐藏评分纯靠球员名字和篮球知识。" },
          { name: "读取球风", text: "13轮草拟后获得你的球风身份，如水花传奇、场上将军或禁飞区守护者。" },
          { name: "模拟赛季", text: "运行82场赛季赛程，对阵生成对手，赢得比赛、建立连胜、冲击四轮季后赛冲击总冠军。" },
          { name: "分享传奇", text: "获取永久分享页面，包含属性、赛季统计、季后赛旅程、奖项和故事。可下载卡片图片分享到社交媒体。" },
        ]
      )} />
      <JsonLd data={buildFAQSchema([
        { question: "什么是 HooperVault？", answer: "HooperVault 是一个免费的篮球构建模拟器，你可以草拟受 NBA 传奇启发的传奇技能，创建自定义球员，模拟82场赛季，并分享你独特的传奇卡片。" },
        { question: "我需要草拟多少个技能？", answer: "你需要草拟13个技能，涵盖投射、终结、组织、防守和心理五大类别。每个技能都会增加特定属性分数并影响你的球风。" },
        { question: "经典模式和盲选模式有什么区别？", answer: "经典模式显示所有属性评分，让你精确优化。盲选模式隐藏评分，纯粹靠技能名和篮球知识草拟。两种模式解锁相同的球风。" },
        { question: "什么是球风？", answer: "球风是根据你的13个技能选择确定的构建身份。例如水花传奇（精英射手）、场上将军（组织者）和禁飞区守护者（防守核心）。每个球风解锁特定徽章。" },
        { question: "可以分享我的构建吗？", answer: "当然！每个构建都有一个永久可分享页面，包含完整传奇卡片——属性、赛季统计、季后赛结果、奖项和故事。还可以下载卡片图片发到社交媒体。" },
      ])} />
      <Section className="relative border-b border-white/8 bg-[#111317] pt-16 pb-12 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-[position:30%_70%] opacity-40"
          style={{ backgroundImage: "url('/images/guides-bg.jpg')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111317]/40 via-[#111317]/60 to-[#111317]" />
        <Container>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">玩转 Vault</p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase tracking-wide mb-6">指南</h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed">你需要知道的一切：如何更聪明地选秀、构建更强的球员、并模拟出一个传奇赛季。</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto grid gap-10">
            <GuideItem number="01" title="选秀机制" body="你有 13 次选择机会。每次选择都会给对应属性增加点数。技能的顺序与组合将决定你的最终评分、球风和故事。" />
            <GuideItem number="02" title="选择模式" body="经典模式提供平衡的选秀环境，完整展示所有数值。盲选模式隐藏数值，考验你对技能名字和直觉的信任。两种模式解锁相同的球风——区别在于你的选秀方式。" />
            <GuideItem number="03" title="读懂球风" body="13 轮结束后，你会获得一个球风身份，例如攻防巨星、水花传奇或场上将军。这决定了你能解锁哪些名人堂徽章。" />
            <GuideItem number="04" title="模拟赛季" body="82 场常规赛检验你的构建。胜利、宿敌对决和连胜都会写入你的 Hooper 传奇。进入季后赛，经历四轮淘汰赛争夺总冠军。" />
            <GuideItem number="05" title="分享传奇" body="每个构建都会获得一个永久结果页，展示完整的传奇卡——属性、赛季数据、季后赛旅程、荣誉和故事。复制链接分享，或下载卡片图片发到任何平台。" />
          </div>
        </Container>
      </Section>

      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-6 text-center">探索更多</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <ExploreCard href="/zh-CN/builds" title="构建指南" body="20 套优化构建，含推荐技能和属性目标。" />
              <ExploreCard href="/zh-CN/archetypes" title="球风" body="发现你的 Hooper 可以成为的每一种打法身份。" />
              <ExploreCard href="/zh-CN/legends" title="传奇技能" body="按类别和灵感浏览所有传奇技能。" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ExploreCard({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="group glass-card rounded-2xl p-6 hover:bg-white/5 transition-all block">
      <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors mb-2">{title}</h3>
      <p className="text-sm text-[#A8A8B3] mb-4">{body}</p>
      <span className="inline-flex items-center gap-1 text-sm text-[#F2CA50]">查看 <ChevronRight className="h-4 w-4" /></span>
    </Link>
  );
}

function GuideItem({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="glass-card rounded-xl p-6 md:p-8">
      <div className="flex items-start gap-5">
        <span className="font-[family-name:var(--font-anton)] text-3xl text-[#F2CA50]">{number}</span>
        <div>
          <h2 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-2">{title}</h2>
          <p className="text-[#A8A8B3] leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  );
}
