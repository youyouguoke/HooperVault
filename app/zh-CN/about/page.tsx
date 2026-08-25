import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { JsonLd, buildBreadcrumbList } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "关于",
  description: "HooperVault 是一个球迷自制的篮球实验室，草拟传奇技能、打造独特 Hooper、模拟82场比赛传奇。无真实阵容，无付费制胜。",
  keywords: ["关于 hoopervault", "篮球构建模拟器", "球迷自制篮球游戏", "篮球草拟模拟器"],
  alternates: {
    canonical: "/zh-CN/about",
    languages: { en: "/en/about", "zh-CN": "/zh-CN/about", "x-default": "/en/about" },
  },
  openGraph: {
    type: "website",
    siteName: "HooperVault",
    title: "关于",
    description: "HooperVault 是一个球迷自制的篮球实验室，草拟传奇技能、打造独特 Hooper、模拟82场比赛传奇。",
    url: "/zh-CN/about",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "zh_CN",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbList([{ name: "首页", href: "/zh-CN" }, { name: "关于", href: "/zh-CN/about" }])} />
      <Section className="relative border-b border-white/8 bg-[#111317] pt-16 pb-8">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-widest text-[#F2CA50] font-bold mb-3">
              我们的使命
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl md:text-6xl text-white uppercase tracking-wide mb-6">
              关于 HooperVault
            </h1>
            <p className="text-[#A8A8B3] text-lg leading-relaxed">
              HooperVault 是一个球迷打造的篮球实验室。在这里，你可以抽取传奇技能、构建独一无二的 Hooper，并模拟一整个 82 场赛季。没有真实阵容、没有氪金门槛，只有你的选择、你的球员，以及数据给出的答案。
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto grid gap-12">
            <div>
              <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-3">HooperVault 是什么？</h2>
              <p className="text-[#A8A8B3] leading-relaxed">
                我们热爱篮球构建，但不想让你被无法控制的评分系统束缚。HooperVault 给你一张干净的选秀桌：13 轮、3 种模式、一个永久 Hooper。每一项技能都会改变属性、徽章和故事线，最终得到一张真正由你创造的球员卡。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "选秀", desc: "在终结、投射、组织、防守四大维度中抽取 13 项传奇技能。" },
                { title: "构建", desc: "选择位置和模式，它们决定了你的属性基线和成长方式。" },
                { title: "模拟", desc: "运行 82 场赛季，看看你的选择能转化为多少胜利。" },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-6">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm uppercase tracking-wider text-[#F2CA50] mb-2">{item.title}</h3>
                  <p className="text-[#A8A8B3] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wide mb-3">适合谁玩？</h2>
              <p className="text-[#A8A8B3] leading-relaxed">
                休闲篮球迷、 fantasy 玩家、2K 建模爱好者，以及任何争论过“史上最强控卫该长什么样”的人。HooperVault 为那些既享受比赛、也热爱篮球理论的人而设计。
              </p>
            </div>

            <div className="glass-card rounded-xl p-6 md:p-8 border-l-4 border-[#F2CA50]">
              <p className="text-white/90 italic leading-relaxed">
                "我们不是要取代 NBA 或 2K。我们想做出互联网上最简单、最耐玩的篮球构建玩具。"
              </p>
              <p className="text-[#F2CA50] text-sm mt-4 font-[family-name:var(--font-space-grotesk)] uppercase tracking-wider">— HooperVault 团队</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
