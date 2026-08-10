import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../_shared/env";

// Theme pool for challenges
const THEMES = [
  { title: "Defensive Dynasty", theme: "Build the ultimate defensive legend." },
  { title: "Scoring Machine", theme: "Create a player who can score from anywhere." },
  { title: "Playmaker Supreme", theme: "Build a floor general who controls the game." },
  { title: "Two-Way Star", theme: "Dominate on both ends of the court." },
  { title: "Clutch King", theme: "Build a player who thrives under pressure." },
  { title: "Rim Protector", theme: "Create an unstoppable force in the paint." },
  { title: "Sharpshooter", theme: "Build a player with unlimited range." },
  { title: "All-Around Elite", theme: "Master of all trades, jack of none." },
  { title: "Athletic Freak", theme: "Build a physical specimen." },
  { title: "Basketball IQ", theme: "Outsmart your opponents with pure skill." },
];

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env } = context;

  try {
    // Calculate tomorrow's challenge ID (YYYYMMDD)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const challengeId = tomorrow.toISOString().slice(0, 10).replace(/-/g, "");
    
    // Check if challenge already exists
    const existing = await env.DB
      .prepare("SELECT challenge_id FROM daily_challenges WHERE challenge_id = ?")
      .bind(challengeId)
      .first<{ challenge_id: string }>();

    if (existing) {
      return new Response(
        JSON.stringify({ error: "Challenge already exists for this date" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate deterministic seed from date
    const seed = parseInt(challengeId);
    
    // Select theme based on seed
    const themeIndex = seed % THEMES.length;
    const theme = THEMES[themeIndex];

    // Set start/end times (UTC)
    const startTime = new Date(tomorrow);
    startTime.setUTCHours(0, 0, 0, 0);
    
    const endTime = new Date(tomorrow);
    endTime.setUTCHours(23, 59, 59, 999);

    // Insert challenge
    await env.DB
      .prepare(`
        INSERT INTO daily_challenges (challenge_id, title, seed, status, start_time, end_time, theme)
        VALUES (?, ?, ?, 'active', ?, ?, ?)
      `)
      .bind(challengeId, theme.title, seed, startTime.toISOString(), endTime.toISOString(), theme.theme)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        challenge: {
          id: challengeId,
          title: theme.title,
          seed,
          theme: theme.theme,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Challenge generation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate challenge" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
