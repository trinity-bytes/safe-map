import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, headless: true, args: ['--no-sandbox','--disable-dev-shm-usage','--renderer-process-limit=1'] });
try {
  const page = await browser.newPage({viewport:{width:390,height:844}});
  await page.goto(process.env.TEST_URL ?? 'http://127.0.0.1:4321/safe-map/');
  const menu = page.getByRole('button',{name:'Menú',exact:true});
  await menu.click({timeout:3000});
  assert(await page.getByRole('dialog').isVisible());
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog').count(),0);
  assert(await menu.evaluate(e=>e===document.activeElement));
  await menu.click();
  await page.getByRole('dialog').getByRole('link',{name:'Privacidad',exact:true}).click();
  assert.equal(await page.getByRole('dialog').count(),0);
  console.log('navigation PASS: modal, Escape, focus restoration and link close');
} finally {await browser.close();}
