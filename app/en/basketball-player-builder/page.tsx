import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd, buildBreadcrumbList, buildFAQSchema, buildArticleSchema } from "@/components/seo/JsonLd";
import { BUILDS, ARCHETYPES } from "@/data/seo-content";

export const metadata: Metadata = {
  title: "Basketball Player Builder | Create Your Custom NBA-Style Player",
  description: "Build a custom basketball player by drafting legendary skills, choosing an archetype, and testing your creation across a full 82-game simulated season. Free browser-based player builder.",
  keywords: ["basketball player builder", "create a basketball player", "custom basketball player", "NBA player builder", "basketball season simulator", "player builder game"],
  alternates: {
    canonical: "/en/basketball-player-builder",
    languages: { en: "/en/basketball-player-builder", "zh-CN": "/zh-CN/basketball-player-builder", "x-default": "/en/basketball-player-builder" },
  },
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "Basketball Player Builder | Create Your Custom NBA-Style Player",
    description: "Build a custom basketball player by drafting legendary skills, choosing an archetype, and testing your creation across a full 82-game simulated season.",
    url: "/en/basketball-player-builder",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
};

const faqs = [
  { question: "What is a basketball player builder?", answer: "A basketball player builder is an online tool where you create a custom basketball player by choosing skills, attributes, and play styles. In HooperVault, you draft 13 legendary skills inspired by NBA greats to build your unique player profile." },
  { question: "How does the HooperVault basketball player builder work?", answer: "You pick 13 skills across five categories: shooting, finishing, playmaking, defense, and mental. Each skill adds points to specific attributes. Your final combination determines your archetype, badges, and how your player performs in the 82-game season simulation." },
  { question: "Can I create a basketball player for free?", answer: "Yes, HooperVault is completely free to use. No sign-up required. You can draft skills, build your player, simulate a full 82-game season, and share your legacy card without paying anything." },
  { question: "What is the best basketball player builder online?", answer: "HooperVault is one of the few free browser-based basketball player builders with a full 82-game season simulator. Unlike other tools that just let you allocate stat points, HooperVault adds strategic depth through its legendary skill draft system and archetype discovery." },
  { question: "Is this an official NBA player builder?", answer: "No. HooperVault is an independent fan-made project and is not affiliated with, endorsed by, or connected to the NBA, NBPA, 2K, or any basketball organization. Player names and skill references are used for entertainment and informational purposes only." },
  { question: "What archetypes can I build?", answer: "HooperVault has 6 archetypes: Splash Legend (elite shooter), Floor General (playmaker), Two-Way Superstar (balanced), Legendary Slasher (finisher), Rim Protector (defensive anchor), and Versatile Wing (all-around). Your archetype is determined by your 13 skill picks." },
  { question: "Can I build an NBA-style player?", answer: "Yes. Each skill in HooperVault is inspired by a real basketball legend. You can create a player that borrows traits from Jordan, Curry, Kobe, Shaq, Magic, Bird, Duncan, and Hakeem. The combination of 13 skills creates a unique NBA-style player profile." },
  { question: "Is there a basketball player builder game?", answer: "HooperVault is a free browser-based basketball player builder game. You draft skills, build your player, simulate an 82-game season, and share your legacy card. Unlike stat-point allocators, HooperVault uses a strategic draft system inspired by real NBA legends." },
];

const howToSteps = [
  { name: "Draft 13 Skills", text: "Pick legendary skills from basketball greats across shooting, finishing, playmaking, defense, and mental categories." },
  { name: "Choose Your Mode", text: "Classic mode shows all ratings for strategic optimization. Blind mode hides ratings for a pure basketball knowledge challenge." },
  { name: "Discover Your Archetype", text: "Your 13 picks determine your archetype identity: Splash Legend, Floor General, Two-Way Superstar, Legendary Slasher, Rim Protector, or Versatile Wing." },
  { name: "Simulate 82 Games", text: "Run a full season against generated opponents. Track wins, stats, rival matchups, and fight through four playoff rounds." },
  { name: "Share Your Legacy", text: "Get a permanent result page with your full legacy card including attributes, season stats, playoff journey, and awards." },
];

export default function BasketballPlayerBuilderPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([
        { name: "Home", href: "/en" },
        { name: "Basketball Player Builder", href: "/en/basketball-player-builder" },
      ])} />
      <JsonLd data={buildArticleSchema({
        title: "Basketball Player Builder — Create Your Custom NBA-Style Player",
        description: "Build a custom basketball player by drafting legendary skills, choosing an archetype, and testing across a full 82-game season.",
        url: "/en/basketball-player-builder",
      })} />
      <JsonLd data={buildFAQSchema(faqs)} />

      {/* Hero */}
      <Section className="relative border-b border-white/8 bg-[#111317] pt-16 pb-12 overflow-hidden">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">Free Browser Tool</p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase tracking-wide mb-6">
              Basketball Player Builder
            </h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed mb-8">
              Create your custom basketball player by drafting legendary skills, choosing an archetype, and testing your build across a full 82-game simulated season. No download, no sign-up.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild href="/en/build/mode" variant="primary" size="xl">
                <span className="flex items-center gap-2">Start Building <ChevronRight className="h-5 w-5" /></span>
              </Button>
              <Button asChild href="#how-it-works" variant="outline" size="xl">
                <span className="flex items-center gap-2">How It Works <ArrowRight className="h-5 w-5" /></span>
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-[#A8A8B3]">
              <span>13 Skill Picks</span>
              <span>·</span>
              <span>6 Archetypes</span>
              <span>·</span>
              <span>82-Game Season</span>
              <span>·</span>
              <span>Free to Play</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide">How the Player Builder Works</h2>
            <p className="mt-4 text-[#A8A8B3] max-w-2xl mx-auto">Five steps from blank slate to legacy card. Each decision shapes your player identity.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {howToSteps.map((step, i) => (
              <div key={step.name} className="glass-card rounded-xl p-6 hover:bg-white/5 transition-colors">
                <div className="font-[family-name:var(--font-anton)] text-3xl text-[#F2CA50]/30 mb-3">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide mb-2">{step.name}</h3>
                <p className="text-[#A8A8B3] text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Archetypes */}
      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide">Choose a Player Identity</h2>
            <p className="mt-4 text-[#A8A8B3] max-w-2xl mx-auto">Your skill picks determine your archetype. Each one plays differently in the season simulation.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {ARCHETYPES.map((a) => (
              <Link key={a.id} href={`/en/archetypes/${a.id}`} className="group glass-card rounded-xl p-5 hover:bg-white/5 transition-all">
                <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors mb-2">{a.name}</h3>
                <p className="text-sm text-[#A8A8B3] line-clamp-2">{a.description}</p>
                <span className="inline-flex items-center gap-1 text-sm text-[#F2CA50] mt-3">View Archetype <ChevronRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Builds */}
      <Section>
        <Container>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide">Popular Player Builds</h2>
            <p className="mt-4 text-[#A8A8B3] max-w-2xl mx-auto">Optimized builds with attribute targets and recommended skills. Start from a proven template or create your own.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {BUILDS.slice(0, 6).map((build) => (
              <Link key={build.slug} href={`/en/builds/${build.slug}`} className="group glass-card rounded-xl p-5 hover:bg-white/5 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors">{build.title}</h3>
                  <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-[#F2CA50]">{build.potentialOvr}+</span>
                </div>
                <p className="text-sm text-[#A8A8B3]">{build.archetype} · {build.position}</p>
                <p className="text-sm text-[#A8A8B3] mt-2 line-clamp-2">{build.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild href="/en/builds" variant="outline" size="lg">
              <span className="flex items-center gap-2">View All Builds <ChevronRight className="h-5 w-5" /></span>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Strategy Tips */}
      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-8 text-center">Player Builder Strategy</h2>

            <div className="space-y-8">
              <div className="glass-card rounded-xl p-6 md:p-8">
                <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-3">Start with a Player Identity</h3>
                <p className="text-[#A8A8B3] leading-relaxed mb-4">Before drafting, decide what kind of player you want to build. A perimeter scorer needs different skills than a defensive anchor. Having a clear identity prevents scattered picks that do not reinforce each other.</p>
                <p className="text-[#A8A8B3] leading-relaxed">There is no single best build in HooperVault. The best build is one where every skill reinforces the same play style. A 92 Overall build with internal consistency will outperform a 95 Overall build with contradictory skills.</p>
              </div>

              <div className="glass-card rounded-xl p-6 md:p-8">
                <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-3">Read Attributes as Groups</h3>
                <p className="text-[#A8A8B3] leading-relaxed mb-4">Do not look at individual attributes in isolation. Read them as functional groups that work together:</p>
                <ul className="space-y-2 text-[#A8A8B3]">
                  <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" /><span><strong className="text-white">Scoring:</strong> 3PT, Mid-Range, Finishing, Dunk</span></li>
                  <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" /><span><strong className="text-white">Creation:</strong> Ball Handle, Passing</span></li>
                  <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" /><span><strong className="text-white">Defense:</strong> Perimeter Defense, Interior Defense, Block, Rebound</span></li>
                  <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" /><span><strong className="text-white">Physical:</strong> Speed, Strength</span></li>
                  <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" /><span><strong className="text-white">Mental:</strong> Clutch</span></li>
                </ul>
              </div>

              <div className="glass-card rounded-xl p-6 md:p-8">
                <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-3">Review Before Redrafting</h3>
                <p className="text-[#A8A8B3] leading-relaxed">After each season, study the result page. Look at which attributes correlated with wins and which correlated with losses. If your perimeter scoring was high but you still lost close games, your Clutch attribute may be too low. Use the data to adjust your next draft, not just your gut feeling.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group glass-card rounded-xl overflow-hidden">
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

      {/* Related */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-4 text-center">Related Pages</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <Link href="/en/build-a-bucket-nba-game" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Build a Bucket NBA Game</span>
                <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
              </Link>
              <Link href="/en/guides" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Draft Guide</span>
                <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
              </Link>
              <Link href="/en/blog/classic-vs-blind-vs-chaos" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Classic vs Blind vs Chaos</span>
                <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide mb-4">Ready to Build Your Player?</h2>
            <p className="text-lg text-[#A8A8B3] mb-8">13 skill picks. 6 archetypes. 82 games. One legacy card.</p>
            <Button asChild href="/en/build/mode" variant="primary" size="xl">
              <span className="flex items-center justify-center gap-2">Start Building Now <ChevronRight className="h-5 w-5" /></span>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
