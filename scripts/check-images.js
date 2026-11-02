'use strict';

const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');

// ![alt](path) 或 ![alt](path "title")；data: 内联图与 http(s) 外链不算本地资源
const IMAGE_RE = /!\[[^\]]*\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g;
const EXTERNAL_RE = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

function collectImageRefs(markdown) {
  const refs = new Set();
  let match;
  IMAGE_RE.lastIndex = 0;
  while ((match = IMAGE_RE.exec(markdown))) {
    const ref = match[1];
    if (EXTERNAL_RE.test(ref)) continue;
    refs.add(ref);
  }
  return [...refs];
}

function splitFrontMatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) return { data: {}, body: text };
  // 早年手写文章的 front-matter 用 tab 缩进，YAML 规范不允许；按两空格摊平
  const raw = match[1].replace(/^\t+/gm, (tabs) => '  '.repeat(tabs.length));
  return { data: yaml.load(raw) || {}, body: text.slice(match[0].length) };
}

const pad = (n) => String(n).padStart(2, '0');

// 迁移文章都写死了 permalink；手写文章按 Hexo 默认的 :year/:month/:day/:title/ 推断
function postPermalink(frontMatter, filename) {
  if (frontMatter.permalink) return String(frontMatter.permalink).replace(/^\/+/, '');

  const date = frontMatter.date instanceof Date ? frontMatter.date : new Date(frontMatter.date);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${filename}: front-matter 缺少可用的 date，无法推断 permalink`);
  }
  const slug = path.basename(filename, '.md');
  return `${date.getUTCFullYear()}/${pad(date.getUTCMonth() + 1)}/${pad(date.getUTCDate())}/${slug}/`;
}

function isServed(publicDir, permalink, ref) {
  // /images/x.png 指站点根，其余相对路径相对文章 URL 目录
  const target = ref.startsWith('/')
    ? path.join(publicDir, ref.replace(/^\/+/, ''))
    : path.join(publicDir, permalink, ref);
  return fs.existsSync(target) && fs.statSync(target).isFile();
}

function missingImages(publicDir, permalink, refs) {
  return refs.filter((ref) => !isServed(publicDir, permalink, ref));
}

function scanPosts(postsDir, publicDir) {
  const rows = [];
  for (const name of fs.readdirSync(postsDir).filter((n) => n.endsWith('.md')).sort()) {
    const { data, body } = splitFrontMatter(fs.readFileSync(path.join(postsDir, name), 'utf8'));
    const refs = collectImageRefs(body);
    const permalink = postPermalink(data, name);
    rows.push({ file: name, permalink, total: refs.length, missing: missingImages(publicDir, permalink, refs) });
  }
  return rows;
}

function renderReport(rows) {
  const withMissing = rows.filter((row) => row.missing.length);
  const totalMissing = withMissing.reduce((sum, row) => sum + row.missing.length, 0);

  const lines = [
    '# 缺图清单',
    '',
    '> 生成：`node scripts/check-images.js`。只统计 Markdown 里的本地图片引用（`data:` 内联图与 http(s) 外链不计）。',
    '> 这些图片在原站就已缺失，属于历史遗留，不影响文字内容，可后续按需补图。',
    '',
  ];

  if (!withMissing.length) {
    lines.push(`共 ${rows.length} 篇文章，无缺失。`, '');
    return lines.join('\n');
  }

  lines.push(
    `共 ${rows.length} 篇文章，其中 ${withMissing.length} 篇存在缺失图片，缺失 ${totalMissing} 张。`,
    '',
  );

  for (const row of withMissing) {
    lines.push(`## ${row.file.replace(/\.md$/, '')}`, '');
    lines.push(`- 文章路径：\`source/_posts/${row.file}\``);
    lines.push(`- 线上 URL：\`/${row.permalink}\``);
    lines.push(`- 缺失 ${row.missing.length} 张：`);
    for (const ref of row.missing) lines.push(`  - \`${ref}\``);
    lines.push('');
  }

  return lines.join('\n');
}

function main(argv = process.argv.slice(2)) {
  const root = path.join(__dirname, '..');
  const rows = scanPosts(path.join(root, 'source', '_posts'), path.join(root, 'public'));
  const report = `${renderReport(rows)}\n`;

  // Windows 下 `>` 会按 UTF-16LE 转码，中文全坏；用 --out 让 Node 自己写 UTF-8
  const outIndex = argv.indexOf('--out');
  const outFile = outIndex > -1 ? argv[outIndex + 1] : null;
  if (outFile) fs.writeFileSync(outFile, report, 'utf8');
  else process.stdout.write(report);

  return rows;
}

if (require.main === module) main();

module.exports = {
  collectImageRefs,
  splitFrontMatter,
  postPermalink,
  missingImages,
  scanPosts,
  renderReport,
  main,
};
