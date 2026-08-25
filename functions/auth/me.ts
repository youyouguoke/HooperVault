/**
 * GET /auth/me
 * Returns current user from JWT cookie, or 401.
 */
import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../_shared/env";
import { getSessionCookie, verifyJWT } from "../_shared/jwt";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const token = getSessionCookie(request);

  if (!token) {
    return new Response(JSON.stringify({ user: null }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const payload = await verifyJWT(token, env.JWT_SECRET);
  if (!payload) {
    return new Response(JSON.stringify({ user: null }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": "hv_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0",
      },
    });
  }

  return new Response(
    JSON.stringify({
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        image: payload.image,
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
};
