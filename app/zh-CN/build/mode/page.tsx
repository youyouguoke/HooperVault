import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ModeCards } from "@/components/build/ModeCards";

export const metadata: Metadata = {
  title: "选择选秀模式 | HooperVault",
  description: "在 HooperVault 选择经典或盲选选秀模式，打造你的终极篮球球员。",
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
