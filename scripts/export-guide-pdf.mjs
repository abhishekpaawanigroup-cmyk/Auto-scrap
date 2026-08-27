import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(directory, "../artifacts/carcrush24-complete-vehicle-scrapping-guide.pdf");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await page.goto(process.env.GUIDE_URL || "http://localhost:3001/guide", { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: outputPath, format: "A4", printBackground: true, preferCSSPageSize: true });
const pageCount = await page.locator(".guide-page").count();
if (pageCount !== 12) throw new Error(`Expected 12 guide pages, found ${pageCount}`);
await browser.close();
console.log(`Created ${outputPath} with ${pageCount} pages.`);