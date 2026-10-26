/* Browser-level responsive regression checks for ZERO ELEVEN.
   Run: npm install --no-save --no-package-lock playwright
        npx playwright install chromium
        node tests/responsive.cjs
*/
'use strict';
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'artifacts', 'responsive-screenshots');
const widths = [1920, 1440, 1280, 1024, 768, 390, 375, 320];
const routes = [
  '/', '/about', '/rules', '/review',
  '/highlights', '/blog', '/blog/offside-goal'
];
const markers = {
  '/': '골이 들어갔는데',
  '/about': 'WHY WE EXIST / BRAND STORY',
  '/rules': 'THE RULE BOOK',
  '/review': 'GOAL CHECKER',
  '/highlights': 'WATCH DIFFERENTLY',
  '/blog': '짧고 정확한 노트.',
  '/blog/offside-goal': '오프사이드로 골이 취소되는 이유',
};
const mime = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript',
  '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png',
  '.txt':'text/plain', '.xml':'application/xml' };

function createServer() {
  return http.createServer((req, res) => {
    try {
      const uri = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const file = uri.startsWith('/assets/') ? path.join(root, uri.slice(1)) : path.join(root, 'index.html');
      if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) {
        res.writeHead(404); res.end('Not found'); return;
      }
      res.writeHead(200, {
        'Content-Type': (mime[path.extname(file)] || 'application/octet-stream') + '; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
      fs.createReadStream(file).pipe(res);
    } catch (error) {
      res.writeHead(500); res.end(String(error));
    }
  });
}

async function main() {
  fs.mkdirSync(output, { recursive: true });
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({headless:true, args:['--no-sandbox']});
  const errors = [];
  let tested = 0;
  try {
    for (const width of widths) {
      const height = width <= 390 ? (width === 320 ? 568 : 844) : width === 768 ? 1024 : 900;
      const page = await browser.newPage({viewport:{width,height}, deviceScaleFactor:1});
      page.on('pageerror', error => errors.push(width + ': JavaScript ' + error.message));
      for (const route of routes) {
        const label = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
        try {
          const resp = await page.goto(base + route, {waitUntil:'load', timeout:25000});
          assert.equal(resp.status(), 200, 'HTTP ' + route);
          await page.locator('main#main').waitFor({state:'visible', timeout:7000});
          await page.evaluate(() => document.fonts.ready);
          const check = await page.evaluate(() => {
            const rect = s => {
              const node = document.querySelector(s);
              if (!node) return null;
              const r = node.getBoundingClientRect();
              return {left:r.left, right:r.right, width:r.width, height:r.height};
            };
            const touch = [...document.querySelectorAll('.button,.menu-button,.stadium-hero-buttons a')]
              .filter(n => getComputedStyle(n).display !== 'none' && n.getBoundingClientRect().width > 0)
              .map(n => ({name:n.className, height:Math.round(n.getBoundingClientRect().height)}));
            const brokenImages = [...document.images]
              .filter(n => n.complete && n.naturalWidth === 0).map(n => n.src);
            return {
              route:document.body.dataset.route,
              scrollWidth:document.documentElement.scrollWidth,
              viewport:document.documentElement.clientWidth,
              text:document.body.innerText,
              headerPosition:getComputedStyle(document.querySelector('.site-header')).position,
              logo:rect('.stadium-logo-display'),
              cta:rect('.about-video-cta'),
              ctaImage:rect('.about-video-thumb'),
              mobileMenu:rect('.menu-button'),
              touch,brokenImages,
            };
          });
          assert.equal(check.route, route, 'Incorrect CSS page scope');
          assert.ok(check.text.includes(markers[route]), 'Missing page content');
          assert.ok(check.scrollWidth <= check.viewport + 1,
            'Horizontal overflow ' + check.scrollWidth + ' > ' + check.viewport);
          assert.equal(check.headerPosition, route === '/' ? 'absolute' : 'sticky');
          assert.equal(check.brokenImages.length, 0, 'Missing images: ' + check.brokenImages.join(', '));
          if (route === '/') {
            assert.ok(check.logo && check.logo.left >= -1 && check.logo.right <= width + 1,
              'HOME logo clipped');
          }
          if (route === '/about') {
            assert.ok(check.cta && check.cta.width > 0 && check.ctaImage,
              'ABOUT video CTA missing');
            assert.equal(await page.locator('.about-video-cta a[href="https://www.youtube.com/@fifa/videos"]').count(), 2);
          }
          if (width <= 700) {
            for (const touch of check.touch) {
              assert.ok(touch.height >= 48, 'Touch target <48px: ' + JSON.stringify(touch));
            }
          }
          await page.screenshot({
            path:path.join(output, width + '-' + label + '.png'),
            fullPage:false, animations:'disabled'
          });
          tested++;
          process.stdout.write('PASS ' + width + 'px ' + route + '\n');
        } catch (error) {
          errors.push(width + 'px ' + route + ': ' + error.message);
          await page.screenshot({
            path:path.join(output, width + '-' + label + '-FAILED.png'),
            fullPage:true, animations:'disabled'
          }).catch(() => {});
        }
      }
      await page.close();
    }
    const navPage = await browser.newPage({viewport:{width:1440,height:900}});
    await navPage.goto(base + '/', {waitUntil:'load'});
    for (const [href,label] of [['/about','BRAND'],['/rules','RULES'],['/review','GAME'],
      ['/highlights','HIGHLIGHTS'],['/blog','BLOG']]) {
      await navPage.locator('.nav-desktop a[href="' + href + '"]').click();
      assert.equal(new URL(navPage.url()).pathname, href, label + ' links to wrong page');
      assert.equal(await navPage.evaluate(() => window.scrollY), 0, 'Page failed to start at top');
      assert.equal(await navPage.locator('.nav-desktop a[aria-current="page"]').getAttribute('href'), href);
      await navPage.goto(base + '/', {waitUntil:'load'});
    }
    await navPage.close();
    const mobile = await browser.newPage({viewport:{width:390,height:844}});
    await mobile.goto(base + '/', {waitUntil:'load'});
    await mobile.locator('#menuButton').click();
    assert.equal(await mobile.locator('#menuButton').getAttribute('aria-expanded'), 'true');
    await mobile.locator('#mobileMenu a[href="/review"]').click();
    assert.equal(new URL(mobile.url()).pathname, '/review');
    await mobile.close();
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
  console.log('Responsive screenshots: ' + output);
  console.log('Successful page / viewport combinations: ' + tested + '/' + (routes.length * widths.length));
  if (errors.length) {
    console.error('Failures:\n' + errors.join('\n'));
    process.exitCode = 1;
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
