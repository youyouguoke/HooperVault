import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd, buildBreadcrumbList, buildFAQSchema, buildArticleSchema } from "@/components/seo/JsonLd";
import { ARCHETYPES } from "@/data/seo-content";

export const metadata: Metadata = {
  title: "Best Archetypes Ranked: Which Player Identity Wins the Most?",
  description: "Splash Legend, Floor General, Two-Way Superstar, and more. A data-backed look at which HooperVault archetypes produce the best season records in the 82-game simulator.",
  keywords: ["hooper vault", "basketball player builder", "best archetype hoopervault", "archetype ranking", "NBA build game"],
  alternates: {
    canonical: "/en/blog/best-archetypes-ranked",
    languages: { en: "/en/blog/best-archetypes-ranked", "x-default": "/en/blog/best-archetypes-ranked" },
  },
  openGraph: {
    type: "article",
    siteName: "HooperVault",
    title: "Best Archetypes Ranked: Which Player Identity Wins the Most?",
    description: "Splash Legend, Floor General, Two-Way Superstar, and more. A data-backed look at which archetypes produce the best season records.",
    url: "/en/blog/best-archetypes-ranked",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
};

const faqs = [
  { question: "What is the best archetype in HooperVault?", answer: "Two-Way Superstar and Versatile Wing tend to produce the most consistent season records because they balance scoring with defense. However, the best archetype depends on your draft mode and play style. Splash Legend dominates in Classic mode where you can optimize shooting stacking." },
  { question: "Which archetype wins the most championships?", answer: "Archetypes with strong clutch and defensive attributes — Two-Way Superstar and Rim Protector — tend to perform best in playoff simulations. Pure scoring builds like Splash Legend can dominate the regular season but may struggle in playoff pressure without clutch investment." },
  { question: "Is Versatile Wing the best archetype?", answer: "Versatile Wing has the highest potential Overall (96) because it has no weaknesses. But its strength is also its weakness: it does not excel at any single thing. A 92 Overall Splash Legend with perfect shooting consistency can outperform a 96 Overall Versatile Wing in the right conditions." },
  { question: "What is the worst archetype in HooperVault?", answer: "There is no worst archetype — each one can produce championship builds with the right skill draft. The archetype that performs worst is usually the one that was drafted without a clear identity, resulting in scattered attributes that do not reinforce each other." },
  { question: "Does archetype affect the season simulation?", answer: "Yes. Your archetype determines your badge eligibility, which affects how your player performs in specific game situations. A Splash Legend gets shooting badges that boost perimeter performance, while a Rim Protector gets defensive badges that boost blocks and contests." },
  { question: "Can I change my archetype after drafting?", answer: "No. Your archetype is determined by your 13 skill picks and cannot be changed after the draft. If you want a different archetype, you need to start a new draft with a different skill selection strategy." },
];

// Archetype ranking based on consistency and versatility
const RANKINGS = [
  { rank: 1, id: "two-way-superstar", name: "Two-Way Superstar", ovr: 95, verdict: "Most consistent archetype. Balances scoring with defense, which means fewer blowout losses and closer games decided by clutch. The safest pick for players who want a reliable season record.", bestMode: "Classic & Blind" },
  { rank: 2, id: "versatile-wing", name: "Versatile Wing", ovr: 96, verdict: "Highest potential Overall with no weaknesses. The jack-of-all-trades archetype. Excels in Chaos mode where adaptability matters more than specialization.", bestMode: "Chaos" },
  { rank: 3, id: "splash-legend", name: "Splash Legend", ovr: 95, verdict: "The premier scoring archetype. Dominates from three-point range with deep range and quick release. Best in Classic mode where you can stack shooting attributes precisely.", bestMode: "Classic" },
  { rank: 4, id: "floor-general", name: "Floor General", ovr: 94, verdict: "Elite playmaker who makes every teammate better. Underrated in the season simulation because the engine values assists and court vision. A Floor General with strong clutch produces surprising win totals.", bestMode: "Blind" },
  { rank: 5, id: "legendary-slasher", name: "Legendary Slasher", ovr: 93, verdict: "Unstoppable at the rim with elite finishing, dunk, and speed. The most fun archetype to play but needs clutch investment to survive close games. Pairs well with one shooting skill for floor spacing.", bestMode: "Classic & Chaos" },
  { rank: 6, id: "rim-protector", name: "Rim Protector", ovr: 93, verdict: "The defensive anchor. Does not score much but shuts down opponents. In the season simulation, defense wins championships — a Rim Protector with even modest scoring can produce deep playoff runs.", bestMode: "Blind" },
];

export default function BestArchetypesRankedPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([
        { name: "Home", href: "/en" },
        { name: "Blog", href: "/en/blog" },
        { name: "Best Archetypes Ranked", href: "/en/blog/best-archetypes-ranked" },
      ])} />
      <JsonLd data={buildArticleSchema({
        title: "Best Archetypes Ranked: Which Player Identity Wins the Most?",
        description: "A data-backed look at which HooperVault archetypes produce the best season records in the 82-game simulator.",
        url: "/en/blog/best-archetypes-ranked",
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
              <span className="text-xs uppercase tracking-wider text-[#A8A8B3] font-[family-name:var(--font-space-grotesk)]">Archetype Guide</span>
            </div>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl text-white uppercase tracking-wide mb-6">
              Best Archetypes Ranked
            </h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed">
              Six archetypes, one question: which one wins the most games? Here is a breakdown of every archetype in HooperVault, ranked by season simulation consistency.
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
                  Every archetype in HooperVault can produce a championship build. But some archetypes are more consistent than others across different draft modes and skill combinations. This ranking is based on one metric: how reliably an archetype produces winning season records in the 82-game simulator.
                </p>
                <p className="text-[#A8A8B3] text-lg leading-relaxed mt-4">
                  A quick note: this ranking is not about the highest Overall. It is about which archetypes produce the best win-loss records. A 92 Overall build with perfect internal consistency will beat a 95 Overall build with scattered attributes. The archetype that makes consistency easiest to achieve ranks highest.
                </p>
              </div>

              {/* Rankings */}
              {RANKINGS.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-[family-name:var(--font-anton)] text-5xl text-[#F2CA50]/20">#{item.rank}</span>
                    <div>
                      <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide">
                        <Link href={`/en/archetypes/${item.id}`} className="hover:text-[#F2CA50] transition-colors">{item.name}</Link>
                      </h2>
                      <span className="text-sm text-[#A8A8B3]">Potential OVR: {item.ovr} · Best in: {item.bestMode}</span>
                    </div>
                  </div>
                  <p className="text-[#A8A8B3] leading-relaxed mb-4">{item.verdict}</p>
                  <Link href={`/en/archetypes/${item.id}`} className="inline-flex items-center gap-1 text-sm text-[#F2CA50] hover:text-[#F2CA50]/80 transition-colors">
                    View full archetype breakdown <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}

              {/* Key Insight */}
              <div className="glass-card rounded-xl p-6 md:p-8 border-l-4 border-[#F2CA50]">
                <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-3">The Consistency Principle</h3>
                <p className="text-[#A8A8B3] leading-relaxed">
                  The best archetype is the one where you can most easily achieve internal consistency — where every skill pick reinforces the same identity. Two-Way Superstar ranks #1 because its identity (score + defend) naturally uses skills from multiple categories that complement each other. Splash Legend ranks #3 because pure shooting builds can become one-dimensional if you do not invest in creation and clutch.
                </p>
                <p className="text-[#A8A8B3] leading-relaxed mt-4">
                  There is no single best build in HooperVault. The best build is the one where your 13 picks tell a coherent story. Choose your archetype first, then draft every skill to serve that identity.
                </p>
              </div>

              {/* Quick Links to all archetypes */}
              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">All Archetypes</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {ARCHETYPES.map((a) => (
                    <Link key={a.id} href={`/en/archetypes/${a.id}`} className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                      <div>
                        <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">{a.name}</span>
                        <span className="text-xs text-[#A8A8B3] ml-2">OVR {a.potentialOvr}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                    </Link>
                  ))}
                </div>
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
                <Link href="/en/blog/how-to-get-99-overall" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">How to Get 99 Overall</span>
                  <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                </Link>
                <Link href="/en/blog/classic-vs-blind-vs-chaos" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Classic vs Blind vs Chaos</span>
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
              <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-3">Find Your Archetype</h2>
              <p className="text-[#A8A8B3] mb-6">13 skill picks determine your identity. Which one will you become?</p>
              <Button asChild href="/en/build/mode" variant="primary" size="lg">
                <span className="flex items-center justify-center gap-2">Start Drafting <ChevronRight className="h-5 w-5" /></span>
              </Button>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}
