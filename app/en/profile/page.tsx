"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ChevronRight, Trophy, Target, Crown, Shield, Swords, Zap, Star, Dices } from "lucide-react";

type UserInfo = {
  id: string;
  email: string;
  name: string;
  image: string;
  createdAt: string;
  lastLoginAt: string;
};

type HooperEntry = {
  slug: string;
  position: string;
  mode: string;
  overall: number;
  archetype: string;
  first_name: string | null;
  last_name: string | null;
  season_wins: number;
  season_losses: number;
  ppg: number;
  rpg: number;
  apg: number;
  championship: number;
  created_at: string;
};

type ProfileData = {
  user: UserInfo;
  stats: {
    totalHoopers: number;
    bestOverall: number;
    championships: number;
    totalChallenges: number;
    modeDistribution: Record<string, number>;
  };
  hoopers: HooperEntry[];
};

const ARCHETYPE_ICONS: Record<string, typeof Trophy> = {
  "Two-Way Superstar": Shield,
  "Legendary Slasher": Swords,
  "Floor General": Zap,
  "Splash Legend": Star,
  "Rim Protector": Shield,
  "Versatile Wing": Swords,
};

const UI = {
  en: {
    title: "Profile",
    loading: "Loading profile...",
    signIn: "Please sign in to view your profile.",
    signInBtn: "Sign In with Google",
    stats: "Season Stats",
    totalBuilds: "Total Builds",
    bestOvr: "Best OVR",
    championships: "Championships",
    challenges: "Challenge Entries",
    modeDistribution: "Mode Distribution",
    classic: "Classic",
    blind: "Blind",
    chaos: "Chaos",
    recentRuns: "Recent Runs",
    freeNote: "Free profiles show the 50 most recent builds.",
    record: "Record",
    ovr: "OVR",
    viewBuild: "View Build",
    noBuilds: "No builds yet. Start building your first Hooper!",
    startBuilding: "Start Building",
  },
  "zh-CN": {
    title: "个人资料",
    loading: "加载中...",
    signIn: "请登录查看个人资料。",
    signInBtn: "使用 Google 登录",
    stats: "赛季统计",
    totalBuilds: "总构建数",
    bestOvr: "最高 OVR",
    championships: "冠军次数",
    challenges: "挑战参赛",
    modeDistribution: "模式分布",
    classic: "经典",
    blind: "盲选",
    chaos: "混乱",
    recentRuns: "最近记录",
    freeNote: "免费账户展示最近 50 条构建记录。",
    record: "战绩",
    ovr: "总评",
    viewBuild: "查看构建",
    noBuilds: "暂无构建记录。开始打造你的第一个 Hooper！",
    startBuilding: "开始构建",
  },
};

function t(key: keyof typeof UI.en, lang: "en" | "zh-CN"): string {
  return UI[lang][key];
}

export default function ProfilePage() {
  return <ProfilePageInner lang="en" />;
}

export function ProfilePageZh() {
  return <ProfilePageInner lang="zh-CN" />;
}

export function ProfilePageInner({ lang }: { lang: "en" | "zh-CN" }) {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/user/profile", { credentials: "include" })
      .then(async (res) => {
        if (res.status === 401) {
          setError("UNAUTH");
          return;
        }
        if (!res.ok) throw new Error("Failed to load profile");
        const json = await res.json();
        setData(json);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const buildHref = lang === "zh-CN" ? "/zh-CN/build/mode" : "/en/build/mode";
  const hooperHref = (slug: string) => lang === "zh-CN" ? `/zh-CN/hooper?slug=${slug}` : `/en/hooper?slug=${slug}`;

  return (
    <>
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-6">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 text-center">
            <h1 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide">
              {t("title", lang)}
            </h1>
          </div>
        </Container>
      </div>

      <Section className="relative">
        <Container>
          {loading && (
            <div className="max-w-4xl mx-auto text-center py-24">
              <div className="h-12 w-12 border-4 border-[#F2CA50]/20 border-t-[#F2CA50] rounded-full animate-spin mx-auto mb-6" />
              <p className="text-[#A8A8B3] text-lg">{t("loading", lang)}</p>
            </div>
          )}

          {!loading && error === "UNAUTH" && (
            <div className="max-w-4xl mx-auto text-center py-24">
              <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">
                {t("signIn", lang)}
              </h2>
              <a
                href="/auth/google/start"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 hover:from-amber-400 hover:via-orange-400 hover:to-orange-500 transition-all px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:shadow-md mt-4"
              >
                <GoogleIcon className="w-5 h-5" />
                <span>{t("signInBtn", lang)}</span>
              </a>
            </div>
          )}

          {!loading && data && (
            <div className="max-w-5xl mx-auto space-y-8">
              {/* Account Info */}
              <div className="glass-card rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-4">
                  {data.user.image ? (
                    <img src={data.user.image} alt="" className="w-16 h-16 rounded-full" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#F5C542] flex items-center justify-center">
                      <span className="text-2xl font-bold text-black">
                        {(data.user.name || "U").charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide">
                      {data.user.name || "Hooper"}
                    </h2>
                    <p className="text-[#A8A8B3] text-sm">{data.user.email}</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: data.stats.totalHoopers, label: t("totalBuilds", lang), icon: Target, color: "#F2CA50" },
                  { value: data.stats.bestOverall, label: t("bestOvr", lang), icon: Trophy, color: "#6CB9FF" },
                  { value: data.stats.championships, label: t("championships", lang), icon: Crown, color: "#F2CA50" },
                  { value: data.stats.totalChallenges, label: t("challenges", lang), icon: Star, color: "#FF5E07" },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card rounded-xl p-5 text-center">
                    <stat.icon className="h-5 w-5 mx-auto mb-2" style={{ color: stat.color }} />
                    <div className="font-[family-name:var(--font-anton)] text-3xl" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-widest text-[#A8A8B3] mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mode Distribution */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-4 border-b border-white/10 pb-2">
                  {t("modeDistribution", lang)}
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { mode: "classic", label: t("classic", lang), count: data.stats.modeDistribution.classic || 0 },
                    { mode: "blind", label: t("blind", lang), count: data.stats.modeDistribution.blind || 0 },
                    { mode: "chaos", label: t("chaos", lang), count: data.stats.modeDistribution.chaos || 0 },
                  ].map((m) => (
                    <div key={m.mode} className="bg-[#1a1c20] rounded-lg p-4 text-center border border-white/5">
                      <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#F2CA50]">
                        {m.count}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-[#A8A8B3] mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Runs */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                  <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide">
                    {t("recentRuns", lang)}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">
                    {t("freeNote", lang)}
                  </span>
                </div>

                {data.hoopers.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-[#A8A8B3] mb-4">{t("noBuilds", lang)}</p>
                    <Button asChild href={buildHref} variant="primary" size="lg">
                      <span className="flex items-center gap-2">
                        {t("startBuilding", lang)} <ChevronRight className="h-5 w-5" />
                      </span>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {data.hoopers.slice(0, 10).map((hooper) => {
                      const ArchIcon = ARCHETYPE_ICONS[hooper.archetype] || Dices;
                      const record = `${hooper.season_wins}-${hooper.season_losses}`;
                      const date = new Date(hooper.created_at + (hooper.created_at.endsWith("Z") ? "" : "Z")).toLocaleDateString(
                        lang === "zh-CN" ? "zh-CN" : "en-US",
                        { month: "numeric", day: "numeric", year: "numeric" }
                      );
                      return (
                        <Link
                          key={hooper.slug}
                          href={hooperHref(hooper.slug)}
                          className="flex items-center justify-between bg-[#1a1c20]/70 rounded-lg p-4 border border-white/5 hover:bg-white/5 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#F2CA50]/10 flex items-center justify-center">
                              <ArchIcon className="h-5 w-5 text-[#F2CA50]" />
                            </div>
                            <div>
                              <div className="text-white font-medium text-sm">
                                {hooper.first_name && hooper.last_name
                                  ? `${hooper.first_name} ${hooper.last_name}`
                                  : hooper.archetype}
                              </div>
                              <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">
                                {hooper.mode} · {hooper.position} · {date}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">{t("record", lang)}</div>
                              <div className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-white">{record}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">{t("ovr", lang)}</div>
                              <div className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-[#F2CA50]">{hooper.overall}</div>
                            </div>
                            {hooper.championship ? (
                              <Crown className="h-4 w-4 text-[#F2CA50]" />
                            ) : null}
                            <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50] transition-colors" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}
