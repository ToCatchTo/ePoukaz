import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Po prokliku na jinou stránku React Router ve výchozím stavu zachová scroll pozici,
// takže uživatel „spadne" doprostřed nové stránky. Tato komponenta posune okno vždy
// na začátek nové stránky – POKUD ale cesta obsahuje kotvu (#hash), místo toho plynule
// odscrolluje na daný prvek (např. „Jak to funguje?" v navigaci → box na HP).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Prvek nemusí být hned po změně cesty vykreslený – počkáme na další snímek.
      const id = decodeURIComponent(hash.slice(1))
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        window.scrollTo(0, 0)
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
