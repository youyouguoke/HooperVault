import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JsonLd, buildBreadcrumbList, buildFAQSchema, buildHowToSchema } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Vault Playbook — How to Build a Hooper",
  description: "Learn how to draft legendary skills, build your dream basketball player, simulate an 82-game season, and share your legacy. Complete HooperVault beginner guide.",
  keywords: ["hooper vault", "basketball player builder", "NBA build game", "basketball season simulator"],
  alternates: {
    canonical: "/en/guides",
    languages: { en: "/en/guides", "zh-CN": "/zh-CN/guides", "x-default": "/en/guides" },
  },
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "Guides",
    description: "Learn how to draft legendary skills, build your dream basketball player, simulate an 82-game season, and share your legacy.",
    url: "/en/guides",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
};

export default function GuidesPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([{ name: "Home", href: "/en" }, { name: "Guides", href: "/en/guides" }])} />
      <JsonLd data={buildHowToSchema(
        "How to Build Your Hooper in HooperVault",
        "Create your dream basketball player in 5 simple steps: draft skills, pick a mode, read your archetype, simulate the season, and share your legacy.",
        [
          { name: "Choose Legends", text: "Draft 13 legendary skills inspired by basketball greats across shooting, finishing, playmaking, defense, and mental attributes." },
          { name: "Pick a Mode", text: "Select Classic mode for full visibility of ratings, or Blind mode to draft by instinct alone. Both unlock the same archetypes." },
          { name: "Read the Archetype", text: "After 13 picks, receive your archetype identity such as Two-Way Superstar, Splash Legend, or Floor General. This determines your badges." },
          { name: "Simulate the Season", text: "Run an 82-game schedule against generated opponents. Win games, build streaks, and fight through four playoff rounds for the championship." },
          { name: "Share Your Legacy", text: "Get a permanent result page with your full legacy card including attributes, season stats, playoff journey, awards, and story. Share or download." },
        ]
      )} />
      <JsonLd data={buildFAQSchema([
        { question: "What is HooperVault?", answer: "HooperVault is a free basketball build simulator where you draft legendary skills inspired by real NBA greats, create a custom player, simulate an 82-game season, and share your unique legacy card." },
        { question: "Is HooperVault a basketball player builder?", answer: "Yes. HooperVault is a browser-based basketball player builder where you draft 13 legendary skills, choose an archetype, and test your build across a full 82-game simulated season. No download or sign-up required." },
        { question: "How many skills do I draft?", answer: "You draft 13 skills across five categories: Shooting, Finishing, Playmaking, Defense, and Mental. Each skill adds points to specific attributes and shapes your archetype." },
        { question: "How does the HooperVault draft work?", answer: "The draft has 13 rounds. Each round you pick one legendary skill from a pool of basketball greats. Your picks determine your attribute ratings, archetype, and badge eligibility. You can play in Classic, Blind, or Chaos mode." },
        { question: "What is the difference between Classic and Blind mode?", answer: "Classic mode shows you all attribute ratings as you draft, letting you optimize strategically. Blind mode hides ratings so you draft purely on skill names and basketball knowledge." },
        { question: "Which draft mode is best for beginners?", answer: "Classic mode is best for beginners because it shows all attribute ratings. You can learn how skills distribute points across attributes by watching the numbers change as you draft." },
        { question: "What is an archetype?", answer: "An archetype is your build identity determined by your 13 skill picks. Examples include Splash Legend (elite shooter), Floor General (playmaker), and Rim Protector (defensive anchor). Each archetype unlocks specific badges." },
        { question: "What are the archetypes in HooperVault?", answer: "HooperVault has 6 archetypes: Splash Legend (shooter), Floor General (playmaker), Two-Way Superstar (balanced), Legendary Slasher (finisher), Rim Protector (defender), and Versatile Wing (all-around). Your archetype is determined by your skill picks." },
        { question: "Can I share my build?", answer: "Yes! Every build gets a permanent shareable page with your full legacy card including attributes, season stats, playoff results, awards, and story. You can also download a card image for social media." },
        { question: "Is HooperVault free?", answer: "Yes, HooperVault is completely free to use. No sign-up required, no pay-to-win mechanics. Just draft, build, simulate, and share." },
        { question: "Is this an official NBA game?", answer: "No. HooperVault is an independent fan-made project and is not affiliated with, endorsed by, or connected to the NBA, NBPA, 2K, or any basketball organization. Player names and skill references are used for entertainment and informational purposes only." },
      ])} />
      <Section className="relative border-b border-white/8 bg-[#111317] pt-16 pb-12 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-[position:30%_70%] opacity-40"
          style={{ backgroundImage: "url('/images/guides-bg.jpg')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111317]/40 via-[#111317]/60 to-[#111317]" />
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

      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-6 text-center">Explore More</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <ExploreCard href="/en/builds" title="Build Guides" body="20 optimized builds with skills and attribute targets." />
              <ExploreCard href="/en/archetypes" title="Archetypes" body="Discover every play style your Hooper can become." />
              <ExploreCard href="/en/legends" title="Legend Skills" body="Browse legendary skills by category and inspiration." />
              <ExploreCard href="/en/basketball-player-builder" title="Basketball Player Builder" body="Create your custom player with the free browser-based builder." />
              <ExploreCard href="/en/blog" title="Strategy Blog" body="Draft strategy guides, build breakdowns, and season tips." />
              <ExploreCard href="/en/blog/build-a-bucket-nba-game" title="Build a Bucket" body="How to draft a scorer that lasts 82 games." />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ExploreCard({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="group glass-card rounded-2xl p-6 hover:bg-white/5 transition-all block">
      <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors mb-2">{title}</h3>
      <p className="text-sm text-[#A8A8B3] mb-4">{body}</p>
      <span className="inline-flex items-center gap-1 text-sm text-[#F2CA50]">View <ChevronRight className="h-4 w-4" /></span>
    </Link>
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
