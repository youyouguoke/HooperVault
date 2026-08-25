import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, buildBreadcrumbList } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FeaturedHoopers } from "@/components/leaderboard/FeaturedHoopers";
import { HomeChallenge } from "@/components/challenge/HomeChallenge";
import {
  Trophy,
  Users,
  TrendingUp,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Build Your Legacy",
  description:
    "Combine legendary basketball skills, build your dream Hooper, simulate an entire career, and share your unique legacy with the world.",
  keywords: [
    "hooper vault",
    "basketball player builder",
    "NBA build game",
    "basketball season simulator",
  ],
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      "zh-CN": "/zh-CN",
      "x-default": "/en",
    },
  },
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "HooperVault - Build Your Ultimate Hooper",
    description:
      "Combine legendary basketball skills, build your dream Hooper, simulate an entire career, and share your unique legacy with the world.",
    url: "/en",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "HooperVault - Build your dream basketball player with legendary skills" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@hoopervault",
    title: "HooperVault - Build Your Ultimate Hooper",
    description:
      "Combine legendary basketball skills, build your dream Hooper, simulate an entire career, and share your unique legacy with the world.",
    images: ["https://hoopervault.com/images/og-default.jpg"],
  },
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
      <JsonLd data={buildBreadcrumbList([{ name: "Home", href: "/en" }])} />
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
          <FeaturedHoopers lang="en" />
        </Container>
      </Section>

      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <HomeChallenge lang="en" />
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

      <Section className="border-t border-white/8 bg-[#111317]">
        <Container>
          <div className="text-center mb-8">
            <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide">Learn More</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-4 max-w-5xl mx-auto">
            <Link href="/en/build-a-bucket-nba-game" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
              <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Build a Bucket NBA Game</span>
              <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
            </Link>
            <Link href="/en/basketball-player-builder" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
              <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Basketball Player Builder</span>
              <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
            </Link>
            <Link href="/en/blog" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
              <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">Draft Strategy Blog</span>
              <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
            </Link>
            <Link href="/en/guides" className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all">
              <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">How to Play Guide</span>
              <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
