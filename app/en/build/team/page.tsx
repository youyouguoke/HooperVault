"use client";

import { useEffect, useMemo, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  HISTORIC_TEAMS,
  getDailyTeamPool,
  type HistoricTeam,
  type LegendaryPlayer,
  type PlayerSkill,
} from "@/data/teams";
import { ATTRIBUTES, type Attribute } from "@/data/legends";
import {
  Trophy,
  Star,
  EyeOff,
  Dices,
  Lock,
  X,
  Swords,
  Zap,
  Shield,
  Flame,
  Footprints,
} from "lucide-react";

const DAILY_SEED = 20260805;
const TOTAL_ROUNDS = 13;
const POOL_SIZE = 8;
const TOTAL_FRAMES = 40;
const SPIN_INTERVAL_MS = 60;

const ATTRIBUTE_LABELS: Record<Attribute, string> = {
  shooting: "3PT",
  mid_range: "MID",
  finishing: "FIN",
  dunk: "DNK",
  passing: "PAS",
  ball_handle: "HAN",
  perimeter_defense: "PDEF",
  interior_defense: "IDEF",
  block: "BLK",
  rebound: "REB",
  speed: "SPD",
  strength: "STR",
  clutch: "CLU",
};

const GROUPS: { label: string; icon: typeof Trophy; attrs: Attribute[] }[] = [
  { label: "Scoring", icon: Swords, attrs: ["shooting", "mid_range", "finishing", "dunk"] },
  { label: "Playmaking", icon: Zap, attrs: ["ball_handle", "passing"] },
  { label: "Defense & Rebounding", icon: Shield, attrs: ["perimeter_defense", "interior_defense", "block", "rebound"] },
  { label: "Physical", icon: Footprints, attrs: ["speed", "strength"] },
  { label: "Clutch", icon: Flame, attrs: ["clutch"] },
];

interface StolenSkill extends PlayerSkill {
  player: LegendaryPlayer;
  team: HistoricTeam;
}

function playerOvr(player: LegendaryPlayer): number {
  return Math.round(player.skills.reduce((sum, s) => sum + s.value, 0) / player.skills.length);
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
  const showNames = mode !== "blind";
  const startedRef = useRef(false);

  const pool = useMemo(() => getDailyTeamPool(seed, POOL_SIZE), [seed]);
  const [phase, setPhase] = useState<"spinning" | "drafting" | "completed">("spinning");
  const [selectedTeam, setSelectedTeam] = useState<HistoricTeam | null>(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState<LegendaryPlayer | null>(null);
  const [history, setHistory] = useState<StolenSkill[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startSpin = () => {
    if (isSpinning) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsSpinning(true);
    setPhase("spinning");
    setSelectedPlayer(null);
    setSelectedTeam(null);

    let frame = 0;
    const targetIndex = Math.floor(Math.random() * pool.length);
    intervalRef.current = setInterval(() => {
      frame += 1;
      const progress = frame / TOTAL_FRAMES;
      const speed = Math.max(1, Math.floor((1 - progress) * 6));
      setDisplayIndex((d) => (d + speed) % pool.length);
      if (frame >= TOTAL_FRAMES) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayIndex(targetIndex);
        setSelectedTeam(pool[targetIndex]);
        setPhase("drafting");
        setIsSpinning(false);
      }
    }, SPIN_INTERVAL_MS);
  };

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      startSpin();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentAttributes = useMemo(() => {
    const attrs: Record<Attribute, number> = {
      shooting: 50,
      mid_range: 50,
      finishing: 50,
      dunk: 50,
      passing: 50,
      ball_handle: 50,
      perimeter_defense: 50,
      interior_defense: 50,
      block: 50,
      rebound: 50,
      speed: 50,
      strength: 50,
      clutch: 50,
    };
    history.forEach((skill) => {
      attrs[skill.attribute] = Math.min(99, attrs[skill.attribute] + skill.bonus);
    });
    return attrs;
  }, [history]);

  const handlePlayerClick = (player: LegendaryPlayer) => {
    if (phase !== "drafting" || isSpinning) return;
    setSelectedPlayer((prev) => (prev?.id === player.id ? null : player));
  };

  const handleStealSkill = (skill: PlayerSkill) => {
    if (!selectedTeam || !selectedPlayer || isSpinning || history.some((s) => s.id === skill.id)) return;
    const stolen: StolenSkill = { ...skill, player: selectedPlayer, team: selectedTeam };
    setHistory((prev) => [...prev, stolen]);
    setSelectedPlayer(null);
    if (round < TOTAL_ROUNDS) {
      setTimeout(() => {
        setRound((r) => r + 1);
        startSpin();
      }, 400);
    } else {
      setTimeout(() => setPhase("completed"), 800);
    }
  };

  const handlePlayAgain = () => {
    setHistory([]);
    setRound(1);
    startSpin();
  };

  const handlePreview = () => {
    const lastTeam = history[history.length - 1]?.team || selectedTeam;
    if (!lastTeam) return;
    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("team", lastTeam.id);
    params.set("position", "SG");
    params.set("seed", seed.toString());
    params.set("history", history.map((s) => s.id).join(","));
    router.push(`/en/build/preview?${params.toString()}`);
  };

  const team = selectedTeam || pool[displayIndex];
  const progress = ((round - 1) / TOTAL_ROUNDS) * 100;
  const overall = Math.round(Object.values(currentAttributes).reduce((a, b) => a + b, 0) / 13);

  const completedGroups = useMemo(() => {
    return GROUPS.map((g) => ({
      ...g,
      avg: Math.round(g.attrs.reduce((sum, a) => sum + currentAttributes[a], 0) / g.attrs.length),
    }));
  }, [currentAttributes]);

  return (
    <>
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-6">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10">
            <div className="text-center mb-6">
              <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-2">
                Round {Math.min(round, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}
              </p>
              <h1 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide">
                {phase === "completed" ? "Build Complete" : "Steal a Legendary Skill"}
              </h1>
              <p className="text-[#A8A8B3] mt-2 max-w-2xl mx-auto">
                {phase === "spinning" && "Spinning for a new legendary team..."}
                {phase === "drafting" && selectedTeam && `Choose a player from the ${selectedTeam.season} ${selectedTeam.teamName}.`}
                {phase === "completed" && "13 skills stolen. Review your build below."}
              </p>
            </div>

            {(phase === "drafting" || phase === "spinning") && (
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-between text-xs uppercase tracking-wider text-[#A8A8B3] mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-[#1a1c20] rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-[#FF5E07] rounded-full shadow-[0_0_10px_rgba(255,94,7,0.8)] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>

      <Section className="relative">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="glass-card rounded-2xl p-8 md:p-10 text-center relative overflow-hidden mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF5E07]/10 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2CA50]/10 border border-[#F2CA50]/30 text-[#F2CA50] text-xs uppercase tracking-wider font-bold mb-4">
                  <Trophy className="h-4 w-4" />
                  {team.season}
                </div>
                <h2 className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase tracking-wide mb-2">
                  {team.teamName}
                </h2>
                <p className="text-[#A8A8B3] text-lg mb-1">{team.record}</p>
                <p className="text-[#A8A8B3] max-w-xl mx-auto">{team.note}</p>
              </div>
            </div>

            {phase === "spinning" && (
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 mb-8">
                {pool.map((t) => (
                  <div
                    key={t.id}
                    className={`rounded-xl p-3 border text-center transition-all ${
                      t.id === team.id
                        ? "bg-[#FF5E07]/10 border-[#FF5E07]/50 text-white"
                        : "bg-[#1a1c20] border-white/10 text-[#A8A8B3]"
                    }`}
                  >
                    <div className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-wider">{t.season}</div>
                    <div className="font-[family-name:var(--font-anton)] text-xs uppercase mt-1">{t.teamShortName}</div>
                  </div>
                ))}
              </div>
            )}

            {phase === "drafting" && selectedTeam && (
              <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    {selectedTeam.players.map((player) => {
                      const isSelected = selectedPlayer?.id === player.id;
                      const Icon = showNames ? Star : EyeOff;
                      const ovr = playerOvr(player);
                      return (
                        <div
                          key={player.id}
                          onClick={() => handlePlayerClick(player)}
                          className={`cursor-pointer rounded-2xl border transition-all duration-300 flex flex-col ${
                            isSelected
                              ? "bg-[#F2CA50]/10 border-[#F2CA50]/40 shadow-[0_0_30px_rgba(242,202,80,0.12)]"
                              : "bg-[#1a1c20]/60 border-white/10 hover:border-white/20 hover:bg-[#1a1c20]"
                          }`}
                        >
                          <div className="p-5 flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div className="w-10 h-10 rounded-full bg-[#111317]/80 border border-white/10 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-[#F2CA50]" />
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase tracking-wider text-[#A8A8B3] bg-[#111317]/80 px-2 py-1 rounded border border-white/10">
                                  {player.position}
                                </span>
                                <span className="text-[10px] uppercase tracking-wider text-[#F2CA50] bg-[#F2CA50]/10 px-2 py-1 rounded border border-[#F2CA50]/30 font-bold">
                                  OVR {ovr}
                                </span>
                              </div>
                            </div>
                            <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide">
                              {showNames ? player.fullName : "???"}
                            </h3>
                            <p className="text-[#F2CA50] text-sm font-medium">{showNames ? player.nickname : "Hidden Legend"}</p>
                            <p className="text-[#A8A8B3] text-xs mt-2">{showNames ? player.tagline : "Reveal by selecting."}</p>
                            <div className="mt-4 flex items-center text-xs text-[#A8A8B3]">
                              <span className={isSelected ? "text-[#F2CA50]" : ""}>
                                {isSelected ? "Select a skill below" : "Click to view skills"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {selectedPlayer && (
                    <div className="glass-card rounded-2xl p-6 md:p-8 border border-[#F2CA50]/30 relative">
                      <button
                        onClick={() => setSelectedPlayer(null)}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-[#A8A8B3] hover:text-white transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <div className="mb-6">
                        <h3 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide">
                          {showNames ? selectedPlayer.fullName : "???"}
                        </h3>
                        <p className="text-[#F2CA50] text-sm font-medium">
                          {showNames ? selectedPlayer.nickname : "Hidden Legend"} · {selectedPlayer.position} · OVR {playerOvr(selectedPlayer)}
                        </p>
                        <p className="text-[#A8A8B3] text-xs mt-1">{showNames ? selectedPlayer.tagline : ""}</p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {selectedPlayer.skills.map((skill) => {
                          const stolen = history.some((s) => s.id === skill.id);
                          const isLegendary = skill.rarity === "legendary";
                          return (
                            <button
                              key={skill.id}
                              disabled={stolen || isSpinning}
                              onClick={() => handleStealSkill(skill)}
                              className={`relative rounded-xl border p-3 text-center transition-all ${
                                stolen
                                  ? "bg-[#1a1c20]/40 border-white/5 opacity-40 cursor-not-allowed"
                                  : isLegendary
                                  ? "bg-[#F2CA50]/10 border-[#F2CA50]/40 hover:bg-[#F2CA50]/20 hover:scale-[1.02]"
                                  : "bg-[#1a1c20] border-white/10 hover:bg-white/5 hover:border-white/20 hover:scale-[1.02]"
                              }`}
                            >
                              {stolen && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Lock className="h-5 w-5 text-[#A8A8B3]" />
                                </div>
                              )}
                              <div className={`text-[10px] uppercase tracking-wider ${isLegendary ? "text-[#F2CA50]" : "text-[#A8A8B3]"}`}>
                                {ATTRIBUTE_LABELS[skill.attribute]}
                              </div>
                              <div className={`font-[family-name:var(--font-space-grotesk)] font-bold text-xl ${isLegendary ? "text-[#F2CA50]" : "text-white"}`}>
                                {skill.value}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-4">
                  <div className="glass-card rounded-2xl p-5 sticky top-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide">
                        Stolen Skills
                      </h3>
                      <span className="text-xs text-[#F2CA50] font-bold">{history.length} / {TOTAL_ROUNDS}</span>
                    </div>
                    <div className="space-y-2 max-h-[360px] overflow-y-auto hide-scrollbar pr-1 mb-4">
                      {history.length === 0 && (
                        <p className="text-[#A8A8B3] text-sm text-center py-6">No skills stolen yet. Tap a player to start.</p>
                      )}
                      {history.map((skill, i) => (
                        <div
                          key={`${skill.id}-${i}`}
                          className="flex items-center justify-between bg-[#1a1c20]/70 rounded-lg p-3 border border-white/5"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-2 h-8 rounded-full ${
                                skill.rarity === "legendary" ? "bg-[#F2CA50]" : "bg-[#6CB9FF]"
                              }`}
                            />
                            <div>
                              <div className="text-white font-medium text-sm">{skill.name}</div>
                              <div className="text-[10px] tracking-wider text-[#A8A8B3]">
                                {showNames ? skill.player.fullName : "???"} · {ATTRIBUTE_LABELS[skill.attribute]} {skill.value}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {ATTRIBUTES.map((attr) => (
                          <div key={attr} className="bg-[#1a1c20] rounded p-2 text-center">
                            <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">{ATTRIBUTE_LABELS[attr]}</div>
                            <div
                              className={`font-[family-name:var(--font-space-grotesk)] font-bold ${
                                currentAttributes[attr] >= 90 ? "text-[#F2CA50]" : currentAttributes[attr] >= 75 ? "text-white" : "text-[#A8A8B3]"
                              }`}
                            >
                              {currentAttributes[attr]}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-[#A8A8B3] mb-2">
                        <span>OVR</span>
                        <span className="text-[#F2CA50] font-bold text-lg">{overall}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {phase === "completed" && (
              <div className="space-y-6">
                <div className="glass-card rounded-2xl p-6 text-center">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">OVR</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold text-[#F2CA50]">{overall}</div>
                    </div>
                    <div className="text-left">
                      <h3 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide">Legendary Build</h3>
                      <p className="text-[#A8A8B3] text-sm">13 skills stolen from {history.length} historic players</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
                    {completedGroups.map((g) => {
                      const Icon = g.icon;
                      return (
                        <div key={g.label} className="bg-[#1a1c20] border border-white/5 rounded-xl p-4 text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Icon className="h-4 w-4 text-[#F2CA50]" />
                            <span className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">{g.label}</span>
                          </div>
                          <div className={`font-[family-name:var(--font-space-grotesk)] text-2xl font-bold ${g.avg >= 90 ? "text-[#F2CA50]" : g.avg >= 75 ? "text-white" : "text-[#A8A8B3]"}`}>
                            {g.avg}
                          </div>
                          <div className="text-[10px] text-[#A8A8B3] mt-1">
                            {g.attrs.map((a) => ATTRIBUTE_LABELS[a]).join(" / ")}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-8">
                    {ATTRIBUTES.map((attr) => (
                      <div key={attr} className="bg-[#1a1c20] border border-white/5 rounded-lg p-3 text-center">
                        <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">{ATTRIBUTE_LABELS[attr]}</div>
                        <div
                          className={`font-[family-name:var(--font-space-grotesk)] text-xl font-bold ${
                            currentAttributes[attr] >= 90 ? "text-[#F2CA50]" : currentAttributes[attr] >= 75 ? "text-white" : "text-[#A8A8B3]"
                          }`}
                        >
                          {currentAttributes[attr]}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="outline" size="xl" onClick={handlePlayAgain}>
                      Play Again
                    </Button>
                    <Button variant="secondary" size="xl" onClick={handlePreview}>
                      <Dices className="h-5 w-5 mr-2" />
                      View Legacy Page
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
