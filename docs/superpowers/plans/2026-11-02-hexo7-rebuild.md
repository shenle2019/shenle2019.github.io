# Hexo 7 升级重建实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `source` 分支重建为 Hexo 7 + Next 8.29 的可构建项目，从 `gh-pages` 产物还原 61 篇文章，并用 GitHub Actions 自动发布。

**Architecture:** 源码在 `source` 分支，主题用 npm 包，内容由一次性迁移脚本从线上 HTML 反推为 markdown，产物推送到 `gh-pages` 分支（Pages 设置不变）。

**Tech Stack:** Hexo 7.3、hexo-theme-next 8.29、Node 22（CI）/ 24（本地）、cheerio + turndown（迁移脚本）、node:test（测试）、GitHub Actions。

**Spec:** `docs/superpowers/specs/2026-11-02-hexo7-rebuild-design.md`

## Global Constraints

- Node 22 in CI，本地 Node 24.13.0；npm 源用本机已配的 npmmirror
- 内容唯一来源：`gh-pages` 检出目录（默认 `../shenle2019-pages`），共 61 篇
- URL 必须与线上逐字一致：permalink `:year/:month/:day/:title/`，pretty_urls 全部保留
- 站名「波音列岛试炼场」，副标题「General usopp」，描述「写的最好的，是下一篇」，author「General usopp」，language `zh-Hans`，timezone `UTC`
- 不做：补图、改正文、视觉改版、自定义域名、背景图、live2d（首版）
- 所有 commit 只落在本地 `rebuild/hexo7` 分支，不 push，除非用户明确要求

## Review Focus

- 中文 slug（含书名号、冒号、空格替换来的短横线）必须生成与线上相同的 URL；测试见 Task 3
- 代码块必须保留语言与内容，不能被 turndown 转成普通段落；测试见 Task 2
- 多层分类（如 `自动化测试开发/Java`）必须保持层级；测试见 Task 2
- 已存在的原始 md（`用-Hexo-和-GitHub-Pages-搭建博客-usopp.md`）不得被脚本覆盖；测试见 Task 2
- 构建产物中不得出现替换字符 U+FFFD；检查见 Task 7

---

### Task 1: 依赖与 Hexo 骨架

**Files:**
- Modify: `package.json`
- Modify: `_config.yml`
- Create: `_config.next.yml`（最小版，Task 4 补全）
- Modify: `.gitignore`
- Delete（git 索引）: `themes/next`（gitlink 引用）

**Interfaces:**
- Produces: 可运行的 `npx hexo generate`；`theme: next`；`public/` 输出目录

- [ ] **Step 1: 重写 package.json**

依赖清单（`dependencies`）:
```
hexo ^7.3.0
hexo-generator-archive ^2.0.0
hexo-generator-category ^2.0.0
hexo-generator-index ^4.0.0
hexo-generator-searchdb ^1.4.1
hexo-generator-tag ^2.0.0
hexo-renderer-ejs ^2.0.0
hexo-renderer-marked ^7.0.1
hexo-renderer-stylus ^3.0.3
hexo-server ^3.0.0
hexo-theme-next ^8.29.0
```
devDependencies（Task 2 起用）:
```
cheerio ^1.0.0
turndown ^7.2.0
js-yaml ^4.1.0
```
`scripts`: `build: hexo generate`、`clean: hexo clean`、`server: hexo server`、`test: node --test scripts/`、`migrate: node scripts/migrate-from-pages.js`、`verify: node scripts/verify-urls.js`

- [ ] **Step 2: 移除 themes/next 的 gitlink**

```bash
git rm --cached themes/next
```
保留 `themes/.gitkeep`，删除空的 `themes/next` 目录。

- [ ] **Step 3: 重写 _config.yml**

保留站点字段（title/subtitle/description/author/language/timezone/url/permalink/pretty_urls/index_generator/per_page: 10/search），`theme: next`；删除 live2d、lazyload、deploy 段。

- [ ] **Step 4: 写最小 _config.next.yml**

只写 `scheme: Gemini`、`menu`（首页/标签/分类/归档）、`menu_icons`、`avatar`、`toc` 基础项；其余留 Task 4。

- [ ] **Step 5: 安装依赖并验证可构建**

```bash
npm install
npx hexo clean
npx hexo generate
```
Expected: `public/index.html` 生成，无 ERR。

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json _config.yml _config.next.yml .gitignore
git commit -m "build: 升级到 Hexo 7 + Next 8.29 骨架"
```

---

### Task 2: 迁移脚本（TDD）

**Files:**
- Create: `scripts/migrate-from-pages.js`
- Create: `scripts/migrate-from-pages.test.js`
- Create: `tests/fixtures/`（从 gh-pages 复制 3 篇代表性 HTML：含代码块 + 多层分类、含书名号标题、含表格）

**Interfaces:**
- Produces: `parsePost(html, relPath) -> { slug, date, title, categories, tags, updated, bodyMd }`（导出供测试）
- Produces: `node scripts/migrate-from-pages.js --src ../shenle2019-pages --out source/_posts`

- [ ] **Step 1: 准备 fixtures**

从 `../shenle2019-pages` 复制：
- `2021/11/24/《控方证人》影评-usopp/index.html` → `tests/fixtures/book-title.html`
- `2023/01/24/python教程学习笔记001/index.html` → `tests/fixtures/code-block.html`
- 任选一篇多层分类（href 形如 `/categories/a/b/`）→ `tests/fixtures/multi-category.html`

- [ ] **Step 2: 写失败测试**

```js
import { test } from 'node:test';
import assert from 'node:assert';
import { parsePost } from './migrate-from-pages.js';

test('书名号 slug 从 URL 目录名还原', () => {
  const r = parsePost(fixture('book-title.html'), '2021/11/24/《控方证人》影评-usopp/index.html');
  assert.equal(r.slug, '《控方证人》影评-usopp');
  assert.equal(r.date, '2021-11-24');
  assert.ok(r.title.includes('控方证人'));
});

test('代码块保留语言与内容', () => {
  const r = parsePost(fixture('code-block.html'), '2023/01/24/python教程学习笔记001/index.html');
  assert.match(r.bodyMd, /```python/);
  assert.match(r.bodyMd, /print\(/);
});

test('多层分类保持层级', () => {
  const r = parsePost(fixture('multi-category.html'), '.../x/index.html');
  assert.ok(r.categories.some(c => c.includes('/')));
});

test('已存在的 md 不覆盖', () => {
  // 写临时目录放一个同名 md，调 migrateFile，断言 skipped=true 且文件未变
});
```

- [ ] **Step 3: 跑测试确认失败**

Run: `npm test`
Expected: FAIL（`parsePost` 未定义）

- [ ] **Step 4: 实现 parsePost**

用 cheerio：
- 正文取 `.post-body`（去 `.headerlink` 锚点）
- `.highlight` 转 fence：`td.code > pre` 的 `span.line` 逐行 textContent，语言取 `figure.highlight` 的 class
- 其余走 turndown（keep `iframe/video`）
- 分类取 `.post-category a`，href `/categories/a/b/` → `a/b`
- 标签取 `.post-tags a`，去 `#`
- 日期取路径 + `<time datetime>` 的时间部分

- [ ] **Step 5: 跑测试确认通过**

Run: `npm test`
Expected: PASS 全绿

- [ ] **Step 6: 实现 CLI 主流程**

遍历 `--src` 下 `^\d{4}/\d{2}/\d{2}/[^/]+/index\.html$`；输出 `--out/<slug>.md`；存在则跳过；结束时写 `docs/migration-report.md`（成功/跳过/失败/文章 slug 列表）。

- [ ] **Step 7: Commit**

```bash
git add scripts tests
git commit -m "feat: 新增 gh-pages 到 markdown 的迁移脚本与测试"
```

---

### Task 3: 执行迁移与 URL 一致性验证

**Files:**
- Create: `source/_posts/*.md`（61 篇）
- Create: `scripts/verify-urls.js`
- Modify: `source/_posts/hello-world.md`、`My-First-Post.md`、`分类标签内部测试测试.md` → 移到 `source/_drafts/`

**Interfaces:**
- Produces: `node scripts/verify-urls.js` 输出 `OK 61/61` 或差异清单，退出码非 0 表示失败

- [ ] **Step 1: 移走 3 篇测试文**

```bash
mkdir -p source/_drafts
git mv source/_posts/hello-world.md source/_drafts/
git mv "source/_posts/My-First-Post.md" source/_drafts/
git mv "source/_posts/分类标签内部测试测试.md" source/_drafts/
```

- [ ] **Step 2: 执行迁移**

Run: `npm run migrate`
Expected: 生成 61 篇 + 报告；原有「用-Hexo-和-GitHub-Pages-搭建博客-usopp.md」记为 skipped

- [ ] **Step 3: 写 URL 比对脚本**

从 `public/**/index.html` 提取 `YYYY/MM/DD/slug` 相对路径集合，从 `../shenle2019-pages` 提取同规则集合，做对称差；输出差异并以退出码 1 失败。

- [ ] **Step 4: 构建并比对**

```bash
npx hexo clean && npx hexo generate
node scripts/verify-urls.js
```
Expected: `OK 61/61`，退出码 0

- [ ] **Step 5: Commit**

```bash
git add source scripts docs/migration-report.md
git commit -m "feat: 从线上产物还原 61 篇文章"
```

---

### Task 4: 主题配置还原

**Files:**
- Modify: `_config.next.yml`
- Create: `source/images/`（从 gh-pages 同步的主题资源）

**Interfaces:**
- Consumes: 产物 HTML 中的 `.links-of-author`、`new Valine` 配置、`meting-js` 参数
- Produces: 构建产物包含菜单四项、头像、Valine 容器、APlayer 脚本、CC 版权声明

- [ ] **Step 1: 从产物提取配置值**

```bash
# 社交链接
grep -o 'class="links-of-author-item"[^>]*' ../shenle2019-pages/2024/03/14/*/index.html
# Valine
grep -o "new Valine({[^}]*}" ../shenle2019-pages/2024/03/14/*/index.html
# Meting
grep -o '<meting-js[^>]*>' ../shenle2019-pages/index.html
```

- [ ] **Step 2: 写 _config.next.yml 全量配置**

scheme Gemini；menu 首页/标签/分类/归档 + 图标；avatar `/images/psb.jpg`；copyright（CC BY-NC-SA 3.0 + 原文文案）；social 两项；valine（appId/appKey/placeholder/avatar `mm`/pageSize 10）；inject.head 放 APlayer CSS、inject.bottom 放 APlayer JS + MetingJS + `<meting-js>`。

- [ ] **Step 3: 同步主题静态资源**

```bash
cp -r ../shenle2019-pages/images/* source/images/
```
保留 source 已有的 `psb.jpg` 等，不覆盖同名不同内容的文件（先 diff 再决定）。

- [ ] **Step 4: 构建检查关键元素**

```bash
npx hexo clean && npx hexo generate
# 断言产物中存在：menu 四项、/images/psb.jpg、new Valine、APlayer.min.js、CC BY-NC-SA
```

- [ ] **Step 5: Commit**

```bash
git add _config.next.yml source/images
git commit -m "feat: 还原主题配置、评论与播放器"
```

---

### Task 5: 缺图清单

**Files:**
- Create: `scripts/check-images.js`
- Create: `docs/missing-images.md`

**Interfaces:**
- Produces: `node scripts/check-images.js` 输出每篇文章缺失的图片相对路径，退出码始终 0（清单不算失败）

- [ ] **Step 1: 写扫描脚本**

扫 `source/_posts/*.md` 的 `](imgs/...)` 引用，检查 `public/<post-url>/<img>` 是否存在，按文章分组输出。

- [ ] **Step 2: 生成清单**

```bash
node scripts/check-images.js > docs/missing-images.md
```
Expected: 列出所有缺失图片（预期数量 > 0，用户已接受）

- [ ] **Step 3: Commit**

```bash
git add scripts/check-images.js docs/missing-images.md
git commit -m "chore: 生成缺图清单"
```

---

### Task 6: CI 与 README

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`

**Interfaces:**
- Produces: push `source` 触发构建并推 `gh-pages`

- [ ] **Step 1: 写 workflow**

```yaml
name: Deploy
on:
  push: { branches: [source] }
  workflow_dispatch:
permissions: { contents: write }
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npx hexo generate
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          publish_branch: gh-pages
          force_orphan: false
```

- [ ] **Step 2: 写 README**

内容：三分支职责、本地开发命令、发布流程（push source）、迁移报告与缺图清单位置、GitHub 设置要求。

- [ ] **Step 3: 本地模拟 CI**

```bash
rm -rf node_modules && npm ci && npx hexo generate
```
Expected: 成功

- [ ] **Step 4: Commit**

```bash
git add .github README.md
git commit -m "ci: 添加 Actions 自动部署与项目说明"
```

---

### Task 7: 全量验证

**Files:**
- Create: `docs/verification-report.md`

**Interfaces:**
- Consumes: 前 6 个任务的产物

- [ ] **Step 1: 逐条跑 9 项验收**

1. `npx hexo clean && npx hexo generate` 零 error
2. `node scripts/verify-urls.js` → OK 61/61
3. 抽样 10 篇比对（标题/日期/分类/标签/首段/代码块前 5 行），结论写报告
4. 站内死链扫描（排除图片）→ 0
5. 缺图清单存在（预期非空）
6. 产物 HTML 无 U+FFFD、无「璇存槑」类乱码
7. `public/search.xml` 条目数 = 61
8. 本地 `python -m http.server` 或 `npx hexo server` 抽查首页/归档/分类/标签 200
9. Actions 无法本地跑，记录"待 push 后验证"

- [ ] **Step 2: 写验证报告并 Commit**

```bash
git add docs/verification-report.md
git commit -m "docs: 全量验证报告"
```

---

## 执行后待用户操作

1. GitHub 仓库 Settings → Actions 权限确认开启（public 仓库默认开）
2. 确认后由用户执行 `git push origin rebuild/hexo7:source`（或合并到 source）
3. push 后检查 Actions 运行与线上 200
