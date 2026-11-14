import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {join} from 'node:path';
const output=process.env.QA_SCREENSHOT_DIR;
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--renderer-process-limit=1']});
const errors=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
 if(output) await mkdir(output,{recursive:true});
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});await page.goto(process.env.TEST_URL ?? 'http://127.0.0.1:4321/safe-map/');await page.evaluate(()=>document.fonts.ready);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert(await page.locator('.skip-link').evaluate(e=>e.getBoundingClientRect().bottom<0));
  for(const link of await page.locator('a[href*="#"]').all()) {const href=await link.getAttribute('href');const id=href.split('#')[1];if(id)assert(await page.locator(`[id="${id}"]`).count(),`missing anchor ${id}`);}
  for(const image of await page.locator('img').all()) {await image.evaluate(i=>{i.loading='eager';return i.decode()});assert(await image.evaluate(i=>i.naturalWidth>0));}
  if(width===390){const trigger=page.getByRole('button',{name:'Menú',exact:true});await trigger.click();for(let i=0;i<20;i++){await page.keyboard.press('Tab');assert(await page.locator('dialog').evaluate(e=>!document.hasFocus() || e.contains(document.activeElement)));}for(let i=0;i<20;i++){await page.keyboard.press('Shift+Tab');assert(await page.locator('dialog').evaluate(e=>!document.hasFocus() || e.contains(document.activeElement)));}if(output) await page.screenshot({path:join(output,'mobile-menu.png')});await page.keyboard.press('Escape');assert(await trigger.evaluate(e=>e===document.activeElement));}
  if(width===1440){const markers=page.locator('.narrative-marker');for(let n=0;n<4;n++){await markers.nth(n).evaluate(e=>e.scrollIntoView({block:'start'}));await page.waitForTimeout(150);if(output) await page.locator('.narrative-sticky').screenshot({path:join(output,`narrative-${n+1}.png`)});}}
  await page.evaluate(()=>{if(document.activeElement instanceof HTMLElement)document.activeElement.blur();window.scrollTo(0,0)});
  if(output) await page.screenshot({path:join(output,`${width}.png`),fullPage:true});
 }
 assert.deepEqual(errors,[]);console.log('integration PASS: 1440/390 overflow, all anchors/images, no page/network errors, Tab/Shift+Tab focus trap, Escape restoration');
}finally{await browser.close()}
