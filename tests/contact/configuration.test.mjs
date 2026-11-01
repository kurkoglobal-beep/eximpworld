import { test } from 'node:test';
import assert from 'node:assert/strict';
import { configuration } from '../../lib/contact/server.ts';
const simulated = {
 CONTACT_EMAIL_ENABLED: 'true', CONTACT_DELIVERY_VERIFIED: 'true',
 SMTP_PASSWORD: 'simulation-only-not-a-real-password',
 CONTACT_TOKEN_SECRET: 'simulation-only-secret-at-least-32-characters',
 CONTACT_REDIS_URL: 'rediss://example.invalid:6379',
};
test('approved Sybell defaults select implicit TLS and authenticated sender', () => {
 const config=configuration(simulated);
 assert.equal(config.host,'mail.eximpworld.hu'); assert.equal(config.port,465);
 assert.equal(config.secure,true); assert.equal(config.user,'info@eximpworld.hu');
 assert.equal(config.from,'info@eximpworld.hu');
});
test('explicit user-provided SMTP settings are accepted without connecting',()=>{
 const config=configuration({...simulated,SMTP_HOST:'mail.eximpworld.hu',SMTP_PORT:'465',SMTP_SECURE:'true',SMTP_USER:'info@eximpworld.hu'});
 assert.equal(config.secure,true); assert.equal(config.port,465);
});
test('missing password, shared store or verification keeps sending disabled',()=>{
 assert.equal(configuration({}),null);
 for(const key of ['SMTP_PASSWORD','CONTACT_REDIS_URL','CONTACT_TOKEN_SECRET','CONTACT_EMAIL_ENABLED','CONTACT_DELIVERY_VERIFIED']) assert.equal(configuration({...simulated,[key]:''}),null);
});
test('contradictory TLS settings and unauthorized senders are rejected',()=>{
 for(const patch of [{SMTP_SECURE:'false'},{SMTP_PORT:'587',SMTP_SECURE:'true'},{SMTP_PORT:'25'},{SMTP_USER:'other@example.test'},{SMTP_FROM:'other@example.test'}]) assert.equal(configuration({...simulated,...patch}),null);
});
test('REDIS_URL is used when CONTACT_REDIS_URL is absent or empty',()=>{
 for(const primary of [undefined,'']) {
  const config=configuration({...simulated,CONTACT_REDIS_URL:primary,REDIS_URL:'rediss://default:test@fallback.example.invalid:6379'});
  assert.equal(config.redis,'rediss://default:test@fallback.example.invalid:6379');
 }
});
test('CONTACT_REDIS_URL takes precedence, without hiding invalid primary settings',()=>{
 assert.equal(configuration({...simulated,REDIS_URL:'rediss://fallback.example.invalid:6379'}).redis,simulated.CONTACT_REDIS_URL);
 assert.equal(configuration({...simulated,CONTACT_REDIS_URL:'redis://insecure.example.invalid',REDIS_URL:'rediss://fallback.example.invalid'}),null);
});
test('both Redis URL sources reject non-TLS and malformed URLs',()=>{
 for(const value of ['redis://example.invalid','https://example.invalid','rediss://','rediss://:bad','not-a-url']) {
  assert.equal(configuration({...simulated,CONTACT_REDIS_URL:value}),null);
  assert.equal(configuration({...simulated,CONTACT_REDIS_URL:undefined,REDIS_URL:value}),null);
 }
});
test('REDIS_URL never overrides disabled email switches',()=>{
 for(const flag of ['CONTACT_EMAIL_ENABLED','CONTACT_DELIVERY_VERIFIED']) {
  assert.equal(configuration({...simulated,CONTACT_REDIS_URL:undefined,REDIS_URL:'rediss://example.invalid',[flag]:'false'}),null);
 }
});
