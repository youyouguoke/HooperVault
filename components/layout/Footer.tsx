"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";

function useLang() {
  const pathname = usePathname();
  return pathname?.startsWith("/zh-CN") ? "zh-CN" : "en";
}

const UI = {
  en: {
    tagline: "Build your dream hooper with legendary skills, simulate your career, and create your basketball legacy.",
    groups: [
      {
        title: "Build",
        links: [
          { label: "Start Building", href: "/en/build/mode" },
          { label: "Leaderboard", href: "/en/leaderboard" },
          { label: "Daily Challenge", href: "/en/challenge" },
          { label: "Player Builder", href: "/en/basketball-player-builder" },
          { label: "Build a Bucket Game", href: "/en/build-a-bucket-nba-game" },
        ],
      },
      {
        title: "Explore",
        links: [
          { label: "Guides", href: "/en/guides" },
          { label: "Build Guides", href: "/en/builds" },
          { label: "Archetypes", href: "/en/archetypes" },
          { label: "Legend Skills", href: "/en/legends" },
          { label: "Blog", href: "/en/blog" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/en/privacy" },
          { label: "Terms of Use", href: "/en/terms" },
          { label: "About", href: "/en/about" },
        ],
      },
    ],
    disclaimer: "HooperVault is an independent fan-made basketball project and is not affiliated with, endorsed by, or connected to NBA, NBPA, 2K, Take-Two Interactive, or any basketball organization. Player names and skill references are used for entertainment and informational purposes only.",
    copyright: "All rights reserved.",
  },
  "zh-CN": {
    tagline: "用传奇技能打造你的梦想 Hooper，模拟职业生涯，创造属于你的篮球传奇。",
    groups: [
      {
        title: "构建",
        links: [
          { label: "开始构建", href: "/zh-CN/build/mode" },
          { label: "排行榜", href: "/zh-CN/leaderboard" },
          { label: "每日挑战", href: "/zh-CN/challenge" },
          { label: "球员构建器", href: "/zh-CN/basketball-player-builder" },
          { label: "Build a Bucket 游戏", href: "/zh-CN/build-a-bucket-nba-game" },
        ],
      },
      {
        title: "探索",
        links: [
          { label: "指南", href: "/zh-CN/guides" },
          { label: "构建指南", href: "/zh-CN/builds" },
          { label: "球风", href: "/zh-CN/archetypes" },
          { label: "传奇技能", href: "/zh-CN/legends" },
          { label: "博客", href: "/zh-CN/blog" },
        ],
      },
      {
        title: "法律",
        links: [
          { label: "隐私政策", href: "/zh-CN/privacy" },
          { label: "使用条款", href: "/zh-CN/terms" },
          { label: "关于", href: "/zh-CN/about" },
        ],
      },
    ],
    disclaimer: "HooperVault 是一个独立的球迷篮球项目，与 NBA、NBPA、2K、Take-Two Interactive 或任何篮球组织均无关联、认可或合作关系。球员姓名和技能引用仅用于娱乐和信息目的。",
    copyright: "保留所有权利。",
  },
};

export function Footer() {
  const lang = useLang();
  const ui = UI[lang];
  const homeHref = lang === "zh-CN" ? "/zh-CN" : "/en";

  return (
    <footer className="border-t border-white/8 bg-[#0B0B12]">
      <Container>
        <div className="py-12">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <Link href={homeHref} className="inline-flex items-center gap-2 text-2xl font-black tracking-tight text-[#F5C542]">
                <img
                  src="/images/logo-40.png"
                  alt="HooperVault"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-lg object-contain"
                />
                HooperVault
              </Link>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#A8A8B3]">
                {ui.tagline}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-3">
              {ui.groups.map((group) => (
                <div key={group.title}>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                    {group.title}
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#A8A8B3] transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-white/8 pt-8">
            <p className="text-xs leading-relaxed text-[#A8A8B3]/70">
              {ui.disclaimer}
            </p>
            <p className="mt-4 text-xs text-[#A8A8B3]/50">
              &copy; {new Date().getFullYear()} HooperVault. {ui.copyright}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
