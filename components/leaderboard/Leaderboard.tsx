"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Trophy, Medal, Award, ChevronLeft, ChevronRight, Crown, Zap, Star, Shield } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type Hooper = {
  slug: string;
  position: string;
  mode: string;
  overall: number;
  archetype: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
};

type LeaderboardData = {
  hoopers: Hooper[];
  total: number;
  limit: number;
  offset: number;
};

const UI = {
  title: { en: "Top Builds", "zh-CN": "顶级构建" },
  subtitle: { en: "The highest-rated Hoopers created by the community", "zh-CN": "社区创造的最高评分 Hooper 构建" },
  loading: { en: "Loading leaderboard...", "zh-CN": "正在加载排行榜..." },
  empty: { en: "No builds yet. Be the first!", "zh-CN": "暂无构建，成为第一个！" },
  buildNow: { en: "Start Building", "zh-CN": "开始构建" },
  ovr: { en: "OVR", "zh-CN": "总评" },
  archetype: { en: "Archetype", "zh-CN": "球风" },
  position: { en: "POS", "zh-CN": "位置" },
  all: { en: "All", "zh-CN": "全部" },
  classic: { en: "Classic", "zh-CN": "经典" },
  blind: { en: "Blind", "zh-CN": "盲选" },
  prev: { en: "Previous", "zh-CN": "上一页" },
  next: { en: "Next", "zh-CN": "下一页" },
  page: { en: "Page", "zh-CN": "第" },
  of: { en: "of", "zh-CN": "/" },
  showing: { en: "Showing", "zh-CN": "显示" },
  to: { en: "to", "zh-CN": "至" },
  results: { en: "results", "zh-CN": "条" },
} as const;

function t(key: keyof typeof UI, lang: "en" | "zh-CN"): string {
  return UI[key][lang];
}

function getDisplayName(h: Hooper): string {
  if (h.first_name && h.last_name) return `${h.first_name} ${h.last_name}`;
  return h.slug.split("-")[0].toUpperCase() + " Builder";
}

function getTier(overall: number): { label: string; color: string; bg: string } {
  if (overall >= 95) return { label: "Legendary", color: "#F2CA50", bg: "rgba(242,202,80,0.12)" };
  if (overall >= 90) return { label: "Elite", color: "#6CB9FF", bg: "rgba(108,185,255,0.12)" };
  if (overall >= 80) return { label: "Star", color: "#FF5E07", bg: "rgba(255,94,7,0.12)" };
  return { label: "Rising", color: "#A8A8B3", bg: "rgba(168,168,179,0.12)" };
}

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="w-5 h-5 text-[#F2CA50]" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-[#C0C0C0]" />;
  if (rank === 3) return <Award className="w-5 h-5 text-[#CD7F32]" />;
  return <span className="text-sm text-[#A8A8B3] font-mono w-5 text-center">{rank}</span>;
}

function TopCard({ hooper, rank, lang }: { hooper: Hooper; rank: number; lang: "en" | "zh-CN" }) {
  const tier = getTier(hooper.overall);
  const name = getDisplayName(hooper);
  const borderColor = rank === 1 ? "#F2CA50" : rank === 2 ? "#C0C0C0" : "#CD7F32";
  const href = `/${lang}/hooper?slug=${hooper.slug}`;

  return (
    <Link
      href={href}
      className="group relative flex flex-col items-center rounded-2xl border p-5 transition-all hover:scale-[1.02] hover:shadow-lg"
      style={{
        borderColor: `${borderColor}40`,
        background: `linear-gradient(135deg, ${borderColor}08, ${borderColor}03)`,
      }}
    >
      {/* Rank badge */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
        style={{ background: borderColor, color: "#0B0B12" }}
      >
        {rank === 1 ? <Crown className="w-3 h-3" /> : rank === 2 ? <Medal className="w-3 h-3" /> : <Award className="w-3 h-3" />}
        {rank === 1 ? "#1" : rank === 2 ? "#2" : "#3"}
      </div>

      {/* OVR */}
      <div className="mt-3 text-4xl font-black tracking-tight" style={{ color: tier.color }}>
        {hooper.overall}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-[#A8A8B3] font-bold">{t("ovr", lang)}</div>

      {/* Name */}
      <h3 className="mt-3 font-[family-name:var(--font-anton)] text-lg uppercase tracking-wide text-white text-center truncate max-w-full">
        {name}
      </h3>

      {/* Tier + Archetype */}
      <div className="mt-1 flex items-center gap-2">
        <span
          className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          style={{ background: tier.bg, color: tier.color }}
        >
          {tier.label}
        </span>
      </div>
      <p className="mt-1 text-xs text-[#A8A8B3] text-center">{hooper.archetype}</p>
      <p className="text-[10px] text-[#A8A8B3]/60 uppercase tracking-wider">{hooper.position}</p>
    </Link>
  );
}

function TableRow({ hooper, rank, lang }: { hooper: Hooper; rank: number; lang: "en" | "zh-CN" }) {
  const tier = getTier(hooper.overall);
  const name = getDisplayName(hooper);
  const href = `/${lang}/hooper?slug=${hooper.slug}`;

  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-white/5 bg-[#111317]/50 px-4 py-3 transition-all hover:border-white/10 hover:bg-[#111317]"
    >
      <div className="flex items-center justify-center w-8">
        <RankIcon rank={rank} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate group-hover:text-[#F2CA50] transition-colors">
          {name}
        </p>
        <p className="text-xs text-[#A8A8B3]">
          {hooper.archetype} · {hooper.position}
        </p>
      </div>

      <span
        className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
        style={{ background: tier.bg, color: tier.color }}
      >
        {tier.label}
      </span>

      <div className="text-right">
        <span className="text-lg font-black" style={{ color: tier.color }}>
          {hooper.overall}
        </span>
      </div>
    </Link>
  );
}

const PAGE_SIZE = 20;

export function Leaderboard({ lang = "en" }: { lang?: "en" | "zh-CN" }) {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"all" | "classic" | "blind">("all");
  const [page, setPage] = useState(0);

  const fetchData = useCallback(async (modeFilter: string, currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(currentPage * PAGE_SIZE),
      });
      if (modeFilter !== "all") params.set("mode", modeFilter);

      const res = await fetch(`/api/hoopers?${params}`);
      if (!res.ok) throw new Error("Failed to load");
      const json = await res.json();
      setData(json);
    } catch {
      setError("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(mode, page);
  }, [mode, page, fetchData]);

  const handleModeChange = (newMode: "all" | "classic" | "blind") => {
    setMode(newMode);
    setPage(0);
  };

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;
  const startRank = page * PAGE_SIZE + 1;
  const endRank = data ? Math.min(startRank + data.hoopers.length - 1, data.total) : 0;

  const top3 = data?.hoopers.slice(0, 3) || [];
  const rest = data?.hoopers.slice(3) || [];

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-8">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-2">
              {t("title", lang)}
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide">
              {t("title", lang)}
            </h1>
            <p className="mt-3 text-sm text-[#A8A8B3] max-w-lg mx-auto">
              {t("subtitle", lang)}
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          {/* Mode filter */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {(["all", "classic", "blind"] as const).map((m) => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  mode === m
                    ? "bg-[#F2CA50] text-[#0B0B12]"
                    : "bg-white/5 text-[#A8A8B3] hover:bg-white/10 hover:text-white"
                }`}
              >
                {t(m === "all" ? "all" : m, lang)}
              </button>
            ))}
          </div>

          {loading && !data ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-2 border-[#F2CA50]/30 border-t-[#F2CA50] rounded-full animate-spin" />
              <p className="mt-4 text-sm text-[#A8A8B3]">{t("loading", lang)}</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          ) : !data || data.hoopers.length === 0 ? (
            <div className="text-center py-20">
              <Trophy className="w-12 h-12 text-[#A8A8B3]/30 mx-auto mb-4" />
              <p className="text-sm text-[#A8A8B3]">{t("empty", lang)}</p>
              <Link
                href={`/${lang}/build/mode`}
                className="inline-block mt-4 rounded-xl bg-[#F2CA50] px-6 py-2 text-sm font-bold text-[#0B0B12] hover:bg-[#F2CA50]/90"
              >
                {t("buildNow", lang)}
              </Link>
            </div>
          ) : (
            <>
              {/* Top 3 */}
              {top3.length > 0 && (
                <div className={`grid gap-4 mb-10 ${top3.length === 1 ? "grid-cols-1 max-w-xs mx-auto" : top3.length === 2 ? "grid-cols-2 max-w-md mx-auto" : "grid-cols-1 sm:grid-cols-3"}`}>
                  {/* On mobile, show #1 first; on desktop, show #2 #1 #3 */}
                  {top3.length === 3 ? (
                    <>
                      <div className="order-2 sm:order-1">
                        <TopCard hooper={top3[1]} rank={2} lang={lang} />
                      </div>
                      <div className="order-1 sm:order-2">
                        <TopCard hooper={top3[0]} rank={1} lang={lang} />
                      </div>
                      <div className="order-3">
                        <TopCard hooper={top3[2]} rank={3} lang={lang} />
                      </div>
                    </>
                  ) : (
                    top3.map((h, i) => <TopCard key={h.slug} hooper={h} rank={i + 1} lang={lang} />)
                  )}
                </div>
              )}

              {/* Table (4th+) */}
              {rest.length > 0 && (
                <div className="space-y-2">
                  {rest.map((h, i) => (
                    <TableRow key={h.slug} hooper={h} rank={i + 4 + page * PAGE_SIZE} lang={lang} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                  <p className="text-xs text-[#A8A8B3]">
                    {t("showing", lang)} {startRank} {t("to", lang)} {endRank} {t("of", lang)} {data.total} {t("results", lang)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-[#A8A8B3] bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      {t("prev", lang)}
                    </button>
                    <span className="text-xs text-[#A8A8B3]">
                      {t("page", lang)} {page + 1} {t("of", lang)} {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                      disabled={page >= totalPages - 1}
                      className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-[#A8A8B3] bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      {t("next", lang)}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </Container>
      </Section>
    </>
  );
}
