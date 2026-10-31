/** Browser regression check. Requires Playwright and Chrome (or BROWSER_EXECUTABLE).
 * PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node scripts/check-routing-browser.mjs [base URL]
 */
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.argv[2] || 'http://127.0.0.1:3148';
const browser = await chromium.launch({
  executablePath: process.env.BROWSER_EXECUTABLE || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const errors = [];
let switches = 0;
try {
 for (const [device, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
  page.setDefaultNavigationTimeout(15000);
  page.setDefaultTimeout(15000);
  page.on('pageerror', error => errors.push(String(error)));
  await page.goto(base + '/en');
  const xml = await (await page.request.get(base + '/sitemap.xml')).text();
  const pairs = await page.evaluate(xml => {
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    return [...doc.getElementsByTagName('url')].map(entry => {
      const links = [...entry.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'link')];
      return Object.fromEntries(links.map(l => [l.getAttribute('hreflang'), new URL(l.getAttribute('href')).pathname]));
    }).filter((p, i, all) => all.findIndex(x => x.hu === p.hu) === i);
  }, xml);
  pairs.push({ hu:'/adatvedelem', en:'/en/privacy-policy' }, { hu:'/sutik', en:'/en/cookie-policy' }, { hu:'/aszf', en:'/en/terms-and-conditions' });
  for (const pair of pairs) {
    console.log(device, pair.hu);
    await page.goto(base + pair.hu + '?utm_source=routing-test#routing-anchor');
    for (const lang of ['en', 'hu']) {
      await page.locator('.market-selector summary').click();
      await Promise.all([
        page.waitForURL(u => u.pathname === pair[lang] && u.searchParams.get('utm_source') === 'routing-test'),
        page.locator(`.market-options a[lang="${lang}"]`).click(),
      ]);
      await page.waitForLoadState('load');
      assert.equal(new URL(page.url()).hash, '#routing-anchor');
      assert.equal(new URL(page.url()).searchParams.has('lang'), false);
      assert.equal(await page.locator('html').getAttribute('lang'), lang);
      assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), 'https://eximpworld.hu' + (pair[lang] === '/' ? '' : pair[lang]));
      assert.equal(await page.locator('main').getByText(/^(Product not found\.|Service not found\.)$/).count(), 0);
      switches++;
    }
  }
  await page.goto(base + '/en/about');
  if (device === 'mobile') await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page.locator('header nav a').filter({ hasText: /^Products$/ }).filter({ visible: true }).click();
  await page.waitForURL(base + '/en/products');
  if (device === 'mobile') await page.getByRole('button', { name: 'Menu', exact: true }).click();
  const active = page.locator('header nav a[aria-current=page]').filter({ visible: true });
  assert.equal(await active.innerText(), 'Products');
  if (device === 'mobile') await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page.locator('main a[href="/en/products/isopropyl-alcohol"]').click();
  await page.waitForURL(base + '/en/products/isopropyl-alcohol');
  const quote = page.locator('main a[href^="/en/contact?"]').first();
  const quoteHref = await quote.getAttribute('href');
  assert.ok(new URL(quoteHref, base).searchParams.has('product'));
  await quote.click();
  await page.waitForURL(u => u.pathname === '/en/contact');
  assert.ok(await page.locator('select[name=product]').inputValue());
  await page.goto(base + '/en/contact?product=ipa&packaging=ibc#quote');
  assert.equal(await page.locator('select[name=packaging]').inputValue(), '1000 L IBC');
  if (device === 'desktop') {
    await page.locator('header button').filter({ hasText: /^EN\s*$/ }).click();
  } else {
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await page.getByRole('button', { name: 'HU / EN', exact: true }).click();
  }
  await page.waitForURL(u => u.pathname === '/kapcsolat');
  assert.equal(new URL(page.url()).searchParams.get('packaging'), 'ibc');
  assert.equal(new URL(page.url()).hash, '#quote');
  assert.equal(await page.locator('select[name=packaging]').inputValue(), '1000 L IBC');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false);
  console.log(`PASS: ${device}: 40 HU/EN page pairs, dropdown and button toggles, navigation/active menu, product detail/RFQ, query/hash preservation.`);
  await page.close();
 }
 assert.deepEqual(errors, [], 'Browser runtime/hydration errors');
 console.log(`PASS: ${switches} language switches; zero browser errors.`);
} finally {
 await browser.close();
}
