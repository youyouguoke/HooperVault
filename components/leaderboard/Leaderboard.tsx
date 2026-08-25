"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  username: string;
  season_wins: number;
  season_losses: number;
  ppg: number;
  rpg: number;
  apg: number;
  championship: number;
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

const FIRST_NAMES = [
  "Orion", "Jax", "Kai", "Mason", "Eli", "Titan", "Duke", "Cade", "Axel", "Blaze",
  "Ryder", "Knox", "Zane", "Crew", "Jett", "Rhett", "Kash", "Slate", "Vance", "Dray",
  "Tate", "Miles", "Leo", "Finn", "Kobe", "Kyrie", "Giannis", "Luka", "Jalen", "Zion",
];
const LAST_NAMES = [
  "Steele", "Vale", "Cross", "Knight", "Storm", "Frost", "Holt", "Reign", "Brooks", "Prime",
  "Blaze", "King", "Ward", "Dane", "Cruz", "Hale", "Stone", "Fox", "Graves", "Mercer",
  "Wright", "Young", "Carter", "Davis", "Evans", "Green", "Hall", "Lewis", "Morgan", "Parker",
];

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) & 0xffffffff;
  }
  hash ^= hash >>> 16;
  hash = (hash * 0x85ebca6b) & 0xffffffff;
  hash ^= hash >>> 13;
  hash = (hash * 0xc2b2ae35) & 0xffffffff;
  hash ^= hash >>> 16;
  return Math.abs(hash);
}

const CARTOON_AVATARS = [
  "/images/cartoon-avatars/avatar-01.svg",
  "/images/cartoon-avatars/avatar-02.svg",
  "/images/cartoon-avatars/avatar-03.svg",
  "/images/cartoon-avatars/avatar-04.svg",
  "/images/cartoon-avatars/avatar-05.svg",
  "/images/cartoon-avatars/avatar-06.svg",
  "/images/cartoon-avatars/avatar-07.svg",
  "/images/cartoon-avatars/avatar-08.svg",
  "/images/cartoon-avatars/avatar-09.svg",
  "/images/cartoon-avatars/avatar-10.svg",
];

function getAvatar(slug: string): string {
  return CARTOON_AVATARS[hashSlug(slug) % CARTOON_AVATARS.length];
}

function getDisplayName(h: Hooper): string {
  if (h.first_name && h.last_name) return `${h.first_name} ${h.last_name}`;
  const hash = hashSlug(h.slug);
  const first = FIRST_NAMES[hash % FIRST_NAMES.length];
  const last = LAST_NAMES[(hash >> 8) % LAST_NAMES.length];
  return `${first} ${last}`;
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

function formatTimeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
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

function TopCard({ hooper, rank, lang }: { hooper: Hooper; rank: number; lang: "en" | "zh-CN" }) {
  const tier = getTier(hooper.overall);
  const name = getDisplayName(hooper);
  const borderColor = rank === 1 ? "#F2CA50" : rank === 2 ? "#C0C0C0" : "#CD7F32";
  const href = `/${lang}/hooper?slug=${hooper.slug}`;
  const rawUser = hooper.username;
  const isPlaceholder = !rawUser || rawUser === "游客" || rawUser === "Guest";
  const username = isPlaceholder
    ? (hooper.first_name ? `${hooper.first_name}${hooper.last_name ? " " + hooper.last_name : ""}` : (lang === "zh-CN" ? "游客" : "Guest"))
    : rawUser;
  const timeAgo = formatTimeAgo(hooper.created_at);
  const hasStats = hooper.season_wins > 0 || hooper.season_losses > 0;
  const record = `${hooper.season_wins}-${hooper.season_losses}`;

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

      {/* Avatar */}
      <img
        src={getAvatar(hooper.slug)}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border-2 mt-2"
        style={{ borderColor: `${borderColor}60` }}
      />

      {/* OVR */}
      <div className="mt-2 text-4xl font-black tracking-tight" style={{ color: tier.color }}>
        {hooper.overall}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-[#A8A8B3] font-bold">{t("ovr", lang)}</div>

      {/* Name */}
      <h3 className="mt-2 font-[family-name:var(--font-anton)] text-lg uppercase tracking-wide text-white text-center truncate max-w-full">
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

      {/* Game Stats */}
      {hasStats && (
        <div className="mt-2 w-full border-t border-white/5 pt-2">
          <div className="flex items-center justify-center gap-3 text-[10px]">
            <span className="text-[#F2CA50] font-bold">{record}</span>
            {hooper.championship === 1 && <span className="text-[#F2CA50]">🏆</span>}
          </div>
          <div className="flex items-center justify-center gap-2 text-[9px] text-[#A8A8B3]/80 mt-0.5">
            <span>{hooper.ppg.toFixed(1)} PPG</span>
            <span>·</span>
            <span>{hooper.rpg.toFixed(1)} RPG</span>
            <span>·</span>
            <span>{hooper.apg.toFixed(1)} APG</span>
          </div>
        </div>
      )}

      {/* Username + Time */}
      <div className="mt-2 flex items-center gap-2 text-[10px] text-[#A8A8B3]/80">
        <span>👤 {username}</span>
        <span>·</span>
        <span>{timeAgo}</span>
      </div>
    </Link>
  );
}

function TableRow({ hooper, rank, lang }: { hooper: Hooper; rank: number; lang: "en" | "zh-CN" }) {
  const tier = getTier(hooper.overall);
  const name = getDisplayName(hooper);
  const href = `/${lang}/hooper?slug=${hooper.slug}`;
  const rawUser = hooper.username;
  const isPlaceholder = !rawUser || rawUser === "游客" || rawUser === "Guest";
  const username = isPlaceholder
    ? (hooper.first_name ? `${hooper.first_name}${hooper.last_name ? " " + hooper.last_name : ""}` : (lang === "zh-CN" ? "游客" : "Guest"))
    : rawUser;
  const timeAgo = formatTimeAgo(hooper.created_at);
  const hasStats = hooper.season_wins > 0 || hooper.season_losses > 0;
  const record = `${hooper.season_wins}-${hooper.season_losses}`;
  const totalGames = hooper.season_wins + hooper.season_losses;
  const winPct = totalGames > 0 ? ((hooper.season_wins / totalGames) * 100).toFixed(0) : "—";

  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-white/5 bg-[#111317]/50 px-4 py-3 transition-all hover:border-white/10 hover:bg-[#111317]"
    >
      {/* Rank */}
      <div className="flex items-center justify-center w-8">
        <RankIcon rank={rank} />
      </div>

      {/* Avatar + Name + Archetype */}
      <div className="flex items-center gap-2.5 w-44 min-w-0">
        <img
          src={getAvatar(hooper.slug)}
          alt={name}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-white/10"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-white truncate group-hover:text-[#F2CA50] transition-colors">
              {name}
            </p>
            {hooper.championship === 1 && <span className="text-[10px]">🏆</span>}
          </div>
          <p className="text-[10px] text-[#A8A8B3] truncate">{hooper.archetype} · {hooper.position}</p>
        </div>
      </div>

      {/* Stats — middle column */}
      <div className="flex-1 grid grid-cols-5 items-center text-xs text-center">
        {hasStats ? (
          <>
            <span className="text-[#F2CA50] font-bold">{record}</span>
            <span className="text-[#A8A8B3]">{winPct}%</span>
            <span className="text-white">{hooper.ppg.toFixed(1)}</span>
            <span className="text-white">{hooper.rpg.toFixed(1)}</span>
            <span className="text-white">{hooper.apg.toFixed(1)}</span>
          </>
        ) : (
          <span className="col-span-5 text-[#A8A8B3]/40 text-[10px]">—</span>
        )}
      </div>

      {/* Username + Time */}
      <div className="hidden sm:flex flex-col items-end gap-0.5 w-20">
        <span className="text-[10px] text-[#A8A8B3]">👤 {username}</span>
        <span className="text-[10px] text-[#A8A8B3]/60">{timeAgo}</span>
      </div>

      {/* Tier + OVR */}
      <div className="flex items-center gap-2">
        <span
          className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          style={{ background: tier.bg, color: tier.color }}
        >
          {tier.label}
        </span>
        <span className="text-lg font-black w-8 text-right" style={{ color: tier.color }}>
          {hooper.overall}
        </span>
      </div>
    </Link>
  );
}

const PAGE_SIZE = 20;

export function Leaderboard({ lang = "en" }: { lang?: "en" | "zh-CN" }) {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get("mode") as "all" | "classic" | "blind") || "all";
  const initialPage = Math.max(0, parseInt(searchParams.get("page") || "0", 10));

  const [tableData, setTableData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"all" | "classic" | "blind">(initialMode);
  const [page, setPage] = useState(initialPage);

  // Fetch paginated data (all entries in one list, max100)
  const fetchData = useCallback(async (modeFilter: string, currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const offset = currentPage * PAGE_SIZE;
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(offset),
      });
      if (modeFilter !== "all") params.set("mode", modeFilter);

      const res = await fetch(`/api/hoopers?${params}`);
      if (!res.ok) throw new Error("Failed to load");
      const json = await res.json();
      setTableData({ ...json, total: Math.min(json.total, 100) });
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
    // Sync to URL for deep linking
    const params = new URLSearchParams(window.location.search);
    if (newMode === "all") {
      params.delete("mode");
    } else {
      params.set("mode", newMode);
    }
    params.delete("page");
    const newUrl = `${window.location.pathname}${params.toString() ? "?" + params : ""}`;
    window.history.replaceState(null, "", newUrl);
  };

  const totalRemaining = tableData ? tableData.total : 0;
  const totalPages = totalRemaining > 0 ? Math.ceil(totalRemaining / PAGE_SIZE) : 0;
  const startRank = 1 + page * PAGE_SIZE;
  const endRank = tableData ? Math.min(startRank + tableData.hoopers.length - 1, tableData.total) : 0;

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

          {loading && !tableData ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-2 border-[#F2CA50]/30 border-t-[#F2CA50] rounded-full animate-spin" />
              <p className="mt-4 text-sm text-[#A8A8B3]">{t("loading", lang)}</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          ) : !tableData || tableData.hoopers.length === 0 ? (
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
              {/* Table header */}
              <div className="flex items-center gap-3 px-4 py-2 text-[10px] uppercase tracking-wider text-[#A8A8B3]/60">
                <div className="w-8 text-center">#</div>
                <div className="w-44">Player</div>
                <div className="flex-1 grid grid-cols-5 text-center">
                  <span>Record</span>
                  <span>Win%</span>
                  <span>PPG</span>
                  <span>RPG</span>
                  <span>APG</span>
                </div>
                <div className="hidden sm:block w-20 text-right">User</div>
                <div className="flex items-center gap-2"><span className="w-12">Tier</span><span className="w-8 text-right">OVR</span></div>
              </div>

              {/* Unified list */}
              <div className="space-y-2">
                {tableData.hoopers.map((h, i) => (
                  <TableRow key={h.slug} hooper={h} rank={startRank + i} lang={lang} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                  <p className="text-xs text-[#A8A8B3]">
                    {t("showing", lang)} {startRank} {t("to", lang)} {endRank} {t("of", lang)} {tableData?.total} {t("results", lang)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newPage = Math.max(0, page - 1);
                        setPage(newPage);
                        const params = new URLSearchParams(window.location.search);
                        if (newPage === 0) { params.delete("page"); } else { params.set("page", String(newPage)); }
                        window.history.replaceState(null, "", `${window.location.pathname}${params.toString() ? "?" + params : ""}`);
                      }}
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
                      onClick={() => {
                        const newPage = Math.min(totalPages - 1, page + 1);
                        setPage(newPage);
                        const params = new URLSearchParams(window.location.search);
                        params.set("page", String(newPage));
                        window.history.replaceState(null, "", `${window.location.pathname}?${params}`);
                      }}
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
