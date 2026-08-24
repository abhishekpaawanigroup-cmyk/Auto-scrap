const { chromium } = require('playwright');
const base = 'C:\\Users\\Admin\\AppData\\Local\\Temp\\claude\\c--Users-Admin-Desktop-Auto-scrap\\f3734ec2-80b1-4b51-996d-ada1c3d8ec00\\scratchpad\\';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', err => errors.push('PAGEERROR: ' + err.message));
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  const footerTop = await page.evaluate(() => {
    const f = document.querySelector('footer');
    return f.getBoundingClientRect().top + window.scrollY;
  });
  await page.evaluate((t) => window.scrollTo(0, t - 20), footerTop);
  await page.waitForTimeout(500);
  await page.screenshot({ path: base + 'footer_theme_check.png' });

  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 400) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(35);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  const cw = await page.evaluate(() => document.documentElement.clientWidth);
  console.log('overflow?', sw > cw, sw, cw);
  console.log('ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
