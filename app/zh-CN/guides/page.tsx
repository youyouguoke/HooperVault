import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "指南 | HooperVault",
  description: "HooperVault - 用传奇技能打造你的梦想篮球球员，模拟属于你的篮球传奇。",
};

export default function GuidesPage() {
  return (
    <>
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
    </>
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
