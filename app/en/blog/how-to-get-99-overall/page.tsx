import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd, buildBreadcrumbList, buildFAQSchema, buildArticleSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "How to Get a 99 Overall Hooper — Full Attribute Breakdown",
  description: "Learn how Overall is calculated from total skill bonus and which strategies produce the highest ratings in HooperVault.",
  keywords: ["99 overall hooper", "max overall basketball player", "best build hoopervault", "highest rated build", "99 overall build", "basketball player builder max rating"],
  alternates: {
    canonical: "/en/blog/how-to-get-99-overall",
    languages: { en: "/en/blog/how-to-get-99-overall", "x-default": "/en/blog/how-to-get-99-overall" },
  },
  openGraph: {
    type: "article",
    siteName: "HooperVault",
    title: "How to Get a 99 Overall Hooper — Full Attribute Breakdown",
    description: "The path to 99 Overall is not about picking the highest-rated skills. Learn how the attribute system distributes points across 13 picks.",
    url: "/en/blog/how-to-get-99-overall",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
};

const faqs = [
  { question: "How do I get a 99 Overall in HooperVault?", answer: "Getting 99 Overall requires a total skill bonus of 156 or higher — that means averaging 12+ bonus per skill across all 13 picks. Legendary skills carry the highest bonuses (10-16), so prioritizing them is key. It is possible but demands deliberate cherry-picking of the best legendary skills every round." },
  { question: "What is the highest Overall you can get in HooperVault?", answer: "The theoretical maximum is 99 Overall (total bonus of 156). Random builds typically land around 70 Overall. Cherry-picked epic builds reach ~82, and focused legendary builds can hit 90+. Reaching 99 requires averaging 12+ bonus per skill across all 13 rounds." },
  { question: "Is 99 Overall the best build?", answer: "Not necessarily. A 75 Overall build with perfect internal consistency — every skill reinforcing the same play style — can outperform an 85 Overall build with scattered attributes. The season simulation rewards consistency over raw numbers." },
  { question: "What attributes matter most for a high Overall?", answer: "Overall is calculated from the total bonus of all stolen skills: total bonus ÷ 156 × 99. All 13 attributes are weighted equally — there are no hidden weights. A +16 legendary skill contributes the same to Overall regardless of which attribute it boosts. Focus on picking the highest-bonus skills available." },
  { question: "Can I get 99 Overall in Blind mode?", answer: "It is harder in Blind mode because you cannot see skill bonuses as you draft. Classic mode lets you see each skill bonus and pick the highest ones. Most 85+ Overall builds are created in Classic mode." },
];

export default function HowToGet99OverallPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([
        { name: "Home", href: "/en" },
        { name: "Blog", href: "/en/blog" },
        { name: "How to Get 99 Overall", href: "/en/blog/how-to-get-99-overall" },
      ])} />
      <JsonLd data={buildArticleSchema({
        title: "How to Get a 99 Overall Hooper — Full Attribute Breakdown",
        description: "The path to 99 Overall is not about picking the highest-rated skills. Learn how the attribute system distributes points across 13 picks.",
        url: "/en/blog/how-to-get-99-overall",
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
              <span className="text-xs uppercase tracking-wider text-[#A8A8B3] font-[family-name:var(--font-space-grotesk)]">Numbers Guide</span>
            </div>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl text-white uppercase tracking-wide mb-6">
              How to Get a 99 Overall Hooper
            </h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed">
              The path to 99 Overall is about picking the highest-bonus skills across 13 rounds. Legendary skills carry the biggest bonuses.
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
                  Everyone wants a 99 Overall Hooper. The gold badge on the player card. The highest number on the leaderboard. But most players who chase 99 Overall make a critical mistake: they pick the highest-rated individual skills without thinking about how those skills interact with each other.
                </p>
                <p className="text-[#A8A8B3] text-lg leading-relaxed mt-4">
                  This guide explains how the Overall calculation works, which attribute combinations produce the highest ratings, and why a lower Overall with better consistency often wins more games.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">How Overall Is Calculated</h2>
                <p className="text-[#A8A8B3] leading-relaxed">
                  Your Overall rating is based on the total bonus from all 13 stolen skills. Each skill adds a fixed bonus to one attribute — rare skills give +6-7, epic skills give +8-10, and legendary skills give +10-16. All attributes are weighted equally. The formula is simple:
                </p>
                <div className="glass-card rounded-xl p-5 mt-6 text-center">
                  <div className="text-sm text-[#A8A8B3] mb-2">OVR = Total Bonus ÷ 156 × 99</div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div><div className="text-lg font-bold text-white">+6-7</div><div className="text-xs text-[#A8A8B3]">Rare</div></div>
                    <div><div className="text-lg font-bold text-[#6CB9FF]">+8-10</div><div className="text-xs text-[#A8A8B3]">Epic</div></div>
                    <div><div className="text-lg font-bold text-[#F2CA50]">+10-16</div><div className="text-xs text-[#A8A8B3]">Legendary</div></div>
                  </div>
                </div>
                <p className="text-[#A8A8B3] leading-relaxed mt-6">
                  This means every skill pick contributes to Overall equally, regardless of which attribute it boosts. A +16 legendary skill on Block contributes just as much as a +16 legendary skill on 3PT. The key is picking the highest-bonus skills available each round.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">How to Maximize Your Overall</h2>
                <p className="text-[#A8A8B3] leading-relaxed mb-4">
                  Since Overall depends only on total bonus, the strategy is straightforward: pick the highest-bonus skills every round. Here is how:
                </p>
                <div className="space-y-4">
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">Step 1: Prioritize Legendary Skills</h3>
                    <p className="text-sm text-[#A8A8B3]">Legendary skills carry the highest bonuses (10-16). Always pick the legendary option when available. A single +16 legendary skill contributes 10 OVR points.</p>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">Step 2: Compare Bonus Values</h3>
                    <p className="text-sm text-[#A8A8B3]">When choosing between skills, always pick the one with the higher bonus. A +10 epic skill on any attribute is worth more than a +6 rare skill — it does not matter which attribute gets boosted for Overall purposes.</p>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">Step 3: Consistency Still Matters</h3>
                    <p className="text-sm text-[#A8A8B3]">While Overall drives the number, the season simulation rewards builds where skills reinforce a coherent playstyle. A focused 80 OVR build can outperform a scattered 85 OVR build in the 82-game season.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">Recommended Builds for Maximum Overall</h2>
                <p className="text-[#A8A8B3] leading-relaxed mb-6">
                  These builds balance Overall rating with internal consistency for strong season simulation performance:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <Link href="/en/builds/complete-superstar-build" className="group glass-card rounded-xl p-5 hover:bg-white/5 transition-all">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors mb-1">Complete Superstar Build</h3>
                    <p className="text-sm text-[#A8A8B3] mb-3">Two-Way Superstar · 85+ OVR</p>
                    <p className="text-sm text-[#A8A8B3]">The highest Overall build. Balances all attribute groups for maximum rating. Best for players who want the gold badge.</p>
                    <span className="inline-flex items-center gap-1 text-sm text-[#F2CA50] mt-3">View Build <ChevronRight className="h-4 w-4" /></span>
                  </Link>
                  <Link href="/en/builds/two-way-star-build" className="group glass-card rounded-xl p-5 hover:bg-white/5 transition-all">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors mb-1">Two-Way Star Build</h3>
                    <p className="text-sm text-[#A8A8B3] mb-3">Two-Way Superstar · 80+ OVR</p>
                    <p className="text-sm text-[#A8A8B3]">High Overall with strong defensive contribution. Wins more games than pure offensive builds in the season simulation.</p>
                    <span className="inline-flex items-center gap-1 text-sm text-[#F2CA50] mt-3">View Build <ChevronRight className="h-4 w-4" /></span>
                  </Link>
                </div>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">The 99 Overall Trap</h2>
                <p className="text-[#A8A8B3] leading-relaxed">
                  Here is the counterintuitive truth: a 99 Overall build does not always win the most games. The Overall rating is a single number that compresses 13 different attributes into one score. It does not capture internal consistency — how well those attributes work together as a system.
                </p>
                <p className="text-[#A8A8B3] leading-relaxed mt-4">
                  A 75 Overall build where every skill reinforces a perimeter scorer identity — 3PT, Mid-Range, Ball Handle, Clutch — will often produce a better season record than an 85 Overall build that has high shooting but also high rebounding and interior defense that do not contribute to the scoring identity.
                </p>
                <p className="text-[#A8A8B3] leading-relaxed mt-4">
                  The best basketball player builder strategy is not &ldquo;maximize Overall.&rdquo; It is &ldquo;maximize consistency within a chosen identity, then let the Overall reflect that consistency.&rdquo;
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
                <Link href="/en/basketball-player-builder" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Basketball Player Builder</span>
                  <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                </Link>
                <Link href="/en/builds" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">All Build Guides</span>
                  <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                </Link>
                <Link href="/en/leaderboard" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">HooperVault Leaderboard</span>
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
              <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-3">Chase the 99</h2>
              <p className="text-[#A8A8B3] mb-6">13 picks. Stacked attributes. See how high your Overall can go.</p>
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
