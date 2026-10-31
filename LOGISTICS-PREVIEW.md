# Logisztikai animáció – helyi Preview

Ág: `codex/logistics-animation-preview`. Távoli feltöltés és élesítés nem történt.

- Magyar: http://127.0.0.1:3152/szolgaltatasok#international-logistics
- Angol: http://127.0.0.1:3152/en/services#international-logistics

A meglévő szolgáltatáskártyák után jelenik meg, az ajánlatkérési sáv előtt. A korábbi szövegek, linkek és URL-ek megmaradtak.

## Működés és ellenőrzés

A kamion a kép betöltődése és a szekció legalább 25%-ának láthatósága után indul. Desktopon 9, mobilon 8 másodperc alatt egyszer áthalad; jobb oldalon eltűnik és az adott oldalbetöltés során nem ismétlődik. Képernyőn kívül vagy rejtett böngészőlapon szünetel. Reduced-motion, JavaScript hiánya vagy IntersectionObserver nélküli környezet esetén statikus középre helyezett kamion látható.

- Build és TypeScript: sikeres.
- Desktop Chrome 1440×900 és iPhone 13 profilú WebKit, mindkét nyelven: sikeres.
- Görgetési indítás, haladási irány, szünet/folytatás, egyszeri lejátszás, jobbra kilépés és visszagörgetés ellenőrizve.
- Reduced-motion statikus megjelenítés és vízszintes túlcsordulás hiánya ellenőrizve.
- Korábbi szolgáltatásszövegek változatlanok, böngészőhiba nincs.
- Fizikai iPhone Safari teszt nem történt; WebKit-emuláció állt rendelkezésre.
- Képernyőképek és tesztnapló: `outputs/logistics-animation/`.

Nincs új animációs könyvtár. A 184 KB-os kamion és a 25 KB-os háttértérkép késleltetve töltődik be.

## Képi forrás és végleges eszközök

`public/logistics/eximpworld-truck.webp`: a mellékelt **Eximpworld_ From Sourcing to Delivery.png** képből, a beépített ImageGen eszközzel készített átlátszó kivágás, WebP-re optimalizálva. Alfa-csatorna megőrizve. A kivágás AI-szerkesztés, nem pixelazonos kézi maszk. A fehér kamion, kék logók és Eximpworld feliratok vizuálisan ellenőrizve.

`public/logistics/europe-network.svg`: Natural Earth 1:110m országhatárokból létrehozott vektorgrafika. A hálózat illusztratív, nem vállalati telephelyadat. Forrás: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson

ImageGen prompt, `transparent_background: true`:

> Use case: background-extraction. Edit target: the attached EximpWorld logistics banner. Extract ONLY the exact white Eximpworld tractor-trailer truck pictured in the center, facing right, onto a genuinely transparent background. Preserve its original photographic pixels/appearance as faithfully as possible: same camera angle, vehicle geometry, wheels, mirrors, trailer, blue globe logos and exact existing Eximpworld wordmarks on the trailer and cab. Do not redesign, replace, mirror, invent branding or change the truck. Remove all scenery, road, sky, map, decorative graphics and all text outside the truck. Tight landscape framing around the complete truck, with small transparent padding; keep every wheel and mirror inside the frame. No opaque background, no checkerboard painted into pixels, no new text or shadows beyond the vehicle's natural contact shadow. This is a website animation sprite, not a new truck illustration.

## Telepítés

A nyilvános GitHub-feltöltést az automatikus jóváhagyás-ellenőrzés elutasította: a Preview kérését nem tekintette a mellékelt kamionkép nyilvános tárolóba feltöltésére adott külön engedélynek. Jóváhagyásig csak helyi Preview készült. Az élesítéshez ettől külön is szükséges a felhasználó jóváhagyása.
