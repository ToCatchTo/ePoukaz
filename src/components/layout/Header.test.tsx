import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import Header from './Header'

test('hlavička zobrazuje navigaci a CTA', () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter><Header /></MemoryRouter>
    </ThemeProvider>,
  )
  expect(screen.getByText('Ceník')).toBeInTheDocument()
  expect(screen.getByText('Kontakt')).toBeInTheDocument()
  expect(screen.getByText('30 dní ZDARMA')).toBeInTheDocument()
})
