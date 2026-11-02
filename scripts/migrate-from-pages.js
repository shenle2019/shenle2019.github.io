'use strict';

/**
 * 把 gh-pages 产物里的文章 HTML 还原成 Hexo 的 Markdown 源文件。
 *
 * 用法：node scripts/migrate-from-pages.js [--src <gh-pages目录>] [--out <_posts目录>]
 *
 * 关键约束：
 * - permalink 用 URL 目录名写死，避免 Hexo 7 按本地时区重排日期导致老链接失效
 * - date 取原站 time 的 datetime 原值（带原时区偏移），还原原站显示日期；缺失时用 URL 日期零时
 * - 已存在的 md 不覆盖（保留手写源文件）
 */

const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const yaml = require('js-yaml');

const POST_RE = /^(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)\/index\.html$/;

const codeToken = (i) => `@@CODEBLOCK${i}@@`;

// 占位符单独成行，可能被 turndown 加了引用/列表缩进
const TOKEN_LINE = /^((?:[ \t]*> ?)*[ \t]*(?:(?:[-*+]|\d+[.)])[ \t]+)?)@@CODEBLOCK(\d+)@@[ \t]*$/gm;

/** 围栏要比代码内容里最长的反引号行更长，否则会被提前闭合 */
function fenceFor(code, lang) {
  const longest = code
    .split('\n')
    .map((line) => (line.match(/^[ \t]*(`+)/) || [null, ''])[1].length)
    .reduce((max, n) => Math.max(max, n), 0);
  const fence = '`'.repeat(Math.max(3, longest + 1));
  return `${fence}${lang}\n${code}\n${fence}`;
}

function indentBlock(block, indent) {
  if (!indent) return block;
  // 列表标记只属于首行：后续行换成等宽空格，否则每行都会另起一个列表项，
  // 代码行会因顶格而被 CommonMark 踢出列表（正文漏出代码、块数凭空变多）
  const restIndent = /(?:^|[ \t])(?:[-*+]|\d+[.)])[ \t]+$/.test(indent)
    ? indent.replace(/[^\s]/g, ' ')
    : indent;
  return block
    .split('\n')
    .map((line, i) => (line ? (i === 0 ? indent : restIndent) + line : ''))
    .join('\n');
}

/** 从 class 里取代码语言：优先 language- 前缀，否则取第一个非噪音 token */
function langFromClass(cls) {
  const tokens = String(cls || '').split(/\s+/).filter(Boolean);
  const prefixed = tokens.find((t) => /^language-/.test(t));
  if (prefixed) return prefixed.replace(/^language-/, '');
  const bare = tokens.filter((t) => !/^(hljs|line-numbers|prism|code|sourceCode|highlight)$/.test(t));
  return bare[0] || '';
}

/** 把预留的代码块回填到占位符位置，沿用该位置原有的缩进 */
function insertBlocks(md, blocks) {
  let out = md.replace(TOKEN_LINE, (whole, indent, idx) => indentBlock(blocks[Number(idx)], indent));
  blocks.forEach((block, i) => {
    const token = codeToken(i);
    if (out.includes(token)) out = out.split(token).join(block);
  });
  return out;
}

function decodeNames($, selector, section) {
  const prefix = new RegExp(`^/${section}/(.+?)/?$`);
  return $(selector)
    .toArray()
    .map((el) => {
      // 优先用显示文本：href 会把空格连字符化（github pages → github-pages）
      const text = $(el).text().trim().replace(/^#\s*/, '');
      if (text) return text;

      const href = $(el).attr('href') || '';
      let decoded = href;
      try {
        decoded = decodeURIComponent(href);
      } catch (err) {
        /* 保留原串 */
      }
      const m = decoded.match(prefix);
      return (m ? m[1] : decoded.replace(/^#/, '').replace(/^\/+|\/+$/g, '')).trim();
    })
    .filter(Boolean);
}

/** 段落内单独成行的「1.」会被 Markdown 当成空列表项，转义回字面编号 */
function escapeLoneListMarkers(md) {
  return md.replace(/^([ \t]*)(\d+)\.([ \t]*)$/gm, (whole, indent, num, tail) => `${indent}${num}\\.${tail}`);
}

/** 正文 HTML → Markdown；代码块先摘出再回填，避免 turndown 丢失高亮结构 */
function bodyHtmlToMarkdown(html) {
  const $ = cheerio.load(html, null, false);
  $('a.headerlink').remove();

  const blocks = [];
  $('figure.highlight').each((_, el) => {
    const $el = $(el);
    const cls = $el.attr('class') || '';
    const lang = cls.replace(/\bhighlight\b/, '').trim().split(/\s+/)[0] || '';
    const lines = $el
      .find('td.code pre span.line')
      .toArray()
      .map((n) => $(n).text());
    const raw = lines.length ? lines.join('\n') : $el.find('td.code pre, pre').first().text();
    const code = raw.replace(/\s+$/, '');
    blocks.push(fenceFor(code, lang));
    $el.replaceWith(`<p>${codeToken(blocks.length - 1)}</p>`);
  });

  // 原站还有裸 pre>code（语言直接写在 class 上），turndown 只认 language- 前缀，
  // 不先摘出来会生成无语言围栏，丢语法高亮
  $('pre').each((_, el) => {
    const $pre = $(el);
    const cls = $pre.find('code').first().attr('class') || $pre.attr('class') || '';
    const code = $pre.text().replace(/\s+$/, '');
    blocks.push(fenceFor(code, langFromClass(cls)));
    $pre.replaceWith(`<p>${codeToken(blocks.length - 1)}</p>`);
  });

  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
  });
  turndown.keep(['iframe', 'video', 'audio', 'source', 'table']);
  // “**CPU：**汉字”这种闭合符前中文标点、后汉字的写法 CommonMark 不认，
  // 保留 strong 原生标签才能稳定还原原站加粗
  turndown.addRule('strongHtml', {
    filter: ['strong', 'b'],
    replacement: (content) => (content.trim() ? `<strong>${content}</strong>` : content),
  });

  const md = turndown.turndown($.html() || '').replace(/\n{3,}/g, '\n\n').trim();
  return insertBlocks(escapeLoneListMarkers(md), blocks).trim();
}

/** 原站发布时间：保留原时区偏移，交给站点 timezone 换算显示日期 */
function createdDate($, fallback) {
  const attr = $('.post-meta time[itemprop~="dateCreated"]').first().attr('datetime')
    || $('.post-meta time').first().attr('datetime')
    || '';
  const value = String(attr).trim();
  return value || fallback;
}

function parsePost(html, relPath) {
  const m = String(relPath).replace(/\\/g, '/').match(POST_RE);
  if (!m) throw new Error(`无法从路径解析文章: ${relPath}`);
  const [, year, month, day, slug] = m;

  const $ = cheerio.load(html);
  const title = $('.post-title').first().text().trim() || slug;
  const bodyHtml = $('.post-body').first().html() || '';

  return {
    slug,
    permalink: `${year}/${month}/${day}/${slug}/`,
    date: createdDate($, `${year}-${month}-${day}T00:00:00+00:00`),
    title,
    categories: decodeNames($, '.post-category a', 'categories'),
    tags: decodeNames($, '.post-tags a', 'tags'),
    bodyMd: bodyHtmlToMarkdown(bodyHtml),
  };
}

function writePost(postsDir, post) {
  fs.mkdirSync(postsDir, { recursive: true });
  const file = path.join(postsDir, `${post.slug}.md`);
  if (fs.existsSync(file)) return { skipped: true, file };

  const date = new Date(post.date);
  const front = {
    title: post.title,
    // YAML 时间戳（Date 对象）才不会被 Hexo 当本地字符串再叠一次时区偏移
    date: Number.isNaN(date.getTime()) ? post.date : date,
    permalink: post.permalink,
    categories: post.categories,
    tags: post.tags,
  };
  const content = [
    '---',
    yaml.dump(front, { lineWidth: -1, noRefs: true }).trimEnd(),
    '---',
    '',
    post.bodyMd.trim(),
    '',
  ].join('\n');

  fs.writeFileSync(file, content, 'utf8');
  return { skipped: false, file };
}

function collectPageFiles(srcDir) {
  const files = [];
  if (!fs.existsSync(srcDir)) return files;
  const isDir = (p) => {
    try {
      return fs.statSync(p).isDirectory();
    } catch (err) {
      return false;
    }
  };

  for (const year of fs.readdirSync(srcDir).sort()) {
    const yearDir = path.join(srcDir, year);
    if (!/^\d{4}$/.test(year) || !isDir(yearDir)) continue;
    for (const month of fs.readdirSync(yearDir).sort()) {
      const monthDir = path.join(yearDir, month);
      if (!/^\d{2}$/.test(month) || !isDir(monthDir)) continue;
      for (const day of fs.readdirSync(monthDir).sort()) {
        const dayDir = path.join(monthDir, day);
        if (!/^\d{2}$/.test(day) || !isDir(dayDir)) continue;
        for (const slug of fs.readdirSync(dayDir).sort()) {
          if (!isDir(path.join(dayDir, slug))) continue;
          if (!fs.existsSync(path.join(dayDir, slug, 'index.html'))) continue;
          files.push(`${year}/${month}/${day}/${slug}/index.html`);
        }
      }
    }
  }
  return files;
}

function renderReport({ src, out, total, migrated, skipped, failed }) {
  const lines = [
    '# 迁移报告',
    '',
    `- 来源：\`${src}\``,
    `- 输出：\`${out}\``,
    `- 扫描页面：${total}`,
    `- 新写入：${migrated.length}`,
    `- 跳过（已有同名 md）：${skipped.length}`,
    `- 失败：${failed.length}`,
    '',
  ];
  if (failed.length) {
    lines.push('## 失败清单', '');
    failed.forEach((f) => lines.push(`- \`${f.rel}\`：${f.message}`));
    lines.push('');
  }
  if (skipped.length) {
    lines.push('## 跳过清单', '');
    skipped.forEach((s) => lines.push(`- ${s}`));
    lines.push('');
  }
  lines.push('## 新写入清单', '');
  migrated.forEach((s) => lines.push(`- ${s}`));
  lines.push('');
  return lines.join('\n');
}

function main(argv) {
  const root = path.join(__dirname, '..');
  const args = {
    src: path.join(root, '..', 'shenle2019-pages'),
    out: path.join(root, 'source', '_posts'),
    report: path.join(root, 'docs', 'migration-report.md'),
  };
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (key === '--src' && argv[i + 1]) args.src = path.resolve(argv[++i]);
    else if (key === '--out' && argv[i + 1]) args.out = path.resolve(argv[++i]);
    else if (key === '--report' && argv[i + 1]) args.report = path.resolve(argv[++i]);
  }

  const rels = collectPageFiles(args.src);
  const migrated = [];
  const skipped = [];
  const failed = [];

  rels.forEach((rel) => {
    try {
      const html = fs.readFileSync(path.join(args.src, rel), 'utf8');
      const post = parsePost(html, rel);
      const res = writePost(args.out, post);
      (res.skipped ? skipped : migrated).push(post.slug);
    } catch (err) {
      failed.push({ rel, message: err.message });
    }
  });

  const summary = { src: args.src, out: args.out, total: rels.length, migrated, skipped, failed };
  fs.mkdirSync(path.dirname(args.report), { recursive: true });
  // 报告入库：绝对路径在别人机器上无法复现，统一写相对仓库根的路径
  const toPosix = (p) => path.relative(root, p).replace(/\\/g, '/');
  fs.writeFileSync(
    args.report,
    renderReport({ ...summary, src: toPosix(args.src), out: toPosix(args.out) }),
    'utf8',
  );

  console.log(`扫描 ${rels.length} 篇，新写入 ${migrated.length} 篇，跳过 ${skipped.length} 篇，失败 ${failed.length} 篇`);
  console.log(`报告：${args.report}`);
  failed.forEach((f) => console.error(`FAIL ${f.rel}: ${f.message}`));
  if (failed.length) process.exitCode = 1;
  return summary;
}

if (require.main === module) main(process.argv.slice(2));

module.exports = { parsePost, writePost, collectPageFiles, main };
