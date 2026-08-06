"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  ATTRIBUTES,
  type Attribute,
  POSITION_MODIFIERS,
} from "@/data/legends";
import {
  getTeamById,
  getDraftRoundFromTeam,
  type HistoricTeam,
  type LegendaryPlayer,
  type PlayerSkill,
} from "@/data/teams";
import {
  RefreshCw,
  ChevronRight,
  Zap,
  Star,
  Trophy,
  EyeOff,
} from "lucide-react";

const TOTAL_ROUNDS = 13;
const MAX_REROLLS = 2;
const DEFAULT_TEAM_ID = "95-96-bulls";

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash) % 1000000;
}

const ATTRIBUTE_LABELS: Record<Attribute, string> = {
  shooting: "三分",
  mid_range: "中距离",
  finishing: "终结",
  dunk: "扣篮",
  passing: "传球",
  ball_handle: "控球",
  perimeter_defense: "外线防守",
  interior_defense: "内线防守",
  block: "盖帽",
  rebound: "篮板",
  speed: "速度",
  strength: "力量",
  clutch: "关键球",
};

export default function DraftPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111317]" />}>
      <DraftPageInner />
    </Suspense>
  );
}

function DraftPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const position = (searchParams.get("position") || "SG") as keyof typeof POSITION_MODIFIERS;
  const mode = searchParams.get("mode") || "classic";
  const teamId = searchParams.get("team") || DEFAULT_TEAM_ID;
  const seed = parseInt(searchParams.get("seed") || "20260805", 10);

  const team = useMemo(() => getTeamById(teamId) || getTeamById(DEFAULT_TEAM_ID)!, [teamId]);

  const [round, setRound] = useState(1);
  const [rerollsLeft, setRerollsLeft] = useState(MAX_REROLLS);
  const [rerollKey, setRerollKey] = useState(0);
  const [history, setHistory] = useState<(PlayerSkill & { player: LegendaryPlayer; team: HistoricTeam })[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const baseAttributes = useMemo(() => {
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
    const modifiers = POSITION_MODIFIERS[position] || {};
    for (const [key, value] of Object.entries(modifiers)) {
      attrs[key as Attribute] += value;
    }
    return attrs;
  }, [position]);

  const currentAttributes = useMemo(() => {
    const attrs = { ...baseAttributes };
    history.forEach((skill) => {
      const attr = skill.attribute as Attribute;
      attrs[attr] = Math.min(99, attrs[attr] + skill.bonus);
    });
    return attrs;
  }, [baseAttributes, history]);

  const { optionA, optionB } = useMemo(
    () => getDraftRoundFromTeam(team, round, rerollKey + round * 11 + seed),
    [team, round, rerollKey, seed]
  );

  const handlePick = (skill: PlayerSkill & { player: LegendaryPlayer; team: HistoricTeam }) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHistory((prev) => [...prev, skill]);
    setTimeout(() => {
      if (round < TOTAL_ROUNDS) {
        setRound((r) => r + 1);
      }
      setIsAnimating(false);
    }, 450);
  };

  const handleReroll = () => {
    if (rerollsLeft > 0) {
      setRerollsLeft((r) => r - 1);
      setRerollKey((k) => k + 1);
    }
  };

  useEffect(() => {
    if (history.length >= TOTAL_ROUNDS) {
      const skillIds = history.map((s) => s.id).join(",");
      const resultSeed = hashString(`${team.id}:${position}:${mode}:${skillIds}`);
      const params = new URLSearchParams();
      params.set("position", position);
      params.set("mode", mode);
      params.set("team", team.id);
      params.set("seed", resultSeed.toString());
      params.set("history", skillIds);
      router.push(`/zh-CN/build/preview?${params.toString()}`);
    }
  }, [history, position, mode, team, router]);

  const progress = (round / TOTAL_ROUNDS) * 100;

  return (
    <>
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-6">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10">
            <div className="text-center mb-6">
              <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-2">
                第 4 步（共 5 步）
              </p>
              <h1 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide">
                抽取传奇技能
              </h1>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#F2CA50]/10 border border-[#F2CA50]/30 text-[#F2CA50] text-xs uppercase tracking-wider font-bold">
                  {team.season} {team.teamName}
                </span>
                <span className="text-[#A8A8B3] text-xs uppercase tracking-wider">{team.record}</span>
              </div>
              <div className="flex justify-between text-xs uppercase tracking-wider text-[#A8A8B3] mb-2">
                <span>第 {Math.min(round, TOTAL_ROUNDS)} / {TOTAL_ROUNDS} 轮</span>
                <span>已完成 {Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-[#1a1c20] rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-[#FF5E07] rounded-full shadow-[0_0_10px_rgba(255,94,7,0.8)] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Section className="relative min-h-[60vh]">
        <Container>
          {round <= TOTAL_ROUNDS ? (
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-stretch justify-center max-w-6xl mx-auto">
              <DraftCard
                skill={optionA}
                mode={mode}
                onPick={() => handlePick(optionA)}
                isAnimating={isAnimating}
              />

              <div className="flex items-center justify-center lg:py-0 py-4">
                <div className="w-14 h-14 rounded-full bg-[#1a1c20] border-2 border-white/10 flex items-center justify-center shadow-xl">
                  <span className="font-[family-name:var(--font-anton)] text-xl text-[#A8A8B3] italic">VS</span>
                </div>
              </div>

              <DraftCard
                skill={optionB}
                mode={mode}
                onPick={() => handlePick(optionB)}
                isAnimating={isAnimating}
              />
            </div>
          ) : null}

          <div className="max-w-4xl mx-auto mt-10 flex flex-col md:flex-row justify-between items-center gap-6 glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="md"
                onClick={handleReroll}
                disabled={rerollsLeft === 0 || isAnimating}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                重抽 (剩余 {rerollsLeft} 次)
              </Button>
            </div>
            <div className="flex-1 w-full md:w-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center">
                {ATTRIBUTES.map((attr) => (
                  <div key={attr} className="bg-[#1a1c20] rounded p-2">
                    <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">
                      {ATTRIBUTE_LABELS[attr]}
                    </div>
                    <div className={`font-[family-name:var(--font-space-grotesk)] font-bold ${
                      currentAttributes[attr] >= 90 ? "text-[#F2CA50]" : currentAttributes[attr] >= 75 ? "text-white" : "text-[#A8A8B3]"
                    }`}>
                      {currentAttributes[attr]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function DraftCard({
  skill,
  mode,
  onPick,
  isAnimating,
}: {
  skill: PlayerSkill & { player: LegendaryPlayer; team: HistoricTeam };
  mode: string;
  onPick: () => void;
  isAnimating: boolean;
}) {
  const isLegendary = skill.rarity === "legendary";
  const showName = mode !== "blind";
  const Icon = isLegendary ? Trophy : skill.rarity === "epic" ? Star : Zap;
  const borderColor = isLegendary ? "#F2CA50" : "#6CB9FF";
  const artImage = isLegendary ? "/images/draft-art-1.jpg" : "/images/draft-art-2.jpg";
  const iconImage = isLegendary ? "/images/draft-icon-1.jpg" : "/images/draft-icon-2.jpg";

  return (
    <div className="flex-1 max-w-md mx-auto w-full group">
      <div
        className="glass-card rounded-2xl overflow-hidden h-full flex flex-col relative transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        style={{
          borderColor: `${borderColor}40`,
          boxShadow: `0 0 30px ${isLegendary ? "rgba(242, 202, 80, 0.12)" : "rgba(108, 185, 255, 0.12)"}`,
        }}
        onClick={onPick}
      >
        <div
          className="h-48 relative border-b border-white/10 overflow-hidden"
          style={{
            backgroundImage: `url('${artImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <span
              className={`px-3 py-1 rounded-full font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-wider border flex items-center gap-1 ${
                isLegendary
                  ? "bg-[#F2CA50]/10 text-[#F2CA50] border-[#F2CA50]/30"
                  : "bg-[#6CB9FF]/10 text-[#6CB9FF] border-[#6CB9FF]/30"
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {skill.rarity}
            </span>
            <div className="w-10 h-10 rounded-full bg-[#1a1c20]/80 border border-white/10 flex items-center justify-center">
              {showName ? <Star className="h-5 w-5 text-[#F2CA50]" /> : <EyeOff className="h-5 w-5 text-[#A8A8B3]" />}
            </div>
          </div>
          <div className="absolute bottom-4 left-4 z-10">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl text-white uppercase drop-shadow-md leading-none">
              {showName ? skill.player.fullName : "???"}
            </h2>
            <p className="text-[#A8A8B3] text-sm mt-1">{skill.name}</p>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <p className="text-[#A8A8B3] mb-6 flex-1">{skill.description}</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-[#1a1c20] rounded-lg p-3 border border-white/5">
              <span className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">{ATTRIBUTE_LABELS[skill.attribute as Attribute] || skill.attribute}</span>
              <span className={`font-[family-name:var(--font-space-grotesk)] text-2xl font-bold block ${isLegendary ? "text-[#F2CA50]" : "text-[#6CB9FF]"}`}>
                +{skill.bonus}
              </span>
            </div>
            <div className="bg-[#1a1c20] rounded-lg p-3 border border-white/5">
              <span className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">招牌</span>
              <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-white block">
                {skill.name}
              </span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#F2CA50]/20 flex-shrink-0">
              <img
                src={showName ? iconImage : undefined}
                alt={showName ? `${skill.player.fullName} 灵感肖像` : "隐藏传奇"}
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">灵感来源</div>
              <div className="text-sm text-white font-medium">
                {showName ? `${skill.player.fullName}, ${skill.team.season} ${skill.team.teamName}` : "???"}
              </div>
            </div>
          </div>

          <Button
            variant={isLegendary ? "primary" : "outline"}
            fullWidth
            size="lg"
            disabled={isAnimating}
            onClick={(e) => {
              e.stopPropagation();
              onPick();
            }}
          >
            选择技能 <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
