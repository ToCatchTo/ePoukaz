// Rozměry rozvržení dle XD (desktop 1920 px, mobil 390 px).
import { fluid } from './fluid'

export const CONTENT_W = 1364 // max šířka obsahových sekcí/karet (marže 278 px na 1920)
export const WIDE_W = 1640 // max šířka karty CTA + patičky a centrovaného sloupce stránky (marže 140 px)

// Šířka, od které je hero „vedle sebe" (text vlevo, kompozice vpravo); pod ní se kompozice
// skládá pod nadpis. Vlastní media query (ne theme xl), aby se nedotkla `xl` jinde. Na této
// hranici se zapíná i dekorační pás vlnitých čar a mezera před sekcí „Jak to funguje"
// (viz HomePage), aby ruka nenarážela do další sekce.
export const HERO_SPLIT = 900
export const SPLIT_UP = `@media (min-width:${HERO_SPLIT}px)`

// Radiusy karet fluid škálované: na mobilu jemnější, na desktopu plné dle XD.
export const CARD_R = fluid(60, 196) // velké bílé karty
export const CARD_R_SM = fluid(50, 76) // menší karty (problémy, tarify, banner)
