import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd, buildBreadcrumbList, buildFAQSchema, buildArticleSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Classic vs Blind vs Chaos: Which Draft Mode Should You Play?",
  description: "Full scouting, hidden ratings, or a limited board. Each mode changes how you evaluate skills and which archetypes become viable in HooperVault basketball player builder.",
  keywords: ["hooper vault", "basketball player builder", "draft mode comparison", "classic blind chaos mode", "NBA build game"],
  alternates: {
    canonical: "/en/blog/classic-vs-blind-vs-chaos",
    languages: { en: "/en/blog/classic-vs-blind-vs-chaos", "x-default": "/en/blog/classic-vs-blind-vs-chaos" },
  },
  openGraph: {
    type: "article",
    siteName: "HooperVault",
    title: "Classic vs Blind vs Chaos: Which Draft Mode Should You Play?",
    description: "Full scouting, hidden ratings, or a limited board. Each mode changes how you evaluate skills and which archetypes become viable.",
    url: "/en/blog/classic-vs-blind-vs-chaos",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
};

const faqs = [
  { question: "What is Classic mode in HooperVault?", answer: "Classic mode gives you full visibility of every attribute rating and skill value before you pick. You can see exactly how each skill affects your Overall and attribute distribution. It is the best mode for optimizing a specific build target." },
  { question: "What is Blind mode in HooperVault?", answer: "Blind mode hides all OVR and skill numbers until the build starts taking shape. You draft based on player names, skill descriptions, and basketball knowledge. It rewards real basketball understanding over spreadsheet optimization." },
  { question: "What is Chaos mode in HooperVault?", answer: "Chaos mode restricts each round to a small set of unused skills from the full board. Instead of choosing from all available skills, you pick from a limited selection. This forces creative builds and prevents you from following a fixed draft strategy." },
  { question: "Which draft mode is best for beginners?", answer: "Classic mode is best for beginners because it shows all the numbers. You can learn how skills distribute points across attributes by watching the ratings change as you draft. Once you understand the system, Blind mode becomes a more rewarding challenge." },
  { question: "Which draft mode gives the highest Overall?", answer: "Classic mode typically produces the highest Overall builds because you can optimize attribute stacking in real time. Blind mode and Chaos mode produce lower average Overall but often more interesting and internally consistent builds." },
  { question: "Is Blind mode harder than Classic mode?", answer: "Yes. Blind mode requires you to evaluate skills based on the player's real basketball reputation and the skill description alone. You cannot see how many points each skill adds. This makes it harder to hit a specific Overall target but more rewarding when the build works." },
];

export default function ClassicVsBlindVsChaosPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([
        { name: "Home", href: "/en" },
        { name: "Blog", href: "/en/blog" },
        { name: "Classic vs Blind vs Chaos", href: "/en/blog/classic-vs-blind-vs-chaos" },
      ])} />
      <JsonLd data={buildArticleSchema({
        title: "Classic vs Blind vs Chaos: Which Draft Mode Should You Play?",
        description: "Full scouting, hidden ratings, or a limited board. Each mode changes how you evaluate skills and which archetypes become viable.",
        url: "/en/blog/classic-vs-blind-vs-chaos",
      })} />
      <JsonLd data={buildFAQSchema(faqs)} />

      {/* Hero */}
      <Section className="relative border-b border-white/8 bg-[#111317] pt-16 pb-12 overflow-hidden">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Link href="/en/blog" className="text-xs uppercase tracking-wider text-[#F2CA50] font-bold font-[family-name:var(--font-space-grotesk)] hover:text-[#F2CA50]/80 transition-colors">Blog</Link>
              <span className="text-[#A8A8B3]">·</span>
              <span className="text-xs uppercase tracking-wider text-[#A8A8B3] font-[family-name:var(--font-space-grotesk)]">Draft Modes</span>
            </div>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl text-white uppercase tracking-wide mb-6">
              Classic vs Blind vs Chaos
            </h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed">
              Three draft modes, three completely different ways to build a Hooper. Full scouting, hidden ratings, or a limited board. Each one changes which skills you pick and which archetypes become viable.
            </p>
          </div>
        </Container>
      </Section>

      {/* Article */}
      <Section>
        <Container>
          <article className="max-w-3xl mx-auto">
            <div className="prose-invert space-y-8">
              <div>
                <p className="text-[#A8A8B3] text-lg leading-relaxed">
                  HooperVault has three draft modes: Classic, Blind, and Chaos. They all use the same skill pool and the same 82-game season simulator, but the drafting experience is completely different in each one. Choosing the right mode changes how you think about builds, which archetypes are viable, and what kind of challenge you are signing up for.
                </p>
              </div>

              {/* Classic */}
              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">Classic Mode: Full Scouting</h2>
                <p className="text-[#A8A8B3] leading-relaxed mb-4">
                  Classic mode shows you every attribute rating and skill value before you make a pick. You can see exactly how adding a skill will change your Overall, which attributes it boosts, and how it fits into your current build profile.
                </p>
                <div className="glass-card rounded-xl p-5 mb-4">
                  <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-3">Best For</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-[#A8A8B3]"><ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" /><span>Players who want to optimize a specific build target (e.g., 95+ Overall shooter)</span></li>
                    <li className="flex items-start gap-2 text-[#A8A8B3]"><ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" /><span>Beginners learning how the attribute system works</span></li>
                    <li className="flex items-start gap-2 text-[#A8A8B3]"><ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" /><span>Players who want to chase the highest Overall on the leaderboard</span></li>
                  </ul>
                </div>
                <p className="text-[#A8A8B3] leading-relaxed">
                  Classic mode is the most strategic mode because you have complete information. The downside is that it can feel like a spreadsheet exercise. When you can see every number, the optimal pick is often obvious, and the draft becomes a math problem rather than a basketball decision.
                </p>
              </div>

              {/* Blind */}
              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">Blind Mode: Trust Your Read</h2>
                <p className="text-[#A8A8B3] leading-relaxed mb-4">
                  Blind mode hides all OVR and skill numbers until the build starts taking shape. You see the player name, the skill description, and the category — but not how many points it adds or what your Overall looks like. You draft based on basketball knowledge, not optimization.
                </p>
                <div className="glass-card rounded-xl p-5 mb-4">
                  <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-3">Best For</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-[#A8A8B3]"><ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" /><span>Basketball fans who want to test their real player knowledge</span></li>
                    <li className="flex items-start gap-2 text-[#A8A8B3]"><ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" /><span>Players who find Classic mode too predictable</span></li>
                    <li className="flex items-start gap-2 text-[#A8A8B3]"><ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" /><span>Anyone who wants surprising builds they would never have optimized for</span></li>
                  </ul>
                </div>
                <p className="text-[#A8A8B3] leading-relaxed">
                  Blind mode often produces builds with lower Overall than Classic, but the builds tend to be more internally consistent. When you cannot see the numbers, you pick skills that feel right together — and those instincts often produce better synergy than pure number-chasing.
                </p>
              </div>

              {/* Chaos */}
              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">Chaos Mode: Limited Board</h2>
                <p className="text-[#A8A8B3] leading-relaxed mb-4">
                  Chaos mode restricts each round to a small set of unused skills from the full board. Instead of choosing from all available skills, you pick from a limited selection of 4 options per round. The best answer is not always the obvious highest-rated trait.
                </p>
                <div className="glass-card rounded-xl p-5 mb-4">
                  <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-3">Best For</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-[#A8A8B3]"><ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" /><span>Players who want the most unpredictable and creative builds</span></li>
                    <li className="flex items-start gap-2 text-[#A8A8B3]"><ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" /><span>Replayability — no two Chaos drafts feel the same</span></li>
                    <li className="flex items-start gap-2 text-[#A8A8B3]"><ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" /><span>Players who have already mastered Classic and Blind modes</span></li>
                  </ul>
                </div>
                <p className="text-[#A8A8B3] leading-relaxed">
                  Chaos mode is the hardest mode to control. You cannot plan a specific build because you do not know which skills will appear in each round. This forces you to adapt on the fly and find synergies between skills you would never have paired intentionally. The results are often the most interesting builds in HooperVault.
                </p>
              </div>

              {/* Comparison Table */}
              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">Mode Comparison</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 text-[#A8A8B3] font-medium">Feature</th>
                        <th className="text-center py-3 text-[#F2CA50] font-medium">Classic</th>
                        <th className="text-center py-3 text-[#F2CA50] font-medium">Blind</th>
                        <th className="text-center py-3 text-[#F2CA50] font-medium">Chaos</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#A8A8B3]">
                      <tr className="border-b border-white/5"><td className="py-3">Attribute visibility</td><td className="text-center">Full</td><td className="text-center">Hidden</td><td className="text-center">Full</td></tr>
                      <tr className="border-b border-white/5"><td className="py-3">Skill selection</td><td className="text-center">All</td><td className="text-center">All</td><td className="text-center">4 per round</td></tr>
                      <tr className="border-b border-white/5"><td className="py-3">Avg Overall</td><td className="text-center">Highest</td><td className="text-center">Medium</td><td className="text-center">Variable</td></tr>
                      <tr className="border-b border-white/5"><td className="py-3">Strategy type</td><td className="text-center">Optimization</td><td className="text-center">Intuition</td><td className="text-center">Adaptation</td></tr>
                      <tr className="border-b border-white/5"><td className="py-3">Replayability</td><td className="text-center">Medium</td><td className="text-center">High</td><td className="text-center">Highest</td></tr>
                      <tr><td className="py-3">Best for beginners</td><td className="text-center">Yes</td><td className="text-center">No</td><td className="text-center">No</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">Which Mode Should You Play?</h2>
                <p className="text-[#A8A8B3] leading-relaxed mb-4">
                  There is no single best mode. Each one rewards a different skill:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-[#A8A8B3]">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" />
                    <span><strong className="text-white">New to HooperVault?</strong> Start with Classic. Learn how skills distribute points, then move to Blind once you understand the system.</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#A8A8B3]">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" />
                    <span><strong className="text-white">Basketball fan who knows the history?</strong> Blind mode rewards real player knowledge. If you can evaluate a player&apos;s game from memory, Blind mode will feel natural.</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#A8A8B3]">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" />
                    <span><strong className="text-white">Played 20+ drafts and want something new?</strong> Chaos mode forces creative problem-solving. Every round presents a puzzle you have not seen before.</span>
                  </li>
                </ul>
                <p className="text-[#A8A8B3] leading-relaxed mt-4">
                  The leaderboard combines results from all three modes. A Chaos build that stumbles into a great synergy can outperform a carefully optimized Classic build. The season simulator does not care how you drafted — only what you drafted.
                </p>
              </div>
            </div>

            {/* Internal Links */}
            <div className="mt-12 pt-8 border-t border-white/8">
              <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide mb-4">Next Reads</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <Link href="/en/blog/build-a-bucket-nba-game" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Build a Bucket NBA Game</span>
                  <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                </Link>
                <Link href="/en/blog/best-archetypes-ranked" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Best Archetypes Ranked</span>
                  <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                </Link>
                <Link href="/en/guides" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">HooperVault Draft Guide</span>
                  <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                </Link>
                <Link href="/en/basketball-player-builder" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Basketball Player Builder</span>
                  <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                </Link>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group glass-card rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-[family-name:var(--font-space-grotesk)] text-white font-semibold text-sm list-none">
                      {faq.question}
                      <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                    </summary>
                    <div className="px-5 pb-5">
                      <p className="text-[#A8A8B3] text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#F2CA50]/10 to-[#FF5E07]/10 border border-[#F2CA50]/20 p-8 text-center">
              <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-3">Try All Three Modes</h2>
              <p className="text-[#A8A8B3] mb-6">Classic, Blind, or Chaos — which one fits your style?</p>
              <Button asChild href="/en/build/mode" variant="primary" size="lg">
                <span className="flex items-center justify-center gap-2">Choose Your Mode <ChevronRight className="h-5 w-5" /></span>
              </Button>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}
