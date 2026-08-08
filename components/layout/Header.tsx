"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Menu, X, Globe } from "lucide-react";

function useLang() {
  const pathname = usePathname();
  return pathname?.startsWith("/zh-CN") ? "zh-CN" : "en";
}

function localizedHref(path: string, lang: "en" | "zh-CN") {
  if (path.startsWith("/en/") || path === "/en") {
    return lang === "zh-CN" ? path.replace(/^\/en/, "/zh-CN") : path;
  }
  if (path.startsWith("/zh-CN/") || path === "/zh-CN") {
    return lang === "en" ? path.replace(/^\/zh-CN/, "/en") : path;
  }
  return path;
}

const UI = {
  en: {
    nav: [
      { href: "/en/build/mode", label: "Build" },
      { href: "/en/leaderboard", label: "Leaderboard" },
      { href: "/en/challenge", label: "Daily Challenge" },
      { href: "/en/guides", label: "Guides" },
      { href: "/en/about", label: "About" },
    ],
    cta: "Start Building",
    switchLang: "EN",
    switchLabel: "Switch to 中文",
  },
  "zh-CN": {
    nav: [
      { href: "/zh-CN/build/mode", label: "构建" },
      { href: "/zh-CN/leaderboard", label: "排行榜" },
      { href: "/zh-CN/challenge", label: "每日挑战" },
      { href: "/zh-CN/guides", label: "指南" },
      { href: "/zh-CN/about", label: "关于" },
    ],
    cta: "开始构建",
    switchLang: "中文",
    switchLabel: "Switch to English",
  },
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const lang = useLang();
  const otherLang = lang === "zh-CN" ? "en" : "zh-CN";
  const ui = UI[lang];
  const homeHref = lang === "zh-CN" ? "/zh-CN" : "/en";
  const switchHref = localizedHref(usePathname() || "/en", otherLang);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0B0B12]/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href={homeHref} className="flex items-center gap-2">
            <img
              src="/images/logo-40.png"
              alt="HooperVault"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-contain"
            />
            <span className="text-2xl font-black tracking-tight text-[#F5C542]">
              HooperVault
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {ui.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#A8A8B3] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={switchHref}
              className="flex items-center gap-1.5 text-sm font-medium text-[#A8A8B3] transition-colors hover:text-white"
            >
              <Globe className="h-4 w-4" />
              <span>{ui.switchLang}</span>
            </Link>
            <Button asChild size="sm">
              <Link href={ui.nav[0].href}>{ui.cta}</Link>
            </Button>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="border-t border-white/8 bg-[#0B0B12] md:hidden">
          <Container>
            <nav className="flex flex-col gap-1 py-4">
              {ui.nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-[#A8A8B3] transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-3 border-t border-white/8 pt-4">
                <Button asChild fullWidth>
                  <Link href={ui.nav[0].href} onClick={() => setMobileOpen(false)}>
                    {ui.cta}
                  </Link>
                </Button>
                <Link
                  href={switchHref}
                  className="flex items-center justify-center gap-2 text-sm font-medium text-[#A8A8B3]"
                  onClick={() => setMobileOpen(false)}
                >
                  <Globe className="h-4 w-4" />
                  <span>{ui.switchLabel}</span>
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
