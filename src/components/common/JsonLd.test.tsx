import { render } from '@testing-library/react'
import { test, expect } from 'vitest'
import { JsonLd } from './JsonLd'

test('vloží validní JSON-LD script', () => {
  const { container } = render(<JsonLd data={{ '@type': 'Organization', name: 'X' }} />)
  const script = container.querySelector('script[type="application/ld+json"]')
  expect(script).not.toBeNull()
  expect(JSON.parse(script!.textContent!)).toMatchObject({ '@type': 'Organization', name: 'X' })
})
