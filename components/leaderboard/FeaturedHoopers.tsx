"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Hooper = {
  slug: string;
  overall: number;
  archetype: string;
  first_name: string | null;
  last_name: string | null;
  custom_image: string | null;
};

const CARTOON_AVATARS = [
  "/images/cartoon-avatars/avatar-01.jpg",
  "/images/cartoon-avatars/avatar-02.jpg",
  "/images/cartoon-avatars/avatar-03.jpg",
  "/images/cartoon-avatars/avatar-04.jpg",
  "/images/cartoon-avatars/avatar-05.jpg",
  "/images/cartoon-avatars/avatar-06.jpg",
  "/images/cartoon-avatars/avatar-07.jpg",
  "/images/cartoon-avatars/avatar-08.jpg",
  "/images/cartoon-avatars/avatar-09.jpg",
  "/images/cartoon-avatars/avatar-10.jpg",
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

function getAvatar(hooper: Hooper): string {
  return hooper.custom_image || CARTOON_AVATARS[hashSlug(hooper.slug) % CARTOON_AVATARS.length];
}

function getDisplayName(h: Hooper): string {
  if (h.first_name && h.last_name) return `${h.first_name} ${h.last_name}`;
  return h.slug.split("-")[0].toUpperCase() + " Builder";
}

function getTier(overall: number): { label: string; color: string } {
  if (overall >= 95) return { label: "Legendary", color: "#F2CA50" };
  if (overall >= 90) return { label: "Elite", color: "#6CB9FF" };
  if (overall >= 80) return { label: "Star", color: "#FF5E07" };
  return { label: "Rising", color: "#A8A8B3" };
}

export function FeaturedHoopers({ lang = "en" }: { lang?: "en" | "zh-CN" }) {
  const [hoopers, setHoopers] = useState<Hooper[]>([]);

  useEffect(() => {
    fetch("/api/hoopers?limit=20")
      .then((res) => res.json())
      .then((data) => setHoopers(data.hoopers || []))
      .catch(() => {});
  }, []);

  if (hoopers.length === 0) return null;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {hoopers.map((hooper) => {
          const tier = getTier(hooper.overall);
          const name = getDisplayName(hooper);
          return (
            <Link
              key={hooper.slug}
              href={`/${lang}/hooper?slug=${hooper.slug}`}
              className="glass-card rounded-xl p-5 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={getAvatar(hooper)}
                  alt={name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-white/10"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-[family-name:var(--font-anton)] text-lg text-white uppercase tracking-wide group-hover:text-[#F2CA50] transition-colors truncate">
                    {name}
                  </h3>
                  <p className="text-sm text-[#A8A8B3]">{hooper.archetype}</p>
                </div>
                <div
                  className="border rounded px-2 py-1 font-[family-name:var(--font-space-grotesk)] font-bold flex-shrink-0"
                  style={{
                    color: tier.color,
                    backgroundColor: `${tier.color}20`,
                    borderColor: `${tier.color}30`,
                  }}
                >
                  {hooper.overall}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span
                  className="bg-[#1a1c20] font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-wider px-2 py-1 rounded"
                  style={{ color: tier.color }}
                >
                  {tier.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-6 md:hidden">
        <Link
          href={`/${lang}/leaderboard`}
          className="inline-flex items-center justify-center w-full rounded-xl border border-[#F2CA50]/30 bg-[#F2CA50]/5 px-6 py-3 text-sm font-bold text-[#F2CA50] hover:bg-[#F2CA50]/10 transition-colors"
        >
          View Leaderboard
        </Link>
      </div>
    </>
  );
}
