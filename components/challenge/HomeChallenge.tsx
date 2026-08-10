"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Calendar, ChevronRight, Users, Clock, Trophy } from "lucide-react";

export function HomeChallenge({ lang = "en" }: { lang?: "en" | "zh-CN" }) {
  const [data, setData] = useState<{
    title: string;
    theme: string | null;
    seed: number;
    entries: number;
    timeRemaining: number | null;
  } | null>(null);

  useEffect(() => {
    fetch("/api/challenge/today")
      .then((r) => r.json())
      .then((json) => {
        if (json.challenge) {
          setData({
            title: json.challenge.title,
            theme: json.challenge.theme,
            seed: json.challenge.seed,
            entries: json.entries,
            timeRemaining: json.timeRemaining,
          });
        }
      })
      .catch(() => {});
  }, []);

  const label = lang === "zh-CN" ? "每日挑战" : "Daily Challenge";
  const title = lang === "zh-CN" ? "今日挑战" : "Today's Challenge";
  const tryLabel = lang === "zh-CN" ? "参加挑战" : "Start Challenge";
  const guidesLabel = lang === "zh-CN" ? "指南" : "Guides";
  const joinedLabel = lang === "zh-CN" ? "已参与" : "Players Joined";
  const seedLabel = lang === "zh-CN" ? "种子" : "Seed";
  const remainingLabel = lang === "zh-CN" ? "剩余" : "Remaining";

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="glass-card rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF5E07]/10 to-transparent pointer-events-none" />
      <div className="relative z-10 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="h-5 w-5 text-[#FF5E07]" />
          <span className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#FF5E07] font-bold">{label}</span>
        </div>
        <h2 className="font-[family-name:var(--font-anton)] text-2xl md:text-3xl text-white uppercase tracking-wide mb-2">
          {data?.title || title}
        </h2>
        {data ? (
          <>
            <p className="text-[#A8A8B3] mb-2">
              {seedLabel} <span className="font-mono text-white">#{data.seed}</span>
              {" · "}
              <span className="text-white font-bold">{data.entries}</span> {joinedLabel}
            </p>
            {data.timeRemaining !== null && data.timeRemaining > 0 && (
              <p className="text-[#A8A8B3] mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-mono text-[#F2CA50]">{formatTime(data.timeRemaining)}</span>
                <span>{remainingLabel}</span>
              </p>
            )}
            <p className="text-white font-medium">{data.theme || "Build, simulate 82 games, compete."}</p>
          </>
        ) : (
          <p className="text-[#A8A8B3] mb-4">
            {lang === "zh-CN" ? "每天一个全新挑战，与社区一较高下。" : "A fresh challenge every day. Compete with the community."}
          </p>
        )}
      </div>
      <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <Link
          href={`/${lang}/challenge`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF5E07] px-6 py-3 text-sm font-bold text-white hover:bg-[#FF5E07]/90 transition-all"
        >
          {tryLabel} <Calendar className="h-4 w-4" />
        </Link>
        <Link
          href={`/${lang}/guides`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/5 transition-all"
        >
          {guidesLabel}
        </Link>
      </div>
    </div>
  );
}
