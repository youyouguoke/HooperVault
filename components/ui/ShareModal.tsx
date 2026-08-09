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

// Discord icon (not in lucide)
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  );
}

type ShareChannel = "copy" | "twitter" | "discord" | "image";

type ShareModalProps = {
  playerName: string;
  overall: number;
  archetype: string;
  stats?: { ppg?: number; rpg?: number; apg?: number };
  awards?: string[];
  champion?: boolean;
  shareUrl?: string;
  lang?: "en" | "zh-CN";
  cardRef?: React.RefObject<HTMLDivElement | null>;
};

const UI = {
  title: { en: "Share Your Legacy", "zh-CN": "分享你的传奇" },
  copyLink: { en: "Copy Link", "zh-CN": "复制链接" },
  copied: { en: "Copied!", "zh-CN": "已复制!" },
  twitter: { en: "Share on X", "zh-CN": "分享到 X" },
  discord: { en: "Copy for Discord", "zh-CN": "复制到 Discord" },
  download: { en: "Download Image", "zh-CN": "下载图片" },
  downloading: { en: "Generating...", "zh-CN": "生成中..." },
  close: { en: "Close", "zh-CN": "关闭" },
};

function t(key: keyof typeof UI, lang: "en" | "zh-CN"): string {
  return UI[key][lang];
}

export function ShareModal({
  playerName,
  overall,
  archetype,
  stats,
  awards = [],
  champion = false,
  shareUrl,
  lang = "en",
  cardRef,
}: ShareModalProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);
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

  const generateShareImage = useCallback(async () => {
    setDownloading(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext("2d")!;

      // Background
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
      bgGrad.addColorStop(0, "#0B0B12");
      bgGrad.addColorStop(0.5, "#111317");
      bgGrad.addColorStop(1, "#0B0B12");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 630);

      // Accent bar
      const tierColor = overall >= 95 ? "#F2CA50" : overall >= 90 ? "#6CB9FF" : overall >= 80 ? "#FF5E07" : "#A8A8B3";
      ctx.fillStyle = tierColor;
      ctx.fillRect(0, 0, 8, 630);

      // Glow effect
      const glow = ctx.createRadialGradient(600, 315, 0, 600, 315, 500);
      glow.addColorStop(0, `${tierColor}15`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 1200, 630);

      // Try to draw the player card image if cardRef is provided
      if (cardRef?.current) {
        try {
          const html2canvas = (await import("html2canvas")).default;
          const cardCanvas = await html2canvas(cardRef.current, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
          });
          // Draw card image on the left side
          const cardAspect = cardCanvas.width / cardCanvas.height;
          const drawHeight = 500;
          const drawWidth = drawHeight * cardAspect;
          ctx.drawImage(cardCanvas, 60, 65, drawWidth, drawHeight);
        } catch {
          // Fallback: just draw text
        }
      }

      // Title area
      const textX = 650;

      // "HooperVault" brand
      ctx.fillStyle = "#F2CA50";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText("HOOPERVAULT", textX, 80);

      // Player name
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 52px sans-serif";
      ctx.fillText(playerName, textX, 150);

      // Archetype
      ctx.fillStyle = tierColor;
      ctx.font = "24px sans-serif";
      ctx.fillText(archetype, textX, 190);

      // OVR box
      ctx.fillStyle = "#1a1c20";
      ctx.strokeStyle = `${tierColor}80`;
      ctx.lineWidth = 2;
      roundRect(ctx, textX, 220, 120, 80, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#A8A8B3";
      ctx.font = "12px sans-serif";
      ctx.fillText("OVR", textX + 10, 245);

      ctx.fillStyle = tierColor;
      ctx.font = "bold 36px sans-serif";
      ctx.fillText(String(overall), textX + 10, 285);

      // Stats
      if (stats?.ppg) {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "20px sans-serif";
        ctx.fillText(`${stats.ppg} PPG  ·  ${stats.rpg} RPG  ·  ${stats.apg} APG`, textX, 340);
      }

      // Champion badge
      if (champion) {
        ctx.fillStyle = "#F2CA50";
        ctx.font = "bold 18px sans-serif";
        ctx.fillText("🏆 NBA Champion", textX, 380);
      }

      // Awards
      if (awards.length > 0) {
        ctx.fillStyle = "#A8A8B3";
        ctx.font = "16px sans-serif";
        ctx.fillText(awards.join("  ·  "), textX, 410);
      }

      // Bottom CTA
      ctx.fillStyle = "#A8A8B380";
      ctx.font = "14px sans-serif";
      ctx.fillText("Build your own Hooper at hoopervault.com", textX, 560);

      // Download
      const link = document.createElement("a");
      link.download = `${playerName.replace(/\s+/g, "-").toLowerCase()}-${overall}ovr.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error("Failed to generate share image:", e);
    } finally {
      setDownloading(false);
    }
  }, [playerName, overall, archetype, stats, awards, champion, cardRef]);

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
              <div className="text-[10px] text-[#A8A8B3] mt-0.5">1200×630 PNG</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

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
