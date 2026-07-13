import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import ContentPage from './ContentPage'

test('UNI stránka má nadpis a text', () => {
  render(<ThemeProvider theme={theme}><MemoryRouter><ContentPage /></MemoryRouter></ThemeProvider>)
  expect(screen.getByText(/Nadpis univerzální podstránky/)).toBeInTheDocument()
  expect(screen.getByText(/OBCHODNÍ PODMÍNKY/)).toBeInTheDocument()
})
