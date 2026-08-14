import { useEffect } from 'react'

const BRAND = 'ePoukaz online'

// Nastaví <title> stránky. Každá stránka ho volá se svým názvem; výsledek je
// „Název | ePoukaz online". Bez názvu (nebo dokud se nenačte) zůstane jen brand
// „ePoukaz online" (to je i výchozí titulek pro domovskou stránku).
export function useDocumentTitle(pageTitle?: string) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${BRAND}` : BRAND
  }, [pageTitle])
}
