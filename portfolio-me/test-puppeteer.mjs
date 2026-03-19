import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('http://localhost:5173');
    await page.waitForSelector('.hero');
    await new Promise(r => setTimeout(r, 2000));
    const heroHtml = await page.$eval('.hero', el => el.innerHTML);
    console.log(heroHtml);
    await browser.close();
  } catch(e) { console.error(e); }
})();
