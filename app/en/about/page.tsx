import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { JsonLd, buildBreadcrumbList } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "About",
  description: "HooperVault is a fan-built basketball lab where you draft legendary skills, build a unique Hooper, and simulate an 82-game legacy. No real rosters, no pay-to-win.",
  keywords: ["hooper vault", "basketball player builder", "NBA build game", "basketball season simulator"],
  alternates: {
    canonical: "/en/about",
    languages: { en: "/en/about", "zh-CN": "/zh-CN/about", "x-default": "/en/about" },
  },
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "About",
    description: "HooperVault is a fan-built basketball lab where you draft legendary skills, build a unique Hooper, and simulate an 82-game legacy.",
    url: "/en/about",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([{ name: "Home", href: "/en" }, { name: "About", href: "/en/about" }])} />
      <Section className="relative border-b border-white/8 bg-[#111317] pt-16 pb-8">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">
              Our Mission
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase tracking-wide mb-6">
              About HooperVault
            </h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed">
              HooperVault is a fan-built basketball lab where you draft legendary skills, build a unique Hooper, and simulate an 82-game legacy. No real rosters. No pay-to-win. Just your decisions, your player, and the stats that prove it.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto grid gap-12">
            <div>
              <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-3">What is HooperVault?</h2>
              <p className="text-[#A8A8B3] leading-relaxed">
                We love basketball builds. But instead of locking you behind ratings you cannot control, HooperVault gives you a clean draft table: 13 rounds, 3 skill pools, one permanent Hooper. Every skill changes your attributes, badges, and story. The result is a player card you actually created.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Draft", desc: "Pick 13 legendary skills across finishing, shooting, playmaking, and defense." },
                { title: "Build", desc: "Choose a position and mode that shape your attribute baseline." },
                { title: "Simulate", desc: "Run an 82-game season and see how your choices translate into wins." },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-6">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm uppercase tracking-wider text-[#F2CA50] mb-2">{item.title}</h3>
                  <p className="text-[#A8A8B3] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-3">Who is it for?</h2>
              <p className="text-[#A8A8B3] leading-relaxed">
                Casual hoop heads, fantasy players, 2K build addicts, and anyone who has ever argued about the perfect all-time guard. HooperVault is built for people who enjoy the theory of basketball as much as the game itself.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6 md:p-8 border-l-4 border-[#F2CA50]">
              <p className="text-white/90 italic leading-relaxed">
                "We are not trying to replace the NBA or 2K. We are building the simplest, most replayable basketball build toy on the internet."
              </p>
              <p className="text-[#F2CA50] text-sm mt-4 font-[family-name:var(--font-space-grotesk)] uppercase tracking-wider">— The HooperVault Team</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
