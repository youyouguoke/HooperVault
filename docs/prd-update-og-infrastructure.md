# PRD 更新备忘录：OG 基础设施分级方案

## 状态
待写入 PRD 第 12 章（技术架构）和第 7 章（Daily Challenge）。

## 1. 首页 SEO 基础设施（已落地）

所有静态页面已补齐：

- `og:title` / `og:description` / `og:image`（1200×630）
- `og:image:width` / `og:image:height`
- `og:type` / `og:site_name` / `og:locale`
- `twitter:card` = `summary_large_image`
- `twitter:title` / `twitter:description` / `twitter:image`
- `robots` / `googlebot`
- JSON-LD `WebSite` structured data
- `hreflang` + `canonical` 多语言标签

文件位置：

- `app/layout.tsx` —— 全局默认值 + JSON-LD
- `app/en/layout.tsx` —— 英文语义覆盖
- `app/zh-CN/layout.tsx` —— 中文语义覆盖
- 通用 OG 图：`/public/images/og-default.jpg`

## 2. Result Page OG：当前为临时方案

当前 Result Page（`/en/hooper?slug=...` / `/zh-CN/hooper?slug=...`）使用静态导出的通用 OG 图，指向 `/images/og-default.jpg`。

这不是最终方案。真正的 per-slug 动态 OG image 需要单独路由级服务端能力，不应为了这一个功能把整个应用迁移到 SSR。

## 3. 建议写入 PRD 第 12 章的分级架构

### 阶段 1：首页/静态页 SEO（已完成）

利用 Next.js `metadata` + 静态导出即可。所有 build flow 之外的内容型页面都走这条路径。

### 阶段 2：Result Page 动态 OG（技术 spike，1-2 天）

采用 "精准打点" 方案，不动 Next.js 静态导出架构：

1. 新增 Cloudflare Pages Function：`/functions/hooper/[slug].ts`，拦截 `/hooper/{slug}` 请求。
2. Function 内查 D1（或后续 Supabase）拿到 `first_name`、`last_name`、`overall`、`archetype`。
3. 用 `HTMLRewriter` 改写静态 HTML 的 `<head>`，注入正确的 `og:title`、`og:description`、`og:image`。
4. `og:image` 指向另一个 Function：`/functions/og/[slug].ts`，用 `workers-og`（Satori for Workers runtime）实时生成带球员数据的 1200×630 图片。
5. 用户实际访问页面时，页面正文仍由客户端 hydrate 渲染，体验不受影响。只有爬虫会拿到 Function 改写后的第一版 HTML。

### 阶段 3：全站 SSR（MVP 验证后单独评估）

当产品验证过留存和分享率，且需要更复杂的服务端能力（个性化、实时排行榜、A/B 测试等）时，再作为独立基础设施决策评估 `@cloudflare/next-on-pages` 或 Workers Pages Functions SSR 迁移。

## 4. Daily Challenge 实现方式（待写入 PRD 第 7 章）

当前首页 Daily Challenge 模块展示的设计：

> Seed #20260805 · 234 Players Joined  
> Create a Champion Point Guard without Elite Shooting.

实现方式是 **"固定 Seed + 主题限制" 双叠加**：

- 固定 Seed：当天所有玩家共享同一传奇技能池（保证"同场竞技"）。
- 主题限制：叠加一条额外约束（例如位置、禁用某类技能、强制某项属性上限等），增加策略深度。

PRD 第 7 章目前只写了 "固定 Seed"，需要补充这层 "主题限制" 的设计说明，否则文档与实际页面对不上。

## 5. 属性命名核对

首页示例卡片的 "Agility/敏捷" 已改为 "Speed/速度"，与 PRD 13 属性体系一致。实际数据库字段为 `speed`，没有 `agility` 字段。

## 6. 编码问题说明

首页中文区原本使用 🏀 emoji，已替换为 `/images/hero-card.jpg`，避免不同导出/编码环境下出现乱码。Footer 版权符号使用 HTML entity `&copy;`，线上验证无乱码。

## 7. Title / H1 对齐

- 英文首页 H1："Build Your Legacy"  
  Title："Build Your Legacy | HooperVault"
- 中文首页 H1："打造你的传奇"  
  Title："打造你的传奇 | HooperVault"

核心关键词 "Build Your Legacy / 打造你的传奇" 已同时出现在 H1 和 Title 中。
