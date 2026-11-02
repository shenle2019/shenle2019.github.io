'use strict';

/**
 * 比对 Hexo 构建产物与线上 gh-pages 的文章 URL 集合。
 *
 * 用法：node scripts/verify-urls.js [--build public] [--pages ../shenle2019-pages]
 *
 * 只要有一侧多出或缺失就退出码 1，用于本地验收和 CI。
 */

const fs = require('node:fs');
const path = require('node:path');

const POST_URL_RE = /^(\d{4}\/\d{2}\/\d{2}\/[^/]+)\/index\.html$/;

/** 收集 YYYY/MM/DD/slug/ 形式的文章 URL（不含分页、归档等页面） */
function collectPostUrls(rootDir) {
  const urls = new Set();
  if (!fs.existsSync(rootDir)) return urls;

  const walk = (dir, rel) => {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const relPath = rel ? `${rel}/${name}` : name;
      let stat;
      try {
        stat = fs.statSync(full);
      } catch (err) {
        continue;
      }
      if (stat.isDirectory()) {
        if (relPath.split('/').length <= 4) walk(full, relPath);
      } else if (name === 'index.html') {
        const m = relPath.match(POST_URL_RE);
        if (m) urls.add(`${m[1]}/`);
      }
    }
  };

  walk(rootDir, '');
  return urls;
}

function compareUrlSets(buildDir, pagesDir) {
  const build = collectPostUrls(buildDir);
  const pages = collectPostUrls(pagesDir);
  const onlyInBuild = [...build].filter((url) => !pages.has(url)).sort();
  const onlyInPages = [...pages].filter((url) => !build.has(url)).sort();
  const matched = [...build].filter((url) => pages.has(url)).length;
  return { onlyInBuild, onlyInPages, matched };
}

function main(argv) {
  const root = path.join(__dirname, '..');
  const args = {
    build: path.join(root, 'public'),
    pages: path.join(root, '..', 'shenle2019-pages'),
  };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--build' && argv[i + 1]) args.build = path.resolve(argv[++i]);
    else if (argv[i] === '--pages' && argv[i + 1]) args.pages = path.resolve(argv[++i]);
  }

  const diff = compareUrlSets(args.build, args.pages);
  if (!diff.onlyInBuild.length && !diff.onlyInPages.length) {
    console.log(`OK ${diff.matched}/${diff.matched}`);
    return diff;
  }

  console.log(`构建缺失 ${diff.onlyInPages.length} 条，构建多出 ${diff.onlyInBuild.length} 条`);
  diff.onlyInPages.forEach((url) => console.log(`- 缺失 ${url}`));
  diff.onlyInBuild.forEach((url) => console.log(`+ 多出 ${url}`));
  process.exitCode = 1;
  return diff;
}

if (require.main === module) main(process.argv.slice(2));

module.exports = { collectPostUrls, compareUrlSets, main };
