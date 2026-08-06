"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
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
import { ATTRIBUTES, type Attribute, POSITION_MODIFIERS } from "@/data/legends";
import {
  Trophy,
  Zap,
  Target,
  ArrowUpRight,
  Users,
  Shield,
  ChevronRight,
  Star,
  EyeOff,
  Dices,
  Lock,
  RefreshCw,
} from "lucide-react";

const DAILY_SEED = 20260805;
const TOTAL_ROUNDS = 13;
const MAX_TEAM_RESETS = 3;

const positions = [
  { id: "PG", name: "Point Guard", role: "Playmaker", description: "The floor general. Elite passing, ball handling, and speed.", icon: Zap, strengths: ["Passing", "Ball Handle", "Speed"], weakness: "Interior Defense" },
  { id: "SG", name: "Shooting Guard", role: "Scorer", description: "The perimeter threat. Strong shooting and off-ball movement.", icon: Target, strengths: ["3PT", "Mid Range", "Speed"], weakness: "Rebounding" },
  { id: "SF", name: "Small Forward", role: "Versatile Wing", description: "The Swiss Army knife. Balanced scoring, defense, and athleticism.", icon: ArrowUpRight, strengths: ["Finishing", "Perimeter D", "Speed"], weakness: "Playmaking" },
  { id: "PF", name: "Power Forward", role: "Interior Force", description: "The hybrid big. Strong finishing, rebounding, and interior defense.", icon: Users, strengths: ["Rebound", "Interior D", "Strength"], weakness: "Ball Handle" },
  { id: "C", name: "Center", role: "Rim Protector", description: "The defensive anchor. Elite rim protection, rebounding, and strength.", icon: Shield, strengths: ["Block", "Rebound", "Strength"], weakness: "Speed" },
];

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

interface StolenSkill extends PlayerSkill {
  player: LegendaryPlayer;
  team: HistoricTeam;
}

function playerOvr(player: LegendaryPlayer): number {
  return Math.round(player.skills.reduce((sum, s) => sum + s.bonus, 0) / player.skills.length);
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

  const pool = useMemo(() => getDailyTeamPool(seed, 3), [seed]);
  const [phase, setPhase] = useState<"spinning" | "select-position" | "drafting" | "completed">("spinning");
  const [selectedTeam, setSelectedTeam] = useState<HistoricTeam | null>(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [position, setPosition] = useState<string | null>(null);
  const [round, setRound] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState<LegendaryPlayer | null>(null);
  const [history, setHistory] = useState<StolenSkill[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [teamResetsLeft, setTeamResetsLeft] = useState(MAX_TEAM_RESETS);

  const startSpin = () => {
    setPhase("spinning");
    setSelectedTeam(null);
    setSelectedPlayer(null);
    setHistory([]);
    setRound(1);
    setPosition(null);
    let frame = 0;
    const totalFrames = 60;
    const targetIndex = Math.floor(Math.random() * pool.length);
    const interval = setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      const speed = Math.max(1, Math.floor((1 - progress) * 6));
      setDisplayIndex((d) => (d + speed) % pool.length);
      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayIndex(targetIndex);
        setSelectedTeam(pool[targetIndex]);
        setPhase("select-position");
      }
    }, 80);
  };

  useEffect(() => {
    startSpin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool]);

  const handlePositionSelect = (posId: string) => {
    setPosition(posId);
    setPhase("drafting");
  };

  const handleResetTeam = () => {
    if (teamResetsLeft > 0) {
      setTeamResetsLeft((r) => r - 1);
      startSpin();
    }
  };

  const currentAttributes = useMemo(() => {
    const attrs: Record<Attribute, number> = {
      shooting: 55,
      mid_range: 55,
      finishing: 55,
      dunk: 55,
      passing: 55,
      ball_handle: 55,
      perimeter_defense: 55,
      interior_defense: 55,
      block: 55,
      rebound: 55,
      speed: 55,
      strength: 55,
      clutch: 55,
    };
    const modifiers = POSITION_MODIFIERS[position as keyof typeof POSITION_MODIFIERS] || {};
    for (const [key, value] of Object.entries(modifiers)) {
      attrs[key as Attribute] += value;
    }
    history.forEach((skill) => {
      attrs[skill.attribute] = Math.min(99, attrs[skill.attribute] + skill.bonus);
    });
    return attrs;
  }, [position, history]);

  const handlePlayerClick = (player: LegendaryPlayer) => {
    if (phase !== "drafting" || isAnimating || round > TOTAL_ROUNDS) return;
    setSelectedPlayer((prev) => (prev?.id === player.id ? null : player));
  };

  const handleStealSkill = (skill: PlayerSkill) => {
    if (!selectedTeam || !selectedPlayer || isAnimating || round > TOTAL_ROUNDS) return;
    if (history.some((s) => s.id === skill.id)) return;
    setIsAnimating(true);
    setHistory((prev) => [...prev, { ...skill, player: selectedPlayer, team: selectedTeam }]);
    setTimeout(() => {
      setSelectedPlayer(null);
      if (round < TOTAL_ROUNDS) {
        setRound((r) => r + 1);
      } else {
        setPhase("completed");
      }
      setIsAnimating(false);
    }, 450);
  };

  const handlePreview = () => {
    if (!selectedTeam || !position) return;
    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("team", selectedTeam.id);
    params.set("position", position);
    params.set("seed", seed.toString());
    params.set("history", history.map((s) => s.id).join(","));
    router.push(`/en/build/preview?${params.toString()}`);
  };

  const team = selectedTeam || pool[displayIndex];
  const positionObj = positions.find((p) => p.id === position);
  const progress = ((round - 1) / TOTAL_ROUNDS) * 100;
  const overall = Math.round(Object.values(currentAttributes).reduce((a, b) => a + b, 0) / 13);

  const availableSkillsCount = selectedTeam
    ? selectedTeam.players.reduce((acc, p) => acc + p.skills.filter((s) => !history.some((h) => h.id === s.id)).length, 0)
    : 0;

  return (
    <>
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-6">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10">
            <div className="text-center mb-6">
              <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-2">
                {phase === "completed" ? "Step 4 of 5" : phase === "drafting" ? "Step 3 of 5" : "Step 2 of 5"}
              </p>
              <h1 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide">
                {phase === "spinning" && "Drafting Your Legendary Team"}
                {phase === "select-position" && "Your Team Is Locked"}
                {phase === "drafting" && `Steal a Skill From ${selectedTeam?.teamName}`}
                {phase === "completed" && "Build Complete"}
              </h1>
              <p className="text-[#A8A8B3] mt-2 max-w-2xl mx-auto">
                {phase === "spinning" && "The wheel is spinning..."}
                {phase === "select-position" && "Pick a position to define your foundation."}
                {phase === "drafting" && "Choose a player and a skill. Already-used skills are locked."}
                {phase === "completed" && "13 legendary skills stolen. Review your build before saving."}
              </p>
            </div>

            {phase === "drafting" && (
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-between text-xs uppercase tracking-wider text-[#A8A8B3] mb-2">
                  <span>Round {round} / {TOTAL_ROUNDS}</span>
                  <span>{Math.round(progress)}% Complete</span>
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
              <div className="grid grid-cols-3 gap-4 mb-8">
                {pool.map((t) => (
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
            )}

            {phase === "select-position" && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {positions.map((pos) => {
                    const Icon = pos.icon;
                    return (
                      <button
                        key={pos.id}
                        onClick={() => handlePositionSelect(pos.id)}
                        className="group text-left glass-card rounded-2xl p-6 hover:bg-white/5 hover:border-[#F2CA50]/30 transition-all duration-300 border border-white/10"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F2CA50]/20 to-[#FF5E07]/10 border border-[#F2CA50]/20">
                            <span className="font-[family-name:var(--font-anton)] text-2xl text-[#F2CA50]">{pos.id}</span>
                          </div>
                          <div>
                            <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors">
                              {pos.name}
                            </h3>
                            <span className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-wider text-[#F2CA50]">
                              {pos.role}
                            </span>
                          </div>
                        </div>
                        <p className="text-[#A8A8B3] text-sm mb-4">{pos.description}</p>
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
                        <div className="mt-4 flex items-center justify-end text-[#F2CA50] text-sm font-medium">
                          Select <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {phase === "drafting" && selectedTeam && (
              <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={handleResetTeam}
                      disabled={teamResetsLeft === 0 || isAnimating}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset Team · {teamResetsLeft} Left
                    </Button>
                    <span className="text-xs uppercase tracking-wider text-[#A8A8B3]">
                      {availableSkillsCount} skills available
                    </span>
                  </div>

                  {availableSkillsCount === 0 ? (
                    <div className="text-center py-12 glass-card rounded-2xl">
                      <p className="text-[#A8A8B3] text-lg mb-4">All skills from this team have been stolen.</p>
                      <Button variant="secondary" size="lg" onClick={() => setPhase("completed")}>
                        View Build Summary
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-3">
                      {selectedTeam.players.map((player) => {
                        const isSelected = selectedPlayer?.id === player.id;
                        const Icon = showNames ? Star : EyeOff;
                        const hasAvailable = player.skills.some((s) => !history.some((h) => h.id === s.id));
                        const ovr = playerOvr(player);
                        return (
                          <div
                            key={player.id}
                            onClick={() => handlePlayerClick(player)}
                            className={`cursor-pointer rounded-2xl border transition-all duration-300 flex flex-col ${
                              isSelected
                                ? "bg-[#F2CA50]/10 border-[#F2CA50]/40 shadow-[0_0_30px_rgba(242,202,80,0.12)]"
                                : hasAvailable
                                ? "bg-[#1a1c20]/60 border-white/10 hover:border-white/20 hover:bg-[#1a1c20]"
                                : "bg-[#1a1c20]/30 border-white/5 opacity-60"
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
                                  {!hasAvailable ? "No skills left" : isSelected ? "Select a skill to steal" : "Click to view skills"}
                                </span>
                              </div>
                            </div>

                            {isSelected && hasAvailable && (
                              <div className="border-t border-white/10 p-4 bg-[#111317]/40">
                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                  {player.skills.map((skill) => {
                                    const stolen = history.some((s) => s.id === skill.id);
                                    const isLegendary = skill.rarity === "legendary";
                                    return (
                                      <button
                                        key={skill.id}
                                        disabled={stolen || isAnimating}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleStealSkill(skill);
                                        }}
                                        className={`relative rounded-lg border p-2 text-center transition-all ${
                                          stolen
                                            ? "bg-[#1a1c20]/40 border-white/5 opacity-40 cursor-not-allowed"
                                            : isLegendary
                                            ? "bg-[#F2CA50]/10 border-[#F2CA50]/40 hover:bg-[#F2CA50]/20 hover:scale-[1.02]"
                                            : "bg-[#1a1c20] border-white/10 hover:bg-white/5 hover:border-white/20 hover:scale-[1.02]"
                                        }`}
                                      >
                                        {stolen && (
                                          <div className="absolute inset-0 flex items-center justify-center">
                                            <Lock className="h-4 w-4 text-[#A8A8B3]" />
                                          </div>
                                        )}
                                        <div className={`text-[10px] uppercase tracking-wider ${isLegendary ? "text-[#F2CA50]" : "text-[#A8A8B3]"}`}>
                                          {ATTRIBUTE_LABELS[skill.attribute]}
                                        </div>
                                        <div className={`font-[family-name:var(--font-space-grotesk)] font-bold text-sm ${isLegendary ? "text-[#F2CA50]" : "text-white"}`}>
                                          +{skill.bonus}
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
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
                                {showNames ? skill.player.fullName : "???"} · {ATTRIBUTE_LABELS[skill.attribute]} +{skill.bonus}
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

            {phase === "completed" && selectedTeam && position && (
              <div className="space-y-6">
                <div className="glass-card rounded-2xl p-6 text-center">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-6">
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
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">OVR</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-[#F2CA50]">{overall}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">Position</div>
                      <div className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase">{positionObj?.name}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">Team</div>
                      <div className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase">{selectedTeam.teamShortName}</div>
                    </div>
                  </div>
                  <Button variant="secondary" size="xl" onClick={handlePreview}>
                    <Dices className="h-5 w-5 mr-2" />
                    View Build Preview <ChevronRight className="h-5 w-5" />
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
