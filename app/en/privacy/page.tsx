import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "HooperVault privacy policy. Learn how we collect, use, and protect your personal information on our basketball build simulator.",
  alternates: {
    canonical: "/en/privacy",
    languages: { en: "/en/privacy", "zh-CN": "/zh-CN/privacy", "x-default": "/en/privacy" },
  },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-black tracking-tight text-white">Privacy Policy</h1>
      <p className="mt-4 max-w-md text-[#A8A8B3]">This page is under construction. Check back soon for the full HooperVault experience.</p>
    </div>
  );
}
