# Napojení webu na ePoukaz API — návrh

**Datum:** 2026-07-22
**Autor:** Tomáš (+ Claude)
**Stav:** Návrh ke schválení

## Cíl

Napojit marketingový web (Vite + React SPA, MUI) na REST API `https://api.epoukazonline.cz`
tak, aby se datová logika (autentizace, loading/error, parsování) **neopakovala** — přes
jeden sdílený custom hook a tenkou API vrstvu.

Rozsah: 4 endpointy (`companies`, `tariffs`, `pages`, `pages/{slug}`) napojené do konkrétních
míst v UI.

## Kontext a klíčové rozhodnutí o tokenu

API se autentizuje statickým tokenem v hlavičce `X-AUTH-TOKEN`. Backend kolega výslovně
požaduje, aby token **nebyl v klientském JS** a volalo se jen ze serveru/proxy.

Web je zatím čistá SPA bez vlastního backendu. **Pro fázi testování** se token drží v
`VITE_API_TOKEN` (`.env`, mimo git) a volá se přímo z prohlížeče. Je jasně zdokumentováno,
že to je **dočasné a nebezpečné pro produkci** (Vite `VITE_*` proměnné se zapékají do
klientského bundle a jsou veřejně čitelné).

**Migrace na produkci (kolega upraví na backendu):** token se řeší až na proxy serveru,
frontend volá vlastní `/api/...`. Kód je navržen tak, aby to byla **změna konfigurace, ne
přepisování** — token se vkládá na jediném místě (`src/api/config.ts`), které nese komentář
s instrukcí pro kolegu.

## Architektura

Zvolený přístup: **vlastní lehký hook `useApi` + fetch wrapper** (bez nové závislosti).
Zamítnuté alternativy: TanStack Query (nová závislost, overkill, uživatel chtěl vlastní hook);
`fetch` přímo v komponentách (opakování loading/error/auth logiky).

### Struktura souborů

```
src/api/
  config.ts      # base URL + token — JEDINÉ místo s tokenem, komentář pro kolegu k migraci na proxy
  client.ts      # apiFetch<T>(path): fetch + X-AUTH-TOKEN + ošetření 401/404/síť + JSON parse
  types.ts       # Company, Tariff, PageSummary, PageDetail
  endpoints.ts   # getCompanies(), getTariffs(), getPages(), getPage(slug)
src/hooks/
  useApi.ts      # useApi<T>(fetcher, deps) → { data, loading, error }
                 # + tenké wrappery useCompanies/useTariffs/usePages/usePage
```

### `config.ts`
- `API_BASE_URL` z `import.meta.env.VITE_API_BASE_URL` (fallback `https://api.epoukazonline.cz`).
- `API_TOKEN` z `import.meta.env.VITE_API_TOKEN`.
- `authHeaders()` vrací `{ 'X-AUTH-TOKEN': API_TOKEN }` když je token přítomný, jinak `{}`.
- Nahoře komentář pro kolegu: v produkci token vyhodit, hlavičku řešit na proxy, `VITE_API_BASE_URL`
  přepnout na vlastní `/api`.

### `client.ts`
- `apiFetch<T>(path, opts?)`: složí `API_BASE_URL + path`, přidá `authHeaders()`, zavolá `fetch`.
- Ošetření: `401` → chyba „neplatný/chybějící token"; `404` → chyba „nenalezeno" (rozlišitelná,
  pro `pages/{slug}`); ostatní non-2xx → obecná chyba; síťová chyba → chyba. Vrací naparsované JSON `T`.
- Podporuje `AbortSignal` (pro rušení zastaralých requestů z hooku).

### `useApi.ts`
- `useApi<T>(fetcher: (signal) => Promise<T>, deps: unknown[])`:
  - Stav `{ data: T | null, loading: boolean, error: Error | null }`.
  - `useEffect` na `deps`: nastaví loading, zavolá `fetcher`, uloží výsledek/chybu.
  - **Race condition:** `AbortController` + ignorování odpovědi po unmountu / změně deps
    (aby rychlá změna `slug` nezpůsobila zobrazení staré stránky).
- Tenké wrappery:
  - `useCompanies()` → `useApi(getCompanies, [])`
  - `useTariffs()` → `useApi(getTariffs, [])`
  - `usePages()` → `useApi(getPages, [])`
  - `usePage(slug)` → `useApi((s) => getPage(slug, s), [slug])`

## Napojení endpointů

### 1. `tariffs` → `PricingPage`
- Nahradí statické `PRICING`. Karty se generují **dynamicky** podle toho, co API vrátí
  (aktuálně 4: free_trial / lite / pro / enterprise).
- Mapování na `PricingCard`:
  - název ← `label`
  - cena ← `monthlyPriceCzk` naformátovaná jako `"490 Kč"` (jen měsíční cena); `null` → `"Cena na dotaz"`.
  - features ← `features`
  - CTA: `null` cena → „Kontaktovat", jinak „Začněte zdarma".
  - accent/highlighted: přiřazené podle `code` (např. `pro` = zvýrazněný fialový). Vizuální styl
    zůstává, jen se plní z API. Neznámý `code` → neutrální default.
- **Srovnávací tabulka `COMPARE_ROWS` zůstává statická** (v API není).

### 2. `pages` (seznam) → navigace (`Header` + `MobileMenu`)
- Za statické položky (`NAV_LINKS`) se přidají dynamické z API: `title` → odkaz na `/stranka/{slug}`.
- Dokud se seznam načítá / při chybě: zobrazí se jen statické položky (dynamické se prostě nepřidají).

### 3. `pages/{slug}` → nová route `/stranka/:slug`
- Nový komponent (např. `DynamicPage`): vykreslí `title`, `content` přes `dangerouslySetInnerHTML`
  a `gallery` (mřížka obrázků pod textem).
- `404` (neexistující/nepublikovaný slug) → stav „stránka nenalezena".
- Stávající `/faq` a `/obchodni-podminky` (statický `UNI`) **zůstávají beze změny**.

### 4. `companies` → footer + `ContentPage`
- **Footer, sekce „Doplňkové služby":** místo statických odkazů se vypíšou provozovny
  (label = `name`), každá odkazuje na `/provozovna/{publicHash}`.
- **`ContentPage` na nové route `/provozovna/:publicHash`:**
  - Stáhne seznam provozoven, najde tu s odpovídajícím `publicHash`.
  - Do textu obchodních podmínek doplní její údaje; `UNI` se přepíše na **šablonu s placeholdery**:
    - `{{companyName}}` ← `name`
    - `{{address}}` ← `street, city zip` (skládá se z neprázdných částí `address`)
    - `{{ico}}` ← `billingIco`
    - `{{orderUrl}}` ← `https://app.epoukazonline.cz/c/{publicHash}`
  - Galerie: dnešní 3 statické obrázky nahradí obrázky provozovny (logo, exteriér, interiér).
    `null` hodnoty se vynechají, zbylé obrázky se vycentrují.
  - Nenalezený `publicHash` → stav „provozovna nenalezena".
  - Holé `/faq`, `/obchodni-podminky` zůstanou s **nevyplněnou** šablonou (placeholdery prázdné,
    jako dnes).

## Routing (`App.tsx`)
Přidané routy pod `PageLayout`:
- `/stranka/:slug` → `DynamicPage`
- `/provozovna/:publicHash` → `ContentPage` (s parametrem)

Stávající routy (`/`, `/cenik`, `/kontakt`, `/faq`, `/obchodni-podminky`) beze změny.

## Loading / error UX (testovací fáze)
- Nenásilné a **nespadne**: loading = decentní placeholder; chyba = zaloguje se a sekce
  se buď skryje (navigace, footer), nebo padne zpět na statická data (ceník).
- Detailní vzhled placeholderů se doladí při implementaci podle stávajícího designu.

## Env a git
- `.env` (mimo git) s `VITE_API_BASE_URL`, `VITE_API_TOKEN`.
- `.env.example` (v gitu, bez tokenu) jako dokumentace.
- Ověřit, že `.env` je v `.gitignore`.

## Testování
- Unit testy pro `client.ts` (auth hlavička, ošetření 401/404, JSON parse) a `useApi`
  (loading→data, loading→error, zrušení při změně deps) — mockovaný `fetch`.
- Testy mapování tariffs (`null` cena, formátování) a skládání `address`/`orderUrl`.
- Testy komponent (Pricing/Footer/DynamicPage/ContentPage) s mockovanými hooky —
  loading, úspěch, chyba, prázdná data.

## Mimo rozsah (YAGNI)
- Přepínač měsíční/roční cena (jen měsíční).
- Cache/retry/dedup requestů (řeší se až případně proxy/knihovnou).
- Reálná produkční proxy (dodá kolega na backendu).
