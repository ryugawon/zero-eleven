const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../assets/main.js'), 'utf8');
const template = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const templateRoute = template.match(/data-route="([^"]*)"/)[1];

function render(pathname) {
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
  assert.equal(body.dataset.route, pathname.replace(/\/+$/, '') || '/');
  return app.innerHTML;
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

test('every navigation section points to an existing page and section', () => {
  const html = render('/');
  const links = [...html.matchAll(/href="(\/[^\"]*#[^\"]+)"/g)];
  assert.ok(links.length >= 12);
  for (const [, destination] of links) {
    const [url, id] = destination.split('#');
    assert.ok(Object.hasOwn(pages, url), destination);
    assert.ok(render(url).includes(`id="${id}"`), destination);
  }
});
