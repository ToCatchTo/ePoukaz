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

export function companyImages(company: Company): string[] {
  return [company.logo, company.photos.exterior, company.photos.interior].filter(
    (src): src is string => Boolean(src),
  )
}
