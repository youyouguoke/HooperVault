import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "使用条款 | HooperVault",
  description: "HooperVault - 用传奇技能打造你的梦想篮球球员，模拟属于你的篮球传奇。",
};

export default function TermsofUsePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-black tracking-tight text-white">使用条款</h1>
      <p className="mt-4 max-w-md text-[#A8A8B3]">此页面正在建设中。请稍后回来，获取完整的 HooperVault 体验。</p>
    </div>
  );
}
