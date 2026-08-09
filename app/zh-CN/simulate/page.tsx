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

  // --- Derived data ---
  const skills = useMemo(() => {
    const historyString = hooperData?.history || historyParam;
    return parseSkillsFromHistory(historyString);
  }, [hooperData, historyParam]);

  const attributes: Record<Attribute, number> = useMemo(() => {
    const attrs: Record<Attribute, number> = {
      shooting: 75, mid_range: 75, finishing: 75, dunk: 75, passing: 75,
      ball_handle: 75, perimeter_defense: 75, interior_defense: 75, block: 75,
      rebound: 75, speed: 75, strength: 75, clutch: 75,
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

  const schedule = useMemo(() => generateSchedule(seed), [seed]);

  const simulateGame = useCallback((idx: number, opponentOverride?: string, strengthBoost?: number, useRandom = false): GameResult => {
    const opponent = opponentOverride || schedule[idx % schedule.length];
    const baseWin = (overall + (attributes.clutch - 60) * 0.2) / 100;
    // Use true randomness for playoff games so outcomes aren't fixed per seed
    const noise = useRandom ? Math.random() : (Math.sin(idx * 123.45 + seed * 0.7 + idx * 0.3) + 1) / 2;
    const strength = strengthBoost ?? 0;
    // Playoff clutch bonus: higher OVR gives bigger edge in playoffs
    const playoffBonus = strength > 0 ? Math.max(0, (overall - 50) * 0.015) : 0;
    const isWin = noise < baseWin + 0.15 - strength + playoffBonus;

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
          series: playoffSeries.map(s => ({ round: s.round, opponent: s.opponent, wins: s.wins, losses: s.losses, result: s.result })),
        },
        awards,
        timestamp: Date.now(),
      };
      localStorage.setItem("hoopervault_sim_result", JSON.stringify(simData));
    } catch (e) {
      // localStorage might be full or disabled
    }
  };

  const remainingGames = 82 - gameIndex;
  const playoffRemainingGames = Math.max(0, 7 - playoffWins - playoffLosses);

  return (
    <>
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-6">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-2">
              {phase === "playoffs" ? "Playoffs" : phase === "result" ? "Season Complete" : "Season Simulation"}
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide">
              {phase === "playoffs"
                ? PLAYOFF_ROUNDS[currentPlayoffRound]?.name || "Playoffs"
                : phase === "playoff_check"
                ? "Regular Season Complete"
                : "Simulate Your Season"}
            </h1>
          </div>
        </Container>
      </div>

      <Section className="relative bg-court">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Loading */}
            {loadingHooper && (
              <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
                <div className="h-12 w-12 border-4 border-[#F2CA50]/20 border-t-[#F2CA50] rounded-full animate-spin mx-auto mb-6" />
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-2">Loading Build</h2>
                <p className="text-[#A8A8B3]">Retrieving Hooper from the vault...</p>
              </div>
            )}

            {/* Error */}
            {hooperError && !loadingHooper && (
              <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
                <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-2">Error Loading Build</h2>
                <p className="text-[#A8A8B3] mb-6">{hooperError}</p>
                <Button variant="secondary" size="xl" onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            )}

            {/* ===== INTRO ===== */}
            {!loadingHooper && !hooperError && phase === "intro" && (
              <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
                <Trophy className="h-16 w-16 text-[#F2CA50] mx-auto mb-6" />
                <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-4">
                  Ready to Simulate?
                </h2>
                <p className="text-[#A8A8B3] text-lg mb-8 max-w-xl mx-auto">
                  Your build will play an 82-game regular season. Then, if you qualify, battle through the playoffs and Finals.
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                  <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                    <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">OVR</div>
                    <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#F2CA50]">{overall}</div>
                  </div>
                  <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                    <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">Position</div>
                    <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">{position}</div>
                  </div>
                  <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                    <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">Mode</div>
                    <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white capitalize">{mode}</div>
                  </div>
                </div>

                {/* Custom Hooper Identity */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-bold mb-4 text-center">Customize Your Hooper</div>
                  <div className="flex items-center gap-5 bg-[#1a1c20] rounded-xl p-5 border border-white/5">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-20 h-20 rounded-full border-2 border-dashed border-[#F2CA50]/40 bg-[#111317] flex items-center justify-center overflow-hidden hover:border-[#F2CA50] transition-colors cursor-pointer relative group"
                      >
                        {customImage ? (
                          <img src={customImage} alt="Hooper" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center">
                            <svg className="w-6 h-6 text-[#A8A8B3] mx-auto mb-1 group-hover:text-[#F2CA50] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" /></svg>
                            <span className="text-[8px] text-[#A8A8B3] group-hover:text-[#F2CA50] transition-colors">Upload</span>
                          </div>
                        )}
                      </button>
                      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </div>
                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <label className="text-[10px] uppercase tracking-wider text-[#A8A8B3] mb-1.5 block">Player Name</label>
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="Enter your hooper's name"
                        maxLength={24}
                        className="w-full bg-[#111317] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm font-[family-name:var(--font-space-grotesk)] placeholder:text-[#A8A8B3]/50 focus:outline-none focus:border-[#F2CA50]/50 focus:ring-1 focus:ring-[#F2CA50]/20 transition-colors"
                      />
                      <div className="text-[9px] text-[#A8A8B3] mt-1.5">
                        {customImage ? "✓ Avatar uploaded" : "Click the circle to upload an avatar"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 max-w-md mx-auto mb-8">
                  <p className="text-[#A8A8B3] text-sm">Choose how many games to simulate at a time:</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button variant="outline" size="lg" onClick={() => { setPhase("regular_season"); setTimeout(() => simulateBatch(1), 80); }}>
                    <Play className="h-4 w-4 mr-2" /> 1 Game
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => { setPhase("regular_season"); setTimeout(() => simulateBatch(5), 80); }}>
                    <FastForward className="h-4 w-4 mr-2" /> 5 Games
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => { setPhase("regular_season"); setTimeout(() => simulateBatch(10), 80); }}>
                    <SkipForward className="h-4 w-4 mr-2" /> 10 Games
                  </Button>
                  <Button variant="secondary" size="lg" onClick={() => { setPhase("regular_season"); setTimeout(() => simulateBatch(82), 80); }}>
                    <Flame className="h-4 w-4 mr-2" /> Full Season
                  </Button>
                </div>
              </div>
            )}

            {/* ===== REGULAR SEASON ===== */}
            {!loadingHooper && !hooperError && phase === "regular_season" && (
              <div className="space-y-4">
                {/* Scoreboard */}
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {customImage && (
                        <img src={customImage} alt={hooperDisplayName} className="w-10 h-10 rounded-full object-cover border border-[#F2CA50]/30" />
                      )}
                      <div>
                        <div className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide">{hooperDisplayName}</div>
                        <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">Game</div>
                        <div className="font-[family-name:var(--font-anton)] text-3xl text-white">
                          {Math.min(gameIndex, 82)} <span className="text-[#A8A8B3] text-lg">/ 82</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">Record</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold">
                        <span className="text-[#F2CA50]">{wins}</span>
                        <span className="text-[#A8A8B3] mx-1">-</span>
                        <span className="text-[#FF5E07]">{losses}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">Win %</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white">
                        {gameIndex > 0 ? ((wins / gameIndex) * 100).toFixed(1) : "0.0"}%
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-3 bg-[#1a1c20] rounded-full overflow-hidden border border-white/5 mb-3">
                    <div
                      className="h-full rounded-full transition-all duration-200"
                      style={{
                        width: `${(gameIndex / 82) * 100}%`,
                        background: "linear-gradient(90deg, #FF5E07, #F2CA50)",
                      }}
                    />
                  </div>

                  {/* Playoff cutoff indicator */}
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#A8A8B3]">
                    <span>0</span>
                    <span className="text-[#FF5E07]">Playoff line: 42W</span>
                    <span>82</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="glass-card rounded-xl p-4 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">PPG</div>
                    <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">{ppg}</div>
                  </div>
                  <div className="glass-card rounded-xl p-4 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">RPG</div>
                    <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">{rpg}</div>
                  </div>
                  <div className="glass-card rounded-xl p-4 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">APG</div>
                    <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">{apg}</div>
                  </div>
                </div>

                {/* Simulate buttons */}
                {gameIndex < 82 && (
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase tracking-widest text-[#A8A8B3] font-bold">Simulate</span>
                      <span className="text-xs text-[#A8A8B3]">{remainingGames} games remaining</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => simulateBatch(1)} disabled={simulating || remainingGames <= 0}>
                        <Play className="h-3.5 w-3.5 mr-1.5" /> 1
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => simulateBatch(5)} disabled={simulating || remainingGames <= 0}>
                        <FastForward className="h-3.5 w-3.5 mr-1.5" /> 5
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => simulateBatch(10)} disabled={simulating || remainingGames <= 0}>
                        <SkipForward className="h-3.5 w-3.5 mr-1.5" /> 10
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => simulateBatch(82)} disabled={simulating || remainingGames <= 0}>
                        <Flame className="h-3.5 w-3.5 mr-1.5" /> All Remaining
                      </Button>
                    </div>
                  </div>
                )}

                {/* Game log */}
                <div className="glass-card rounded-xl p-4">
                  <div className="text-[10px] uppercase tracking-widest text-[#A8A8B3] font-bold mb-3">Game Log</div>
                  <div className="h-56 overflow-hidden relative bg-[#111317]/50 rounded-lg border border-white/5 p-3">
                    {games.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-[#A8A8B3] text-sm">No games played yet</div>
                    ) : (
                      <div className="space-y-1.5 overflow-y-auto h-full hide-scrollbar">
                        {[...games].reverse().map((game, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between text-sm py-1.5 px-3 rounded bg-[#1a1c20]/50 border border-white/5"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-[#A8A8B3] w-6">#{game.gameNum}</span>
                              <span className={`font-bold text-xs ${game.result === "W" ? "text-[#F2CA50]" : "text-[#FF5E07]"}`}>
                                {game.result}
                              </span>
                              <span className="text-white text-xs">vs {game.opponent}</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#A8A8B3]">
                              <span className="text-white font-medium text-xs">{game.score}</span>
                              <span className="text-[10px] hidden sm:inline">{game.playerStats.pts}P/{game.playerStats.reb}R/{game.playerStats.ast}A</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ===== PLAYOFF CHECK ===== */}
            {!loadingHooper && !hooperError && phase === "playoff_check" && (
              <div className="space-y-4">
                <div className="legendary-card rounded-2xl p-8 md:p-10 text-center">
                  {customImage && (
                    <img src={customImage} alt={hooperDisplayName} className="w-16 h-16 rounded-full object-cover border-2 border-[#F2CA50]/30 mx-auto mb-3" />
                  )}
                  <div className="text-6xl mb-4">{qualifiedForPlayoffs ? "🏆" : "😢"}</div>
                  <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-1">
                    {hooperDisplayName}
                  </h2>
                  <h3 className="font-[family-name:var(--font-anton)] text-xl md:text-2xl text-[#F2CA50] uppercase tracking-wide mb-3">
                    {qualifiedForPlayoffs ? "Playoff Bound!" : "Season Over"}
                  </h3>
                  <p className="text-[#A8A8B3] text-lg mb-2">
                    Final Record: <span className="text-white font-bold">{wins} - {losses}</span>
                  </p>
                  {qualifiedForPlayoffs ? (
                    <p className="text-[#F2CA50] text-sm mb-6">
                      You earned the <span className="font-bold">#{playoffSeedValue} seed</span> in your conference. Time for the playoffs.
                    </p>
                  ) : (
                    <p className="text-[#A8A8B3] text-sm mb-6">
                      You needed 42 wins to make the playoffs. Build a stronger hooper and try again.
                    </p>
                  )}

                  <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                    <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">PPG</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">{ppg}</div>
                    </div>
                    <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">RPG</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">{rpg}</div>
                    </div>
                    <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">APG</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">{apg}</div>
                    </div>
                  </div>

                  {qualifiedForPlayoffs ? (
                    <div className="flex flex-wrap justify-center gap-3">
                      <Button variant="outline" size="lg" onClick={() => startPlayoffRound(0)}>
                        <Swords className="h-4 w-4 mr-2" /> Start Playoffs
                      </Button>
                      <Button variant="outline" size="lg" onClick={() => {
                        setPlayoffSeed(playoffSeedValue);
                        const fakeSeries: PlayoffSeries[] = [];
                        for (let r = 0; r < 4; r++) {
                          const wl = Math.floor(Math.random() * 3);
                          fakeSeries.push({
                            round: PLAYOFF_ROUNDS[r].name,
                            opponent: OPPONENTS[r * 3],
                            opponentSeed: 8 - r,
                            wins: 4,
                            losses: wl,
                            result: "W",
                            games: [],
                          });
                        }
                        setPlayoffSeries(fakeSeries);
                        playoffSeriesRef.current = fakeSeries;
                        setChampion(true);
                        setPhase("result");
                      }}>
                        <Flame className="h-4 w-4 mr-2" /> Simulate All Playoffs
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap justify-center gap-3">
                      <Button variant="outline" size="lg" onClick={handlePlayAgain}>Play Again</Button>
                      <Button variant="secondary" size="lg" onClick={() => { saveAndGoLegacy(); window.location.href = `/en/hooper?slug=${hooperData?.slug || slug || "sample"}&position=${position}&mode=${mode}&seed=${seed}`; }}>
                        <span className="flex items-center gap-2">View Legacy Card <ChevronRight className="h-5 w-5" /></span>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Playoff bracket preview */}
                {qualifiedForPlayoffs && (
                  <div className="glass-card rounded-xl p-5">
                    <div className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-bold mb-4">Playoff Bracket</div>
                    <div className="grid grid-cols-4 gap-3">
                      {PLAYOFF_ROUNDS.map((round, i) => (
                        <div key={i} className="text-center">
                          <div className="text-lg mb-1">{round.emoji}</div>
                          <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3] font-bold">{round.name}</div>
                          <div className="text-[10px] text-[#A8A8B3] mt-1">Best of 7</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ===== PLAYOFFS ===== */}
            {!loadingHooper && !hooperError && phase === "playoffs" && (
              <div className="space-y-4">
                {/* Series scoreboard */}
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {customImage && (
                        <img src={customImage} alt={hooperDisplayName} className="w-10 h-10 rounded-full object-cover border border-[#F2CA50]/30" />
                      )}
                      <div>
                        <div className="font-[family-name:var(--font-anton)] text-sm text-[#A8A8B3] uppercase tracking-wide">{hooperDisplayName}</div>
                        <div className="text-lg mb-1">{PLAYOFF_ROUNDS[currentPlayoffRound]?.emoji}</div>
                        <div className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide">
                          {PLAYOFF_ROUNDS[currentPlayoffRound]?.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">Series</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold">
                        <span className="text-[#F2CA50]">{playoffWins}</span>
                        <span className="text-[#A8A8B3] mx-1">-</span>
                        <span className="text-[#FF5E07]">{playoffLosses}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">Need</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">4 Wins</div>
                    </div>
                  </div>

                  {/* Series progress */}
                  <div className="flex gap-1.5 mt-4 mb-3">
                    {Array.from({ length: 7 }).map((_, i) => {
                      const game = playoffGames[i];
                      let bg = "bg-[#1a1c20] border-white/10";
                      if (game) {
                        bg = game.result === "W"
                          ? "bg-[#F2CA50] border-[#F2CA50]"
                          : "bg-[#FF5E07] border-[#FF5E07]";
                      }
                      return (
                        <div key={i} className={`flex-1 h-3 rounded border ${bg}`} />
                      );
                    })}
                  </div>
                  <div className="text-[10px] text-[#A8A8B3] text-center">
                    {playoffWins < 4 && playoffLosses < 4
                      ? `Game ${playoffGames.length + 1} of 7`
                      : playoffWins >= 4
                      ? "Series Won!"
                      : "Series Lost"}
                  </div>
                </div>

                {/* Previous series */}
                {playoffSeries.length > 0 && (
                  <div className="glass-card rounded-xl p-4">
                    <div className="text-[10px] uppercase tracking-widest text-[#A8A8B3] font-bold mb-3">Previous Series</div>
                    <div className="space-y-2">
                      {playoffSeries.map((s, i) => (
                        <div key={i} className="flex items-center justify-between bg-[#1a1c20]/50 rounded-lg p-3 border border-white/5">
                          <div className="flex items-center gap-3">
                            <span className="text-sm">{PLAYOFF_ROUNDS[i]?.emoji}</span>
                            <div>
                              <div className="text-white text-sm font-medium">{s.round}</div>
                              <div className="text-[10px] text-[#A8A8B3]">vs {s.opponent}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${s.result === "W" ? "text-[#F2CA50]" : "text-[#FF5E07]"}`}>
                              {s.wins}-{s.losses}
                            </span>
                            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${
                              s.result === "W" ? "bg-[#F2CA50]/10 text-[#F2CA50]" : "bg-[#FF5E07]/10 text-[#FF5E07]"
                            }`}>
                              {s.result === "W" ? "WON" : "LOST"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Simulate buttons */}
                {playoffWins < 4 && playoffLosses < 4 && (
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase tracking-widest text-[#A8A8B3] font-bold">Simulate</span>
                      <span className="text-xs text-[#A8A8B3]">{playoffRemainingGames} games remaining in series</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => simulatePlayoffBatch(1)} disabled={playoffSimulating}>
                        <Play className="h-3.5 w-3.5 mr-1.5" /> 1
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => simulatePlayoffBatch(5)} disabled={playoffSimulating}>
                        <FastForward className="h-3.5 w-3.5 mr-1.5" /> 5
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => simulatePlayoffBatch(7)} disabled={playoffSimulating}>
                        <Flame className="h-3.5 w-3.5 mr-1.5" /> Full Series
                      </Button>
                    </div>
                  </div>
                )}

                {/* Playoff game log */}
                <div className="glass-card rounded-xl p-4">
                  <div className="text-[10px] uppercase tracking-widest text-[#A8A8B3] font-bold mb-3">Series Log</div>
                  <div className="h-40 overflow-hidden relative bg-[#111317]/50 rounded-lg border border-white/5 p-3">
                    {playoffGames.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-[#A8A8B3] text-sm">No playoff games played yet</div>
                    ) : (
                      <div className="space-y-1.5 overflow-y-auto h-full hide-scrollbar">
                        {[...playoffGames].reverse().map((game, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between text-sm py-1.5 px-3 rounded bg-[#1a1c20]/50 border border-white/5"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-[#A8A8B3]">G{playoffGames.length - i}</span>
                              <span className={`font-bold text-xs ${game.result === "W" ? "text-[#F2CA50]" : "text-[#FF5E07]"}`}>
                                {game.result}
                              </span>
                              <span className="text-white text-xs">vs {game.opponent}</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#A8A8B3]">
                              <span className="text-white font-medium text-xs">{game.score}</span>
                              <span className="text-[10px] hidden sm:inline">{game.playerStats.pts}P/{game.playerStats.reb}R/{game.playerStats.ast}A</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ===== RESULT ===== */}
            {!loadingHooper && !hooperError && phase === "result" && (
              <div className="space-y-6">
                <div className="legendary-card rounded-2xl p-8 md:p-10 text-center">
                  {customImage && (
                    <img src={customImage} alt={hooperDisplayName} className="w-20 h-20 rounded-full object-cover border-2 border-[#F2CA50]/30 mx-auto mb-3" />
                  )}
                  <div className="text-6xl mb-4">{champion ? "🏆" : qualifiedForPlayoffs ? "⚔️" : "📊"}</div>
                  <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white uppercase tracking-wide mb-1">
                    {hooperDisplayName}
                  </h2>
                  <h3 className="font-[family-name:var(--font-anton)] text-2xl md:text-3xl text-[#F2CA50] uppercase tracking-wide mb-2">
                    {champion ? "NBA Champion!" : qualifiedForPlayoffs ? "Playoff Exit" : "Season Complete"}
                  </h3>
                  <p className="text-[#A8A8B3] text-lg mb-6">
                    Final Record: <span className="text-white font-bold">{wins} - {losses}</span>
                    {qualifiedForPlayoffs && (
                      <> &middot; Playoff Seed: <span className="text-[#F2CA50] font-bold">#{playoffSeedValue}</span></>
                    )}
                    {champion && (
                      <> &middot; <span className="text-[#F2CA50] font-bold">CHAMPION</span></>
                    )}
                  </p>

                  <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                    <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">PPG</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white">{ppg}</div>
                    </div>
                    <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">RPG</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white">{rpg}</div>
                    </div>
                    <div className="bg-[#1a1c20] rounded-xl p-4 border border-white/5">
                      <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">APG</div>
                      <div className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white">{apg}</div>
                    </div>
                  </div>

                  {/* Playoff journey */}
                  {playoffSeries.length > 0 && (
                    <div className="max-w-lg mx-auto mb-8">
                      <div className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-bold mb-3">Playoff Journey</div>
                      <div className="space-y-2">
                        {playoffSeries.map((s, i) => (
                          <div key={i} className="flex items-center justify-between bg-[#1a1c20]/50 rounded-lg p-3 border border-white/5">
                            <div className="flex items-center gap-3">
                              <span className="text-sm">{PLAYOFF_ROUNDS[i]?.emoji}</span>
                              <div className="text-left">
                                <div className="text-white text-sm font-medium">{s.round}</div>
                                <div className="text-[10px] text-[#A8A8B3]">vs {s.opponent}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${s.result === "W" ? "text-[#F2CA50]" : "text-[#FF5E07]"}`}>
                                {s.wins}-{s.losses}
                              </span>
                              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${
                                s.result === "W" ? "bg-[#F2CA50]/10 text-[#F2CA50]" : "bg-[#FF5E07]/10 text-[#FF5E07]"
                              }`}>
                                {s.result === "W" ? "WON" : "LOST"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Awards */}
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
                      <span className="text-[#A8A8B3]">No major awards this season. Build again to chase greatness.</span>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    <Button variant="outline" size="xl" onClick={handlePlayAgain}>Play Again</Button>
                    <Button
                      variant="secondary"
                      size="xl"
                      onClick={() => { saveAndGoLegacy(); window.location.href = `/en/hooper?slug=${hooperData?.slug || slug || "sample"}&position=${position}&mode=${mode}&seed=${seed}`; }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        View Legacy Card <ChevronRight className="h-5 w-5" />
                      </span>
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
