/**
 * GET /auth/google/start
 * Redirects user to Google OAuth consent screen.
 */
import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../_shared/env";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;
  const siteUrl = env.SITE_URL || "https://hoopervault.com";

  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: `${siteUrl}/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    prompt: "select_account",
  });

  return Response.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`, 302);
};
