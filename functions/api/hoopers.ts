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

  // Fallback with random suffix
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
    }>();

    const { position, mode, seed, history, overall, archetype, firstName, lastName } = body;

    if (!position || !history || !overall || !archetype) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const slug = await createUniqueSlug(env.DB, history, position, seed);

    await env.DB
      .prepare(
        "INSERT INTO hoopers (slug, position, mode, seed, history, overall, archetype, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(slug, position, mode, seed, history, overall, archetype, firstName || null, lastName || null)
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

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  try {
    const { results } = await env.DB
      .prepare("SELECT slug, position, mode, seed, history, overall, archetype, first_name, last_name, created_at FROM hoopers ORDER BY created_at DESC LIMIT 20")
      .all<{
        slug: string;
        position: string;
        mode: string;
        seed: number;
        history: string;
        overall: number;
        archetype: string;
        first_name: string | null;
        last_name: string | null;
        created_at: string;
      }>();

    return new Response(
      JSON.stringify({ hoopers: results || [] }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch Hoopers" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
