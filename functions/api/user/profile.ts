/**
 * GET /api/user/profile
 * Returns authenticated user's profile with hooper history and stats.
 */
import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../_shared/env";
import { getSessionCookie, verifyJWT } from "../../_shared/jwt";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const token = getSessionCookie(request);

  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const payload = await verifyJWT(token, env.JWT_SECRET);
  if (!payload) {
    return new Response(JSON.stringify({ error: "Invalid session" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const userId = payload.sub;

    // Get user info
    const user = await env.DB.prepare(
      "SELECT id, email, name, image, created_at, last_login_at FROM users WHERE id = ?"
    ).bind(userId).first<{
      id: string;
      email: string;
      name: string;
      image: string;
      created_at: string;
      last_login_at: string;
    }>();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get user's hoopers (most recent 50)
    const { results: hoopers } = await env.DB.prepare(
      `SELECT slug, position, mode, overall, archetype, first_name, last_name,
              season_wins, season_losses, ppg, rpg, apg, championship, created_at
       FROM hoopers WHERE user_id = ?
       ORDER BY created_at DESC LIMIT 50`
    ).bind(userId).all<{
      slug: string;
      position: string;
      mode: string;
      overall: number;
      archetype: string;
      first_name: string | null;
      last_name: string | null;
      season_wins: number;
      season_losses: number;
      ppg: number;
      rpg: number;
      apg: number;
      championship: number;
      created_at: string;
    }>();

    // Get total hooper count
    const countResult = await env.DB.prepare(
      "SELECT COUNT(*) as total FROM hoopers WHERE user_id = ?"
    ).bind(userId).first<{ total: number }>();
    const totalHoopers = countResult?.total || 0;

    // Mode distribution
    const modeStats = await env.DB.prepare(
      `SELECT mode, COUNT(*) as count FROM hoopers WHERE user_id = ? GROUP BY mode`
    ).bind(userId).all<{ mode: string; count: number }>();

    const modeDistribution: Record<string, number> = { classic: 0, blind: 0, chaos: 0 };
    for (const row of (modeStats.results || [])) {
      modeDistribution[row.mode] = row.count;
    }

    // Challenge entries count
    const challengeResult = await env.DB.prepare(
      `SELECT COUNT(*) as total FROM challenge_entries ce
       JOIN hoopers h ON ce.hooper_slug = h.slug
       WHERE h.user_id = ?`
    ).bind(userId).first<{ total: number }>();
    const totalChallenges = challengeResult?.total || 0;

    // Best overall
    const bestResult = await env.DB.prepare(
      "SELECT MAX(overall) as best FROM hoopers WHERE user_id = ?"
    ).bind(userId).first<{ best: number }>();
    const bestOverall = bestResult?.best || 0;

    // Championship count
    const champResult = await env.DB.prepare(
      "SELECT COUNT(*) as total FROM hoopers WHERE user_id = ? AND championship = 1"
    ).bind(userId).first<{ total: number }>();
    const championships = champResult?.total || 0;

    return new Response(
      JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          createdAt: user.created_at,
          lastLoginAt: user.last_login_at,
        },
        stats: {
          totalHoopers,
          bestOverall,
          championships,
          totalChallenges,
          modeDistribution,
        },
        hoopers: hoopers || [],
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("[profile] Error:", error);
    return new Response(JSON.stringify({ error: "Failed to load profile" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
