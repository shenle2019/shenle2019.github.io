# shenle2019.github.io

个人技术博客源码：Hexo 7 + NexT 8（Gemini 配色），线上地址 https://shenle2019.github.io/

2026 年 11 月从旧版 Hexo + NexT 7 升级重建，62 篇历史文章全部保留，线上老 URL 逐条核对一致。

## 分支职责

| 分支 | 用途 | 谁在写 |
| --- | --- | --- |
| `source` | 唯一源码分支，日常改动都在这里 | 你 |
| `gh-pages` | 构建产物，GitHub Pages 从这里发布 | GitHub Actions 自动写，不要手改 |
| `main` | 2021 年的旧产物，仅作存档 | 不再更新 |

推送 `source` 会触发 `.github/workflows/deploy.yml`：安装依赖 → 跑测试 → 构建 → 推送 `public/` 到 `gh-pages`。

## 本地开发

```bash
npm ci          # 首次或依赖变动后
npm run server  # http://localhost:4000
```

常用命令：

| 命令 | 作用 |
| --- | --- |
| `npm run build` | 生成静态站点到 `public/` |
| `npm test` | 脚本单测（迁移解析、URL 比对、缺图扫描、版权改写） |
| `npm run verify` | 构建产物与线上老 URL 逐条比对，默认读 `../shenle2019-pages` |
| `npm run images` | 重新生成 `docs/missing-images.md` |
| `npm run migrate` | 从旧站 HTML 还原 Markdown（已在 2026-11 执行完毕，平时不需要跑） |

## 写文章

在 `source/_posts/` 新建 Markdown，front-matter 至少写 `title` 和 `date`：

```yaml
---
title: 文章标题
date: 2026-11-02 10:00:00
categories:
  - 爬虫
tags:
  - 测试开发
---
```

从旧站迁移来的文章带一个 `permalink` 字段，**不要删**。它把线上 URL 钉死到旧地址，改标题或日期都不会造成外链失效。

## 一次性设置（换仓库或首次部署时检查）

1. **Settings → Actions → General → Workflow permissions**：选 “Read and write permissions”。工作流需要写 `gh-pages` 分支。
2. **Settings → Pages**：Source 选 “Deploy from a branch”，分支 `gh-pages`，目录 `/ (root)`。
3. 确认 `source` 分支存在后再 push，否则工作流不会触发。

## 目录说明

```
source/_posts/     文章（62 篇）
source/_drafts/    草稿，不会被发布
source/images/     站点级图片（头像、背景等）
source/_data/      NexT 注入模板（评论、播放器）
scripts/           迁移、URL 核对、缺图扫描、版权改写脚本
tests/             脚本单测与 HTML 夹具
docs/              迁移报告、缺图清单、验证报告、设计与计划
```

## 已知情况

- 缺图 13 张，分布在 4 篇文章里（原站就已丢失），明细见 `docs/missing-images.md`。
- 评论用 Valine，沿用原 LeanCloud 应用；若应用被停用，需要换评论系统。
- 音乐播放器用 APlayer + MetingJS 插件网易云歌单 7091778006，依赖第三方 API 可用性。
- 主题的版权块被 `scripts/theme-copyright.js` 改写为原站的 CC BY-NC-SA 3.0 文案与链接。

## 相关文档

- 迁移报告：`docs/migration-report.md`
- 缺图清单：`docs/missing-images.md`
- 全量验证报告：`docs/verification-report.md`
- 设计与实施计划：`docs/superpowers/specs/`、`docs/superpowers/plans/`
