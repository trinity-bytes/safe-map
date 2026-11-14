import assert from 'node:assert/strict';
import { chromium } from 'playwright';

// Run against the integrated page with exactly one browser process at a time.
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--renderer-process-limit=1'],
});
const url = process.env.TEST_URL ?? 'http://127.0.0.1:4321/';
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await page.addInitScript(() => {
    window.__heroPaints = 0;
    window.__texturePaints = 0;
    const clear = CanvasRenderingContext2D.prototype.clearRect;
    CanvasRenderingContext2D.prototype.clearRect = function (...args) {
      if (this.canvas.closest('glyph-field[data-variant="hero"]')) window.__heroPaints++;
      if (this.canvas.closest('glyph-field[data-variant="texture"]')) window.__texturePaints++;
      return clear.apply(this, args);
    };
  });
  await page.goto(url);
  await page.getByRole('heading', { name: 'Llega a tu destino con más tranquilidad.', exact: true }).waitFor();
  await page.waitForFunction(() => window.__heroPaints > 2);
  assert.equal(await page.evaluate(() => window.__texturePaints), 0, 'offscreen textures must not rasterize during startup');
  const canvas = page.locator('glyph-field[data-variant="hero"] canvas');
  assert.equal(await canvas.getAttribute('aria-hidden'), null);
  assert.equal(await canvas.evaluate(node => node.width), 2880);
  assert.equal(await canvas.evaluate(node => node.closest('glyph-field').getAttribute('aria-hidden')), 'true');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(250);
  const stopped = await page.evaluate(() => window.__heroPaints);
  await page.waitForTimeout(350);
  assert.equal(await page.evaluate(() => window.__heroPaints), stopped, 'offscreen hero must stop painting');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
  const reduced = await page.evaluate(() => window.__heroPaints);
  await page.waitForTimeout(350);
  assert.equal(await page.evaluate(() => window.__heroPaints), reduced, 'reduced motion must draw a static field');
  await page.close();

  // The hero fills the viewport, keeps the Figma height as its minimum and the phone keeps bleeding off its bottom edge.
  for (const [width, height, minimum] of [[1440, 900, 900], [1675, 989, 900], [1920, 1200, 900], [390, 844, 880], [430, 932, 880]]) {
    const sized = await browser.newPage({ viewport: { width, height } });
    await sized.goto(url);
    const box = await sized.evaluate(() => {
      const hero = document.querySelector('.hero').getBoundingClientRect();
      const phone = document.querySelector('.hero-phone').getBoundingClientRect();
      return { hero: hero.height, phoneTop: phone.top, phoneBottom: phone.bottom };
    });
    assert.equal(Math.round(box.hero), Math.max(minimum, height), `hero height at ${width}x${height}`);
    assert(box.phoneBottom > box.hero, `phone must bleed off the hero at ${width}x${height}`);
    assert(box.phoneTop < box.hero, `phone must be visible in the hero at ${width}x${height}`);
    await sized.close();
  }

  const noScript = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const fallback = await noScript.newPage();
  await fallback.goto(url);
  assert(await fallback.getByRole('heading', { name: 'Llega a tu destino con más tranquilidad.', exact: true }).isVisible());
  assert(await fallback.getByText('Nadie conoce tu calle mejor que quienes la caminan.', { exact: true }).isVisible());
  await noScript.close();
  console.log('glyph field PASS: DPR, decorative semantics, offscreen pause, reduced motion and no-JS copy');
} finally {
  await browser.close();
}
