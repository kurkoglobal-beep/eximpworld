import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validate, messages, token, checkToken, deliver } from '../../lib/contact/core.ts';
const secret = 'test-only-secret-with-at-least-32-characters';
const base = { locale: 'hu', company: 'Test company', contact: 'Test Partner', email: 'partner@example.test', country: 'United Kingdom', product: 'ipa', quantity: '1 drum', deliveryLocation: 'Test', additionalInformation: 'Test notes' };
function harness() {
 const saved = new Map(), counts = new Map(), sent = [];
 const store = {
  async limit(k,n) { const value = (counts.get(k)||0)+1; counts.set(k,value); return value<=n; },
  async claim(k,fingerprint) { if(saved.has(k)) return false; saved.set(k,{fingerprint}); return true; },
  async read(k) {return saved.get(k)||null},
  async finish(k,fingerprint,receipt) {saved.set(k,{fingerprint,receipt})},
 };
 return { sent, deps: {store, secret, from: 'info@eximpworld.hu', log() {}, async send(mail) {sent.push(mail); return true;} } };
}
test('language alone selects fixed recipient; arbitrary client recipient ignored', () => {
 for (const locale of ['hu','en']) {
  const data = validate({...base, locale, country: locale==='hu'?'United Kingdom':'Hungary', to:'attacker@example.test'});
  const [primary, confirmation] = messages(data, 'info@eximpworld.hu');
  const expected = locale==='hu'?'info@eximpworld.hu':'eximpworldltd@eximpworld.hu';
  assert.equal(primary.to,expected); assert.equal(primary.replyTo,base.email);
  assert.equal(confirmation.replyTo,expected); assert.equal(confirmation.to,base.email);
  assert.equal(confirmation.from,'info@eximpworld.hu');
  assert.ok(primary.text.includes('additionalInformation: Test notes'));
  assert.ok(confirmation.text.includes(locale==='hu'?'Tisztelt Partnerünk!':'Dear Partner,'));
 }
});
test('all mandatory fields, invalid locale/email, oversize and spam rejected', () => {
 for (const field of ['company','contact','email','country','product','quantity','deliveryLocation']) assert.throws(()=>validate({...base,[field]:''}));
 for (const patch of [{locale:'uk'},{email:'x@example.test\r\nBcc: x@y.test'},{website:'bot'},{company:'a'.repeat(301)},{additionalInformation:'a'.repeat(5001)},{requestDocumentation:'no'}]) assert.throws(()=>validate({...base,...patch}));
});
test('token verifies language, client, timing and signature', () => {
 const now=Date.now(), t=token(secret,'hu','client',now);
 assert.ok(checkToken(secret,t,'hu','client',now+3000));
 for (const args of [[t,'en','client',now+3000],[t,'hu','other',now+3000],[t,'hu','client',now+100],[t,'hu','client',now+1800001],[t+'x','hu','client',now+3000]]) assert.throws(()=>checkToken(secret,...args));
});
test('primary then confirmation, completed retries do not send twice', async()=> {
 const {deps,sent}=harness(), data=validate(base);
 assert.deepEqual(await deliver(data,'id','client',deps),{accepted:true,confirmationSent:true});
 assert.equal(sent[0].to,'info@eximpworld.hu'); assert.equal(sent[1].to,base.email);
 await deliver(data,'id','client',deps); assert.equal(sent.length,2);
 await assert.rejects(deliver(validate({...base,quantity:'2'}),'id','client',deps));
});
test('primary rejection/exception never confirms, retry cannot duplicate uncertain send', async()=> {
 for (const throws of [false,true]) {
  const {deps}=harness(); let attempts=0;
  deps.send=async()=>{attempts++; if(throws)throw Error('smtp'); return false;};
  await assert.rejects(deliver(validate(base),'id','client',deps));
  await assert.rejects(deliver(validate(base),'id','client',deps));
  assert.equal(attempts,1);
 }
});
test('confirmation failure preserves primary acceptance and is reported', async()=> {
 const {deps}=harness(); let count=0;
 deps.send=async()=>{ if(++count===2)throw Error('smtp'); return true; };
 assert.deepEqual(await deliver(validate(base),'id','client',deps),{accepted:true,confirmationSent:false});
});
test('shared store failure prevents SMTP', async()=> {
 const {deps,sent}=harness(); deps.store.read=async()=>{throw Error('unavailable')};
 await assert.rejects(deliver(validate(base),'id','client',deps)); assert.equal(sent.length,0);
});
test('rate limit prevents fourth email within window', async()=> {
 const {deps,sent}=harness();
 for(let i=0;i<3;i++)await deliver(validate(base),String(i),'client',deps);
 await assert.rejects(deliver(validate(base),'four','client',deps),e=>e.code==='rate');
 assert.equal(sent.length,6);
});
test('simultaneous duplicate request sends only one primary', async()=> {
 const {deps,sent}=harness();
 const results=await Promise.allSettled([deliver(validate(base),'id','client',deps),deliver(validate(base),'id','client',deps)]);
 assert.equal(results.filter(r=>r.status==='fulfilled').length,1); assert.equal(sent.length,2);
});
