import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";

type SeoPageHeaderProps = {
  title: string;
  subtitle?: string;
  ctaHref: string;
  ctaLabel: string;
  lang: "en" | "zh-CN";
};

export function SeoPageHeader({ title, subtitle, ctaHref, ctaLabel, lang }: SeoPageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-white/8 bg-[#111317] pt-16 pb-10">
      <div className="stadium-glow" />
      <Container>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-anton)] text-3xl md:text-5xl text-white uppercase tracking-wide mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-[#A8A8B3] mb-6">{subtitle}</p>
          )}
          <Button asChild href={ctaHref} variant="primary" size="lg">
            <span className="flex items-center justify-center gap-2">
              {ctaLabel} <ChevronRight className="h-5 w-5" />
            </span>
          </Button>
        </div>
      </Container>
    </div>
  );
}

export function SeoSection({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <Section className={className}>
      <Container>
        {title && (
          <h2 className="font-[family-name:var(--font-anton)] text-2xl md:text-3xl text-white uppercase tracking-wide mb-6">
            {title}
          </h2>
        )}
        {children}
      </Container>
    </Section>
  );
}

export function RelatedLinks({ links, lang }: { links: { href: string; label: string }[]; lang: "en" | "zh-CN" }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="group flex items-center justify-between glass-card rounded-xl p-4 hover:bg-white/5 transition-all"
        >
          <span className="text-white font-medium group-hover:text-[#F2CA50] transition-colors">{link.label}</span>
          <ChevronRight className="h-4 w-4 text-[#A8A8B3] group-hover:text-[#F2CA50]" />
        </Link>
      ))}
    </div>
  );
}

export function CtaBanner({ title, href, label }: { title: string; href: string; label: string }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#F2CA50]/10 to-[#FF5E07]/10 border border-[#F2CA50]/20 p-8 md:p-12 text-center">
      <h2 className="font-[family-name:var(--font-anton)] text-2xl md:text-4xl text-white uppercase tracking-wide mb-4">
        {title}
      </h2>
      <Button asChild href={href} variant="primary" size="xl">
        <span className="flex items-center justify-center gap-2">
          {label} <ChevronRight className="h-5 w-5" />
        </span>
      </Button>
    </div>
  );
}
