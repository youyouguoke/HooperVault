import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd, buildBreadcrumbList, buildFAQSchema, buildArticleSchema, buildHowToSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Build a Bucket NBA Game | HooperVault",
  description:
    "Play a free build a bucket NBA game. Draft basketball legends, steal their skills, build your custom player, and simulate an 82-game season.",
  keywords: [
    "build a bucket NBA game",
    "build a bucket game",
    "build a player",
    "build a player bucket game",
    "NBA player builder",
    "NBA-style player",
    "basketball player builder",
    "custom basketball player",
    "custom NBA player",
    "basketball skills",
    "basketball legend",
    "basketball player game",
    "82 game season",
    "basketball season simulator",
  ],
  alternates: {
    canonical: "/en/build-a-bucket-nba-game",
    languages: {
      en: "/en/build-a-bucket-nba-game",
      "x-default": "/en/build-a-bucket-nba-game",
    },
  },
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "Build a Bucket NBA Game | HooperVault",
    description:
      "Play a free build a bucket NBA game. Draft basketball legends, steal their skills, build your custom player, and simulate an 82-game season.",
    url: "/en/build-a-bucket-nba-game",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
};

const faqs = [
  {
    question: "What is a build a bucket NBA game?",
    answer:
      "A build a bucket NBA game is a basketball player builder game where you create a custom player by drafting legendary basketball players and selecting their skills. HooperVault lets you build your player and test the result across an 82-game season.",
  },
  {
    question: "Can I build an NBA-style player?",
    answer:
      "Yes. HooperVault lets you create a custom NBA-style basketball player by selecting skills from legendary players during a 13-round draft.",
  },
  {
    question: "Is this a free build a bucket NBA game?",
    answer:
      "Yes. HooperVault is free to play in your browser. You can build your basketball player, draft legendary skills, and run a full season simulation.",
  },
  {
    question: "How does the basketball player builder work?",
    answer:
      "Each round gives you a legendary basketball team and players to choose from. Select one player, steal one skill, and continue building your Hooper until all 13 skills are complete.",
  },
  {
    question: "How many skills can I choose?",
    answer:
      "Your Hooper is built across 13 basketball skills covering scoring, playmaking, defense, rebounding, athleticism, strength, and clutch performance.",
  },
  {
    question: "What happens after I build my player?",
    answer:
      "Your custom basketball player enters an 82-game season simulation. You can see the season record, statistics, playoff results, and final Hooper result.",
  },
  {
    question: "What is the best basketball player build?",
    answer:
      "There is no single best build. The strongest Hoopers depend on the skills available during the draft and how well those skills work together across a full season.",
  },
  {
    question: "Does this work on mobile?",
    answer:
      "Yes. HooperVault is designed as a browser basketball game that works across desktop, tablet, and mobile devices.",
  },
];

const howToSteps = [
  {
    name: "Spin a Legendary Team",
    text: "Each round starts with a legendary basketball team and a new group of players to choose from.",
  },
  {
    name: "Pick One Legend",
    text: "Choose the player whose skill set best fits the Hooper you want to build.",
  },
  {
    name: "Steal One Skill",
    text: "Take one basketball skill from your chosen legend and add it to your custom player.",
  },
  {
    name: "Sim the Season",
    text: "Complete all 13 skill picks, then send your Hooper through an 82-game season to see how the build performs.",
  },
];

const skills = [
  { abbr: "3PT", name: "Three-Point Shot", group: "Scoring" },
  { abbr: "MID", name: "Mid-Range", group: "Scoring" },
  { abbr: "FIN", name: "Finishing", group: "Scoring" },
  { abbr: "DNK", name: "Dunk", group: "Scoring" },
  { abbr: "HAN", name: "Ball Handle", group: "Playmaking" },
  { abbr: "PAS", name: "Passing", group: "Playmaking" },
  { abbr: "PDEF", name: "Perimeter Defense", group: "Defense" },
  { abbr: "IDEF", name: "Interior Defense", group: "Defense" },
  { abbr: "BLK", name: "Block", group: "Defense" },
  { abbr: "REB", name: "Rebound", group: "Rebounding" },
  { abbr: "ATH", name: "Athleticism", group: "Physical" },
  { abbr: "STR", name: "Strength", group: "Physical" },
  { abbr: "CLU", name: "Clutch", group: "Mental" },
];

export default function BuildABucketNBAGamePage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Home", href: "/en" },
          { name: "Build a Bucket NBA Game", href: "/en/build-a-bucket-nba-game" },
        ])}
      />
      <JsonLd
        data={buildArticleSchema({
          title: "Build a Bucket NBA Game — Create Your Own Basketball Player | HooperVault",
          description:
            "Draft legendary basketball players, steal individual skills, build your custom player, and test across a full 82-game season.",
          url: "/en/build-a-bucket-nba-game",
        })}
      />
      <JsonLd data={buildFAQSchema(faqs)} />
      <JsonLd
        data={buildHowToSchema(
          "How to Build a Bucket NBA Player",
          "Draft legendary basketball players, steal one skill at a time, and build your own custom hooper for an 82-game season.",
          howToSteps
        )}
      />

      {/* ==================== 01 HERO ==================== */}
      <Section className="relative border-b border-white/8 bg-[#111317] pt-20 pb-16 overflow-hidden">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-4">
              Free Basketball Browser Game
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase tracking-wide mb-6">
              Build a Bucket NBA Game
            </h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Draft legendary basketball players, steal one skill at a time, and build your own
              custom hooper. Then put your creation through a full 82-game season.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button asChild href="/en/build/mode" variant="primary" size="xl">
                <span className="flex items-center gap-2">
                  Build Your Hooper <ChevronRight className="h-5 w-5" />
                </span>
              </Button>
              <Button asChild href="#how-it-works" variant="outline" size="xl">
                <span className="flex items-center gap-2">
                  How It Works <ArrowRight className="h-5 w-5" />
                </span>
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { value: "13", label: "Skill Picks" },
                { value: "30", label: "Legendary Teams" },
                { value: "1", label: "Skill Each Round" },
                { value: "82", label: "Game Season" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
                  <div className="font-[family-name:var(--font-anton)] text-3xl text-[#F2CA50]">
                    {stat.value}
                  </div>
                  <div className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#A8A8B3] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 02 HOW IT WORKS ==================== */}
      <Section id="how-it-works">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide">
              How the Build a Bucket NBA Game Works
            </h2>
            <p className="mt-4 text-[#A8A8B3] max-w-2xl mx-auto">
              Four steps from legendary draft to season simulation. Every pick shapes your
              custom basketball player.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {howToSteps.map((step, i) => (
              <div
                key={step.name}
                className="glass-card rounded-xl p-6 hover:bg-white/5 transition-colors"
              >
                <div className="font-[family-name:var(--font-anton)] text-3xl text-[#F2CA50]/30 mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide mb-2">
                  {step.name}
                </h3>
                <p className="text-[#A8A8B3] text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ==================== 03 WHAT IS A BUILD A BUCKET NBA GAME ==================== */}
      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-6">
              What Is a Build a Bucket NBA Game?
            </h2>
            <div className="space-y-4 text-[#A8A8B3] leading-relaxed">
              <p>
                A build a bucket NBA game is a basketball game where you create your own player by
                choosing skills from legendary players. Instead of simply adjusting sliders, you
                make a series of draft decisions that shape your custom basketball player.
              </p>
              <p>
                In HooperVault, you draft basketball legends, steal individual skills, complete
                your 13-round build, and then test your player across a full 82-game season. Each
                decision you make in the draft affects how your custom player performs when it
                matters most.
              </p>
              <p>
                The concept is simple: every legendary basketball player on the draft board has a
                unique skill set. You pick the legend whose skills fit your strategy, steal one
                basketball skill, and move to the next round. After 13 rounds, your custom NBA
                player is ready for the season.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 04 BUILD A BUCKET VS BUILD A PLAYER ==================== */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-6">
              Build a Bucket vs Build a Player
            </h2>
            <div className="space-y-4 text-[#A8A8B3] leading-relaxed">
              <p>
                A build a player game usually focuses on creating a custom character from a large
                set of options. A build a bucket game puts more emphasis on basketball identity and
                scoring ability.
              </p>
              <p>
                HooperVault combines both ideas. You build a custom basketball player by drafting
                legendary players and stealing individual skills, then discover whether your build
                can actually perform over a full season.
              </p>
              <p>
                The difference matters because a build a bucket game forces you to think about
                basketball strategy. You are not just picking the highest-rated stat. You are
                choosing skills that work together to create a player identity — a scorer, a
                playmaker, a two-way defender, or a balanced all-around hooper.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-3">
                  Build a Player
                </h3>
                <ul className="space-y-2 text-[#A8A8B3] text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" />
                    <span>Custom character from a large option set</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" />
                    <span>Focus on appearance and role selection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" />
                    <span>Slider-based stat allocation</span>
                  </li>
                </ul>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-3">
                  Build a Bucket
                </h3>
                <ul className="space-y-2 text-[#A8A8B3] text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" />
                    <span>Basketball identity and scoring focus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" />
                    <span>Strategic draft decisions from legendary players</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#F2CA50] mt-0.5 flex-shrink-0" />
                    <span>Tested across an 82-game season simulation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 05 NBA PLAYER BUILDER ==================== */}
      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-6">
              NBA Player Builder
            </h2>
            <div className="space-y-4 text-[#A8A8B3] leading-relaxed">
              <p>
                Looking for an NBA player builder? HooperVault lets you create an NBA-style player
                without manually editing dozens of sliders. Draft legendary basketball players,
                choose the skills that fit your strategy, and watch your Hooper evolve through the
                draft.
              </p>
              <p>
                Every basketball player builder gives you a different way to create. Some use
                point-buy systems. Others use preset archetypes. HooperVault uses a skill draft
                where each pick comes from a real basketball legend. You are not just building a
                stat line — you are borrowing the abilities of NBA greats to create a custom
                basketball player that is entirely your own.
              </p>
              <p>
                The basketball player builder supports every play style. Whether you want to
                create a perimeter shooter, a rim-protecting center, a pass-first floor general,
                or a slashing wing, the draft gives you the tools to build it. The 82-game season
                then tests whether your NBA-style player can back up the build.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Button asChild href="/en/build/mode" variant="primary" size="lg">
                <span className="flex items-center gap-2">
                  Start Building Your Player <ChevronRight className="h-5 w-5" />
                </span>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 06 INTERACTIVE BUILDER PREVIEW ==================== */}
      <Section>
        <Container>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide">
              Interactive Builder Preview
            </h2>
            <p className="mt-4 text-[#A8A8B3] max-w-2xl mx-auto">
              This is how the draft works. Each round, choose one legend and steal one skill.
            </p>
          </div>

          {/* Draft Mockup */}
          <div className="max-w-2xl mx-auto glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#A8A8B3]">
                Build Your Hooper
              </span>
              <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-[#F2CA50]">
                Round 4 / 13
              </span>
            </div>

            <p className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide mb-4">
              Choose Your Legend
            </p>

            {/* Legend Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {["Legend A", "Legend B", "Legend C"].map((name, i) => (
                <div
                  key={name}
                  className={`rounded-xl p-4 text-center border transition-colors ${
                    i === 1
                      ? "border-[#F2CA50]/50 bg-[#F2CA50]/10"
                      : "border-white/8 bg-white/5 hover:bg-white/8"
                  }`}
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-white/10 mb-2 flex items-center justify-center">
                    <span className="font-[family-name:var(--font-anton)] text-sm text-[#A8A8B3]">
                      {i === 1 ? "★" : "?"}
                    </span>
                  </div>
                  <span className="font-[family-name:var(--font-space-grotesk)] text-xs text-[#A8A8B3]">
                    {name}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-[family-name:var(--font-anton)] text-sm text-white uppercase tracking-wide mb-3">
              Choose One Skill
            </p>

            {/* Skill Options */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {["3PT", "MID", "FIN", "CLU"].map((skill, i) => (
                <div
                  key={skill}
                  className={`rounded-lg p-3 text-center border transition-colors ${
                    i === 0
                      ? "border-[#F2CA50]/50 bg-[#F2CA50]/10"
                      : "border-white/8 bg-white/5 hover:bg-white/8"
                  }`}
                >
                  <span className="font-[family-name:var(--font-anton)] text-sm text-white">
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            <Button asChild href="/en/build/mode" variant="primary" size="lg" className="w-full">
              <span className="flex items-center justify-center gap-2">
                Continue <ChevronRight className="h-5 w-5" />
              </span>
            </Button>
          </div>

          <div className="text-center mt-8">
            <Button asChild href="/en/build/mode" variant="primary" size="xl">
              <span className="flex items-center gap-2">
                Start Building Your Player <ChevronRight className="h-5 w-5" />
              </span>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ==================== 07 13 BASKETBALL SKILLS ==================== */}
      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide">
                Build Your Custom Basketball Player
              </h2>
              <p className="mt-4 text-[#A8A8B3] max-w-2xl mx-auto">
                Every Hooper is shaped by 13 basketball skills. Your choices determine what kind
                of player you create and how that player performs during the season simulation.
              </p>
            </div>

            {/* Skill Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.abbr}
                  className="glass-card rounded-xl p-4 text-center hover:bg-white/5 transition-colors"
                >
                  <div className="font-[family-name:var(--font-anton)] text-xl text-[#F2CA50]">
                    {skill.abbr}
                  </div>
                  <div className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-widest text-[#A8A8B3] mt-1">
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Skill Groups */}
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  group: "Scoring",
                  skills: "3PT, MID, FIN, DNK",
                  desc: "How many points your player can generate from every level of the court.",
                },
                {
                  group: "Playmaking",
                  skills: "HAN, PAS",
                  desc: "Shot quality and creation. Higher playmaking means better looks in the simulation.",
                },
                {
                  group: "Defense",
                  skills: "PDEF, IDEF, BLK",
                  desc: "Perimeter and interior stops, plus rim protection. Defense wins close games.",
                },
                {
                  group: "Rebounding",
                  skills: "REB",
                  desc: "Second-chance points and defensive boards. Controls the pace of the game.",
                },
                {
                  group: "Physical",
                  skills: "ATH, STR",
                  desc: "Speed, explosiveness, and power. Physical tools amplify every other skill.",
                },
                {
                  group: "Mental",
                  skills: "CLU",
                  desc: "Clutch performance in close games and playoff pressure moments.",
                },
              ].map((cat) => (
                <div key={cat.group} className="glass-card rounded-xl p-5">
                  <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-1">
                    {cat.group}
                  </h3>
                  <p className="text-xs text-white/60 font-[family-name:var(--font-space-grotesk)] mb-2">
                    {cat.skills}
                  </p>
                  <p className="text-sm text-[#A8A8B3] leading-relaxed">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 08 BUILD A BETTER BASKETBALL PLAYER ==================== */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-6">
              Build a Better Basketball Player
            </h2>
            <div className="space-y-4 text-[#A8A8B3] leading-relaxed">
              <p>
                The highest-rated skill is not always the best choice. A great basketball player
                needs more than one way to impact a game.
              </p>
              <p>
                You might build an elite scorer, a two-way defender, a powerful finisher, or a
                balanced all-around player. The real test comes when your custom player enters the
                82-game season.
              </p>
              <p>
                The best basketball player build is one where every skill reinforces the same
                identity. A 92 Overall build with perfect internal consistency will outperform a
                95 Overall build with contradictory picks. Think about basketball strategy, not
                just individual attribute ratings.
              </p>
            </div>

            {/* Build Strategy Cards */}
            <div className="grid gap-4 md:grid-cols-3 mt-8">
              {[
                {
                  title: "Elite Scorer",
                  desc: "Max out 3PT, MID, and FIN. Add CLU for close-game performance. Best for players who want to dominate offensively.",
                },
                {
                  title: "Two-Way Defender",
                  desc: "Balance PDEF, IDEF, BLK with enough scoring to stay on the court. Defense-first builds win playoff series.",
                },
                {
                  title: "Balanced All-Around",
                  desc: "Spread picks across scoring, playmaking, and defense. No single weakness for opponents to exploit.",
                },
              ].map((build) => (
                <div key={build.title} className="glass-card rounded-xl p-5">
                  <h3 className="font-[family-name:var(--font-anton)] text-lg text-[#F2CA50] uppercase tracking-wide mb-2">
                    {build.title}
                  </h3>
                  <p className="text-sm text-[#A8A8B3] leading-relaxed">{build.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 09 82-GAME SEASON ==================== */}
      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-6">
              Test Your Player in an 82-Game Season
            </h2>
            <div className="space-y-4 text-[#A8A8B3] leading-relaxed">
              <p>
                Your build does not end when the draft ends. After 13 skill picks, your custom
                basketball player enters a full 82-game season. Track wins, losses, player
                statistics, game results, and playoff performance to discover whether your build
                actually works.
              </p>
              <p>
                The basketball season simulator evaluates every attribute holistically. A scorer
                who cannot create their own shot will struggle against good defenses. A defender
                who cannot score will put too much pressure on teammates. The 82-game season
                reveals every strength and every flaw in your build.
              </p>
            </div>

            {/* Season Stats Visual */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { value: "82", label: "Games", sub: "Full Season" },
                { value: "58–24", label: "Record", sub: "1st Seed" },
                { value: "Playoffs", label: "4 Rounds", sub: "Best of 7" },
                { value: "Champion", label: "Finals", sub: "Ring Earned" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-5 text-center">
                  <div className="font-[family-name:var(--font-anton)] text-2xl text-[#F2CA50]">
                    {stat.value}
                  </div>
                  <div className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-white mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-[#A8A8B3] mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button asChild href="/en/build/mode" variant="primary" size="lg">
                <span className="flex items-center gap-2">
                  Build Your Player <ChevronRight className="h-5 w-5" />
                </span>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 10 YOUR HOOPER RESULT ==================== */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-6">
              See What Your Hooper Becomes
            </h2>
            <p className="text-[#A8A8B3] leading-relaxed mb-8">
              Every build produces a different player identity, season record, and legacy.
            </p>

            {/* Result Card Mockup */}
            <div className="glass-card rounded-2xl p-6 md:p-8 max-w-md mx-auto">
              <div className="text-center mb-6">
                <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#A8A8B3] mb-1">
                  Your Hooper
                </p>
                <div className="font-[family-name:var(--font-anton)] text-5xl text-[#F2CA50]">
                  OVR 94
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { abbr: "3PT", val: "97" },
                  { abbr: "MID", val: "91" },
                  { abbr: "FIN", val: "95" },
                  { abbr: "PDEF", val: "88" },
                  { abbr: "REB", val: "82" },
                  { abbr: "CLU", val: "96" },
                ].map((attr) => (
                  <div key={attr.abbr} className="text-center">
                    <div className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-widest text-[#A8A8B3]">
                      {attr.abbr}
                    </div>
                    <div className="font-[family-name:var(--font-anton)] text-lg text-white">
                      {attr.val}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/8 pt-4 flex items-center justify-between">
                <div>
                  <div className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-widest text-[#A8A8B3]">
                    Record
                  </div>
                  <div className="font-[family-name:var(--font-anton)] text-xl text-white">
                    61–21
                  </div>
                </div>
                <div className="glass-card rounded-lg px-4 py-2">
                  <span className="font-[family-name:var(--font-anton)] text-sm text-[#F2CA50] uppercase">
                    Champion
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button asChild href="/en/hooper" variant="outline" size="lg">
                <span className="flex items-center gap-2">
                  See Example Results <ChevronRight className="h-5 w-5" />
                </span>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== 11 FAQ ==================== */}
      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-2 text-center">
              Questions Before the Tip
            </h2>
            <p className="text-[#A8A8B3] text-center mb-8">
              Everything you need to know before building your custom basketball player.
            </p>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group glass-card rounded-xl overflow-hidden"
                >
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

      {/* ==================== 12 FINAL CTA ==================== */}
      <Section>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide mb-4">
              Ready to Build Your Hooper?
            </h2>
            <p className="text-lg text-[#A8A8B3] mb-8">
              13 skill picks. 30 legendary teams. 82 games. One legacy card.
            </p>
            <Button asChild href="/en/build/mode" variant="primary" size="xl">
              <span className="flex items-center justify-center gap-2">
                Build Your Hooper <ChevronRight className="h-5 w-5" />
              </span>
            </Button>

            {/* Internal Links */}
            <div className="mt-12 pt-8 border-t border-white/8">
              <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide mb-4">
                Explore More
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { href: "/en/basketball-player-builder", label: "Basketball Player Builder" },
                  { href: "/en/guides", label: "HooperVault Draft Guide" },
                  { href: "/en/blog/build-a-bucket-nba-game", label: "Build a Bucket Strategy Guide" },
                  { href: "/en/challenge", label: "Daily Challenge" },
                  { href: "/en/leaderboard", label: "Leaderboard" },
                  { href: "/en/blog/classic-vs-blind-vs-chaos", label: "Classic vs Blind vs Chaos Mode" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all"
                  >
                    <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">
                      {link.label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
