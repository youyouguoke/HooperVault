"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { HooperResult } from "@/components/hooper/HooperResult";

function HooperResultWrapper({ lang }: { lang: "en" | "zh-CN" }) {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "sample";
  return <HooperResult slug={slug} lang={lang} />;
}

export default function HooperPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111317]" />}>
      <HooperResultWrapper lang="zh-CN" />
    </Suspense>
  );
}
