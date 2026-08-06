# PRD Update Memo: Draft Legendary Skills

## 1. PRD 涉及章节

- PRD 第 5.3 节（Legendary Skill Draft / 属性系统）
- PRD 第 6 章（Build Flow）
- PRD 第 7 章（Daily Challenge Seed 机制）

## 2. 实际实现与 PRD 的偏差

| 原 PRD 描述 | 实际实现 | 是否需要写回 PRD |
|---|---|---|
| Draft Legendary Skills 直接抽取技能卡 | 增加前置步骤：先抽取历史球队（Team Spinner），再从该队球员中抽取技能 | ✅ 是 |
| 技能卡使用虚构绰号/技能名 | 技能卡以真实球员全名（如 Michael Jordan, Hakeem Olajuwon）为主体，技能名作为招牌技 | ✅ 是 |
| Inspiration 字段使用品牌化短语（如 Mamba Mentality） | Inspiration 改为 `真实球员全名, 赛季 球队名` 格式 | ✅ 是 |
| 无球队层 | 新增内置历史球队数据集（20 支真实球队） | ✅ 是 |
| Build Flow 为 mode → position → draft | 实际流程为 mode → team → position → draft → preview | ✅ 是 |

## 3. 数据层

- **文件：** `data/teams.ts`
- **内容：** 20 支 NBA 历史球队，每队 3 名传奇球员，每名球员 2 项招牌技能
- **可验证性：** 球队赛季、战绩、球员全名均基于公开可查的 NBA 历史记录
- **免责声明：** 页面 footer 已加入独立免责声明，说明 HooperVault 为 fan-made 项目，不与 NBA/NBPA/2K 等组织关联

## 4. 抽队逻辑

- 由 Daily Challenge Seed 决定候选球队池（默认 3 支）
- 用户通过转盘/抽选 UI 从池中选择 1 支球队
- 同一 seed 下所有用户看到的候选池相同，保证"同场竞技"体验
- 流程：`/build/mode?mode=classic` → `/build/team` → `/build/position` → `/build/draft` → `/build/preview`

## 5. 技能卡结构

```
Heading: 真实球员全名 (classic) / ??? (blind)
Subtitle: 招牌技能名
Description: 技能效果描述
Attribute: 加成属性 + 数值
Inspiration: 真实球员全名, 赛季 球队名
```

## 6. 待写回 PRD 的文案建议

### 第 5.3 节新增段落

> **Legendary Team Draft**  
> 在 Draft Legendary Skills 之前，玩家必须先通过"传奇球队转盘"抽取一支历史赛季球队。该候选池由 Daily Challenge Seed 锁定，确保同一轮 Daily Challenge 中所有玩家面对的是相同的球队候选池。每支球队包含 3 名真实历史球员，每名球员映射 2 项招牌技能。
>
> 技能卡以真实球员全名为主标题（Blind Mode 下隐藏），技能名为副标题，Inspiration 字段明确标注球员全名、赛季及球队名，避免使用虚构或品牌化短语作为主体标识。

### 第 6 章 Build Flow 更新

从：

1. Choose Mode → 2. Pick Position → 3. Draft Skills → 4. Preview → 5. Simulate

改为：

1. Choose Mode → 2. Draft Legendary Team → 3. Pick Position → 4. Draft Skills → 5. Preview → Simulate

## 7. 已知限制

- 当前球员图片使用通用占位图（`draft-icon-1.jpg` / `draft-icon-2.jpg`），未使用真实球员头像
- 球队未展示真实队徽
- 20 支球队为最小数据集，后续可扩展

## 8. 上线验证

- 部署 URL：https://4f2973d7.hoopervault.pages.dev
- 测试路径：`/en/build/team?mode=classic` → `/en/build/draft?position=SG&mode=classic&team=93-94-rockets&seed=20260805`
- 已验证：球队名、战绩、球员全名、技能名、Inspiration 字段均正确显示
