// Plynulé (fluid) škálování hodnot mezi mobilem a desktopem pomocí CSS clamp().
// Vrací řetězec `clamp(min, preferred, max)`, kde `preferred` je lineární interpolace
// podle šířky viewportu. Díky tomu text i mezery přechází z mobilního do desktopového
// návrhu plynule, bez skoků na breakpointech.
//
// Referenční viewporty odpovídají XD návrhům: 390 px (mobil) → 1920 px (desktop).
export const VW_MIN = 390
export const VW_MAX = 1920

// fluid(20, 90) → od 20 px na 390px viewportu po 90 px na 1920px viewportu (a mimo tento
// rozsah zůstává na min/max). minVw/maxVw lze přepsat pro užší/širší škálování.
export function fluid(minPx: number, maxPx: number, minVw = VW_MIN, maxVw = VW_MAX): string {
  if (minPx === maxPx) return `${minPx}px`
  const slopeVw = (100 * (maxPx - minPx)) / (maxVw - minVw)
  const interceptPx = minPx - ((maxPx - minPx) * minVw) / (maxVw - minVw)
  const lo = Math.min(minPx, maxPx)
  const hi = Math.max(minPx, maxPx)
  return `clamp(${lo}px, ${interceptPx.toFixed(2)}px + ${slopeVw.toFixed(3)}vw, ${hi}px)`
}

// Plynulé fluid škálování BEZROZMĚRNÉ hodnoty – pro `transform: scale()`.
// `fluid()` výše vrací délku (px+vw), což je v scale() neplatné. CSS navíc neumí dělit
// délku délkou, takže bezrozměrné číslo šířky viewportu získáme trikem
// `tan(atan2(100vw, 1px))` = šířka viewportu v px jako čisté číslo. Z něj lineárně
// interpolujeme scale mezi minS (na minVw) a maxS (na maxVw), na krajích clampnuté.
// fluidScale(0.8, 1, 1536, 1920) → 0.8 na 1536 px, plynule po 1.0 na 1920 px.
export function fluidScale(minS: number, maxS: number, minVw: number, maxVw: number): string {
  if (minS === maxS) return `${minS}`
  const vwNum = 'tan(atan2(100vw, 1px))'
  const lo = Math.min(minS, maxS)
  const hi = Math.max(minS, maxS)
  return `clamp(${lo}, calc(${minS} + ${maxS - minS} * ((${vwNum}) - ${minVw}) / ${maxVw - minVw}), ${hi})`
}

// Plynulá PROCENTNÍ hodnota řízená šířkou viewportu (stejný tan(atan2()) trik jako fluidScale).
// Hodí se pro %-pozice, které mají plynule reagovat na šířku okna (procento se počítá z
// containing blocku, interpolace ale běží podle viewportu).
// fluidPct(29, 39, 1536, 1920) → 29 % na 1536 px, plynule po 39 % na 1920 px.
export function fluidPct(minPct: number, maxPct: number, minVw: number, maxVw: number): string {
  if (minPct === maxPct) return `${minPct}%`
  const vwNum = 'tan(atan2(100vw, 1px))'
  const lo = Math.min(minPct, maxPct)
  const hi = Math.max(minPct, maxPct)
  return `clamp(${lo}%, calc(${minPct}% + ${maxPct - minPct}% * ((${vwNum}) - ${minVw}) / ${maxVw - minVw}), ${hi}%)`
}
