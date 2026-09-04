import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import DistributorCtaFooter from './DistributorCtaFooter'

const wrap = () =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter><DistributorCtaFooter /></MemoryRouter>
    </ThemeProvider>,
  )

test('zobrazí CTA nadpis, provozovatele a tlačítko mířící na /vydejna', () => {
  wrap()
  expect(screen.getByText('Jste výdejna ePoukazů?')).toBeInTheDocument()
  expect(screen.getByText(/Provozovatel: epoukazonline s.r.o./)).toBeInTheDocument()
  const btn = screen.getByRole('link', { name: /Zóna pro výdejny/ })
  expect(btn).toHaveAttribute('href', '/vydejna')
})
