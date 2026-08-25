/**
 * POST /auth/signout
 * Clears the session cookie.
 */
import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../_shared/env";
import { clearSessionCookie } from "../_shared/jwt";

export const onRequestPost: PagesFunction<Env> = async () => {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": clearSessionCookie(),
    },
  });
};
