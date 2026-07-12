import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import PricingCard from './PricingCard'

const wrap = (ui: React.ReactNode) => <ThemeProvider theme={theme}>{ui}</ThemeProvider>

const ITEM = {
  name: 'Pro',
  price: '2 490 Kč',
  note: 'MĚSÍČNÍ BALÍČEK BEZ DPH',
  features: ['ePoukaz online', 'Správa ePoukazů', 'Notifikace e-mailem', 'Security'],
  cta: 'Začněte zdarma',
}

test('zobrazuje název, cenu, poznámku, CTA a všechny vlastnosti', () => {
  render(wrap(<PricingCard item={ITEM} tier="pro" elevated />))

  expect(screen.getByText('Pro')).toBeInTheDocument()
  expect(screen.getByText('2 490 Kč')).toBeInTheDocument()
  expect(screen.getByText('MĚSÍČNÍ BALÍČEK BEZ DPH')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Začněte zdarma' })).toBeInTheDocument()
  for (const f of ITEM.features) {
    expect(screen.getByText(f)).toBeInTheDocument()
  }
})

test('používá lodičku a fajfku odpovídající tarifu', () => {
  const { container } = render(wrap(<PricingCard item={ITEM} tier="premium" />))
  // dekorativní ikony jsou aria-hidden <img> – ověříme přes src
  const imgs = Array.from(container.querySelectorAll('img')).map((i) => i.getAttribute('src'))
  expect(imgs).toContain('/icons/Ship_premium.svg')
  expect(imgs).toContain('/icons/Check_premium.svg')
})
