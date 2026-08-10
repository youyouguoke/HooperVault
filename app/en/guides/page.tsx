import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Guides | HooperVault",
  description: "HooperVault - Build your dream basketball player with legendary skills and simulate your legacy.",
};

export default function GuidesPage() {
  return (
    <>
      <Section className="relative border-b border-white/8 bg-[#111317] pt-16 pb-12 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/guides-bg.jpg')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111317]/60 via-[#111317]/80 to-[#111317]" />
        <Container>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">Learn the Vault</p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase tracking-wide mb-6">Guides</h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed">Everything you need to know to draft smarter, build stronger, and simulate a legendary season.</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto grid gap-10">
            <GuideItem number="01" title="How the Draft Works" body="You get 13 picks. Each pick is one legendary skill that adds points to a specific attribute. The order and combination of skills determine your Hooper's final ratings, archetype, and story." />
            <GuideItem number="02" title="Pick a Mode" body="Classic mode gives you a balanced draft with full visibility. Blind mode hides ratings, forcing you to trust names and instincts. Both modes unlock the same archetypes — the challenge is how you get there." />
            <GuideItem number="03" title="Read the Archetype" body="After 13 picks you receive an archetype like Two-Way Superstar, Splash Legend, or Floor General. This is your build identity and determines which badges you can unlock." />
            <GuideItem number="04" title="Simulate the Season" body="An 82-game schedule tests your build against generated opponents. Wins, rival matchups, and streaks all add to your Hooper's legend. Make the playoffs and battle through four rounds to win the championship." />
            <GuideItem number="05" title="Share Your Legacy" body="Every build gets a permanent result page with your full legacy card — attributes, season stats, playoff journey, awards, and story. Share the link or download a card image to post anywhere." />
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
