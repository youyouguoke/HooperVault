import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "使用条款",
  description: "HooperVault 使用条款。查看使用我们篮球构建模拟器平台的规则和指南。",
  alternates: {
    canonical: "/zh-CN/terms",
    languages: { en: "/en/terms", "zh-CN": "/zh-CN/terms", "x-default": "/en/terms" },
  },
  robots: { index: true, follow: true },
};

export default function TermsofUsePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-black tracking-tight text-white">使用条款</h1>
      <p className="mt-4 max-w-md text-[#A8A8B3]">此页面正在建设中。请稍后回来，获取完整的 HooperVault 体验。</p>
    </div>
  );
}
