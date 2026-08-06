import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Daily Challenge | HooperVault",
  description: "HooperVault - Build your dream basketball player with legendary skills and simulate your legacy.",
};

export default function DailyChallengePage() {
  return (
    <>
      <Section className="relative border-b border-white/8 bg-[#111317] pt-16 pb-8">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">Today&apos;s Test</p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase tracking-wide mb-6">Daily Challenge</h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed">A fresh draft prompt every day. Build under a shared constraint, then compare your results with the community.</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8 md:p-12 text-center mb-12 border border-[#F2CA50]/20">
              <p className="font-[family-name:var(--font-space-grotesk)] text-sm uppercase tracking-wider text-[#A8A8B3] mb-3">Coming Soon</p>
              <h2 className="font-[family-name:var(--font-anton)] text-3xl text-white uppercase tracking-wide mb-4">The Daily Challenge board is loading</h2>
              <p className="text-[#A8A8B3] max-w-xl mx-auto mb-8 leading-relaxed">We are finalizing the prompt engine, scoring rules, and daily leaderboards. Check back soon to compete for the top spot.</p>
              <Button href="/en/build/mode" variant="secondary" size="xl">Start a Practice Build</Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Shared Prompt", body: "Every player gets the same position, mode, and bonus condition for 24 hours." },
                { title: "Community Score", body: "Submit your build to climb the daily leaderboard. Best overall wins." },
                { title: "Replay Tomorrow", body: "A new challenge drops every day at 00:00 UTC." },
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
