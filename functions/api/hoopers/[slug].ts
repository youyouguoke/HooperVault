import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../_shared/env";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, params } = context;
  const slug = params.slug as string;

  try {
    const hooper = await env.DB
      .prepare("SELECT slug, position, mode, seed, history, overall, archetype, first_name, last_name, custom_image, created_at FROM hoopers WHERE slug = ?")
      .bind(slug)
      .first<{
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
      }>();

    if (!hooper) {
      return new Response(
        JSON.stringify({ error: "Hooper not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(hooper),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch Hooper" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
