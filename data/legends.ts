export interface Skill {
  id: string;
  name: string;
  description: string;
  attribute: string;
  bonus: number;
  rarity: "legendary" | "epic" | "rare";
  legendName?: string;
  legendCategory?: string;
}

export interface Legend {
  id: string;
  displayName: string;
  category: string;
  skills: Skill[];
}

export type Attribute =
  | "shooting"
  | "mid_range"
  | "finishing"
  | "dunk"
  | "passing"
  | "ball_handle"
  | "perimeter_defense"
  | "interior_defense"
  | "block"
  | "rebound"
  | "speed"
  | "strength"
  | "clutch";

export const ATTRIBUTES: Attribute[] = ["shooting", "mid_range", "finishing", "dunk", "passing", "ball_handle", "perimeter_defense", "interior_defense", "block", "rebound", "speed", "strength", "clutch"];

export const POSITION_MODIFIERS: Record<string, Partial<Record<Attribute, number>>> = {
  PG: { passing: 5, ball_handle: 5, speed: 3 },
  SG: { shooting: 5, mid_range: 3, speed: 3 },
  SF: { finishing: 3, perimeter_defense: 3, speed: 3 },
  PF: { rebound: 5, interior_defense: 3, strength: 3 },
  C: { block: 5, rebound: 3, strength: 5 },
};

export const SKILL_BY_ID: Record<string, Skill> = {};

function buildSkillMap() {
  LEGENDS.forEach((legend) => {
    legend.skills.forEach((skill) => {
      SKILL_BY_ID[skill.id] = { ...skill, legendName: legend.displayName, legendCategory: legend.category };
    });
  });
}

export function getSkillById(id: string): (Skill & { legendName: string; legendCategory: string }) | undefined {
  return SKILL_BY_ID[id] as (Skill & { legendName: string; legendCategory: string }) | undefined;
}

export const LEGENDS: Legend[] = [
  {
    id: "jordan",
    displayName: "The Closer",
    category: "Mental",
    skills: [
      { id: "mamba-mentality", name: "Mamba Mentality", description: "Unlocks clutch-time performance boost in final minutes.", attribute: "clutch", bonus: 15, rarity: "legendary" },
      { id: "midrange-mastery", name: "Fadeaway Artist", description: "Elite mid-range scoring with contested shot bonuses.", attribute: "mid_range", bonus: 12, rarity: "legendary" },
    ],
  },
  {
    id: "magic",
    displayName: "Court General",
    category: "Playmaking",
    skills: [
      { id: "court-vision", name: "Court Vision", description: "Elevates team synergy and passing accuracy.", attribute: "passing", bonus: 14, rarity: "legendary" },
      { id: "no-look-pass", name: "No-Look Pass", description: "Flashy passes that boost teammate awareness.", attribute: "ball_handle", bonus: 8, rarity: "epic" },
    ],
  },
  {
    id: "shaq",
    displayName: "Diesel Force",
    category: "Interior",
    skills: [
      { id: "backboard-breaker", name: "Backboard Breaker", description: "Dominant finishing and dunk power near the rim.", attribute: "dunk", bonus: 16, rarity: "legendary" },
      { id: "post-presence", name: "Post Presence", description: "Unmovable interior force and strength.", attribute: "strength", bonus: 12, rarity: "legendary" },
    ],
  },
  {
    id: "duncan",
    displayName: "Stone Wall",
    category: "Defense",
    skills: [
      { id: "fundamental-d", name: "Fundamental Defense", description: "Solid, consistent defensive positioning.", attribute: "interior_defense", bonus: 14, rarity: "legendary" },
      { id: "rebound-machine", name: "Rebound Machine", description: "Reliable box-out and rebound control.", attribute: "rebound", bonus: 10, rarity: "epic" },
    ],
  },
  {
    id: "curry",
    displayName: "Range Chef",
    category: "Shooting",
    skills: [
      { id: "deep-range", name: "Deep Range", description: "Extreme three-point range with quick release.", attribute: "shooting", bonus: 16, rarity: "legendary" },
      { id: "off-ball-gravity", name: "Off-Ball Gravity", description: "Constant movement creates space for teammates.", attribute: "speed", bonus: 6, rarity: "rare" },
    ],
  },
  {
    id: "hakeem",
    displayName: "Dream Shake",
    category: "Defense",
    skills: [
      { id: "rim-protector", name: "Rim Protector", description: "Elite shot blocking and intimidation.", attribute: "block", bonus: 14, rarity: "legendary" },
      { id: "footwork-master", name: "Footwork Master", description: "Refined post moves and finishing.", attribute: "finishing", bonus: 8, rarity: "epic" },
    ],
  },
  {
    id: "bird",
    displayName: "Hickory Legend",
    category: "Mental",
    skills: [
      { id: "basketball-iq", name: "Basketball IQ", description: "Reads plays before they happen.", attribute: "clutch", bonus: 10, rarity: "legendary" },
      { id: "clutch-shooter", name: "Clutch Shooter", description: "Raises shooting in high-pressure moments.", attribute: "shooting", bonus: 8, rarity: "epic" },
    ],
  },
  {
    id: "kobe",
    displayName: "Mamba Mentality",
    category: "Mental",
    skills: [
      { id: "mamba-focus", name: "Mamba Focus", description: "Relentless scoring focus and stamina.", attribute: "clutch", bonus: 14, rarity: "legendary" },
      { id: "perimeter-lock", name: "Perimeter Lock", description: "Tenacious one-on-one defense.", attribute: "perimeter_defense", bonus: 8, rarity: "epic" },
    ],
  },
];

export function getDraftRound(round: number, seed: number = 0): { optionA: Skill & { legendName: string; legendCategory: string }; optionB: Skill & { legendName: string; legendCategory: string } } {
  const total = LEGENDS.length * 2;
  const idxA = (round * 3 + seed) % total;
  const idxB = (round * 5 + seed + 7) % total;

  const getSkill = (idx: number) => {
    const legend = LEGENDS[Math.floor(idx / 2)];
    const skill = legend.skills[idx % 2];
    return { ...skill, legendName: legend.displayName, legendCategory: legend.category };
  };

  return {
    optionA: getSkill(idxA),
    optionB: getSkill(idxB),
  };
}

buildSkillMap();
