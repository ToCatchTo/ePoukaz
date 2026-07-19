# Hero sekce – plynulé zmenšování kompozice (responzivita 1200–1920 px)

**Datum:** 2026-07-19
**Soubor:** `src/components/common/HeroSection.tsx`

## Problém

Desktopové hero (breakpoint `lg`, ≥1200 px) je art-directed kompozice postavená na
pevné velikosti ~1920 px. Textový sloupec má `maxWidth: 720`, ale ruka s telefonem
a tři plovoucí recenzní karty jsou absolutně pozicované s **pevnými pixely** (ruka
`height: 860`, karty na fixních `top`/`right`/`left`). Při zúžení okna k 1200 px se
kontejner zmenší, ale ruka zůstane 860 px a je přišpendlená na `right: 5%`, takže se
posune doleva a **překryje text**. Nic se neškáluje dolů.

Pod 1200 px běží samostatný naskládaný (mobil/tablet) layout, který je v pořádku.

## Cíl

Zachovat přesnou desktopovou kompozici, ale nechat ji **plynule zmenšovat jako jeden
celek** v rozsahu 1200–1920 px, aby nikdy nezasahovala do textu. Hranice přepnutí na
naskládaný layout zůstává na 1200 px (`lg`).

## Řešení (cesta A – jeden `transform: scale()` na celý shluk)

### 1. Obalovací „stage" vrstva
Dnešní dva desktopové bloky (pravý sloupec s rukou + blok plovoucích recenzí) se sloučí
do jedné vrstvy:

```
<Box>  // stage
  display: { xs: 'none', lg: 'block' }
  position: 'absolute'
  inset: 0                         // stejný box jako sekce → prvky si nechají přesné pozice
  zIndex: 0
  pointerEvents: 'none'
  transformOrigin: 'top right'
  transform: 'scale(var(--hero-scale))'
```

Ruka i karty uvnitř si **beze změny** ponechají své současné `right`/`left`/`top`/`height`.
Protože `inset: 0` vrstva má stejný rozměr jako sekce, `%` i `px` se vyhodnotí identicky
jako dnes – žádné přepočítávání souřadnic.

Transform na vrstvě vytvoří vlastní stacking context; vnitřní `zIndex` karet (−1 za rukou,
2 před rukou) zůstává funkční a karty se `zIndex: -1` už nemohou propadnout za fialové
pozadí stránky.

### 2. Škálovací faktor
```
'--hero-scale': 'clamp(0.66, calc(0.66 + 0.34 * (100vw - 1200px) / 720), 1)'
```
- 1920 px → `1.0` (dnešní vzhled)
- 1200 px → `0.66`
- mezi tím lineárně

`transform-origin: top right` = shluk se smršťuje k pravému hornímu rohu, tedy pryč od
textu vlevo.

### 3. Zúžení textového pruhu
Textový sloupec `maxWidth` z pevných `720` na `fluid(560, 720, 1200, 1920)`:
- 1200 px → `560`
- 1920 px → `720`

Dá telefonu vpravo víc místa přesně v nejtěsnějším bodě.

### 4. Beze změny
- Pod 1200 px naskládaný layout.
- Nad 1920 px vše clampnuté na dnešní hodnoty (scale 1, text 720).
- Fade-in animace karet (vnořený `transform` se s parent scale skládá).

## Ladicí parametry (doladit po vizuální kontrole)
- Spodní scale `0.66`.
- `transform-origin` (alt. `100% 20%`).
- Spodní `maxWidth` textu `560`.

## Známý kompromis
U samotných 1200 px bude telefon výrazně menší a je to nejtěsnější bod – ale bez
překryvu. Kdyby to bylo příliš malé, lze později posunout hranici přepnutí na naskládaný
layout výš (rozhodnutí bylo nechat 1200).

## Testování
- Vizuální kontrola v rozsahu šířek 1200 / 1400 / 1600 / 1920 px: text a telefon se
  nepřekrývají, kompozice se plynule zmenšuje.
- Ověřit, že pod 1200 px je naskládaný layout beze změny.
- Existující testy (`HeroSection` nemá vlastní test, `Header.test.tsx` atd.) musí projít.
