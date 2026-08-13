import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import InfoPage from './InfoPage'
import { JAK_TO_FUNGUJE, VSE_O_EPOUKAZU } from '../data/content'

const wrap = (data: typeof JAK_TO_FUNGUJE) =>
  render(<ThemeProvider theme={theme}><MemoryRouter><InfoPage data={data} /></MemoryRouter></ThemeProvider>)

test('Jak to funguje: nadpis a první krok', () => {
  wrap(JAK_TO_FUNGUJE)
  expect(screen.getByRole('heading', { name: 'Jak to funguje?' })).toBeInTheDocument()
  expect(screen.getAllByText('1. Vyberete svou výdejnu').length).toBeGreaterThan(0)
})

test('Vše o ePoukazu: nadpis a první položka', () => {
  wrap(VSE_O_EPOUKAZU)
  expect(screen.getByRole('heading', { name: 'Vše o ePoukazu' })).toBeInTheDocument()
  expect(screen.getAllByText('Co je ePoukaz?').length).toBeGreaterThan(0)
})
