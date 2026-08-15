const BRAND = 'ePoukaz online'
const ORIGIN = 'https://epoukazonline.cz'

// SEO hlavička stránky přes nativní document metadata Reactu 19 (title/meta/link
// se automaticky přesunou do <head>, v CSR i při SSG). Nahrazuje useDocumentTitle.
export function Seo({
  title, description, path, ogImage = '/og-image.png',
}: { title?: string; description: string; path: string; ogImage?: string }) {
  const fullTitle = title ? `${title} | ${BRAND}` : BRAND
  const url = ORIGIN + path
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ORIGIN + ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  )
}
