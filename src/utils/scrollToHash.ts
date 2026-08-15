// React Router při kliknutí na odkaz s kotvou (např. „/#jak-to-funguje") změní URL,
// ale neodscrolluje. Cross-page přechody řeší ScrollToTop; tento handler řeší klik,
// když už jsme na cílové stránce – včetně opakovaného kliku, kdy je hash už nastavený,
// takže se location nezmění a efekt by se nespustil.
export function scrollToHashOnClick(to: string, currentPathname: string) {
  const hashIndex = to.indexOf('#')
  if (hashIndex === -1) return
  const targetPath = to.slice(0, hashIndex) || '/'
  if (targetPath !== currentPathname) return // jiná stránka – vyřeší ScrollToTop po přechodu
  const id = decodeURIComponent(to.slice(hashIndex + 1))
  const el = document.getElementById(id)
  if (el) {
    requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
}
