"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  ATTRIBUTES,
  type Attribute,
  POSITION_MODIFIERS,
} from "@/data/legends";
import {
  getTeamById,
  getSkillById as getTeamSkillById,
  type HistoricTeam,
  type LegendaryPlayer,
  type PlayerSkill,
} from "@/data/teams";
import {
  Swords,
  ChevronRight,
  Trophy,
  Zap,
  Shield,
  Star,
} from "lucide-react";

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

function deterministicIndex(seed: number, position: string, length: number): number {
  const combined = `${seed}:${position.toUpperCase()}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % length;
}

function generatePlayerName(seed: number, position: string): { firstName: string; lastName: string } {
  const posKey = (position || "SG").toUpperCase();
  const firstName = FIRST_NAMES[deterministicIndex(seed, posKey, FIRST_NAMES.length)];
  const lastName = LAST_NAMES[deterministicIndex(seed * 7 + posKey.length, posKey, LAST_NAMES.length)];
  return { firstName, lastName };
}

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
    icon: Trophy,
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

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111317]" />}>
      <PreviewPageInner />
    </Suspense>
  );
}

function PreviewPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const position = (searchParams.get("position") || "SG") as keyof typeof POSITION_MODIFIERS;
  const mode = searchParams.get("mode") || "classic";
  const teamId = searchParams.get("team") || "95-96-bulls";
  const seedParam = parseInt(searchParams.get("seed") || "1", 10);
  const historyParam = searchParams.get("history") || "";

  const team = useMemo(() => getTeamById(teamId), [teamId]);

  const skills = useMemo(() => {
    if (historyParam) {
      return historyParam
        .split(",")
        .map((id) => getTeamSkillById(id))
        .filter(Boolean) as (PlayerSkill & { player: LegendaryPlayer; team: HistoricTeam })[];
    }
    return [];
  }, [historyParam, team]);

  const [saving, setSaving] = useState(false);

  const playerName = useMemo(() => generatePlayerName(seedParam, position), [seedParam, position]);

  const attributes: Record<Attribute, number> = useMemo(() => {
    const attrs: Record<Attribute, number> = {
      shooting: 55,
      mid_range: 55,
      finishing: 55,
      dunk: 55,
      passing: 55,
      ball_handle: 55,
      perimeter_defense: 55,
      interior_defense: 55,
      block: 55,
      rebound: 55,
      speed: 55,
      strength: 55,
      clutch: 55,
    };
    const modifiers = POSITION_MODIFIERS[position] || {};
    for (const [key, value] of Object.entries(modifiers)) {
      attrs[key as Attribute] += value;
    }
    skills.forEach((skill) => {
      attrs[skill.attribute as Attribute] = Math.min(99, attrs[skill.attribute as Attribute] + skill.bonus);
    });
    return attrs;
  }, [position, skills]);

  const overall = useMemo(() => {
    return Math.round(Object.values(attributes).reduce((a, b) => a + b, 0) / 13);
  }, [attributes]);

  const archetype = useMemo(() => {
    return ARCHETYPES.find((a) => a.conditions(attributes)) || { name: "Rising Prospect", icon: Swords, desc: "A solid foundation with room to grow." };
  }, [attributes]);

  const radarData = useMemo(() => {
    return ATTRIBUTES.map((attr) => ({
      attribute: ATTRIBUTE_LABELS[attr],
      fullMark: 100,
      value: attributes[attr],
    }));
  }, [attributes]);

  const positionNames: Record<string, string> = {
    PG: "Point Guard",
    SG: "Shooting Guard",
    SF: "Small Forward",
    PF: "Power Forward",
    C: "Center",
  };

  return (
    <>
      <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-6">
        <div className="stadium-glow" />
        <Container>
          <div className="relative z-10 text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-2">
              Step 5 of 5
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide">
              Build Preview
            </h1>
          </div>
        </Container>
      </div>

      <Section className="relative">
        <Container>
          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="legendary-card rounded-2xl p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-[#A8A8B3] font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-wider mb-1">
                      {positionNames[position]}
                    </p>
                    {team && (
                      <p className="text-[#F2CA50] text-xs uppercase tracking-wider font-bold mb-2">
                        {team.season} {team.teamName} · {team.record}
                      </p>
                    )}
                    <h2 className="font-[family-name:var(--font-anton)] text-4xl md:text-5xl text-white uppercase tracking-wide">
                      {archetype.name}
                    </h2>
                    <p className="text-[#A8A8B3] mt-2">{archetype.desc}</p>
                  </div>
                  <div className="text-center bg-[#F2CA50]/10 border border-[#F2CA50]/30 rounded-xl px-4 py-3">
                    <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">OVR</div>
                    <div className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-[#F2CA50]">
                      {overall}
                    </div>
                  </div>
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden mb-6 border border-white/10">
                  <img
                    src="/images/preview-avatar.jpg"
                    alt="Premium basketball player avatar inside a digital card interface with dramatic stadium lighting"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-transparent" />
                </div>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis
                        dataKey="attribute"
                        tick={{ fill: "#A8A8B3", fontSize: 11, fontFamily: "var(--font-space-grotesk)" }}
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

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {ATTRIBUTES.map((attr) => (
                  <div key={attr} className="bg-[#1a1c20] border border-white/5 rounded-lg p-3 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">{ATTRIBUTE_LABELS[attr]}</div>
                    <div
                      className={`font-[family-name:var(--font-space-grotesk)] text-xl font-bold ${
                        attributes[attr] >= 90 ? "text-[#F2CA50]" : attributes[attr] >= 75 ? "text-white" : "text-[#A8A8B3]"
                      }`}
                    >
                      {attributes[attr]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">
                  Drafted Skills
                </h3>
                <div className="space-y-3 max-h-[360px] overflow-y-auto hide-scrollbar pr-1">
                  {skills.map((skill, i) => (
                    <div
                      key={`${skill.id}-${i}`}
                      className="flex items-center justify-between bg-[#1a1c20]/70 rounded-lg p-3 border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-8 rounded-full ${
                            skill.rarity === "legendary" ? "bg-[#F2CA50]" : skill.rarity === "epic" ? "bg-[#6CB9FF]" : "bg-[#A8A8B3]"
                          }`}
                        />
                        <div>
                          <div className="text-white font-medium text-sm">{skill.name}</div>
                          <div className="text-[10px] uppercase tracking-wider text-[#A8A8B3]">
                            {skill.player.fullName} &middot; {ATTRIBUTE_LABELS[skill.attribute as Attribute]} +{skill.bonus}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border ${
                          skill.rarity === "legendary"
                            ? "text-[#F2CA50] border-[#F2CA50]/30 bg-[#F2CA50]/10"
                            : skill.rarity === "epic"
                            ? "text-[#6CB9FF] border-[#6CB9FF]/30 bg-[#6CB9FF]/10"
                            : "text-[#A8A8B3] border-white/10 bg-white/5"
                        }`}
                      >
                        {skill.rarity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-4">
                  Lock This Build
                </h3>
                <p className="text-sm text-[#A8A8B3] mb-6">
                  Save this Hooper to the Vault, simulate the season, and generate your permanent legacy page.
                </p>
                <Button
                  onClick={async () => {
                    setSaving(true);
                    try {
                      const payload = {
                        position,
                        mode,
                        team: teamId,
                        seed: seedParam,
                        history: historyParam || skills.map((s) => s.id).join(","),
                        overall,
                        archetype: archetype.name,
                        firstName: playerName.firstName,
                        lastName: playerName.lastName,
                      };
                      const res = await fetch("/api/hoopers", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                      });
                      const data = await res.json();
                      if (!res.ok || !data.slug) {
                        console.error("Save failed:", res.status, data);
                        return;
                      }
                      const redirectUrl = `/en/simulate?position=${position}&mode=${mode}&team=${teamId}&seed=${seedParam}&slug=${data.slug}&history=${encodeURIComponent(historyParam || skills.map((s) => s.id).join(","))}`;
                      router.push(redirectUrl);
                    } catch (err) {
                      console.error("Save & Simulate error:", err);
                    } finally {
                      setSaving(false);
                    }
                  }}
                  disabled={saving}
                  variant="secondary"
                  fullWidth
                  size="xl"
                >
                  {saving ? "Saving..." : <><Trophy className="h-5 w-5 mr-2" /> Save & Simulate</>}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
