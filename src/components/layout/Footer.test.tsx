import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import Footer from './Footer'

const wrap = (ui: React.ReactNode) => (
  <ThemeProvider theme={theme}><MemoryRouter>{ui}</MemoryRouter></ThemeProvider>
)

test('patička zobrazuje firmu a sloupce', () => {
  render(wrap(<Footer />))
  expect(screen.getByText('epoukazonline s.r.o.')).toBeInTheDocument()
  expect(screen.getByText('Jak na to?')).toBeInTheDocument()
  expect(screen.getByText('Doplňkové služby')).toBeInTheDocument()
})

test('odkazy ve sloupcích vedou na podstránku', () => {
  render(wrap(<Footer />))
  expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '/faq')
})

test('s withCta zobrazuje patička i CTA blok', () => {
  render(wrap(<Footer withCta />))
  expect(screen.getByText(/A to není vše/)).toBeInTheDocument()
  expect(screen.getByText('Vyzkoušejte')).toBeInTheDocument()
})
