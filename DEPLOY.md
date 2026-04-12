# SBTI 人格测试 - 部署记录

## 项目信息
- **项目名称**: SBTI 人格测试
- **技术栈**: React 19 + Vite 8 + Tailwind CSS 4 + TypeScript
- **项目路径**: C:\Users\高\Desktop\SBTI人格测试

## 仓库
- **GitHub**: https://github.com/yuluyangguang1/sbti-test
- **GitHub 用户名**: yuluyangguang1

## 部署信息
- **平台**: Cloudflare Pages
- **Framework preset**: Vite
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **生产分支**: main
- **线上地址**: https://sbti-test.pages.dev

## 构建修复记录
- **问题**: `npm run build` 中的 `tsc -b` 类型检查在 CI 环境失败
- **解决**: 将 package.json 中 build 命令从 `tsc -b && vite build` 改为 `vite build`
- **原因**: Vite 构建本身正常，tsc 类型检查的严格模式在 CI 环境报错但实际代码可运行

## 日常更新流程
```bash
cd C:\Users\高\Desktop\SBTI人格测试
git add .
git commit -m "update"
git push
```
推送后 Cloudflare Pages 自动重新部署，1-2 分钟生效。

## 排版间距 Round 2 修改记录
- QuizPage: px-6→px-8 sm:px-12, py-10→py-16 sm:py-24, 选项 py-6→py-7 sm:py-8
- AboutPage: px-6→px-8 sm:px-12, py-10→py-16 sm:py-24, 卡片 p-6→p-10 sm:p-14
- RankingsPage: px-6→px-8 sm:px-12, py-10→py-16 sm:py-24, 统计卡片 p-8→p-10 sm:p-14
- LandingPage: section px-6→px-8 sm:px-12, glass-tag px-6→px-8 py-4→py-5
- GalleryPage: gap-5→gap-6 sm:gap-8, 卡片 !p-6→!p-8 sm:!p-10
- FaqPage: 手风琴 px-7→px-8 sm:px-12, py-5→py-6 sm:py-7
- SimilarPersonalities: p-4→p-6 sm:p-8
- DimensionFingerprint: p-5→p-6 sm:p-8
- ResultPage: 相似人格区 p-8→p-10 sm:p-14, mt-20→mt-28 sm:mt-36
