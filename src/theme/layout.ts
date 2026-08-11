// Rozměry rozvržení odvozené z XD návrhu (desktop 1920 px, mobil 390 px).
// Obsahové karty a sekce jsou 1364 px široké (marže 278 px na 1920).
// Spodní karta CTA + patička je širší – 1640 px (marže 140 px).
import { fluid } from './fluid'

export const CONTENT_W = 1364 // max šířka obsahových sekcí/karet (desktop)
export const WIDE_W = 1640 // max šířka karty CTA + patička (a celého centrovaného sloupce stránky)

// Šířka (px), od které je hero „vedle sebe" (text vlevo + kompozice vpravo). Pod ní se
// kompozice skládá POD nadpis. Sníženo z 1536 (theme xl) na 1280 – vlastní media query,
// aby to neovlivnilo `xl` jinde. Na TÉTO hranici se zároveň zapíná dekorační pás vlnitých čar
// a mezera před sekcí „Jak to funguje" (viz HomePage), aby ruka nenarážela do další sekce.
export const HERO_SPLIT = 1280
export const SPLIT_UP = `@media (min-width:${HERO_SPLIT}px)`

// Radiusy karet plynule škálované: na mobilu jemnější zaoblení, na desktopu plné dle XD.
export const CARD_R = fluid(60, 196) // radius velkých bílých karet
export const CARD_R_SM = fluid(50, 76) // radius menších karet (problémy, tarify, banner)
