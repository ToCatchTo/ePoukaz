import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Po prokliku na jinou stránku React Router ve výchozím stavu zachová scroll pozici,
// takže uživatel „spadne" doprostřed nové stránky. Tato komponenta posune okno vždy
// na začátek nové stránky. Klíčuje na pathname, aby vnitřní kotvy (#hash) nebyly rušeny.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
