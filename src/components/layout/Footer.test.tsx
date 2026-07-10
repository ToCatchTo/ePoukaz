import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import Footer from './Footer'

test('patička zobrazuje firmu a sloupce', () => {
  render(<ThemeProvider theme={theme}><Footer /></ThemeProvider>)
  expect(screen.getByText('epoukazonline s.r.o.')).toBeInTheDocument()
  expect(screen.getByText('Jak na to?')).toBeInTheDocument()
  expect(screen.getByText('Doplňkové služby')).toBeInTheDocument()
})

test('s withCta zobrazuje patička i CTA blok', () => {
  render(<ThemeProvider theme={theme}><Footer withCta /></ThemeProvider>)
  expect(screen.getByText(/A to není vše/)).toBeInTheDocument()
  expect(screen.getByText('Vyzkoušejte')).toBeInTheDocument()
})
