import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import PricingPage from './PricingPage'
import * as useApi from '../hooks/useApi'

const renderPage = () =>
  render(<ThemeProvider theme={theme}><MemoryRouter><PricingPage /></MemoryRouter></ThemeProvider>)

test('ceník zobrazí tarify z API a statickou srovnávací tabulku', () => {
  vi.spyOn(useApi, 'useTariffs').mockReturnValue({
    data: [
      { code: 'lite', label: 'Lite', monthlyPriceCzk: '490.00', annualPriceCzk: '4998.00', features: ['Základní správa kódů'] },
      { code: 'enterprise', label: 'Enterprise', monthlyPriceCzk: null, annualPriceCzk: null, features: ['Vše z Pro'] },
    ],
    loading: false,
    error: null,
  })

  renderPage()

  expect(screen.getByText('Lite')).toBeInTheDocument()
  expect(screen.getByText('490 Kč')).toBeInTheDocument()
  expect(screen.getByText('Cena na dotaz')).toBeInTheDocument()
  expect(screen.getByText('Klientské rozhraní')).toBeInTheDocument()
})

test('ceník padne zpět na statické tarify při chybě/načítání', () => {
  vi.spyOn(useApi, 'useTariffs').mockReturnValue({ data: null, loading: false, error: new Error('x') })
  renderPage()
  expect(screen.getByText('1 490 Kč')).toBeInTheDocument()
})
