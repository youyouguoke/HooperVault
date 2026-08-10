import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../_shared/env";

interface SubmitRequest {
  challengeId: string;  // YYYYMMDD format
  slug: string;
  overall: number;
  archetype: string;
  firstName?: string;
  lastName?: string;
  seasonWins: number;
  seasonLosses: number;
  playoffWins: number;
  championship: boolean;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body = await request.json<SubmitRequest>();
    const { 
      challengeId, slug, overall, archetype, firstName, lastName,
      seasonWins, seasonLosses, playoffWins, championship 
    } = body;

    // Validate required fields
    if (!challengeId || !slug || !overall || !archetype) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate simulation results
    if (seasonWins === undefined || seasonLosses === undefined || playoffWins === undefined) {
      return new Response(
        JSON.stringify({ error: "Simulation results required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify challenge exists and is active
    const challenge = await env.DB
      .prepare("SELECT challenge_id, end_time FROM daily_challenges WHERE challenge_id = ? AND status = 'active'")
      .bind(challengeId)
      .first<{ challenge_id: string; end_time: string }>();

    if (!challenge) {
      return new Response(
        JSON.stringify({ error: "Challenge not found or not active" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if challenge has ended
    const now = new Date();
    const endTime = new Date(challenge.end_time);
    if (now > endTime) {
      return new Response(
        JSON.stringify({ error: "Challenge has ended" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Calculate scores based on PRD formula
    // Season Performance (70%): based on wins, playoff success, championship
    const totalGames = seasonWins + seasonLosses;
    const winRate = totalGames > 0 ? seasonWins / totalGames : 0;
    const playoffBonus = playoffWins * 2;  // Playoff wins worth more
    const championshipBonus = championship ? 50 : 0;
    const seasonScore = (winRate * 100) + playoffBonus + championshipBonus;
    
    // Build Quality (20%): based on overall rating
    const buildScore = overall;
    
    // Challenge Bonus (10%): could be theme-based in future
    const challengeBonus = 0;  // TODO: implement theme-based bonus
    
    // Total weighted score
    const totalScore = (seasonScore * 0.7) + (buildScore * 0.2) + (challengeBonus * 0.1);

    // Insert or update entry
    await env.DB
      .prepare(`
        INSERT INTO challenge_entries (
          challenge_id, hooper_slug, overall, archetype, first_name, last_name,
          season_wins, season_losses, playoff_wins, championship,
          season_score, build_score, challenge_bonus, total_score
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(challenge_id, hooper_slug) DO UPDATE SET
          overall = excluded.overall,
          archetype = excluded.archetype,
          season_wins = excluded.season_wins,
          season_losses = excluded.season_losses,
          playoff_wins = excluded.playoff_wins,
          championship = excluded.championship,
          season_score = excluded.season_score,
          build_score = excluded.build_score,
          challenge_bonus = excluded.challenge_bonus,
          total_score = excluded.total_score,
          submitted_at = CURRENT_TIMESTAMP
      `)
      .bind(
        challengeId, slug, overall, archetype, firstName || null, lastName || null,
        seasonWins, seasonLosses, playoffWins, championship ? 1 : 0,
        seasonScore, buildScore, challengeBonus, totalScore
      )
      .run();

    // Get rank
    const rankResult = await env.DB
      .prepare(`
        SELECT COUNT(*) as rank FROM challenge_entries 
        WHERE challenge_id = ? AND (
          total_score > ? OR 
          (total_score = ? AND submitted_at < (
            SELECT submitted_at FROM challenge_entries 
            WHERE challenge_id = ? AND hooper_slug = ?
          ))
        )
      `)
      .bind(challengeId, totalScore, totalScore, challengeId, slug)
      .first<{ rank: number }>();

    return new Response(
      JSON.stringify({
        success: true,
        rank: (rankResult?.rank || 0) + 1,
        scores: {
          season: seasonScore,
          build: buildScore,
          bonus: challengeBonus,
          total: totalScore,
        },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Challenge submit error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to submit challenge entry" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
