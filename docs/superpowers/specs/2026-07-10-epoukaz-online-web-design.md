# ePoukaz online — návrh webu (design spec)

**Datum:** 2026-07-10
**Zdroj:** Adobe XD prototyp `epoukazonline_cz` (4 artboardy) + PDF `Epoukazonline_texty.pdf`
**Stav:** odsouhlaseno k sepsání implementačního plánu

---

## 1. Cíl a rozsah

Statický marketingový web služby **ePoukaz online** (digitalizace příjmu a správy elektronických
poukazů pro lékárny, výdejny zdravotnických potřeb a optiky). První verze = věrný převod XD návrhu
do funkčního webu.

**V rozsahu:**
- 4 typy stránek dle XD (homepage, ceník, kontakt, univerzální podstránka)
- Sdílená hlavička a patička, sdílené sekce (CTA banner, formulář „30 dní zdarma", kontaktní blok)
- Pouze **desktop** (šířka návrhu 1920 px), **bez responzivity**

**Mimo rozsah (zatím):**
- Responzivita / mobil
- Reálná aplikace (registrace, administrace poukazů) — v návrhu jen marketingový popis
- Backend, odesílání formulářů, reálné platby
- SEO/SSR

---

## 2. Technologie a konvence

- **Vite + React + TypeScript + MUI**
- **React Router** — 4 cesty (viz §6)
- **Rozvržení přes MUI `Grid`** (explicitní požadavek zadavatele)
- **Centrální MUI theme** (`createTheme`) — barvy, typografie, tvary; hodnoty se netahají natvrdo v komponentách
- **Font:** Poppins (Google Fonts) jako náhrada za Google Sans z návrhu
- **Komentáře v kódu česky**
- **`public/icons`** a **`public/images`** — dvě složky na assety
- Fotky (telefon v ruce, chat-mockup, žena, matfix logo) = zatím **placeholdery** správných rozměrů
- Formuláře = **jen vizuál** (bez validace a odeslání)
- Ikony (šipka v kolečku, fajfky, hvězdy) = **MUI ikony**

### Struktura projektu
```
public/
  icons/
  images/
src/
  main.tsx
  App.tsx                 # Router + layout
  theme/
    theme.ts              # createTheme – barvy, typografie, tvary
  components/
    layout/
      Header.tsx           # plovoucí bílá pill hlavička + navigace + CTA
      Footer.tsx           # patička (logo, firma, 3 sloupce odkazů)
      PageLayout.tsx       # obal: pozadí #4200D8 + <Outlet/> + Footer
    common/
      SectionCard.tsx      # bílá zaoblená karta (obal sekcí)
      WavePattern.tsx      # vzor rybích šupin (tyrkysový)
      CircleArrowButton.tsx# tyrkysové kulaté tlačítko se šipkou
      CtaBanner.tsx        # „A to není vše! …" + tlačítko
      TryForFreeForm.tsx   # „Vyzkoušejte to sami – 30 dní zdarma"
      ContactBlock.tsx     # e-mail, telefon, pole zprávy
      TwoMonthsFreeBanner.tsx # růžový banner „2 měsíce ZDARMA" + fotka
  pages/
    HomePage.tsx
    CenikPage.tsx
    KontaktPage.tsx
    UniPage.tsx            # univerzální šablona podstránky
  data/
    content.ts            # texty (kroky, karty problémů, tarify, odkazy v patičce)
```

---

## 3. Design tokens

### Barvy (přesně z XD)
| Token | Hex | Použití |
|---|---|---|
| `purple` (primary) | `#4200D8` | pozadí stránky, brand, zvýrazněný tarif |
| `teal` (secondary) | `#00C7BF` | akční tlačítka, tarif Premium |
| `yellow` | `#FFE346` | akcenty |
| bílá / černá | `#FFFFFF` / `#000000` | karty, text |
| šedá text | `#5A5A5A`, `#939393` | vedlejší text |
| off-white | `#F5F5F5` | jemné plochy |
| pastely karet | `#C4FFFD` tyrkys · `#F6C9FF` růžová · `#CFBAFF` fialová · `#FFE59F` žlutá · `#FFB1B1` červená · `#B3FCB9` zelená | 6 karet „problémů" |
| banner růžová | `#FDD6DF` | „2 měsíce ZDARMA" |

### Typografie
- Rodina: **Poppins** (400 Regular, 500 Medium, 700 Bold)
- Klíčové velikosti z návrhu: hero 90px/Bold · sekční nadpis 42–50px/Bold · nadpis karty 30px/Bold ·
  krok 26px/Bold · cena 64px/Medium · text 16–20px/Regular · popisky 11–14px

### Tvary
- Tlačítka: **pill** (plně zaoblená), tyrkysová výplň, bílý text; varianta se šipkou v kolečku
- Karty/sekce: bílé, velké zaoblení rohů (~24–32px)
- Inputy: light-purple pill

---

## 4. Sdílené komponenty

- **Header** — plovoucí bílá pill lišta: logo „**ePoukaz**online" (ePoukaz bold, online šedě),
  navigace „Jak to funguje?" / „Ceník" / „Kontakt", vpravo tyrkysová pill „30 dní ZDARMA".
  Aktivní položka fialově.
- **Footer** — bílá zaoblená karta: logo + firemní údaje (epoukazonline s.r.o., Kaprova 42/14,
  Staré Město, 110 00 Praha 1, IČ 29645387, DIČ CZ29645387, C 450020/MSPH), 3 sloupce odkazů
  (Jak na to? / Obecné / Doplňkové služby), copyright „2026, epoukazonline.cz".
  Úplně dole „Tvoříme weby s radostí" + matfix logo (placeholder).
- **WavePattern** — tyrkysový vzor rybích šupin (dekorativní pás pozadí).
- **CtaBanner** — bílá karta: „A to není vše! Přesvědčte se sami a vyzkoušejte na 30 dní ZDARMA"
  (fialový nadpis) + tyrkysové tlačítko „Vyzkoušejte".
- **TryForFreeForm** — nadpis „Vyzkoušejte to sami – 30 dní zdarma" + podtext + 6 polí
  (2 sloupce × 3 řádky, placeholder „*Jméno") + tlačítko „Odeslat". Jen vizuál.
- **ContactBlock** — „info@epoukazonline.cz", „+420 800 000 000", pole „*Email" a
  „*Zanechte nám zprávu a my se vám ozveme".
- **TwoMonthsFreeBanner** — růžová karta „2 měsíce ZDARMA" + podtext + fotka ženy (placeholder).

---

## 5. Obsah stránek

### 5.1 Homepage `/`
1. **Hero** — nadpis „Šetřete čas sobě i pacientům" (90px). Podtext:
   „Digitalizujte příjem a správu elektronických ePoukazů ve svých zdravotnických potřebách,
   lékárně nebo optice. Pacient odešle poukaz online, vy ho během vteřiny vidíte ve svém systému
   – bez telefonátů, papírů a nepříjemných zmatků." Tlačítko „Vyzkoušejte". Vpravo telefon v ruce
   (placeholder) + 3 recenzní bublinky (Eliška – dcera seniora; Gábina – majitelka zdravotnických
   potřeb; Jarmila – seniorka 67 let), každá s 5 hvězdičkami.
2. **Jak to funguje** — bílá karta, vlevo accordion 8 kroků, vpravo tmavý chat-mockup (placeholder).
   Kroky (texty z PDF): Nastavení za pár minut · Pacient nahraje poukaz sám · Poukaz máte hned
   v systému · Přehledná správa stavů · Automatické upozornění pacienta · Klienti pod kontrolou ·
   Kategorie a upomínky na míru · Bezproblémové propojení se SÚKL.
3. **6 problémů, které s námi vyřešíte** — mřížka 3×2 barevných karet (titulek + popis):
   Ušetříte čas · Zpřehledníte si správu · Zorganizujete si vaše klienty · Zbavíte se telefonátů ·
   Propojíme vás se SÚKL · Nezapomenete na vaše klienty.
4. **TryForFreeForm**
5. **CtaBanner**
6. **Footer**

### 5.2 Ceník `/cenik`
1. Nadpis „Vyberte si svůj tarif dle vašich prefenrencí a potřeb" + podtext (30 dní ZDARMA v Pro).
2. **3 tarify:** Start `1 490 Kč` (černá) · Pro `2 490 Kč` (fialová, zvýrazněný) ·
   Premium `3 990 Kč` (tyrkysová). Každý: „MĚSÍČNÍ BALÍČEK BEZ DPH", 4 body
   (ePoukaz online, Správa ePoukazů, Notifikace e-mailem, Security), tlačítko
   (Začněte zdarma / Začněte zdarma / Kontaktovat).
3. **Srovnávací tabulka „Nástroje"** — sloupce Start/Pro/Premium, 14 řádků funkcí s fajfkami
   (Klientské rozhraní … Napojení dopravní společnosti). Přesné řádky a rozložení fajfek dle náhledu.
4. SMS poznámka (bílý text na fialové).
5. **TwoMonthsFreeBanner** → **TryForFreeForm** → **CtaBanner** → **Footer**.

### 5.3 Kontakt `/kontakt`
- **ContactBlock** (e-mail, telefon, pole zprávy) → **Footer**.

### 5.4 Univerzální podstránka `/obchodni-podminky` (UNI šablona)
- Nadpis (dvouřádkový) + dlouhý textový obsah (obchodní podmínky – varianta B).
- **TwoMonthsFreeBanner** → **ContactBlock** → **Footer**.

---

## 6. Routing
| Cesta | Stránka |
|---|---|
| `/` | HomePage |
| `/cenik` | CenikPage |
| `/kontakt` | KontaktPage |
| `/obchodni-podminky` | UniPage (šablona univerzální podstránky) |

Navigace v hlavičce odkazuje na `/` (Jak to funguje – kotva na sekci), `/cenik`, `/kontakt`.

---

## 7. Assety
- **Placeholdery** (barevné bloky správných rozměrů) pro: telefon v ruce (hero), tmavý chat-mockup,
  fotka ženy (banner), matfix logo. Reálné fotky dodá zadavatel do `public/images` později.
- **Ikony** přes MUI: `ArrowForward`/`ArrowForwardIos` (kulaté tlačítko), `Check`/`CheckCircle`
  (tabulka, tarify), `Star` (recenze). Vlastní SVG lze vložit do `public/icons`.
- Vzor rybích šupin: vygenerovaný (SVG/CSS), ne bitmapa.

---

## 8. Otevřené body / poznámky
- Projekt **není** git repozitář — commit spec dokumentu se neprovádí (lze doplnit `git init` na přání).
- Přesné pixel-rozestupy dolaďujeme podle náhledů z XD (960px renders uloženy v pracovních podkladech).
- Overená barva pozadí: `rgb(66,0,216)` = `#4200D8`.
