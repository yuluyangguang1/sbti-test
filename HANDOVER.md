# SBTI 人格测试 — 项目交接文档

> 最后更新: 2026-04-12 | 供下一个智能体快速接手

---

## 一、项目概览

**SBTI**（Silly Big Personality Test，傻乎乎的大人格测试）是一个互联网人格测试 Web 应用。用户从 202 题题库中随机答 31 题，系统根据「十五维五模型」体系（自我/情感/态度/行动驱力/社交 × 3 维度）计算落点，匹配 27 种人格类型之一。

- **在线地址**: https://sbti-test.pages.dev（Cloudflare Pages 自动部署）
- **GitHub**: https://github.com/yuluyangguang1/sbti-test
- **自定义域名**: sbti.autos（阿里云注册，DNS 已转 Cloudflare）

---

## 二、技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | React + TypeScript | React 19.2 / TS 6.0 |
| 构建 | Vite | 8.0 |
| 样式 | Tailwind CSS + 自定义 Liquid Glass 设计系统 | v4.2（`@tailwindcss/vite` 插件集成） |
| 截图分享 | html2canvas | 1.4 |
| 路由 | 自实现 Hash 路由（无 react-router） | — |
| 状态管理 | React useState（无外部库） | — |
| 数据持久化 | localStorage（排行榜统计） | — |
| 部署 | Cloudflare Pages（push to main 自动部署） | — |

---

## 三、开发环境

```bash
# 项目路径
cd C:\Users\高\Desktop\SBTI人格测试

# 安装依赖
npm install

# 启动开发服务器（默认端口 5173，之前用 5175）
npm run dev

# 构建（不含 tsc 检查 — tsc -b 在 CI 环境会失败）
npm run build    # 等同于 vite build

# 预览构建产物
npm run preview
```

**环境注意事项**:
- Windows 系统，PowerShell 执行策略受限，优先用 `cmd /c` 执行命令
- 中文路径 `C:\Users\高\Desktop` 在某些命令中会出问题，用引号包裹
- 构建命令只用 `vite build`，不要加 `tsc -b &&`，因为 TS 严格模式会导致 CI 失败

---

## 四、项目结构

```
src/
├── main.tsx                    # 入口（StrictMode + createRoot）
├── App.tsx                     # 根组件（useState Hash 路由 + 页面分发）
├── App.css                     # 应用样式（2.8KB，较少使用）
├── index.css                   # 全局样式核心（861行，Tailwind v4 + Liquid Glass 设计系统）
├── data.ts                     # 核心数据（136KB，27种人格 + 202道题 + 维度定义 + 解读文案）
├── assets/                     # 静态资源（hero.png 等）
└── components/
    ├── LandingPage.tsx          # 首页（Hero + 彩蛋人格 + 随机预览 + CTA + 五套模型）
    ├── QuizPage.tsx             # 答题页（31题逐题展示，全屏模式隐藏导航栏）
    ├── ResultPage.tsx           # 结果页（人格类型 + Top5 + 十五维指纹 + MBTI对照 + 相似人格 + 分享）
    ├── GalleryPage.tsx          # 人格图鉴（27种搜索/筛选/浏览，维度条形码可视化）
    ├── RankingsPage.tsx         # 排行榜（localStorage 统计的人格热度）
    ├── FaqPage.tsx              # 常见问题（手风琴式 FAQ）
    ├── AboutPage.tsx            # 关于测试（3步流程 + 5大模型说明）
    ├── Navbar.tsx               # 固定顶部导航栏（玻璃背景，移动端汉堡菜单）
    ├── DimensionFingerprint.tsx # 十五维雷达/指纹可视化
    ├── MbtiComparison.tsx       # SBTI 与 MBTI 类型对照
    ├── PersonalityAvatar.tsx    # 人格头像组件（5种尺寸，优先PNG回退emoji）
    ├── ShareCard.tsx            # 截图分享（html2canvas 动态导入）
    └── SimilarPersonalities.tsx # 相似人格推荐列表
```

**静态资源**:
- `public/avatars/` — 25 个 PNG 头像（AI 生成，每种人格一个）
- `public/yuluyangguangdoudian.png` — 作者头像（页脚 hover 彩蛋）
- `public/favicon.svg` — 站点图标（🧠 emoji SVG）

---

## 五、路由架构

**无第三方路由库**，`App.tsx` 中用 `useState<Page>` + `window.location.hash` 实现：

```typescript
type Page = 'landing' | 'quiz' | 'result' | 'gallery' | 'faq' | 'about' | 'rankings';
```

| Hash | 页面 | 组件 |
|------|------|------|
| `''` 或 `#landing` | 首页 | LandingPage |
| `#quiz` | 答题 | QuizPage（隐藏导航栏） |
| `#result` | 结果 | ResultPage |
| `#type/{personalityId}` | 指定人格结果 | ResultPage（可分享链接） |
| `#gallery` | 人格图鉴 | GalleryPage |
| `#rankings` | 排行榜 | RankingsPage |
| `#faq` | 常见问题 | FaqPage |
| `#about` | 关于 | AboutPage |

**关键交互流**:
- 答题完成 → `handleFinishQuiz(id, scores)` → 记录 localStorage 排行榜 → 跳转结果页
- 分享链接 `#type/ctrl` → 直接显示「拿捏者」人格结果
- `quizResetKey` 机制确保重新开始时组件完全重置

---

## 六、数据模型（data.ts, 136KB）

### 15 维度定义（5 套模型 × 3 维度）

| 模型 | Key | 维度 |
|------|-----|------|
| 自我模型 | S | S1 自尊自信、S2 自我清晰度、S3 核心价值 |
| 情感模型 | E | E1 依恋安全感、E2 情感投入度、E3 边界与依赖 |
| 态度模型 | A | A1 世界观倾向、A2 规则与灵活度、A3 人生意义感 |
| 行动驱力模型 | Ac | Ac1 动机导向、Ac2 决策风格、Ac3 执行模式 |
| 社交模型 | So | So1 社交主动性、So2 人际边界感、So3 表达与真实度 |

### 人格类型（PersonalityType）

```typescript
interface PersonalityType {
  id: string;           // 如 "ctrl"
  code: string;         // 如 "#3C"
  name: string;         // 如 "拿捏者"
  emoji: string;        // 如 "😎"
  slogan: string;       // 人格口号
  description: string;  // 详细描述（幽默风格）
  traits: string[];     // 特征标签
  color: string;        // 主色
  bgGradient: string;   // Tailwind 渐变类
  avatar?: string;      // PNG 头像路径
  dimensions: Record<string, DimensionLevel>;  // 15维落点 H/M/L
  mbti?: string[];      // 对应 MBTI 类型
  similar?: string[];   // 相似人格 ID
}
```

共 **27 种人格**：25 种常规 + 2 种特殊（ctrl 拿捏者、ohno 哦不人）。

### 题目

202 道题，每次测试随机抽取 31 道（`QUIZ_LENGTH = 31`）。每题有多个选项，每个选项关联不同维度的得分。

---

## 七、设计系统 — Liquid Glass（液态玻璃）

**风格参考**: Apple liquid-glass.org — 超大留白、毛玻璃、液态动画、折射光效

### 核心组件类（index.css）

| 类名 | 用途 | 关键样式 |
|------|------|----------|
| `.glass-card` | 液态玻璃卡片 | `backdrop-filter: blur(40px) saturate(180%)`，半透明白底 + 顶部光泽条 + 径向光斑 |
| `.glass-tag` | 液态玻璃标签/徽章 | 轻量版玻璃效果 |
| `.glass-input` | 液态玻璃搜索框 | focus 紫色光晕 |
| `.glass-filter` | 液态玻璃筛选按钮 | active 态紫色高光 |
| `.glass-accordion` | 液态玻璃手风琴 | FAQ 页面用 |
| `.glass-tab-container` | 液态玻璃 Tab | 关于页用 |
| `.btn-primary` | 主按钮（渐变紫） | 带光泽线 + hover 位移 |
| `.btn-glass` | 玻璃次要按钮 | 半透明白底 |
| `.quiz-option` | 答题选项 | 独立玻璃风格，selected 紫色高光 |
| `.liquid-bg` + `.liquid-blob` | 背景装饰 | 三个彩色光球（紫/粉/青），缓慢漂移 |

### Design Tokens（index.css @theme）

```
圆角: radius-sm(8) / radius-md(12) / radius-lg(16) / radius-xl(24) / radius-2xl(32)
间距: space-section(120) / space-card-p-lg(64) / space-gap(28) / space-page-x(24)
文字: text-tracking-tight(-0.03em) / text-tracking-wide(0.04em) / text-leading-relaxed(2.0)
颜色: sb-purple(#6c5ce7) / sb-pink(#fd79a8) / sb-yellow(#ffeaa7) 等
```

### 动画

`animate-gentle-float` / `animate-liquid-morph` / `animate-shimmer` / `animate-card-enter` / `animate-pulse-glow` / `gradient-text`（渐变文字）等 10+ 种。

---

## 八、踩坑记录（必读）

### Tailwind v4 关键问题

1. **`mx-auto` 不生效**: Tailwind v4 的 `mx-auto` 类不会生成 `margin-left: auto` CSS 规则，导致所有 `max-w-* mx-auto` 容器不居中。
   - **已修复**: 在 `index.css` 中手动添加 `.mx-auto { margin-left: auto !important; margin-right: auto !important; }`
   - 如果升级 Tailwind 版本，需检查此问题是否仍存在

2. **`.glass-card` padding 覆盖 Tailwind utility**: CSS 类中 `padding: var(--space-card-p-lg)` 的 specificity 会覆盖 `p-*` / `!p-*`。
   - **解决**: 需要覆盖 glass-card padding 时，用 `style={{ padding: '...' }}` inline style

3. **`flex flex-col items-center` 下 `max-w-*` 宽度收缩**: 子元素宽度会收缩到 `max-content`，需要加 `w-full` 撑满。

4. **Tailwind v4 的 `!` 前缀**（如 `!p-7`）确实生成 `!important`，但 CSS 中同优先级的自定义属性也会覆盖。

### 其他注意事项

- 构建只用 `vite build`，**不要** `tsc -b && vite build`，因为 TS 严格模式（noUnusedLocals/noUnusedParameters）在 CI 会失败
- `data.ts` 用 `\r\n` 换行（Windows），编辑时保持一致
- 头像文件在 `public/avatars/` 下，命名与人格 id 对应（如 `ctrl.png`、`atmer.png`）
- `public/426414d90c4db73be2acaeeda3757bd3.txt` 是未知文件（40B），可能是域名验证文件，**不要删除**

---

## 九、部署流程

```
git push origin main
    ↓
Cloudflare Pages 自动构建
    ↓
构建命令: npm run build（即 vite build）
输出目录: dist/
    ↓
自动部署到 sbti-test.pages.dev
    ↓
自定义域名 sbti.autos 通过 Cloudflare DNS 解析
```

**Cloudflare Pages 配置**:
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: 18+（环境变量 `NODE_VERSION`）

---

## 十、待办 / 可能的改进方向

以下是尚未完成或可以改进的事项：

1. **PWA 支持**: 目前只有 meta 标签，没有 Service Worker 和 manifest.json，离线不可用
2. **SEO / 社交分享**: 缺少 Open Graph meta 标签，社交平台分享时无法显示预览图
3. **国际化**: 目前只有中文，无 i18n 支持
4. **排行榜数据**: 目前是纯 localStorage，换设备/清缓存就丢失，可考虑接入后端
5. **答题结果分析**: 可以加入更详细的维度解读、历史对比等功能
6. **头像补充**: 目前有 25 个 PNG 头像，但 data.ts 定义了 27 种人格（缺 2 个）
7. **移动端横屏适配**: 目前主要针对竖屏优化，横屏体验可能需要调整
8. **性能优化**: data.ts 有 136KB，可以考虑代码分割或懒加载题目数据
9. **无障碍 (a11y)**: 缺少 ARIA 标签、键盘导航等无障碍支持
10. **单元测试**: 目前没有任何测试

---

## 十一、文件修改热点

以下是最近频繁修改的文件，理解它们对快速上手很重要：

| 文件 | 最近修改内容 |
|------|-------------|
| `src/components/LandingPage.tsx` | 首页布局居中修复、五套模型位置调整、数字指标胶囊 |
| `src/index.css` | 添加 `mx-auto` 修复、液态玻璃设计系统全套样式 |
| `src/components/GalleryPage.tsx` | 人格详情弹窗改为固定居中、圆角统一 |
| `src/components/Navbar.tsx` | 去掉 focus 紫色框、滚动白色亮条、按钮圆角统一 |
| `src/App.tsx` | 页脚 "by yuluyangguang" 上移、头像 hover 彩蛋 |

---

## 十二、快速验证清单

接手后建议按以下步骤验证项目能正常运行：

```bash
# 1. 进入项目目录
cd "C:\Users\高\Desktop\SBTI人格测试"

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 浏览器打开 http://localhost:5173

# 5. 验证核心流程:
#    - 首页是否加载正常、内容是否居中
#    - 点击「开始测试」→ 答题 → 出结果
#    - 结果页人格类型 + 十五维指纹 + MBTI 对照
#    - 人格图鉴搜索/筛选
#    - 排行榜（需要先答过一次题才有数据）
#    - 分享功能（html2canvas 截图）

# 6. 构建验证
npm run build

# 7. 推送部署
git add -A && git commit -m "your message" && git push
```

---

*文档结束。如有疑问，查阅源码或联系项目维护者。*
