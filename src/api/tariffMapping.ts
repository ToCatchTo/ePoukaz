import type { Tariff } from './types'
import type { PricingItem, Tier } from '../components/common/PricingCard'

// API vrací 4 kódy, karta má 3 vizuální varianty – přiřazení stylu ke kódu.
const TIER_BY_CODE: Record<string, Tier> = {
  free_trial: 'start',
  lite: 'start',
  pro: 'pro',
  enterprise: 'premium',
}

export function tierForCode(code: string): Tier {
  return TIER_BY_CODE[code] ?? 'start'
}

export function formatPrice(monthly: string | null): string {
  if (monthly == null) return 'Cena na dotaz'
  const n = Math.round(Number(monthly))
  return `${n.toLocaleString('en-US').replace(/,/g, ' ')} Kč`
}

export function tariffToItem(t: Tariff): PricingItem {
  return {
    name: t.label,
    price: formatPrice(t.monthlyPriceCzk),
    note: 'MĚSÍČNÍ BALÍČEK BEZ DPH',
    features: t.features,
    cta: t.monthlyPriceCzk == null ? 'Kontaktovat' : 'Začněte zdarma',
  }
}
