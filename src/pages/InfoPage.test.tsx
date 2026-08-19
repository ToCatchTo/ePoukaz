import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import InfoPage from './InfoPage'
import { HOW_IT_WORKS, ABOUT_EPOUKAZ } from '../data/content'

const wrap = (data: typeof HOW_IT_WORKS) =>
  render(<ThemeProvider theme={theme}><MemoryRouter><InfoPage data={data} /></MemoryRouter></ThemeProvider>)

test('Jak to funguje: nadpis a první krok', () => {
  wrap(HOW_IT_WORKS)
  expect(screen.getByRole('heading', { name: 'Jak to funguje?' })).toBeInTheDocument()
  expect(screen.getAllByText('Krok 1 - Najděte svou výdejnu').length).toBeGreaterThan(0)
})

test('Vše o ePoukazu: nadpis a první položka', () => {
  wrap(ABOUT_EPOUKAZ)
  expect(screen.getByRole('heading', { name: 'Vše o ePoukazu' })).toBeInTheDocument()
  expect(screen.getAllByText('Co je ePoukaz?').length).toBeGreaterThan(0)
})
