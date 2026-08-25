import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "HooperVault terms of use. Review the rules and guidelines for using our basketball build simulator platform.",
  alternates: {
    canonical: "/en/terms",
    languages: { en: "/en/terms", "zh-CN": "/zh-CN/terms", "x-default": "/en/terms" },
  },
  robots: { index: false, follow: true },
};

export default function TermsofUsePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-black tracking-tight text-white">Terms of Use</h1>
      <p className="mt-4 max-w-md text-[#A8A8B3]">This page is under construction. Check back soon for the full HooperVault experience.</p>
    </div>
  );
}
