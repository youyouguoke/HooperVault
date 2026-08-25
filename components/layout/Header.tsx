"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Menu, X, Globe, ChevronDown, LogOut, User } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

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
    ],
    explore: {
      label: "Explore",
      items: [
        { href: "/en/guides", label: "Guides" },
        { href: "/en/builds", label: "Build Guides" },
        { href: "/en/archetypes", label: "Archetypes" },
        { href: "/en/legends", label: "Legend Skills" },
        { href: "/en/about", label: "About" },
      ],
    },
    cta: "Start Building",
    switchLang: "EN",
    switchLabel: "Switch to 中文",
  },
  "zh-CN": {
    nav: [
      { href: "/zh-CN/build/mode", label: "构建" },
      { href: "/zh-CN/leaderboard", label: "排行榜" },
      { href: "/zh-CN/challenge", label: "每日挑战" },
    ],
    explore: {
      label: "探索",
      items: [
        { href: "/zh-CN/guides", label: "指南" },
        { href: "/zh-CN/builds", label: "构建指南" },
        { href: "/zh-CN/archetypes", label: "球风" },
        { href: "/zh-CN/legends", label: "传奇技能" },
        { href: "/zh-CN/about", label: "关于" },
      ],
    },
    cta: "开始构建",
    switchLang: "中文",
    switchLabel: "Switch to English",
  },
};

function ExploreDropdown({ lang }: { lang: "en" | "zh-CN" }) {
  const [open, setOpen] = useState(false);
  const ui = UI[lang];

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm font-medium text-[#A8A8B3] transition-colors hover:text-white">
        {ui.explore.label} <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-2 w-44">
          <div className="rounded-xl border border-white/10 bg-[#111317]/95 backdrop-blur-xl p-2 shadow-xl">
            {ui.explore.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm text-[#A8A8B3] transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function UserMenu({ lang }: { lang: "en" | "zh-CN" }) {
  const { user, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) return null;

  if (!user) {
    return (
      <a
        href="/auth/google/start"
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 hover:from-amber-400 hover:via-orange-400 hover:to-orange-500 transition-all px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:shadow-md"
      >
        <GoogleIcon className="w-4 h-4" />
        <span>SIGN IN</span>
      </a>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors pl-1 pr-3 py-1"
      >
        {user.image ? (
          <img src={user.image} alt="" className="w-7 h-7 rounded-full" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#F5C542] flex items-center justify-center">
            <span className="text-xs font-bold text-black">{(user.name || user.email || "U").charAt(0).toUpperCase()}</span>
          </div>
        )}
        <span className="text-sm font-medium text-white max-w-[100px] truncate hidden sm:inline">
          {user.name || user.email?.split("@")[0] || "User"}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 text-[#A8A8B3] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#111317]/95 backdrop-blur-xl p-2 shadow-xl z-50">
          <div className="flex items-center gap-2 px-3 py-2 mb-1">
            {user.image ? (
              <img src={user.image} alt="" className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#F5C542] flex items-center justify-center">
                <span className="text-sm font-bold text-black">{(user.name || "U").charAt(0)}</span>
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-[#A8A8B3] truncate">{user.email}</p>
            </div>
          </div>
          <div className="border-t border-white/8 my-1" />
          <button
            onClick={() => { setOpen(false); signOut(); }}
            className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#A8A8B3] hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {lang === "zh-CN" ? "退出登录" : "Sign Out"}
          </button>
        </div>
      )}
    </div>
  );
}

// Google "G" logo SVG
function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

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

          <nav className="hidden items-center gap-6 md:flex">
            {ui.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#A8A8B3] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <ExploreDropdown lang={lang} />
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button asChild size="sm">
              <Link href={ui.nav[0].href}>{ui.cta}</Link>
            </Button>
            <Link
              href={switchHref}
              className="flex items-center gap-1.5 text-sm font-medium text-[#A8A8B3] transition-colors hover:text-white"
            >
              <Globe className="h-4 w-4" />
              <span>{ui.switchLang}</span>
            </Link>
            <UserMenu lang={lang} />
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
              <div className="border-t border-white/8 pt-2">
                <p className="px-3 py-2 text-xs uppercase tracking-wider text-[#A8A8B3]/60">
                  {ui.explore.label}
                </p>
                {ui.explore.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-[#A8A8B3] transition-colors hover:bg-white/5 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
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
