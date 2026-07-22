import { formatPrice, tierForCode, tariffToItem } from './tariffMapping'
import type { Tariff } from './types'

test('formatPrice: měsíční cena se skupinami tisíců a Kč', () => {
  expect(formatPrice('490.00')).toBe('490 Kč')
  expect(formatPrice('10098.00')).toBe('10 098 Kč')
})

test('formatPrice: null → Cena na dotaz', () => {
  expect(formatPrice(null)).toBe('Cena na dotaz')
})

test('tierForCode: mapuje kódy na vizuální tier, neznámý → start', () => {
  expect(tierForCode('pro')).toBe('pro')
  expect(tierForCode('enterprise')).toBe('premium')
  expect(tierForCode('cokoliv')).toBe('start')
})

test('tariffToItem: null cena dá CTA Kontaktovat', () => {
  const t: Tariff = { code: 'enterprise', label: 'Enterprise', monthlyPriceCzk: null, annualPriceCzk: null, features: ['Vše z Pro'] }
  const item = tariffToItem(t)
  expect(item.name).toBe('Enterprise')
  expect(item.price).toBe('Cena na dotaz')
  expect(item.cta).toBe('Kontaktovat')
  expect(item.features).toEqual(['Vše z Pro'])
})
