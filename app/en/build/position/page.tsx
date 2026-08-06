import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ChevronRight, Users, Zap, Shield, Target, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Choose Position | HooperVault",
  description: "Select your Hooper's position: Point Guard, Shooting Guard, Small Forward, Power Forward, or Center.",
};

const positions = [
  {
    id: "PG",
    name: "Point Guard",
    role: "Playmaker",
    description: "The floor general. Elite passing, ball handling, and speed.",
    strengths: ["Passing", "Ball Handle", "Speed"],
    weakness: "Interior Defense",
    icon: Zap,
  },
  {
    id: "SG",
    name: "Shooting Guard",
    role: "Scorer",
    description: "The perimeter threat. Strong shooting and off-ball movement.",
    strengths: ["3PT", "Mid Range", "Speed"],
    weakness: "Rebounding",
    icon: Target,
  },
  {
    id: "SF",
    name: "Small Forward",
    role: "Versatile Wing",
    description: "The Swiss Army knife. Balanced scoring, defense, and athleticism.",
    strengths: ["Finishing", "Perimeter D", "Speed"],
    weakness: "Playmaking",
    icon: ArrowUpRight,
  },
  {
    id: "PF",
    name: "Power Forward",
    role: "Interior Force",
    description: "The hybrid big. Strong finishing, rebounding, and interior defense.",
    strengths: ["Rebound", "Interior D", "Strength"],
    weakness: "Ball Handle",
    icon: Users,
  },
  {
    id: "C",
    name: "Center",
    role: "Rim Protector",
    description: "The defensive anchor. Elite rim protection, rebounding, and strength.",
    strengths: ["Block", "Rebound", "Strength"],
    weakness: "Speed",
    icon: Shield,
  },
];

export default function PositionPage() {
  return (
    <>
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-8">
        <div className="stadium-glow" />
        <Container>
          <div className="text-center max-w-2xl mx-auto relative z-10">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">
              Step 2 of 5
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl text-white uppercase tracking-wide mb-4">
              Pick Your Position
            </h1>
            <p className="text-lg text-[#A8A8B3]">
              Your position sets the foundation for your build.
            </p>
          </div>
        </Container>
      </div>

      <Section className="relative">
        <Container>
          <div className="grid gap-4 max-w-5xl mx-auto">
            {positions.map((pos) => (
              <Link
                key={pos.id}
                href={`/en/build/draft?position=${pos.id}`}
                className="group glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:bg-white/5 hover:border-[#F2CA50]/30 transition-all duration-300"
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F2CA50]/20 to-[#FF5E07]/10 border border-[#F2CA50]/20">
                  <span className="font-[family-name:var(--font-anton)] text-3xl text-[#F2CA50]">{pos.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors">
                      {pos.name}
                    </h2>
                    <span className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-wider px-2 py-1 rounded bg-[#F2CA50]/10 text-[#F2CA50] border border-[#F2CA50]/20">
                      {pos.role}
                    </span>
                  </div>
                  <p className="text-[#A8A8B3] mb-4">{pos.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {pos.strengths.map((s) => (
                      <span key={s} className="text-xs font-medium text-white bg-[#1a1c20] px-2 py-1 rounded">
                        {s}
                      </span>
                    ))}
                    <span className="text-xs font-medium text-[#A8A8B3] bg-[#1a1c20] px-2 py-1 rounded">
                      Weak: {pos.weakness}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 self-end md:self-center">
                  <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#F2CA50] group-hover:border-[#F2CA50] transition-colors">
                    <ChevronRight className="h-5 w-5 text-white group-hover:text-[#0B0B12] transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
