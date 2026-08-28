import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd, buildBreadcrumbList, buildFAQSchema, buildArticleSchema, buildHowToSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Build a Bucket NBA Game: How to Draft a Scorer That Lasts 82 Games",
  description: "Chasing the highest shooting rating does not make a bucket. Learn how to draft a scorer with shot creation, finishing, and clutch in HooperVault basketball player builder.",
  keywords: ["build a bucket NBA game", "NBA scorer build", "basketball player builder", "best shooter build", "how to build a scorer", "basketball season simulator"],
  alternates: {
    canonical: "/en/blog/build-a-bucket-nba-game",
    languages: { en: "/en/blog/build-a-bucket-nba-game", "x-default": "/en/blog/build-a-bucket-nba-game" },
  },
  openGraph: {
    type: "article",
    siteName: "HooperVault",
    title: "Build a Bucket NBA Game: How to Draft a Scorer That Lasts 82 Games",
    description: "Chasing the highest shooting rating does not make a bucket. Learn how to draft a scorer with shot creation, finishing, and clutch.",
    url: "/en/blog/build-a-bucket-nba-game",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
};

const faqs = [
  { question: "What is a build a bucket NBA game?", answer: "A build a bucket NBA game is a basketball player builder where you create a custom scorer by drafting skills from legendary players, then test the build across a simulated season. HooperVault is a free browser-based version of this concept." },
  { question: "How do I build a bucket in HooperVault?", answer: "To build a bucket, focus on three attribute groups: scoring (3PT, mid-range, finishing), creation (ball handle, passing), and clutch. Draft 13 skills that reinforce these groups. Do not spread picks across unrelated attributes." },
  { question: "Is Build a Hooper a build a bucket NBA game?", answer: "HooperVault is a basketball player builder with an 82-game season simulator. You draft 13 legendary skills, discover your archetype, simulate a full season, and share your legacy card. It follows the same core concept as build a bucket games but with its own skill draft system." },
  { question: "What is the best build for a scorer?", answer: "The best scorer build prioritizes shooting (3PT and mid-range), finishing, and clutch attributes. Recommended skills include Deep Range, Clutch Shooter, and Midrange Mastery. The Splash Legend and Legendary Slasher archetypes work best for scoring-focused builds." },
  { question: "Does shooting alone make a good build?", answer: "No. A high shooting rating without creation or clutch means your player cannot generate good shots or perform under pressure. The best builds have internal consistency: scoring skills paired with ball handle and clutch to execute in key moments." },
  { question: "Is this an official NBA game?", answer: "No. HooperVault is an independent fan-made project and is not affiliated with, endorsed by, or connected to the NBA, NBPA, 2K, or any basketball organization. Player names and skill references are used for entertainment and informational purposes only." },
];

export default function BuildABucketNBAGamePage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([
        { name: "Home", href: "/en" },
        { name: "Blog", href: "/en/blog" },
        { name: "Build a Bucket NBA Game", href: "/en/blog/build-a-bucket-nba-game" },
      ])} />
      <JsonLd data={buildArticleSchema({
        title: "Build a Bucket NBA Game: How to Draft a Scorer That Lasts 82 Games",
        description: "Chasing the highest shooting rating does not make a bucket. Learn how to draft a scorer with shot creation, finishing, and clutch.",
        url: "/en/blog/build-a-bucket-nba-game",
      })} />
      <JsonLd data={buildFAQSchema(faqs)} />
      <JsonLd data={buildHowToSchema(
        "How to Build a Bucket in HooperVault",
        "Draft a scorer that survives 82 games by balancing shooting, creation, and clutch attributes.",
        [
          { name: "Pick a Scoring Identity", text: "Decide whether you want to be a perimeter shooter, mid-range assassin, or inside finisher. This guides every subsequent pick." },
          { name: "Draft Shooting Skills First", text: "Use your first 4-5 picks on 3PT and mid-range skills. Deep Range, Clutch Shooter, and Off-Ball Gravity are strong openers for perimeter scorers." },
          { name: "Add Creation Skills", text: "A scorer who cannot create their own shot is dependent on the simulation engine. Add Ball Handle and Passing skills in rounds 6-8." },
          { name: "Invest in Clutch", text: "Close games are won by Clutch attribute. Draft at least one mental skill that boosts clutch performance for playoff pressure moments." },
          { name: "Fill Defense Last", text: "Use remaining picks on perimeter or interior defense. A scorer who gives up as many points as they score will not survive the season." },
          { name: "Review the Season", text: "After the 82-game simulation, study which attributes correlated with wins. If you lost close games, your Clutch was likely too low." },
        ]
      )} />

      {/* Hero */}
      <Section className="relative border-b border-white/8 bg-[#111317] pt-16 pb-12 overflow-hidden">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Link href="/en/blog" className="text-xs uppercase tracking-wider text-[#F2CA50] font-bold font-[family-name:var(--font-space-grotesk)] hover:text-[#F2CA50]/80 transition-colors">Blog</Link>
              <span className="text-[#A8A8B3]">·</span>
              <span className="text-xs uppercase tracking-wider text-[#A8A8B3] font-[family-name:var(--font-space-grotesk)]">Draft Strategy</span>
            </div>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl text-white uppercase tracking-wide mb-6">
              Build a Bucket NBA Game
            </h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed">
              Chasing the highest shooting rating does not make you a bucket. A true scorer needs shot creation, finishing ability, and clutch performance to survive 82 games. Here is how to draft one.
            </p>
          </div>
        </Container>
      </Section>

      {/* Article Content */}
      <Section>
        <Container>
          <article className="max-w-3xl mx-auto">
            <div className="prose-invert space-y-8">
              {/* Intro */}
              <div>
                <p className="text-[#A8A8B3] text-lg leading-relaxed">
                  Most players who sit down at a basketball player builder make the same mistake: they chase the highest shooting number on the board. A 95-rated three-point shot looks dominant on the player card. But in the 82-game season simulator, that number means nothing if the build cannot create its own shot, finish at the rim, or perform under pressure.
                </p>
                <p className="text-[#A8A8B3] text-lg leading-relaxed mt-4">
                  This guide breaks down how to build a bucket — a scorer that does not just look good on paper but actually produces wins across a full simulated season in <Link href="/en" className="text-[#F2CA50] hover:text-[#F2CA50]/80 transition-colors">HooperVault</Link>.
                </p>
              </div>

              {/* Section 1 */}
              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">The Problem with Pure Shooters</h2>
                <p className="text-[#A8A8B3] leading-relaxed">
                  A build that puts all its points into 3PT and mid-range but ignores ball handle, passing, and clutch will struggle in the season simulation. The engine evaluates builds holistically. A perimeter scorer who cannot create off the dribble will have lower shot quality. A shooter who freezes in clutch moments will lose close games.
                </p>
                <p className="text-[#A8A8B3] leading-relaxed mt-4">
                  The best builds in HooperVault are not the ones with the single highest attribute. They are the ones where every attribute reinforces the same play style. This is the concept of internal consistency.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">Three Attribute Groups Every Bucket Needs</h2>
                <p className="text-[#A8A8B3] leading-relaxed mb-4">
                  Instead of looking at 13 attributes individually, read them as three functional groups:
                </p>

                <div className="space-y-4">
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">Scoring</h3>
                    <p className="text-sm text-[#A8A8B3]">3PT, Mid-Range, Finishing, Dunk. These determine how many points your player can generate. Prioritize 2-3 of these based on your chosen identity.</p>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">Creation</h3>
                    <p className="text-sm text-[#A8A8B3]">Ball Handle, Passing. These determine shot quality. A scorer with high creation generates better looks, which translates to higher effective shooting in the simulation.</p>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">Clutch</h3>
                    <p className="text-sm text-[#A8A8B3]">Clutch attribute. This determines performance in close games and playoff pressure. One Clutch skill in your draft can be the difference between a first-round exit and a championship.</p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">Recommended Scorer Builds</h2>
                <p className="text-[#A8A8B3] leading-relaxed mb-6">
                  Here are two proven scorer archetypes that balance shooting with creation and clutch:
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <Link href="/en/builds/best-shooter-build" className="group glass-card rounded-xl p-5 hover:bg-white/5 transition-all">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors mb-1">Best Shooter Build</h3>
                    <p className="text-sm text-[#A8A8B3] mb-3">Splash Legend · SG · 95+ OVR</p>
                    <p className="text-sm text-[#A8A8B3]">Elite three-point range with clutch shooting. Best for players who want to dominate from deep.</p>
                    <span className="inline-flex items-center gap-1 text-sm text-[#F2CA50] mt-3">View Build <ChevronRight className="h-4 w-4" /></span>
                  </Link>
                  <Link href="/en/builds/elite-scorer-build" className="group glass-card rounded-xl p-5 hover:bg-white/5 transition-all">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors mb-1">Elite Scorer Build</h3>
                    <p className="text-sm text-[#A8A8B3] mb-3">Legendary Slasher · SG · 95+ OVR</p>
                    <p className="text-sm text-[#A8A8B3]">Balanced scoring across all three levels with strong creation. Best for versatile offensive players.</p>
                    <span className="inline-flex items-center gap-1 text-sm text-[#F2CA50] mt-3">View Build <ChevronRight className="h-4 w-4" /></span>
                  </Link>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">When Your Scorer Does Not Score</h2>
                <p className="text-[#A8A8B3] leading-relaxed">
                  If your build did not produce the scoring numbers you expected in the season simulation, do not immediately redraft with more shooting points. First, check the result page for clues:
                </p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start gap-2 text-[#A8A8B3]">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" />
                    <span><strong className="text-white">Lost close games?</strong> Your Clutch is too low. Add a mental skill next draft.</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#A8A8B3]">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" />
                    <span><strong className="text-white">High volume but low efficiency?</strong> Your Ball Handle is too low. The engine is forcing bad shots because you cannot create separation.</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#A8A8B3]">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-1 flex-shrink-0" />
                    <span><strong className="text-white">Good record but early playoff exit?</strong> Playoff opponents are better defensively. You need more finishing or dunk to score inside when perimeter shots are contested.</span>
                  </li>
                </ul>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">There Is No Single Best Build</h2>
                <p className="text-[#A8A8B3] leading-relaxed">
                  The most important thing to understand about HooperVault is that there is no objectively best build. A 75 Overall build with perfect internal consistency — every skill reinforcing the same identity — will outperform a 85 Overall build with contradictory picks.
                </p>
                <p className="text-[#A8A8B3] leading-relaxed mt-4">
                  The basketball player builder rewards strategic thinking, not just picking the biggest number. Read your attributes as groups, commit to an identity, and review your season data before drafting again. That is how you build a bucket that lasts 82 games.
                </p>
              </div>
            </div>

            {/* Internal Links — keyword-rich anchor text */}
            <div className="mt-12 pt-8 border-t border-white/8">
              <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide mb-4">Next Reads</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <Link href="/en/blog/how-to-get-99-overall" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">How to Get a 99 Overall Hooper</span>
                  <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                </Link>
                <Link href="/en/basketball-player-builder" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Basketball Player Builder</span>
                  <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                </Link>
                <Link href="/en/build-a-bucket-nba-game" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Build a Bucket NBA Game</span>
                  <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                </Link>
                <Link href="/en/guides" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">HooperVault Draft Guide</span>
                  <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                </Link>
                <Link href="/en/blog/classic-vs-blind-vs-chaos" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Classic vs Blind vs Chaos Mode Comparison</span>
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
              <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-3">Ready to Build Your Bucket?</h2>
              <p className="text-[#A8A8B3] mb-6">13 skill picks. 82 games. See if your scorer survives the season.</p>
              <Button asChild href="/en/build/mode" variant="primary" size="lg">
                <span className="flex items-center justify-center gap-2">Start Building <ChevronRight className="h-5 w-5" /></span>
              </Button>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}
