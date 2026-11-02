const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { collectPostUrls, compareUrlSets } = require('./verify-urls.js');

function makeTree(root, urls) {
  for (const url of urls) {
    const dir = path.join(root, url);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), '<html></html>', 'utf8');
  }
  return root;
}

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'hexo-urls-'));
}

test('collectPostUrls 只收集 YYYY/MM/DD/slug 四层文章目录', () => {
  const root = tempDir();
  makeTree(root, ['2021/11/24/demo/', '2023/01/24/《控方证人》影评-usopp/']);
  fs.mkdirSync(path.join(root, 'page', '2'), { recursive: true });
  fs.writeFileSync(path.join(root, 'page', '2', 'index.html'), '', 'utf8');
  fs.mkdirSync(path.join(root, 'archives'), { recursive: true });
  fs.writeFileSync(path.join(root, 'archives', 'index.html'), '', 'utf8');

  const urls = collectPostUrls(root);
  assert.deepEqual([...urls].sort(), ['2021/11/24/demo/', '2023/01/24/《控方证人》影评-usopp/']);
});

test('两侧一致时无差异', () => {
  const build = tempDir();
  const pages = tempDir();
  const urls = ['2021/11/24/a/', '2022/02/02/b/'];
  makeTree(build, urls);
  makeTree(pages, urls);

  const diff = compareUrlSets(build, pages);
  assert.deepEqual(diff.onlyInBuild, []);
  assert.deepEqual(diff.onlyInPages, []);
  assert.equal(diff.matched, 2);
});

test('能分别报出构建多出与线上缺失的 URL', () => {
  const build = tempDir();
  const pages = tempDir();
  makeTree(build, ['2021/11/24/a/', '2022/02/02/b/']);
  makeTree(pages, ['2021/11/24/a/', '2023/03/03/c/']);

  const diff = compareUrlSets(build, pages);
  assert.deepEqual(diff.onlyInBuild, ['2022/02/02/b/']);
  assert.deepEqual(diff.onlyInPages, ['2023/03/03/c/']);
  assert.equal(diff.matched, 1);
});
