# Napojení na ePoukaz API — Implementační plán

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Napojit web na `https://api.epoukazonline.cz` přes sdílenou API vrstvu a custom hook, bez opakování datové logiky.

**Architecture:** Tenká API vrstva (`src/api/*`) s jediným místem pro token, nad ní generický hook `useApi` + tenké wrappery. Stránky/komponenty konzumují data přes wrappery a řeší jen zobrazení (loading/chyba/fallback).

**Tech Stack:** Vite 8, React 19, TypeScript, MUI 9, react-router-dom 7, Vitest 4 + @testing-library/react (globals `test`/`expect`/`vi`).

## Global Constraints

- Token žije **jen** v `src/api/config.ts` přes `import.meta.env.VITE_API_TOKEN`. Nikam jinam se nepíše.
- Base URL: `import.meta.env.VITE_API_BASE_URL` s fallbackem `https://api.epoukazonline.cz`.
- Endpointy: `/api/web/companies`, `/api/web/tariffs`, `/api/web/pages`, `/api/web/pages/{slug}`.
- Objednávkový odkaz provozovny: `https://app.epoukazonline.cz/c/{publicHash}`.
- Testy **nesmí** sahat na síť — vždy mockovat `fetch` nebo hook.
- Konvence testů: `render(<ThemeProvider theme={theme}><MemoryRouter>…</MemoryRouter></ThemeProvider>)`, importy relativní, `test()`/`expect()`/`vi` jsou globální.
- Ceny jen měsíční. Formát: skupiny tisíců oddělené obyčejnou mezerou + `" Kč"` (např. `490 Kč`, `1 490 Kč`); `null` → `Cena na dotaz`.
- Commity často, jeden na konci každého tasku.

---

### Task 1: API základ — config, typy, klient

**Files:**
- Create: `src/api/config.ts`
- Create: `src/api/types.ts`
- Create: `src/api/client.ts`
- Test: `src/api/client.test.ts`
- Create: `.env.example`
- Modify: `.gitignore` (přidat `.env`)

**Interfaces:**
- Produces:
  - `API_BASE_URL: string`
  - `authHeaders(): Record<string, string>`
  - `class ApiError extends Error { status: number }`
  - `apiFetch<T>(path: string, signal?: AbortSignal): Promise<T>`
  - typy `Company`, `Tariff`, `PageSummary`, `PageDetail`

- [ ] **Step 1: Napiš typy** — `src/api/types.ts`

```ts
export type Company = {
  name: string
  billingIco: string
  address: { street: string | null; city: string | null; zip: string | null }
  logo: string | null
  photos: { exterior: string | null; interior: string | null }
  publicHash: string
}

export type Tariff = {
  code: string
  label: string
  monthlyPriceCzk: string | null
  annualPriceCzk: string | null
  features: string[]
}

export type PageSummary = { title: string; slug: string }

export type PageDetail = { title: string; slug: string; content: string; gallery: string[] }
```

- [ ] **Step 2: Napiš config** — `src/api/config.ts`

```ts
// ⚠️ POZOR (pro backend kolegu): Token je zde JEN pro fázi testování a přes VITE_ se
// zapéká do klientského bundle (je veřejně čitelný). V PRODUKCI:
//   1) odstranit VITE_API_TOKEN a řešit hlavičku X-AUTH-TOKEN až na serveru/proxy,
//   2) VITE_API_BASE_URL přepnout na vlastní proxy cestu (např. "/api").
// Frontend se pak nemění – token vkládáme na jediném místě: authHeaders().
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? 'https://api.epoukazonline.cz'

export function authHeaders(): Record<string, string> {
  const token = import.meta.env.VITE_API_TOKEN
  return token ? { 'X-AUTH-TOKEN': token } : {}
}
```

- [ ] **Step 3: Napiš failing test** — `src/api/client.test.ts`

```ts
import { apiFetch, ApiError } from './client'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
})

test('apiFetch vrátí naparsované JSON a zavolá správné URL', async () => {
  const data = [{ name: 'Lékárna' }]
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => data })
  vi.stubGlobal('fetch', fetchMock)

  const result = await apiFetch<typeof data>('/api/web/companies')

  expect(result).toEqual(data)
  expect(fetchMock).toHaveBeenCalledWith(
    'https://api.epoukazonline.cz/api/web/companies',
    expect.objectContaining({ headers: expect.any(Object) }),
  )
})

test('apiFetch přidá X-AUTH-TOKEN, když je token v env', async () => {
  vi.stubEnv('VITE_API_TOKEN', 'test-token')
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({}) })
  vi.stubGlobal('fetch', fetchMock)

  await apiFetch('/api/web/tariffs')

  expect(fetchMock.mock.calls[0][1].headers).toMatchObject({ 'X-AUTH-TOKEN': 'test-token' })
})

test('apiFetch vyhodí ApiError se status 401', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 401, json: async () => ({}) }))
  await expect(apiFetch('/api/web/companies')).rejects.toMatchObject({ status: 401 })
})

test('apiFetch vyhodí ApiError se status 404', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404, json: async () => ({}) }))
  await expect(apiFetch('/api/web/pages/neexistuje')).rejects.toBeInstanceOf(ApiError)
})
```

- [ ] **Step 4: Spusť test — musí selhat**

Run: `npm test -- client`
Expected: FAIL („Cannot find module './client'").

- [ ] **Step 5: Napiš klient** — `src/api/client.ts`

```ts
import { API_BASE_URL, authHeaders } from './config'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiFetch<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { ...authHeaders() },
    signal,
  })
  if (!res.ok) {
    throw new ApiError(res.status, `API ${res.status} na ${path}`)
  }
  return (await res.json()) as T
}
```

- [ ] **Step 6: Spusť test — musí projít**

Run: `npm test -- client`
Expected: PASS (4 testy).

- [ ] **Step 6b: Globální stub `fetch` v testech** — `src/test/setup.ts`

Protože `Header`/`Footer` (dále v plánu) budou volat API přes hooky, žádný test nesmí jít na
síť. Přidej do setupu výchozí mock `fetch`, který vrátí prázdné pole (komponenty pak spadnou
na statická data). Testy, které potřebují konkrétní data, si hook stejně přemockují přes `vi.spyOn`.

```ts
// Rozšíření matcherů o @testing-library/jest-dom
import '@testing-library/jest-dom'
import { beforeEach, vi } from 'vitest'

// Výchozí: žádný test nechodí na síť; vrací prázdné pole (komponenty → statický fallback).
beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => [] }),
  )
})
```

- [ ] **Step 7: Přidej `.env.example`** — `.env.example`

```
# Base URL API (v produkci přepni na vlastní proxy, např. /api)
VITE_API_BASE_URL=https://api.epoukazonline.cz
# Token od backend kolegy – JEN pro testování, NIKDY necommitovat skutečnou hodnotu
VITE_API_TOKEN=
```

- [ ] **Step 8: Přidej `.env` do `.gitignore`**

V `.gitignore` za řádek `*.local` přidej:

```
.env
.env.local
```

- [ ] **Step 9: Commit**

```bash
git add src/api/config.ts src/api/types.ts src/api/client.ts src/api/client.test.ts src/test/setup.ts .env.example .gitignore
git commit -m "feat(api): základ API vrstvy – config, typy, apiFetch klient"
```

---

### Task 2: Endpoints + hook `useApi`

**Files:**
- Create: `src/api/endpoints.ts`
- Create: `src/hooks/useApi.ts`
- Test: `src/hooks/useApi.test.tsx`

**Interfaces:**
- Consumes: `apiFetch` (Task 1), typy `Company`/`Tariff`/`PageSummary`/`PageDetail`.
- Produces:
  - `getCompanies(signal?): Promise<Company[]>`, `getTariffs(signal?): Promise<Tariff[]>`, `getPages(signal?): Promise<PageSummary[]>`, `getPage(slug, signal?): Promise<PageDetail>`
  - `type ApiState<T> = { data: T | null; loading: boolean; error: Error | null }`
  - `useApi<T>(fetcher: (signal: AbortSignal) => Promise<T>, deps: unknown[]): ApiState<T>`
  - `useCompanies()`, `useTariffs()`, `usePages()`, `usePage(slug: string)` — vše vrací `ApiState<…>`

- [ ] **Step 1: Napiš endpoints** — `src/api/endpoints.ts`

```ts
import { apiFetch } from './client'
import type { Company, Tariff, PageSummary, PageDetail } from './types'

export const getCompanies = (signal?: AbortSignal) =>
  apiFetch<Company[]>('/api/web/companies', signal)

export const getTariffs = (signal?: AbortSignal) =>
  apiFetch<Tariff[]>('/api/web/tariffs', signal)

export const getPages = (signal?: AbortSignal) =>
  apiFetch<PageSummary[]>('/api/web/pages', signal)

export const getPage = (slug: string, signal?: AbortSignal) =>
  apiFetch<PageDetail>(`/api/web/pages/${encodeURIComponent(slug)}`, signal)
```

- [ ] **Step 2: Napiš failing test** — `src/hooks/useApi.test.tsx`

```tsx
import { renderHook, waitFor } from '@testing-library/react'
import { useApi } from './useApi'

test('useApi: loading → data při úspěchu', async () => {
  const { result } = renderHook(() => useApi(async () => 42, []))

  expect(result.current.loading).toBe(true)
  await waitFor(() => expect(result.current.loading).toBe(false))
  expect(result.current.data).toBe(42)
  expect(result.current.error).toBeNull()
})

test('useApi: loading → error při odmítnutí', async () => {
  const { result } = renderHook(() =>
    useApi(async () => { throw new Error('boom') }, []),
  )

  await waitFor(() => expect(result.current.loading).toBe(false))
  expect(result.current.error).toBeInstanceOf(Error)
  expect(result.current.data).toBeNull()
})

test('useApi: refetch při změně deps', async () => {
  const fetcher = vi.fn(async (_signal: AbortSignal) => 'x')
  const { rerender } = renderHook(({ dep }) => useApi(() => fetcher(new AbortController().signal), [dep]), {
    initialProps: { dep: 1 },
  })
  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1))
  rerender({ dep: 2 })
  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2))
})
```

- [ ] **Step 3: Spusť test — musí selhat**

Run: `npm test -- useApi`
Expected: FAIL („Cannot find module './useApi'").

- [ ] **Step 4: Napiš hook** — `src/hooks/useApi.ts`

```ts
import { useEffect, useState } from 'react'
import { getCompanies, getTariffs, getPages, getPage } from '../api/endpoints'

export type ApiState<T> = { data: T | null; loading: boolean; error: Error | null }

// Generický datový hook: řeší loading/error i rušení zastaralých odpovědí.
export function useApi<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: unknown[],
): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({ data: null, loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()
    setState({ data: null, loading: true, error: null })
    fetcher(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setState({ data, loading: false, error: null })
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted || (err as Error)?.name === 'AbortError') return
        setState({ data: null, loading: false, error: err as Error })
      })
    return () => controller.abort()
    // deps řídí volající; fetcher se mezi rendery mění, proto není v poli závislostí
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}

export const useCompanies = () => useApi((signal) => getCompanies(signal), [])
export const useTariffs = () => useApi((signal) => getTariffs(signal), [])
export const usePages = () => useApi((signal) => getPages(signal), [])
export const usePage = (slug: string) => useApi((signal) => getPage(slug, signal), [slug])
```

- [ ] **Step 5: Spusť test — musí projít**

Run: `npm test -- useApi`
Expected: PASS (3 testy).

- [ ] **Step 6: Commit**

```bash
git add src/api/endpoints.ts src/hooks/useApi.ts src/hooks/useApi.test.tsx
git commit -m "feat(api): endpoints + generický hook useApi a wrappery"
```

---

### Task 3: Tariffs → PricingPage

**Files:**
- Create: `src/api/tariffMapping.ts`
- Test: `src/api/tariffMapping.test.ts`
- Modify: `src/pages/PricingPage.tsx`
- Modify: `src/pages/PricingPage.test.tsx`

**Interfaces:**
- Consumes: `Tariff` (Task 1), `useTariffs` (Task 2), `PricingItem`/`Tier` z `src/components/common/PricingCard.tsx`.
- Produces: `formatPrice(monthly: string | null): string`, `tierForCode(code: string): Tier`, `tariffToItem(t: Tariff): PricingItem`.

- [ ] **Step 1: Napiš failing test** — `src/api/tariffMapping.test.ts`

```ts
import { formatPrice, tierForCode, tariffToItem } from './tariffMapping'
import type { Tariff } from './types'

test('formatPrice: měsíční cena se skupinami tisíců a Kč', () => {
  expect(formatPrice('490.00')).toBe('490 Kč')
  expect(formatPrice('10098.00')).toBe('10 098 Kč')
})

test('formatPrice: null → Cena na dotaz', () => {
  expect(formatPrice(null)).toBe('Cena na dotaz')
})

test('tierForCode: mapuje kódy na vizuální tier, neznámý → start', () => {
  expect(tierForCode('pro')).toBe('pro')
  expect(tierForCode('enterprise')).toBe('premium')
  expect(tierForCode('cokoliv')).toBe('start')
})

test('tariffToItem: null cena dá CTA Kontaktovat', () => {
  const t: Tariff = { code: 'enterprise', label: 'Enterprise', monthlyPriceCzk: null, annualPriceCzk: null, features: ['Vše z Pro'] }
  const item = tariffToItem(t)
  expect(item.name).toBe('Enterprise')
  expect(item.price).toBe('Cena na dotaz')
  expect(item.cta).toBe('Kontaktovat')
  expect(item.features).toEqual(['Vše z Pro'])
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npm test -- tariffMapping`
Expected: FAIL („Cannot find module './tariffMapping'").

- [ ] **Step 3: Napiš mapping** — `src/api/tariffMapping.ts`

```ts
import type { Tariff } from './types'
import type { PricingItem, Tier } from '../components/common/PricingCard'

// API vrací 4 kódy, karta má 3 vizuální varianty – přiřazení stylu ke kódu.
const TIER_BY_CODE: Record<string, Tier> = {
  free_trial: 'start',
  lite: 'start',
  pro: 'pro',
  enterprise: 'premium',
}

export function tierForCode(code: string): Tier {
  return TIER_BY_CODE[code] ?? 'start'
}

export function formatPrice(monthly: string | null): string {
  if (monthly == null) return 'Cena na dotaz'
  const n = Math.round(Number(monthly))
  return `${n.toLocaleString('en-US').replace(/,/g, ' ')} Kč`
}

export function tariffToItem(t: Tariff): PricingItem {
  return {
    name: t.label,
    price: formatPrice(t.monthlyPriceCzk),
    note: 'MĚSÍČNÍ BALÍČEK BEZ DPH',
    features: t.features,
    cta: t.monthlyPriceCzk == null ? 'Kontaktovat' : 'Začněte zdarma',
  }
}
```

- [ ] **Step 4: Spusť test — musí projít**

Run: `npm test -- tariffMapping`
Expected: PASS (4 testy).

- [ ] **Step 5: Zapoj do PricingPage** — `src/pages/PricingPage.tsx`

Přidej importy (k existujícím):

```tsx
import { useTariffs } from '../hooks/useApi'
import { tariffToItem, tierForCode } from '../api/tariffMapping'
```

Uvnitř `export default function PricingPage()`, hned na začátku těla, nahraď přímé mapování `PRICING` výpočtem `cards` (dynamická data z API, fallback na statická `PRICING` při načítání/chybě):

```tsx
export default function PricingPage() {
  const { data: tariffs } = useTariffs()
  // Dynamicky z API; dokud data nejsou (načítání/chyba) → statická PRICING, ať stránka není prázdná.
  const cards = tariffs
    ? tariffs.map((t) => ({ key: t.code, item: tariffToItem(t), tier: tierForCode(t.code) }))
    : PRICING.map((p) => ({ key: p.name, item: p, tier: p.name.toLowerCase() as Tier }))
```

Pak v JSX nahraď blok, který mapuje `PRICING`, tímto (mapuje `cards`):

```tsx
              {cards.map((c) => (
                <Box
                  key={c.key}
                  sx={{ width: '100%', maxWidth: 370, minWidth: 0, '@media (min-width:1600px)': { flex: '1 1 0', width: 'auto' } }}
                >
                  <PricingCard item={c.item} tier={c.tier} />
                </Box>
              ))}
```

(`PRICING` a `Tier` zůstávají naimportované – používají se ve fallbacku.)

- [ ] **Step 6: Uprav test PricingPage** — `src/pages/PricingPage.test.tsx`

Nahraď celý soubor (mockuje hook, aby test nešel na síť a ověřil dynamická data i statickou tabulku):

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import PricingPage from './PricingPage'
import * as useApi from '../hooks/useApi'

const renderPage = () =>
  render(<ThemeProvider theme={theme}><MemoryRouter><PricingPage /></MemoryRouter></ThemeProvider>)

test('ceník zobrazí tarify z API a statickou srovnávací tabulku', () => {
  vi.spyOn(useApi, 'useTariffs').mockReturnValue({
    data: [
      { code: 'lite', label: 'Lite', monthlyPriceCzk: '490.00', annualPriceCzk: '4998.00', features: ['Základní správa kódů'] },
      { code: 'enterprise', label: 'Enterprise', monthlyPriceCzk: null, annualPriceCzk: null, features: ['Vše z Pro'] },
    ],
    loading: false,
    error: null,
  })

  renderPage()

  expect(screen.getByText('Lite')).toBeInTheDocument()
  expect(screen.getByText('490 Kč')).toBeInTheDocument()
  expect(screen.getByText('Cena na dotaz')).toBeInTheDocument()
  expect(screen.getByText('Klientské rozhraní')).toBeInTheDocument()
})

test('ceník padne zpět na statické tarify při chybě/načítání', () => {
  vi.spyOn(useApi, 'useTariffs').mockReturnValue({ data: null, loading: false, error: new Error('x') })
  renderPage()
  expect(screen.getByText('1 490 Kč')).toBeInTheDocument()
})
```

- [ ] **Step 7: Spusť testy — musí projít**

Run: `npm test -- PricingPage tariffMapping`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/api/tariffMapping.ts src/api/tariffMapping.test.ts src/pages/PricingPage.tsx src/pages/PricingPage.test.tsx
git commit -m "feat(pricing): dynamické tarify z API s fallbackem na statická data"
```

---

### Task 4: Pages (seznam) → navigace

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/MobileMenu.tsx`
- Test: `src/components/layout/Header.test.tsx`

**Interfaces:**
- Consumes: `usePages` (Task 2), `NAV_LINKS` z `src/data/content.ts`, `PageSummary`.
- Produces: nic pro další tasky (jen UI). Dynamické položky vedou na `/stranka/{slug}`.

- [ ] **Step 1: Napiš failing test** — přepiš `src/components/layout/Header.test.tsx`

Nejdřív mrkni na aktuální obsah `src/components/layout/Header.test.tsx`, ať víš, co nahrazuješ. Pak nahraď celý soubor:

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import Header from './Header'
import * as useApi from '../../hooks/useApi'

const renderHeader = () =>
  render(<ThemeProvider theme={theme}><MemoryRouter><Header /></MemoryRouter></ThemeProvider>)

test('Header ukáže statické i dynamické položky z API', () => {
  vi.spyOn(useApi, 'usePages').mockReturnValue({
    data: [{ title: 'O nás', slug: 'o-nas' }],
    loading: false,
    error: null,
  })

  renderHeader()

  expect(screen.getAllByText('Ceník').length).toBeGreaterThan(0)
  const oNas = screen.getAllByText('O nás')
  expect(oNas.length).toBeGreaterThan(0)
  expect(oNas[0].closest('a')).toHaveAttribute('href', '/stranka/o-nas')
})

test('Header bez API dat ukáže jen statické položky', () => {
  vi.spyOn(useApi, 'usePages').mockReturnValue({ data: null, loading: true, error: null })
  renderHeader()
  expect(screen.getAllByText('Kontakt').length).toBeGreaterThan(0)
  expect(screen.queryByText('O nás')).toBeNull()
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npm test -- Header`
Expected: FAIL (žádný `/stranka/o-nas` odkaz, `usePages` se nepoužívá).

- [ ] **Step 3: Zapoj do Header** — `src/components/layout/Header.tsx`

Přidej importy:

```tsx
import { usePages } from '../../hooks/useApi'
```

V těle komponenty za `const [menuOpen, setMenuOpen] = useState(false)` přidej sestavení odkazů (statické + dynamické z API):

```tsx
  const { data: pages } = usePages()
  const dynamicLinks = (pages ?? []).map((p) => ({ label: p.title, to: `/stranka/${p.slug}` }))
  const links = [...NAV_LINKS, ...dynamicLinks]
```

Pak v JSX nahraď `NAV_LINKS.map((l) => {` za `links.map((l) => {` (jen ta jedna navigační smyčka; CTA a odznak nech beze změny). Předej `links` i do `MobileMenu`:

```tsx
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
```

- [ ] **Step 4: Uprav MobileMenu, aby bral odkazy zvenčí** — `src/components/layout/MobileMenu.tsx`

Změň signaturu a smyčku, ať menu ukazuje stejné odkazy jako Header (fallback na `NAV_LINKS`, když prop nepřijde):

```tsx
export default function MobileMenu({
  open, onClose, links = NAV_LINKS,
}: { open: boolean; onClose: () => void; links?: { label: string; to: string }[] }) {
```

A ve `Stack` s navigací nahraď `NAV_LINKS.map((l) => {` za `links.map((l) => {`. Import `NAV_LINKS` ponech (používá se jako default).

- [ ] **Step 5: Spusť testy — musí projít**

Run: `npm test -- Header`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/MobileMenu.tsx src/components/layout/Header.test.tsx
git commit -m "feat(nav): dynamické podstránky z API v hlavičce i mobilním menu"
```

---

### Task 5: Pages/{slug} → route `/stranka/:slug`

**Files:**
- Create: `src/pages/DynamicPage.tsx`
- Test: `src/pages/DynamicPage.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `usePage` (Task 2), `ApiError` (Task 1), `useParams` z react-router.
- Produces: default export komponenta `DynamicPage`; route `/stranka/:slug`.

- [ ] **Step 1: Napiš failing test** — `src/pages/DynamicPage.test.tsx`

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import DynamicPage from './DynamicPage'
import * as useApi from '../hooks/useApi'

const renderAt = (path: string) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <Routes><Route path="/stranka/:slug" element={<DynamicPage />} /></Routes>
      </MemoryRouter>
    </ThemeProvider>,
  )

test('DynamicPage vykreslí title, HTML obsah a galerii', () => {
  vi.spyOn(useApi, 'usePage').mockReturnValue({
    data: { title: 'O nás', slug: 'o-nas', content: '<p>Ahoj světe</p>', gallery: ['https://x/1.jpg'] },
    loading: false,
    error: null,
  })

  renderAt('/stranka/o-nas')

  expect(screen.getByRole('heading', { name: 'O nás' })).toBeInTheDocument()
  expect(screen.getByText('Ahoj světe')).toBeInTheDocument()
  expect(screen.getByRole('img')).toHaveAttribute('src', 'https://x/1.jpg')
})

test('DynamicPage ukáže hlášku při 404', () => {
  vi.spyOn(useApi, 'usePage').mockReturnValue({
    data: null,
    loading: false,
    error: Object.assign(new Error('404'), { status: 404 }),
  })
  renderAt('/stranka/neexistuje')
  expect(screen.getByText(/nenalezena/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npm test -- DynamicPage`
Expected: FAIL („Cannot find module './DynamicPage'").

- [ ] **Step 3: Napiš komponentu** — `src/pages/DynamicPage.tsx`

```tsx
import { Box, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { usePage } from '../hooks/useApi'
import DecorLines from '../components/common/DecorLines'
import SectionCard from '../components/common/SectionCard'
import GridSection from '../components/layout/GridSection'
import Footer from '../components/layout/Footer'
import ContactBlock from '../components/common/ContactBlock'
import { fluid } from '../theme/fluid'

// Dynamická podstránka z API (pages/{slug}) – nadpis + HTML obsah + galerie.
export default function DynamicPage() {
  const { slug = '' } = useParams()
  const { data, loading, error } = usePage(slug)

  return (
    <Box data-testid="page-dynamic">
      <Box sx={{ position: 'relative', mb: '200px' }}>
        <DecorLines sx={{ top: 110 }} />
        <GridSection sx={{ position: 'relative', zIndex: 1 }}>
          <SectionCard sx={{ bgcolor: '#F5F5F5', px: fluid(20, 64), pt: fluid(80, 85), pb: fluid(96, 180) }}>
            {loading && <Typography sx={{ textAlign: 'center' }}>Načítám…</Typography>}
            {!loading && error && (
              <Typography sx={{ textAlign: 'center' }}>Stránka nebyla nalezena.</Typography>
            )}
            {!loading && !error && data && (
              <>
                <Typography variant="h3" sx={{ mb: 6, textAlign: 'center', lineHeight: fluid(22, 57), letterSpacing: '-0.84px', fontSize: fluid(18, 42) }}>
                  {data.title}
                </Typography>
                <Box
                  sx={{ fontSize: fluid(14, 18), lineHeight: fluid(20, 30), '& img': { maxWidth: '100%', borderRadius: '20px' } }}
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
                {data.gallery.length > 0 && (
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: '24px', mt: fluid(32, 48) }}>
                    {data.gallery.map((src, i) => (
                      <Box key={i} component="img" src={src} alt="" sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: '20px', display: 'block' }} />
                    ))}
                  </Box>
                )}
              </>
            )}
          </SectionCard>
        </GridSection>
      </Box>
      <Footer topContent={<ContactBlock />} />
    </Box>
  )
}
```

- [ ] **Step 4: Přidej route** — `src/App.tsx`

Přidej import a route uvnitř `<Route element={<PageLayout />}>`:

```tsx
import DynamicPage from './pages/DynamicPage'
```

```tsx
        <Route path="/stranka/:slug" element={<DynamicPage />} />
```

- [ ] **Step 5: Spusť test — musí projít**

Run: `npm test -- DynamicPage`
Expected: PASS (2 testy).

- [ ] **Step 6: Commit**

```bash
git add src/pages/DynamicPage.tsx src/pages/DynamicPage.test.tsx src/App.tsx
git commit -m "feat(pages): route /stranka/:slug s obsahem z API (pages/{slug})"
```

---

### Task 6: Companies → footer „Doplňkové služby"

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Test: `src/components/layout/Footer.test.tsx`

**Interfaces:**
- Consumes: `useCompanies` (Task 2), `Company`, `FOOTER` z `content.ts`.
- Produces: nic pro další tasky. Odkazy vedou na `/provozovna/{publicHash}`.

- [ ] **Step 1: Napiš failing test** — přepiš `src/components/layout/Footer.test.tsx`

Nejdřív mrkni na aktuální obsah souboru. Pak nahraď celý soubor:

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import Footer from './Footer'
import * as useApi from '../../hooks/useApi'

const renderFooter = () =>
  render(<ThemeProvider theme={theme}><MemoryRouter><Footer /></MemoryRouter></ThemeProvider>)

const company = {
  name: 'Lékárna Pod Věží',
  billingIco: '87654321',
  address: { street: 'Hlavní 42', city: 'Praha', zip: '11000' },
  logo: null,
  photos: { exterior: null, interior: null },
  publicHash: '0698b3c8bfc2',
}

test('Footer vypíše provozovny jako odkazy na /provozovna/{hash}', () => {
  vi.spyOn(useApi, 'useCompanies').mockReturnValue({ data: [company], loading: false, error: null })
  renderFooter()
  const link = screen.getByText('Lékárna Pod Věží')
  expect(link.closest('a')).toHaveAttribute('href', '/provozovna/0698b3c8bfc2')
})

test('Footer bez provozoven ukáže statické odkazy Doplňkových služeb', () => {
  vi.spyOn(useApi, 'useCompanies').mockReturnValue({ data: null, loading: true, error: null })
  renderFooter()
  expect(screen.getByText('Tvorba webu se SLEVOU')).toBeInTheDocument()
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npm test -- Footer`
Expected: FAIL (žádný odkaz na `/provozovna/...`).

- [ ] **Step 3: Zapoj do Footer** — `src/components/layout/Footer.tsx`

Přidej importy:

```tsx
import { useCompanies } from '../../hooks/useApi'
```

V těle `Footer` na začátku přidej:

```tsx
  const { data: companies } = useCompanies()
```

Ve smyčce `FOOTER.columns.map((col) => (` uprav vykreslení odkazů tak, aby sloupec „Doplňkové služby" – když jsou data z API – ukázal provozovny místo statických odkazů. Nahraď blok `{col.links.map((link) => ( … ))}` tímto:

```tsx
                  {col.title === 'Doplňkové služby' && companies && companies.length > 0
                    ? companies.map((c) => (
                        <MuiLink
                          key={c.publicHash}
                          component={RouterLink}
                          to={`/provozovna/${c.publicHash}`}
                          underline="hover"
                          sx={{ display: 'block', fontSize: fluid(14, 16), color: '#000', lineHeight: '36px', '&:hover': { color: 'primary.main' } }}
                        >
                          {c.name}
                        </MuiLink>
                      ))
                    : col.links.map((link) => (
                        <MuiLink
                          key={link}
                          component={RouterLink}
                          to="/faq"
                          underline="hover"
                          sx={{ display: 'block', fontSize: fluid(14, 16), color: '#000', lineHeight: '36px', '&:hover': { color: 'primary.main' } }}
                        >
                          {link}
                        </MuiLink>
                      ))}
```

- [ ] **Step 4: Spusť test — musí projít**

Run: `npm test -- Footer`
Expected: PASS (2 testy).

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Footer.tsx src/components/layout/Footer.test.tsx
git commit -m "feat(footer): dynamický seznam provozoven v Doplňkových službách"
```

---

### Task 7: Companies → ContentPage na `/provozovna/:publicHash`

**Files:**
- Modify: `src/data/content.ts` (UNI → šablona s placeholdery)
- Create: `src/api/companyFill.ts`
- Test: `src/api/companyFill.test.ts`
- Modify: `src/pages/ContentPage.tsx`
- Modify: `src/pages/ContentPage.test.tsx`
- Modify: `src/App.tsx` (route)

**Interfaces:**
- Consumes: `useCompanies` (Task 2), `Company`, `UNI` z `content.ts`, `useParams`.
- Produces: `formatAddress(address: Company['address']): string`, `orderUrl(publicHash: string): string`, `fillPlaceholders(text: string, values: Record<string, string>): string`, `companyImages(company: Company): string[]`.

- [ ] **Step 1: Uprav UNI na šablonu** — `src/data/content.ts`

V objektu `UNI.paragraphs` doplň placeholdery na místa údajů společnosti. Konkrétně:

Ve druhém odstavci (`'\nobchodní společnosti\n\n' + …`) nahraď za:

```ts
    '\nobchodní společnosti {{companyName}}\n\n' +
    'se sídlem {{address}}\n' +
    'identifikační číslo: {{ico}}\n' +
    'zapsané v obchodním rejstříku vedeném , oddíl , vložka\n' +
    'pro prodej zboží prostřednictvím on-line obchodu umístěného na internetové adrese {{orderUrl}}',
```

V odstavci pod „ÚVODNÍ USTANOVENÍ" nahraď začátek `'Tyto obchodní podmínky (dále jen „obchodní podmínky") obchodní společnosti , se sídlem , identifikační číslo: , zapsané'` za:

```ts
    'Tyto obchodní podmínky (dále jen „obchodní podmínky“) obchodní společnosti {{companyName}}, se sídlem {{address}}, identifikační ' +
    'číslo: {{ico}}, zapsané v obchodním rejstříku vedeném , oddíl , vložka (dále jen „prodávající“) upravují v souladu ' +
```

(Zbytek toho odstavce ponech beze změny.)

- [ ] **Step 2: Napiš failing test** — `src/api/companyFill.test.ts`

```ts
import { formatAddress, orderUrl, fillPlaceholders, companyImages } from './companyFill'
import type { Company } from './types'

const company: Company = {
  name: 'Lékárna Pod Věží',
  billingIco: '87654321',
  address: { street: 'Hlavní 42', city: 'Praha', zip: '11000' },
  logo: 'https://x/logo.webp',
  photos: { exterior: 'https://x/ext.jpg', interior: null },
  publicHash: '0698b3c8bfc2',
}

test('formatAddress skládá jen neprázdné části', () => {
  expect(formatAddress(company.address)).toBe('Hlavní 42, Praha 11000')
  expect(formatAddress({ street: null, city: 'Brno', zip: null })).toBe('Brno')
  expect(formatAddress({ street: null, city: null, zip: null })).toBe('')
})

test('orderUrl složí odkaz z publicHash', () => {
  expect(orderUrl('abc')).toBe('https://app.epoukazonline.cz/c/abc')
})

test('fillPlaceholders nahradí tokeny', () => {
  expect(fillPlaceholders('a {{x}} b {{y}}', { x: '1', y: '2' })).toBe('a 1 b 2')
})

test('companyImages vrátí jen neprázdné obrázky (logo, exteriér, interiér)', () => {
  expect(companyImages(company)).toEqual(['https://x/logo.webp', 'https://x/ext.jpg'])
})
```

- [ ] **Step 3: Spusť test — musí selhat**

Run: `npm test -- companyFill`
Expected: FAIL („Cannot find module './companyFill'").

- [ ] **Step 4: Napiš helper** — `src/api/companyFill.ts`

```ts
import type { Company } from './types'

export function formatAddress(address: Company['address']): string {
  const cityZip = [address.city, address.zip].filter(Boolean).join(' ')
  return [address.street, cityZip].filter(Boolean).join(', ')
}

export function orderUrl(publicHash: string): string {
  return `https://app.epoukazonline.cz/c/${publicHash}`
}

export function fillPlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_m, key: string) => values[key] ?? '')
}

export function companyImages(company: Company): string[] {
  return [company.logo, company.photos.exterior, company.photos.interior].filter(
    (src): src is string => Boolean(src),
  )
}
```

- [ ] **Step 5: Spusť test — musí projít**

Run: `npm test -- companyFill`
Expected: PASS (4 testy).

- [ ] **Step 6: Zapoj do ContentPage** — `src/pages/ContentPage.tsx`

Přidej importy:

```tsx
import { useParams } from 'react-router-dom'
import { useCompanies } from '../hooks/useApi'
import { formatAddress, orderUrl, fillPlaceholders, companyImages } from '../api/companyFill'
```

Na začátku `export default function ContentPage()` přidej výběr provozovny podle `publicHash` a sestavení hodnot i galerie:

```tsx
  const { publicHash } = useParams()
  const { data: companies } = useCompanies()
  const company = publicHash ? companies?.find((c) => c.publicHash === publicHash) : undefined

  // Hodnoty do šablony – prázdné, když provozovna není (holé /faq, /obchodni-podminky jako dnes).
  const fill = {
    companyName: company?.name ?? '',
    address: company ? formatAddress(company.address) : '',
    ico: company?.billingIco ?? '',
    orderUrl: company ? orderUrl(company.publicHash) : '',
  }
  const galleryImages = company ? companyImages(company) : GALLERY_IMAGES
```

Pak v renderu odstavců obal text placeholderů funkcí `fillPlaceholders`. V obou `Typography`, které vykreslují `{p}`, nahraď `{p}` za `{fillPlaceholders(p, fill)}`. A ve smyčce galerie nahraď `GALLERY_IMAGES.map(` za `galleryImages.map(`.

Konkrétně blok galerie (kde je `{GALLERY_IMAGES.map((src, gi) => (`) i podmínku vykreslení galerie uprav tak, aby se galerie nezobrazila prázdná:

```tsx
                      {i === galleryBeforeIndex && galleryImages.length > 0 && (
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: `repeat(${Math.min(galleryImages.length, 3)}, 1fr)` },
                            gap: '24px',
                            my: fluid(32, 48),
                            justifyItems: 'center',
                          }}
                        >
                          {galleryImages.map((src, gi) => (
                            <Box
                              key={gi}
                              component="img"
                              src={src}
                              alt=""
                              aria-hidden
                              sx={{ width: '100%', maxWidth: 360, aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: '20px', display: 'block' }}
                            />
                          ))}
                        </Box>
                      )}
```

- [ ] **Step 7: Přidej route** — `src/App.tsx`

Uvnitř `<Route element={<PageLayout />}>` přidej:

```tsx
        <Route path="/provozovna/:publicHash" element={<ContentPage />} />
```

(`ContentPage` už je naimportovaná.)

- [ ] **Step 8: Uprav test ContentPage** — `src/pages/ContentPage.test.tsx`

Nahraď celý soubor (ověří holou stránku i variantu s provozovnou):

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import ContentPage from './ContentPage'
import * as useApi from '../hooks/useApi'

const company = {
  name: 'Lékárna Pod Věží',
  billingIco: '87654321',
  address: { street: 'Hlavní 42', city: 'Praha', zip: '11000' },
  logo: null,
  photos: { exterior: null, interior: null },
  publicHash: '0698b3c8bfc2',
}

test('UNI stránka bez provozovny má nadpis a text (placeholdery prázdné)', () => {
  vi.spyOn(useApi, 'useCompanies').mockReturnValue({ data: null, loading: false, error: null })
  render(<ThemeProvider theme={theme}><MemoryRouter><ContentPage /></MemoryRouter></ThemeProvider>)
  expect(screen.getByText(/Nadpis univerzální podstránky/)).toBeInTheDocument()
  expect(screen.getByText(/OBCHODNÍ PODMÍNKY/)).toBeInTheDocument()
})

test('Na /provozovna/:hash doplní údaje provozovny do textu', () => {
  vi.spyOn(useApi, 'useCompanies').mockReturnValue({ data: [company], loading: false, error: null })
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/provozovna/0698b3c8bfc2']}>
        <Routes><Route path="/provozovna/:publicHash" element={<ContentPage />} /></Routes>
      </MemoryRouter>
    </ThemeProvider>,
  )
  expect(screen.getByText(/Lékárna Pod Věží/)).toBeInTheDocument()
  expect(screen.getByText(/Hlavní 42, Praha 11000/)).toBeInTheDocument()
})
```

- [ ] **Step 9: Spusť testy — musí projít**

Run: `npm test -- ContentPage companyFill`
Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add src/data/content.ts src/api/companyFill.ts src/api/companyFill.test.ts src/pages/ContentPage.tsx src/pages/ContentPage.test.tsx src/App.tsx
git commit -m "feat(content): provozovna na /provozovna/:publicHash – data do UNI textu a galerie"
```

---

### Task 8: Finální ověření

**Files:** žádné nové (kontrolní task).

- [ ] **Step 1: Celá test suite**

Run: `npm test`
Expected: PASS (všechny testy).

- [ ] **Step 2: Typecheck + build**

Run: `npm run build`
Expected: `tsc -b` bez chyb, Vite build projde.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: bez chyb.

- [ ] **Step 4: Ruční ověření (uživatel)**

Vytvoř lokální `.env` (necommitovat) z `.env.example` a doplň `VITE_API_TOKEN` od kolegy. Pak `npm run dev` a zkontroluj: ceník (tarify z API), navigaci (dynamické položky), `/stranka/{slug}`, footer (provozovny), `/provozovna/{publicHash}` (doplněný text + obrázky).

- [ ] **Step 5: Commit (pokud vznikly drobné úpravy)**

```bash
git add -A
git commit -m "chore(api): finální ověření napojení na API"
```

---

## Self-review (pokrytí spec)

- Token na jednom místě + komentář pro kolegu → Task 1 (config.ts).
- `.env`/`.env.example`/`.gitignore` → Task 1.
- `apiFetch` + ošetření 401/404 → Task 1.
- `useApi` + race condition (AbortController) + wrappery → Task 2.
- tariffs → PricingPage (dynamické karty, měsíční ceny, `null` → na dotaz, fallback) → Task 3.
- pages → navigace (Header + MobileMenu) → Task 4.
- pages/{slug} → `/stranka/:slug` + 404 → Task 5.
- companies → footer „Doplňkové služby" → Task 6.
- companies → ContentPage `/provozovna/:publicHash` (šablona s placeholdery, obrázky, centrování při null) → Task 7.
- Holé `/faq`, `/obchodni-podminky` beze změny (prázdné placeholdery) → Task 7.
- Testy klienta/hooku/mapování/komponent → napříč tasky; celková kontrola → Task 8.
