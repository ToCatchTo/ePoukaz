import { useEffect } from 'react'

const BRAND = 'ePoukaz online'

// Nastaví <title> ve tvaru „Název | ePoukaz online". Bez názvu (nebo dokud se
// nenačte) zůstane jen brand „ePoukaz online" (výchozí titulek domovské stránky).
export function useDocumentTitle(pageTitle?: string) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${BRAND}` : BRAND
  }, [pageTitle])
}
