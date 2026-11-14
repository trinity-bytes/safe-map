import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--renderer-process-limit=1'],
});
try {
  const page = await browser.newPage();
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(process.env.TEST_URL ?? 'http://127.0.0.1:4321/');
    for (const id of ['privacidad', 'instituciones', 'planes']) {
      const section = page.locator(`#${id}`);
      assert.equal(await section.count(), 1, `${id} exists`);
      assert.equal(await section.evaluate(element => element.scrollWidth <= element.clientWidth), true, `${id} does not overflow`);
    }
    assert.equal(await page.locator('#privacidad .promises > li').count(), 5);
    assert.equal(await page.locator('#privacidad .report-preview').getByText('Vista previa · demo simulada', { exact: true }).count(), 1);
    assert.deepEqual(await page.locator('#instituciones dd').allTextContents(), ['128', '6', '17:00']);
    assert.equal(await page.locator('#instituciones').getByText('Vista previa · cifras de ejemplo', { exact: true }).count(), 1);
    assert.equal(await page.locator('#instituciones .contact-label').evaluate(element => element.tagName), 'SPAN');
    assert.equal(await page.locator('#planes .free .price').textContent(), 'S/ 0');
    assert.equal(await page.locator('#planes .free li').count(), 4);
    assert.equal(await page.locator('#planes .premium li').count(), 5);
    assert.equal(await page.locator('#planes .premium a, #planes .premium button').count(), 0);
    assert.match(await page.locator('#planes .download-strip').getAttribute('href'), /^\/#descargar$/);
    const phoneImage = page.locator('#planes .free .phone img');
    await phoneImage.scrollIntoViewIfNeeded();
    await phoneImage.evaluate(image => image.decode());
    assert.equal(await phoneImage.evaluate(image => image.complete && image.naturalWidth > 0), true);
  }
  console.log('trust-content PASS: privacy promises, demo figures, plans, links and responsive overflow');
} finally {
  await browser.close();
}
