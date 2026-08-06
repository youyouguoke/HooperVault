"use client";

import { useEffect, useMemo, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  ATTRIBUTES,
  type Attribute,
  POSITION_MODIFIERS,
  getSkillById,
  type Skill,
} from "@/data/legends";
import {
  Trophy,
  Medal,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
  Swords,
} from "lucide-react";

const ATTRIBUTE_LABELS: Record<Attribute, string> = {
  shooting: "3PT",
  mid_range: "Mid",
  finishing: "Finishing",
  dunk: "Dunk",
  passing: "Passing",
  ball_handle: "Handle",
  perimeter_defense: "Perim D",
  interior_defense: "Interior D",
  block: "Block",
  rebound: "Rebound",
  speed: "Speed",
  strength: "Strength",
  clutch: "Clutch",
};

type GameResult = {
  opponent: string;
  result: "W" | "L";
  score: string;
  playerStats: { pts: number; reb: number; ast: number };
};

type HooperApiData = {
  slug: string;
  position: string;
  mode: string;
  seed: number;
  history: string;
  overall: number;
  archetype: string;
  created_at: string;
};

function parseSkillsFromHistory(history: string): (Skill & { legendName: string; legendCategory: string })[] {
  return history
    .split(",")
    .map((id) => getSkillById(id))
    .filter(Boolean) as (Skill & { legendName: string; legendCategory: string })[];
}

const OPPONENTS = [
  "Atlanta", "Boston", "Brooklyn", "Charlotte", "Chicago", "Cleveland", "Dallas", "Denver",
  "Detroit", "Golden State", "Houston", "Indiana", "LA Clippers", "LA Lakers", "Memphis", "Miami",
  "Milwaukee", "Minnesota", "New Orleans", "New York", "Oklahoma City", "Orlando", "Philadelphia",
  "Phoenix", "Portland", "Sacramento", "San Antonio", "Toronto", "Utah", "Washington",
];

export default function SimulatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111317]" />}>
      <SimulatePageInner />
    </Suspense>
  );
}

function SimulatePageInner() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const positionParam = (searchParams.get("position") || "SG") as keyof typeof POSITION_MODIFIERS;
  const modeParam = searchParams.get("mode") || "classic";
  const seedParam = parseInt(searchParams.get("seed") || "1", 10);
  const historyParam = searchParams.get("history") || "";

  const [hooperData, setHooperData] = useState<HooperApiData | null>(null);
  const [loadingHooper, setLoadingHooper] = useState(false);
  const [hooperError, setHooperError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    fetch(`/api/hoopers/${encodeURIComponent(slug)}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to load Hooper data");
        }
        const json = await res.json();
        if (!cancelled) setHooperData(json);
      })
      .catch((err) => {
        if (!cancelled) setHooperError(err.message || "Failed to load Hooper data");
      })
      .finally(() => {
        if (!cancelled) setLoadingHooper(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const position = (hooperData?.position || positionParam) as keyof typeof POSITION_MODIFIERS;
  const mode = hooperData?.mode || modeParam;
  const seed = hooperData?.seed ?? seedParam;

  const [phase, setPhase] = useState<"intro" | "simulating" | "result">("intro");
  const [gameIndex, setGameIndex] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [games, setGames] = useState<GameResult[]>([]);
  const [playerTotals, setPlayerTotals] = useState({ pts: 0, reb: 0, ast: 0 });

  const skills = useMemo(() => {
    const historyString = hooperData?.history || historyParam;
    return parseSkillsFromHistory(historyString);
  }, [hooperData, historyParam]);

  const attributes: Record<Attribute, number> = useMemo(() => {
    const attrs: Record<Attribute, number> = {
      shooting: 55, mid_range: 55, finishing: 55, dunk: 55, passing: 55,
      ball_handle: 55, perimeter_defense: 55, interior_defense: 55, block: 55,
      rebound: 55, speed: 55, strength: 55, clutch: 55,
    };
    const modifiers = POSITION_MODIFIERS[position] || {};
    Object.entries(modifiers).forEach(([key, value]) => {
      attrs[key as Attribute] += value;
    });
    skills.forEach((skill) => {
      attrs[skill.attribute as Attribute] = Math.min(99, attrs[skill.attribute as Attribute] + skill.bonus);
    });
    return attrs;
  }, [position, skills]);

  const overall = useMemo(() => {
    return Math.round(Object.values(attributes).reduce((a, b) => a + b, 0) / 13);
  }, [attributes]);

  const simulateGame = useCallback((idx: number): GameResult => {
    const opponent = OPPONENTS[idx % OPPONENTS.length];
    const baseWin = (overall + (attributes.clutch - 60) * 0.2) / 100;
    const noise = (Math.sin(idx * 123.45 + seed) + 1) / 2; // pseudo random 0-1
    const isWin = noise < baseWin + 0.15;

    const teamScore = isWin ? 105 + Math.floor(noise * 25) : 95 + Math.floor(noise * 20);
    const oppScore = isWin ? teamScore - 4 - Math.floor(noise * 8) : teamScore + 4 + Math.floor(noise * 8);

    const ppg = Math.max(8, Math.round((attributes.shooting + attributes.finishing + attributes.mid_range + attributes.clutch) / 22 + noise * 12));
    const rpg = Math.max(2, Math.round((attributes.rebound + attributes.strength + attributes.interior_defense) / 35 + noise * 5));
    const apg = Math.max(1, Math.round((attributes.passing + attributes.ball_handle) / 35 + noise * 5));

    return {
      opponent,
      result: isWin ? "W" : "L",
      score: `${teamScore}-${oppScore}`,
      playerStats: { pts: ppg, reb: rpg, ast: apg },
    };
  }, [overall, attributes, seed]);

  useEffect(() => {
    if (phase !== "simulating") return;

    if (gameIndex >= 82) {
      setPhase("result");
      return;
    }

    const timer = setTimeout(() => {
      const game = simulateGame(gameIndex);
      setGames((prev) => [...prev, game]);
      if (game.result === "W") setWins((w) => w + 1);
      else setLosses((l) => l + 1);
      setPlayerTotals((t) => ({
        pts: t.pts + game.playerStats.pts,
        reb: t.reb + game.playerStats.reb,
        ast: t.ast + game.playerStats.ast,
      }));
      setGameIndex((i) => i + 1);
    }, 30);

    return () => clearTimeout(timer);
  }, [phase, gameIndex, simulateGame]);

  const ppgValue = gameIndex > 0 ? playerTotals.pts / gameIndex : 0;
  const rpgValue = gameIndex > 0 ? playerTotals.reb / gameIndex : 0;
  const apgValue = gameIndex > 0 ? playerTotals.ast / gameIndex : 0;
  const ppg = ppgValue.toFixed(1);
  const rpg = rpgValue.toFixed(1);
  const apg = apgValue.toFixed(1);

  const awards = useMemo(() => {
    const list = [];
    if (overall >= 95) list.push("Hall of Fame");
    if (wins >= 50) list.push("Playoff Berth");
    if (wins >= 60) list.push("Championship Contender");
    if (ppgValue >= 25) list.push("Scoring Title");
    if (apgValue >= 8) list.push("Assist Leader");
    if (rpgValue >= 10) list.push("Rebound King");
    if (wins >= 55 && (ppgValue >= 20 || apgValue >= 7)) list.push("MVP Candidate");
    return list;
  }, [overall, wins, ppgValue, apgValue, rpgValue]);

  const seedCount = games.length;

  return (
    <>
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-6">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-2">
              Step 5 of 5
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide">
              赛季模拟
            </h1>
          </div>
        </Container>
      </div>

      <Section className="relative bg-court">
        <Container>
          <div className="max-w-4xl mx-auto">
            {loadingHooper && (
              <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
                <div className="h-12 w-12 border-4 border-[#F2CA50]/20 border-t-[#F2CA50] rounded-full animate-spin mx-auto mb-6" />
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-2">
                  加载构建中
                </h2>
                <p className="text-[#A8A8B3]">正在从 Vault 中调取 Hooper...</p>
              </div>
            )}

            {hooperError && !loadingHooper && (
              <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-2">
                  Error 加载构建中
                </h2>
                <p className="text-[#A8A8B3] mb-6">{hooperError}</p>
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={() => window.location.reload()}
                >
                  重试
                </Button>
              </div>
            )}

            {!loadingHooper && !hooperError && phase === "intro" && (
              <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
                <Trophy className="h-16 w-16 text-[#F2CA50] mx-auto mb-6" />
                <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-4">
                  准备模拟？
                </h2>
                <p className="text-[#A8A8B3] text-lg mb-8 max-w-xl mx-auto">
                  你的构建将进行 82 场赛季模拟。实时观看每场比赛，并揭开你的传奇。
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                  <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                    <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">总评</div>
                    <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#F2CA50]">{overall}</div>
                  </div>
                  <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                    <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">位置</div>
                    <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">{position}</div>
                  </div>
                  <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                    <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">模式</div>
                    <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white capitalize">{mode}</div>
                  </div>
                </div>
                <Button variant="secondary" size="xl" onClick={() => setPhase("simulating")}>
                  <span className="flex items-center gap-2">
                    开始模拟 <ChevronRight className="h-5 w-5" />
                  </span>
                </Button>
              </div>
            )}

            {!loadingHooper && !hooperError && phase === "simulating" && (
              <div className="glass-card rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">比赛</div>
                    <div className="font-[family-name:var(--font-anton)] text-2xl text-white">
                      {Math.min(gameIndex, 82)} / 82
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">战绩</div>
                    <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
                      <span className="text-[#F2CA50]">{wins}</span> - <span className="text-[#FF5E07]">{losses}</span>
                    </div>
                  </div>
                </div>
                <div className="h-3 bg-[#1a1c20] rounded-full overflow-hidden border border-white/5 mb-6">
                  <div
                    className="h-full bg-[#FF5E07] rounded-full transition-all duration-100"
                    style={{ width: `${(gameIndex / 82) * 100}%` }}
                  />
                </div>
                <div className="h-64 overflow-hidden relative bg-[#111317]/50 rounded-xl border border-white/5 p-4">
                  <div className="space-y-2">
                    {games.slice(-12).map((game, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-sm py-2 px-3 rounded bg-[#1a1c20]/50 border border-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`font-bold ${game.result === "W" ? "text-[#F2CA50]" : "text-[#FF5E07]"}`}>
                            {game.result === "W" ? "胜" : "负"}
                          </span>
                          <span className="text-white">vs {game.opponent}</span>
                        </div>
                        <div className="flex items-center gap-4 text-[#A8A8B3]">
                          <span className="text-white font-medium">{game.score}</span>
                          <span className="text-xs">{game.playerStats.pts} 分 / {game.playerStats.reb} 板 / {game.playerStats.ast} 助</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#111317] to-transparent pointer-events-none" />
                </div>
              </div>
            )}

            {!loadingHooper && !hooperError && phase === "result" && (
              <div className="space-y-6">
                <div className="legendary-card rounded-2xl p-8 md:p-10 text-center">
                  <Trophy className="h-16 w-16 text-[#F2CA50] mx-auto mb-4" />
                  <h2 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl text-white uppercase tracking-wide mb-2">
                    赛季结束
                  </h2>
                  <p className="text-[#A8A8B3] text-lg mb-6">
                    最终战绩: <span className="text-white font-bold">{wins} - {losses}</span> &middot; 传奇等级: <span className="text-[#F2CA50] font-bold">{overall >= 90 ? "传奇" : overall >= 80 ? "精英" : "新星"}</span>
                  </p>
                  <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                    <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">场均得分</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white">{ppg}</div>
                    </div>
                    <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">场均篮板</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white">{rpg}</div>
                    </div>
                    <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">场均助攻</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white">{apg}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {awards.map((award) => (
                      <span
                        key={award}
                        className="inline-flex items-center gap-2 bg-[#F2CA50]/10 border border-[#F2CA50]/30 text-[#F2CA50] px-4 py-2 rounded-full font-[family-name:var(--font-space-grotesk)] text-sm font-bold uppercase tracking-wider"
                      >
                        <Medal className="h-4 w-4" /> {award}
                      </span>
                    ))}
                    {awards.length === 0 && (
                      <span className="text-[#A8A8B3]">本赛季没有获得重大奖项。再次构建，追逐伟大。</span>
                    )}
                  </div>
                  <Button
                    asChild
                    href={`/zh-CN/hooper?slug=${hooperData?.slug || slug || "sample"}&position=${position}&mode=${mode}&seed=${seed}`}
                    variant="secondary"
                    size="xl"
                  >
                    <span className="flex items-center justify-center gap-2">
                      查看传奇卡 <ChevronRight className="h-5 w-5" />
                    </span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
