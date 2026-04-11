# SBTI 人格测试项目 — 交接说明

## 项目位置
`C:\Users\高\Desktop\SBTI人格测试`

## 技术栈
React + TypeScript + Vite + Tailwind CSS，纯前端无后端

## 当前状态
开发服务器已在运行（端口可能是 5173 或 5174），功能完整可测试。

---

## 完整开发历史

### 第一轮：基础优化
- **重写全部 27 种人格描述文案**: 网络热梗+疯癫有趣风格，比原来更长更生动
- **创建 PersonalityAvatar 组件**: 带光晕、渐变、动态点缀的风格化头像，替代纯 emoji 显示
- **更新 ResultPage + GalleryPage**: 使用新头像组件，描述文字左对齐+首行缩进
- **data.ts 新增 avatar 字段**: 预留二次元头像图片路径，目前使用 CSS 风格化头像作为降级
- **二次元头像已生成**: 使用豆包 Seedream 5.0 模型 (`doubao-seedream-5-0-260128`) 成功生成 27 张二次元 Q 版头像
  - 模型要求图片尺寸至少 3686400 像素，使用 1920x1920
  - API Key 格式：火山方舟 API Key（`Bearer {key}` 格式，不要加分号）
  - 豆包 API 地址：`https://ark.cn-beijing.volces.com/api/v3/images/generations`
  - 需要在火山方舟控制台开通 Seedream 图片生成模型
  - 混元图片生成 (hunyuan-image) 持续超时不可用
  - Pollinations.ai 免费但限流严重（429 Too Many Requests）
- **PersonalityAvatar 组件已更新**: 支持 avatar 图片路径，有图片时展示圆形裁剪+光晕，无图片降级为 emoji
- **data.ts 已添加 avatar 字段**: 27 种人格均指向 `/avatars/{id}.png`
- 用户偏好：二次元/动漫风格图片 + 网络热梗疯癫文案
- 豆包 API Key: 4b6879a1-0159-42c4-88cd-c3e35dbb5ebb（注：这不是 ek- 开头的标准 API Key，但 Bearer 认证可通过）
- **十五维指纹表格已实现**: 替换了原来用 Math.random() 的假雷达图
  - 新增 `dimensionDefs`（15 维度定义）、`dimensionInterpretations`（H/M/L 解读文案）、`modelDescriptions`（5 套模型说明）
  - 每个性格新增 `dimensions`（15 维落点）、`mbti`（MBTI 对照）、`similar`（相似人格）字段
  - 新建 `DimensionFingerprint.tsx` 组件：5 套模型分组展示，每个维度带 H/M/L 标签 + 中文解读
  - 底部有维度落点总览条，hover 可看详细解读
  - 配色：H=翠绿，M=琥珀，L=玫红
- **SBTI × MBTI 对照已实现**: 新建 MbtiComparison.tsx 组件
  - MBTI 类型以彩色徽章高亮展示，hover 显示字母含义
  - 动态生成"为什么像"的解读文案（基于 mbtiKeywords 映射 + 性格名拼接）
  - 底部双栏：MBTI 侧（免责+定位）和 SBTI 侧（强调自身更贴脸）
  - 覆盖全部 16 种 MBTI 类型的关键词描述

### 第二轮：大规模优化
- **SimilarPersonalities.tsx**: 相似人格推荐，点击可直接跳转查看报告
- **ShareCard.tsx**: 分享卡片组件，支持 html2canvas 截图下载 + 复制文案分享（安装了 html2canvas 依赖）
- **ResultPage.tsx**: 整合了分享卡片、十五维指纹、MBTI对照、相似人格、匹配度排行
- **QuizPage.tsx**: 答题体验大幅优化
  - 每题有不同趣味提示语（31条轮播）
  - 题号装饰（Q1/Q2... 标签）
  - 加载结果时文案逐步出现（8条轮播），进度条同步
  - 选项选中动画 0.5s 过渡
- **LandingPage.tsx**: 首页大幅扩展
  - 新增「五套人格模型」介绍区
  - 新增 FAQ 折叠面板（5个常见问题）
  - 新增底部 CTA 区域
- **GalleryPage.tsx**: 图鉴页优化
  - 新增模型筛选器（全部/自我/情感/态度/行动/社交）
  - 每个人格卡片底部显示维度落点色条
  - 模态框重写：渐变头部+可滚动内容+维度总览+MBTI标签
- **App.tsx**: 添加页面切换时滚动到顶部，传递 onViewPersonality
- **移动端优化 (index.css)**: 100dvh 支持、safe-area、消除点击高亮、防弹跳、touch 反馈、文字选择控制、动画、滚动条样式

### 第三轮：液态玻璃 + 随机题目 + 移动端间距
- **液态玻璃**: index.css 新增 liquidMorph/liquidGlow/liquidFloat/blobMove 动画，.liquid-bg 背景容器+3个光球，glass-card 增加光泽线和径向光斑，quiz-option 液态选项
- **头像液态化**: PersonalityAvatar lg/xl 用 liquidMorph 变形+外圈 ring 两层+玻璃高光
- **题目随机化**: QuizPage 用 Fisher-Yates 洗牌，每次进入题目顺序不同
- **移动端间距**: body 15px/1.7行高，按钮 48px，选项 14px 18px padding，标题 text-xl
- CSS 修复：@supports 替代错误的 .supports-[...]

### 第四轮：仿照 liquid-glass.org 全面液态玻璃重构
- 参考网站: https://www.liquid-glass.org/zh/ (Apple 液态玻璃概念站)
- 背景从纯黑 `#0a0a0a` → `#0f0f1a` → 最终 `#eef0f7`（亮色背景，液态玻璃效果在亮色下更好看）
- glass-card 从暗色改为亮色 `rgba(255,255,255,0.60)` + `backdrop-filter: blur(40px) saturate(150%)`
- 新增 inset 高光: `inset 0 1px 20px rgba(255,255,255,0.1)`
- 新增顶部光泽条 `::before` + 径向光斑 `::after`
- 边框 `rgba(255,255,255,0.50)` 仿照液态玻璃折射边缘
- 圆角从 20px 提升到 24px (rounded-3xl)
- 全部组件更新：LandingPage、QuizPage、ResultPage、GalleryPage、PersonalityAvatar、DimensionFingerprint、MbtiComparison、SimilarPersonalities、ShareCard

### 第五轮：深入学习 liquid-glass.org 开发者专区设计
- 从浏览器 computed styles 提取关键参数
- 背景色改为 #eef0f7（亮色系）
- glass-card inset 从 1px 1px → 1px 20px（更强内发光）
- 新增CSS类: .glass-icon、.glass-tab-container/.glass-tab/.glass-tab-active、.glass-accordion/.glass-accordion-header/.glass-accordion-content、.glass-step-number
- LandingPage: 模型卡片改为5列grid + glass-icon渐变图标容器 + FAQ改为手风琴
- 文字统一 gray-800/gray-700 色系

### 第六轮：潮玩盲盒风头像替换
- 使用豆包 Seedream 5.0 重新生成全部 27 张潮玩盲盒风（Pop Mart style）头像
- 每张英文 prompt，chibi 比例、glossy vinyl 材质、3D 渲染、专属颜色渐变背景
- 首次批量生成 19/27 成功，8 张因限流失败
- 补生成脚本（10秒间隔 + 限流时递增等待），8/8 全部成功
- 27 张头像已替换到 `public/avatars/`
- 豆包 API 限流策略：连续请求约 20 张后开始 429，需等 60-180 秒恢复

### 第七轮：全站 emoji 替换为头像
- LandingPage「你可能是什么人格？」区域：emoji → PersonalityAvatar 组件
- SimilarPersonalities 组件：手动写的 emoji 圆圈 → PersonalityAvatar 组件
- ShareCard 分享卡片：emoji → 头像图片（带 fallback）
- 文字分享文案中的 emoji 保留（纯文本用 emoji 没问题）

### 第八轮：题库扩充（规划）
- 用户要求：将 31 道题扩充到 200+ 道，每次测试随机抽 31 道
- 已参考 sbti.dev 原版题库（30道维度式题目）

### 第九轮：首页五套模型展现优化
- 原来是单张 glass-card 内用列表排 5 个模型 → 改为 5 张独立 glass-card
- 每张卡片：大 emoji 圆角方块 + 模型名 + 描述 + 三个维度标签（带 H/M/L 标识）
- 维度标签有渐变底色和 hover 上浮动效
- 整体用 modelMeta 数组管理每个模型的 icon、color、gradient

### 第十轮：题库扩充（已完成）
- 原有 31 道题扩充到 202 道（id 1-202）
- 新增 171 道题（id 32-202），覆盖日常生活、社交、情感、工作、消费、价值观、情绪、习惯、世界观等主题
- 每道题 4 个选项，每个选项 2-3 个人格得分映射，保持疯癫有趣风格
- QuizPage 修改：每次测试从 202 道题库中随机抽取 31 道（QUIZ_LENGTH 常量控制）
- 使用 Fisher-Yates 洗牌 + slice(0, 31) 实现随机抽题

### 第十一轮：答题框文字拥挤 + 玻璃框遮挡内容修复
- **选项间距**: `space-y-3.5/4` → `space-y-5/7`（20px/28px）
- **选项左边距**: CSS `!important` 控制，桌面 56px / 移动 48px（Tailwind 类不生效，改用 CSS 强制）
- **选项文字**: `text-base / text-[17px]`，行高 `leading-[1.75]`
- **题目文字**: `text-2xl / text-3xl / text-4xl`
- **玻璃框遮挡修复**: 所有 `::before`/`::after` 伪元素 z-index 降为 0，所有 glass-card 内部内容用 `relative z-10` 包裹
- 修复组件：DimensionFingerprint、MbtiComparison、GalleryPage 弹窗

---

## 文件结构
- `src/components/QuizPage.tsx` — 答题页
- `src/components/ResultPage.tsx` — 结果页
- `src/components/LandingPage.tsx` — 首页
- `src/components/GalleryPage.tsx` — 人格图鉴
- `src/components/ShareCard.tsx` — 分享卡片
- `src/components/DimensionFingerprint.tsx` — 维度指纹
- `src/components/MbtiComparison.tsx` — MBTI 对照
- `src/components/SimilarPersonalities.tsx` — 相似人格
- `src/data.ts` — 27种人格数据 + 202道题目
- `src/index.css` — 全局样式（液态玻璃、选项、按钮等）

## 重要注意事项
- `.quiz-option` 的 padding-left/right 在 `index.css` 里用 `!important` 控制，**不要在 TSX 里再加 Tailwind padding 类**（会被覆盖无效）
- 如果要调选项内边距，直接改 `index.css` 里的 `.quiz-option` 规则
- 所有 `glass-card` 内部内容必须有 `relative z-10` 包裹，否则会被伪元素遮挡
- 豆包 API Key: `4b6879a1-0159-42c4-88cd-c3e35dbb5ebb`
- 用户偏好：潮玩盲盒风头像 + 网络热梗疯癫文案 + 液态玻璃设计语言

## 未完成 / 可能需要继续调整
- 用户可能还会要求进一步微调字号、间距、颜色等 UI 细节
- 检查各页面在移动端的实际显示效果
