import { useEffect, useState } from 'react'

// Vrací true, až se přednačtou VŠECHNY zadané obrázky (nebo hned, je-li seznam prázdný).
//
// Přednačítá přes `new Image()` a handlery (`onload`/`onerror`) navěsí PŘED nastavením `src`,
// takže se spustí i u obrázků z cache. (Kdybychom spoléhali na `onLoad` přímo na `<img>` v DOM,
// prohlížeč by po refreshi měl obrázky z cache načtené dřív, než React handler navěsí → událost
// by se nezavolala a načítání by se točilo donekonečna.) `img.complete` pokrývá synchronní cache.
//
// `enabled=false` (např. dokud se načítají data z API) drží výsledek na false.
export function useImagesReady(srcs: string[], enabled = true): boolean {
  const key = srcs.join('|')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!enabled) { setReady(false); return }
    const list = key ? key.split('|') : []
    if (list.length === 0) { setReady(true); return } // není na co čekat

    setReady(false)
    let remaining = list.length
    let cancelled = false
    const done = () => { if (!cancelled && --remaining <= 0) setReady(true) }

    list.forEach((src) => {
      const img = new Image()
      let counted = false
      const finish = () => { if (!counted) { counted = true; done() } }
      img.onload = finish
      img.onerror = finish
      img.src = src
      if (img.complete) finish()
    })

    return () => { cancelled = true }
  }, [enabled, key])

  return ready
}
