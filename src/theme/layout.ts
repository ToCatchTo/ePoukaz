// Rozměry rozvržení odvozené z XD návrhu (desktop 1920 px, mobil 390 px).
// Obsahové karty a sekce jsou 1364 px široké (marže 278 px na 1920).
// Spodní karta CTA + patička je širší – 1640 px (marže 140 px).
import { fluid } from './fluid'

export const CONTENT_W = 1364 // max šířka obsahových sekcí/karet (desktop)
export const WIDE_W = 1640 // max šířka karty CTA + patička (a celého centrovaného sloupce stránky)

// Radiusy karet plynule škálované: na mobilu jemnější zaoblení, na desktopu plné dle XD.
export const CARD_R = fluid(60, 196) // radius velkých bílých karet
export const CARD_R_SM = fluid(50, 76) // radius menších karet (problémy, tarify, banner)
