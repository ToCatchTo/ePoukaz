import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import ProVydejnyPage from './ProVydejnyPage'

test('Pro výdejny má hero, kroky a karty problémů', () => {
  render(<ThemeProvider theme={theme}><MemoryRouter><ProVydejnyPage /></MemoryRouter></ThemeProvider>)
  expect(screen.getByText(/Šetřete čas sobě/)).toBeInTheDocument()
  expect(screen.getByText('Nastavení za pár minut')).toBeInTheDocument()
  expect(screen.getByText('Ušetříte čas')).toBeInTheDocument()
})
