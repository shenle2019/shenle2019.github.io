'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { rewriteCopyrightHtml } = require('../scripts/theme-copyright.js');

// Next 8 默认版权块：图标 + BY-NC-SA，链接硬编码 4.0，与原站 3.0 文案不一致
const NEXT_BLOCK = `<li class="post-copyright-license">
  <strong>版权声明： </strong>本博客所有文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" rel="external nofollow" target="_blank"><i class="fab fa-fw fa-creative-commons"></i>BY-NC-SA</a> 许可协议。转载请注明出处！
</li>`;

test('把 Next 8 默认版权块还原成原站的 CC BY-NC-SA 3.0', () => {
  const out = rewriteCopyrightHtml(NEXT_BLOCK);

  assert.ok(out.includes('href="https://creativecommons.org/licenses/by-nc-sa/3.0/"'), '链接应指向 3.0');
  assert.ok(out.includes('>CC BY-NC-SA 3.0</a>'), '链接文字应为 CC BY-NC-SA 3.0');
  assert.ok(!out.includes('4.0'), '不应残留 4.0');
  assert.ok(out.includes('本博客所有文章除特别声明外'), '文案主体保持不变');
  assert.ok(out.includes('转载请注明出处！'), '结尾提示保持不变');
});

test('只改版权块，正文里的 4.0 链接保持原样', () => {
  const html =
    '<p><a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">正文提到的协议</a></p>' +
    NEXT_BLOCK;

  const out = rewriteCopyrightHtml(html);

  assert.ok(out.includes('<p><a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">正文提到的协议</a></p>'), '正文链接不应被改写');
  assert.ok(out.includes('href="https://creativecommons.org/licenses/by-nc-sa/3.0/"'), '版权块应改为 3.0');
});

test('页面没有版权块时原样返回', () => {
  const html = '<p>hello</p>';

  assert.equal(rewriteCopyrightHtml(html), html);
});
