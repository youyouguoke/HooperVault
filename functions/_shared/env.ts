import type { D1Database } from "@cloudflare/workers-types";

export interface Env {
  DB: D1Database;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  JWT_SECRET: string;
  SITE_URL: string;       // https://hoopervault.com
}
