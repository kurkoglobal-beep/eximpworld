# EximpWorld Hungary – kétnyelvű Vercel projekt

Éles repository: kurkoglobal-beep/eximpworld, main ág.
Vercel projekt: eximpworld, kurkoglobal-beeps-projects.
Magyar változat: / ; angol változat: /?lang=en.
A nyelvváltás ugyanazon az útvonalon marad, megtartja a query paramétereket és a hash-t.
A cég/piac mindkét nyelven magyar; nincs automatikus átirányítás a co.uk domainre.
Az angol Services nézet külön jóváhagyott hero képet használ. A videók eredetiek.

Ellenőrzés: npm ci; npm run build; npm run start -- --hostname 127.0.0.1 --port 8091
HTTP ellenőrzés: python3 tests/languages.py
A build Next.js 16, Node 24; nincs külön környezeti változóigény.
A main ágra történő push a meglévő Vercel integráción keresztül élesít.
A 2026-10-29-i nyelvi javítás előtti éles commit: 2f71d6422f1360f54ba2d68ab8427c0ba194242f.
Visszaállítás: a Vercel korábbi sikeres kiadásának visszaállítása, vagy a javító commit git revert-je mainen.

Meglévő korlátok: az ajánlatkérés e-mailt/letölthető adatokat készít elő, nem küld automatikusan levelet.
A jogi oldalakon továbbra is szerepel a teljes jóváhagyott jogi dokumentum hiányára vonatkozó eredeti tájékoztatás.
