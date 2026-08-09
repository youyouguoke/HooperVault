import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../_shared/env";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateSVG(data: {
  name: string;
  overall: number;
  archetype: string;
  position: string;
  champion?: boolean;
}): string {
  const tierColor = data.overall >= 95 ? "#F2CA50" : data.overall >= 90 ? "#6CB9FF" : data.overall >= 80 ? "#FF5E07" : "#A8A8B3";
  const tier = data.overall >= 95 ? "LEGENDARY" : data.overall >= 90 ? "ELITE" : data.overall >= 80 ? "STAR" : "RISING";

  // Truncate long names
  const displayName = data.name.length > 20 ? data.name.substring(0, 18) + "..." : data.name;
  const safeName = escapeXml(displayName);
  const safeArchetype = escapeXml(data.archetype);

  const championBadge = data.champion ? `
  <rect x="${80 + tier.length * 12 + 48}" y="120" width="140" height="28" rx="14" fill="#F2CA5015" stroke="#F2CA5050" stroke-width="1"/>
  <text x="${80 + tier.length * 12 + 64}" y="139" font-family="Arial, sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#F2CA50">&#127942; CHAMPION</text>` : '';

  return [
    '<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">',
    '  <defs>',
    '    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">',
    '      <stop offset="0%" style="stop-color:#0B0B12"/>',
    '      <stop offset="50%" style="stop-color:#111317"/>',
    '      <stop offset="100%" style="stop-color:#0B0B12"/>',
    '    </linearGradient>',
    `    <radialGradient id="glow" cx="50%" cy="50%" r="50%">`,
    `      <stop offset="0%" style="stop-color:${tierColor};stop-opacity:0.15"/>`,
    '      <stop offset="100%" style="stop-color:transparent;stop-opacity:0"/>',
    '    </radialGradient>',
    '  </defs>',
    '  ',
    '  <rect width="1200" height="630" fill="url(#bg)"/>',
    `  <rect x="0" y="0" width="8" height="630" fill="${tierColor}"/>`,
    `  <ellipse cx="600" cy="315" rx="400" ry="300" fill="url(#glow)"/>`,
    `  <text x="80" y="90" font-family="Arial, sans-serif" font-size="16" font-weight="bold" letter-spacing="4" fill="#F2CA50">HOOPERVAULT</text>`,
    `  <rect x="80" y="120" width="${tier.length * 12 + 32}" height="28" rx="14" fill="${tierColor}15" stroke="${tierColor}50" stroke-width="1"/>`,
    `  <text x="${80 + 16}" y="139" font-family="Arial, sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="${tierColor}">${tier}</text>`,
    championBadge,
    `  <text x="80" y="220" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" letter-spacing="2">${safeName}</text>`,
    `  <text x="80" y="270" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="${tierColor}">${safeArchetype} · ${data.position}</text>`,
    `  <rect x="980" y="200" width="140" height="120" rx="12" fill="#1a1c20" stroke="${tierColor}50" stroke-width="2"/>`,
    `  <text x="1050" y="240" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" letter-spacing="2" fill="#A8A8B3">OVR</text>`,
    `  <text x="1050" y="300" font-family="Arial, sans-serif" font-size="64" text-anchor="middle" font-weight="bold" fill="${tierColor}">${data.overall}</text>`,
    `  <text x="80" y="580" font-family="Arial, sans-serif" font-size="14" fill="#A8A8B380">Build your own Hooper at hoopervault.com</text>`,
    '</svg>',
  ].join('\n');
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, params } = context;
  const slug = params.slug as string;

  try {
    // Fetch hooper data from database
    const hooper = await env.DB
      .prepare("SELECT slug, position, mode, seed, history, overall, archetype, first_name, last_name, created_at FROM hoopers WHERE slug = ?")
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
        created_at: string;
      }>();

    if (!hooper) {
      // Return default OG image if hooper not found
      return new Response(null, {
        status: 302,
        headers: { Location: "/images/og-default.jpg" },
      } as ResponseInit);
    }

    const playerName = hooper.first_name && hooper.last_name
      ? `${hooper.first_name} ${hooper.last_name}`
      : "Unknown Hooper";

    // Generate SVG OG image
    const svg = generateSVG({
      name: playerName,
      overall: hooper.overall,
      archetype: hooper.archetype || "Rising Prospect",
      position: hooper.position,
    });

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400",
      },
    } as ResponseInit);
  } catch (error) {
    // Return default OG image on error
    return new Response(null, {
      status: 302,
      headers: { Location: "/images/og-default.jpg" },
    } as ResponseInit);
  }
};
