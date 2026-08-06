import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "每日挑战 | HooperVault",
  description: "HooperVault - 用传奇技能打造你的梦想篮球球员，模拟属于你的篮球传奇。",
};

export default function DailyChallengePage() {
  return (
    <>
      <Section className="relative border-b border-white/8 bg-[#111317] pt-16 pb-8">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">今日试炼</p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase tracking-wide mb-6">每日挑战</h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed">每天一个全新的选秀命题。在相同限制下构建，然后与社区一较高下。</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8 md:p-12 text-center mb-12 border border-[#F2CA50]/20">
              <p className="font-[family-name:var(--font-space-grotesk)] text-sm uppercase tracking-wider text-[#A8A8B3] mb-3">即将推出</p>
              <h2 className="font-[family-name:var(--font-anton)] text-3xl text-white uppercase tracking-wide mb-4">每日挑战板块正在加载</h2>
              <p className="text-[#A8A8B3] max-w-xl mx-auto mb-8 leading-relaxed">我们正在完善命题生成、评分规则和每日排行榜。稍后即可参与争夺榜首。</p>
              <Button href="/zh-CN/build/mode" variant="secondary" size="xl">先进行一次练习构建</Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "共享命题", body: "24 小时内，所有玩家获得相同的位置、模式和额外条件。" },
                { title: "社区评分", body: "提交你的构建，爬上每日排行榜。最高总评获胜。" },
                { title: "明日再战", body: "每天 UTC 00:00 刷新全新挑战。" },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-6">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm uppercase tracking-wider text-[#F2CA50] mb-2">{item.title}</h3>
                  <p className="text-[#A8A8B3] text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
