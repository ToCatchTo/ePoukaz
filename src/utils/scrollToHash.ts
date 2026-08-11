// Odkaz typu „/#jak-to-funguje" v navigaci: React Router při kliknutí sice změní URL,
// ale sám neodscrolluje na kotvu. O cross-page přechody se stará ScrollToTop; tento
// handler řeší klik, když už JSME na cílové stránce – včetně opakovaného kliku, kdy je
// hash v URL už nastavený, takže se žádná změna location neemituje a efekt by se nespustil.
export function scrollToHashOnClick(to: string, currentPathname: string) {
  const hashIndex = to.indexOf('#')
  if (hashIndex === -1) return
  const targetPath = to.slice(0, hashIndex) || '/'
  if (targetPath !== currentPathname) return // jiná stránka – doscrolluje ScrollToTop po přechodu
  const id = decodeURIComponent(to.slice(hashIndex + 1))
  const el = document.getElementById(id)
  if (el) {
    requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
}
