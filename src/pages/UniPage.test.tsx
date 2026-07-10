import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import UniPage from './UniPage'

test('UNI stránka má nadpis a text', () => {
  render(<ThemeProvider theme={theme}><UniPage /></ThemeProvider>)
  expect(screen.getByText(/Nadpis univerzální podstránky/)).toBeInTheDocument()
  expect(screen.getByText(/OBCHODNÍ PODMÍNKY/)).toBeInTheDocument()
})
