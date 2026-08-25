"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ATTRIBUTES,
  type Attribute,
  POSITION_MODIFIERS,
  getSkillById,
  type Skill,
} from "@/data/legends";
import {
  Trophy,
  Share2,
  RefreshCw,
  Swords,
  Zap,
  Shield,
  Star,
  Dices,
  Flame,
  Medal,
  Crown,
} from "lucide-react";
import { ShareModal } from "@/components/ui/ShareModal";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

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

const PLAYOFF_ROUND_EMOJI: Record<string, string> = {
  "First Round": "🏀",
  "Conference Semifinals": "🔥",
  "Conference Finals": "⚡",
  "NBA Finals": "🏆",
};

const ARCHETYPES = [
  {
    name: "Two-Way Superstar",
    icon: Shield,
    desc: "Elite on both ends of the floor.",
    conditions: (attrs: Record<Attribute, number>) =>
      (attrs.perimeter_defense >= 80 || attrs.interior_defense >= 80 || attrs.block >= 80) &&
      (attrs.shooting >= 80 || attrs.finishing >= 80 || attrs.mid_range >= 80),
  },
  {
    name: "Legendary Slasher",
    icon: Swords,
    desc: "Unstoppable at the rim.",
    conditions: (attrs: Record<Attribute, number>) =>
      attrs.finishing >= 85 && attrs.dunk >= 80 && attrs.speed >= 75,
  },
  {
    name: "Floor General",
    icon: Zap,
    desc: "Controls the tempo.",
    conditions: (attrs: Record<Attribute, number>) =>
      attrs.passing >= 85 && attrs.ball_handle >= 80 && attrs.speed >= 75,
  },
  {
    name: "Splash Legend",
    icon: Star,
    desc: "Elite perimeter threat.",
    conditions: (attrs: Record<Attribute, number>) =>
      attrs.shooting >= 85 && attrs.mid_range >= 75,
  },
  {
    name: "Rim Protector",
    icon: Shield,
    desc: "Anchor of the defense.",
    conditions: (attrs: Record<Attribute, number>) =>
      attrs.block >= 85 && (attrs.interior_defense >= 80 || attrs.rebound >= 80),
  },
  {
    name: "Versatile Wing",
    icon: Swords,
    desc: "No weaknesses, all-around threat.",
    conditions: (attrs: Record<Attribute, number>) => {
      const vals = Object.values(attrs);
      return vals.every((v) => v >= 70) && vals.reduce((a, b) => a + b, 0) / vals.length >= 78;
    },
  },
];

// 10 cartoon basketball avatars — picked by slug hash for consistency
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

function hashSlug(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash + s.charCodeAt(i)) & 0xffffffff;
  }
  hash ^= hash >>> 16;
  hash = (hash * 0x85ebca6b) & 0xffffffff;
  hash ^= hash >>> 13;
  hash = (hash * 0xc2b2ae35) & 0xffffffff;
  hash ^= hash >>> 16;
  return Math.abs(hash);
}

const FIRST_NAMES = [
  "Orion", "Jax", "Kai", "Mason", "Eli", "Titan", "Duke", "Cade", "Axel", "Blaze",
  "Ryder", "Knox", "Zane", "Crew", "Jett", "Rhett", "Kash", "Slate", "Vance", "Dray",
  "Tate", "Miles", "Leo", "Finn", "Kobe", "Kyrie", "Giannis", "Luka", "Jalen", "Zion",
  "Asher", "Beck", "Dash", "Enzo", "Felix", "Grey", "Huck", "Ira", "Jude", "Koa",
  "Lennox", "Milo", "Nico", "Otto", "Pax", "Quinn", "Remy", "Sage", "Tobe", "Wolf",
];
const LAST_NAMES = [
  "Steele", "Vale", "Cross", "Knight", "Storm", "Frost", "Holt", "Reign", "Brooks", "Prime",
  "Blaze", "King", "Ward", "Dane", "Cruz", "Hale", "Stone", "Fox", "Graves", "Mercer",
  "Wright", "Young", "Carter", "Davis", "Evans", "Green", "Hall", "Lewis", "Morgan", "Parker",
  "Adams", "Baker", "Cooper", "Fisher", "Gray", "Hayes", "Ingram", "Jennings", "Kemp", "Lane",
  "Mason", "Newton", "Owens", "Perry", "Reed", "Sloan", "Tate", "Underwood", "Vaughn", "Wells",
];

function deterministicIndex(seed: number, position: string, length: number, salt = ""): number {
  const combined = `${salt}${seed}:${position.toUpperCase()}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) - hash + combined.charCodeAt(i)) & 0xffffffff;
  }
  hash ^= hash >>> 16;
  hash = (hash * 0x85ebca6b) & 0xffffffff;
  hash ^= hash >>> 13;
  hash = (hash * 0xc2b2ae35) & 0xffffffff;
  hash ^= hash >>> 16;
  return hash % length;
}

function generatePlayerName(seed: number, position: string): string {
  const posKey = (position || "SG").toUpperCase();
  const first = FIRST_NAMES[deterministicIndex(seed, posKey, FIRST_NAMES.length, "first")];
  const last = LAST_NAMES[deterministicIndex(seed, posKey, LAST_NAMES.length, "last")];
  return `${first} ${last}`;
}

type HooperApiData = {
  slug: string;
  position: string;
  mode: string;
  seed: number;
  history: string;
  overall: number;
  archetype: string;
  first_name: string | null;
  last_name: string | null;
  custom_image: string | null;
  created_at: string;
};

type SimResult = {
  customName: string;
  customImage: string | null;
  overall: number;
  position: string;
  mode: string;
  seed: number;
  history: string;
  archetype: string;
  attributes: Record<string, number>;
  season: { wins: number; losses: number; ppg: number; rpg: number; apg: number };
  playoffs: {
    qualified: boolean;
    seed: number;
    champion: boolean;
    series: { round: string; opponent: string; wins: number; losses: number; result: string }[];
  };
  awards: string[];
  timestamp: number;
};

function parseHistory(history: string): (Skill & { legendName: string; legendCategory: string })[] {
  return history
    .split(",")
    .map((id) => getSkillById(id))
    .filter(Boolean) as (Skill & { legendName: string; legendCategory: string })[];
}

const UI = {
  legendSecured: { en: "Legend Secured", "zh-CN": "传奇已锁定" },
  yourHooperLegacy: { en: "Your Hooper Legacy", "zh-CN": "你的 Hooper 传奇" },
  loading: { en: "Loading Hooper legacy...", "zh-CN": "正在加载 Hooper 传奇..." },
  notFound: { en: "Hooper Not Found", "zh-CN": "未找到 Hooper" },
  notFoundDesc: { en: "We couldn't find a build with that slug in the vault.", "zh-CN": "在 Vault 中找不到该编号的构建。" },
  buildAnother: { en: "Build Another", "zh-CN": "重新构建" },
  errorLoading: { en: "Error Loading Legacy", "zh-CN": "加载传奇时出错" },
  tryAgain: { en: "Try Again", "zh-CN": "重试" },
  ovr: { en: "OVR", "zh-CN": "总评" },
  archetype: { en: "Archetype", "zh-CN": "球风" },
  fin: { en: "FIN", "zh-CN": "终结" },
  sht: { en: "SHT", "zh-CN": "投射" },
  ply: { en: "PLY", "zh-CN": "组织" },
  def: { en: "DEF", "zh-CN": "防守" },
  legacyStory: { en: "Legacy Story", "zh-CN": "传奇故事" },
  hofBadges: { en: "Hall of Fame Badges", "zh-CN": "名人堂徽章" },
  attributeRadar: { en: "Attribute Radar", "zh-CN": "属性雷达" },
  noBadges: { en: "No badges earned. Build again for greatness.", "zh-CN": "尚未获得徽章。再次构建，追求卓越。" },
  shareLegacy: { en: "Share Legacy", "zh-CN": "分享传奇" },
  emergedAs: { en: "emerged as a", "zh-CN": "成长为一名" },
  blending: { en: "blending the", "zh-CN": "融合了" },
  ofGreatest: { en: "of the greatest to ever play. With a", "zh-CN": "等伟大球员的特质。总评" },
  statusMark: { en: "OVR rating and", "zh-CN": "分，" },
  permanentMark: { en: "status, this build leaves a permanent mark on the HooperVault archives.", "zh-CN": "级别，这一构建将在 HooperVault 档案中留下永久印记。" },
} as const;

function t(key: keyof typeof UI, lang: "en" | "zh-CN"): string {
  return UI[key][lang];
}

export function HooperResult({ slug, lang = "en" }: { slug: string; lang?: "en" | "zh-CN" }) {
  const [data, setData] = useState<HooperApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [simResult, setSimResult] = useState<SimResult | null>(null);

  // Try to load sim result from localStorage ONLY for own builds (no slug or "sample")
  useEffect(() => {
    const isOwnBuild = !slug || slug === "sample";
    if (isOwnBuild) {
      try {
        const stored = localStorage.getItem("hoopervault_sim_result");
        if (stored) {
          const parsed = JSON.parse(stored) as SimResult;
          if (parsed.timestamp && Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
            setSimResult(parsed);
            setLoading(false);
            return;
          }
        }
      } catch {}
    }
    // For specific slugs (from leaderboard/challenge), always fetch from API
    if (!slug || slug === "sample") {
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetch(`/api/hoopers/${encodeURIComponent(slug)}`)
      .then(async (res) => {
        if (res.status === 404) throw new Error("NOT_FOUND");
        if (!res.ok) throw new Error("Failed to load Hooper data");
        const json = await res.json();
        if (!cancelled) setData(json);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load Hooper data");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [slug]);

  const hasSim = simResult !== null;

  const position = (simResult?.position || data?.position || "SG") as keyof typeof POSITION_MODIFIERS;
  const mode = simResult?.mode || data?.mode || "classic";
  const seed = simResult?.seed ?? data?.seed ?? 1;
  const historyStr = simResult?.history || data?.history || "";
  const skills = useMemo(() => parseHistory(historyStr), [historyStr]);

  const attributes: Record<Attribute, number> = useMemo(() => {
    if (hasSim && simResult.attributes) {
      return simResult.attributes as Record<Attribute, number>;
    }
    // Use same seed-varied base as preview page for consistency
    const attrs: Record<Attribute, number> = {
      shooting: 75, mid_range: 75, finishing: 75, dunk: 75, passing: 75,
      ball_handle: 75, perimeter_defense: 75, interior_defense: 75, block: 75,
      rebound: 75, speed: 75, strength: 75, clutch: 75,
    };
    (Object.keys(attrs) as Attribute[]).forEach((attr) => {
      const offset = deterministicIndex(seed, attr, 20, "base");
      attrs[attr] = 65 + offset;
    });
    const modifiers = POSITION_MODIFIERS[position] || {};
    Object.entries(modifiers).forEach(([key, value]) => {
      attrs[key as Attribute] += value;
    });
    skills.forEach((skill) => {
      attrs[skill.attribute as Attribute] = Math.min(99, attrs[skill.attribute as Attribute] + skill.bonus);
    });
    return attrs;
  }, [hasSim, simResult, position, skills, seed]);

  const computedOverall = useMemo(() => {
    return Math.round(Object.values(attributes).reduce((a, b) => a + b, 0) / 13);
  }, [attributes]);
  const overall = simResult?.overall ?? computedOverall;

  const computedArchetypeName = useMemo(() => {
    return ARCHETYPES.find((a) => a.conditions(attributes))?.name || "Rising Prospect";
  }, [attributes]);
  const archetypeName = simResult?.archetype || computedArchetypeName;

  const archetype = ARCHETYPES.find(a => a.name === archetypeName) || { name: archetypeName, icon: Dices, desc: "A solid foundation with room to grow." };

  // Fallback: read name/image from localStorage ONLY for own builds (no slug or "sample")
  const [fallbackName, setFallbackName] = useState<string | null>(null);
  const [fallbackImage, setFallbackImage] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only use localStorage fallback when viewing current build (no real slug)
    if (slug && slug !== "sample") return;
    try {
      const n = localStorage.getItem("hoopervault_hooper_name");
      if (n && !simResult?.customName) setFallbackName(n);
      const img = localStorage.getItem("hoopervault_hooper_image");
      if (img && !simResult?.customImage) setFallbackImage(img);
    } catch {}
  }, [simResult, slug]);

  const playerName = simResult?.customName || fallbackName || (data?.first_name && data?.last_name ? `${data.first_name} ${data.last_name}` : generatePlayerName(seed, position));

  // Dynamically update OG meta tags when simulation data is available
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!playerName || !overall) return;

    const ogTitle = `${playerName} - ${overall} OVR ${archetypeName} | HooperVault`;
    const ogDesc = lang === "zh-CN"
      ? `${playerName}，${overall} OVR ${archetypeName}。${hasSim && simResult.season ? `场均${simResult.season.ppg}分。` : ""}来 HooperVault 打造你的传奇球员。`
      : `${playerName}, ${overall} OVR ${archetypeName}. ${hasSim && simResult.season ? `${simResult.season.ppg} PPG. ` : ""}Build your own legendary Hooper at HooperVault.`;

    // Update og:title
    let ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (!ogTitleEl) {
      ogTitleEl = document.createElement("meta");
      ogTitleEl.setAttribute("property", "og:title");
      document.head.appendChild(ogTitleEl);
    }
    ogTitleEl.setAttribute("content", ogTitle);

    // Update og:description
    let ogDescEl = document.querySelector('meta[property="og:description"]');
    if (!ogDescEl) {
      ogDescEl = document.createElement("meta");
      ogDescEl.setAttribute("property", "og:description");
      document.head.appendChild(ogDescEl);
    }
    ogDescEl.setAttribute("content", ogDesc);

    // Update og:image to dynamic OG endpoint
    const ogImageUrl = `/api/og/${slug || "sample"}`;
    let ogImageEl = document.querySelector('meta[property="og:image"]');
    if (!ogImageEl) {
      ogImageEl = document.createElement("meta");
      ogImageEl.setAttribute("property", "og:image");
      document.head.appendChild(ogImageEl);
    }
    ogImageEl.setAttribute("content", ogImageUrl);

    // Update twitter:title
    let twTitleEl = document.querySelector('meta[name="twitter:title"]');
    if (!twTitleEl) {
      twTitleEl = document.createElement("meta");
      twTitleEl.setAttribute("name", "twitter:title");
      document.head.appendChild(twTitleEl);
    }
    twTitleEl.setAttribute("content", ogTitle);

    // Update twitter:description
    let twDescEl = document.querySelector('meta[name="twitter:description"]');
    if (!twDescEl) {
      twDescEl = document.createElement("meta");
      twDescEl.setAttribute("name", "twitter:description");
      document.head.appendChild(twDescEl);
    }
    twDescEl.setAttribute("content", ogDesc);

    // Update twitter:image
    let twImageEl = document.querySelector('meta[name="twitter:image"]');
    if (!twImageEl) {
      twImageEl = document.createElement("meta");
      twImageEl.setAttribute("name", "twitter:image");
      document.head.appendChild(twImageEl);
    }
    twImageEl.setAttribute("content", ogImageUrl);

    // Update page title
    document.title = ogTitle;

    // Inject JSON-LD structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${playerName} - ${overall} OVR ${archetypeName}`,
      description: ogDesc,
      url: `https://hoopervault.com/${lang}/hooper?slug=${slug || "sample"}`,
      datePublished: simResult?.timestamp ? new Date(simResult.timestamp).toISOString() : undefined,
      mainEntity: {
        "@type": "Person",
        name: playerName,
        description: `${overall} OVR ${archetypeName} built on HooperVault`,
        jobTitle: `${position} - ${archetypeName}`,
        award: simResult?.awards?.length ? simResult.awards.join(", ") : undefined,
        additionalProperty: [
          ...(simResult?.season ? [
            { "@type": "PropertyValue", name: "PPG", value: simResult.season.ppg },
            { "@type": "PropertyValue", name: "RPG", value: simResult.season.rpg },
            { "@type": "PropertyValue", name: "APG", value: simResult.season.apg },
            { "@type": "PropertyValue", name: "Wins", value: simResult.season.wins },
            { "@type": "PropertyValue", name: "Losses", value: simResult.season.losses },
          ] : []),
          { "@type": "PropertyValue", name: "Overall", value: overall },
          { "@type": "PropertyValue", name: "Position", value: position },
          { "@type": "PropertyValue", name: "Mode", value: mode },
          ...(simResult?.playoffs?.champion ? [
            { "@type": "PropertyValue", name: "Champion", value: true },
          ] : []),
        ],
      },
      publisher: {
        "@type": "Organization",
        name: "HooperVault",
        url: "https://hoopervault.com",
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://hoopervault.com/${lang}` },
          { "@type": "ListItem", position: 2, name: "Build", item: `https://hoopervault.com/${lang}/build/mode` },
          { "@type": "ListItem", position: 3, name: playerName },
        ],
      },
    };

    // Remove existing JSON-LD if present
    document.querySelectorAll('script[data-hooper-jsonld]').forEach(el => el.remove());

    const scriptEl = document.createElement("script");
    scriptEl.type = "application/ld+json";
    scriptEl.setAttribute("data-hooper-jsonld", "true");
    scriptEl.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(scriptEl);
  }, [playerName, overall, archetypeName, hasSim, simResult, lang, slug, position, mode]);

  const radarData = useMemo(() => {
    return ATTRIBUTES.map((attr) => ({
      attribute: ATTRIBUTE_LABELS[attr],
      fullMark: 100,
      value: attributes[attr],
    }));
  }, [attributes]);

  const badges = useMemo(() => {
    const list = [];
    if (overall >= 95) list.push("Hall of Fame");
    if (overall >= 90) list.push("Legendary Tier");
    if (attributes.clutch >= 90) list.push("Clutch King");
    if (attributes.dunk >= 90) list.push("Posterizer");
    if (attributes.shooting >= 90) list.push("Range Chef");
    if (attributes.passing >= 85) list.push("Court Vision");
    if (attributes.block >= 90) list.push("Rim Protector");
    if (attributes.perimeter_defense >= 85) list.push("Clamps");
    return list;
  }, [attributes, overall]);

  const tier = overall >= 95 ? "Legendary" : overall >= 90 ? "Elite" : overall >= 80 ? "Star" : "Rising";
  const tierColor = overall >= 95 ? "#F2CA50" : overall >= 90 ? "#6CB9FF" : overall >= 80 ? "#FF5E07" : "#A8A8B3";

  const buildModeHref = lang === "zh-CN" ? "/zh-CN/build/mode" : "/en/build/mode";
  const buildGuidesHref = lang === "zh-CN" ? "/zh-CN/builds" : "/en/builds";
  const archetypesHref = lang === "zh-CN" ? "/zh-CN/archetypes" : "/en/archetypes";
  const legendSkillsHref = lang === "zh-CN" ? "/zh-CN/legends" : "/en/legends";

  return (
    <>
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-6">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-2">
              {t("legendSecured", lang)}
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide">
              {t("yourHooperLegacy", lang)}
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

          {!loading && error === "NOT_FOUND" && !hasSim && (
            <div className="max-w-4xl mx-auto text-center py-24">
              <h2 className="font-[family-name:var(--font-anton)] text-3xl text-white uppercase tracking-wide mb-4">
                {t("notFound", lang)}
              </h2>
              <p className="text-[#A8A8B3] text-lg mb-8">
                {t("notFoundDesc", lang)}
              </p>
              <Button asChild href={buildModeHref} variant="secondary" size="xl">
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="h-5 w-5" /> {t("buildAnother", lang)}
                </span>
              </Button>
            </div>
          )}

          {!loading && !hasSim && !data && !error && (
            <div className="max-w-4xl mx-auto text-center py-24">
              <h2 className="font-[family-name:var(--font-anton)] text-3xl text-white uppercase tracking-wide mb-4">
                {t("notFound", lang)}
              </h2>
              <p className="text-[#A8A8B3] text-lg mb-8">
                {t("notFoundDesc", lang)}
              </p>
              <Button asChild href={buildModeHref} variant="secondary" size="xl">
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="h-5 w-5" /> {t("buildAnother", lang)}
                </span>
              </Button>
            </div>
          )}

          {!loading && error && error !== "NOT_FOUND" && !hasSim && (
            <div className="max-w-4xl mx-auto text-center py-24">
              <h2 className="font-[family-name:var(--font-anton)] text-3xl text-white uppercase tracking-wide mb-4">
                {t("errorLoading", lang)}
              </h2>
              <p className="text-[#A8A8B3] text-lg mb-8">{error}</p>
              <Button
                variant="secondary"
                size="xl"
                onClick={() => window.location.reload()}
              >
                {t("tryAgain", lang)}
              </Button>
            </div>
          )}

          {!loading && (hasSim || (!error && data)) && (
            <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-12">
              {/* LEFT: Player Card */}
              <div className="lg:col-span-5">
                <div ref={cardRef} className="legendary-card rounded-2xl overflow-hidden relative">
                  <div className="h-[420px] relative bg-gradient-to-br from-[#333539] via-[#1a1c20] to-[#111317] flex items-center justify-center overflow-hidden">
                    {(simResult?.customImage || fallbackImage || data?.custom_image) ? (
                      <img
                        src={simResult?.customImage || fallbackImage || data?.custom_image || ""}
                        alt={playerName}
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-90"
                      />
                    ) : (
                      <img
                        src={CARTOON_AVATARS[hashSlug(slug || "default") % CARTOON_AVATARS.length]}
                        alt={`${playerName} - ${archetypeName}`}
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-90"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-transparent" />
                    <div
                      className="absolute left-0 top-0 bottom-0 w-2 z-20"
                      style={{ backgroundColor: tierColor, boxShadow: `0 0 15px ${tierColor}` }}
                    />
                    <div className="absolute top-4 right-4 z-20">
                      <span
                        className="px-3 py-1 rounded-full font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-wider border"
                        style={{ color: tierColor, borderColor: `${tierColor}50`, backgroundColor: `${tierColor}15` }}
                      >
                        <Trophy className="h-3 w-3 inline mr-1" /> {tier}
                      </span>
                    </div>
                    {hasSim && simResult.playoffs?.champion && (
                      <div className="absolute top-4 left-4 z-20">
                        <span className="px-3 py-1 rounded-full font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-wider border text-[#F2CA50] border-[#F2CA50]/50 bg-[#F2CA50]/15">
                          <Crown className="h-3 w-3 inline mr-1" /> Champion
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 relative z-10 bg-[#111317]/80">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <h2 className="font-[family-name:var(--font-anton)] text-4xl text-white uppercase tracking-wide leading-none">
                          {playerName}
                        </h2>
                        <p className="font-[family-name:var(--font-space-grotesk)] text-sm uppercase tracking-wider text-[#F2CA50] mt-2">
                          {archetype.name}
                        </p>
                      </div>
                      <div className="bg-[#1a1c20] border border-[#F2CA50]/30 rounded-lg px-3 py-2 text-center">
                        <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">{t("ovr", lang)}</div>
                        <div className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#F2CA50]">{overall}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="bg-[#1a1c20] rounded p-2 text-center border border-white/5">
                        <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">{t("fin", lang)}</div>
                        <div className="font-[family-name:var(--font-space-grotesk)] font-bold text-white">{attributes.finishing}</div>
                      </div>
                      <div className="bg-[#1a1c20] rounded p-2 text-center border border-white/5">
                        <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">{t("sht", lang)}</div>
                        <div className="font-[family-name:var(--font-space-grotesk)] font-bold text-white">{attributes.shooting}</div>
                      </div>
                      <div className="bg-[#1a1c20] rounded p-2 text-center border border-white/5">
                        <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">{t("ply", lang)}</div>
                        <div className="font-[family-name:var(--font-space-grotesk)] font-bold text-white">{attributes.passing}</div>
                      </div>
                      <div className="bg-[#1a1c20] rounded p-2 text-center border border-white/5">
                        <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">{t("def", lang)}</div>
                        <div className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#6CB9FF]">{attributes.perimeter_defense}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Details */}
              <div className="lg:col-span-7 space-y-6">
                {/* Simulation Stats */}
                {hasSim && simResult.season && (
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-4 border-b border-white/10 pb-2">
                      Season Stats
                    </h3>
                    <div className="grid grid-cols-5 gap-3 mb-4">
                      <div className="bg-[#1a1c20] rounded-lg p-3 text-center border border-white/5">
                        <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">Record</div>
                        <div className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
                          <span className="text-[#F2CA50]">{simResult.season.wins}</span>
                          <span className="text-[#A8A8B3] mx-0.5">-</span>
                          <span className="text-[#FF5E07]">{simResult.season.losses}</span>
                        </div>
                      </div>
                      <div className="bg-[#1a1c20] rounded-lg p-3 text-center border border-white/5">
                        <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">PPG</div>
                        <div className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">{simResult.season.ppg}</div>
                      </div>
                      <div className="bg-[#1a1c20] rounded-lg p-3 text-center border border-white/5">
                        <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">RPG</div>
                        <div className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">{simResult.season.rpg}</div>
                      </div>
                      <div className="bg-[#1a1c20] rounded-lg p-3 text-center border border-white/5">
                        <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">APG</div>
                        <div className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">{simResult.season.apg}</div>
                      </div>
                      <div className="bg-[#1a1c20] rounded-lg p-3 text-center border border-white/5">
                        <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">Seed</div>
                        <div className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#F2CA50]">
                          {simResult.playoffs?.qualified ? `#${simResult.playoffs.seed}` : "—"}
                        </div>
                      </div>
                    </div>

                    {/* Playoff Journey */}
                    {simResult.playoffs?.series && simResult.playoffs.series.length > 0 && (
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-bold mb-2">Playoff Journey</div>
                        <div className="space-y-1.5">
                          {simResult.playoffs.series.map((s, i) => (
                            <div key={i} className="flex items-center justify-between bg-[#1a1c20]/50 rounded-lg p-2.5 border border-white/5">
                              <div className="flex items-center gap-2.5">
                                <span className="text-sm">{PLAYOFF_ROUND_EMOJI[s.round] || "🏀"}</span>
                                <div>
                                  <div className="text-white text-xs font-medium">{s.round}</div>
                                  <div className="text-[10px] text-[#A8A8B3]">vs {s.opponent}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold ${s.result === "W" ? "text-[#F2CA50]" : "text-[#FF5E07]"}`}>
                                  {s.wins}-{s.losses}
                                </span>
                                <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
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
                    {simResult.awards && simResult.awards.length > 0 && (
                      <div className="mt-4">
                        <div className="text-[10px] uppercase tracking-widest text-[#F2CA50] font-bold mb-2">Awards</div>
                        <div className="flex flex-wrap gap-2">
                          {simResult.awards.map((award) => (
                            <span
                              key={award}
                              className="inline-flex items-center gap-1.5 bg-[#F2CA50]/10 border border-[#F2CA50]/30 text-[#F2CA50] px-3 py-1.5 rounded-full font-[family-name:var(--font-space-grotesk)] text-xs font-bold uppercase tracking-wider"
                            >
                              <Medal className="h-3 w-3" /> {award}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Legacy Story */}
                <div className="glass-card rounded-2xl p-6 md:p-8">
                  <h3 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4 border-b border-white/10 pb-2">
                    {t("legacyStory", lang)}
                  </h3>
                  <p className="text-[#A8A8B3] text-lg leading-relaxed">
                    {lang === "zh-CN"
                      ? `${playerName} ${t("emergedAs", lang)} ${archetype.name.toLowerCase()}，${t("blending", lang)} ${Object.entries(attributes)
                          .sort((a, b) => b[1] - a[1])
                          .slice(0, 2)
                          .map(([k]) => ATTRIBUTE_LABELS[k as Attribute])
                          .join(" 与 ")}${t("ofGreatest", lang)} ${overall} ${t("statusMark", lang)}${tier} ${t("permanentMark", lang)}`
                      : `${playerName} ${t("emergedAs", lang)} ${archetype.name.toLowerCase()}, ${t("blending", lang)} the ${Object.entries(attributes)
                          .sort((a, b) => b[1] - a[1])
                          .slice(0, 2)
                          .map(([k]) => ATTRIBUTE_LABELS[k as Attribute])
                          .join(" and ")} ${t("ofGreatest", lang)} ${overall} ${t("statusMark", lang)} ${tier} ${t("permanentMark", lang)}`}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-card rounded-2xl p-6">
                    <h4 className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#A8A8B3] mb-4 flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-[#F2CA50]" /> {t("hofBadges", lang)}
                    </h4>
                    <ul className="space-y-2">
                      {badges.map((badge) => (
                        <li key={badge} className="flex items-center gap-3 bg-[#1a1c20]/50 p-3 rounded-lg border border-white/5">
                          <Flame className="h-4 w-4 text-[#F2CA50]" />
                          <span className="text-white">{badge}</span>
                        </li>
                      ))}
                      {badges.length === 0 && (
                        <li className="text-[#A8A8B3]">{t("noBadges", lang)}</li>
                      )}
                    </ul>
                  </div>
                  <div className="glass-card rounded-2xl p-6">
                    <h4 className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#A8A8B3] mb-4 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[#F2CA50]" /> {t("attributeRadar", lang)}
                    </h4>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="rgba(255,255,255,0.1)" />
                          <PolarAngleAxis
                            dataKey="attribute"
                            tick={{ fill: "#A8A8B3", fontSize: 10, fontFamily: "var(--font-space-grotesk)" }}
                          />
                          <Radar
                            name="Attributes"
                            dataKey="value"
                            stroke="#F2CA50"
                            strokeWidth={2}
                            fill="#F2CA50"
                            fillOpacity={0.25}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Drafted Skills */}
                {skills.length > 0 && (
                  <div className="glass-card rounded-2xl p-6">
                    <h4 className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#A8A8B3] mb-4 flex items-center gap-2">
                      <Star className="h-4 w-4 text-[#F2CA50]" /> Drafted Skills ({skills.length})
                    </h4>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto hide-scrollbar pr-1">
                      {skills.map((skill, i) => (
                        <div
                          key={`${skill.id}-${i}`}
                          className="flex items-center justify-between bg-[#1a1c20]/50 rounded-lg p-2.5 border border-white/5"
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-1.5 h-7 rounded-full ${
                                skill.rarity === "legendary" ? "bg-[#F2CA50]" : skill.rarity === "epic" ? "bg-[#6CB9FF]" : "bg-[#A8A8B3]"
                              }`}
                            />
                            <div>
                              <div className="text-white text-xs font-medium">{skill.name}</div>
                              <div className="text-[10px] text-[#A8A8B3]">
                                {ATTRIBUTE_LABELS[skill.attribute as Attribute]} +{skill.bonus}
                              </div>
                            </div>
                          </div>
                          <span
                            className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                              skill.rarity === "legendary"
                                ? "text-[#F2CA50] border border-[#F2CA50]/30 bg-[#F2CA50]/10"
                                : skill.rarity === "epic"
                                ? "text-[#6CB9FF] border border-[#6CB9FF]/30 bg-[#6CB9FF]/10"
                                : "text-[#A8A8B3] border border-white/10 bg-white/5"
                            }`}
                          >
                            {skill.rarity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <ShareModal
                    playerName={playerName}
                    overall={overall}
                    archetype={archetype.name}
                    position={position}
                    attributes={attributes ? Object.fromEntries(ATTRIBUTES.map(attr => [attr, attributes[attr]])) : undefined}
                    stats={hasSim && simResult.season ? { ppg: simResult.season.ppg, rpg: simResult.season.rpg, apg: simResult.season.apg } : undefined}
                    season={hasSim && simResult.season ? simResult.season : undefined}
                    playoffs={hasSim && simResult.playoffs ? simResult.playoffs : undefined}
                    awards={badges}
                    champion={hasSim && simResult.playoffs?.champion}
                    legacyStory={`${playerName} emerged as a ${archetypeName.toLowerCase()}, blending the ${Object.entries(attributes)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 2)
                      .map(([k]) => ATTRIBUTE_LABELS[k as Attribute])
                      .join(" and ")} of the greatest to ever play. With a ${overall} OVR rating and ${tier} status, this build leaves a permanent mark on the HooperVault archives.`}
                    customImage={hasSim ? simResult.customImage : undefined}
                    lang={lang}
                    cardRef={cardRef}
                  />
                  <Button asChild href={buildModeHref} variant="outline" fullWidth size="xl">
                    <span className="flex items-center justify-center gap-2" onClick={() => trackEvent("replay_click", { source: "result_page" })}>
                      <RefreshCw className="h-5 w-5" /> {t("buildAnother", lang)}
                    </span>
                  </Button>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h4 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide mb-4">
                    {lang === "zh-CN" ? "学习如何变强" : "Learn How to Build Better"}
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Link href={buildGuidesHref} className="group block rounded-xl bg-[#1a1c20]/50 border border-white/5 p-4 hover:border-[#F2CA50]/30 transition-all">
                      <h5 className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-white group-hover:text-[#F2CA50]">{lang === "zh-CN" ? "构建指南" : "Build Guides"}</h5>
                      <p className="text-xs text-[#A8A8B3] mt-1">{lang === "zh-CN" ? "20 套优化构建与技能推荐" : "20 optimized builds with skill picks"}</p>
                    </Link>
                    <Link href={archetypesHref} className="group block rounded-xl bg-[#1a1c20]/50 border border-white/5 p-4 hover:border-[#F2CA50]/30 transition-all">
                      <h5 className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-white group-hover:text-[#F2CA50]">{lang === "zh-CN" ? "球风" : "Archetypes"}</h5>
                      <p className="text-xs text-[#A8A8B3] mt-1">{lang === "zh-CN" ? "了解每种打法身份" : "Explore every play style"}</p>
                    </Link>
                    <Link href={legendSkillsHref} className="group block rounded-xl bg-[#1a1c20]/50 border border-white/5 p-4 hover:border-[#F2CA50]/30 transition-all">
                      <h5 className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-white group-hover:text-[#F2CA50]">{lang === "zh-CN" ? "传奇技能" : "Legend Skills"}</h5>
                      <p className="text-xs text-[#A8A8B3] mt-1">{lang === "zh-CN" ? "按类别查看技能灵感" : "Browse skills by category"}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
