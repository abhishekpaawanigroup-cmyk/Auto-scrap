const { chromium } = require('playwright');

const PAGES = [
  '/',
  '/about',
  '/services',
  '/how-it-works',
  '/vehicle-types',
  '/contact',
  '/blog',
  '/privacy-policy',
  '/terms-and-conditions',
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 800 });

  for (const path of PAGES) {
    try {
      await page.goto(`http://localhost:3001${path}`, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(800);
      const info = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const clientWidth = document.documentElement.clientWidth;
        const overflowing = [];
        if (docWidth > clientWidth + 2) {
          // find elements wider than viewport
          document.querySelectorAll('*').forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.right > clientWidth + 2 || r.width > clientWidth + 2) {
              overflowing.push({
                tag: el.tagName,
                cls: (el.className || '').toString().slice(0, 100),
                width: Math.round(r.width),
                right: Math.round(r.right),
              });
            }
          });
        }
        return { docWidth, clientWidth, overflowCount: overflowing.length, overflowing: overflowing.slice(0, 8) };
      });
      console.log(`\n=== ${path} ===`);
      console.log(JSON.stringify(info, null, 0));
    } catch (e) {
      console.log(`\n=== ${path} ===`);
      console.log('ERROR:', e.message);
    }
  }

  await browser.close();
})();
