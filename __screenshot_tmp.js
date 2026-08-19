const { chromium } = require('playwright');
const base = 'C:\\Users\\Admin\\AppData\\Local\\Temp\\claude\\c--Users-Admin-Desktop-Auto-scrap\\24732cda-8949-4381-a2de-13df60bd3088\\scratchpad\\';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('pageerror', err => console.log('PAGEERROR', err.message));
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: base + 'hero_new.png' });

  // click header CTA
  await page.click('header >> text=Get Instant Quote');
  await page.waitForTimeout(600);
  await page.screenshot({ path: base + 'modal_from_header.png' });
  await page.keyboard.press('Escape').catch(() => {});
  // close by clicking backdrop (top-left corner)
  await page.mouse.click(5, 5);
  await page.waitForTimeout(500);

  console.log('done');
  await browser.close();
})();
