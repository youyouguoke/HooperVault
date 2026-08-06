"use client";

import { useEffect, useState } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Trophy, Medal, Award } from "lucide-react";

export default function LeaderboardPage() {
  const [hoopers, setHoopers] = useState<HooperEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/hoopers")
      .then((res) => res.json())
      .then((data) => {
        const sorted = (data.hoopers || []).sort((a: HooperEntry, b: HooperEntry) => b.overall - a.overall);
        setHoopers(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Section className="relative border-b border-white/8 bg-[#111317] pt-16 pb-8">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">顶级构建</p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase tracking-wide mb-6">排行榜</h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed">社区创造的最高评分 Hooper。用聪明的选秀和强力模拟来冲击榜单。</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center py-12 text-[#A8A8B3]">正在加载排行榜...</div>
            ) : hoopers.length === 0 ? (
              <div className="text-center py-12 text-[#A8A8B3]">暂无构建。成为第一个上榜的人吧。</div>
            ) : (
              <div className="space-y-4">
                {hoopers.map((hooper, index) => (
                  <LeaderboardRow key={hooper.slug} hooper={hooper} rank={index + 1} />
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}

type HooperEntry = {
  slug: string;
  position: string;
  mode: string;
  overall: number;
  archetype: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
};

function LeaderboardRow({ hooper, rank }: { hooper: HooperEntry; rank: number }) {
  const name = hooper.first_name && hooper.last_name
    ? `${hooper.first_name} ${hooper.last_name}`
    : hooper.slug;

  const rankIcon = rank === 1 ? <Trophy className="h-5 w-5 text-[#F2CA50]" /> :
    rank === 2 ? <Medal className="h-5 w-5 text-[#A8A8B3]" /> :
    rank === 3 ? <Award className="h-5 w-5 text-[#FF5E07]" /> :
    <span className="font-[family-name:var(--font-anton)] text-lg text-white/50 w-5 text-center">{rank}</span>;

  return (
    <a
      href={`/zh-CN/hooper?slug=${hooper.slug}`}
      className="glass-card rounded-xl p-5 flex items-center gap-5 hover:bg-white/5 transition-colors group"
    >
      <div className="flex items-center justify-center w-8">{rankIcon}</div>
      <div className="flex-1 min-w-0">
        <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide truncate group-hover:text-[#F2CA50] transition-colors">{name}</h3>
        <p className="text-[#A8A8B3] text-sm">{hooper.archetype} • {hooper.position} • {hooper.mode}</p>
      </div>
      <div className="text-right">
        <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#F2CA50]">{hooper.overall}</div>
        <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">总评</div>
      </div>
    </a>
  );
}
