import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ModeCards } from "@/components/build/ModeCards";

export const metadata: Metadata = {
  title: "Choose Your Draft Mode | HooperVault",
  description: "Select Classic or Blind draft mode to build your ultimate basketball player in HooperVault.",
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
              Choose Draft Mode
            </h1>
            <p className="text-lg text-[#A8A8B3]">
              How do you want to build your Hooper?
            </p>
          </div>
        </Container>
      </div>

      <Section className="relative">
        <Container>
          <ModeCards />
        </Container>
      </Section>
    </>
  );
}
