import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../_shared/env";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  try {
    // Get today's date in UTC as challenge_id (YYYYMMDD)
    const now = new Date();
    const challengeId = now.toISOString().slice(0, 10).replace(/-/g, "");
    
    // Find today's challenge
    const challenge = await env.DB
      .prepare(`
        SELECT challenge_id, title, seed, status, start_time, end_time, theme 
        FROM daily_challenges 
        WHERE challenge_id = ? AND status = 'active'
      `)
      .bind(challengeId)
      .first<{
        challenge_id: string;
        title: string;
        seed: number;
        status: string;
        start_time: string;
        end_time: string;
        theme: string | null;
      }>();

    if (!challenge) {
      return new Response(
        JSON.stringify({ challenge: null, entries: 0, timeRemaining: null }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Count entries
    const countResult = await env.DB
      .prepare("SELECT COUNT(*) as count FROM challenge_entries WHERE challenge_id = ?")
      .bind(challengeId)
      .first<{ count: number }>();

    // Calculate time remaining
    const endTime = new Date(challenge.end_time).getTime();
    const timeRemaining = Math.max(0, endTime - now.getTime());

    return new Response(
      JSON.stringify({
        challenge: {
          id: challenge.challenge_id,
          title: challenge.title,
          seed: challenge.seed,
          status: challenge.status,
          startTime: challenge.start_time,
          endTime: challenge.end_time,
          theme: challenge.theme,
        },
        entries: countResult?.count || 0,
        timeRemaining,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch challenge" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
