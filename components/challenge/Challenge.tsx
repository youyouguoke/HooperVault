"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Trophy, Crown, Medal, Award, Clock, Users, Swords, TrendingUp, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type Challenge = {
  id: string;
  title: string;
  seed: number;
  status: string;
  startTime: string;
  endTime: string;
  theme: string | null;
};

type Entry = {
  hooper_slug: string;
  overall: number;
  archetype: string;
  first_name: string | null;
  last_name: string | null;
  username: string;
  season_wins: number;
  season_losses: number;
  playoff_wins: number;
  championship: number;
  season_score: number;
  build_score: number;
  challenge_bonus: number;
  total_score: number;
  submitted_at: string;
};

const UI = {
  title: { en: "Daily Challenge", "zh-CN": "每日挑战" },
  subtitle: { en: "Every player gets the same seed. Build, simulate 82 games, compete.", "zh-CN": "所有玩家共享同一个种子。构建、模拟82场比赛、一决高下。" },
  loading: { en: "Loading challenge...", "zh-CN": "正在加载挑战..." },
  noChallenge: { en: "No challenge today. Check back tomorrow!", "zh-CN": "今天没有挑战，明天再来！" },
  startChallenge: { en: "Start Challenge", "zh-CN": "开始挑战" },
  seed: { en: "Seed", "zh-CN": "种子" },
  playersJoined: { en: "Players Joined", "zh-CN": "已参与" },
  podium: { en: "Today's Podium", "zh-CN": "今日领奖台" },
  noEntries: { en: "No entries yet. Be the first!", "zh-CN": "暂无提交，成为第一个！" },
  rank: { en: "Rank", "zh-CN": "排名" },
  score: { en: "Score", "zh-CN": "分数" },
  record: { en: "Record", "zh-CN": "战绩" },
  champion: { en: "Champion", "zh-CN": "冠军" },
  remaining: { en: "Remaining", "zh-CN": "剩余时间" },
  today: { en: "Today's Challenge", "zh-CN": "今日挑战" },
  dynastyBuilder: { en: "Dynasty Builder", "zh-CN": "王朝建造者" },
  seedLocked: { en: "Seed Locked", "zh-CN": "种子锁定" },
  simulationRequired: { en: "82-Game Simulation Required", "zh-CN": "需要模拟82场比赛" },
  simulationDesc: { en: "Build quality is proven through full season simulation.", "zh-CN": "构建质量通过完整赛季模拟来验证。" },
} as const;

function t(key: keyof typeof UI, lang: "en" | "zh-CN"): string {
  return UI[key][lang];
}

function getDisplayName(h: Entry): string {
  if (h.first_name && h.last_name) return `${h.first_name} ${h.last_name}`;
  return h.hooper_slug.split("-")[0].toUpperCase() + " Builder";
}

function getTier(totalScore: number): { label: string; color: string; bg: string } {
  if (totalScore >= 180) return { label: "Legendary", color: "#F2CA50", bg: "rgba(242,202,80,0.12)" };
  if (totalScore >= 150) return { label: "Elite", color: "#6CB9FF", bg: "rgba(108,185,255,0.12)" };
  if (totalScore >= 120) return { label: "Star", color: "#FF5E07", bg: "rgba(255,94,7,0.12)" };
  return { label: "Rising", color: "#A8A8B3", bg: "rgba(168,168,179,0.12)" };
}

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="w-5 h-5 text-[#F2CA50]" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-[#C0C0C0]" />;
  if (rank === 3) return <Award className="w-5 h-5 text-[#CD7F32]" />;
  return <span className="text-sm text-[#A8A8B3] font-mono w-5 text-center">{rank}</span>;
}

function formatTimeAgo(dateStr: string): string {
  const now = Date.now();
  const utcStr = dateStr.endsWith("Z") ? dateStr : dateStr + "Z";
  const then = new Date(utcStr).getTime();
  const diff = now - then;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function formatTime(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function Challenge({ lang = "en" }: { lang?: "en" | "zh-CN" }) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [total, setTotal] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChallenge() {
      try {
        const res = await fetch("/api/challenge/leaderboard?limit=50");
        if (!res.ok) throw new Error("Failed to load");
        const json = await res.json();
        setChallenge(json.challenge);
        setEntries(json.entries || []);
        setTotal(json.total || 0);
        
        // Calculate time remaining
        if (json.challenge) {
          const endTime = new Date(json.challenge.endTime).getTime();
          const now = Date.now();
          setTimeRemaining(Math.max(0, endTime - now));
        }
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    fetchChallenge();
  }, []);

  // Update countdown every second
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 1000) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const buildHref = challenge
    ? `/${lang}/build/team?mode=classic&seed=${challenge.seed}&challenge=${challenge.id}`
    : `/${lang}/build/mode`;

  return (
    <>
      {/* Hero */}
      <Section className="relative border-b border-white/8 bg-[#111317] pt-16 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 to-transparent" />
        <Container>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F2CA50]/10 px-4 py-1.5 mb-4">
              <Flame className="w-4 h-4 text-[#F2CA50]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#F2CA50]">{t("today", lang)}</span>
            </div>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase tracking-wide mb-4">
              {t("title", lang)}
            </h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed">{t("subtitle", lang)}</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-2 border-[#F2CA50]/30 border-t-[#F2CA50] rounded-full animate-spin" />
                <p className="mt-4 text-sm text-[#A8A8B3]">{t("loading", lang)}</p>
              </div>
            ) : !challenge ? (
              <div className="glass-card rounded-2xl p-8 md:p-12 text-center border border-white/5">
                <Trophy className="w-12 h-12 text-[#A8A8B3]/30 mx-auto mb-4" />
                <p className="text-[#A8A8B3]">{t("noChallenge", lang)}</p>
              </div>
            ) : (
              <>
                {/* Challenge Card */}
                <div className="glass-card rounded-2xl p-8 md:p-12 text-center mb-10 border border-[#F2CA50]/20">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#F2CA50]/10 px-3 py-1 mb-6">
                    <Swords className="w-3.5 h-3.5 text-[#F2CA50]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F2CA50]">
                      {challenge.title}
                    </span>
                  </div>

                  <h2 className="font-[family-name:var(--font-anton)] text-2xl md:text-3xl text-white uppercase tracking-wide mb-6 leading-relaxed">
                    {challenge.theme || t("dynastyBuilder", lang)}
                  </h2>

                  <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm text-[#A8A8B3]">
                    <div className="flex items-center gap-1.5">
                      <Target className="w-4 h-4" />
                      <span>{t("seed", lang)}: <span className="text-white font-mono">#{challenge.seed}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span><span className="text-white font-bold">{total}</span> {t("playersJoined", lang)}</span>
                    </div>
                    {timeRemaining !== null && timeRemaining > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono text-[#F2CA50]">{formatTime(timeRemaining)}</span>
                        <span>{t("remaining", lang)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#FF5E07]/10 px-3 py-1">
                      <TrendingUp className="w-3.5 h-3.5 text-[#FF5E07]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5E07]">
                        {t("simulationRequired", lang)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={buildHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#F2CA50] px-8 py-3 text-base font-bold text-[#0B0B12] hover:bg-[#F2CA50]/90 transition-all hover:scale-[1.02]"
                  >
                    <Flame className="w-4 h-4" />
                    {t("startChallenge", lang)}
                  </Link>
                </div>

                {/* Daily Podium */}
                <div className="mb-6">
                  <h2 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-4">
                    {t("podium", lang)}
                  </h2>
                </div>

                {entries.length === 0 ? (
                  <div className="text-center py-12">
                    <Trophy className="w-10 h-10 text-[#A8A8B3]/30 mx-auto mb-3" />
                    <p className="text-sm text-[#A8A8B3]">{t("noEntries", lang)}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {entries.map((entry, i) => {
                      const rank = i + 1;
                      const tier = getTier(entry.total_score);
                      const name = getDisplayName(entry);
                      const href = `/${lang}/hooper?slug=${entry.hooper_slug}`;
                      const record = `${entry.season_wins}-${entry.season_losses}`;
                      const isChampion = entry.championship === 1;
                      const username = entry.username === "游客" ? (lang === "zh-CN" ? "游客" : "Guest") : (entry.username || (lang === "zh-CN" ? "游客" : "Guest"));
                      const timeAgo = formatTimeAgo(entry.submitted_at);

                      return (
                        <Link
                          key={entry.hooper_slug}
                          href={href}
                          className="group flex items-center gap-3 rounded-xl border border-white/5 bg-[#111317]/50 px-4 py-3 transition-all hover:border-white/10 hover:bg-[#111317]"
                        >
                          <div className="flex items-center justify-center w-8">
                            <RankIcon rank={rank} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-white truncate group-hover:text-[#F2CA50] transition-colors">
                                {name}
                              </p>
                              {isChampion && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#F2CA50]/10 px-2 py-0.5 text-[10px] font-bold text-[#F2CA50]">
                                  <Crown className="w-3 h-3" />
                                  {t("champion", lang)}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#A8A8B3]">
                              {entry.archetype} · {record}
                            </p>
                          </div>

                          <div className="hidden sm:flex flex-col items-end gap-0.5">
                            <span className="text-[10px] text-[#A8A8B3]">👤 {username}</span>
                            <span className="text-[10px] text-[#A8A8B3]/60">{timeAgo}</span>
                          </div>

                          <span
                            className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                            style={{ background: tier.bg, color: tier.color }}
                          >
                            {tier.label}
                          </span>

                          <div className="text-right">
                            <span className="text-lg font-black" style={{ color: tier.color }}>
                              {Math.round(entry.total_score)}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* Info cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { title: t("seedLocked", lang), body: t("subtitle", lang) },
                { title: t("simulationRequired", lang), body: t("simulationDesc", lang) },
                { title: t("dynastyBuilder", lang), body: "Build, simulate, compete. New challenge every day." },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-6">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm uppercase tracking-wider text-[#F2CA50] mb-2">{item.title}</h3>
                  <p className="text-[#A8A8B3] text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
