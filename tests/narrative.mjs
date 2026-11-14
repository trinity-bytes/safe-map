import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const url = process.env.TEST_URL ?? 'http://127.0.0.1:4321/';
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--renderer-process-limit=1'],
});

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url);
  const narrative = page.locator('#como-funciona');
  await page.evaluate(() => window.scrollTo(0, document.querySelector('#como-funciona').getBoundingClientRect().top + window.scrollY));
  await page.waitForFunction(() => document.querySelector('#como-funciona')?.getAttribute('data-enhanced') === 'true');
  await page.waitForFunction(() => document.querySelector('#como-funciona')?.getAttribute('data-active-step') === '0');
  assert.equal(await narrative.locator('.narrative-phone-stage .phone').count(), 1);
  const phoneBefore = await narrative.locator('.narrative-phone-stage .phone').boundingBox();
  await narrative.locator('.narrative-step[data-current="true"] [data-go-step="3"]').focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('#como-funciona')?.getAttribute('data-active-step') === '3');
  await page.waitForTimeout(800);
  const phoneAfter = await narrative.locator('.narrative-phone-stage .phone').boundingBox();
  assert(Math.abs(phoneBefore.x - phoneAfter.x) <= 1);
  assert(Math.abs(phoneBefore.y - phoneAfter.y) <= 1);
  assert.equal(await narrative.locator('.narrative-step[aria-hidden="false"]').count(), 1);
  assert.equal(await narrative.locator('.narrative-phone-stage img[aria-hidden="false"]').count(), 1);
  await narrative.locator('.narrative-step[data-current="true"] [data-go-step="0"]').click();
  await page.waitForFunction(() => document.querySelector('#como-funciona')?.getAttribute('data-active-step') === '0');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await narrative.locator('.narrative-halo').first().evaluate(element => getComputedStyle(element).animationName), 'none');
  await page.close();

  const shortPage = await browser.newPage({ viewport: { width: 390, height: 700 } });
  await shortPage.goto(url);
  assert.notEqual(await shortPage.locator('#como-funciona').getAttribute('data-enhanced'), 'true');
  assert.equal(await shortPage.locator('.narrative-step').count(), 4);
  assert.equal(await shortPage.locator('.narrative-step[aria-hidden="true"]').count(), 0);
  await shortPage.close();

  const noScript = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const fallback = await noScript.newPage();
  await fallback.goto(url);
  assert.equal(await fallback.locator('.narrative-step').count(), 4);
  for (const step of await fallback.locator('.narrative-step').all()) {
    assert(await step.isVisible());
    assert(await step.locator('.fallback-phone img').isVisible());
  }
  assert.equal(await fallback.locator('.narrative-step').nth(3).locator('h3 .mobile-copy').textContent(), 'Y quien tú elijas ve que llegaste bien.');
  await noScript.close();
  console.log('narrative PASS: forward/back stepper, fixed frame, reduced motion, short viewport and no-JS content');
} finally {
  await browser.close();
}
