import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--renderer-process-limit=1'],
});

try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(process.env.TEST_URL ?? 'http://127.0.0.1:4321/safe-map/');
    const team = page.locator('#equipo');
    assert.equal(await team.locator('li').count(), 5);
    assert.deepEqual(await team.locator('h3').allTextContents(), [
      'Piero Espada', 'Mariana Morocho', 'Fabrizio Santi', 'Mauricio Terán', 'Jahat Trinidad',
    ]);
    assert.equal(await team.locator('a').count(), 0);
    assert.deepEqual(await page.locator('.goal-number').allTextContents(), ['< 5 min', '40 %', '3', '0']);
    assert.equal(await page.locator('.goal-label').count(), 4);
    assert.match(await page.locator('.goals-note').innerText(), /No son resultados/);

    const faq = page.locator('#preguntas');
    assert.equal(await faq.locator('details').count(), 6);
    assert.equal(await faq.locator('details[open]').count(), 1);
    for (const answer of await faq.locator('details .answer').allTextContents()) assert.ok(answer.trim().length > 0);
    assert.match(await faq.locator('details').nth(4).locator('.answer').textContent(), /105/);
    const details = faq.locator('details').first();
    assert.equal(await details.getAttribute('open'), '');
    const summary = details.locator('summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    assert.equal(await details.getAttribute('open'), null);
    await page.keyboard.press('Space');
    assert.equal(await details.getAttribute('open'), '');
    assert.match(await faq.locator('.emergency-note').innerText(), /llama al 105/);

    const download = page.locator('#descargar');
    const storeBadge = download.locator('.store-badge');
    assert.equal(await storeBadge.getAttribute('aria-disabled'), 'true');
    assert.equal(await storeBadge.getAttribute('href'), null);
    assert.match(await storeBadge.innerText(), /Próximamente en\s+Google Play/);
    assert.equal(await download.locator('source[type="image/avif"]').count(), 1);
    assert.equal(await download.locator('source[type="image/webp"]').count(), 1);
    assert.doesNotMatch(await download.innerText(), /PLACEHOLDER/);
    await context.close();
  }
  console.log('closing content PASS: team, honest goals, native FAQ and inactive download at 1440/390 without JavaScript');
} finally {
  await browser.close();
}
