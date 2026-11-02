'use strict';

// Next 8 的版权块把 CC 版本硬编码为 4.0，并用图标代替文字，
// 与原站「CC BY-NC-SA 3.0」不一致；渲染完成后精确改写该块，正文不受影响。
const LICENSE_BLOCK_RE = /<li class="post-copyright-license">[\s\S]*?<\/li>/g;
const CC_40_RE = /creativecommons\.org\/licenses\/by-nc-sa\/4\.0\//g;
const ICON_TEXT_RE = /<i class="fab fa-fw fa-creative-commons"><\/i>BY-NC-SA/g;

function rewriteCopyrightHtml(html) {
  return html.replace(LICENSE_BLOCK_RE, (block) =>
    block
      .replace(CC_40_RE, 'creativecommons.org/licenses/by-nc-sa/3.0/')
      .replace(ICON_TEXT_RE, 'CC BY-NC-SA 3.0'),
  );
}

// Hexo 加载 scripts 目录时会把 hexo 实例注入作用域；测试进程里没有该变量，跳过注册。
if (typeof hexo !== 'undefined' && hexo.extend) {
  hexo.extend.filter.register('after_render:html', rewriteCopyrightHtml);
}

module.exports = { rewriteCopyrightHtml };
