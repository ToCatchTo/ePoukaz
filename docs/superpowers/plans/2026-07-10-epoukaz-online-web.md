# ePoukaz online — web — implementační plán

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Postavit desktop marketingový web ePoukaz online (4 stránky) věrně dle XD návrhu na Vite + React + TS + MUI.

**Architecture:** SPA s React Router (4 cesty). Centrální MUI theme drží barvy/typografii/tvary. Sdílené komponenty (Header, Footer, CTA banner, formuláře) se skládají do stránek. Veškeré rozvržení přes MUI `Grid`. Obsah je oddělen v `src/data/content.ts`.

**Tech Stack:** Vite, React 18, TypeScript, MUI v6 (@mui/material, @mui/icons-material, @emotion), react-router-dom v6, @fontsource/poppins, Vitest + @testing-library/react.

## Global Constraints

- **Jen desktop, žádná responzivita** — pevná šířka obsahu, žádné breakpointy pro mobil.
- **Rozvržení přes MUI `Grid`** (nainstalované MUI **v9**, nový Grid se `size` prop) všude, kde to dává smysl.
- **POZOR MUI v9 `Grid` i `Stack`:** ani jeden nepřijímá `alignItems`, `justifyContent` nebo `textAlign` jako prop — vždy do `sx` (např. `<Grid container sx={{ alignItems: 'center' }}>`, `<Stack sx={{ alignItems: 'center' }}>`). `Grid` propy: `container`, `size`, `spacing`, `columns`, `direction`, `offset`, `wrap`. `Stack` propy: `direction`, `spacing`, `divider`, `useFlexGap`, `sx`.
- **Typová brána = `npm run build`** (spouští `tsc -b`, který reálně typuje `src/`). `npx tsc --noEmit` je s root tsconfig (`files: []`) **no-op** a chyby nezachytí — každý task musí projít `npm run build`.
- **Komentáře v kódu česky.**
- **Font Poppins** (náhrada za Google Sans): 400/500/700.
- **Barvy přesně:** fialová `#4200D8`, tyrkysová `#00C7BF`, žlutá `#FFE346`, šedé `#5A5A5A`/`#939393`/`#F5F5F5`; pastely karet `#C4FFFD`/`#F6C9FF`/`#CFBAFF`/`#FFE59F`/`#FFB1B1`/`#B3FCB9`; banner `#FDD6DF`.
- **Fotky = placeholdery** (barevné bloky správných rozměrů) v `public/images`; **ikony přes MUI**.
- **Formuláře = jen vizuál** (bez validace/odeslání).
- Dvě složky assetů: `public/icons`, `public/images`.
- Obsahová šířka centrována; návrh 1920 px → obsah cca 1200 px kontejner.

---

### Task 1: Scaffold projektu (Vite + React + TS + MUI + Vitest)

**Files:**
- Create: celý Vite projekt v `C:\www\ePoukaz` (package.json, vite.config.ts, tsconfig, index.html, src/main.tsx, src/App.tsx)
- Create: `public/icons/.gitkeep`, `public/images/.gitkeep`
- Create: `vitest.config.ts`, `src/test/setup.ts`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces: běžící Vite dev server; `npm run build`, `npm test`, `npx tsc --noEmit` fungují. `App` komponenta (zatím „Ahoj").

- [ ] **Step 1: Inicializace Vite projektu do stávající složky**

Složka `C:\www\ePoukaz` obsahuje jen `docs/`, `public/icons`, `public/images`, `_navrh/`. Vygenerujeme do dočasné složky a obsah překopírujeme, ať se nepřepíšou existující složky.

Run (PowerShell):
```powershell
npm create vite@latest _scaffold -- --template react-ts
Copy-Item -Recurse -Force _scaffold\* .
Remove-Item -Recurse -Force _scaffold
```

- [ ] **Step 2: Instalace závislostí**

Run:
```powershell
npm install
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom @fontsource/poppins
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Git init (verzování + časté commity)**

Run:
```powershell
git init
```
Create `.gitignore` (Vite šablona ho už obvykle má — ověř, že obsahuje `node_modules`, `dist`).

- [ ] **Step 4: Vitest konfigurace**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Konfigurace testů (jsdom + testing-library)
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
```

Create `src/test/setup.ts`:
```ts
// Rozšíření matcherů o @testing-library/jest-dom
import '@testing-library/jest-dom'
```

Add to `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 5: Minimální App + placeholder assety**

Replace `src/App.tsx`:
```tsx
// Dočasná kostra – nahradí ji router v Tasku 4
export default function App() {
  return <div>Ahoj ePoukaz</div>
}
```

Create prázdné `public/icons/.gitkeep` a `public/images/.gitkeep`.

Create `src/App.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import App from './App'

// Kouřový test: kostra aplikace se vyrenderuje
test('vyrenderuje kostru aplikace', () => {
  render(<App />)
  expect(screen.getByText('Ahoj ePoukaz')).toBeInTheDocument()
})
```

- [ ] **Step 6: Ověř build, typecheck a test**

Run:
```powershell
npx tsc --noEmit
npm test
npm run build
```
Expected: tsc bez chyb; test PASS; build vytvoří `dist/`.

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "chore: scaffold Vite + React + TS + MUI + Vitest"
```

---

### Task 2: MUI theme

**Files:**
- Create: `src/theme/theme.ts`
- Modify: `src/main.tsx` (ThemeProvider + CssBaseline + import fontu)
- Test: `src/theme/theme.test.ts`

**Interfaces:**
- Produces: `export const theme` (MUI Theme). Paleta: `primary.main = #4200D8`, `secondary.main = #00C7BF`. Doplňkové barvy přes `theme.palette` rozšíření a přes konstanty `PASTELS`.
- Produces: `export const PASTELS` — `{ teal, pink, purple, yellow, red, green }` s hex hodnotami karet.

- [ ] **Step 1: Napiš test na theme**

Create `src/theme/theme.test.ts`:
```ts
import { theme, PASTELS } from './theme'

test('paleta má správné brand barvy', () => {
  expect(theme.palette.primary.main).toBe('#4200D8')
  expect(theme.palette.secondary.main).toBe('#00C7BF')
})

test('pastely karet obsahují 6 barev', () => {
  expect(Object.values(PASTELS)).toHaveLength(6)
  expect(PASTELS.teal).toBe('#C4FFFD')
})

test('font je Poppins', () => {
  expect(theme.typography.fontFamily).toContain('Poppins')
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npx vitest run src/theme/theme.test.ts`
Expected: FAIL (modul `./theme` neexistuje).

- [ ] **Step 3: Implementuj theme**

Create `src/theme/theme.ts`:
```ts
import { createTheme } from '@mui/material/styles'

// Pastelové barvy 6 karet „problémů" (přesně z XD)
export const PASTELS = {
  teal: '#C4FFFD',
  pink: '#F6C9FF',
  purple: '#CFBAFF',
  yellow: '#FFE59F',
  red: '#FFB1B1',
  green: '#B3FCB9',
} as const

// Centrální theme – drží barvy, typografii a tvary z návrhu
export const theme = createTheme({
  palette: {
    primary: { main: '#4200D8' },   // fialová – pozadí, brand
    secondary: { main: '#00C7BF' }, // tyrkysová – akční prvky
    text: { primary: '#000000', secondary: '#5A5A5A' },
    background: { default: '#4200D8' },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: 90, lineHeight: 1.05 },
    h2: { fontWeight: 700, fontSize: 50, lineHeight: 1.1 },
    h3: { fontWeight: 700, fontSize: 42, lineHeight: 1.15 },
    h4: { fontWeight: 700, fontSize: 30 },
    h5: { fontWeight: 700, fontSize: 26 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 24 },
  components: {
    // Tlačítka jako „pill" – plně zaoblená
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 24, paddingBlock: 10 },
      },
    },
  },
})
```

- [ ] **Step 4: Zapoj theme + font v main.tsx**

Replace `src/main.tsx`:
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './theme/theme'
import App from './App'
// Font Poppins – náhrada za Google Sans
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/700.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
```

- [ ] **Step 5: Test + typecheck**

Run: `npx vitest run src/theme/theme.test.ts && npx tsc --noEmit`
Expected: PASS, bez typových chyb.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "feat: MUI theme (barvy, Poppins, pill tlačítka)"
```

---

### Task 3: Obsahová data

**Files:**
- Create: `src/data/content.ts`
- Test: `src/data/content.test.ts`

**Interfaces:**
- Produces exporty:
  - `NAV_LINKS: { label: string; to: string }[]`
  - `HERO: { title: string; paragraph: string; cta: string }`
  - `TESTIMONIALS: { name: string; role: string; quote: string }[]` (3)
  - `HOW_STEPS: { title: string; text: string }[]` (8)
  - `PROBLEMS: { title: string; text: string; color: string }[]` (6)
  - `TRY_FORM: { title: string; subtitle: string; fieldsCount: number; submit: string }`
  - `CTA_BANNER: { title: string; button: string }`
  - `TWO_MONTHS: { title: string; text: string }`
  - `CONTACT: { email: string; phone: string; messageLabel: string }`
  - `PRICING: { name: string; price: string; note: string; features: string[]; cta: string; accent: 'black'|'purple'|'teal'; highlighted: boolean }[]` (3)
  - `COMPARE_ROWS: { label: string; start: boolean; pro: boolean; premium: boolean }[]` (15)
  - `SMS_NOTE: string`
  - `CENIK_HEAD: { title: string; subtitle: string }`
  - `FOOTER: { company: string[]; columns: { title: string; links: string[] }[]; copyright: string; credit: string }`
  - `UNI: { title: string; paragraphs: string[] }`

- [ ] **Step 1: Napiš test na data**

Create `src/data/content.test.ts`:
```ts
import { HOW_STEPS, PROBLEMS, PRICING, COMPARE_ROWS, TESTIMONIALS, FOOTER } from './content'

test('8 kroků jak to funguje', () => {
  expect(HOW_STEPS).toHaveLength(8)
  expect(HOW_STEPS[0].title).toBe('Nastavení za pár minut')
})

test('6 barevných karet problémů', () => {
  expect(PROBLEMS).toHaveLength(6)
  expect(PROBLEMS[0].color).toBe('#C4FFFD')
})

test('3 tarify a 15 řádků srovnání', () => {
  expect(PRICING).toHaveLength(3)
  expect(PRICING[1].highlighted).toBe(true)
  expect(COMPARE_ROWS).toHaveLength(15)
})

test('3 recenze a 3 sloupce patičky', () => {
  expect(TESTIMONIALS).toHaveLength(3)
  expect(FOOTER.columns).toHaveLength(3)
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npx vitest run src/data/content.test.ts`
Expected: FAIL (modul neexistuje).

- [ ] **Step 3: Implementuj data**

Create `src/data/content.ts`:
```ts
import { PASTELS } from '../theme/theme'

// Navigace v hlavičce
export const NAV_LINKS = [
  { label: 'Jak to funguje?', to: '/#jak-to-funguje' },
  { label: 'Ceník', to: '/cenik' },
  { label: 'Kontakt', to: '/kontakt' },
]

// HERO sekce homepage
export const HERO = {
  title: 'Šetřete čas sobě i pacientům',
  paragraph:
    'Digitalizujte příjem a správu elektronických ePoukazů ve svých zdravotnických potřebách, ' +
    'lékárně nebo optice. Pacient odešle poukaz online, vy ho během vteřiny vidíte ve svém systému ' +
    '– bez telefonátů, papírů a nepříjemných zmatků.',
  cta: 'Vyzkoušejte',
}

// Recenzní bublinky v hero
export const TESTIMONIALS = [
  { name: 'Eliška', role: 'dcera seniora',
    quote: 'Pomůcky tátovi objednám z práce, doručí mu je domů. Ušetřím čas, on má klid.' },
  { name: 'Gábina', role: 'majitelka zdravotnických potřeb',
    quote: 'Konečně systém, který šetří čas nám i pacientům – objednají si pohodlně z domova.' },
  { name: 'Jarmila', role: 'seniorka 67 let',
    quote: 'Poukaz odešlu z domova, do provozovny jdu až si pomůcky vyzvednout. Dřív jsem musela dvakrát.' },
]

// 8 kroků „Jak to funguje" (texty z PDF)
export const HOW_STEPS = [
  { title: 'Nastavení za pár minut',
    text: 'Zaregistrujete se, nahrajete SÚKL a osobní certifikát a systém vám vygeneruje unikátní link. Ten jednoduše vložíte na svůj web a jste připraveni přijímat poukazy.' },
  { title: 'Pacient nahraje poukaz sám',
    text: 'Pacient nebo jeho blízký přes váš web jednoduše načte QR kód nebo zadá kód ručně. Bez front, bez telefonátů, kdykoliv z pohodlí domova nebo přímo z ordinace. Načíst můžete i vy přímo v systému.' },
  { title: 'Poukaz máte hned v systému',
    text: 'Jakmile pacient poukaz odešle, okamžitě se zobrazí ve vašem administračním rozhraní i s načtenými SÚKL daty. Nic nepřepisujete a nic neověřujete ručně.' },
  { title: 'Přehledná správa stavů',
    text: 'Každému poukazu můžete nastavit stav – od přijetí až po vyřízení. Váš tým má vždy jasno, co je potřeba udělat a co už je hotové.' },
  { title: 'Automatické upozornění pacienta',
    text: 'Jakmile je poukaz připraven k vyzvednutí, pacientovi automaticky přijde notifikace. Pokud nechcete, nemusíte mu volat ani psát – systém to udělá za vás.' },
  { title: 'Klienti pod kontrolou',
    text: 'Ke každému pacientovi vidíte historii objednávek a můžete ho snadno kontaktovat. Vše přehledně na jednom místě.' },
  { title: 'Kategorie a upomínky na míru',
    text: 'Stálým klientům přiřadíte kategorie podle toho, co objednávají, a nastavíte si upomínky na docházející pomůcky. Ozvete se jim přesně ve chvíli, kdy vás budou potřebovat.' },
  { title: 'Bezproblémové propojení se SÚKL',
    text: 'Data ze SÚKL se načtou automaticky a zůstávají provázaná po celou dobu vyřizování. Výdej nebo částečný výdej provedete klidně ve svém účetním programu – stav se sám promítne i do naší aplikace a poukaz se automaticky označí jako vydaný nebo částečně vydaný.' },
]

// 6 karet „problémů" (pořadí a barvy dle mřížky 3×2 v XD)
export const PROBLEMS = [
  { title: 'Ušetříte čas', color: PASTELS.teal,
    text: 'Poukazy vám chodí rovnou do administrace – nemusíte je přepisovat, skenovat ani telefonicky ověřovat. Co dřív trvalo minuty u každého pacienta, teď zvládnete jedním pohledem.' },
  { title: 'Zpřehledníte si správu', color: PASTELS.pink,
    text: 'Všechny poukazy na jednom místě, se stavy „nové", „rozpracováno", „vyřízeno". Váš tým vždy ví, co je potřeba udělat a co už je hotové.' },
  { title: 'Zorganizujete si vaše klienty', color: PASTELS.purple,
    text: 'Ke každému pacientovi si uložíte historii objednávek, kategorie i poznámky. Příště ho poznáte na první pohled a nabídnete mu přesně to, co potřebuje.' },
  { title: 'Zbavíte se telefonátů', color: PASTELS.yellow,
    text: 'Pacient dostane e-mailem (nebo SMS) info o stavu svého poukazu automaticky – bez toho, aby vám kvůli tomu musel volat nebo psát.' },
  { title: 'Propojíme vás se SÚKL', color: PASTELS.red,
    text: 'Data z SÚKL se načtou automaticky a zůstávají provázaná po celou dobu vyřizování. Výdej i částečný výdej klidně provedete ve svém účetním programu – stav se sám promítne i k nám.' },
  { title: 'Nezapomenete na vaše klienty', color: PASTELS.green,
    text: 'Nastavte si upomínky na vyzvednutí, opakované objednávky nebo termín kontroly. Nic vám a vašim pacientům neuteče.' },
]

// Formulář „30 dní zdarma" – jen vizuál, 6 polí
export const TRY_FORM = {
  title: 'Vyzkoušejte to sami – 30 dní zdarma',
  subtitle:
    'Zadejte pár údajů a my se vám ozveme s bezplatným přístupem na 30 dní. Žádný závazek, žádná platební ' +
    'karta – jen zjistíte, kolik času vám a vašemu týmu ePoukaz online ušetří.',
  fieldsCount: 6,
  submit: 'Odeslat',
}

// Spodní CTA banner
export const CTA_BANNER = {
  title: 'A to není vše! Přesvědčte se sami a vyzkoušejte na 30 dní ZDARMA',
  button: 'Vyzkoušejte',
}

// Růžový banner „2 měsíce ZDARMA"
export const TWO_MONTHS = {
  title: '2 měsíce ZDARMA',
  text: 'Zvolte si roční platbu a získejte tak 2 měsíce naší služby ePoukazonline, která vám šetří čas a stres ZDARMA.',
}

// Kontaktní blok
export const CONTACT = {
  email: 'info@epoukazonline.cz',
  phone: '+420 800 000 000',
  messageLabel: 'Zanechte nám zprávu a my se vám ozveme',
}

// Ceník – 3 tarify
export const PRICING = [
  { name: 'Start', price: '1 490 Kč', note: 'MĚSÍČNÍ BALÍČEK BEZ DPH',
    features: ['ePoukaz online', 'Správa ePoukazů', 'Notifikace e-mailem', 'Security'],
    cta: 'Začněte zdarma', accent: 'black' as const, highlighted: false },
  { name: 'Pro', price: '2 490 Kč', note: 'MĚSÍČNÍ BALÍČEK BEZ DPH',
    features: ['ePoukaz online', 'Správa ePoukazů', 'Notifikace e-mailem', 'Security'],
    cta: 'Začněte zdarma', accent: 'purple' as const, highlighted: true },
  { name: 'Premium', price: '3 990 Kč', note: 'MĚSÍČNÍ BALÍČEK BEZ DPH',
    features: ['ePoukaz online', 'Správa ePoukazů', 'Notifikace e-mailem', 'Security'],
    cta: 'Kontaktovat', accent: 'teal' as const, highlighted: false },
]

// Srovnávací tabulka „Nástroje". POZOR: rozložení fajfek ověř proti _navrh/ (960px render).
export const COMPARE_ROWS = [
  { label: 'Klientské rozhraní', start: true, pro: true, premium: true },
  { label: 'Administrátorské rozhraní', start: true, pro: true, premium: true },
  { label: 'Správa a změna stavu ePoukazů', start: true, pro: true, premium: true },
  { label: 'Archivace ePoukazů', start: true, pro: true, premium: true },
  { label: 'Security - GDPR a ochrana osobních údajů', start: true, pro: true, premium: true },
  { label: 'Profil Mojí firmy', start: true, pro: true, premium: true },
  { label: 'Notifikace zákazníka e-mailem', start: true, pro: true, premium: true },
  { label: 'Notifikace zákazníka SMS*', start: false, pro: true, premium: true },
  { label: 'Měsíční reporty', start: false, pro: true, premium: true },
  { label: 'Profil, historie a interval objednávek klienta', start: false, pro: true, premium: true },
  { label: 'Sleva 50% na tvorbu webu (detail)', start: false, pro: true, premium: true },
  { label: 'Online platby', start: false, pro: false, premium: true },
  { label: 'Více uživatelů a štítků', start: false, pro: false, premium: true },
  { label: 'Export kontaktních údajů (csv, excel)', start: false, pro: false, premium: true },
  { label: 'Napojení dopravní společnosti (DPD, PPL a další)', start: false, pro: false, premium: true },
]

// Poznámka k SMS pod tabulkou
export const SMS_NOTE =
  '*Informace k SMS notifikacím: Služba umožňuje zasílání SMS notifikací zákazníkům (např. informace ' +
  'o ePoukazu nebo stavu objednávky). Tyto SMS jsou realizovány prostřednictvím externího poskytovatele ' +
  'komunikačních služeb a nejsou zahrnuty v měsíčním poplatku za využívání služby. Cena za odeslané SMS ' +
  'je účtována samostatně dle skutečného počtu odeslaných zpráv a aktuálního ceníku poskytovatele. ' +
  'Náklady na tyto SMS budou připočteny k pravidelnému měsíčnímu vyúčtování služby.'

// Nadpis a podtitul ceníku (opraven překlep „prefenrencí" → „preferencí")
export const CENIK_HEAD = {
  title: 'Vyberte si svůj tarif dle vašich preferencí a potřeb',
  subtitle:
    'Při registraci se vám automaticky zapne 30 dní ZDARMA v tarifu Pro. ' +
    'Výběr tarifu můžete kdykoliv změnit ve svém uživatelském účtu.',
}

// Patička
export const FOOTER = {
  company: [
    'epoukazonline s.r.o.',
    'Kaprova 42/14, Staré Město, 110 00 Praha 1',
    'IČ: 29645387, DIČ: CZ29645387',
    'Společnost zapsána pod značkou',
    'C 450020/MSPH Městským soudem v Praze',
  ],
  columns: [
    { title: 'Jak na to?', links: ['Jak implementovat', 'Jak to funguje?', 'Video tutorial', 'FAQ'] },
    { title: 'Obecné', links: ['Rozšíření aplikace na míru', 'Tvorba webu se SLEVOU', 'Tvorba loga se SLEVOU'] },
    { title: 'Doplňkové služby', links: ['Rozšíření aplikace na míru', 'Tvorba webu se SLEVOU', 'Tvorba loga se SLEVOU'] },
  ],
  copyright: '2026, epoukazonline.cz',
  credit: 'Tvoříme weby s radostí',
}

// Univerzální podstránka (obchodní podmínky – varianta B, zkráceno na úvodní odstavce)
export const UNI = {
  title: 'Nadpis univerzální podstránky, může být až dvouřádkový',
  paragraphs: [
    'OBCHODNÍ PODMÍNKY (VARIANTA B)',
    'Tyto obchodní podmínky (dále jen „obchodní podmínky") obchodní společnosti … upravují v souladu ' +
      's ustanovením § 1751 odst. 1 zákona č. 89/2012 Sb., občanský zákoník, vzájemná práva a povinnosti ' +
      'smluvních stran vzniklé v souvislosti nebo na základě kupní smlouvy uzavírané mezi prodávajícím ' +
      'a kupujícím prostřednictvím internetového obchodu prodávajícího.',
    'ÚVODNÍ USTANOVENÍ',
    'Obchodní podmínky se nevztahují na případy, kdy osoba, která má v úmyslu nakoupit zboží od prodávajícího, ' +
      'je právnickou osobou či osobou, jež jedná při objednávání zboží v rámci své podnikatelské činnosti.',
    'UŽIVATELSKÝ ÚČET',
    'Na základě registrace kupujícího provedené na webové stránce může kupující přistupovat do svého ' +
      'uživatelského rozhraní. Přístup k uživatelskému účtu je zabezpečen uživatelským jménem a heslem.',
  ],
}
```

> Pozn.: dlouhý text obchodních podmínek je v návrhu jen „lorem-like" výplň se zástupnými poli (…). V datech je zkrácená věrná verze; plné znění lze doplnit později bez zásahu do komponent.

- [ ] **Step 4: Spusť test — musí projít**

Run: `npx vitest run src/data/content.test.ts && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: obsahová data (texty z XD + PDF)"
```

---

### Task 4: App shell, Router a PageLayout

**Files:**
- Create: `src/components/layout/PageLayout.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Interfaces:**
- Consumes: nic z pozdějších tasků; stránky zatím jako inline stuby.
- Produces: `PageLayout` (obal: fialové pozadí `primary.main`, `<Header/>` později, `<Outlet/>`, `<Footer/>` později). Router se 4 cestami: `/`, `/cenik`, `/kontakt`, `/obchodni-podminky`.

- [ ] **Step 1: Uprav test na routing**

Replace `src/App.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/theme'
import { AppRoutes } from './App'

// Pomocná funkce – renderuje appku na dané cestě
function renderAt(path: string) {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </ThemeProvider>,
  )
}

test('domovská stránka se vyrenderuje', () => {
  renderAt('/')
  expect(screen.getByTestId('page-home')).toBeInTheDocument()
})

test('ceník se vyrenderuje', () => {
  renderAt('/cenik')
  expect(screen.getByTestId('page-cenik')).toBeInTheDocument()
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npx vitest run src/App.test.tsx`
Expected: FAIL (`AppRoutes` neexistuje).

- [ ] **Step 3: Implementuj PageLayout**

Create `src/components/layout/PageLayout.tsx`:
```tsx
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

// Obal všech stránek – fialové pozadí + centrovaný obsah.
// Header a Footer se doplní v Tascích 5 a 6.
export default function PageLayout() {
  return (
    <Box sx={{ bgcolor: 'primary.main', minHeight: '100vh', pb: 8 }}>
      {/* zde bude <Header/> */}
      <Box sx={{ width: 1200, mx: 'auto' }}>
        <Outlet />
      </Box>
      {/* zde bude <Footer/> */}
    </Box>
  )
}
```

- [ ] **Step 4: Implementuj router v App.tsx**

Replace `src/App.tsx`:
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import PageLayout from './components/layout/PageLayout'

// Dočasné stuby stránek – nahradí je Tasky 9–12
const Stub = ({ id, label }: { id: string; label: string }) => (
  <Box data-testid={id} sx={{ color: '#fff', py: 10 }}>{label}</Box>
)

// Definice cest – oddělené, aby šly testovat přes MemoryRouter
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Stub id="page-home" label="Home" />} />
        <Route path="/cenik" element={<Stub id="page-cenik" label="Ceník" />} />
        <Route path="/kontakt" element={<Stub id="page-kontakt" label="Kontakt" />} />
        <Route path="/obchodni-podminky" element={<Stub id="page-uni" label="UNI" />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
```

- [ ] **Step 5: Test + typecheck**

Run: `npx vitest run src/App.test.tsx && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "feat: router + PageLayout (4 cesty)"
```

---

### Task 5: Header

**Files:**
- Create: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/PageLayout.tsx` (vlož `<Header/>`)
- Test: `src/components/layout/Header.test.tsx`

**Interfaces:**
- Consumes: `NAV_LINKS` z `content.ts`.
- Produces: `Header` – plovoucí bílá pill lišta. Aktivní odkaz fialově (`primary.main`).

- [ ] **Step 1: Napiš test**

Create `src/components/layout/Header.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import Header from './Header'

test('hlavička zobrazuje navigaci a CTA', () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter><Header /></MemoryRouter>
    </ThemeProvider>,
  )
  expect(screen.getByText('Ceník')).toBeInTheDocument()
  expect(screen.getByText('Kontakt')).toBeInTheDocument()
  expect(screen.getByText('30 dní ZDARMA')).toBeInTheDocument()
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npx vitest run src/components/layout/Header.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implementuj Header**

Create `src/components/layout/Header.tsx`:
```tsx
import { Box, Button, Grid, Link as MuiLink } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../data/content'

// Plovoucí bílá pill hlavička s logem, navigací a CTA tlačítkem
export default function Header() {
  const { pathname } = useLocation()
  return (
    <Box
      component="header"
      sx={{
        bgcolor: '#fff', borderRadius: 999, px: 4, py: 1.5, mt: 3, mb: 4,
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
      }}
    >
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        {/* Logo */}
        <Grid size="auto">
          <MuiLink component={RouterLink} to="/" underline="none" sx={{ fontSize: 22, color: '#000' }}>
            <b>ePoukaz</b><span style={{ color: '#939393' }}>online</span>
          </MuiLink>
        </Grid>
        <Grid size="grow" />
        {/* Navigace */}
        {NAV_LINKS.map((l) => {
          const active = l.to === pathname
          return (
            <Grid size="auto" key={l.label}>
              <MuiLink
                component={RouterLink}
                to={l.to}
                underline="none"
                sx={{ fontWeight: 700, fontSize: 18, color: active ? 'primary.main' : '#000' }}
              >
                {l.label}
              </MuiLink>
            </Grid>
          )
        })}
        {/* CTA */}
        <Grid size="auto">
          <Button variant="contained" color="secondary" sx={{ color: '#fff' }}>
            30 dní ZDARMA
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
```

- [ ] **Step 4: Vlož Header do PageLayout**

In `src/components/layout/PageLayout.tsx` nahraď komentář `{/* zde bude <Header/> */}` importem a `<Header/>` uvnitř centrovaného kontejneru (nad `<Outlet/>`):
```tsx
import Header from './Header'
// …
<Box sx={{ width: 1200, mx: 'auto' }}>
  <Header />
  <Outlet />
</Box>
```

- [ ] **Step 5: Test + typecheck**

Run: `npx vitest run src/components/layout/Header.test.tsx && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "feat: Header (pill navigace + CTA)"
```

---

### Task 6: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/components/layout/PageLayout.tsx` (vlož `<Footer/>`)
- Test: `src/components/layout/Footer.test.tsx`

**Interfaces:**
- Consumes: `FOOTER` z `content.ts`.
- Produces: `Footer` – bílá karta s firmou, 3 sloupci odkazů, copyrightem; pod ní kredit „Tvoříme weby s radostí".

- [ ] **Step 1: Napiš test**

Create `src/components/layout/Footer.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import Footer from './Footer'

test('patička zobrazuje firmu a sloupce', () => {
  render(<ThemeProvider theme={theme}><Footer /></ThemeProvider>)
  expect(screen.getByText('epoukazonline s.r.o.')).toBeInTheDocument()
  expect(screen.getByText('Jak na to?')).toBeInTheDocument()
  expect(screen.getByText('Doplňkové služby')).toBeInTheDocument()
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npx vitest run src/components/layout/Footer.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implementuj Footer**

Create `src/components/layout/Footer.tsx`:
```tsx
import { Box, Grid, Typography } from '@mui/material'
import { FOOTER } from '../../data/content'

// Patička – bílá karta se 4 sloupci (firma + 3 sloupce odkazů) a kreditem
export default function Footer() {
  return (
    <>
      <Box sx={{ bgcolor: '#fff', borderRadius: 6, px: 6, py: 5, mt: 6 }}>
        <Grid container spacing={4}>
          {/* Firma */}
          <Grid size={4}>
            <Typography sx={{ fontSize: 22, mb: 2 }}>
              <b>ePoukaz</b><span style={{ color: '#939393' }}>online</span>
            </Typography>
            {FOOTER.company.map((line) => (
              <Typography key={line} sx={{ fontSize: 14, color: '#000' }}>{line}</Typography>
            ))}
          </Grid>
          {/* 3 sloupce odkazů */}
          {FOOTER.columns.map((col) => (
            <Grid size={2.66} key={col.title}>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>{col.title}</Typography>
              {col.links.map((link) => (
                <Typography key={link} sx={{ fontSize: 14, color: '#000', mb: 0.5 }}>{link}</Typography>
              ))}
            </Grid>
          ))}
        </Grid>
        <Typography sx={{ textAlign: 'center', fontSize: 14, color: '#000', mt: 4 }}>
          {FOOTER.copyright}
        </Typography>
      </Box>
      {/* Kredit agentury */}
      <Typography sx={{ textAlign: 'center', color: '#fff', fontWeight: 700, mt: 3 }}>
        {FOOTER.credit}
      </Typography>
    </>
  )
}
```

- [ ] **Step 4: Vlož Footer do PageLayout**

In `src/components/layout/PageLayout.tsx` nahraď `{/* zde bude <Footer/> */}` importem a `<Footer/>` uvnitř centrovaného kontejneru pod `<Outlet/>`.

- [ ] **Step 5: Test + typecheck + build**

Run: `npx vitest run && npx tsc --noEmit && npm run build`
Expected: PASS.

- [ ] **Step 6: Vizuální kontrola v prohlížeči**

Run `npm run dev`, otevři `http://localhost:5173/`. Zkontroluj hlavičku a patičku proti `_navrh/` (a náhledům homepage). Uprav rozestupy dle potřeby.

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "feat: Footer (firma + 3 sloupce + kredit)"
```

---

### Task 7: Společné stavební prvky (WavePattern, SectionCard, CircleArrowButton)

**Files:**
- Create: `src/components/common/WavePattern.tsx`
- Create: `src/components/common/SectionCard.tsx`
- Create: `src/components/common/CircleArrowButton.tsx`
- Test: `src/components/common/common.test.tsx`

**Interfaces:**
- Produces:
  - `SectionCard({ children, sx? })` – bílá zaoblená karta (obal sekcí).
  - `CircleArrowButton({ onClick? })` – tyrkysové kulaté tlačítko se šipkou (`ArrowForward`).
  - `WavePattern({ sx? })` – dekorativní pás vzoru rybích šupin (SVG/CSS), tyrkysové linky na fialovém.

- [ ] **Step 1: Napiš test**

Create `src/components/common/common.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import SectionCard from './SectionCard'
import CircleArrowButton from './CircleArrowButton'

test('SectionCard vykreslí obsah', () => {
  render(<ThemeProvider theme={theme}><SectionCard>obsah</SectionCard></ThemeProvider>)
  expect(screen.getByText('obsah')).toBeInTheDocument()
})

test('CircleArrowButton je tlačítko', () => {
  render(<ThemeProvider theme={theme}><CircleArrowButton /></ThemeProvider>)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npx vitest run src/components/common/common.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implementuj prvky**

Create `src/components/common/SectionCard.tsx`:
```tsx
import { Box, SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

// Bílá zaoblená karta – univerzální obal sekcí
export default function SectionCard({ children, sx }: { children: ReactNode; sx?: SxProps<Theme> }) {
  return (
    <Box sx={{ bgcolor: '#fff', borderRadius: 8, p: 6, ...sx }}>{children}</Box>
  )
}
```

Create `src/components/common/CircleArrowButton.tsx`:
```tsx
import { IconButton } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

// Tyrkysové kulaté tlačítko se šipkou (accordion, CTA)
export default function CircleArrowButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{ bgcolor: 'secondary.main', color: '#fff', '&:hover': { bgcolor: 'secondary.dark' } }}
    >
      <ArrowForwardIcon />
    </IconButton>
  )
}
```

Create `src/components/common/WavePattern.tsx`:
```tsx
import { Box, SxProps, Theme } from '@mui/material'

// Dekorativní pás vzoru „rybích šupin" – tyrkysové oblouky na fialovém pozadí.
// Vykresleno opakovaným SVG přes CSS background.
const wave = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='30'>
     <path d='M0 30 A30 30 0 0 1 60 30' fill='none' stroke='%2300C7BF' stroke-width='2'/>
   </svg>`,
)
export default function WavePattern({ sx }: { sx?: SxProps<Theme> }) {
  return (
    <Box
      sx={{
        height: 160,
        backgroundImage: `url("data:image/svg+xml,${wave}")`,
        backgroundRepeat: 'repeat',
        opacity: 0.9,
        ...sx,
      }}
    />
  )
}
```

- [ ] **Step 4: Test + typecheck**

Run: `npx vitest run src/components/common/common.test.tsx && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: společné prvky (SectionCard, CircleArrowButton, WavePattern)"
```

---

### Task 8: Sdílené sekce (CtaBanner, TryForFreeForm, ContactBlock, TwoMonthsFreeBanner)

**Files:**
- Create: `src/components/common/CtaBanner.tsx`
- Create: `src/components/common/TryForFreeForm.tsx`
- Create: `src/components/common/ContactBlock.tsx`
- Create: `src/components/common/TwoMonthsFreeBanner.tsx`
- Test: `src/components/common/sections.test.tsx`

**Interfaces:**
- Consumes: `CTA_BANNER`, `TRY_FORM`, `CONTACT`, `TWO_MONTHS` z `content.ts`; `SectionCard`.
- Produces: 4 bezstavové sekční komponenty (formuláře jen vizuál).

- [ ] **Step 1: Napiš test**

Create `src/components/common/sections.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import CtaBanner from './CtaBanner'
import TryForFreeForm from './TryForFreeForm'
import ContactBlock from './ContactBlock'

const wrap = (ui: React.ReactNode) => <ThemeProvider theme={theme}>{ui}</ThemeProvider>

test('CTA banner má tlačítko Vyzkoušejte', () => {
  render(wrap(<CtaBanner />))
  expect(screen.getByText('Vyzkoušejte')).toBeInTheDocument()
})

test('formulář 30 dní zdarma má 6 polí a Odeslat', () => {
  render(wrap(<TryForFreeForm />))
  expect(screen.getAllByPlaceholderText('*Jméno')).toHaveLength(6)
  expect(screen.getByText('Odeslat')).toBeInTheDocument()
})

test('kontaktní blok ukazuje e-mail', () => {
  render(wrap(<ContactBlock />))
  expect(screen.getByText('info@epoukazonline.cz')).toBeInTheDocument()
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npx vitest run src/components/common/sections.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implementuj sekce**

Create `src/components/common/CtaBanner.tsx`:
```tsx
import { Button, Stack, Typography } from '@mui/material'
import SectionCard from './SectionCard'
import { CTA_BANNER } from '../../data/content'

// Spodní CTA banner – bílá karta s fialovým nadpisem a tyrkysovým tlačítkem
export default function CtaBanner() {
  return (
    <SectionCard sx={{ my: 6, textAlign: 'center' }}>
      <Stack spacing={3} sx={{ alignItems: 'center' }}>
        <Typography variant="h2" sx={{ color: 'primary.main' }}>{CTA_BANNER.title}</Typography>
        <Button variant="contained" color="secondary" sx={{ color: '#fff', px: 5, py: 1.5 }}>
          {CTA_BANNER.button}
        </Button>
      </Stack>
    </SectionCard>
  )
}
```

Create `src/components/common/TryForFreeForm.tsx`:
```tsx
import { Box, Button, Grid, InputBase, Stack, Typography } from '@mui/material'
import { TRY_FORM } from '../../data/content'

// Formulář „Vyzkoušejte to sami – 30 dní zdarma" – JEN VIZUÁL (6 pill polí)
export default function TryForFreeForm() {
  return (
    <Stack spacing={4} sx={{ py: 8, textAlign: 'center', alignItems: 'center' }}>
      <Typography variant="h2" sx={{ color: '#fff' }}>{TRY_FORM.title}</Typography>
      <Typography sx={{ color: '#fff', maxWidth: 720, fontSize: 20 }}>{TRY_FORM.subtitle}</Typography>
      <Grid container spacing={2} sx={{ maxWidth: 600 }}>
        {Array.from({ length: TRY_FORM.fieldsCount }).map((_, i) => (
          <Grid size={6} key={i}>
            <InputBase
              placeholder="*Jméno"
              sx={{ bgcolor: '#CFBAFF', borderRadius: 999, px: 3, py: 1.2, width: '100%' }}
            />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="secondary" sx={{ color: '#fff', px: 5, py: 1.5 }}>
        {TRY_FORM.submit}
      </Button>
    </Stack>
  )
}
```

Create `src/components/common/ContactBlock.tsx`:
```tsx
import { Box, Grid, InputBase, Stack, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import SectionCard from './SectionCard'
import { CONTACT } from '../../data/content'

// Kontaktní blok – e-mail, telefon a pole zprávy (jen vizuál)
export default function ContactBlock() {
  return (
    <SectionCard sx={{ my: 6 }}>
      <Grid container spacing={4}>
        {/* Kontaktní údaje */}
        <Grid size={6}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <EmailIcon color="primary" />
              <Typography variant="h4">{CONTACT.email}</Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <PhoneIcon color="primary" />
              <Typography variant="h4">{CONTACT.phone}</Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* Pole zprávy */}
        <Grid size={6}>
          <Stack spacing={2}>
            <InputBase placeholder="*Email" sx={{ bgcolor: '#F5F5F5', borderRadius: 3, px: 2, py: 1.2 }} />
            <InputBase
              placeholder={`*${CONTACT.messageLabel}`}
              multiline minRows={3}
              sx={{ bgcolor: '#F5F5F5', borderRadius: 3, px: 2, py: 1.2 }}
            />
          </Stack>
        </Grid>
      </Grid>
    </SectionCard>
  )
}
```

Create `src/components/common/TwoMonthsFreeBanner.tsx`:
```tsx
import { Box, Grid, Stack, Typography } from '@mui/material'
import { TWO_MONTHS } from '../../data/content'

// Růžový banner „2 měsíce ZDARMA" s placeholderem fotky ženy vpravo
export default function TwoMonthsFreeBanner() {
  return (
    <Box sx={{ bgcolor: '#FDD6DF', borderRadius: 8, overflow: 'hidden', my: 6 }}>
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid size={7} sx={{ p: 6 }}>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: 74, fontWeight: 700 }}>{TWO_MONTHS.title}</Typography>
            <Typography sx={{ fontSize: 18 }}>{TWO_MONTHS.text}</Typography>
          </Stack>
        </Grid>
        {/* Placeholder fotky */}
        <Grid size={5}>
          <Box sx={{ height: 260, bgcolor: '#F6C9FF' }} aria-label="placeholder fotka" />
        </Grid>
      </Grid>
    </Box>
  )
}
```

- [ ] **Step 4: Test + typecheck**

Run: `npx vitest run src/components/common/sections.test.tsx && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: sdílené sekce (CTA, formulář, kontakt, banner 2 měsíce)"
```

---

### Task 9: HomePage

**Files:**
- Create: `src/pages/HomePage.tsx`
- Modify: `src/App.tsx` (nahraď stub `page-home`)
- Test: `src/pages/HomePage.test.tsx`

**Interfaces:**
- Consumes: `HERO`, `TESTIMONIALS`, `HOW_STEPS`, `PROBLEMS` z `content.ts`; `SectionCard`, `CircleArrowButton`, `WavePattern`, `TryForFreeForm`, `CtaBanner`.
- Produces: `HomePage` s `data-testid="page-home"` a kotvou `#jak-to-funguje`.

- [ ] **Step 1: Napiš test**

Create `src/pages/HomePage.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import HomePage from './HomePage'

test('homepage má hero, 8 kroků a 6 karet', () => {
  render(
    <ThemeProvider theme={theme}><MemoryRouter><HomePage /></MemoryRouter></ThemeProvider>,
  )
  expect(screen.getByText('Šetřete čas sobě i pacientům')).toBeInTheDocument()
  expect(screen.getByText('Nastavení za pár minut')).toBeInTheDocument()
  expect(screen.getByText('Ušetříte čas')).toBeInTheDocument()
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npx vitest run src/pages/HomePage.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implementuj HomePage**

Create `src/pages/HomePage.tsx`:
```tsx
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import SectionCard from '../components/common/SectionCard'
import CircleArrowButton from '../components/common/CircleArrowButton'
import WavePattern from '../components/common/WavePattern'
import TryForFreeForm from '../components/common/TryForFreeForm'
import CtaBanner from '../components/common/CtaBanner'
import { HERO, TESTIMONIALS, HOW_STEPS, PROBLEMS } from '../data/content'

// Domovská stránka – hero, jak to funguje, 6 problémů, formulář, CTA
export default function HomePage() {
  return (
    <Box data-testid="page-home">
      {/* HERO */}
      <Grid container spacing={4} sx={{ py: 6 }}>
        <Grid size={6}>
          <Stack spacing={4}>
            <Typography variant="h1" sx={{ color: '#fff' }}>{HERO.title}</Typography>
            <Typography sx={{ color: '#fff', fontSize: 20 }}>{HERO.paragraph}</Typography>
            <Button variant="contained" color="secondary" sx={{ color: '#fff', alignSelf: 'flex-start', px: 4, py: 1.5 }}>
              {HERO.cta}
            </Button>
          </Stack>
        </Grid>
        {/* Placeholder telefonu + recenzní bublinky */}
        <Grid size={6}>
          <Box sx={{ height: 360, bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 6, mb: 2 }}
               aria-label="placeholder telefon" />
          <Stack spacing={1.5}>
            {TESTIMONIALS.map((t) => (
              <Box key={t.name} sx={{ bgcolor: '#fff', borderRadius: 3, p: 2 }}>
                <Stack direction="row" spacing={0.5}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} sx={{ color: '#FFE346', fontSize: 16 }} />
                  ))}
                </Stack>
                <Typography sx={{ color: 'primary.main', fontSize: 16 }}>{t.name}</Typography>
                <Typography sx={{ color: '#939393', fontSize: 13 }}>{t.role}</Typography>
                <Typography sx={{ fontSize: 14 }}>„{t.quote}"</Typography>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>

      <WavePattern sx={{ mb: 4 }} />

      {/* JAK TO FUNGUJE – accordion 8 kroků + placeholder mockupu */}
      <SectionCard id="jak-to-funguje" sx={{ my: 4 }}>
        <Grid container spacing={4}>
          <Grid size={6}>
            <Stack divider={<Box sx={{ borderBottom: '1px solid #eee' }} />} spacing={2}>
              {HOW_STEPS.map((s) => (
                <Grid container key={s.title} spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid size="grow">
                    <Typography variant="h5">{s.title}</Typography>
                  </Grid>
                  <Grid size="auto"><CircleArrowButton /></Grid>
                </Grid>
              ))}
            </Stack>
          </Grid>
          <Grid size={6}>
            <Box sx={{ height: 520, bgcolor: '#1b1b1b', borderRadius: 6 }} aria-label="placeholder chat mockup" />
          </Grid>
        </Grid>
      </SectionCard>

      {/* 6 PROBLÉMŮ – mřížka 3×2 barevných karet */}
      <Stack spacing={5} sx={{ py: 8, alignItems: 'center' }}>
        <Typography variant="h1" sx={{ color: '#fff', textAlign: 'center' }}>
          6 problémů, které s námi vyřešíte
        </Typography>
        <Grid container spacing={3}>
          {PROBLEMS.map((p) => (
            <Grid size={4} key={p.title}>
              <Box sx={{ bgcolor: p.color, borderRadius: 6, p: 4, height: '100%',
                         border: '2px solid rgba(0,0,0,0.15)' }}>
                <Typography variant="h4" sx={{ mb: 2, textDecoration: 'underline' }}>{p.title}</Typography>
                <Typography sx={{ fontSize: 18 }}>{p.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>

      <TryForFreeForm />
      <CtaBanner />
    </Box>
  )
}
```

> Pozn.: `SectionCard` musí přijmout `id` prop. Uprav jeho signaturu na `{ children, sx, id }` a předej `id` na `<Box>`.

- [ ] **Step 4: Doplň `id` do SectionCard**

In `src/components/common/SectionCard.tsx` rozšiř props o `id?: string` a předej na `<Box id={id} …>`.

- [ ] **Step 5: Zapoj HomePage do routeru**

In `src/App.tsx` nahraď `<Stub id="page-home" …/>` importem a `<HomePage />`.

- [ ] **Step 6: Test + typecheck + vizuální kontrola**

Run: `npx vitest run src/pages/HomePage.test.tsx && npx tsc --noEmit`
Pak `npm run dev` → `/` a porovnej s náhledem homepage v `_navrh/`. Dolaď rozestupy.

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "feat: HomePage (hero, jak to funguje, 6 problémů)"
```

---

### Task 10: CenikPage

**Files:**
- Create: `src/pages/CenikPage.tsx`
- Modify: `src/App.tsx` (nahraď stub `page-cenik`)
- Test: `src/pages/CenikPage.test.tsx`

**Interfaces:**
- Consumes: `CENIK_HEAD`, `PRICING`, `COMPARE_ROWS`, `SMS_NOTE` z `content.ts`; `SectionCard`, `TwoMonthsFreeBanner`, `TryForFreeForm`, `CtaBanner`.
- Produces: `CenikPage` s `data-testid="page-cenik"`.

- [ ] **Step 1: Napiš test**

Create `src/pages/CenikPage.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import CenikPage from './CenikPage'

test('ceník zobrazuje 3 tarify a tabulku', () => {
  render(<ThemeProvider theme={theme}><MemoryRouter><CenikPage /></MemoryRouter></ThemeProvider>)
  expect(screen.getByText('1 490 Kč')).toBeInTheDocument()
  expect(screen.getByText('2 490 Kč')).toBeInTheDocument()
  expect(screen.getByText('Klientské rozhraní')).toBeInTheDocument()
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npx vitest run src/pages/CenikPage.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implementuj CenikPage**

Create `src/pages/CenikPage.tsx`:
```tsx
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SectionCard from '../components/common/SectionCard'
import TwoMonthsFreeBanner from '../components/common/TwoMonthsFreeBanner'
import TryForFreeForm from '../components/common/TryForFreeForm'
import CtaBanner from '../components/common/CtaBanner'
import { CENIK_HEAD, PRICING, COMPARE_ROWS, SMS_NOTE } from '../data/content'

// Mapa akcentní barvy tarifu na hex
const ACCENT: Record<string, string> = { black: '#000000', purple: '#4200D8', teal: '#00C7BF' }

export default function CenikPage() {
  return (
    <Box data-testid="page-cenik">
      <SectionCard sx={{ my: 4 }}>
        {/* Nadpis */}
        <Stack spacing={2} sx={{ textAlign: 'center', mb: 5, alignItems: 'center' }}>
          <Typography variant="h3">{CENIK_HEAD.title}</Typography>
          <Typography sx={{ fontSize: 18, maxWidth: 720 }}>{CENIK_HEAD.subtitle}</Typography>
        </Stack>

        {/* 3 tarify */}
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {PRICING.map((p) => (
            <Grid size={4} key={p.name}>
              <Box sx={{ bgcolor: '#fff', borderRadius: 6, p: 4, boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                         border: p.highlighted ? `2px solid ${ACCENT.purple}` : '1px solid #eee' }}>
                <Typography sx={{ fontWeight: 700, color: ACCENT[p.accent] }}>{p.name}</Typography>
                <Typography sx={{ fontSize: 64, fontWeight: 500, color: ACCENT[p.accent] }}>{p.price}</Typography>
                <Typography sx={{ fontSize: 11, color: '#939393', mb: 2 }}>{p.note}</Typography>
                <Stack spacing={0.5} sx={{ mb: 3 }}>
                  {p.features.map((f) => <Typography key={f} sx={{ fontSize: 16 }}>{f}</Typography>)}
                </Stack>
                <Button fullWidth variant="contained"
                        color={p.accent === 'teal' ? 'secondary' : 'primary'}
                        sx={{ color: '#fff' }}>
                  {p.cta}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Srovnávací tabulka „Nástroje" */}
        <Box sx={{ mt: 6 }}>
          <Grid container sx={{ py: 1, borderBottom: '2px solid #000' }}>
            <Grid size={6}><Typography variant="h4">Nástroje</Typography></Grid>
            <Grid size={2} sx={{ textAlign: 'center' }}><Typography sx={{ fontWeight: 700 }}>Start</Typography></Grid>
            <Grid size={2} sx={{ textAlign: 'center' }}><Typography sx={{ fontWeight: 700, color: ACCENT.purple }}>Pro</Typography></Grid>
            <Grid size={2} sx={{ textAlign: 'center' }}><Typography sx={{ fontWeight: 700, color: ACCENT.teal }}>Premium</Typography></Grid>
          </Grid>
          {COMPARE_ROWS.map((r) => (
            <Grid container key={r.label} sx={{ py: 1, borderBottom: '1px solid #eee', alignItems: 'center' }}>
              <Grid size={6}><Typography sx={{ color: '#5A5A5A' }}>{r.label}</Typography></Grid>
              <Grid size={2} sx={{ textAlign: 'center' }}>{r.start && <CheckCircleIcon sx={{ color: '#000' }} />}</Grid>
              <Grid size={2} sx={{ textAlign: 'center' }}>{r.pro && <CheckCircleIcon sx={{ color: ACCENT.purple }} />}</Grid>
              <Grid size={2} sx={{ textAlign: 'center' }}>{r.premium && <CheckCircleIcon sx={{ color: ACCENT.teal }} />}</Grid>
            </Grid>
          ))}
        </Box>
      </SectionCard>

      {/* SMS poznámka – bílý text na fialové */}
      <Typography sx={{ color: '#fff', fontSize: 16, my: 4 }}>{SMS_NOTE}</Typography>

      <TwoMonthsFreeBanner />
      <TryForFreeForm />
      <CtaBanner />
    </Box>
  )
}
```

- [ ] **Step 4: Zapoj CenikPage do routeru**

In `src/App.tsx` nahraď `<Stub id="page-cenik" …/>` importem a `<CenikPage />`.

- [ ] **Step 5: Test + typecheck + vizuální kontrola**

Run: `npx vitest run src/pages/CenikPage.test.tsx && npx tsc --noEmit`
Pak `npm run dev` → `/cenik`. **Ověř rozložení fajfek v tabulce proti náhledu ceníku** a případně uprav `COMPARE_ROWS`.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "feat: CenikPage (3 tarify + srovnávací tabulka)"
```

---

### Task 11: KontaktPage

**Files:**
- Create: `src/pages/KontaktPage.tsx`
- Modify: `src/App.tsx` (nahraď stub `page-kontakt`)
- Test: `src/pages/KontaktPage.test.tsx`

**Interfaces:**
- Consumes: `ContactBlock`.
- Produces: `KontaktPage` s `data-testid="page-kontakt"`.

- [ ] **Step 1: Napiš test**

Create `src/pages/KontaktPage.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import KontaktPage from './KontaktPage'

test('kontakt zobrazuje e-mail', () => {
  render(<ThemeProvider theme={theme}><KontaktPage /></ThemeProvider>)
  expect(screen.getByText('info@epoukazonline.cz')).toBeInTheDocument()
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npx vitest run src/pages/KontaktPage.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implementuj KontaktPage**

Create `src/pages/KontaktPage.tsx`:
```tsx
import { Box } from '@mui/material'
import ContactBlock from '../components/common/ContactBlock'

// Stránka Kontakt – jen kontaktní blok (patičku dodává PageLayout)
export default function KontaktPage() {
  return (
    <Box data-testid="page-kontakt" sx={{ py: 4 }}>
      <ContactBlock />
    </Box>
  )
}
```

- [ ] **Step 4: Zapoj do routeru + ověř**

In `src/App.tsx` nahraď stub `page-kontakt`. Run: `npx vitest run src/pages/KontaktPage.test.tsx && npx tsc --noEmit`. Vizuálně `/kontakt`.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: KontaktPage"
```

---

### Task 12: UniPage (univerzální podstránka)

**Files:**
- Create: `src/pages/UniPage.tsx`
- Modify: `src/App.tsx` (nahraď stub `page-uni`)
- Test: `src/pages/UniPage.test.tsx`

**Interfaces:**
- Consumes: `UNI` z `content.ts`; `SectionCard`, `TwoMonthsFreeBanner`, `ContactBlock`.
- Produces: `UniPage` s `data-testid="page-uni"`.

- [ ] **Step 1: Napiš test**

Create `src/pages/UniPage.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import UniPage from './UniPage'

test('UNI stránka má nadpis a text', () => {
  render(<ThemeProvider theme={theme}><UniPage /></ThemeProvider>)
  expect(screen.getByText(/Nadpis univerzální podstránky/)).toBeInTheDocument()
  expect(screen.getByText(/OBCHODNÍ PODMÍNKY/)).toBeInTheDocument()
})
```

- [ ] **Step 2: Spusť test — musí selhat**

Run: `npx vitest run src/pages/UniPage.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implementuj UniPage**

Create `src/pages/UniPage.tsx`:
```tsx
import { Box, Stack, Typography } from '@mui/material'
import SectionCard from '../components/common/SectionCard'
import TwoMonthsFreeBanner from '../components/common/TwoMonthsFreeBanner'
import ContactBlock from '../components/common/ContactBlock'
import { UNI } from '../data/content'

// Univerzální šablona podstránky – nadpis + dlouhý text + banner + kontakt
export default function UniPage() {
  return (
    <Box data-testid="page-uni" sx={{ py: 4 }}>
      <SectionCard>
        <Typography variant="h3" sx={{ mb: 3 }}>{UNI.title}</Typography>
        <Stack spacing={2}>
          {UNI.paragraphs.map((p, i) => (
            <Typography key={i} sx={{ fontSize: 16 }}>{p}</Typography>
          ))}
        </Stack>
      </SectionCard>
      <TwoMonthsFreeBanner />
      <ContactBlock />
    </Box>
  )
}
```

- [ ] **Step 4: Zapoj do routeru + ověř**

In `src/App.tsx` nahraď stub `page-uni`. Run: `npx vitest run src/pages/UniPage.test.tsx && npx tsc --noEmit`. Vizuálně `/obchodni-podminky`.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: UniPage (univerzální podstránka)"
```

---

### Task 13: Placeholder assety + finální průchod

**Files:**
- Create: `public/images/README.md` (seznam očekávaných fotek)
- Modify: `index.html` (title, lang="cs")
- Test: celý balík

**Interfaces:**
- Produces: doladěný web, seznam assetů k dodání.

- [ ] **Step 1: Nastav jazyk a titulek**

In `index.html`: `<html lang="cs">`, `<title>ePoukaz online</title>`.

- [ ] **Step 2: Zdokumentuj očekávané fotky**

Create `public/images/README.md`:
```markdown
# Fotky k dodání (nahradí placeholdery)
- hero-telefon.png — telefon v ruce (hero, ~640×760)
- chat-mockup.png — tmavý telefon s chatem (Jak to funguje, ~700×1000)
- zena.png — fotka ženy (banner 2 měsíce ZDARMA, ~600×520)
- matfix-logo.svg — logo agentury (kredit v patičce)
```

- [ ] **Step 3: Finální kontrola — všechny testy, typecheck, build**

Run:
```powershell
npx tsc --noEmit
npm test
npm run build
```
Expected: vše PASS, `dist/` vytvořeno.

- [ ] **Step 4: Vizuální průchod všech 4 stránek**

`npm run dev` → projdi `/`, `/cenik`, `/kontakt`, `/obchodni-podminky` a porovnej s `_navrh/` i s 960px náhledy. Dolaď mezery, velikosti a barvy.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "chore: jazyk, titulek, seznam assetů + finální doladění"
```

---

## Self-Review (coverage vůči specu)

- §1 rozsah (4 stránky, desktop) → Tasky 4, 9–12. ✅
- §2 tech (Vite/TS/MUI/Router/Grid/Poppins/čeština) → Tasky 1–2, Grid ve všech komponentách. ✅
- §3 tokeny (barvy, typografie, tvary) → Task 2 + PASTELS. ✅
- §4 sdílené komponenty (Header, Footer, WavePattern, CtaBanner, TryForFreeForm, ContactBlock, TwoMonthsFreeBanner, SectionCard, CircleArrowButton) → Tasky 5–8. ✅
- §5 obsah stránek → Tasky 9–12 + data v Tasku 3. ✅
- §6 routing (4 cesty) → Task 4. ✅
- §7 assety (placeholdery, MUI ikony) → Tasky 7–9, 13. ✅
- §8 poznámky (git init, bg #4200D8) → Task 1 (git), Task 2 (barva). ✅

**Rizika / k ověření při realizaci:**
- Rozložení fajfek v `COMPARE_ROWS` je nejlepší odečet z náhledu — ověřit proti XD (Task 10, Step 5).
- Pixel-přesné rozestupy se ladí vizuálně proti `_navrh/` (kontejner 1200 px je aproximace návrhu 1920 px).
