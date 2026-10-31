# EximpWorld — fejlesztési zárónapló

Dátum: 2026. október 31. (Europe/Budapest)
Állapot: a felhasználó a fejlesztést lezártnak tekinti.

## Mentett és élesített változat

- Repository: https://github.com/kurkoglobal-beep/eximpworld
- Vercel-projekt: kurkoglobal-beeps-projects / eximpworld
- Éles kód: `9ba532b2a64bef9ff67708734b56a5e50e778bdc`
- Sikeres Production deployment: `7464952974`.
- Az éles main és a company-terms-preview ág a lezárás ellenőrzésekor ugyanarra a kódverzióra mutatott.
- Ez a zárónapló külön dokumentációs mentés; nem módosítja az éles weboldalt.

## Elkészült fejlesztések

- Magyar Kapcsolat oldal prémium megjelenése, elkülönített székhely-, iroda- és raktári adatokkal; meglévő ajánlatkérő megőrizve.
- Ernő Demus aláírásképe: `/images/erno-demus-signature.jpg`; nyilvános HTTPS-elérés, HTTP 200 és image/jpeg ellenőrizve. A domain meglévő www-átirányítása megmaradt.
- Vállalataink / Our Companies választó magyar és brit vállalati útvonalakkal, megfelelő cégadatokkal és kapcsolattartással.
- Brit üzleti kapcsolat: Ernő Demus, UK Business Manager; eximpworldltd@eximpworld.hu; 07479 946016; WhatsApp.
- Magyar `/karrier` és brit `/en/careers` oldal jóváhagyott szöveggel, csatolt és optimalizált hero fotóval, külön desktop és mobil menüponttal.
- Magyar `/aszf` és brit `/en/terms-and-conditions` jogi oldalak, tartalomjegyzékkel, Legal / Jogi információk lábléccsoporttal és PDF-letöltésekkel.
- Magyar PDF: 16 fejezet, 5 oldal. Brit PDF: 17 fejezet, 7 oldal, a 17.10. pontig.
- A brit 1–10. fejezet az eredeti forrásból maradt; a teljes 11–17. fejezet és zárószöveg a javító csatolmányból változtatás nélkül került be.
- A korábbi HU/EN termékoldalak, videók, termékkártyák és adatlapok megmaradtak.

## Ellenőrzések

- Production build / TypeScript sikeres.
- Jogi források, webes bekezdések és PDF-szöveg egyezése ellenőrizve; minden PDF-oldal vizuálisan átnézve.
- Éles Chrome desktop, tablet, keskeny mobil és iPhone 13 WebKit-emuláció: megfelelő oldalak, tartalomjegyzékek, vállalatváltás, navigáció, PDF-letöltések és fájlellenőrző összegek; vízszintes kilógás nélkül.
- Fizikai iPhone Safari teszt nem történt; WebKit-emulációt használtunk.
- Careers mező- és helyi PDF-ellenőrzés, valamint a beküldés szerveroldali zárolása ellenőrizve. Tesztlevelet nem küldtünk.

## Tudatosan fennmaradó állapotok

- Careers beküldés és valódi CV-feltöltés NEM aktív. A `/api/careers` végpont 503 választ ad; nem olvas, tárol vagy továbbít jelentkezői adatot.
- Aktiváláshoz külön jóváhagyott jelentkezői adatkezelési tájékoztatók, privát tárolás, vírusellenőrzés, szerveroldali validáció, spamvédelem/sebességkorlátozás és kézbesítési konfiguráció szükséges.
- A meglévő ajánlatkérő továbbra is letölthető kérelmet és mailto-hivatkozást készít; online beküldési háttérszolgáltatás nincs bekötve.
- A közzétett jogi dokumentumok saját tervezetjelölései megmaradtak. A technikai élesítés nem jelent jogi megfelelőségi tanúsítást; új hatálybalépési dátumot vagy verziószámot nem találtunk ki.
- DNS- és levelezési konfiguráció nem változott.

## Helyi mentés

A lezáráshoz a forráskód és a Git-előzmények, továbbá a helyi PDF-ek, ellenőrzési képernyőképek és renderelt oldalak külön archívumba kerülnek az `outputs/closeout-2026-10-31` könyvtárban. Függőségek, környezeti titkok és hitelesítési fájlok nem részei az archívumnak. A mentés ellenőrzőösszegeit SHA256SUMS.txt rögzíti.

A részletes munkanaplók a docs könyvtár Preview-jegyzeteiben találhatók; azok a korábbi tesztelési állapotot dokumentálják. A végleges éles állapotot ez a zárónapló rögzíti.
