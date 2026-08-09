"use client";

import { useEffect, useMemo, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { HISTORIC_TEAMS, type HistoricTeam, type LegendaryPlayer, type PlayerSkill } from "@/data/teams";
import { ATTRIBUTES, type Attribute } from "@/data/legends";
import { Trophy, Star, EyeOff, Lock, RefreshCw, Zap } from "lucide-react";

const DAILY_SEED = 20260805;
const TOTAL_ROUNDS = 13;
const TOTAL_FRAMES = 20;
const SPIN_INTERVAL_MS = 55;

const ATTRIBUTE_LABELS: Record<Attribute, string> = {
  shooting: "3分",
  mid_range: "中投",
  finishing: "终结",
  dunk: "扣篮",
  passing: "传球",
  ball_handle: "控运",
  perimeter_defense: "外线防",
  interior_defense: "内线防",
  block: "盖帽",
  rebound: "篮板",
  speed: "速度",
  strength: "力量",
  clutch: "关键",
};

interface StolenSkill extends PlayerSkill {
  player: LegendaryPlayer;
  team: HistoricTeam;
}

function playerOvr(player: LegendaryPlayer): number {
  return Math.round(player.skills.reduce((sum, s) => sum + s.value, 0) / player.skills.length);
}

function teamLogoPath(team: HistoricTeam): string {
  return `/images/team-logos/${team.teamShortName.toLowerCase()}.png`;
}

function rarityColor(rarity: string): string {
  return rarity === "legendary" ? "#F2CA50" : rarity === "epic" ? "#6CB9FF" : "#A8A8B3";
}

function CustomRadar({ data }: { data: { attribute: string; value: number }[] }) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 110;
  const levels = 4;
  const angleFor = (index: number, total: number) => (Math.PI * 2 * index) / total - Math.PI / 2;
  const pointFor = (index: number, total: number, value: number) => {
    const angle = angleFor(index, total);
    const r = (value / 100) * radius;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };
  const closedPath = data
    .map((d, i) => {
      const [x, y] = pointFor(i, data.length, d.value);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ") + " Z";
  const showFill = data.length >= 3;
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {[...Array(levels)].map((_, i) => {
        const r = ((i + 1) / levels) * radius;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
        );
      })}
      {data.map((d, i) => {
        const angle = angleFor(i, data.length);
        const x2 = cx + radius * Math.cos(angle);
        const y2 = cy + radius * Math.sin(angle);
        const lx = cx + (radius + 22) * Math.cos(angle);
        const ly = cy + (radius + 22) * Math.sin(angle);
        return (
          <g key={d.attribute}>
            <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#A8A8B3"
              fontSize={10}
              fontFamily="var(--font-space-grotesk)"
            >
              {d.attribute}
            </text>
          </g>
        );
      })}
      {showFill && (
        <path d={closedPath} fill="#F2CA50" fillOpacity={0.22} stroke="#F2CA50" strokeWidth={2} />
      )}
      {data.map((d, i) => {
        const [x, y] = pointFor(i, data.length, d.value);
        return <circle key={d.attribute} cx={x} cy={y} r={3} fill="#F2CA50" />;
      })}
    </svg>
  );
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
  const [state, setState] = useState<"draw" | "player" | "skill" | "completed">("draw");
  const [selectedTeam, setSelectedTeam] = useState<HistoricTeam | null>(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [round, setRound] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState<LegendaryPlayer | null>(null);
  const [history, setHistory] = useState<StolenSkill[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [teamResetsLeft, setTeamResetsLeft] = useState(3);
  const [acquiredSkill, setAcquiredSkill] = useState<PlayerSkill | null>(null);
  const [stolenSkillKeys, setStolenSkillKeys] = useState<Set<string>>(new Set());
  const [teamLocked, setTeamLocked] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stealingRef = useRef(false);

  const skillKey = (skill: PlayerSkill) => skill.attribute;

  const lastDrawnRef = useRef<number>(-1);

  const startSpin = () => {
    if (isSpinning) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsSpinning(true);
    setState("draw");
    setSelectedPlayer(null);
    setAcquiredSkill(null);

    let frame = 0;
    // Avoid drawing the same team consecutively
    let targetIndex = Math.floor(Math.random() * pool.length);
    if (pool.length > 1) {
      while (targetIndex === lastDrawnRef.current) {
        targetIndex = Math.floor(Math.random() * pool.length);
      }
    }
    lastDrawnRef.current = targetIndex;
    setTeamLocked(true);
    intervalRef.current = setInterval(() => {
      frame += 1;
      const progress = frame / TOTAL_FRAMES;
      const speed = Math.max(1, Math.floor((1 - progress) * 6));
      setDisplayIndex((d) => (d + speed) % pool.length);
      if (frame >= TOTAL_FRAMES) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayIndex(targetIndex);
        const drawnTeam = pool[targetIndex];
        setSelectedTeam(drawnTeam);
        setIsSpinning(false);
        setTimeout(() => {
          setState("player");
        }, 600);
      }
    }, SPIN_INTERVAL_MS);
  };

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      setTimeout(() => startSpin(), 0);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    history.forEach((skill) => {
      attrs[skill.attribute] = Math.min(99, attrs[skill.attribute] + skill.bonus);
    });
    return attrs;
  }, [history]);

  const overall = useMemo(() => {
    return Math.round(Object.values(currentAttributes).reduce((a, b) => a + b, 0) / 13);
  }, [currentAttributes]);

  const radarData = useMemo(() => {
    return ATTRIBUTES.map((attr) => ({
      attribute: ATTRIBUTE_LABELS[attr],
      fullMark: 100,
      value: currentAttributes[attr],
    }));
  }, [currentAttributes]);

  const handleResetTeam = () => {
    if (teamResetsLeft > 0 && !isSpinning && !teamLocked) {
      setTeamResetsLeft((r) => r - 1);
      setSelectedTeam(null);
      setSelectedPlayer(null);
      setAcquiredSkill(null);
      setDisplayIndex(0);
      startSpin();
    }
  };

  const handleSelectPlayer = (player: LegendaryPlayer) => {
    setSelectedPlayer(player);
    setState("skill");
  };

  const handleStealSkill = (skill: PlayerSkill) => {
    if (!selectedTeam || !selectedPlayer || isSpinning || stealingRef.current) return;
    if (stolenSkillKeys.has(skillKey(skill))) return;
    stealingRef.current = true;
    const key = skillKey(skill);
    const stolen: StolenSkill = { ...skill, player: selectedPlayer, team: selectedTeam };
    setAcquiredSkill(skill);
    setHistory((prev) => {
      if (prev.some((s) => s.attribute === skill.attribute)) return prev;
      return [...prev, stolen];
    });
    setStolenSkillKeys((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });

    setTimeout(() => {
      setHistory((currentHistory) => {
        const nextLength = currentHistory.length;
        if (nextLength < TOTAL_ROUNDS) {
          setRound((r) => r + 1);
          setTeamLocked(false);
          setSelectedTeam(null);
          setSelectedPlayer(null);
          setAcquiredSkill(null);
          setDisplayIndex(0);
          setTimeout(() => {
            stealingRef.current = false;
            startSpin();
          }, 0);
        } else {
          stealingRef.current = false;
          setState("completed");
        }
        return currentHistory;
      });
    }, 800);
  };

  const handlePlayAgain = () => {
    setHistory([]);
    setRound(0);
    setTeamResetsLeft(3);
    setSelectedTeam(null);
    setSelectedPlayer(null);
    setAcquiredSkill(null);
    setStolenSkillKeys(new Set());
    stealingRef.current = false;
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
    router.push(`/zh-CN/build/preview?${params.toString()}`);
  };

  const team = selectedTeam || pool[displayIndex];
  const isDrawDone = selectedTeam && !isSpinning && state === "draw";

  const draftBoard = Array.from({ length: TOTAL_ROUNDS }).map((_, i) => {
    const skill = history[i];
    if (skill) {
      return { filled: true, rarity: skill.rarity, attribute: skill.attribute } as const;
    }
    if (i < round) return { filled: false, active: true } as const;
    return { filled: false, active: false } as const;
  });

  return (
    <main className="bg-[#0B0B12] min-h-screen text-white font-sans selection:bg-[#F2CA50]/30">
      <header className="h-14 border-b border-white/8 bg-[#0B0B12] flex items-center justify-between px-6 lg:px-10 shrink-0">
        <div className="font-[family-name:var(--font-anton)] text-lg uppercase tracking-wider text-white">HooperVault</div>
        <div className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-bold">
          第 {Math.min(round, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}
        </div>
        <div className="text-xs text-[#A8A8B3] uppercase tracking-wider">{mode === "blind" ? "盲选模式" : "经典模式"}</div>
      </header>

      {state === "completed" && (
        <div className="absolute inset-x-0 top-14 bottom-0 z-30 flex items-center justify-center bg-[#0B0B12]/95 backdrop-blur-sm px-8">
          <div className="glass-card rounded-2xl p-10 md:p-14 text-center max-w-2xl w-full border border-[#F2CA50]/20">
            <div className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-bold mb-3">构建完成</div>
            <h2 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl uppercase tracking-wide mb-8">传奇构建</h2>
            <div className="flex items-center justify-center gap-10 mb-10">
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3] mb-1">总评</div>
                <div className="font-[family-name:var(--font-space-grotesk)] text-7xl font-bold text-[#F2CA50]">{overall}</div>
              </div>
              <div className="text-left text-[#A8A8B3] text-sm">
                <div>已偷取 13 个技能</div>
                <div>来自 {history.length} 位传奇</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="xl" onClick={handlePlayAgain}>再玩一次</Button>
              <Button variant="secondary" size="xl" onClick={handlePreview}>查看传奇页面</Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_540px] min-h-[calc(100vh-56px)]">
        {/* LEFT GAMEPLAY AREA */}
        <section className="relative p-6 lg:p-10 overflow-hidden flex flex-col">
          {/* STATE 01: DRAW TEAM */}
          {state === "draw" && (
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <div className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-bold mb-2">第 {Math.min(round, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}</div>
                <h1 className="font-[family-name:var(--font-anton)] text-4xl lg:text-5xl uppercase tracking-wide">抽取你的传奇球队</h1>
                <p className="text-[#A8A8B3] text-sm mt-2">你的旅程从一个传奇篮球时代开始。</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center">
                {!isDrawDone ? (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="font-[family-name:var(--font-anton)] text-3xl uppercase tracking-wide mb-2">抽取中...</h2>
                      <p className="text-[#A8A8B3] text-sm">19 支传奇球队候选池</p>
                    </div>
                    <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-3 max-w-4xl w-full">
                      {pool.map((t) => {
                        const active = t.id === team.id;
                        return (
                          <div
                            key={t.id}
                            className={`rounded-xl p-3 border text-center transition-all ${
                              active ? "bg-[#FF5E07]/10 border-[#FF5E07] text-white scale-105" : "bg-[#111317] border-white/10 text-[#A8A8B3] opacity-60"
                            }`}
                          >
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold mx-auto mb-2 overflow-hidden bg-white/5 ${active ? "ring-2 ring-[#FF5E07]" : "opacity-60"}`}>
                              <img src={teamLogoPath(t)} alt={t.teamShortName} className="w-full h-full object-contain" />
                            </div>
                            <div className="text-[9px] uppercase tracking-wider truncate">{t.teamShortName}</div>
                            <div className="text-[8px] text-[#A8A8B3]">{t.season}</div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2CA50]/10 border border-[#F2CA50]/30 text-[#F2CA50] text-[10px] uppercase tracking-widest font-bold mb-4">
                      <Trophy className="h-3.5 w-3.5" />
                      传奇球队已发现
                    </div>
                    <div className="glass-card rounded-3xl p-10 border border-[#F2CA50]/30 shadow-[0_0_60px_rgba(242,202,80,0.15)] max-w-md mx-auto">
                      <div className="w-20 h-20 rounded-full bg-white/5 border border-[#F2CA50]/30 flex items-center justify-center mx-auto mb-4 overflow-hidden p-2">
                        <img src={teamLogoPath(selectedTeam!)} alt={selectedTeam!.teamShortName} className="w-full h-full object-contain" />
                      </div>
                      <div className="text-[#F2CA50] text-sm font-bold uppercase tracking-widest mb-1">{selectedTeam!.season}</div>
                      <h2 className="font-[family-name:var(--font-anton)] text-4xl uppercase tracking-wide mb-2">{selectedTeam!.teamName}</h2>
                      <p className="text-[#A8A8B3] text-sm mb-6">{selectedTeam!.note}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STATE 02: CHOOSE PLAYER */}
          {state === "player" && selectedTeam && (
            <div className="h-full flex flex-col">
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-bold">第 {Math.min(round, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}</span>
                  <Button variant="outline" size="sm" onClick={handleResetTeam} disabled={teamResetsLeft === 0 || isSpinning}>
                    <RefreshCw className="h-3.5 w-3.5 mr-2" /> 重置球队 · 剩余 {teamResetsLeft} 次
                  </Button>
                </div>
                <div className="text-[#F2CA50] text-sm font-bold uppercase tracking-widest mb-1">{selectedTeam.season}</div>
                <h1 className="font-[family-name:var(--font-anton)] text-3xl lg:text-4xl uppercase tracking-wide">从 {selectedTeam.teamName}</h1>
                <p className="text-[#A8A8B3] text-sm mt-1">选择一名传奇球员来继承一项技能。</p>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {selectedTeam.players.map((player) => {
                  const Icon = showNames ? Star : EyeOff;
                  const ovr = playerOvr(player);
                  return (
                    <button
                      key={player.id}
                      onClick={() => handleSelectPlayer(player)}
                      className="flex-shrink-0 rounded-xl border p-3 sm:p-4 min-w-[150px] sm:min-w-[170px] text-left transition-all bg-[#111317] border-white/10 hover:border-[#F2CA50]/40 hover:bg-[#F2CA50]/5 h-fit flex flex-col"
                    >
                      <div className="flex items-start gap-2.5 mb-3">
                        <div className="w-11 h-11 rounded-full bg-[#0B0B12] border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {showNames ? (
                            <img
                              src={player.avatarPath}
                              alt={player.fullName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Icon className="h-5 w-5 text-[#F2CA50]" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <div className="font-[family-name:var(--font-anton)] text-[11px] uppercase leading-tight line-clamp-1">{showNames ? player.fullName : "???"}</div>
                          <div className="text-[9px] text-[#A8A8B3] leading-tight line-clamp-1 mt-0.5">{showNames ? player.nickname : "隐藏传奇"}</div>
                        </div>
                      </div>
                      <div className="mt-auto flex items-center justify-between border-t border-white/8 pt-2 text-[9px] uppercase tracking-wider">
                        <span className="text-[#A8A8B3]">{player.position}</span>
                        <span className="text-[#F2CA50] font-bold">评分 {ovr}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-center h-full text-center">
                <p className="text-[#A8A8B3] text-sm">选择上方球员卡片以偷取技能。</p>
              </div>
            </div>
          )}

          {/* STATE 03: STEAL SKILL */}
          {state === "skill" && selectedTeam && selectedPlayer && (
            <div className="h-full flex flex-col">
              <div className="mb-4">
                <div className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-bold mb-2">第 {Math.min(round, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}</div>
                <h1 className="font-[family-name:var(--font-anton)] text-3xl lg:text-4xl uppercase tracking-wide">从 {showNames ? selectedPlayer.fullName : "???"}</h1>
                <p className="text-[#A8A8B3] text-sm mt-1">点击技能即可偷取。已使用的技能会被锁定。</p>
              </div>

              <div className="flex items-center gap-3 mb-4 p-3 bg-[#111317] rounded-xl border border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#0B0B12] border border-[#F2CA50]/30 flex items-center justify-center overflow-hidden">
                  {showNames ? (
                    <img
                      src={selectedPlayer.avatarPath}
                      alt={selectedPlayer.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Star className="h-5 w-5 text-[#F2CA50]" />
                  )}
                </div>
                <div>
                  <div className="font-[family-name:var(--font-anton)] text-base uppercase tracking-wide">{showNames ? selectedPlayer.fullName : "???"}</div>
                  <div className="text-[9px] text-[#A8A8B3]">{showNames ? selectedPlayer.nickname : "隐藏传奇"} · {selectedPlayer.position} · 评分 {playerOvr(selectedPlayer)}</div>
                </div>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto pr-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                  {selectedPlayer.skills.map((skill) => {
                    const key = skillKey(skill);
                    const stolen = history.some((h) => h.attribute === skill.attribute) || stolenSkillKeys.has(key);
                    const justGot = acquiredSkill?.id === skill.id;
                    const color = rarityColor(skill.rarity);
                    return (
                      <button
                        key={skill.id}
                        disabled={stolen || justGot || isSpinning || stealingRef.current}
                        onClick={() => handleStealSkill(skill)}
                        className={`relative rounded-lg border p-2 text-left transition-all ${
                          justGot
                            ? "bg-[#F2CA50]/20 border-[#F2CA50] shadow-[0_0_24px_rgba(242,202,80,0.22)] scale-[1.02]"
                            : stolen
                            ? "bg-[#1a1c20]/40 border-white/5 opacity-40 cursor-not-allowed"
                            : "bg-[#111317] border-white/10 hover:border-[#F2CA50]/40 hover:scale-[1.02]"
                        }`}
                      >
                        {stolen && (
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <Lock className="h-5 w-5 text-[#A8A8B3]" />
                          </div>
                        )}
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[8px] uppercase tracking-wider font-bold" style={{ color }}>{skill.rarity}</span>
                          <span className="text-[9px] text-[#A8A8B3] uppercase tracking-wider">{ATTRIBUTE_LABELS[skill.attribute]}</span>
                        </div>
                        <div className="font-[family-name:var(--font-anton)] text-sm uppercase tracking-wide mb-1 leading-tight">{skill.name}</div>
                        <div className="flex items-center gap-1.5">
                          <Zap className="h-3 w-3" style={{ color }} />
                          <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold" style={{ color }}>+{skill.value}</span>
                          <span className="text-[9px] text-[#A8A8B3]">(+{skill.bonus})</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* RIGHT HOOPER PANEL — FIXED */}
        <aside className="border-l border-white/8 bg-[#111317]/60 p-8 flex flex-col items-center text-center shrink-0 overflow-y-auto">
          <div className="w-full">
            <div className="text-[10px] uppercase tracking-widest text-[#A8A8B3] font-bold mb-1">你的 Hooper</div>
            <h2 className="font-[family-name:var(--font-anton)] text-3xl uppercase tracking-wide">自定义构建</h2>
            <div className="text-[10px] text-[#A8A8B3] mt-1">BAH-{String(round).padStart(2, "0")}</div>
          </div>

          <div className="my-8 text-center">
            <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3] mb-1">总评</div>
            <div className={`font-[family-name:var(--font-space-grotesk)] text-8xl font-bold ${overall !== null ? "text-[#F2CA50]" : "text-[#A8A8B3]/30"}`}>
              {overall ?? "--"}
            </div>
          </div>

          {/* 13 Skills Radar */}
          <div className="h-64 w-full mb-6 relative">
            {history.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="text-center">
                  <div className="text-[#A8A8B3]/40 text-xs uppercase tracking-widest">构建中</div>
                  <div className="text-[#A8A8B3]/20 text-2xl">...</div>
                </div>
              </div>
            )}
            <CustomRadar data={radarData} />
          </div>

          {/* 选秀进度 Board */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#A8A8B3] font-bold">选秀进度</span>
              <span className="text-xs font-bold text-[#F2CA50]">{Math.min(round, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}</span>
            </div>
            <div className="grid grid-cols-13 gap-1 mb-4">
              {draftBoard.map((slot, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded border ${
                    slot.filled
                      ? slot.rarity === "legendary"
                        ? "bg-[#F2CA50] border-[#F2CA50]"
                        : "bg-[#6CB9FF] border-[#6CB9FF]"
                      : slot.active
                      ? "bg-[#FF5E07] border-[#FF5E07]"
                      : "bg-[#1a1c20] border-white/10"
                  }`}
                  title={slot.filled ? `${ATTRIBUTE_LABELS[slot.attribute as Attribute]}` : undefined}
                />
              ))}
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
