import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  Trophy,
  Users,
  Calendar,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Flame,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Build Your Legacy",
  description:
    "Combine legendary basketball skills, build your dream Hooper, simulate an entire career, and share your unique legacy with the world.",
};

function FeaturedPlayerCard() {
  return (
    <div className="legendary-card rounded-xl p-4 w-full max-w-md transform rotate-y-[-10deg] hover:rotate-y-0 transition-transform duration-500 hover:scale-105 cursor-pointer perspective-1000 mx-auto">
      <div className="relative h-80 rounded-lg overflow-hidden mb-4 border border-white/10 bg-gradient-to-br from-[#333539] to-[#1a1c20]">
        <img
          src="/images/hero-card.jpg"
          alt="A highly detailed illustration of a fictional, futuristic basketball player mid-dunk with dramatic stadium lighting."
          className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
        />
        <div className="absolute top-4 right-4 bg-[#333539]/90 backdrop-blur border border-[#F2CA50]/50 text-[#F2CA50] font-[family-name:var(--font-space-grotesk)] text-2xl font-bold px-3 py-1 rounded">
          98
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide">Orion Steele</h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="bg-[#333539] text-[#D0C5AF] font-[family-name:var(--font-space-grotesk)] text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded">Playmaker</span>
            <span className="bg-[#F2CA50]/20 text-[#F2CA50] font-[family-name:var(--font-space-grotesk)] text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded border border-[#F2CA50]/30">Legendary Tier</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
          {[
            { label: "Scoring", value: 95 },
            { label: "Defense", value: 88 },
            { label: "Speed", value: 92 },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#1a1c20] p-2 rounded flex flex-col items-center">
              <span className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-wider text-[#A8A8B3]">{stat.label}</span>
              <span className={`font-[family-name:var(--font-space-grotesk)] text-2xl font-bold ${stat.label === "Defense" ? "text-[#6CB9FF]" : "text-[#F2CA50]"}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        <div className="stadium-glow" />
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 min-h-[600px]">
            <div className="flex-1 space-y-6 md:space-y-8 z-10 text-center md:text-left">
              <h1 className="font-[family-name:var(--font-anton)] text-5xl sm:text-6xl lg:text-7xl text-white uppercase leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F2CA50] to-[#FF5E07]">
                Build Your Legacy
              </h1>
              <p className="font-[family-name:var(--font-hanken-grotesk)] text-lg md:text-xl text-[#A8A8B3] max-w-xl mx-auto md:mx-0 leading-relaxed">
                Combine legendary basketball skills, create your dream Hooper, simulate an entire career, and share your unique legacy with the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Button asChild href="/en/build/mode" variant="secondary" size="xl">
                  <span className="flex items-center gap-2">
                    Start Building <ChevronRight className="h-5 w-5" />
                  </span>
                </Button>
                <Button asChild href="/en/leaderboard" variant="outline" size="xl">
                  <span className="flex items-center gap-2">
                    Explore Hoopers <Users className="h-5 w-5" />
                  </span>
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4 text-sm text-[#A8A8B3]">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#F2CA50]" />
                  <span>3-Minute Builds</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#F2CA50]" />
                  <span>82-Game Simulation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-[#F2CA50]" />
                  <span>Share Results</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center z-10 w-full">
              <FeaturedPlayerCard />
            </div>
          </div>
        </Container>
      </section>

      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide">How It Works</h2>
            <p className="mt-4 text-[#A8A8B3]">Create your Hooper in three simple steps</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Choose Legends",
                desc: "Draft skills inspired by basketball legends across 13 attributes.",
                icon: Users,
              },
              {
                step: "02",
                title: "Build Your Player",
                desc: "Pick a position, balance your strengths, and discover your archetype.",
                icon: Sparkles,
              },
              {
                step: "03",
                title: "Create Your Legacy",
                desc: "Simulate an 82-game season and earn MVP, Champion, or Hall of Fame status.",
                icon: Trophy,
              },
            ].map((item) => (
              <div key={item.step} className="glass-card rounded-xl p-8 text-center hover:bg-white/5 transition-colors">
                <div className="font-[family-name:var(--font-anton)] text-5xl text-[#F2CA50]/30 mb-4">{item.step}</div>
                <item.icon className="h-8 w-8 text-[#F2CA50] mx-auto mb-4" />
                <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-2">{item.title}</h3>
                <p className="text-[#A8A8B3] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide">Featured Hoopers</h2>
              <p className="mt-2 text-[#A8A8B3]">The most impressive builds from the community</p>
            </div>
            <Link href="/en/leaderboard" className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#F2CA50] hover:text-[#F2CA50]/80 transition-colors">
              View Leaderboard <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Marcus Vale", ovr: 98, archetype: "Two-Way Superstar", badges: ["MVP", "Champion"] },
              { name: "Eli Cross", ovr: 96, archetype: "Legendary Shooter", badges: ["Scoring Champ"] },
              { name: "The Ghost", ovr: 98, archetype: "Two-Way Slasher", badges: ["DPOY", "HOF"] },
              { name: "Jax Steele", ovr: 94, archetype: "Floor General", badges: ["All-Star"] },
            ].map((hooper) => (
              <Link key={hooper.name} href="/en/hooper?slug=sample" className="glass-card rounded-xl p-5 hover:bg-white/5 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors">{hooper.name}</h3>
                    <p className="text-sm text-[#A8A8B3]">{hooper.archetype}</p>
                  </div>
                  <div className="bg-[#F2CA50]/20 border border-[#F2CA50]/30 rounded px-2 py-1 text-[#F2CA50] font-[family-name:var(--font-space-grotesk)] font-bold">
                    {hooper.ovr}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hooper.badges.map((badge) => (
                    <span key={badge} className="bg-[#1a1c20] text-[#D0C5AF] font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-wider px-2 py-1 rounded">
                      {badge}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 md:hidden">
            <Button asChild href="/en/leaderboard" variant="outline" fullWidth>
              <span>View Leaderboard</span>
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="glass-card rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF5E07]/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="h-5 w-5 text-[#FF5E07]" />
                <span className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#FF5E07] font-bold">Daily Challenge</span>
              </div>
              <h2 className="font-[family-name:var(--font-anton)] text-2xl md:text-3xl text-white uppercase tracking-wide mb-2">Today&apos;s Challenge</h2>
              <p className="text-[#A8A8B3] mb-4">Seed #20260805 &middot; 234 Players Joined</p>
              <p className="text-white font-medium">Create a Champion Point Guard without Elite Shooting.</p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button asChild href="/en/challenge" variant="secondary" size="lg">
                <span className="flex items-center gap-2">
                  Try Challenge <Calendar className="h-5 w-5" />
                </span>
              </Button>
              <Button asChild href="/en/guides" variant="outline" size="lg">
                <span>Guides</span>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide mb-4">Ready to Build Your Hooper?</h2>
            <p className="text-lg text-[#A8A8B3] mb-8">
              Millions of combinations. One legacy. Start your journey in under 3 minutes.
            </p>
            <Button asChild href="/en/build/mode" variant="primary" size="xl">
              <span className="flex items-center justify-center gap-2">
                Start Building Now <ChevronRight className="h-5 w-5" />
              </span>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
