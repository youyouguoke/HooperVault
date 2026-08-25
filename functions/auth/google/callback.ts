/**
 * GET /auth/google/callback?code=...
 * Exchanges auth code for tokens, fetches user info, upserts to D1, sets JWT cookie.
 */
import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../_shared/env";
import { signJWT, setSessionCookie } from "../../_shared/jwt";

interface GoogleTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  id_token: string;
}

interface GoogleUserInfo {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const siteUrl = env.SITE_URL || "https://hoopervault.com";

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  try {
    // 1. Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${siteUrl}/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error("[auth] Token exchange failed:", err);
      return new Response("Token exchange failed", { status: 500 });
    }

    const tokens = (await tokenRes.json()) as GoogleTokenResponse;

    // 2. Fetch user info from Google
    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!userRes.ok) {
      return new Response("Failed to fetch user info", { status: 500 });
    }

    const googleUser = (await userRes.json()) as GoogleUserInfo;

    // 3. Upsert user into D1
    await env.DB.prepare(
      `INSERT INTO users (id, email, name, image, last_login_at)
       VALUES (?, ?, ?, ?, datetime('now'))
       ON CONFLICT(id) DO UPDATE SET
         name = excluded.name,
         image = excluded.image,
         last_login_at = datetime('now')`
    )
      .bind(googleUser.sub, googleUser.email, googleUser.name, googleUser.picture)
      .run();

    // 4. Sign JWT and set cookie
    const token = await signJWT(
      {
        sub: googleUser.sub,
        email: googleUser.email,
        name: googleUser.name,
        image: googleUser.picture,
      },
      env.JWT_SECRET
    );

    // 5. Redirect back to site with cookie set
    return new Response(null, {
      status: 302,
      headers: {
        Location: siteUrl,
        "Set-Cookie": setSessionCookie(token),
      },
    });
  } catch (err) {
    console.error("[auth] Callback error:", err);
    return new Response("Authentication failed", { status: 500 });
  }
};
