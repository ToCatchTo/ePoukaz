// Vloží strukturovaná data (schema.org) jako JSON-LD script. `@context` doplní automaticky.
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify({ '@context': 'https://schema.org', ...data })
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
