"use client";

import { useEffect, useMemo, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/Button";
import {
  HISTORIC_TEAMS,
  type HistoricTeam,
  type LegendaryPlayer,
  type PlayerSkill,
} from "@/data/teams";
import { ATTRIBUTES, type Attribute } from "@/data/legends";
import { Trophy, Star, EyeOff, Lock, RefreshCw, Dices, ChevronRight } from "lucide-react";

const DAILY_SEED = 20260805;
const TOTAL_ROUNDS = 13;
const TOTAL_FRAMES = 16;
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

const ATTRIBUTE_GROUPS: Record<Attribute, string> = {
  shooting: "Scoring",
  mid_range: "Scoring",
  finishing: "Scoring",
  dunk: "Scoring",
  ball_handle: "Playmaking",
  passing: "Playmaking",
  perimeter_defense: "Defense",
  interior_defense: "Defense",
  block: "Defense",
  rebound: "Defense",
  speed: "Physical",
  strength: "Physical",
  clutch: "Clutch",
};

interface StolenSkill extends PlayerSkill {
  player: LegendaryPlayer;
  team: HistoricTeam;
}

function playerOvr(player: LegendaryPlayer): number {
  return Math.round(player.skills.reduce((sum, s) => sum + s.value, 0) / player.skills.length);
}

function teamLogo(team: HistoricTeam): string {
  return team.teamShortName.slice(0, 2).toUpperCase();
}

export default function TeamPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0B12]" />}>
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

  const pool = useMemo(() => HISTORIC_TEAMS, []);
  const [phase, setPhase] = useState<"spinning" | "drafting" | "completed">("spinning");
  const [selectedTeam, setSelectedTeam] = useState<HistoricTeam | null>(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState<LegendaryPlayer | null>(null);
  const [history, setHistory] = useState<StolenSkill[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [teamResetsLeft, setTeamResetsLeft] = useState(3);
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

  const radarData = useMemo(() => {
    return ATTRIBUTES.map((attr) => ({
      attribute: ATTRIBUTE_LABELS[attr],
      fullMark: 100,
      value: currentAttributes[attr],
    }));
  }, [currentAttributes]);

  const handlePlayerClick = (player: LegendaryPlayer) => {
    if (phase !== "drafting" || isSpinning) return;
    setSelectedPlayer((prev) => (prev?.id === player.id ? null : player));
  };

  const handleStealSkill = (skill: PlayerSkill) => {
    if (!selectedTeam || !selectedPlayer || isSpinning || history.some((s) => s.id === skill.id)) return;
    setHistory((prev) => [...prev, { ...skill, player: selectedPlayer, team: selectedTeam }]);
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

  const handleResetTeam = () => {
    if (teamResetsLeft > 0 && !isSpinning) {
      setTeamResetsLeft((r) => r - 1);
      startSpin();
    }
  };

  const handlePlayAgain = () => {
    setHistory([]);
    setRound(1);
    setTeamResetsLeft(3);
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
  const overall = Math.round(Object.values(currentAttributes).reduce((a, b) => a + b, 0) / 13);

  return (
    <main className="bg-[#0B0B12] min-h-screen lg:h-screen lg:overflow-hidden text-white font-sans">
      {/* Top bar */}
      <header className="h-14 border-b border-white/8 bg-[#111317]/80 backdrop-blur flex items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-bold">
            Round {Math.min(round, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}
          </span>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-xs text-[#A8A8B3]">HooperBuilder</span>
        </div>
        <div className="text-xs text-[#A8A8B3]">{mode === "blind" ? "Blind Draft" : "Classic Draft"}</div>
      </header>

      {/* Spinning overlay / header row */}
      {phase === "spinning" && (
        <div className="absolute inset-x-0 top-14 bottom-0 z-20 flex flex-col items-center justify-center bg-[#0B0B12]/95 backdrop-blur-sm px-8">
          <div className="text-center mb-8">
            <h2 className="font-[family-name:var(--font-anton)] text-4xl uppercase tracking-wide mb-2">
              Spinning for a Legendary Team
            </h2>
            <p className="text-[#A8A8B3] text-sm">19 historic teams in the pool</p>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-3 max-w-4xl w-full">
            {pool.map((t) => {
              const active = t.id === team.id;
              return (
                <div
                  key={t.id}
                  className={`rounded-xl p-3 border text-center transition-all ${
                    active ? "bg-[#FF5E07]/10 border-[#FF5E07] text-white" : "bg-[#1a1c20] border-white/10 text-[#A8A8B3]"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold mx-auto mb-2 ${
                      active ? "bg-[#FF5E07] text-white" : "bg-[#111317] text-[#A8A8B3]"
                    }`}
                  >
                    {teamLogo(t)}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider truncate">{t.teamShortName}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed overlay */}
      {phase === "completed" && (
        <div className="absolute inset-x-0 top-14 bottom-0 z-30 flex flex-col items-center justify-center bg-[#0B0B12] px-8 overflow-y-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center max-w-3xl w-full border border-[#F2CA50]/20">
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-bold">Build Complete</span>
              <h2 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl uppercase tracking-wide mt-2">
                Legendary Build
              </h2>
            </div>

            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">OVR</div>
                <div className="font-[family-name:var(--font-space-grotesk)] text-6xl font-bold text-[#F2CA50]">{overall}</div>
              </div>
              <div className="text-left">
                <div className="text-[#A8A8B3] text-sm">13 skills stolen</div>
                <div className="text-[#A8A8B3] text-sm">from {history.length} historic players</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-8">
              {ATTRIBUTES.map((attr) => (
                <div key={attr} className="bg-[#1a1c20] border border-white/5 rounded-lg p-2 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">{ATTRIBUTE_LABELS[attr]}</div>
                  <div className="font-[family-name:var(--font-space-grotesk)] font-bold">{currentAttributes[attr]}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="lg" onClick={handlePlayAgain}>
                Play Again
              </Button>
              <Button variant="secondary" size="lg" onClick={handlePreview}>
                <Dices className="h-4 w-4 mr-2" />
                View Legacy Page
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main two-column layout */}
      <div className="grid lg:grid-cols-[1fr_360px] h-[calc(100vh-56px)]">
        {/* LEFT PANEL */}
        <section className="p-6 lg:p-8 overflow-y-auto lg:overflow-hidden flex flex-col">
          {selectedTeam && (
            <>
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-bold">
                    Round {Math.min(round, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleResetTeam} disabled={teamResetsLeft === 0 || isSpinning}>
                    <RefreshCw className="h-3.5 w-3.5 mr-2" />
                    Reset Team · {teamResetsLeft} Left
                  </Button>
                </div>
                <h1 className="font-[family-name:var(--font-anton)] text-3xl lg:text-4xl uppercase tracking-wide">
                  Steal a Skill From {selectedTeam.teamName}
                </h1>
                <p className="text-[#A8A8B3] text-sm mt-1">
                  Choose a player and steal one of their legendary skills. Already-used skills are locked.
                </p>
              </div>

              {/* Player chips */}
              <div className="flex gap-3 overflow-x-auto pb-3 mb-5" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {selectedTeam.players.map((player) => {
                  const selected = selectedPlayer?.id === player.id;
                  const Icon = showNames ? Star : EyeOff;
                  return (
                    <button
                      key={player.id}
                      onClick={() => handlePlayerClick(player)}
                      className={`flex-shrink-0 rounded-xl border p-3 min-w-[160px] text-left transition-all ${
                        selected
                          ? "bg-[#F2CA50]/10 border-[#F2CA50] shadow-[0_0_20px_rgba(242,202,80,0.15)]"
                          : "bg-[#1a1c20] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-[#111317] border border-white/10 flex items-center justify-center">
                          <Icon className="h-4 w-4 text-[#F2CA50]" />
                        </div>
                        <div>
                          <div className="font-[family-name:var(--font-anton)] text-sm uppercase leading-none">
                            {showNames ? player.fullName : "???"}
                          </div>
                          <div className="text-[10px] text-[#A8A8B3] mt-0.5">
                            {showNames ? player.nickname : "Hidden"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider">
                        <span className="text-[#A8A8B3]">{player.position}</span>
                        <span className="text-[#F2CA50] font-bold">OVR {playerOvr(player)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Skill detail panel */}
              <div className="flex-1 min-h-0">
                {selectedPlayer ? (
                  <div className="glass-card rounded-2xl p-5 h-full border border-white/10 flex flex-col">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-full bg-[#111317] border border-[#F2CA50]/30 flex items-center justify-center">
                        <Star className="h-6 w-6 text-[#F2CA50]" />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-anton)] text-2xl uppercase tracking-wide">
                          {showNames ? selectedPlayer.fullName : "???"}
                        </h3>
                        <p className="text-[#F2CA50] text-sm font-medium">
                          {showNames ? selectedPlayer.nickname : "Hidden Legend"} · {selectedPlayer.position} · OVR {playerOvr(selectedPlayer)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 overflow-y-auto pr-2">
                      {selectedPlayer.skills.map((skill) => {
                        const stolen = history.some((s) => s.id === skill.id);
                        const isLegendary = skill.rarity === "legendary";
                        const barColor = isLegendary ? "#F2CA50" : "#6CB9FF";
                        return (
                          <button
                            key={skill.id}
                            disabled={stolen || isSpinning}
                            onClick={() => handleStealSkill(skill)}
                            className={`relative rounded-lg border p-3 text-left transition-all ${
                              stolen
                                ? "bg-[#1a1c20]/40 border-white/5 opacity-50 cursor-not-allowed"
                                : "bg-[#111317] border-white/10 hover:border-[#F2CA50]/50 hover:scale-[1.02]"
                            }`}
                          >
                            {stolen && (
                              <div className="absolute inset-0 flex items-center justify-center z-10">
                                <Lock className="h-5 w-5 text-[#A8A8B3]" />
                              </div>
                            )}
                            <div className="flex items-center justify-between mb-1.5">
                              <span className={`text-xs uppercase tracking-wider font-bold ${isLegendary ? "text-[#F2CA50]" : "text-white"}`}>
                                {ATTRIBUTE_LABELS[skill.attribute]}
                              </span>
                              <span className="text-sm font-[family-name:var(--font-space-grotesk)] font-bold">{skill.value}</span>
                            </div>
                            <div className="h-2 bg-[#1a1c20] rounded-full overflow-hidden border border-white/5">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${skill.value}%`, backgroundColor: barColor }}
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="glass-card rounded-2xl p-8 h-full border border-white/10 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#1a1c20] border border-white/10 flex items-center justify-center mb-4">
                      <Trophy className="h-7 w-7 text-[#F2CA50]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-anton)] text-xl uppercase tracking-wide mb-2">
                      Select a Player
                    </h3>
                    <p className="text-[#A8A8B3] text-sm max-w-md">
                      Choose one of the legendary players above to view their 13 skills. Pick the one that best evolves your Hooper.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </section>

        {/* RIGHT PANEL */}
        <aside className="border-l border-white/8 bg-[#111317]/50 p-5 lg:p-6 flex flex-col gap-5 overflow-y-auto lg:overflow-hidden">
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-bold mb-1">Your Hooper</div>
            <h2 className="font-[family-name:var(--font-anton)] text-xl uppercase tracking-wide">Custom Build</h2>
            <div className="text-[10px] text-[#A8A8B3] mt-1">BAH-{String(round).padStart(2, "0")}</div>
          </div>

          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3] mb-1">Overall</div>
            <div className="font-[family-name:var(--font-space-grotesk)] text-6xl font-bold text-[#F2CA50]">{overall}</div>
          </div>

          {/* Radar chart */}
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="attribute" tick={{ fill: "#A8A8B3", fontSize: 9, fontFamily: "var(--font-space-grotesk)" }} />
                <Radar name="Attributes" dataKey="value" stroke="#F2CA50" strokeWidth={2} fill="#F2CA50" fillOpacity={0.22} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Stolen skills */}
          <div className="flex-1 min-h-0">
            <div className="text-[10px] uppercase tracking-widest text-[#A8A8B3] font-bold mb-2">Stolen Skills</div>
            <div className="space-y-2 overflow-y-auto max-h-[200px] pr-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {history.length === 0 && (
                <p className="text-[#A8A8B3] text-xs text-center py-4">No skills stolen yet.</p>
              )}
              {history.map((skill, i) => (
                <div key={`${skill.id}-${i}`} className="bg-[#1a1c20] rounded-lg p-2 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium text-white">{showNames ? skill.player.fullName : "???"}</div>
                    <div className="text-[10px] text-[#A8A8B3]">{skill.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-[#F2CA50]">{skill.value}</div>
                    <div className="text-[9px] text-[#A8A8B3]">{ATTRIBUTE_LABELS[skill.attribute]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Draft board */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest text-[#A8A8B3] font-bold">Draft Board</span>
              <span className="text-xs font-bold text-[#F2CA50]">{overall}</span>
            </div>
            <div className="grid grid-cols-13 gap-1">
              {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => {
                const skill = history[i];
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded border ${
                      skill
                        ? skill.rarity === "legendary"
                          ? "bg-[#F2CA50] border-[#F2CA50]"
                          : "bg-[#6CB9FF] border-[#6CB9FF]"
                        : i < round
                        ? "bg-[#FF5E07] border-[#FF5E07]"
                        : "bg-[#1a1c20] border-white/10"
                    }`}
                    title={skill ? `${skill.player.fullName} · ${skill.name}` : undefined}
                  />
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .grid-cols-13 {
          grid-template-columns: repeat(13, minmax(0, 1fr));
        }
      `}</style>
    </main>
  );
}
