import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd, buildBreadcrumbList, buildFAQSchema, buildArticleSchema, buildHowToSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Build a Bucket NBA 游戏 | HooperVault",
  description:
    "免费畅玩 Build a Bucket NBA 游戏。选秀篮球传奇球星，窃取他们的技能，打造你的自定义球员，模拟 82 场赛季。",
  keywords: [
    "build a bucket NBA game",
    "build a bucket 游戏",
    "创建球员",
    "NBA 球员构建器",
    "篮球球员构建器",
    "自定义篮球球员",
    "篮球技能",
    "篮球传奇",
    "82 场赛季",
    "篮球赛季模拟器",
  ],
  alternates: {
    canonical: "/zh-CN/build-a-bucket-nba-game",
    languages: {
      en: "/en/build-a-bucket-nba-game",
      "zh-CN": "/zh-CN/build-a-bucket-nba-game",
      "x-default": "/en/build-a-bucket-nba-game",
    },
  },
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "Build a Bucket NBA 游戏 | HooperVault",
    description:
      "免费畅玩 Build a Bucket NBA 游戏。选秀篮球传奇球星，窃取他们的技能，打造你的自定义球员，模拟 82 场赛季。",
    url: "/zh-CN/build-a-bucket-nba-game",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "zh_CN",
  },
};

const faqs = [
  {
    question: "什么是 Build a Bucket NBA 游戏？",
    answer:
      "Build a Bucket NBA 游戏是一款篮球球员构建游戏，你可以通过选秀传奇篮球球星并选择他们的技能来创建自定义球员。HooperVault 让你构建球员并在 82 场赛季中测试结果。",
  },
  {
    question: "我能创建 NBA 风格的球员吗？",
    answer:
      "当然可以。HooperVault 让你在 13 轮选秀中选择传奇球星的技能，打造自定义 NBA 风格篮球球员。",
  },
  {
    question: "这是免费的 Build a Bucket NBA 游戏吗？",
    answer:
      "是的。HooperVault 完全免费，可直接在浏览器中游玩。你可以构建篮球球员、选秀传奇技能，并运行完整的赛季模拟。",
  },
  {
    question: "篮球球员构建器怎么玩？",
    answer:
      "每轮你会看到一支传奇篮球队和可选球员。选择一位球员，窃取一项技能，继续构建你的 Hooper，直到 13 项技能全部完成。",
  },
  {
    question: "可以选择多少项技能？",
    answer:
      "你的 Hooper 通过 13 项篮球技能构建，涵盖得分、组织、防守、篮板、运动能力、力量和关键时刻表现。",
  },
  {
    question: "构建球员之后会发生什么？",
    answer:
      "你的自定义篮球球员将进入 82 场赛季模拟。你可以查看赛季战绩、统计数据、季后赛结果和最终球员评分。",
  },
  {
    question: "最佳篮球球员构建是什么？",
    answer:
      "没有单一的最佳构建。最强的 Hooper 取决于选秀中可用的技能以及这些技能在整个赛季中的协同效果。",
  },
  {
    question: "支持手机端吗？",
    answer:
      "支持。HooperVault 是一款浏览器篮球游戏，可在桌面端、平板和移动设备上运行。",
  },
];

const howToSteps = [
  {
    name: "抽选传奇球队",
    text: "每轮开始时会抽选一支传奇篮球队和一组可选球员。",
  },
  {
    name: "选择一位传奇球星",
    text: "选择技能组合最符合你构建目标的球员。",
  },
  {
    name: "窃取一项技能",
    text: "从你选择的传奇球星身上窃取一项篮球技能，添加到你的自定义球员上。",
  },
  {
    name: "模拟赛季",
    text: "完成全部 13 项技能选择后，将你的 Hooper 送入 82 场赛季，检验构建效果。",
  },
];

const skills = [
  { abbr: "3PT", name: "三分投射", group: "得分" },
  { abbr: "MID", name: "中距离", group: "得分" },
  { abbr: "FIN", name: "终结", group: "得分" },
  { abbr: "DNK", name: "扣篮", group: "得分" },
  { abbr: "HAN", name: "控球", group: "组织" },
  { abbr: "PAS", name: "传球", group: "组织" },
  { abbr: "PDEF", name: "外线防守", group: "防守" },
  { abbr: "IDEF", name: "内线防守", group: "防守" },
  { abbr: "BLK", name: "盖帽", group: "防守" },
  { abbr: "REB", name: "篮板", group: "篮板" },
  { abbr: "ATH", name: "运动能力", group: "身体" },
  { abbr: "STR", name: "力量", group: "身体" },
  { abbr: "CLU", name: "关键时刻", group: "心理" },
];

export default function BuildABucketNBAGameZhPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <JsonLd
        data={buildBreadcrumbList([
          { name: "首页", href: "/zh-CN" },
          { name: "Build a Bucket NBA 游戏", href: "/zh-CN/build-a-bucket-nba-game" },
        ])}
      />
      <JsonLd
        data={buildArticleSchema({
          title: "Build a Bucket NBA 游戏 — 创建你自己的篮球球员 | HooperVault",
          description:
            "选秀传奇篮球球星，窃取单项技能，构建自定义球员，并在完整 82 场赛季中测试。",
          url: "/zh-CN/build-a-bucket-nba-game",
        })}
      />
      <JsonLd data={buildFAQSchema(faqs)} />
      <JsonLd
        data={buildHowToSchema(
          "如何在 Build a Bucket NBA 游戏中构建球员",
          "选秀传奇篮球球星，每次窃取一项技能，打造你自己的自定义 Hooper 并参加 82 场赛季。",
          howToSteps
        )}
      />

      {/* ==================== 01 HERO ==================== */}
      <Section className="relative border-b border-white/8 bg-[#111317] pt-20 pb-16 overflow-hidden">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-4">
              免费篮球浏览器游戏
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase tracking-wide mb-6">
              Build a Bucket NBA 游戏
            </h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              选秀传奇篮球球星，每轮窃取一项技能，打造你自己的自定义 Hooper。然后让你的创作经历完整 82 场赛季的考验。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button asChild href="/en/build/mode" variant="primary" size="xl">
                <span className="flex items-center gap-2">
                  构建你的 Hooper <ChevronRight className="h-5 w-5" />
                </span>
              </Button>
              <Button asChild href="#how-it-works" variant="outline" size="xl">
                <span className="flex items-center gap-2">
                  玩法介绍 <ArrowRight className="h-5 w-5" />
                </span>
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { value: "13", label: "技能选择" },
                { value: "30", label: "传奇球队" },
                { value: "1", label: "每轮一项" },
                { value: "82", label: "场赛季" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
                  <div className="font-[family-name:var(--font-anton)] text-3xl text-[#F2CA50]">
                    {stat.value}
                  </div>
                  <div className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#A8A8B3] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 02 HOW IT WORKS ==================== */}
      <Section id="how-it-works">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide">
              Build a Bucket NBA 游戏怎么玩
            </h2>
            <p className="mt-4 text-[#A8A8B3] max-w-2xl mx-auto">
              从传奇选秀到赛季模拟，只需四步。每次选择都塑造你的自定义篮球球员。
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {howToSteps.map((step, i) => (
              <div
                key={step.name}
                className="glass-card rounded-xl p-6 hover:bg-white/5 transition-colors"
              >
                <div className="font-[family-name:var(--font-anton)] text-3xl text-[#F2CA50]/30 mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide mb-2">
                  {step.name}
                </h3>
                <p className="text-[#A8A8B3] text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ==================== 03 WHAT IS ==================== */}
      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-6">
              什么是 Build a Bucket NBA 游戏？
            </h2>
            <div className="space-y-4 text-[#A8A8B3] leading-relaxed">
              <p>
                Build a Bucket NBA 游戏是一款篮球游戏，你可以通过选择传奇球星的技能来创建自己的球员。与简单的滑块调整不同，你需要做出一系列选秀决策来塑造你的自定义篮球球员。
              </p>
              <p>
                在 HooperVault 中，你选秀篮球传奇球星，窃取单项技能，完成 13 轮构建，然后在整个 82 场赛季中测试你的球员。选秀中的每个决策都会影响你的自定义球员在关键时刻的表现。
              </p>
              <p>
                概念很简单：选秀板上的每位传奇篮球球星都有独特的技能组合。你选择技能符合你策略的传奇球星，窃取一项篮球技能，然后进入下一轮。13 轮之后，你的自定义 NBA 球员就准备好迎接赛季了。
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 04 BUILD A BUCKET VS BUILD A PLAYER ==================== */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-6">
              Build a Bucket vs Build a Player
            </h2>
            <div className="space-y-4 text-[#A8A8B3] leading-relaxed">
              <p>
                Build a Player 游戏通常专注于从大量选项中创建自定义角色。Build a Bucket 游戏更强调篮球身份和得分能力。
              </p>
              <p>
                HooperVault 结合了两种理念。你通过选秀传奇球星和窃取单项技能来构建自定义篮球球员，然后发现你的构建是否能在整个赛季中真正发挥。
              </p>
              <p>
                这个区别很重要，因为 Build a Bucket 游戏迫使你思考篮球策略。你不是只选择评分最高的数据，而是选择能协同工作以创造球员身份的技能——得分手、组织者、攻防兼备的防守者，或全能型 Hooper。
              </p>
            </div>

            {/* Comparison */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-3">
                  Build a Player
                </h3>
                <ul className="space-y-2 text-[#A8A8B3] text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" />
                    <span>从大量选项中创建自定义角色</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" />
                    <span>侧重外观和角色选择</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" />
                    <span>基于滑块的数据分配</span>
                  </li>
                </ul>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-3">
                  Build a Bucket
                </h3>
                <ul className="space-y-2 text-[#A8A8B3] text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" />
                    <span>篮球身份与得分能力导向</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" />
                    <span>从传奇球星中做出策略性选秀决策</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" />
                    <span>在 82 场赛季模拟中接受检验</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 05 NBA PLAYER BUILDER ==================== */}
      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-6">
              NBA 球员构建器
            </h2>
            <div className="space-y-4 text-[#A8A8B3] leading-relaxed">
              <p>
                在找 NBA 球员构建器？HooperVault 让你无需手动调整数十个滑块就能创建 NBA 风格的球员。选秀传奇篮球球星，选择符合你策略的技能，看着你的 Hooper 在选秀中不断进化。
              </p>
              <p>
                每个篮球球员构建器都提供不同的创建方式。有些使用积分购买系统，有些使用预设模板。HooperVault 使用技能选秀，每次选择都来自真实的篮球传奇球星。你不只是在构建数据线——你是在借用 NBA 伟大球员的能力来创造一个完全属于你自己的自定义篮球球员。
              </p>
              <p>
                这个篮球球员构建器支持每种打法。无论你想创建外线射手、护筐中锋、传球优先的控球后卫还是突破型侧翼，选秀都能给你所需的工具来实现。82 场赛季随后检验你的 NBA 风格球员是否能撑得起这个构建。
              </p>
            </div>

            <div className="mt-8 text-center">
              <Button asChild href="/en/build/mode" variant="primary" size="lg">
                <span className="flex items-center gap-2">
                  开始构建你的球员 <ChevronRight className="h-5 w-5" />
                </span>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 06 INTERACTIVE PREVIEW ==================== */}
      <Section>
        <Container>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide">
              选秀预览
            </h2>
            <p className="mt-4 text-[#A8A8B3] max-w-2xl mx-auto">
              选秀就是这样运作的。每轮选择一位传奇球星，窃取一项技能。
            </p>
          </div>

          {/* Draft Mockup */}
          <div className="max-w-2xl mx-auto glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#A8A8B3]">
                构建你的 Hooper
              </span>
              <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-[#F2CA50]">
                第 4 轮 / 13
              </span>
            </div>

            <p className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide mb-4">
              选择你的传奇球星
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {["传奇 A", "传奇 B", "传奇 C"].map((name, i) => (
                <div
                  key={name}
                  className={`rounded-xl p-4 text-center border transition-colors ${
                    i === 1
                      ? "border-[#F2CA50]/50 bg-[#F2CA50]/10"
                      : "border-white/8 bg-white/5 hover:bg-white/8"
                  }`}
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-white/10 mb-2 flex items-center justify-center">
                    <span className="font-[family-name:var(--font-anton)] text-sm text-[#A8A8B3]">
                      {i === 1 ? "★" : "?"}
                    </span>
                  </div>
                  <span className="font-[family-name:var(--font-space-grotesk)] text-xs text-[#A8A8B3]">
                    {name}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-[family-name:var(--font-anton)] text-sm text-white uppercase tracking-wide mb-3">
              选择一项技能
            </p>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {["3PT", "MID", "FIN", "CLU"].map((skill, i) => (
                <div
                  key={skill}
                  className={`rounded-lg p-3 text-center border transition-colors ${
                    i === 0
                      ? "border-[#F2CA50]/50 bg-[#F2CA50]/10"
                      : "border-white/8 bg-white/5 hover:bg-white/8"
                  }`}
                >
                  <span className="font-[family-name:var(--font-anton)] text-sm text-white">
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            <Button asChild href="/en/build/mode" variant="primary" size="lg" className="w-full">
              <span className="flex items-center justify-center gap-2">
                继续 <ChevronRight className="h-5 w-5" />
              </span>
            </Button>
          </div>

          <div className="text-center mt-8">
            <Button asChild href="/en/build/mode" variant="primary" size="xl">
              <span className="flex items-center gap-2">
                开始构建你的球员 <ChevronRight className="h-5 w-5" />
              </span>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ==================== 07 13 SKILLS ==================== */}
      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide">
                构建你的自定义篮球球员
              </h2>
              <p className="mt-4 text-[#A8A8B3] max-w-2xl mx-auto">
                每个 Hooper 由 13 项篮球技能塑造。你的选择决定了你创建的球员类型以及该球员在赛季模拟中的表现。
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.abbr}
                  className="glass-card rounded-xl p-4 text-center hover:bg-white/5 transition-colors"
                >
                  <div className="font-[family-name:var(--font-anton)] text-xl text-[#F2CA50]">
                    {skill.abbr}
                  </div>
                  <div className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-widest text-[#A8A8B3] mt-1">
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { group: "得分", skills: "3PT, MID, FIN, DNK", desc: "你的球员在球场每个位置的得分能力。" },
                { group: "组织", skills: "HAN, PAS", desc: "创造投篮机会的能力。组织能力越高，模拟中获得的出手机会越好。" },
                { group: "防守", skills: "PDEF, IDEF, BLK", desc: "外线和内线防守，加上护筐。防守赢得关键时刻。" },
                { group: "篮板", skills: "REB", desc: "二次进攻和防守篮板。控制比赛节奏。" },
                { group: "身体", skills: "ATH, STR", desc: "速度、爆发力和力量。身体天赋放大其他所有技能。" },
                { group: "心理", skills: "CLU", desc: "关键时刻和季后赛压力下的表现。" },
              ].map((cat) => (
                <div key={cat.group} className="glass-card rounded-xl p-5">
                  <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-1">
                    {cat.group}
                  </h3>
                  <p className="text-xs text-white/60 font-[family-name:var(--font-space-grotesk)] mb-2">
                    {cat.skills}
                  </p>
                  <p className="text-sm text-[#A8A8B3] leading-relaxed">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 08 BUILD BETTER ==================== */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-6">
              构建更强的篮球球员
            </h2>
            <div className="space-y-4 text-[#A8A8B3] leading-relaxed">
              <p>
                评分最高的技能并不总是最佳选择。一个优秀的篮球球员需要不止一种方式来影响比赛。
              </p>
              <p>
                你可以构建精英得分手、攻防兼备的防守者、强力终结者或均衡全能球员。真正的考验在你的自定义球员进入 82 场赛季时到来。
              </p>
              <p>
                最佳篮球球员构建是每项技能都强化同一身份的构建。一个内部一致性完美的 92 综评构建，会胜过一个技能矛盾的 95 综评构建。思考篮球策略，而不仅仅是单个属性评分。
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mt-8">
              {[
                { title: "精英得分手", desc: "拉满 3PT、MID 和 FIN。加上 CLU 提升关键时刻表现。适合想要在进攻端统治比赛的玩家。" },
                { title: "攻防兼备", desc: "平衡 PDEF、IDEF、BLK 与足够的得分能力。防守优先的构建赢得季后赛系列赛。" },
                { title: "均衡全能", desc: "将选择分散到得分、组织和防守。没有让对手可以利用的明显弱点。" },
              ].map((build) => (
                <div key={build.title} className="glass-card rounded-xl p-5">
                  <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">
                    {build.title}
                  </h3>
                  <p className="text-sm text-[#A8A8B3] leading-relaxed">{build.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 09 82-GAME SEASON ==================== */}
      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-6">
              在 82 场赛季中测试你的球员
            </h2>
            <div className="space-y-4 text-[#A8A8B3] leading-relaxed">
              <p>
                你的构建在选秀结束时并没有真正完成。13 项技能选择后，你的自定义篮球球员进入完整的 82 场赛季。追踪胜负、球员数据、比赛结果和季后赛表现，发现你的构建是否真的有效。
              </p>
              <p>
                篮球赛季模拟器全面评估每个属性。一个无法自己创造投篮机会的得分手在面对好防守时会挣扎。一个不能得分的防守者会给队友施加过大压力。82 场赛季会暴露你构建中的每个优点和每个缺陷。
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { value: "82", label: "场比赛", sub: "完整赛季" },
                { value: "58–24", label: "战绩", sub: "第一种子" },
                { value: "季后赛", label: "4 轮", sub: "七场四胜" },
                { value: "冠军", label: "总决赛", sub: "赢得戒指" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-5 text-center">
                  <div className="font-[family-name:var(--font-anton)] text-2xl text-[#F2CA50]">
                    {stat.value}
                  </div>
                  <div className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-white mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-[#A8A8B3] mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button asChild href="/en/build/mode" variant="primary" size="lg">
                <span className="flex items-center gap-2">
                  构建你的球员 <ChevronRight className="h-5 w-5" />
                </span>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 10 RESULT ==================== */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-6">
              看看你的 Hooper 会变成什么样
            </h2>
            <p className="text-[#A8A8B3] leading-relaxed mb-8">
              每次构建都会产生不同的球员身份、赛季战绩和传奇。
            </p>

            <div className="glass-card rounded-2xl p-6 md:p-8 max-w-md mx-auto">
              <div className="text-center mb-6">
                <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#A8A8B3] mb-1">
                  你的 Hooper
                </p>
                <div className="font-[family-name:var(--font-anton)] text-5xl text-[#F2CA50]">
                  OVR 82
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { abbr: "3PT", val: "97" },
                  { abbr: "MID", val: "91" },
                  { abbr: "FIN", val: "95" },
                  { abbr: "PDEF", val: "88" },
                  { abbr: "REB", val: "82" },
                  { abbr: "CLU", val: "96" },
                ].map((attr) => (
                  <div key={attr.abbr} className="text-center">
                    <div className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-widest text-[#A8A8B3]">
                      {attr.abbr}
                    </div>
                    <div className="font-[family-name:var(--font-anton)] text-lg text-white">
                      {attr.val}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/8 pt-4 flex items-center justify-between">
                <div>
                  <div className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-widest text-[#A8A8B3]">
                    战绩
                  </div>
                  <div className="font-[family-name:var(--font-anton)] text-xl text-white">
                    61–21
                  </div>
                </div>
                <div className="glass-card rounded-lg px-4 py-2">
                  <span className="font-[family-name:var(--font-anton)] text-sm text-[#F2CA50] uppercase">
                    冠军
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button asChild href="/en/hooper" variant="outline" size="lg">
                <span className="flex items-center gap-2">
                  查看示例结果 <ChevronRight className="h-5 w-5" />
                </span>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 11 FAQ ==================== */}
      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-2 text-center">
              开始前的常见问题
            </h2>
            <p className="text-[#A8A8B3] text-center mb-8">
              构建自定义篮球球员前你需要知道的一切。
            </p>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group glass-card rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-[family-name:var(--font-space-grotesk)] text-white font-semibold list-none">
                    {faq.question}
                    <ChevronRight className="h-5 w-5 text-[#A8A8B3] group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-[#A8A8B3] leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 12 FINAL CTA ==================== */}
      <Section>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide mb-4">
              准备好构建你的 Hooper 了吗？
            </h2>
            <p className="text-lg text-[#A8A8B3] mb-8">
              13 项技能选择。30 支传奇球队。82 场比赛。一张传奇卡片。
            </p>
            <Button asChild href="/en/build/mode" variant="primary" size="xl">
              <span className="flex items-center justify-center gap-2">
                构建你的 Hooper <ChevronRight className="h-5 w-5" />
              </span>
            </Button>

            {/* Internal Links */}
            <div className="mt-12 pt-8 border-t border-white/8">
              <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide mb-4">
                更多内容
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { href: "/en/basketball-player-builder", label: "篮球球员构建器" },
                  { href: "/en/guides", label: "HooperVault 选秀指南" },
                  { href: "/en/blog/build-a-bucket-nba-game", label: "Build a Bucket 策略指南" },
                  { href: "/en/challenge", label: "每日挑战" },
                  { href: "/en/leaderboard", label: "排行榜" },
                  { href: "/en/blog/classic-vs-blind-vs-chaos", label: "Classic vs Blind vs Chaos 模式" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all"
                  >
                    <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">
                      {link.label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
