import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../_shared/env";

function generateSlug(history: string, position: string, seed: number): string {
  const base = `${position}-${seed}-${history}`;
  let hash = 0;
  for (let i = 0; i < base.length; i++) {
    const char = base.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const suffix = Math.abs(hash).toString(36).slice(0, 8);
  const part = position.toLowerCase();
  return `${part}-${suffix}`;
}

async function slugExists(db: D1Database, slug: string): Promise<boolean> {
  const result = await db
    .prepare("SELECT slug FROM hoopers WHERE slug = ?")
    .bind(slug)
    .first<{ slug: string }>();
  return !!result;
}

async function createUniqueSlug(db: D1Database, history: string, position: string, seed: number): Promise<string> {
  let slug = generateSlug(history, position, seed);
  if (!(await slugExists(db, slug))) return slug;

  let attempt = 1;
  while (attempt < 100) {
    slug = generateSlug(`${history}-${attempt}`, position, seed);
    if (!(await slugExists(db, slug))) return slug;
    attempt++;
  }

  return `${slug}-${Math.random().toString(36).slice(2, 6)}`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body = await request.json<{
      position: string;
      mode: string;
      seed: number;
      history: string;
      overall: number;
      archetype: string;
      firstName?: string;
      lastName?: string;
      username?: string;
      seasonWins?: number;
      seasonLosses?: number;
      ppg?: number;
      rpg?: number;
      apg?: number;
      championship?: boolean;
    }>();

    const { position, mode, seed, history, overall, archetype, firstName, lastName, username, seasonWins, seasonLosses, ppg, rpg, apg, championship } = body;

    if (!position || !history || !overall || !archetype) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const slug = await createUniqueSlug(env.DB, history, position, seed);

    await env.DB
      .prepare(
        "INSERT INTO hoopers (slug, position, mode, seed, history, overall, archetype, first_name, last_name, username, season_wins, season_losses, ppg, rpg, apg, championship) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(slug, position, mode, seed, history, overall, archetype, firstName || null, lastName || null, username || "游客", seasonWins || 0, seasonLosses || 0, ppg || 0, rpg || 0, apg || 0, championship ? 1 : 0)
      .run();

    return new Response(
      JSON.stringify({ slug, success: true }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to save Hooper" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body = await request.json<{
      slug: string;
      firstName?: string;
      lastName?: string;
      username?: string;
      seasonWins?: number;
      seasonLosses?: number;
      ppg?: number;
      rpg?: number;
      apg?: number;
      championship?: boolean;
    }>();

    const { slug, firstName, lastName, username, seasonWins, seasonLosses, ppg, rpg, apg, championship } = body;

    if (!slug) {
      return new Response(
        JSON.stringify({ error: "Missing slug" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Build dynamic SET clause based on provided fields
    const updates: (string | number | null)[] = [];
    const setClauses: string[] = [];
    if (firstName !== undefined || lastName !== undefined) {
      setClauses.push("first_name = ?", "last_name = ?");
      updates.push(firstName || null, lastName || null);
    }
    if (username !== undefined) {
      setClauses.push("username = ?");
      updates.push(username || "游客");
    }
    if (seasonWins !== undefined) { setClauses.push("season_wins = ?"); updates.push(seasonWins); }
    if (seasonLosses !== undefined) { setClauses.push("season_losses = ?"); updates.push(seasonLosses); }
    if (ppg !== undefined) { setClauses.push("ppg = ?"); updates.push(ppg); }
    if (rpg !== undefined) { setClauses.push("rpg = ?"); updates.push(rpg); }
    if (apg !== undefined) { setClauses.push("apg = ?"); updates.push(apg); }
    if (championship !== undefined) { setClauses.push("championship = ?"); updates.push(championship ? 1 : 0); }
    if (setClauses.length === 0) {
      return new Response(
        JSON.stringify({ error: "No fields to update" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    updates.push(slug);

    await env.DB
      .prepare(`UPDATE hoopers SET ${setClauses.join(", ")} WHERE slug = ?`)
      .bind(...updates)
      .run();

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update Hooper" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const url = new URL(request.url);

  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 100);
  const offset = parseInt(url.searchParams.get("offset") || "0");
  const mode = url.searchParams.get("mode"); // "classic" | "blind" | null = all

  try {
    let query = "SELECT slug, position, mode, overall, archetype, first_name, last_name, username, season_wins, season_losses, ppg, rpg, apg, championship, created_at FROM hoopers";
    const bindings: (string | number)[] = [];

    if (mode && (mode === "classic" || mode === "blind")) {
      query += " WHERE mode = ?";
      bindings.push(mode);
    }

    query += " ORDER BY overall DESC, created_at DESC LIMIT ? OFFSET ?";
    bindings.push(limit, offset);

    const stmt = env.DB.prepare(query).bind(...bindings);
    const { results } = await stmt.all<{
      slug: string;
      position: string;
      mode: string;
      overall: number;
      archetype: string;
      first_name: string | null;
      last_name: string | null;
      username: string;
      season_wins: number;
      season_losses: number;
      ppg: number;
      rpg: number;
      apg: number;
      championship: number;
      created_at: string;
    }>();

    // Get total count for pagination
    let countQuery = "SELECT COUNT(*) as total FROM hoopers";
    const countBindings: string[] = [];
    if (mode && (mode === "classic" || mode === "blind")) {
      countQuery += " WHERE mode = ?";
      countBindings.push(mode);
    }
    const countResult = await env.DB.prepare(countQuery).bind(...countBindings).first<{ total: number }>();
    const total = countResult?.total || 0;

    return new Response(
      JSON.stringify({ hoopers: results || [], total, limit, offset }),
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
      JSON.stringify({ error: "Failed to fetch Hoopers" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
