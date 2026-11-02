const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { parsePost, writePost } = require('../scripts/migrate-from-pages.js');

const FIXTURES = path.join(__dirname, 'fixtures');
const fixture = (name) => fs.readFileSync(path.join(FIXTURES, name), 'utf8');

const BOOK_REL = '2021/11/24/《控方证人》影评-usopp/index.html';
const CODE_REL = '2023/01/24/python教程学习笔记001/index.html';

test('slug 与 permalink 从 URL 目录名还原（含书名号）', () => {
  const post = parsePost(fixture('book-title.html'), BOOK_REL);
  assert.equal(post.slug, '《控方证人》影评-usopp');
  assert.equal(post.permalink, '2021/11/24/《控方证人》影评-usopp/');
});

test('date 取原站 time 的 datetime 原值，保留时区偏移', () => {
  const post = parsePost(fixture('book-title.html'), BOOK_REL);
  // 原站 datetime="2021-11-24T05:59:41+08:00" 显示为 2021-11-23：
  // 保留偏移交给站点 timezone 换算，才能还原原站显示日期
  assert.equal(post.date, '2021-11-24T05:59:41+08:00');
});

test('缺少 time 时 date 回退到 URL 日期零时', () => {
  const html = '<html><body><div class="post-body"><p>正文</p></div></body></html>';
  const post = parsePost(html, '2021/11/24/demo-post/index.html');
  assert.equal(post.date, '2021-11-24T00:00:00+00:00');
});

test('title 从 post-title 提取', () => {
  const post = parsePost(fixture('book-title.html'), BOOK_REL);
  assert.equal(post.title, '《控方证人》影评-usopp');
});

test('分类与标签从 href 解码', () => {
  const post = parsePost(fixture('book-title.html'), BOOK_REL);
  assert.deepEqual(post.categories, ['影评']);
  assert.deepEqual(post.tags, ['控方证人']);
});

test('标签与分类名取显示文本，保留 href 里被连字符化的空格', () => {
  const html = `<html><body>
    <div class="post-category"><a href="/categories/%E9%83%A8%E7%BD%B2github-pages/">部署github pages</a></div>
    <div class="post-tags"><a href="/tags/github-pages/" rel="tag"># github pages</a></div>
    <div class="post-body"><p>正文</p></div>
  </body></html>`;
  const post = parsePost(html, '2024/01/02/tag-demo/index.html');
  assert.deepEqual(post.categories, ['部署github pages']);
  assert.deepEqual(post.tags, ['github pages']);
});

test('加粗保留为 strong 标签，避免中文标点导致 Markdown 无法闭合', () => {
  const html = '<div class="post-body"><p><strong>CPU：</strong>计算机的核心</p></div>';
  const post = parsePost(html, '2024/01/02/strong-demo/index.html');
  // “**CPU：**计算机”里闭合符前是中文标点、后是汉字，CommonMark 不认为能闭合
  assert.match(post.bodyMd, /<strong>CPU：<\/strong>计算机的核心/);
  assert.doesNotMatch(post.bodyMd, /\*\*CPU/);
});

test('段落内单独成行的编号被转义，不当作有序列表', () => {
  const html = '<div class="post-body"><p>参考答案：<br>1.<br>相同点：<br>列表和元组</p></div>';
  const post = parsePost(html, '2024/01/02/number-demo/index.html');
  assert.match(post.bodyMd, /^1\\\.[ \t]*$/m, '编号应转义为字面量');
  assert.doesNotMatch(post.bodyMd, /^1\.[ \t]*$/m, '裸编号会被渲染成空列表项');
});

test('代码块保留语言与内容', () => {
  const post = parsePost(fixture('code-block.html'), CODE_REL);
  assert.match(post.bodyMd, /```python/);
  assert.match(post.bodyMd, /print/);
});

test('代码块不残留高亮标记与行号', () => {
  const post = parsePost(fixture('code-block.html'), CODE_REL);
  assert.doesNotMatch(post.bodyMd, /<span class="line">/);
  assert.doesNotMatch(post.bodyMd, /figure class="highlight/);
});

test('列表内代码块的围栏整体缩进，开闭一致', () => {
  const post = parsePost(fixture('code-block.html'), CODE_REL);
  const lines = post.bodyMd.split('\n');
  const fenceRows = lines
    .map((line, i) => (/^[ \t]*```/.test(line) ? i : -1))
    .filter((i) => i >= 0);
  assert.ok(fenceRows.length >= 2, '至少有一个 fenced 代码块');
  assert.equal(fenceRows.length % 2, 0, '围栏必须成对出现');
  for (let k = 0; k < fenceRows.length; k += 2) {
    const openIndent = lines[fenceRows[k]].match(/^[ \t]*/)[0];
    const closeIndent = lines[fenceRows[k + 1]].match(/^[ \t]*/)[0];
    assert.equal(closeIndent, openIndent, `第 ${k / 2 + 1} 个代码块开闭缩进不一致`);
  }
});

test('代码内容含反引号行时自动加长围栏', () => {
  const html = `<div class="post-body"><figure class="highlight python">
    <table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span></pre></td>
    <td class="code"><pre><span class="line">\`\`\`</span><br><span class="line">print(1)</span><br></pre></td></tr></table>
  </figure></div>`;
  const post = parsePost(html, '2024/01/02/fence-demo/index.html');
  const lines = post.bodyMd.split('\n');
  const fenceRows = lines.filter((line) => /^`{4,}/.test(line));
  assert.equal(fenceRows.length, 2, '代码块只应有开闭两条围栏');
  assert.match(fenceRows[0], /^`{4,}python$/, '开围栏应加长到 4 个以上反引号');
  assert.equal(fenceRows[1].length, fenceRows[0].match(/^`+/)[0].length, '闭合围栏长度与开围栏一致');
});

test('headerlink 锚点被移除', () => {
  const post = parsePost(fixture('code-block.html'), CODE_REL);
  assert.doesNotMatch(post.bodyMd, /headerlink/);
});

test('writePost 把 date 写成 YAML 时间戳，保留绝对时刻', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hexo-posts-date-'));
  const post = {
    slug: 'demo-date',
    permalink: '2021/11/24/demo-date/',
    date: '2021-11-24T05:59:41+08:00',
    title: 'Demo Date',
    categories: [],
    tags: [],
    bodyMd: '正文',
  };
  writePost(dir, post);
  const content = fs.readFileSync(path.join(dir, 'demo-date.md'), 'utf8');
  const front = content.split('---')[1];
  // 带引号的字符串会被 Hexo 当本地时间再叠一次时区偏移，必须落成 YAML 时间戳
  const data = require('js-yaml').load(front);
  assert.ok(data.date instanceof Date, 'date 应是 YAML 时间戳而非字符串');
  assert.equal(data.date.toISOString(), '2021-11-23T21:59:41.000Z');
});

test('writePost 生成 front-matter 并跳过已存在文件', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hexo-posts-'));
  const post = {
    slug: 'demo-post',
    permalink: '2021/01/02/demo-post/',
    date: '2021-01-02T00:00:00+00:00',
    title: 'Demo Post',
    categories: ['测试'],
    tags: ['demo'],
    bodyMd: '正文',
  };
  const first = writePost(dir, post);
  assert.equal(first.skipped, false);
  const content = fs.readFileSync(path.join(dir, 'demo-post.md'), 'utf8');
  assert.match(content, /^---/);
  assert.match(content, /permalink: 2021\/01\/02\/demo-post\//);
  assert.match(content, /正文/);
  const second = writePost(dir, post);
  assert.equal(second.skipped, true);
});
