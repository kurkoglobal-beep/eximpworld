// Install Playwright separately or set PLAYWRIGHT_MODULE to its index.mjs.
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import { mkdir } from 'node:fs/promises';
const output = process.env.CONTACT_TEST_OUTPUT || 'outputs/contact-email-preview';
await mkdir(output, { recursive: true });
const baseURL = process.env.CONTACT_TEST_URL || 'http://127.0.0.1:3166';
import assert from 'node:assert/strict';
const results=[];
for(const engine of ['chrome','webkit']) {
 const browser=await (engine==='chrome'?chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'}):webkit.launch());
 for(const locale of ['hu','en']) {
  const context=await browser.newContext({viewport:engine==='chrome'?{width:1440,height:1000}:{width:390,height:844}, isMobile:engine==='webkit',hasTouch:engine==='webkit'});
  const page=await context.newPage(); const path=locale==='en'?'/en/contact':'/kapcsolat';
  await page.goto(baseURL+path,{waitUntil:'networkidle'});
  const form=page.locator('form').filter({has:page.locator('[name="deliveryLocation"]')});
  await assert.equal(await form.locator('[name="email"]').count(),1);
  assert.ok(await form.innerText().then(t=>t.includes(locale==='en'?'Online submission is not yet enabled':'Az online küldés még nincs bekötve')));
  await page.route('**/api/contact**',async route=> {
   if(route.request().method()==='GET')await route.fulfill({json:{enabled:true,token:'test-token'}});
   else {const data=route.request().postDataJSON(); assert.equal(data.locale,locale); assert.equal(data.country,'Japan'); await route.fulfill({json:{accepted:true,confirmationSent:true}});}
  });
  await page.reload({waitUntil:'networkidle'});
  for(const [name,value] of Object.entries({company:'Simulation company',contact:'Test Partner',email:'test@example.test',country:'Japan',quantity:'1 drum',deliveryLocation:'Test location'})) await form.locator(`[name="${name}"]`).fill(value);
  await form.locator('[name="product"]').selectOption({index:1});
  await form.locator('button[type="submit"]').click();
  await page.getByRole('status').filter({hasText:locale==='en'?'successfully submitted':'sikeresen továbbítottuk'}).waitFor();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:`${output}/${locale}-${engine}.png`,fullPage:true});
  await page.unroute('**/api/contact**');
  await page.route('**/api/contact**',r=>r.fulfill({status:502,json:{accepted:false,code:'send'}}));
  await form.locator('button[type="submit"]').click();
  await page.getByRole('status').filter({hasText:locale==='en'?'could not be confirmed':'nem sikerült igazolni'}).waitFor();
  assert.equal(await form.locator('[name="email"]').inputValue(),'test@example.test');
  results.push(`${locale}/${engine}: offline warning, existing fields, mocked success/failure, country independent locale, no horizontal overflow PASS`);
  await context.close();
 }
 await browser.close();
}
console.log(results.join('\n'));
