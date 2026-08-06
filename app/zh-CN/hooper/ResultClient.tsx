"use client";

import { useSearchParams } from "next/navigation";
import { HooperResult } from "@/components/hooper/HooperResult";

export function HooperResultClient({ lang }: { lang: "en" | "zh-CN" }) {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "sample";
  return <HooperResult slug={slug} lang={lang} />;
}
