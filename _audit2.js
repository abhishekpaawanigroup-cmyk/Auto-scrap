const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('http://localhost:3001/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const result = await page.evaluate(() => {
    const clientWidth = document.documentElement.clientWidth;
    // find the widest/rightmost element with no overflow-hidden ancestor
    let worst = null;
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > clientWidth + 2 && r.width > 0) {
        if (!worst || r.right > worst.right) {
          // build ancestor chain
          const chain = [];
          let cur = el;
          let depth = 0;
          while (cur && depth < 10) {
            const cs = getComputedStyle(cur);
            chain.push({ tag: cur.tagName, cls: (cur.className || '').toString().slice(0, 90), overflow: cs.overflow, overflowX: cs.overflowX, position: cs.position });
            cur = cur.parentElement;
            depth++;
          }
          worst = { tag: el.tagName, cls: (el.className || '').toString().slice(0,120), rect: { x: r.x, right: r.right, width: r.width }, chain };
        }
      }
    });
    return { clientWidth, docScrollWidth: document.documentElement.scrollWidth, worst };
  });
  console.log(JSON.stringify(result, null, 2));

  await browser.close();
})();
