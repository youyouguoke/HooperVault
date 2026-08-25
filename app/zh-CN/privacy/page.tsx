import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "HooperVault 隐私政策。了解我们如何收集、使用和保护您在篮球构建模拟器上的个人信息。",
  alternates: {
    canonical: "/zh-CN/privacy",
    languages: { en: "/en/privacy", "zh-CN": "/zh-CN/privacy", "x-default": "/en/privacy" },
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-black tracking-tight text-white">隐私政策</h1>
      <p className="mt-4 max-w-md text-[#A8A8B3]">此页面正在建设中。请稍后回来，获取完整的 HooperVault 体验。</p>
    </div>
  );
}
