import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ModeCards } from "@/components/build/ModeCards";

export const metadata: Metadata = {
  title: "\u9009\u62e9\u9009\u79c0\u6a21\u5f0f",
  description: "\u5728 HooperVault \u9009\u62e9\u7ecf\u5178\u6216\u76f2\u9009\u9009\u79c0\u6a21\u5f0f\uff0c\u6253\u9020\u4f60\u7684\u7ec8\u6781\u7bee\u7403\u7403\u5458\u3002",
  alternates: {
    canonical: "/zh-CN/build/mode",
    languages: { en: "/en/build/mode", "zh-CN": "/zh-CN/build/mode", "x-default": "/en/build/mode" },
  },
};

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
          <ModeCards lang="zh-CN" />
        </Container>
      </Section>
    </>
  );
}
