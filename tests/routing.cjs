const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../assets/main.js'), 'utf8');
const template = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const templateRoute = template.match(/data-route="([^"]*)"/)[1];

function render(pathname, withRoute = false) {
  const app = { innerHTML: '' };
  const body = { dataset: { route: templateRoute } };
  vm.runInNewContext(source, {
    window: { location: { pathname, origin: 'https://example.com' } },
    document: {
      body,
      querySelector: selector => selector === '#app' ? app : null,
      querySelectorAll: () => [],
      getElementById: () => null,
    },
  });
  return withRoute ? { html: app.innerHTML, route: body.dataset.route } : app.innerHTML;
}

const pages = {
  '/': '골이 들어갔는데',
  '/about': 'WHY WE EXIST / BRAND STORY',
  '/rules': 'THE RULE BOOK',
  '/review': 'GOAL CHECKER',
  '/highlights': 'WATCH DIFFERENTLY',
  '/blog': '짧고 정확한 노트.',
  '/blog/offside-goal': '오프사이드로 골이 취소되는 이유',
};

for (const [url, marker] of Object.entries(pages)) {
  test(`shared Vercel HTML renders the requested page: ${url}`, () => {
    const html = render(url);
    assert.match(html, /<main id="main">/);
    assert.ok(html.includes(marker), url);
    if (url !== '/') {
      assert.notEqual(html, render('/'));
      const navHref = url === '/blog/offside-goal' ? '/blog' : url;
      assert.ok(html.includes(`aria-current="page" href="${navHref}"`));
    }
    assert.equal(render(`${url === '/' ? '' : url}/`), html);
    for (const [, href] of html.matchAll(/href="(\/[^"#]*)"/g)) {
      assert.ok(Object.hasOwn(pages, href), `Unknown internal destination: ${href}`);
    }
  });
}

test('unknown paths display the missing-page screen', () => {
  assert.ok(render('/missing-page').includes('404 / NOT FOUND'));
});

test('shared HTML applies per-page route before page render', () => {
  for (const url of Object.keys(pages)) {
    assert.equal(render(url, true).route, url);
  }
  assert.equal(render('/about/', true).route, '/about');
});

test('ABOUT has one video CTA after the process cards with both official links', () => {
  const html = render('/about');
  const start = html.indexOf('class="about-values"');
  const cta = html.indexOf('class="about-video-cta"');
  const end = html.indexOf('class="about-name"');
  assert.ok(start >= 0 && start < cta && cta < end);
  assert.match(html, /FIFA 공식 하이라이트 보러 가기/);
  assert.equal((html.match(/class="about-video-cta"/g) || []).length, 1);
  assert.equal((html.match(/href="https:\/\/www\.youtube\.com\/@fifa\/videos"/g) || []).length, 2);
});

test('HOME-specific layout styles are isolated from other routes', () => {
  assert.equal(render('/', true).route, '/');
  assert.equal(render('/about', true).route, '/about');
  assert.equal(render('/rules', true).route, '/rules');
  assert.equal(render('/review', true).route, '/review');
  assert.equal(render('/highlights', true).route, '/highlights');
  assert.equal(render('/blog', true).route, '/blog');
});
