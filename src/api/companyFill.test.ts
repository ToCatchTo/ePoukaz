import { formatAddress, orderUrl, fillPlaceholders, companyImages } from './companyFill'
import type { Company } from './types'

const company: Company = {
  name: 'Lékárna Pod Věží',
  billingIco: '87654321',
  address: { street: 'Hlavní 42', city: 'Praha', zip: '11000' },
  logo: 'https://x/logo.webp',
  photos: { exterior: 'https://x/ext.jpg', interior: null },
  publicHash: '0698b3c8bfc2',
}

test('formatAddress skládá jen neprázdné části', () => {
  expect(formatAddress(company.address)).toBe('Hlavní 42, Praha 11000')
  expect(formatAddress({ street: null, city: 'Brno', zip: null })).toBe('Brno')
  expect(formatAddress({ street: null, city: null, zip: null })).toBe('')
})

test('orderUrl složí odkaz z publicHash', () => {
  expect(orderUrl('abc')).toBe('https://app.epoukazonline.cz/c/abc')
})

test('fillPlaceholders nahradí tokeny', () => {
  expect(fillPlaceholders('a {{x}} b {{y}}', { x: '1', y: '2' })).toBe('a 1 b 2')
})

test('companyImages vrátí jen neprázdné obrázky (logo, exteriér, interiér)', () => {
  expect(companyImages(company)).toEqual(['https://x/logo.webp', 'https://x/ext.jpg'])
})
