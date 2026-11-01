# Kapcsolati űrlapok – Preview, 2026-11-01

## Állapot

A szerveroldali megoldás elkészült, az online küldés alapértelmezetten **kikapcsolva**. Valós SMTP-kapcsolatot és postaládába kézbesítést nem teszteltünk; nincs rendelkezésre bocsátott Sybell szerver/jelszó vagy engedélyezett tesztpostafiók. Élesítés nem történt.

## Címzés és működés

- Magyar űrlap → `info@eximpworld.hu`.
- Angol űrlap → `eximpworldltd@eximpworld.hu`.
- Mindkét levél feladója: `info@eximpworld.hu`, a Sybell engedélyezett SMTP-fiókjával.
- Belső megkeresés Reply-To: a kitöltő címe. Automatikus visszaigazolás Reply-To: az adott nyelv fent megadott vállalati címe.
- A címzett szerveroldali állandó, kizárólag az ellenőrzött `hu`/`en` változatból származik. Ország, IP vagy kliens által küldött címzett nem írhatja felül.
- Minden meglévő mező bekerül a sima szöveges levélbe. Az eredeti mezők, katalógus, navigáció és megjelenés megmaradnak. A kikapcsolt mód letöltést és a megfelelő címre mutató mailto hivatkozást biztosít.
- A megadott nyelvi visszaigazolás csak a vállalati levél SMTP-elfogadása után indul. SMTP-elfogadás nem bizonyít postaládába kézbesítést.
- Visszaigazolási hiba esetén a vállalati beküldés sikerét és a visszaigazolás bizonytalanságát külön közöljük; nem küldünk újra automatikusan.

## Módosított fájlok

- `components/rfq-form.tsx`: státuszlekérés, token, API-beküldés, lokalizált visszajelzés és offline címzés.
- `app/api/contact/route.ts`: GET elérhetőség/token, POST ellenőrzött beküldés.
- `lib/contact/core.ts`: validáció, nyelvi címzés, levelek, aláírt token, idempotencia és korlátok.
- `lib/contact/server.ts`: Nodemailer SMTP és megosztott Redis adapter.
- `package.json`, `package-lock.json`: Nodemailer, Redis kliens és Nodemailer típusok.
- `tests/contact/email.test.mjs`: szimulált egységtesztek.
- `tests/contact/browser.mjs`: Chrome/mobil WebKit tesztek, szimulált API-val.

## Szükséges környezeti változók

Kizárólag a Vercel **Preview** környezetében kell először konfigurálni. Jelszó vagy URL-be ágyazott hitelesítés ne kerüljön Gitbe, chatbe vagy naplóba.

| Változó | Érték / követelmény |
| --- | --- |
| `SMTP_HOST` | A Sybell cPanel Connect Devices tényleges kimenő szervere; nincs kitalált alapérték |
| `SMTP_PORT` | `465` (TLS) vagy `587` (kötelező STARTTLS), a szolgáltató szerint |
| `SMTP_USER` | `info@eximpworld.hu` |
| `SMTP_PASSWORD` | A fiók titkos jelszava |
| `SMTP_FROM` | `info@eximpworld.hu` |
| `CONTACT_TOKEN_SECRET` | Legalább 32 karakteres, kriptográfiailag véletlen titok |
| `CONTACT_REDIS_URL` | Jóváhagyott, TLS-es megosztott Redis (`rediss://…`) |
| `CONTACT_EMAIL_ENABLED` | Alapesetben nincs beállítva / `false` |
| `CONTACT_DELIVERY_VERIFIED` | Alapesetben nincs beállítva / `false`; csak igazolt kézbesítési próba után `true` |

A Redis az egymástól független Vercel példányok közös küldési korlátozásához és ismétlésvédelméhez szükséges. Nem hoztunk létre szolgáltatást vagy előfizetést. Ennek jóváhagyott elérhetősége is hiányzik. A tároló kiesésekor a küldés leáll, nincs memóriabeli, megkerülhető tartalék.

## Biztonság és adatkezelés

TLS-ellenőrzés kötelező; SMTP debug kikapcsolva. A kliens nem adhat meg feladót/címzettet. A törzs legfeljebb 24 KB, a mezők külön hosszhatárral és típusellenőrzéssel rendelkeznek. Honeypot, 2 másodperces minimális kitöltési idő, 30 perces aláírt munkamenet, Origin-ellenőrzés.

Megosztott órás limitek: 5 beküldés/IP-kulcs, 3/e-mail-kulcs, összesen 60; tokenkérés 30/IP. Ezek kezdeti üzemeltetési értékek. IP kizárólag visszaélésvédelemhez használható, nem címzéshez. IP és e-mail a Redisben titkos kulcsú HMAC-ként szerepel. Limitkulcsok 1 órán, ismétlésvédelmi metaadatok 24 órán belül lejárnak. A Redis nem tárolja az űrlap tartalmát. Napló: véletlen kérésazonosító és rögzített eseménykód, nyers SMTP-hiba és személyes adatok nélkül.

Bizonytalan SMTP-eredménynél ugyanaz a token nem indít új küldést. A felület nem állít sikert elfogadás nélkül. Ez nem kézbesítési garancia és nem emberellenőrző CAPTCHA; nagyobb visszaélés esetén külön védelmi réteg szükséges.

A levelek a Sybell postafiókokban személyes adatokat tartalmaznak. Aktiválás előtt az adatkezelési tájékoztató online küldésre vonatkozó részét, a megőrzési szabályokat és a választott Redis szolgáltató adatfeldolgozását a vállalatnak ellenőriznie kell. A meglévő jogi tartalmat nem módosítottuk és GDPR-megfelelőséget nem tanúsítunk.

## Aktiválási sorrend

1. Sybell tényleges szerveradatai, jogosult tesztpostafiók és jóváhagyott Redis biztosítása.
2. Elkülönített, jogosult tesztből SMTP-kapcsolat és HU/EN vállalati + visszaigazoló levelek postaládába érkezésének ellenőrzése. Ehhez a levélküldő adapter külön meghívható; a nyilvános űrlap továbbra is kikapcsolt marad.
3. Sikeres kézbesítési ellenőrzés dokumentálása után a két kapcsoló engedélyezése Preview-ban; valós űrlaptesztek és készülékes Safari-próba.
4. Felhasználói jóváhagyás után külön éles kiadás. Sem DNS-, MX-, SPF-, DKIM-, DMARC-, sem meglévő postafiók-beállítás nem változott.

## Források

[Nodemailer SMTP](https://nodemailer.com/smtp), [Nodemailer üzenetmezők](https://nodemailer.com/message), [Redis Node kliens](https://redis.io/docs/latest/develop/clients/nodejs/connect/).

## Teszteredmények

- `node --test tests/contact/email.test.mjs`: **9/9 sikeres**. Fix címzés, minden kötelező mező, hibás e-mail és honeypot, tokenellenőrzés, küldési sorrend, ismétlésvédelem és versenyhelyzet, SMTP-hibák, visszaigazolási hiba, tárolóhiba és küldési limit. A küldő és tároló itt szimulált.
- `npm run typecheck`: sikeres.
- `npm run build`: sikeres Next.js production build.
- `git diff --check`: sikeres.
- Chrome desktop 1440×1000 és WebKit mobil 390×844: HU és EN offline figyelmeztetés, mezők, szimulált siker/hiba, adatmegőrzés és vízszintes túlcsordulás ellenőrzése sikeres. A megadott ország Japan volt; a beküldött nyelv helyes maradt. Ez WebKit-emuláció, nem fizikai iPhone Safari teszt.
- Helyi tényleges API konfiguráció nélkül: GET `enabled:false`, POST HTTP 503 `accepted:false`.
- Képernyőképek: `outputs/contact-email-preview/` (helyi, nem verziózott).
- Nem ellenőrzött: valódi Sybell SMTP, postaládába kézbesítés, valódi Redis, fizikai iPhone, bekapcsolt Vercel Preview végpont. A teljes élesítésre még **nem áll készen**.

Böngészőteszt futtatása: `PLAYWRIGHT_MODULE=/tmp/eximp-routing-test-tools/node_modules/playwright/index.mjs PLAYWRIGHT_BROWSERS_PATH=/tmp/eximp-browser-engines node tests/contact/browser.mjs`. Chrome alapértelmezett macOS telepítési útvonal szükséges. `CONTACT_TEST_URL` és `CONTACT_TEST_OUTPUT` felülírható. A teszt API-válaszokat szimulál, nem küld e-mailt.

## Sybell-konfiguráció pontosítása

A felhasználó a cPanel alapján megadta: `SMTP_HOST=mail.eximpworld.hu`, `SMTP_PORT=465`, `SMTP_SECURE=true`, `SMTP_USER=info@eximpworld.hu`. Ezek a jóváhagyott, nem titkos alapértékek bekerültek a szerveroldali konfigurációba; a feladó alapértéke szintén `info@eximpworld.hu`. A környezeti változók mintája: `docs/contact-email-preview.env.example`. Ellentmondó port/TLS beállítás esetén a rendszer nem aktiválja a küldést.

A jelszó továbbra is hiányzik, később a Vercel környezeti változóiban kerül megadásra. Ebben a lépésben Vercel környezeti változót nem módosítottunk, SMTP-kapcsolatot nem indítottunk. A Redis-elérhetőség, token-titok és a kézbesítési ellenőrzés még szükséges. A korábbi táblázat SMTP-szerverre vonatkozó nyitott kérdése ezzel lezárult.

Új tesztek: `tests/contact/configuration.test.mjs` – jóváhagyott alapértékek, explicit 465/TLS konfiguráció, hiányos hitelesítés és ellentmondó TLS/illetéktelen feladó elutasítása. Futtatás: `node --test tests/contact/*.test.mjs`.

## Upstash Preview-integráció – REDIS_URL támogatás

A felhasználó létrehozta az Upstash Free adatbázist Frankfurtban és a Vercel projekt Preview környezetéhez kapcsolta. A szerver elsőként a nem üres `CONTACT_REDIS_URL`, ennek hiányában a `REDIS_URL` értékét használja. Mindkét forrásnál kizárólag érvényes, hosttal rendelkező `rediss://` URL fogadható el. Hibás elsődleges értéket nem fed el a tartalék változó.

A meglévő `redis` (node-redis) kliens közvetlen TLS-es Redis-kapcsolatot használ, amelyet az [Upstash hivatalos node-redis dokumentációja](https://upstash.com/docs/redis/search/adapters/node-redis) támogat. REST URL vagy REST token nem helyettesíti a `rediss://` kapcsolati URL-t; klienscsere nem szükséges.

A `CONTACT_EMAIL_ENABLED` és `CONTACT_DELIVERY_VERIFIED` aktiválási feltétele változatlan; nem állítottuk őket `true` értékre. SMTP és weboldali megjelenés változatlan. Vercel környezeti változót nem olvastunk ki vagy módosítottunk, valódi Redis/SMTP-kapcsolatot nem teszteltünk ebben a lépésben.

Ellenőrzés: 17/17 szimulált teszt sikeres; a Next.js build (TypeScript-ellenőrzéssel együtt) és a `git diff --check` sikeres. Az új tesztek lefedik az elsőbbséget, az üres/hiányzó elsődleges változó tartalékát, a hibás és TLS nélküli URL-ek elutasítását, valamint a kikapcsolt küldési kapcsolók megőrzését.
