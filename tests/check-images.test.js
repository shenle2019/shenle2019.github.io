'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const yaml = require('js-yaml');

const {
  collectImageRefs,
  splitFrontMatter,
  postPermalink,
  missingImages,
  scanPosts,
  renderReport,
} = require('../scripts/check-images.js');

test('只收相对与站点绝对图片引用，过滤内联图与外链', () => {
  const md = [
    '![a](imgs/1.png)',
    '![b](https://example.com/y.png)',
    '![c](data:image/png;base64,AAAA)',
    '![d](imgs/1.png)',
    '![e](/Users/me/imgs/2.png)',
  ].join('\n');

  assert.deepEqual(collectImageRefs(md), ['imgs/1.png', '/Users/me/imgs/2.png']);
});

test('front-matter 用 tab 缩进时仍能解析（手写老文章）', () => {
  const text = '---\ntitle: demo\ntags: \n\t- hexo\n\t- blog\ndate: 2021-11-21 12:53:12\n---\n\n正文';

  const { data } = splitFrontMatter(text);

  assert.deepEqual(data.tags, ['hexo', 'blog']);
  assert.equal(data.date.getUTCFullYear(), 2021);
});

test('permalink 优先取 front-matter，缺失时按 date + 文件名推断', () => {
  assert.equal(
    postPermalink({ permalink: '2024/03/14/爬虫005-requests高级/' }, '任意.md'),
    '2024/03/14/爬虫005-requests高级/',
  );

  const fm = yaml.load('date: 2021-11-21 12:53:12');
  assert.equal(
    postPermalink(fm, '用-Hexo-和-GitHub-Pages-搭建博客-usopp.md'),
    '2021/11/21/用-Hexo-和-GitHub-Pages-搭建博客-usopp/',
  );
});

test('文章目录下缺失的图片被列出，存在的与站点绝对路径被正确判断', () => {
  const pub = fs.mkdtempSync(path.join(os.tmpdir(), 'hexo-img-'));
  const permalink = '2024/03/14/demo/';
  fs.mkdirSync(path.join(pub, permalink, 'imgs'), { recursive: true });
  fs.writeFileSync(path.join(pub, permalink, 'imgs', 'ok.png'), 'x');
  fs.mkdirSync(path.join(pub, 'images'), { recursive: true });
  fs.writeFileSync(path.join(pub, 'images', 'site.jpg'), 'x');

  assert.deepEqual(
    missingImages(pub, permalink, [
      'imgs/ok.png',
      'imgs/nope.png',
      '/images/site.jpg',
      '/Users/me/x.png',
    ]),
    ['imgs/nope.png', '/Users/me/x.png'],
  );
});

test('扫描范围覆盖全部文章，报告里的总数不丢没有图片的文章', () => {
  const posts = fs.mkdtempSync(path.join(os.tmpdir(), 'hexo-posts-'));
  const pub = fs.mkdtempSync(path.join(os.tmpdir(), 'hexo-pub-'));
  fs.writeFileSync(
    path.join(posts, 'with.md'),
    '---\npermalink: 2024/03/14/with/\n---\n![x](imgs/a.png)\n',
  );
  fs.writeFileSync(
    path.join(posts, 'without.md'),
    '---\npermalink: 2024/03/14/without/\n---\n纯文字\n',
  );

  const rows = scanPosts(posts, pub);

  assert.equal(rows.length, 2);
  assert.deepEqual(rows.find((row) => row.file === 'without.md').missing, []);
  assert.ok(renderReport(rows).includes('共 2 篇文章'));
});

test('报告按文章分组并统计缺失总数', () => {
  const rows = [
    { file: 'a.md', permalink: '2024/03/14/a/', total: 2, missing: ['imgs/1.png'] },
    { file: 'b.md', permalink: '2024/03/14/b/', total: 1, missing: [] },
  ];

  const md = renderReport(rows);

  assert.ok(md.includes('共 2 篇文章'));
  assert.ok(md.includes('1 篇存在缺失图片'));
  assert.ok(md.includes('缺失 1 张'));
  assert.ok(md.includes('source/_posts/a.md'));
  assert.ok(md.includes('`imgs/1.png`'));
  assert.ok(!md.includes('source/_posts/b.md'), '没有缺失的文章不单独列出');
});

test('没有任何缺失时报告写明无缺失', () => {
  const md = renderReport([{ file: 'b.md', permalink: '2024/03/14/b/', total: 1, missing: [] }]);

  assert.ok(md.includes('无缺失'));
});
