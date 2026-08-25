import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd, buildBreadcrumbList } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "HooperVault Blog | Basketball Player Builder Guides & Strategy",
  description: "Draft strategy guides, build breakdowns, archetype analysis, and season simulation tips for HooperVault basketball player builder.",
  keywords: ["basketball player builder guide", "hoopervault guide", "NBA build strategy", "basketball simulator tips"],
  alternates: {
    canonical: "/en/blog",
    languages: { en: "/en/blog", "zh-CN": "/zh-CN/blog", "x-default": "/en/blog" },
  },
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "HooperVault Blog | Basketball Player Builder Guides & Strategy",
    description: "Draft strategy guides, build breakdowns, archetype analysis, and season simulation tips for HooperVault basketball player builder.",
    url: "/en/blog",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
};

const POSTS = [
  {
    slug: "build-a-bucket-nba-game",
    category: "DRAFT STRATEGY",
    title: "Build a Bucket NBA Game: How to Draft a Scorer That Lasts 82 Games",
    excerpt: "Chasing the highest shooting rating is not enough. A true bucket needs shot creation, finishing, and clutch — here is how to draft one that survives a full season.",
    readTime: "6 min",
  },
  {
    slug: "how-to-get-99-overall",
    category: "NUMBERS GUIDE",
    title: "How to Get a 99 Overall Hooper — Full Attribute Breakdown",
    excerpt: "The path to 99 Overall is not about picking the highest-rated skills. It is about understanding how the attribute system distributes points across 13 picks.",
    readTime: "8 min",
  },
  {
    slug: "classic-vs-blind-vs-chaos",
    category: "DRAFT MODES",
    title: "Classic vs Blind vs Chaos: Which Draft Mode Should You Play?",
    excerpt: "Full scouting, hidden ratings, or a limited board. Each mode changes how you evaluate skills and which archetypes become viable.",
    readTime: "5 min",
  },
  {
    slug: "best-archetypes-ranked",
    category: "ARCHETYPE GUIDE",
    title: "Best Archetypes Ranked: Which Player Identity Wins the Most?",
    excerpt: "Splash Legend, Floor General, Two-Way Superstar, and more. A data-backed look at which archetypes produce the best season records.",
    readTime: "7 min",
  },
  {
    slug: "basketball-player-builder-achievements",
    category: "ACHIEVEMENTS",
    title: "Basketball Player Builder Achievements: Unlock Every Badge",
    excerpt: "Complete guide to all unlockable achievements in HooperVault. What triggers each badge and which ones are worth chasing.",
    readTime: "5 min",
  },
];

export default function BlogPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([
        { name: "Home", href: "/en" },
        { name: "Blog", href: "/en/blog" },
      ])} />

      <Section className="relative border-b border-white/8 bg-[#111317] pt-16 pb-12 overflow-hidden">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">Film Room</p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase tracking-wide mb-6">HooperVault Blog</h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed">Draft strategy guides, build breakdowns, and season simulation tips for the basketball player builder.</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            {POSTS.map((post, i) => (
              <Link
                key={post.slug}
                href={`/en/blog/${post.slug}`}
                className="group glass-card rounded-2xl p-6 md:p-8 hover:bg-white/5 transition-all block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs uppercase tracking-wider text-[#F2CA50] font-bold font-[family-name:var(--font-space-grotesk)]">{post.category}</span>
                  <span className="text-xs text-[#A8A8B3]">{post.readTime}</span>
                </div>
                <h2 className="font-[family-name:var(--font-anton)] text-xl md:text-2xl text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors mb-3">
                  {post.title}
                </h2>
                <p className="text-[#A8A8B3] leading-relaxed">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm text-[#F2CA50] mt-4">Read Guide <ChevronRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild href="/en/build/mode" variant="primary" size="lg">
              <span className="flex items-center justify-center gap-2">Try the Builder <ChevronRight className="h-5 w-5" /></span>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
