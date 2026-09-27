# EximpWorld Hungary – külön Vercel projekt

Ez a mappa önálló magyar Next.js projekt. A visszaállított forrás mentése:
`bfe1ab8c3371a8ec24c165a206d697185c11a71c`.
Az angol projekt és a cPanel export változatlan; ez a projekt nem módosítja őket.
A piac mindig magyar, a `?market=uk` paraméter sem kapcsolja át angol piacra.
A meglévő HU/EN szövegváltó megmaradt; a United Kingdom országválasztó a külön
`eximpworld.co.uk` webhelyre mutat.

## Vercel importálás

1. E mappa tartalmát tedd egy külön Git repository gyökerébe, és importáld a
   Vercel **Add New → Project** felületén. Javasolt projektnév: `eximpworld-hungary`.
2. Framework: **Next.js**, Node.js: **24.x**.
3. Root Directory: `.` ha csak ezt a mappát töltöd a repositoryba;
   `vercel-hu`, ha a teljes szülőmappát.
4. Install: `npm ci`; Build: `npm run build`; Output Directory: Next.js alapérték
   (ne állítsd `out`-ra). Ezeket a `vercel.json` és a `package.json` rögzíti.
5. Ehhez a változathoz nem szükséges környezeti változó vagy Sites/Cloudflare fiók.
6. Deploy után a kapott `*.vercel.app` címen ellenőrizd az oldalakat.
   Az előnézeti hostokon noindex fejléc és meta szerepel.

## Domain csatlakoztatása később

Az új magyar Vercel projekt Settings → Domains részében add hozzá az
`eximpworld.hu` és opcionálisan a `www.eximpworld.hu` neveket. Az elsődleges cím
`https://eximpworld.hu`; a www változatot irányítsd ide a Vercel felületén.
A DNS szolgáltatónál pontosan a Vercel által ehhez a projekthez mutatott
rekordokat add meg. A levelezés MX/TXT rekordjait tartsd meg.
Az `eximpworld.co.uk` domainhez és az angol projekthez nem kell hozzányúlni.
A domainre váltásig a jelenlegi magyar éles oldal a jelenlegi szolgáltatóján marad.
Ebben a munkában nem történt publikálás vagy DNS-módosítás.

## Helyi ellenőrzés

```sh
npm ci
npm run build
npm start -- --port 3000
```

A készlet tartalmazza a képeket, videókat és a meglévő Geist betűkészletet;
a buildnek nem kell Google Fonts fájlokat letöltenie.
A canonical URL-ek és sitemap az eximpworld.hu domainre mutatnak.

## Meglévő tartalmi korlátok

Az ajánlatkérő jelenleg e-mailt / letölthető ajánlatkérést készít elő, nem küld
szerveroldali levelet. A magyar cégadatokat változatlanul vettük át a mentésből;
a telefonszám (+36 1 555 0123) és a hiányos cím élesítés előtt ellenőrzendő.
A jogi oldalak jelenleg kitöltendő tartalmat jeleznek, noindex beállítással.

Hivatalos referencia: https://vercel.com/docs/frameworks/full-stack/nextjs

## Ellenőrzés eredménye

A production build Webpackkel fut (`next build --webpack`), mert a helyi
sandbox a Turbopack belső portnyitását blokkolta. A build és a beépített
TypeScript-ellenőrzés sikeres Node.js 24 alatt.
A HTTP smoke teszt újrafuttatható a futó production szerveren:

```sh
python3 scripts/check-production.py http://127.0.0.1:3000
```

A `127.0.0.1` cím használata elkerüli a gépen korábban indított, csak IPv6-os
localhost:3000 folyamatot. A build kimenetét a Vercel újra létrehozza; a
forráscsomag szándékosan nem tartalmaz `node_modules` és `.next` mappát.

Végleges HTTP-ellenőrzés: 40 magyar oldal, 104 belső hivatkozás/asset,
összes public fájl, HU piacrögzítés és éles/előnézeti SEO: sikeres.
A magyar főoldal böngészőben is betöltődött.
