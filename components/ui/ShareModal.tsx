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
  const [copiedWechat, setCopiedWechat] = useState(false);
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

          {/* WeChat */}
          <button
            onClick={handleWechat}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1a1c20] border border-white/5 hover:border-[#07C160]/30 hover:bg-[#07C160]/5 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-[#07C160]/10 flex items-center justify-center flex-shrink-0">
              {copiedWechat ? <Check className="h-5 w-5 text-green-400" /> : <WechatIcon className="h-5 w-5 text-[#07C160]" />}
            </div>
            <div>
              <div className="text-white text-sm font-medium">{copiedWechat ? t("wechatHint", lang) : t("wechat", lang)}</div>
              <div className="text-[10px] text-[#A8A8B3] mt-0.5">
                {lang === "zh-CN" ? "复制文字，打开微信粘贴发送" : "Copy text, then paste in WeChat"}
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
