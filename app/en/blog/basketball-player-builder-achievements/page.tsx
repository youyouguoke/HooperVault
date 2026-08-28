import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd, buildBreadcrumbList, buildFAQSchema, buildArticleSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Basketball Player Builder Achievements: Unlock Every Badge",
  description: "Complete guide to all unlockable achievements in HooperVault basketball player builder. What triggers each badge, which ones are worth chasing, and how to unlock them efficiently.",
  keywords: ["hooper vault", "basketball player builder", "hoopervault achievements", "unlock badges", "NBA build game"],
  alternates: {
    canonical: "/en/blog/basketball-player-builder-achievements",
    languages: { en: "/en/blog/basketball-player-builder-achievements", "x-default": "/en/blog/basketball-player-builder-achievements" },
  },
  openGraph: {
    type: "article",
    siteName: "HooperVault",
    title: "Basketball Player Builder Achievements: Unlock Every Badge",
    description: "Complete guide to all unlockable achievements in HooperVault basketball player builder.",
    url: "/en/blog/basketball-player-builder-achievements",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
};

const faqs = [
  { question: "How do I unlock achievements in HooperVault?", answer: "Achievements are unlocked by completing specific challenges during the draft and season simulation. Examples include winning a championship, reaching a certain Overall, or completing a draft in Blind mode. Each achievement adds a badge to your player card." },
  { question: "What achievements are available in HooperVault?", answer: "HooperVault has achievements for season performance (championship wins, playoff runs), draft mastery (completing drafts in all three modes), Overall milestones (reaching 90, 95, and 99 Overall), and special challenges (winning with specific archetypes)." },
  { question: "Do achievements affect gameplay?", answer: "Achievements are cosmetic badges on your player card and leaderboard profile. They do not change your attribute ratings or season simulation results. They are a way to show off your accomplishments to the community." },
  { question: "What is the hardest achievement to unlock?", answer: "The hardest achievements are typically those that require winning a championship with a low Overall build or completing a Chaos mode draft with a 90+ Overall. These require both strategic skill and some luck with the limited skill board." },
  { question: "Can I see other players' achievements?", answer: "Yes. Achievements appear on player cards in the leaderboard. When you view another player's build, you can see which badges they have earned. Top leaderboard players often have multiple rare achievements displayed." },
  { question: "Is this an official NBA achievements system?", answer: "No. HooperVault is an independent fan-made project and is not affiliated with, endorsed by, or connected to the NBA, NBPA, 2K, or any basketball organization. The achievements system is unique to HooperVault." },
];

export default function AchievementsPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([
        { name: "Home", href: "/en" },
        { name: "Blog", href: "/en/blog" },
        { name: "Achievements Guide", href: "/en/blog/basketball-player-builder-achievements" },
      ])} />
      <JsonLd data={buildArticleSchema({
        title: "Basketball Player Builder Achievements: Unlock Every Badge",
        description: "Complete guide to all unlockable achievements in HooperVault basketball player builder.",
        url: "/en/blog/basketball-player-builder-achievements",
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
              <span className="text-xs uppercase tracking-wider text-[#A8A8B3] font-[family-name:var(--font-space-grotesk)]">Achievements</span>
            </div>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl text-white uppercase tracking-wide mb-6">
              Unlock Every Achievement
            </h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed">
              Complete guide to all unlockable achievements in HooperVault. What triggers each badge, which ones are worth chasing, and how to display them on your player card.
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
                  Achievements in HooperVault are badges that appear on your player card and leaderboard profile. They are earned by completing specific challenges during the draft and season simulation. Some are easy to unlock on your first playthrough. Others require dozens of drafts and a deep understanding of the build system.
                </p>
                <p className="text-[#A8A8B3] text-lg leading-relaxed mt-4">
                  This guide covers every achievement category, what triggers each badge, and which ones are worth prioritizing if you want to show off on the leaderboard.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">Season Achievements</h2>
                <p className="text-[#A8A8B3] leading-relaxed mb-4">
                  These are earned through your performance in the 82-game season simulation:
                </p>
                <div className="space-y-3">
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">Champion</h3>
                    <p className="text-sm text-[#A8A8B3]">Win the championship by surviving all four playoff rounds. This is the most common prestige achievement and the first one most players chase.</p>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">MVP</h3>
                    <p className="text-sm text-[#A8A8B3]">Earn the MVP award based on your season statistics. Requires consistently high performance across multiple stat categories, not just scoring.</p>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">Hall of Fame</h3>
                    <p className="text-sm text-[#A8A8B3]">The rarest season achievement. Requires a combination of championship wins, high Overall, and exceptional season stats. Most players never unlock this one.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">Draft Achievements</h2>
                <p className="text-[#A8A8B3] leading-relaxed mb-4">
                  These are earned by completing drafts under specific conditions:
                </p>
                <div className="space-y-3">
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">Mode Master</h3>
                    <p className="text-sm text-[#A8A8B3]">Complete at least one draft in all three modes: Classic, Blind, and Chaos. A good first achievement to chase because it teaches you different drafting strategies.</p>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">Perfectionist</h3>
                    <p className="text-sm text-[#A8A8B3]">Reach 95+ Overall in a single build. Requires careful skill stacking in Classic mode. The key is focusing on high-weight attributes (3PT, Mid-Range, Ball Handle, Speed).</p>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">Archetype Collector</h3>
                    <p className="text-sm text-[#A8A8B3]">Complete a draft with each of the 6 archetypes. This requires understanding how different skill combinations produce different archetype identities.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">Which Achievements to Chase First</h2>
                <p className="text-[#A8A8B3] leading-relaxed mb-4">
                  If you are new to HooperVault, start with these three achievements in order:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-[#A8A8B3]">
                    <span className="font-[family-name:var(--font-anton)] text-xl text-[#F2CA50]/40 mr-2">1</span>
                    <span><strong className="text-white">Mode Master</strong> — Play one draft in each mode. This teaches you the full range of drafting strategies and takes about 15 minutes.</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#A8A8B3]">
                    <span className="font-[family-name:var(--font-anton)] text-xl text-[#F2CA50]/40 mr-2">2</span>
                    <span><strong className="text-white">Champion</strong> — Win a championship in Classic mode with a 90+ Overall build. Use a proven build from the <Link href="/en/builds" className="text-[#F2CA50] hover:text-[#F2CA50]/80 transition-colors">build guides</Link> as your template.</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#A8A8B3]">
                    <span className="font-[family-name:var(--font-anton)] text-xl text-[#F2CA50]/40 mr-2">3</span>
                    <span><strong className="text-white">Perfectionist</strong> — Hit 95+ Overall. Use the <Link href="/en/blog/how-to-get-99-overall" className="text-[#F2CA50] hover:text-[#F2CA50]/80 transition-colors">99 Overall guide</Link> to understand attribute stacking.</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card rounded-xl p-6 md:p-8 border-l-4 border-[#F2CA50]">
                <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-3">Achievements Are Cosmetic</h3>
                <p className="text-[#A8A8B3] leading-relaxed">
                  Achievements do not change your attribute ratings or season simulation results. They are badges on your player card that show the community what you have accomplished. A player with 5 achievements and a 75 Overall build is not stronger than a player with 0 achievements and a 75 Overall build — but they have more to show for it.
                </p>
              </div>
            </div>

            {/* Internal Links */}
            <div className="mt-12 pt-8 border-t border-white/8">
              <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide mb-4">Next Reads</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <Link href="/en/blog/how-to-get-99-overall" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">How to Get 99 Overall</span>
                  <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                </Link>
                <Link href="/en/blog/best-archetypes-ranked" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Best Archetypes Ranked</span>
                  <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                </Link>
                <Link href="/en/basketball-player-builder" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Basketball Player Builder</span>
                  <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                </Link>
                <Link href="/en/blog/classic-vs-blind-vs-chaos" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
                  <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Classic vs Blind vs Chaos</span>
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
              <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-3">Start Earning Achievements</h2>
              <p className="text-[#A8A8B3] mb-6">Draft, simulate, and collect badges. How many can you unlock?</p>
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
