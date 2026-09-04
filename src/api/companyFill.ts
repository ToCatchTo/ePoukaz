import type { Company } from './types'

// PSČ do české podoby „XXX XX" (jen u pětimístného číselného kódu, jinak beze změny).
export function formatZip(zip: string | null): string {
  if (zip && /^\d{5}$/.test(zip)) return `${zip.slice(0, 3)} ${zip.slice(3)}`
  return zip ?? ''
}

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

// Druh určuje vykreslení: `logo` jako `contain` (celé, neořezané),
// `photo` (exteriér/interiér) jako `cover` (vyplní rám).
export type CompanyImage = { src: string; kind: 'logo' | 'photo' }

export function companyImages(company: Company): CompanyImage[] {
  const all: { src: string | null; kind: CompanyImage['kind'] }[] = [
    { src: company.logo, kind: 'logo' },
    { src: company.photos.exterior, kind: 'photo' },
    { src: company.photos.interior, kind: 'photo' },
  ]
  return all.filter((img): img is CompanyImage => Boolean(img.src))
}
