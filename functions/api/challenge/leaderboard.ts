import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../_shared/env";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const url = new URL(request.url);

  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 100);
  const offset = parseInt(url.searchParams.get("offset") || "0");
  const challengeId = url.searchParams.get("challengeId"); // Optional: specific challenge

  try {
    // Use provided challengeId or get today's
    const targetChallengeId = challengeId || (() => {
      const now = new Date();
      return now.toISOString().slice(0, 10).replace(/-/g, "");
    })();

    // Get challenge details
    const challenge = await env.DB
      .prepare(`
        SELECT challenge_id, title, seed, status, start_time, end_time, theme 
        FROM daily_challenges 
        WHERE challenge_id = ?
      `)
      .bind(targetChallengeId)
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
        JSON.stringify({ challenge: null, entries: [], total: 0 }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get entries with simulation results
    const { results } = await env.DB
      .prepare(`
        SELECT 
          hooper_slug, overall, archetype, first_name, last_name,
          season_wins, season_losses, playoff_wins, championship,
          season_score, build_score, challenge_bonus, total_score,
          submitted_at
        FROM challenge_entries
        WHERE challenge_id = ?
        ORDER BY total_score DESC, submitted_at ASC
        LIMIT ? OFFSET ?
      `)
      .bind(targetChallengeId, limit, offset)
      .all<{
        hooper_slug: string;
        overall: number;
        archetype: string;
        first_name: string | null;
        last_name: string | null;
        season_wins: number;
        season_losses: number;
        playoff_wins: number;
        championship: number;
        season_score: number;
        build_score: number;
        challenge_bonus: number;
        total_score: number;
        submitted_at: string;
      }>();

    const countResult = await env.DB
      .prepare("SELECT COUNT(*) as total FROM challenge_entries WHERE challenge_id = ?")
      .bind(targetChallengeId)
      .first<{ total: number }>();

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
        entries: results || [],
        total: countResult?.total || 0,
        limit,
        offset,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=30",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch challenge leaderboard" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
