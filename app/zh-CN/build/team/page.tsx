"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { HISTORIC_TEAMS, getDailyTeamPool, type HistoricTeam } from "@/data/teams";
import { Dices, ChevronRight, Trophy } from "lucide-react";

const DAILY_SEED = 20260805;

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function TeamPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111317]" />}>
      <TeamPageInner />
    </Suspense>
  );
}

function TeamPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "classic";
  const seedParam = parseInt(searchParams.get("seed") || "0", 10);
  const seed = seedParam || DAILY_SEED;

  const pool = useMemo(() => getDailyTeamPool(seed, 3), [seed]);
  const [selectedTeam, setSelectedTeam] = useState<HistoricTeam | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    if (!spinning) return;
    let frame = 0;
    const totalFrames = 45;
    const targetIndex = hashString(`${seed}:${mode}`) % pool.length;
    const interval = setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      const current = Math.floor(progress * pool.length + frame * 0.5) % pool.length;
      setDisplayIndex(current);
      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayIndex(targetIndex);
        setSelectedTeam(pool[targetIndex]);
        setSpinning(false);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [spinning, pool, seed, mode]);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setSelectedTeam(null);
  };

  const handleConfirm = () => {
    if (!selectedTeam) return;
    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("team", selectedTeam.id);
    params.set("seed", seed.toString());
    router.push(`/zh-CN/build/position?${params.toString()}`);
  };

  const team = selectedTeam || pool[displayIndex];

  return (
    <>
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-8">
        <div className="stadium-glow" />
        <Container>
          <div className="text-center max-w-2xl mx-auto relative z-10">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">
              第 2 步（共 5 步）
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl text-white uppercase tracking-wide mb-4">
              抽取传奇球队
            </h1>
            <p className="text-lg text-[#A8A8B3]">
              转动转盘，揭晓你的历史球队。今日候选池由 Daily Challenge Seed 锁定。
            </p>
          </div>
        </Container>
      </div>

      <Section className="relative">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="glass-card rounded-2xl p-8 md:p-12 text-center relative overflow-hidden mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF5E07]/10 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2CA50]/10 border border-[#F2CA50]/30 text-[#F2CA50] text-xs uppercase tracking-wider font-bold mb-6">
                  <Trophy className="h-4 w-4" />
                  {team.season}
                </div>
                <h2 className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase tracking-wide mb-4">
                  {team.teamName}
                </h2>
                <p className="text-[#A8A8B3] text-lg mb-2">{team.record}</p>
                <p className="text-[#A8A8B3] max-w-xl mx-auto">{team.note}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {pool.map((t, idx) => (
                <div
                  key={t.id}
                  className={`rounded-xl p-4 border text-center transition-all ${
                    t.id === team.id
                      ? "bg-[#FF5E07]/10 border-[#FF5E07]/50 text-white"
                      : "bg-[#1a1c20] border-white/10 text-[#A8A8B3]"
                  }`}
                >
                  <div className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-wider">{t.season}</div>
                  <div className="font-[family-name:var(--font-anton)] text-sm uppercase mt-1">{t.teamShortName}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="xl"
                onClick={handleSpin}
                disabled={spinning}
              >
                <Dices className="h-5 w-5 mr-2" />
                {spinning ? "抽取中..." : "转动转盘"}
              </Button>
              {selectedTeam && (
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleConfirm}
                >
                  从 {selectedTeam.teamShortName} 抽取 <ChevronRight className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
