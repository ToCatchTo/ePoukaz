import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import Header from './Header'

function renderHeader() {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter><Header /></MemoryRouter>
    </ThemeProvider>,
  )
}

test('hlavička zobrazuje navigaci a CTA (desktop)', () => {
  renderHeader()
  // Odkazy jsou v DOM (desktopová navigace + skryté mobilní menu), CTA je jen v desktopové hlavičce
  expect(screen.getAllByText('Ceník').length).toBeGreaterThanOrEqual(1)
  expect(screen.getAllByText('Kontakt').length).toBeGreaterThanOrEqual(1)
  expect(screen.getByText('30 dní ZDARMA')).toBeInTheDocument()
})

test('hamburger otevře mobilní menu a zavírací tlačítko ho zavře', () => {
  renderHeader()
  // Ve výchozím stavu je menu zavřené (dialog není v DOM)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

  // Otevřít
  fireEvent.click(screen.getByRole('button', { name: 'Otevřít menu' }))
  const dialog = screen.getByRole('dialog', { name: 'Menu' })
  expect(dialog).toBeInTheDocument()
  // Odkazy jsou dostupné i v mobilním menu
  expect(within(dialog).getByText('Ceník')).toBeInTheDocument()

  // Zavřít
  fireEvent.click(within(dialog).getByRole('button', { name: 'Zavřít menu' }))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
