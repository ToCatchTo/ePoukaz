import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router ve výchozím stavu při změně cesty zachová scroll pozici. Tato komponenta
// posune okno na začátek nové stránky; pokud cesta obsahuje kotvu (#hash), místo toho
// plynule odscrolluje na daný prvek.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Prvek nemusí být hned po změně cesty vykreslený, počkáme na další snímek.
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
