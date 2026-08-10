"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import {
  Share2,
  Copy,
  Download,
  Check,
  X,
  Link2,
} from "lucide-react";

// X (Twitter) icon
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Discord icon
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  );
}

// Reddit icon
function RedditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

// WeChat icon
function WechatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89l-.002-.003v-.04h.002zm-2.746 2.639c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.842 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z" />
    </svg>
  );
}

type ShareChannel = "copy" | "twitter" | "discord" | "image";

type ShareModalProps = {
  playerName: string;
  overall: number;
  archetype: string;
  position?: string;
  stats?: { ppg?: number; rpg?: number; apg?: number };
  season?: { wins: number; losses: number; ppg: number; rpg: number; apg: number };
  playoffs?: { qualified: boolean; seed: number; champion: boolean; series: { round: string; opponent: string; wins: number; losses: number; result: string }[] };
  awards?: string[];
  champion?: boolean;
  legacyStory?: string;
  customImage?: string | null;
  shareUrl?: string;
  lang?: "en" | "zh-CN";
  cardRef?: React.RefObject<HTMLDivElement | null>;
};

const UI = {
  title: { en: "Share Your Legacy", "zh-CN": "分享你的传奇" },
  copyLink: { en: "Copy Link", "zh-CN": "复制链接" },
  copied: { en: "Copied!", "zh-CN": "已复制!" },
  twitter: { en: "Share on X", "zh-CN": "分享到 X" },
  reddit: { en: "Share on Reddit", "zh-CN": "分享到 Reddit" },
  discord: { en: "Copy for Discord", "zh-CN": "复制到 Discord" },
  wechat: { en: "Share to WeChat", "zh-CN": "转发到微信" },
  wechatHint: { en: "Text copied, paste in WeChat", "zh-CN": "已复制，去微信粘贴发送" },
  download: { en: "Download Image", "zh-CN": "下载图片" },
  downloading: { en: "Generating...", "zh-CN": "生成中..." },
  close: { en: "Close", "zh-CN": "关闭" },
};

function t(key: keyof typeof UI, lang: "en" | "zh-CN"): string {
  return UI[key][lang];
}

// --- Canvas helpers ---

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawBadge(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string): number {
  ctx.font = "bold 11px sans-serif";
  const textW = ctx.measureText(text).width;
  const padX = 10;
  const padY = 5;
  const w = textW + padX * 2;
  const h = 20;

  // pill background
  roundRect(ctx, x, y - h + padY, w, h, 10);
  ctx.fillStyle = `${color}20`;
  ctx.fill();
  ctx.strokeStyle = `${color}50`;
  ctx.lineWidth = 1;
  ctx.stroke();

  // text
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + padX, y - h / 2 + padY);

  return x + w + 6; // return next x position
}

// --- Main component ---

export function ShareModal({
  playerName,
  overall,
  archetype,
  position,
  stats,
  season,
  playoffs,
  awards = [],
  champion = false,
  legacyStory,
  customImage,
  shareUrl,
  lang = "en",
  cardRef,
}: ShareModalProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [copiedWechat, setCopiedWechat] = useState(false);
  const [wechatGuide, setWechatGuide] = useState<"chat" | "moments" | null>(null);
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const url = shareUrl || (typeof window !== "undefined" ? window.location.href : "https://hoopervault.com");

  const shareText = lang === "zh-CN"
    ? `我在 HooperVault 打造了一名 ${overall} OVR 的${archetype}！${stats?.ppg ? ` 场均${stats.ppg}分` : ""}${champion ? " 🏆 冠军" : ""} 来挑战我吧 👉 ${url}`
    : `I built a ${overall} OVR ${archetype} in HooperVault!${stats?.ppg ? ` ${stats.ppg} PPG` : ""}${champion ? " 🏆 Champion" : ""} Can you beat mine? 👉 ${url}`;

  const discordText = `🏀 **HooperVault** — ${playerName}\n\n⭐ ${overall} OVR · ${archetype}${stats?.ppg ? `\n📊 ${stats.ppg} PPG · ${stats.rpg} RPG · ${stats.apg} APG` : ""}${champion ? "\n🏆 **NBA Champion**" : ""}${awards.length > 0 ? `\n🎖️ ${awards.join(" · ")}` : ""}\n\n🔗 ${url}`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [url]);

  const handleCopyDiscord = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(discordText);
      setCopiedDiscord(true);
      setTimeout(() => setCopiedDiscord(false), 2000);
    } catch {}
  }, [discordText]);

  const handleTwitter = useCallback(() => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(tweetUrl, "_blank", "width=600,height=400");
  }, [shareText]);

  const redditTitle = lang === "zh-CN"
    ? `我打造了一名 ${overall} OVR 的 ${archetype}！来 HooperVault 挑战我`
    : `I built a ${overall} OVR ${archetype} in HooperVault! Can you beat it?`;

  const handleReddit = useCallback(() => {
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(redditTitle)}`;
    window.open(redditUrl, "_blank", "width=600,height=600");
  }, [url, redditTitle]);

  const wechatText = lang === "zh-CN"
    ? `🏀 HooperVault — ${playerName}\n\n⭐ ${overall} OVR · ${archetype}${stats?.ppg ? `\n📊 ${stats.ppg} PPG · ${stats.rpg} RPG · ${stats.apg} APG` : ""}${champion ? "\n🏆 NBA Champion" : ""}${awards.length > 0 ? `\n🎖️ ${awards.join(" · ")}` : ""}\n\n🔗 ${url}`
    : `🏀 HooperVault — ${playerName}\n\n⭐ ${overall} OVR · ${archetype}${stats?.ppg ? `\n📊 ${stats.ppg} PPG · ${stats.rpg} RPG · ${stats.apg} APG` : ""}${champion ? "\n🏆 NBA Champion" : ""}\n\n🔗 ${url}`;

  const handleWechat = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(wechatText);
      setCopiedWechat(true);
      setTimeout(() => setCopiedWechat(false), 3000);
    } catch {}
  }, [wechatText]);

  const generateShareImage = useCallback(async () => {
    setDownloading(true);
    try {
      const W = 1200;
      const H = 630;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d")!;

      const tierColor = overall >= 95 ? "#F2CA50" : overall >= 90 ? "#6CB9FF" : overall >= 80 ? "#FF5E07" : "#A8A8B3";
      const tier = overall >= 95 ? "Legendary" : overall >= 90 ? "Elite" : overall >= 80 ? "Star" : "Rising";

      // ============ BACKGROUND ============
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, "#0B0B12");
      bgGrad.addColorStop(0.5, "#111317");
      bgGrad.addColorStop(1, "#0B0B12");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Left accent bar
      ctx.fillStyle = tierColor;
      ctx.fillRect(0, 0, 6, H);

      // Subtle radial glow
      const glow = ctx.createRadialGradient(500, 315, 0, 500, 315, 550);
      glow.addColorStop(0, `${tierColor}12`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // ============ LEFT: PLAYER CARD IMAGE ============
      const cardAreaX = 30;
      const cardAreaY = 20;
      const cardAreaW = 460;
      const cardAreaH = H - 40;

      if (cardRef?.current) {
        try {
          const html2canvas = (await import("html2canvas")).default;
          const cardCanvas = await html2canvas(cardRef.current, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
          });
          const cardAspect = cardCanvas.width / cardCanvas.height;
          let drawW = cardAreaW;
          let drawH = drawW / cardAspect;
          if (drawH > cardAreaH) {
            drawH = cardAreaH;
            drawW = drawH * cardAspect;
          }
          const cx = cardAreaX + (cardAreaW - drawW) / 2;
          const cy = cardAreaY + (cardAreaH - drawH) / 2;
          // clip rounded rect
          ctx.save();
          roundRect(ctx, cx, cy, drawW, drawH, 16);
          ctx.clip();
          ctx.drawImage(cardCanvas, cx, cy, drawW, drawH);
          ctx.restore();
        } catch {
          // fallback: draw custom image or placeholder
          await drawFallbackCard(ctx, cardAreaX, cardAreaY, cardAreaW, cardAreaH, tierColor, customImage);
        }
      } else {
        await drawFallbackCard(ctx, cardAreaX, cardAreaY, cardAreaW, cardAreaH, tierColor, customImage);
      }

      // ============ RIGHT: INFO PANEL ============
      const rx = 520;
      const rw = W - rx - 30;
      let cy = 50;

      // Brand
      ctx.fillStyle = "#F2CA50";
      ctx.font = "bold 14px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("HOOPERVAULT", rx, cy);
      cy += 28;

      // Divider line
      ctx.strokeStyle = `${tierColor}30`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rx, cy);
      ctx.lineTo(rx + rw, cy);
      ctx.stroke();
      cy += 14;

      // Player name (large)
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 44px sans-serif";
      ctx.fillText(playerName, rx, cy);
      cy += 52;

      // Position + Archetype
      ctx.fillStyle = tierColor;
      ctx.font = "18px sans-serif";
      const posLabel = position ? `${position} · ` : "";
      ctx.fillText(`${posLabel}${archetype}`, rx, cy);
      cy += 30;

      // OVR badge
      const ovrBoxW = 90;
      const ovrBoxH = 56;
      roundRect(ctx, rx, cy, ovrBoxW, ovrBoxH, 10);
      ctx.fillStyle = "#1a1c20";
      ctx.fill();
      ctx.strokeStyle = `${tierColor}50`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#A8A8B3";
      ctx.font = "10px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("OVR", rx + 10, cy + 8);

      ctx.fillStyle = tierColor;
      ctx.font = "bold 28px sans-serif";
      ctx.fillText(String(overall), rx + 10, cy + 22);

      // Tier badge next to OVR
      const tierBadgeX = rx + ovrBoxW + 12;
      roundRect(ctx, tierBadgeX, cy + 8, 80, 20, 10);
      ctx.fillStyle = `${tierColor}20`;
      ctx.fill();
      ctx.strokeStyle = `${tierColor}50`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = tierColor;
      ctx.font = "bold 11px sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText(tier.toUpperCase(), tierBadgeX + 12, cy + 18);
      ctx.textBaseline = "top";

      // Champion badge
      if (champion) {
        const champX = tierBadgeX + 88;
        roundRect(ctx, champX, cy + 8, 110, 20, 10);
        ctx.fillStyle = "#F2CA5020";
        ctx.fill();
        ctx.strokeStyle = "#F2CA5050";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = "#F2CA50";
        ctx.font = "bold 11px sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillText("🏆 CHAMPION", champX + 10, cy + 18);
        ctx.textBaseline = "top";
      }

      cy += ovrBoxH + 16;

      // ============ SEASON STATUS ============
      if (season) {
        // Divider
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(rx, cy);
        ctx.lineTo(rx + rw, cy);
        ctx.stroke();
        cy += 10;

        ctx.fillStyle = "#F2CA50";
        ctx.font = "bold 10px sans-serif";
        ctx.letterSpacing = "2px";
        ctx.fillText("SEASON STATUS", rx, cy);
        ctx.letterSpacing = "0px";
        cy += 18;

        // Record + stats row
        ctx.font = "15px sans-serif";
        const recordStr = `${season.wins}W - ${season.losses}L`;
        const statsStr = `${season.ppg} PPG  ·  ${season.rpg} RPG  ·  ${season.apg} APG`;

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 16px sans-serif";
        ctx.fillText(recordStr, rx, cy);
        ctx.fillStyle = "#A8A8B3";
        ctx.font = "14px sans-serif";
        ctx.fillText(statsStr, rx + ctx.measureText(recordStr).width + 16, cy + 1);
        cy += 26;

        // Playoff status
        if (playoffs?.qualified) {
          ctx.fillStyle = "#A8A8B3";
          ctx.font = "12px sans-serif";
          ctx.fillText(`Playoff Seed #${playoffs.seed}`, rx, cy);
          cy += 6;

          // Playoff series (compact)
          if (playoffs.series && playoffs.series.length > 0) {
            cy += 10;
            for (const s of playoffs.series) {
              const won = s.result === "W";
              const emoji = s.round === "NBA Finals" ? "🏆" : s.round === "Conference Finals" ? "⚡" : s.round === "Conference Semifinals" ? "🔥" : "🏀";
              ctx.fillStyle = won ? "#F2CA50" : "#FF5E07";
              ctx.font = "11px sans-serif";
              ctx.fillText(`${emoji} ${s.round}: ${s.wins}-${s.losses} vs ${s.opponent} ${won ? "✓" : "✗"}`, rx + 8, cy);
              cy += 16;
            }
          }
        } else {
          ctx.fillStyle = "#A8A8B380";
          ctx.font = "12px sans-serif";
          ctx.fillText("Missed Playoffs", rx, cy);
          cy += 20;
        }
      }

      // ============ AWARDS ============
      if (awards.length > 0) {
        cy += 6;
        let badgeX = rx;
        for (const award of awards) {
          badgeX = drawBadge(ctx, award, badgeX, cy + 12, tierColor);
          if (badgeX > rx + rw - 60) {
            badgeX = rx;
            cy += 24;
          }
        }
        cy += 28;
      }

      // ============ LEGACY STORY ============
      if (legacyStory) {
        cy += 4;
        // Divider
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(rx, cy);
        ctx.lineTo(rx + rw, cy);
        ctx.stroke();
        cy += 10;

        ctx.fillStyle = "#F2CA50";
        ctx.font = "bold 10px sans-serif";
        ctx.fillText("LEGACY STORY", rx, cy);
        cy += 16;

        ctx.fillStyle = "#A8A8B3";
        ctx.font = "12px sans-serif";
        const storyLines = wrapText(ctx, legacyStory, rw);
        for (const line of storyLines.slice(0, 4)) {
          ctx.fillText(line, rx, cy);
          cy += 16;
        }
        cy += 4;
      }

      // ============ BOTTOM CTA ============
      ctx.fillStyle = "#A8A8B360";
      ctx.font = "12px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("Build your own Hooper at hoopervault.com", rx, H - 32);

      // ============ DOWNLOAD ============
      const link = document.createElement("a");
      link.download = `${playerName.replace(/\s+/g, "-").toLowerCase()}-${overall}ovr.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error("Failed to generate share image:", e);
    } finally {
      setDownloading(false);
    }
  }, [playerName, overall, archetype, position, stats, season, playoffs, awards, champion, legacyStory, customImage, cardRef]);

  // Generate a 1:1 square image optimized for WeChat Moments
  const generateMomentsImage = useCallback(async () => {
    setDownloading(true);
    try {
      const S = 1080;
      const canvas = document.createElement("canvas");
      canvas.width = S;
      canvas.height = S;
      const ctx = canvas.getContext("2d")!;

      const tierColor = overall >= 95 ? "#F2CA50" : overall >= 90 ? "#6CB9FF" : overall >= 80 ? "#FF5E07" : "#A8A8B3";
      const tier = overall >= 95 ? "Legendary" : overall >= 90 ? "Elite" : overall >= 80 ? "Star" : "Rising";

      // Background
      const bgGrad = ctx.createLinearGradient(0, 0, S, S);
      bgGrad.addColorStop(0, "#0B0B12");
      bgGrad.addColorStop(0.5, "#111317");
      bgGrad.addColorStop(1, "#0B0B12");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, S, S);

      // Radial glow
      const glow = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, 500);
      glow.addColorStop(0, `${tierColor}18`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, S, S);

      // Top accent bar
      ctx.fillStyle = tierColor;
      ctx.fillRect(0, 0, S, 6);

      // Try card image (top half)
      const cardY = 20;
      const cardH = 480;
      const cardX = 40;
      const cardW = S - 80;

      if (cardRef?.current) {
        try {
          const html2canvas = (await import("html2canvas")).default;
          const cardCanvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 2, useCORS: true });
          const aspect = cardCanvas.width / cardCanvas.height;
          let dw = cardW;
          let dh = dw / aspect;
          if (dh > cardH) { dh = cardH; dw = dh * aspect; }
          ctx.save();
          roundRect(ctx, cardX + (cardW - dw) / 2, cardY + (cardH - dh) / 2, dw, dh, 16);
          ctx.clip();
          ctx.drawImage(cardCanvas, cardX + (cardW - dw) / 2, cardY + (cardH - dh) / 2, dw, dh);
          ctx.restore();
        } catch {
          await drawFallbackCard(ctx, cardX, cardY, cardW, cardH, tierColor, customImage);
        }
      } else {
        await drawFallbackCard(ctx, cardX, cardY, cardW, cardH, tierColor, customImage);
      }

      // Bottom info area
      let cy = cardY + cardH + 30;

      // Brand
      ctx.fillStyle = "#F2CA50";
      ctx.font = "bold 16px sans-serif";
      ctx.textBaseline = "top";
      ctx.textAlign = "center";
      ctx.fillText("HOOPERVAULT", S / 2, cy);
      cy += 30;

      // Player name
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 38px sans-serif";
      ctx.fillText(playerName, S / 2, cy);
      cy += 48;

      // Position + Archetype
      ctx.fillStyle = tierColor;
      ctx.font = "18px sans-serif";
      const posLabel = position ? `${position} · ` : "";
      ctx.fillText(`${posLabel}${archetype}`, S / 2, cy);
      cy += 32;

      // OVR + Tier
      ctx.fillStyle = tierColor;
      ctx.font = "bold 48px sans-serif";
      ctx.fillText(String(overall), S / 2 - 60, cy);
      ctx.fillStyle = "#A8A8B3";
      ctx.font = "14px sans-serif";
      ctx.fillText("OVR", S / 2 - 60, cy + 52);

      // Tier badge
      roundRect(ctx, S / 2 + 10, cy + 10, 80, 28, 14);
      ctx.fillStyle = `${tierColor}20`;
      ctx.fill();
      ctx.strokeStyle = `${tierColor}50`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = tierColor;
      ctx.font = "bold 13px sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText(tier.toUpperCase(), S / 2 + 50, cy + 24);
      ctx.textBaseline = "top";

      // Champion
      if (champion) {
        ctx.fillStyle = "#F2CA50";
        ctx.font = "bold 14px sans-serif";
        ctx.fillText("🏆 CHAMPION", S / 2 + 10, cy + 50);
      }
      cy += 72;

      // Season stats line
      if (season) {
        ctx.fillStyle = "#A8A8B3";
        ctx.font = "15px sans-serif";
        ctx.fillText(`${season.wins}W-${season.losses}L  ·  ${season.ppg} PPG  ·  ${season.rpg} RPG  ·  ${season.apg} APG`, S / 2, cy);
        cy += 24;
      }

      // Awards
      if (awards.length > 0) {
        ctx.fillStyle = `${tierColor}90`;
        ctx.font = "13px sans-serif";
        ctx.fillText(awards.join("  ·  "), S / 2, cy);
        cy += 24;
      }

      // CTA
      ctx.fillStyle = "#A8A8B360";
      ctx.font = "13px sans-serif";
      ctx.fillText("hoopervault.com", S / 2, S - 40);

      ctx.textAlign = "start";

      // Download
      const link = document.createElement("a");
      link.download = `${playerName.replace(/\s+/g, "-").toLowerCase()}-${overall}ovr-moments.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error("Failed to generate moments image:", e);
    } finally {
      setDownloading(false);
    }
  }, [playerName, overall, archetype, position, season, awards, champion, customImage, cardRef]);

  // WeChat share handlers
  const handleWechatChat = useCallback(async () => {
    // 1. Generate and download the wide share image
    await generateShareImage();
    // 2. Copy text to clipboard
    try {
      await navigator.clipboard.writeText(wechatText);
    } catch {}
    setCopiedWechat(true);
    setTimeout(() => setCopiedWechat(false), 3000);
    // 3. Show guide
    setWechatGuide("chat");
  }, [generateShareImage, wechatText]);

  const handleWechatMoments = useCallback(async () => {
    // 1. Generate and download square image
    await generateMomentsImage();
    // 2. Show guide
    setWechatGuide("moments");
  }, [generateMomentsImage]);

  if (!open) {
    return (
      <Button variant="secondary" fullWidth size="xl" onClick={() => setOpen(true)}>
        <Share2 className="h-5 w-5 mr-2" /> {t("title", lang)}
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
      <div className="glass-card rounded-2xl p-6 max-w-md w-full border border-white/10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wide">
            {t("title", lang)}
          </h3>
          <button onClick={() => setOpen(false)} className="text-[#A8A8B3] hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Share preview text */}
        <div className="bg-[#1a1c20] rounded-xl p-4 mb-6 border border-white/5">
          <p className="text-sm text-[#A8A8B3] leading-relaxed">{shareText}</p>
        </div>

        {/* Share channels */}
        <div className="space-y-3">
          {/* Copy Link */}
          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1a1c20] border border-white/5 hover:border-[#F2CA50]/30 hover:bg-[#F2CA50]/5 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F2CA50]/10 flex items-center justify-center flex-shrink-0">
              {copied ? <Check className="h-5 w-5 text-green-400" /> : <Link2 className="h-5 w-5 text-[#F2CA50]" />}
            </div>
            <div>
              <div className="text-white text-sm font-medium">{copied ? t("copied", lang) : t("copyLink", lang)}</div>
              <div className="text-[10px] text-[#A8A8B3] mt-0.5 truncate max-w-[250px]">{url}</div>
            </div>
          </button>

          {/* Twitter/X */}
          <button
            onClick={handleTwitter}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1a1c20] border border-white/5 hover:border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/5 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1DA1F2]/10 flex items-center justify-center flex-shrink-0">
              <XIcon className="h-5 w-5 text-[#1DA1F2]" />
            </div>
            <div>
              <div className="text-white text-sm font-medium">{t("twitter", lang)}</div>
              <div className="text-[10px] text-[#A8A8B3] mt-0.5">
                {lang === "zh-CN" ? "发布到你的 X 时间线" : "Post to your X timeline"}
              </div>
            </div>
          </button>

          {/* Discord */}
          <button
            onClick={handleCopyDiscord}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1a1c20] border border-white/5 hover:border-[#5865F2]/30 hover:bg-[#5865F2]/5 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-[#5865F2]/10 flex items-center justify-center flex-shrink-0">
              {copiedDiscord ? <Check className="h-5 w-5 text-green-400" /> : <DiscordIcon className="h-5 w-5 text-[#5865F2]" />}
            </div>
            <div>
              <div className="text-white text-sm font-medium">{copiedDiscord ? t("copied", lang) : t("discord", lang)}</div>
              <div className="text-[10px] text-[#A8A8B3] mt-0.5">
                {lang === "zh-CN" ? "复制格式化文本到 Discord" : "Copy formatted text for Discord"}
              </div>
            </div>
          </button>

          {/* Reddit */}
          <button
            onClick={handleReddit}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1a1c20] border border-white/5 hover:border-[#FF4500]/30 hover:bg-[#FF4500]/5 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-[#FF4500]/10 flex items-center justify-center flex-shrink-0">
              <RedditIcon className="h-5 w-5 text-[#FF4500]" />
            </div>
            <div>
              <div className="text-white text-sm font-medium">{t("reddit", lang)}</div>
              <div className="text-[10px] text-[#A8A8B3] mt-0.5">
                {lang === "zh-CN" ? "发布到 r/basketball 等社区" : "Post to r/basketball and more"}
              </div>
            </div>
          </button>

          {/* WeChat - Chat */}
          <button
            onClick={handleWechatChat}
            disabled={downloading}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1a1c20] border border-white/5 hover:border-[#07C160]/30 hover:bg-[#07C160]/5 transition-all text-left disabled:opacity-50"
          >
            <div className="w-10 h-10 rounded-lg bg-[#07C160]/10 flex items-center justify-center flex-shrink-0">
              {copiedWechat ? <Check className="h-5 w-5 text-green-400" /> : <WechatIcon className="h-5 w-5 text-[#07C160]" />}
            </div>
            <div>
              <div className="text-white text-sm font-medium">{lang === "zh-CN" ? "发给微信好友" : "Share to WeChat Chat"}</div>
              <div className="text-[10px] text-[#A8A8B3] mt-0.5">
                {lang === "zh-CN" ? "自动下载图片并复制文字" : "Auto-download image + copy text"}
              </div>
            </div>
          </button>

          {/* WeChat - Moments */}
          <button
            onClick={handleWechatMoments}
            disabled={downloading}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1a1c20] border border-white/5 hover:border-[#07C160]/30 hover:bg-[#07C160]/5 transition-all text-left disabled:opacity-50"
          >
            <div className="w-10 h-10 rounded-lg bg-[#07C160]/10 flex items-center justify-center flex-shrink-0">
              <svg className="h-5 w-5 text-[#07C160]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
            </div>
            <div>
              <div className="text-white text-sm font-medium">{lang === "zh-CN" ? "分享到朋友圈" : "Share to Moments"}</div>
              <div className="text-[10px] text-[#A8A8B3] mt-0.5">
                {lang === "zh-CN" ? "生成方形卡片图，保存后发朋友圈" : "Square card image for Moments"}
              </div>
            </div>
          </button>

          {/* Download Image */}
          <button
            onClick={generateShareImage}
            disabled={downloading}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1a1c20] border border-white/5 hover:border-[#F2CA50]/30 hover:bg-[#F2CA50]/5 transition-all text-left disabled:opacity-50"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F2CA50]/10 flex items-center justify-center flex-shrink-0">
              <Download className="h-5 w-5 text-[#F2CA50]" />
            </div>
            <div>
              <div className="text-white text-sm font-medium">{downloading ? t("downloading", lang) : t("download", lang)}</div>
              <div className="text-[10px] text-[#A8A8B3] mt-0.5">1200×630 PNG · Full Legacy Card</div>
            </div>
          </button>
        </div>

        {/* WeChat Guide Overlay */}
        {wechatGuide && (
          <div className="mt-4 p-4 rounded-xl bg-[#07C160]/10 border border-[#07C160]/30">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-[#07C160]">
                {wechatGuide === "chat"
                  ? (lang === "zh-CN" ? "📱 图片已下载，文字已复制" : "📱 Image saved, text copied")
                  : (lang === "zh-CN" ? "📱 方形卡片图已下载" : "📱 Square card image saved")
                }
              </h4>
              <button onClick={() => setWechatGuide(null)} className="text-[#A8A8B3] hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            {wechatGuide === "chat" ? (
              <ol className="text-xs text-[#A8A8B3] space-y-1.5 list-decimal list-inside">
                <li>{lang === "zh-CN" ? "打开微信，进入聊天" : "Open WeChat, go to a chat"}</li>
                <li>{lang === "zh-CN" ? "长按输入框 → 粘贴文字" : "Long press input → Paste text"}</li>
                <li>{lang === "zh-CN" ? "点击 + → 相册 → 选择刚下载的图片" : "Tap + → Album → Select the saved image"}</li>
                <li>{lang === "zh-CN" ? "发送！" : "Send!"}</li>
              </ol>
            ) : (
              <ol className="text-xs text-[#A8A8B3] space-y-1.5 list-decimal list-inside">
                <li>{lang === "zh-CN" ? "打开微信 → 发现 → 朋友圈" : "Open WeChat → Discover → Moments"}</li>
                <li>{lang === "zh-CN" ? "点右上角相机图标" : "Tap the camera icon (top right)"}</li>
                <li>{lang === "zh-CN" ? "选择刚下载的方形卡片图" : "Select the square card image"}</li>
                <li>{lang === "zh-CN" ? "可选：添加文字描述，然后发表" : "Optional: add text, then post"}</li>
              </ol>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Fallback: draw a styled placeholder when cardRef capture fails
async function drawFallbackCard(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  tierColor: string,
  customImage?: string | null,
) {
  // Card background
  roundRect(ctx, x, y, w, h, 16);
  ctx.fillStyle = "#1a1c20";
  ctx.fill();

  // Left color bar inside card
  roundRect(ctx, x, y, 6, h, 3);
  ctx.fillStyle = tierColor;
  ctx.fill();

  if (customImage) {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = customImage;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      ctx.save();
      roundRect(ctx, x + 6, y, w - 6, h, 16);
      ctx.clip();
      const scale = Math.max(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, x + 6 + (w - 6 - dw) / 2, y + (h - dh) / 2, dw, dh);
      ctx.restore();

      // Gradient overlay
      const grad = ctx.createLinearGradient(x, y + h * 0.5, x, y + h);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, "#11131790");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);
    } catch {}
  } else {
    // Generic basketball silhouette placeholder
    ctx.fillStyle = `${tierColor}15`;
    ctx.font = "bold 120px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🏀", x + w / 2, y + h / 2);
    ctx.textAlign = "start";
    ctx.textBaseline = "top";
  }
}
