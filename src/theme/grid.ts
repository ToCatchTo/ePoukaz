// ---------------------------------------------------------------------------
// GRID SYSTEM (dle XD layout gridu) – konstanty
// ---------------------------------------------------------------------------
// Tři breakpointové úrovně mapované na výchozí MUI klíče:
//   • mobil   = xs (0–599)        → 4 sloupce,  gutter 10 px, boční margin 36 px (přesně XD)
//   • tablet  = sm/md (600–1199)  → 8 sloupců,  gutter 12 px
//   • desktop = lg/xl (1200+)     → 12 sloupců, gutter 16 px
// Responzivní hodnoty se proto píší jako { xs: mobil, sm: tablet, lg: desktop }.
export const GRID_COLUMNS = { xs: 4, sm: 8, lg: 12 } as const
export const GRID_GUTTER = { xs: '10px', sm: '12px', lg: '16px' } as const

// Obsahová oblast se zastropuje na 1640 px (12 sloupců na 1920 dle XD). Nad tuto šířku
// zůstává obsah 1640 px na středu a boční okraje jen rostou.
export const GRID_MAX = 1640

// Boční okraj stránky = ŠÍŘKA JEDNOHO GRID SLOUPCE, spočtená tak, aby se plynule škálovala
// s obrazovkou (calc odpovídá přesně jednomu sloupci daného breakpointu):
//   desktop: 12 obsahových + 2 marginové sloupce, 11 gutterů × 16 px = 176 px  → (100vw − 176) / 14
//   tablet:   8 obsahových + 2 marginové sloupce,  7 gutterů × 12 px =  84 px  → (100vw − 84)  / 10
//   mobil:   36 px dle XD na 390 px. Obsah = 4 sloupce × 72 px + 3 guttery × 10 px = 318 px.
//            Nad 390 px drží 36 px (obsah roste), pod 390 px se okraj plynule zmenšuje, aby se
//            mobilní grid (318 px) vešel i na užší telefony a nic nepřetékalo (dole floor 16 px).
// Díky tomu má KAŽDÁ komponenta na bocích minimálně jeden marginový sloupec.
export const PAGE_PX = {
  xs: 'clamp(8px, calc((100vw - 318px) / 2), 36px)',
  sm: 'calc((100vw - 84px) / 10)',
  lg: 'calc((100vw - 176px) / 14)',
} as const

// Rozsahy (size/offset) komponent v gridu:
//   wide    = celá obsahová oblast (12 sloupců) – karta CTA + patička (na 1920 = 1640 px, margin 1 sloupec)
//   content = odsazení o 1 sloupec navíc na desktopu (10 sloupců) – header, hero, jak-to-funguje
//             (na 1920 = 1364 px, margin 2 sloupce; na tabletu/mobilu plná šířka oblasti)
export const GRID_SPANS = {
  wide: { size: { xs: 4, sm: 8, lg: 12 }, offset: { xs: 0, sm: 0, lg: 0 } },
  content: { size: { xs: 4, sm: 8, lg: 10 }, offset: { xs: 0, sm: 0, lg: 1 } },
} as const
