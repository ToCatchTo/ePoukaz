// Fluid škálování hodnot mezi mobilem a desktopem přes CSS clamp().
// Vrací `clamp(min, preferred, max)`, kde preferred je lineární interpolace podle šířky
// viewportu – text i mezery tak přechází mezi návrhy plynule, bez skoků na breakpointech.
// Referenční viewporty dle XD: 390 px (mobil) → 1920 px (desktop).
export const VW_MIN = 390
export const VW_MAX = 1920

// fluid(20, 90) → 20 px na 390px viewportu, 90 px na 1920px, mimo rozsah clampnuté.
// minVw/maxVw lze přepsat pro užší/širší škálování.
export function fluid(minPx: number, maxPx: number, minVw = VW_MIN, maxVw = VW_MAX): string {
  if (minPx === maxPx) return `${minPx}px`
  const slopeVw = (100 * (maxPx - minPx)) / (maxVw - minVw)
  const interceptPx = minPx - ((maxPx - minPx) * minVw) / (maxVw - minVw)
  const lo = Math.min(minPx, maxPx)
  const hi = Math.max(minPx, maxPx)
  return `clamp(${lo}px, ${interceptPx.toFixed(2)}px + ${slopeVw.toFixed(3)}vw, ${hi}px)`
}

// Fluid škálování bezrozměrné hodnoty pro `transform: scale()`.
// fluid() vrací délku (px+vw), která je v scale() neplatná, a CSS neumí dělit délku délkou.
// Trik: `tan(atan2(100vw, 1px))` dá šířku viewportu jako čisté číslo, z něhož lineárně
// interpolujeme scale mezi minS (na minVw) a maxS (na maxVw), na krajích clampnuté.
// fluidScale(0.8, 1, 1536, 1920) → 0.8 na 1536 px, 1.0 na 1920 px.
export function fluidScale(minS: number, maxS: number, minVw: number, maxVw: number): string {
  if (minS === maxS) return `${minS}`
  const vwNum = 'tan(atan2(100vw, 1px))'
  const lo = Math.min(minS, maxS)
  const hi = Math.max(minS, maxS)
  return `clamp(${lo}, calc(${minS} + ${maxS - minS} * ((${vwNum}) - ${minVw}) / ${maxVw - minVw}), ${hi})`
}

// Fluid procentní hodnota řízená šířkou viewportu (stejný tan(atan2()) trik jako fluidScale).
// Pro %-pozice reagující na šířku okna: procento se počítá z containing blocku, ale
// interpolace běží podle viewportu.
// fluidPct(29, 39, 1536, 1920) → 29 % na 1536 px, 39 % na 1920 px.
export function fluidPct(minPct: number, maxPct: number, minVw: number, maxVw: number): string {
  if (minPct === maxPct) return `${minPct}%`
  const vwNum = 'tan(atan2(100vw, 1px))'
  const lo = Math.min(minPct, maxPct)
  const hi = Math.max(minPct, maxPct)
  return `clamp(${lo}%, calc(${minPct}% + ${maxPct - minPct}% * ((${vwNum}) - ${minVw}) / ${maxVw - minVw}), ${hi}%)`
}
