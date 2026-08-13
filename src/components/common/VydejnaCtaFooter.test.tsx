import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import VydejnaCtaFooter from './VydejnaCtaFooter'

const wrap = () =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter><VydejnaCtaFooter /></MemoryRouter>
    </ThemeProvider>,
  )

test('zobrazí CTA nadpis, provozovatele a tlačítko mířící na /pro-vydejny', () => {
  wrap()
  expect(screen.getByText('Jste výdejna ePoukazů?')).toBeInTheDocument()
  expect(screen.getByText(/Provozovatel: epoukazonline s.r.o./)).toBeInTheDocument()
  const btn = screen.getByRole('link', { name: /Zóna pro výdejny/ })
  expect(btn).toHaveAttribute('href', '/pro-vydejny')
})
