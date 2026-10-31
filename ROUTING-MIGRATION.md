# EximpWorld.hu – angol URL-migráció

Állapot: helyi tesztkörnyezetben elkészült, élesítésre vár. Dátum: 2026-10-31.
Alapverzió: `b9be680ba35ac8c876c85a1ee10ba37e028e32e6`.
Helyi ág: `codex/english-url-routing`. Az éles `main` ágra nem került módosítás, távoli feltöltés és telepítés nem történt.

## Útvonalak

| Magyar | Angol |
| --- | --- |
| `/` | `/en` |
| `/rolunk` | `/en/about` |
| `/szolgaltatasok` | `/en/services` |
| `/termekek` | `/en/products` |
| `/kapcsolat` | `/en/contact` |
| `/iparagak` | `/en/industries` |
| `/adatvedelem` | `/en/privacy-policy` |
| `/sutik` | `/en/cookie-policy` |
| `/aszf` | `/en/terms-and-conditions` |
| `/termekek/izopropil-alkohol-ipa` | `/en/products/isopropyl-alcohol` |

A további 26 termék és a 4 szolgáltatás angol címéből képzett sluggal érhető el az `/en/products/`, illetve `/en/services/` alatt. A központi útvonaltábla a meglévő katalógusból származik, egy IPA URL-kivétellel; a magyar slugok változatlanok.

## Működés

- A Next.js proxy belső rewrite-tal ugyanazokat az oldalakat rendereli, az URL alapján meghatározott nyelven. Nem készültek másolt oldalak.
- A korábbi `?lang=en` címek közvetlen 301-es átirányítást kapnak. Az átirányítás a záró perjelet is ugyanabban a lépésben kezeli. Az egyéb query-paraméterek megmaradnak.
- Mindkét nyelvváltó az adott oldal megfelelőjére vezet, a query és a fragment megőrzésével.
- A belső linkek, fejléc/lábléc, katalógus és ajánlatkérő linkek a közös `languageHref` függvényt használják.
- Nyelvenként saját canonical és `hreflang="hu"` / `hreflang="en"` készült. A sitemap 74 indexelhető nyelvi URL-t és kölcsönös nyelvi alternatívákat tartalmaz; a 6 jogi oldal a korábbi noindex-elv szerint kimarad.
- A preview környezet noindex marad. A már létező jogi noindex beállítás nem változott.
- Az eredeti fordítási szótár külön modulba került a routing–termékkatalógus körkörös importjának elkerülésére; a szótár tartalma változatlan.

## Ellenőrzés

- `npm run build`: sikeres, a TypeScript-ellenőrzéssel együtt.
- `scripts/check-routing.py`: 80 oldal, 714 HTTP-ellenőrzés, 144 belső URL; canonical, hreflang, sitemap, egyetlen 301-es lépés, régi és alias URL-ek, ajánlatkérési paraméterek, valódi 404-ek, production/preview SEO.
- Mind a 80 oldal látható szövege és képhivatkozásai egyeznek a módosítás előtti builddel.
- `scripts/check-routing-browser.mjs`: 40 oldalpár, oda-vissza nyelvváltás 1440×1000 és 390×844 Chrome-nézetben; 160 sikeres váltás, 0 futási/hidratálási hiba. Menü, aktív oldaljelölés, termék → ajánlatkérés, query/fragment és IBC előválasztás ellenőrizve. Külső ajánlatkérés nem lett elküldve.
- `scripts/check-production.py`: 80 oldal, 175 belső hivatkozás/asset, valamennyi public fájl elérhető.
- 12 összehasonlító teljes oldalas képernyőkép készült (Rólunk, Termékek, Kapcsolat; HU/EN; asztali/mobil). 11 pixelazonos; az angol asztali katalógusnál 0,46% renderelési eltérés volt, azonos elrendezés és tartalom mellett. CSS, képek, animációk, katalógustartalom és RFQ-komponens nem módosult.
- Az ellenőrzések helyi Chromium/Chrome tesztek, nem fizikai telefonon és nem éles Vercel telepítésen futottak.

## Helyi előnézet és újrafuttatás

```sh
npm ci
npm run build
npm start -- --hostname 127.0.0.1 --port 3148
python3 scripts/check-routing.py http://127.0.0.1:3148 outputs/routing/baseline.json
python3 scripts/check-production.py http://127.0.0.1:3148
```

Böngészőteszt: Playwright telepítése egy külön eszközmappába (`npm install --prefix /tmp/eximp-routing-test-tools playwright`), majd:

```sh
PLAYWRIGHT_MODULE=/tmp/eximp-routing-test-tools/node_modules/playwright/index.mjs node scripts/check-routing-browser.mjs
```

Más operációs rendszeren a `BROWSER_EXECUTABLE` változóval adható meg a Chrome/Chromium futtatható állománya.
A baseline HTML és a képernyőképek az ignorált `outputs/routing/` mappában találhatók.

## Élesítés

Csak a tulajdonos külön jóváhagyása után: a távoli main friss állapotának ellenőrzése, szükség esetén újraalapozás és újratesztelés, majd feltöltés/merge a main ágra és a Vercel publikálás ellenőrzése. A domain, DNS és tárhelyhozzáférések módosítása nem része a változtatásnak.
