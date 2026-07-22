import type { Company } from './types'

export function formatAddress(address: Company['address']): string {
  const cityZip = [address.city, address.zip].filter(Boolean).join(' ')
  return [address.street, cityZip].filter(Boolean).join(', ')
}

export function orderUrl(publicHash: string): string {
  return `https://app.epoukazonline.cz/c/${publicHash}`
}

export function fillPlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_m, key: string) => values[key] ?? '')
}

// Obrázek provozovny + jeho druh. `logo` se vykresluje `contain` (celé, neořezané),
// `photo` (exteriér/interiér) `cover` (vyplní rám).
export type CompanyImage = { src: string; kind: 'logo' | 'photo' }

export function companyImages(company: Company): CompanyImage[] {
  const all: { src: string | null; kind: CompanyImage['kind'] }[] = [
    { src: company.logo, kind: 'logo' },
    { src: company.photos.exterior, kind: 'photo' },
    { src: company.photos.interior, kind: 'photo' },
  ]
  return all.filter((img): img is CompanyImage => Boolean(img.src))
}
