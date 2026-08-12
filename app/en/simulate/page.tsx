"use client";

import { useEffect, useMemo, useState, useCallback, useRef, Suspense } from "react";
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
import { trackEvent } from "@/lib/analytics";
import {
  Trophy,
  Medal,
  Star,
  ChevronRight,
  Swords,
  Shield,
  Zap,
  Play,
  FastForward,
  SkipForward,
  Crown,
  Flame,
  Target,
  CheckCircle,
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

function generateBaseAttributes(seed: number): Record<Attribute, number> {
  // Deterministic per-seed attribute variance: base 65..84 gives more
  // variety across builds while keeping the same build reproducible.
  const base: Record<Attribute, number> = {
    shooting: 75, mid_range: 75, finishing: 75, dunk: 75, passing: 75,
    ball_handle: 75, perimeter_defense: 75, interior_defense: 75, block: 75,
    rebound: 75, speed: 75, strength: 75, clutch: 75,
  };
  (Object.keys(base) as Attribute[]).forEach((attr) => {
    let hash = 0;
    for (const ch of `${seed}:${attr}`) {
      hash = ((hash << 5) - hash + ch.charCodeAt(0)) & 0xffffffff;
    }
    hash ^= hash >>> 16;
    hash = (hash * 0x85ebca6b) & 0xffffffff;
    hash ^= hash >>> 13;
    hash = (hash * 0xc2b2ae35) & 0xffffffff;
    hash ^= hash >>> 16;
    base[attr] = 65 + (hash % 20);
  });
  return base;
}

type GameResult = {
  opponent: string;
  result: "W" | "L";
  score: string;
  playerStats: { pts: number; reb: number; ast: number };
  gameNum: number;
};

type PlayoffSeries = {
  round: string;
  opponent: string;
  opponentSeed: number;
  wins: number;
  losses: number;
  result: "W" | "L" | "in_progress";
  games: GameResult[];
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
  "Hawks", "Celtics", "Nets", "Hornets", "Bulls", "Cavaliers", "Mavericks", "Nuggets",
  "Pistons", "Warriors", "Rockets", "Pacers", "Clippers", "Lakers", "Grizzlies", "Heat",
  "Bucks", "Timberwolves", "Pelicans", "Knicks", "Thunder", "Magic", "76ers",
  "Suns", "Trail Blazers", "Kings", "Spurs", "Raptors", "Jazz", "Wizards",
];

const PLAYOFF_ROUNDS = [
  { name: "First Round", emoji: "🏀", opponentStrength: 0.10 },
  { name: "Conference Semifinals", emoji: "🔥", opponentStrength: 0.16 },
  { name: "Conference Finals", emoji: "⚡", opponentStrength: 0.22 },
  { name: "NBA Finals", emoji: "🏆", opponentStrength: 0.28 },
];

function generateSchedule(seed: number): string[] {
  const schedule: string[] = [];
  const rng = (i: number) => {
    const x = Math.sin(seed * 9301 + i * 49297 + 233280) * 10000;
    return x - Math.floor(x);
  };
  for (let i = 0; i < 82; i++) {
    schedule.push(OPPONENTS[Math.floor(rng(i) * OPPONENTS.length)]);
  }
  return schedule;
}

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
  const challengeId = searchParams.get("challenge"); // Challenge ID from URL

  const [hooperData, setHooperData] = useState<HooperApiData | null>(null);
  const [loadingHooper, setLoadingHooper] = useState(!!slug);
  const [hooperError, setHooperError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetch(`/api/hoopers/${encodeURIComponent(slug)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load Hooper data");
        const json = await res.json();
        if (!cancelled) setHooperData(json);
      })
      .catch((err) => {
        if (!cancelled) setHooperError(err.message || "Failed to load Hooper data");
      })
      .finally(() => {
        if (!cancelled) setLoadingHooper(false);
      });
    return () => { cancelled = true; };
  }, [slug]);

  const position = (hooperData?.position || positionParam) as keyof typeof POSITION_MODIFIERS;
  const mode = hooperData?.mode || modeParam;
  const seed = hooperData?.seed ?? seedParam;

  // --- Phase state machine ---
  type Phase = "intro" | "regular_season" | "playoff_check" | "playoffs" | "result";
  const [phase, setPhase] = useState<Phase>("intro");

  // --- Custom hooper identity ---
  const [customName, setCustomName] = useState("");
  const [customImage, setCustomImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hooperDisplayName = customName.trim() || "Your Hooper";
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCustomImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // --- Regular season state ---
  const [gameIndex, setGameIndex] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [games, setGames] = useState<GameResult[]>([]);
  const [playerTotals, setPlayerTotals] = useState({ pts: 0, reb: 0, ast: 0 });
  const [simulating, setSimulating] = useState(false);
  const simulatingRef = useRef(false);

  // --- Playoff state ---
  const [playoffSeed, setPlayoffSeed] = useState(0);
  const [playoffSeries, setPlayoffSeries] = useState<PlayoffSeries[]>([]);
  const [currentPlayoffRound, setCurrentPlayoffRound] = useState(0);
  const [playoffGameIndex, setPlayoffGameIndex] = useState(0);
  const [playoffWins, setPlayoffWins] = useState(0);
  const [playoffLosses, setPlayoffLosses] = useState(0);
  const [playoffGames, setPlayoffGames] = useState<GameResult[]>([]);
  const [playoffSimulating, setPlayoffSimulating] = useState(false);
  const playoffSimulatingRef = useRef(false);
  const [champion, setChampion] = useState(false);
  // Refs to avoid stale closures in timeouts
  const playoffRoundRef = useRef(0);
  const playoffWinsRef = useRef(0);
  const playoffLossesRef = useRef(0);
  const playoffSeriesRef = useRef<PlayoffSeries[]>([]);

  // --- Challenge submission state ---
  const [submittingChallenge, setSubmittingChallenge] = useState(false);
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [challengeRank, setChallengeRank] = useState<number | null>(null);
  const [challengeError, setChallengeError] = useState<string | null>(null);

  // --- Derived data ---
  const skills = useMemo(() => {
    const historyString = hooperData?.history || historyParam;
    return parseSkillsFromHistory(historyString);
  }, [hooperData, historyParam]);

  const attributes: Record<Attribute, number> = useMemo(() => {
    const attrs: Record<Attribute, number> = generateBaseAttributes(seed);
    const modifiers = POSITION_MODIFIERS[position] || {};
    Object.entries(modifiers).forEach(([key, value]) => {
      attrs[key as Attribute] += value;
    });
    skills.forEach((skill) => {
      attrs[skill.attribute as Attribute] = Math.min(99, attrs[skill.attribute as Attribute] + skill.bonus);
    });
    return attrs;
  }, [position, skills, seed]);

  const overall = useMemo(() => {
    return Math.round(Object.values(attributes).reduce((a, b) => a + b, 0) / 13);
  }, [attributes]);

  const schedule = useMemo(() => generateSchedule(seed), [seed]);

  const simulateGame = useCallback((idx: number, opponentOverride?: string, strengthBoost?: number, useRandom = false): GameResult => {
    const opponent = opponentOverride || schedule[idx % schedule.length];
    const baseWin = (overall - 40 + (attributes.clutch - 60) * 0.3) / 100;
    // Use true randomness for playoff games so outcomes aren't fixed per seed
    const noise = useRandom ? Math.random() : (Math.sin(idx * 123.45 + seed * 0.7 + idx * 0.3) + 1) / 2;
    const strength = strengthBoost ?? 0;
    // Playoff clutch bonus: small edge for higher OVR in playoffs
    const playoffBonus = strength > 0 ? Math.max(0, (overall - 60) * 0.008) : 0;
    const isWin = noise < baseWin - strength + playoffBonus;

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
      gameNum: idx + 1,
    };
  }, [overall, attributes, seed, schedule]);

  // --- Batch simulate regular season ---
  const simulateBatch = useCallback((count: number) => {
    if (simulatingRef.current) return;
    simulatingRef.current = true;
    setSimulating(true);

    const remaining = 82 - gameIndex;
    const toSim = Math.min(count, remaining);
    if (toSim <= 0) {
      simulatingRef.current = false;
      setSimulating(false);
      return;
    }

    let delay = 0;
    const batchSize = Math.min(toSim, count === 82 ? 82 : count);
    const interval = count === 82 ? 15 : count === 10 ? 60 : count === 5 ? 100 : 200;

    for (let i = 0; i < batchSize; i++) {
      setTimeout(() => {
        const idx = gameIndex + i;
        const game = simulateGame(idx);
        setGames((prev) => [...prev, game]);
        if (game.result === "W") setWins((w) => w + 1);
        else setLosses((l) => l + 1);
        setPlayerTotals((t) => ({
          pts: t.pts + game.playerStats.pts,
          reb: t.reb + game.playerStats.reb,
          ast: t.ast + game.playerStats.ast,
        }));
        setGameIndex((prev) => {
          const next = prev + 1;
          if (next >= 82) {
            setTimeout(() => {
              simulatingRef.current = false;
              setSimulating(false);
              setPhase("playoff_check");
            }, 300);
          }
          return next;
        });

        if (i === batchSize - 1 && gameIndex + batchSize < 82) {
          simulatingRef.current = false;
          setSimulating(false);
        }
      }, delay);
      delay += interval;
    }
  }, [gameIndex, simulateGame]);

  // --- Playoff simulation ---
  const simulatePlayoffGame = useCallback((roundIdx: number, gameIdx: number): GameResult => {
    const round = PLAYOFF_ROUNDS[roundIdx];
    const opponentSeedNum = 8 - roundIdx;
    const opponentName = `${OPPONENTS[Math.floor((seed * 7 + roundIdx * 13) % OPPONENTS.length)]}`;
    return simulateGame(
      82 + roundIdx * 7 + gameIdx,
      opponentName,
      round.opponentStrength,
      true  // use Math.random() for playoffs
    );
  }, [seed, simulateGame]);

  const startPlayoffRound = useCallback((roundIdx: number) => {
    setCurrentPlayoffRound(roundIdx);
    playoffRoundRef.current = roundIdx;
    setPlayoffGameIndex(0);
    setPlayoffWins(0);
    playoffWinsRef.current = 0;
    setPlayoffLosses(0);
    playoffLossesRef.current = 0;
    setPlayoffGames([]);
    setPhase("playoffs");
  }, []);

  const simulatePlayoffBatch = useCallback((count: number) => {
    if (playoffSimulatingRef.current) return;
    playoffSimulatingRef.current = true;
    setPlayoffSimulating(true);

    const roundIdx = playoffRoundRef.current;
    const round = PLAYOFF_ROUNDS[roundIdx];
    const remaining = Math.max(0, 7 - playoffWinsRef.current - playoffLossesRef.current);
    const toSim = Math.min(count, remaining);
    if (toSim <= 0) {
      playoffSimulatingRef.current = false;
      setPlayoffSimulating(false);
      return;
    }

    const interval = count >= 7 ? 30 : count === 1 ? 250 : 100;
    let seriesEnded = false;

    for (let i = 0; i < toSim; i++) {
      const delayMs = i * interval;
      setTimeout(() => {
        if (seriesEnded || !playoffSimulatingRef.current) return;

        const gameIdx = playoffWinsRef.current + playoffLossesRef.current;
        const game = simulatePlayoffGame(roundIdx, gameIdx);

        setPlayoffGames((prev) => [...prev, game]);
        setPlayerTotals((t) => ({
          pts: t.pts + game.playerStats.pts,
          reb: t.reb + game.playerStats.reb,
          ast: t.ast + game.playerStats.ast,
        }));
        setPlayoffGameIndex((prev) => prev + 1);

        if (game.result === "W") {
          playoffWinsRef.current += 1;
          setPlayoffWins(playoffWinsRef.current);

          if (playoffWinsRef.current >= 4) {
            seriesEnded = true;
            const seriesEntry: PlayoffSeries = {
              round: round.name,
              opponent: game.opponent,
              opponentSeed: 8 - roundIdx,
              wins: playoffWinsRef.current,
              losses: playoffLossesRef.current,
              result: "W",
              games: [],
            };
            playoffSeriesRef.current = [...playoffSeriesRef.current, seriesEntry];
            setPlayoffSeries(playoffSeriesRef.current);

            setTimeout(() => {
              if (roundIdx >= 3) {
                setChampion(true);
                setPhase("result");
              } else {
                startPlayoffRound(roundIdx + 1);
              }
              playoffSimulatingRef.current = false;
              setPlayoffSimulating(false);
            }, 400);
            return;
          }
        } else {
          playoffLossesRef.current += 1;
          setPlayoffLosses(playoffLossesRef.current);

          if (playoffLossesRef.current >= 4) {
            seriesEnded = true;
            const seriesEntry: PlayoffSeries = {
              round: round.name,
              opponent: game.opponent,
              opponentSeed: 8 - roundIdx,
              wins: playoffWinsRef.current,
              losses: playoffLossesRef.current,
              result: "L",
              games: [],
            };
            playoffSeriesRef.current = [...playoffSeriesRef.current, seriesEntry];
            setPlayoffSeries(playoffSeriesRef.current);

            setTimeout(() => {
              setPhase("result");
              playoffSimulatingRef.current = false;
              setPlayoffSimulating(false);
            }, 400);
            return;
          }
        }

        if (i === toSim - 1) {
          setTimeout(() => {
            playoffSimulatingRef.current = false;
            setPlayoffSimulating(false);
          }, interval + 50);
        }
      }, delayMs);
    }
  }, [simulatePlayoffGame, startPlayoffRound]);

  // --- Derived stats ---
  const totalGamesPlayed = gameIndex;
  const ppgValue = totalGamesPlayed > 0 ? playerTotals.pts / totalGamesPlayed : 0;
  const rpgValue = totalGamesPlayed > 0 ? playerTotals.reb / totalGamesPlayed : 0;
  const apgValue = totalGamesPlayed > 0 ? playerTotals.ast / totalGamesPlayed : 0;
  const ppg = ppgValue.toFixed(1);
  const rpg = rpgValue.toFixed(1);
  const apg = apgValue.toFixed(1);

  // Playoff qualification
  const qualifiedForPlayoffs = wins >= 42;
  const playoffSeedValue = wins >= 60 ? 1 : wins >= 55 ? 2 : wins >= 50 ? 3 : wins >= 47 ? 4 : wins >= 44 ? 5 : 6;

  const awards = useMemo(() => {
    const list = [];
    if (champion) list.push("NBA Champion");
    if (overall >= 95) list.push("Hall of Fame");
    if (qualifiedForPlayoffs && playoffSeries.length >= 3) list.push("Conference Champion");
    if (qualifiedForPlayoffs) list.push("Playoff Berth");
    if (wins >= 60) list.push("60-Win Season");
    if (ppgValue >= 25) list.push("Scoring Title");
    if (apgValue >= 8) list.push("Assist Leader");
    if (rpgValue >= 10) list.push("Rebound King");
    if (wins >= 55 && (ppgValue >= 20 || apgValue >= 7)) list.push("MVP Candidate");
    if (champion && ppgValue >= 22) list.push("Finals MVP");
    return list;
  }, [overall, wins, ppgValue, apgValue, rpgValue, qualifiedForPlayoffs, playoffSeries, champion]);

  const handlePlayAgain = () => {
    setPhase("intro");
    setGameIndex(0);
    setWins(0);
    setLosses(0);
    setGames([]);
    setPlayerTotals({ pts: 0, reb: 0, ast: 0 });
    setPlayoffSeries([]);
    playoffSeriesRef.current = [];
    setCurrentPlayoffRound(0);
    playoffRoundRef.current = 0;
    setPlayoffGameIndex(0);
    setPlayoffWins(0);
    playoffWinsRef.current = 0;
    setPlayoffLosses(0);
    playoffLossesRef.current = 0;
    setPlayoffGames([]);
    setChampion(false);
    setChallengeSubmitted(false);
    setChallengeRank(null);
    setChallengeError(null);
  };

  const saveAndGoLegacy = () => {
    try {
      const simData = {
        customName: hooperDisplayName,
        customImage: customImage,
        overall,
        position,
        mode,
        seed,
        history: hooperData?.history || historyParam,
        archetype: (() => {
          const archetypes = [
            { name: "Two-Way Superstar", check: (a: Record<string, number>) => (a.perimeter_defense >= 80 || a.interior_defense >= 80 || a.block >= 80) && (a.shooting >= 80 || a.finishing >= 80 || a.mid_range >= 80) },
            { name: "Legendary Slasher", check: (a: Record<string, number>) => a.finishing >= 85 && a.dunk >= 80 && a.speed >= 75 },
            { name: "Floor General", check: (a: Record<string, number>) => a.passing >= 85 && a.ball_handle >= 80 && a.speed >= 75 },
            { name: "Splash Legend", check: (a: Record<string, number>) => a.shooting >= 85 && a.mid_range >= 75 },
            { name: "Rim Protector", check: (a: Record<string, number>) => a.block >= 85 && (a.interior_defense >= 80 || a.rebound >= 80) },
            { name: "Versatile Wing", check: (a: Record<string, number>) => { const v = Object.values(a); return v.every(x => x >= 70) && v.reduce((s, x) => s + x, 0) / v.length >= 78; } },
          ];
          return archetypes.find(a => a.check(attributes))?.name || "Rising Prospect";
        })(),
        attributes: Object.fromEntries(ATTRIBUTES.map(attr => [attr, attributes[attr]])),
        season: { wins, losses, ppg: parseFloat(ppg), rpg: parseFloat(rpg), apg: parseFloat(apg) },
        playoffs: {
          qualified: qualifiedForPlayoffs,
          seed: playoffSeedValue,
          champion,
          series: playoffSeries.map((s) => ({
            round: s.round,
            opponent: s.opponent,
            wins: s.wins,
            losses: s.losses,
            result: s.result,
          })),
        },
        awards,
        timestamp: Date.now(),
      };
      localStorage.setItem("hoopervault_sim_result", JSON.stringify(simData));
    } catch {
      // ignore localStorage errors
    }
  };

  const submitChallenge = async () => {
    if (!challengeId) return;
    if (challengeSubmitted) return;

    setSubmittingChallenge(true);
    setChallengeError(null);
    try {
      const res = await fetch("/api/challenge/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId,
          slug: slug || "",
          overall,
          archetype: (() => {
            const archetypes = [
              { name: "Two-Way Superstar", check: (a: Record<string, number>) => (a.perimeter_defense >= 80 || a.interior_defense >= 80 || a.block >= 80) && (a.shooting >= 80 || a.finishing >= 80 || a.mid_range >= 80) },
              { name: "Legendary Slasher", check: (a: Record<string, number>) => a.finishing >= 85 && a.dunk >= 80 && a.speed >= 75 },
              { name: "Floor General", check: (a: Record<string, number>) => a.passing >= 85 && a.ball_handle >= 80 && a.speed >= 75 },
              { name: "Splash Legend", check: (a: Record<string, number>) => a.shooting >= 85 && a.mid_range >= 75 },
              { name: "Rim Protector", check: (a: Record<string, number>) => a.block >= 85 && (a.interior_defense >= 80 || a.rebound >= 80) },
              { name: "Versatile Wing", check: (a: Record<string, number>) => { const v = Object.values(a); return v.every(x => x >= 70) && v.reduce((s, x) => s + x, 0) / v.length >= 78; } },
            ];
            return archetypes.find(a => a.check(attributes))?.name || "Rising Prospect";
          })(),
          firstName: null,
          lastName: null,
          seasonWins: wins,
          seasonLosses: losses,
          playoffWins: playoffSeries.reduce((sum, s) => sum + s.wins, 0),
          championship: champion,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setChallengeSubmitted(true);
      setChallengeRank(data.rank);
    } catch (err) {
      setChallengeError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmittingChallenge(false);
    }
  };

  // Start regular season when phase changes
  useEffect(() => {
    if (phase === "regular_season" && !simulatingRef.current) {
      simulateBatch(82);
    }
  }, [phase, simulateBatch]);

  // Continue to playoffs if qualified
  useEffect(() => {
    if (phase === "playoff_check") {
      if (qualifiedForPlayoffs) {
        setPlayoffSeed(playoffSeedValue);
        startPlayoffRound(0);
      } else {
        setPhase("result");
      }
    }
  }, [phase, qualifiedForPlayoffs, playoffSeedValue, startPlayoffRound]);

  // Start first playoff round when entering playoffs
  useEffect(() => {
    if (phase === "playoffs" && !playoffSimulatingRef.current && playoffSeries.length === 0) {
      simulatePlayoffBatch(7);
    }
  }, [phase, playoffSeries.length, simulatePlayoffBatch]);

  return (
    <div className="min-h-screen bg-[#0B0B12] text-white">
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-6">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-2">
              82-Game Season Simulation
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide">
              Simulate Your Legacy
            </h1>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            {phase === "intro" && (
              <div className="text-center py-12">
                <div className="glass-card rounded-2xl p-8 md:p-12">
                  <div className="text-[#F2CA50] text-5xl font-black mb-4">{overall}</div>
                  <p className="text-[#A8A8B3] mb-8">Overall Rating</p>
                  <button
                    onClick={() => setPhase("regular_season")}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#F2CA50] px-8 py-4 text-base font-bold text-[#0B0B12] hover:bg-[#F2CA50]/90 transition-all"
                  >
                    <Play className="w-5 h-5" /> Start Season
                  </button>
                </div>
              </div>
            )}

            {(phase === "regular_season" || phase === "playoff_check") && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#F2CA50] font-bold">Regular Season</p>
                    <p className="text-sm text-[#A8A8B3]">Game {gameIndex} / 82</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-white">{wins}-{losses}</p>
                  </div>
                </div>
                <div className="grid gap-2 max-h-[400px] overflow-y-auto">
                  {games.slice(-10).map((game) => (
                    <div key={game.gameNum} className="flex items-center justify-between bg-[#111317]/50 rounded-lg p-3 border border-white/5">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${game.result === "W" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{game.result}</span>
                        <span className="text-sm text-white">Game {game.gameNum}</span>
                        <span className="text-sm text-[#A8A8B3]">vs {game.opponent}</span>
                      </div>
                      <span className="text-sm font-bold text-white">{game.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {phase === "playoffs" && (
              <div className="text-center py-12">
                <div className="glass-card rounded-2xl p-8">
                  <Crown className="w-12 h-12 text-[#F2CA50] mx-auto mb-4" />
                  <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-2">Playoffs</h2>
                  <p className="text-[#A8A8B3]">{playoffSeries.length > 0 ? playoffSeries[playoffSeries.length - 1].round : "First Round"}</p>
                  <p className="text-2xl font-black text-white mt-4">{playoffWins}-{playoffLosses}</p>
                </div>
              </div>
            )}

            {phase === "result" && (
              <div className="space-y-6">
                <div className="glass-card rounded-2xl p-8 text-center">
                  <div className="text-[#F2CA50] text-6xl font-black mb-2">{overall}</div>
                  <p className="text-[#A8A8B3] mb-4">Final Overall Rating</p>
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    <div className="bg-[#111317] rounded-lg p-3">
                      <p className="text-xs text-[#A8A8B3]">Wins</p>
                      <p className="text-xl font-bold text-white">{wins}</p>
                    </div>
                    <div className="bg-[#111317] rounded-lg p-3">
                      <p className="text-xs text-[#A8A8B3]">Losses</p>
                      <p className="text-xl font-bold text-white">{losses}</p>
                    </div>
                    <div className="bg-[#111317] rounded-lg p-3">
                      <p className="text-xs text-[#A8A8B3]">{champion ? "Champion" : "Playoffs"}</p>
                      <p className="text-xl font-bold text-white">{champion ? "🏆" : qualifiedForPlayoffs ? "Yes" : "No"}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <Button onClick={handlePlayAgain} variant="outline">Play Again</Button>
                    <Button asChild href={`/en/hooper?slug=${slug || ""}`} variant="secondary">View Legacy</Button>
                    {challengeId && (
                      <Button onClick={submitChallenge} disabled={submittingChallenge || challengeSubmitted} variant="secondary">
                        {challengeSubmitted ? `Submitted #${challengeRank}` : submittingChallenge ? "Submitting..." : "Submit to Challenge"}
                      </Button>
                    )}
                  </div>
                  {challengeError && <p className="text-red-400 text-sm mt-4">{challengeError}</p>}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "PPG", value: ppg },
                    { label: "RPG", value: rpg },
                    { label: "APG", value: apg },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[#111317] rounded-lg p-4 text-center">
                      <p className="text-xs text-[#A8A8B3]">{stat.label}</p>
                      <p className="text-2xl font-bold text-[#F2CA50]">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {awards.length > 0 && (
                  <div className="bg-[#111317] rounded-2xl p-6">
                    <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-4">Awards</h3>
                    <div className="flex flex-wrap gap-2">
                      {awards.map((award) => (
                        <span key={award} className="bg-[#F2CA50]/10 text-[#F2CA50] px-3 py-1 rounded-full text-sm font-bold">{award}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
