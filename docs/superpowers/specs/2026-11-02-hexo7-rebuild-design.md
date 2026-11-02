# Hexo 7 升级重建设计

日期：2026-11-02
仓库：shenle2019/shenle2019.github.io
状态：待批准

## 背景

「波音列岛试炼场」是 2021-11 至 2024-03 维护的 Hexo 个人博客，部署在 GitHub Pages。线上站点仍可访问，但仓库处于半失联状态：

- `gh-pages` 分支是线上唯一事实来源，61 篇文章（2021: 11 / 2022: 20 / 2023: 17 / 2024: 13），最后部署 2024-03-13
- `source` 分支（源码）只有 4 篇 2021 年的测试文章，主题目录 `themes/next` 是空 submodule 且无 `.gitmodules`，`_config.next.yml` 缺失
- `main` 分支是 2021 年的废弃产物，却是仓库默认分支
- 文章配图在线上全部 404（产物中没有任何文章截图资源）
- 无 CI、无 README、无 CNAME

## 意图

让这个博客重新变成一个能继续写、能自动发布的项目，同时保住 2021-2024 的 61 篇历史内容和它们在搜索引擎里的老 URL。

## 目标

1. 源码可在本地和 CI 构建（Hexo 7.3 + Next 8.29）
2. 61 篇线上文章全部还原为 markdown，产出 URL 与线上逐字一致
3. push 源码分支后自动构建并发布到 gh-pages
4. 保留站点身份要素：站名/副标题/描述、菜单（首页/标签/分类/归档）、分类与标签、头像、站内搜索、CC 版权声明、Valine 评论
5. 恢复网易云音乐播放器（APlayer + Meting 注入）
6. 输出缺图清单（不补图，用户明确决定）

## 非目标

- 不补文章配图，不下载、不替换图片
- 不改文章正文、标题、分类、标签
- 不做视觉改版，不追求与 2021 版像素级一致
- 不换域名、不启用自定义域名
- 不启用背景图（线上产物未引用 background.jpg，保持不启用）
- 首版不恢复 live2d 看板娘（`hexo-helper-live2d` 已归档，2021 停更，Hexo 7 不可用；作为 P2 可选项）

## 反目标（出现即视为失败）

- 任何一篇老文章 URL 返回 404
- 文章正文或代码块出现乱码、结构损坏
- 发布仍需手工执行 `hexo deploy`
- 本地构建依赖未提交的文件

## 约束

- 内容唯一事实来源是 `gh-pages` 产物；`source` 分支 4 篇 md 中只有 1 篇在线上存在
- 本机 Node v24.13.0 / npm 11.6.2，npm 源已配置 npmmirror；CI 统一 Node 22
- GitHub Pages 当前从 `gh-pages` 分支发布，保持该设置不变
- 无 GitHub 认证凭据，不改仓库默认分支、不改 Pages 设置（网页操作留给用户，列为可选后续）

## 方案

### 备选方案

| 方案 | 做法 | 放弃原因 |
|---|---|---|
| A. 原样救活 | 锁定 Hexo 5.4 + 2021 版 Next 7，按产物反推配置 | 2021 构建链在 Node 24 上不可靠，Next 7 已停维护，技术债原样保留 |
| **B. 升级重建（选定）** | Hexo 7.3 + Next 8.29（npm 主题），脚本从 HTML 反推 61 篇，Actions 部署 | 无 |
| C. 换栈 | 迁移 Astro/Hugo | 内容迁移成本与 B 相同，模板/配置全部重写，中文 URL 兼容性要额外验证，收益不足以抵消 |

选 B：老 URL 由 Hexo permalink 机制天然保留；主题配置可对照产物逐项还原；CI 一次配好；升级后依赖仍在维护。

### 关键决策

以下是设计阶段做出的判断，用户可推翻：

1. **源码分支保持 `source`**，不改默认分支 `main`，不动 `gh-pages` 历史。零 GitHub 设置变更，回滚成本最低。分支职责写进 README。
2. **主题用 npm 包 `hexo-theme-next@8.29.0`**，不用 submodule。版本锁定、CI 可复现、不需要维护 `.gitmodules`。
3. **slug = 线上 URL 目录名（URL 解码）**，文件名即 slug，front-matter 显式写 title/date/categories/tags。这样 permalink `:year/:month/:day/:title/` 生成结果与线上逐字一致（含中文、书名号、长短横线）。
4. **`source` 已有 4 篇 md 的处理**：线上存在的 1 篇（用-Hexo-和-GitHub-Pages-搭建博客-usopp）保留原始 md，脚本跳过不覆盖；另外 3 篇测试文（hello-world、My-First-Post、分类标签内部测试测试）移入 `source/_drafts/`，不参与构建。
5. **代码块还原**：从 `figure.highlight > td.code > pre > span.line` 逐行取 textContent，包成 ` ```lang `；`plaintext` 输出无语言 fence。表格、标题、列表、引用、行内代码走 turndown。
6. **图片**：保留原相对路径引用（如 `imgs/Snip20230831_144.png`），不下载不替换；迁移报告输出缺图清单（文章 → 文件列表），用户后续自行补。
7. **live2d**：首版不启用。P2 用 live2d-widget 独立 script 注入还原（不依赖 hexo 插件），开关放在主题的 inject 配置里。
8. **APlayer + Meting 播放器**：照抄线上注入的 CDN 脚本（aplayer 1.10.1 + meting 2.0.1），放进 Next 的 inject.head / inject.bottom，歌单 id 从产物 HTML 提取。
9. **CI**：`.github/workflows/deploy.yml`，push `source` 触发，Node 22 + `npm ci` + `hexo generate`，用 peaceiris/actions-gh-pages@v4 推 `gh-pages`（保留历史，`force_orphan: false`）。Pages 设置不变。
10. **包管理**：提交 `package-lock.json`；`.gitignore` 保留 node_modules / public / db.json。

## 改动清单

### 1. 源码骨架（source 分支）

- 重写 `package.json`：
  - hexo ^7.3.0、hexo-renderer-marked ^7、hexo-renderer-stylus ^3、hexo-renderer-ejs ^2、hexo-server ^3
  - hexo-generator-index ^4、archive ^2、category ^2、tag ^2、searchdb ^1.4
  - hexo-theme-next ^8.29.0
  - 移除 hexo-helper-live2d、hexo-lazyload-image、hexo-theme-landscape、hexo-deployer-git
- `_config.yml`：保留站名/副标题/描述/author/url/permalink/timezone/search 配置；`theme: next`；移除插件专属配置
- 新增 `_config.next.yml`：scheme、menu、avatar、背景、copyright、inject（APlayer/Meting）、social
- 新增 `.github/workflows/deploy.yml`
- 新增 `scripts/migrate-from-pages.js`（一次性迁移脚本，留档）
- 新增 `README.md`：三分支职责、本地开发、发布流程
- 移除 `themes/next` 的 submodule 引用（gitlink），主题改由 npm 提供
- 静态资源：从 `gh-pages` 同步 `images/` 下的主题资源（avatar、背景、favicon、loading、占位图等）

### 2. 迁移脚本（Node + cheerio + turndown + js-yaml）

- 输入：`--src` 指向 gh-pages 检出目录（默认 `../shenle2019-pages`）
- 遍历规则：`^\d{4}/\d{2}/\d{2}/[^/]+/index\.html$`，排除 `page/`、`archives/`、`categories/`、`tags/`
- 逐篇提取：
  - slug：目录名 URL decode
  - date：路径 → `YYYY-MM-DD`，时间取 HTML `<time datetime>`（保留原始时区偏移）
  - title：`.post-title` 文本（fallback `<title>` 去掉 ` | 波音列岛试炼场`）
  - categories：`.post-category a`，根据 href `/categories/a/b/` 推断层级
  - tags：`.post-tags a` 文本，去掉 `#`
  - updated：`[itemprop=dateModified]` 的 datetime（可选）
  - 正文：`.post-body` 内 HTML → 预处理（highlight 转 fence、删除 headerlink 锚点、img 保留原 src）→ turndown
- 输出：`source/_posts/<slug>.md`；文件已存在则跳过并记录
- 报告：`docs/migration-report.md`（成功/跳过/失败/缺图清单/保留的原始 md）

### 3. 主题配置对照（以产物为准）

| 项 | 线上值（产物提取） |
|---|---|
| scheme | Gemini（有 header-inner + sidebar） |
| menu | 首页 / 标签 / 分类 / 归档（此顺序） |
| 站点 | 波音列岛试炼场 / General usopp / 写的最好的，是下一篇 / zh-Hans / UTC |
| avatar | /images/psb.jpg |
| 版权 | CC BY-NC-SA 3.0 + 原文版权声明文案 |
| social | 2 个链接，具体 URL 从 `.links-of-author` 提取 |
| 评论 | Valine（LeanCloud），`new Valine` 的 appId/appKey/placeholder/avatar 从产物 HTML 提取 |
| 播放器 | APlayer 1.10.1 + MetingJS 2.0.1，网易云歌单 |
| 搜索 | hexo-generator-searchdb，search.xml，field: post |
| 分页 | 每页 10 篇（线上 page/2 至 page/7 印证） |

### 4. CI / 部署

- 触发：push `source`、`workflow_dispatch`
- 权限：`contents: write`
- 步骤：checkout → setup-node 22（缓存 npm）→ `npm ci` → `npx hexo generate` → 推 gh-pages
- gh-pages 历史保留，不做 force_orphan

## 验证

完成标准（逐条可执行）：

1. `npm ci` 后 `npx hexo clean && npx hexo generate` 零 error、零未处理异常
2. 产物 URL 清单与 `gh-pages` 的 61 条 URL 清单逐条 diff，无缺失、无多余
3. 抽样 10 篇（每年 2-3 篇，覆盖中文标题、书名号、代码块、表格、图片引用、多层分类）人工比对：标题、日期、分类、标签、首段、代码块前 5 行
4. 站内链接扫描：产物所有内部 href 指向的文件存在，死链 0（图片除外，单列缺图清单）
5. 缺图清单产出（预期非 0，用户已接受）
6. 中文检查:产物 HTML 无 U+FFFD 替换字符、无典型乱码串
7. `search.xml` 条目数 = 61，字段可正常解析
8. push 后 Actions 绿；`https://shenle2019.github.io/` 及 /archives/ /categories/ /tags/ 返回 200
9. 线上老 URL 抽样 5 条（含中文路径）直连 200

## 风险

- turndown 对多层列表、表格、行内代码可能产出走样 → 抽样比对兜底，对特定元素做后处理
- 个别文章可能内嵌 iframe/video，无法还原为 md → turndown 保留为 HTML 片段
- Hexo 7 + Next 8 默认样式与 2021 版有差异 → 以"能读、能找、能继续写"为目标
- 本地 Node 24 与 CI Node 22 差异 → 以 CI 为准
- GitHub Actions 首次运行需仓库开启 Actions 权限（public 仓库默认开启）

## 留给实施者

- Next 8.29 具体配置键名以该版本 `_config.yml` 注释为准，本文档只定语义
- 迁移脚本的清洗细节按抽样效果迭代
- README 文案
