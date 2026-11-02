'use strict';

/**
 * 把 gh-pages 产物里的文章 HTML 还原成 Hexo 的 Markdown 源文件。
 *
 * 用法：node scripts/migrate-from-pages.js [--src <gh-pages目录>] [--out <_posts目录>]
 *
 * 关键约束：
 * - permalink 用 URL 目录名写死，避免 Hexo 7 按本地时区重排日期导致老链接失效
 * - date 取 URL 里的日期，全天零时（UTC），只用于展示
 * - 已存在的 md 不覆盖（保留手写源文件）
 */

const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const yaml = require('js-yaml');

const POST_RE = /^(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)\/index\.html$/;

const codeToken = (i) => `@@CODEBLOCK${i}@@`;

// 占位符单独成行，可能被 turndown 加了列表缩进或引用前缀
const TOKEN_LINE = /^((?:[ \t]*> ?)*[ \t]*)@@CODEBLOCK(\d+)@@[ \t]*$/gm;

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
  return block
    .split('\n')
    .map((line) => (line ? indent + line : ''))
    .join('\n');
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
    .map((el) => $(el).attr('href') || '')
    .map((href) => {
      let decoded = href;
      try {
        decoded = decodeURIComponent(href);
      } catch (err) {
        /* 保留原串 */
      }
      const m = decoded.match(prefix);
      const name = m ? m[1] : decoded.replace(/^#/, '').replace(/^\/+|\/+$/g, '');
      return name.trim();
    })
    .filter(Boolean);
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

  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
  });
  turndown.keep(['iframe', 'video', 'audio', 'source']);

  const md = turndown.turndown($.html() || '').replace(/\n{3,}/g, '\n\n').trim();
  return insertBlocks(md, blocks).trim();
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
    date: `${year}-${month}-${day}T00:00:00+00:00`,
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

  const front = {
    title: post.title,
    date: post.date,
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
  fs.writeFileSync(args.report, renderReport(summary), 'utf8');

  console.log(`扫描 ${rels.length} 篇，新写入 ${migrated.length} 篇，跳过 ${skipped.length} 篇，失败 ${failed.length} 篇`);
  console.log(`报告：${args.report}`);
  failed.forEach((f) => console.error(`FAIL ${f.rel}: ${f.message}`));
  if (failed.length) process.exitCode = 1;
  return summary;
}

if (require.main === module) main(process.argv.slice(2));

module.exports = { parsePost, writePost, collectPageFiles, main };
