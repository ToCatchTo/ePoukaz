import { useEffect, useState } from 'react'

// Vrací true, až se přednačtou všechny zadané obrázky (nebo ihned, je-li seznam prázdný).
//
// Přednačítá přes `new Image()`; handlery se navěšují před nastavením `src`, aby se spustily
// i u obrázků z cache. Kontrola `img.complete` pokrývá synchronní cache. Spoléhat na `onLoad`
// přímo na `<img>` v DOM nelze – u obrázků z cache se událost může spustit dřív, než React
// handler navěsí, a načítání by nikdy neskončilo.
//
// enabled=false (např. dokud se načítají data z API) drží výsledek na false.
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
