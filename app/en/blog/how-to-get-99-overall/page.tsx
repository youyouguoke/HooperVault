import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd, buildBreadcrumbList, buildFAQSchema, buildArticleSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "How to Get a 99 Overall Hooper — Full Attribute Breakdown",
  description: "The path to 99 Overall is not about picking the highest-rated skills. Learn how the attribute system distributes points across 13 picks and which combinations produce the maximum rating.",
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
  { question: "How do I get a 99 Overall in HooperVault?", answer: "Getting 99 Overall requires understanding how each skill distributes points across 13 attributes. You need to pick skills that stack points on the same attributes rather than spreading them thin. The Complete Superstar build is the closest path to 99 Overall." },
  { question: "What is the highest Overall you can get in HooperVault?", answer: "The theoretical maximum is 99 Overall, but most builds land between 88 and 95. Reaching 95+ requires near-perfect skill synergy where every pick reinforces overlapping attributes." },
  { question: "Is 99 Overall the best build?", answer: "Not necessarily. A 92 Overall build with perfect internal consistency — every skill reinforcing the same play style — can outperform a 95 Overall build with scattered attributes. The season simulation rewards consistency over raw numbers." },
  { question: "What attributes matter most for a high Overall?", answer: "Overall is calculated as a weighted average of all 13 attributes. The attributes with the highest weight are 3PT, Mid-Range, Ball Handle, and Speed. Prioritizing these gives the biggest boost to your Overall rating." },
  { question: "Can I get 99 Overall in Blind mode?", answer: "It is much harder in Blind mode because you cannot see the attribute distribution as you draft. Classic mode gives you full visibility to optimize for maximum Overall. Most 95+ Overall builds are created in Classic mode." },
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
              The path to 99 Overall is not about picking the highest-rated skills. It is about understanding how the attribute system distributes points across 13 picks.
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
                  Your Overall rating is a weighted average of all 13 attributes. Not all attributes are weighted equally. The attributes that carry the most weight in the Overall calculation are:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                  {[
                    { attr: "3PT", weight: "High" },
                    { attr: "Mid-Range", weight: "High" },
                    { attr: "Ball Handle", weight: "High" },
                    { attr: "Speed", weight: "High" },
                    { attr: "Finishing", weight: "Medium" },
                    { attr: "Passing", weight: "Medium" },
                    { attr: "Perim D", weight: "Medium" },
                    { attr: "Clutch", weight: "Medium" },
                    { attr: "Interior D", weight: "Low" },
                    { attr: "Block", weight: "Low" },
                    { attr: "Rebound", weight: "Low" },
                    { attr: "Strength", weight: "Low" },
                    { attr: "Dunk", weight: "Low" },
                  ].map((item) => (
                    <div key={item.attr} className="glass-card rounded-lg p-3 text-center">
                      <div className="text-sm font-bold text-white">{item.attr}</div>
                      <div className={`text-xs mt-1 ${item.weight === "High" ? "text-[#F2CA50]" : item.weight === "Medium" ? "text-[#A8A8B3]" : "text-[#A8A8B3]/60"}`}>
                        {item.weight} weight
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[#A8A8B3] leading-relaxed mt-6">
                  This means stacking points on 3PT, Mid-Range, Ball Handle, and Speed gives you the biggest Overall boost per skill pick. A build with 95 in all four of these will have a higher Overall than a build with 95 in Block, Rebound, Interior Defense, and Strength — even though both have four maxed attributes.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">The Stacking Strategy</h2>
                <p className="text-[#A8A8B3] leading-relaxed mb-4">
                  The key to a high Overall is stacking: picking multiple skills that add points to the same attributes. Here is how it works:
                </p>
                <div className="space-y-4">
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">Step 1: Identify High-Weight Attributes</h3>
                    <p className="text-sm text-[#A8A8B3]">Focus on 3PT, Mid-Range, Ball Handle, and Speed. These four attributes have the most impact on your Overall.</p>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">Step 2: Find Skills That Stack</h3>
                    <p className="text-sm text-[#A8A8B3]">Some skills add points to multiple high-weight attributes at once. These are your most efficient picks. A skill that adds +5 to both 3PT and Ball Handle is worth more Overall than a skill that adds +10 to Block alone.</p>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">Step 3: Fill the Gaps Strategically</h3>
                    <p className="text-sm text-[#A8A8B3]">After 8-9 picks focused on high-weight attributes, use your remaining picks to bring any low attributes up to a minimum threshold. A 40 in any attribute drags down your Overall more than you might expect.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">Recommended Builds for Maximum Overall</h2>
                <p className="text-[#A8A8B3] leading-relaxed mb-6">
                  These builds are optimized for the highest possible Overall while maintaining enough consistency to perform well in the season simulation:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <Link href="/en/builds/complete-superstar-build" className="group glass-card rounded-xl p-5 hover:bg-white/5 transition-all">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors mb-1">Complete Superstar Build</h3>
                    <p className="text-sm text-[#A8A8B3] mb-3">Two-Way Superstar · 98+ OVR</p>
                    <p className="text-sm text-[#A8A8B3]">The highest Overall build. Balances all attribute groups for maximum rating. Best for players who want the gold badge.</p>
                    <span className="inline-flex items-center gap-1 text-sm text-[#F2CA50] mt-3">View Build <ChevronRight className="h-4 w-4" /></span>
                  </Link>
                  <Link href="/en/builds/two-way-star-build" className="group glass-card rounded-xl p-5 hover:bg-white/5 transition-all">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors mb-1">Two-Way Star Build</h3>
                    <p className="text-sm text-[#A8A8B3] mb-3">Two-Way Superstar · 96+ OVR</p>
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
                  A 92 Overall build where every skill reinforces a perimeter scorer identity — 3PT, Mid-Range, Ball Handle, Clutch — will often produce a better season record than a 95 Overall build that has high shooting but also high rebounding and interior defense that do not contribute to the scoring identity.
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
