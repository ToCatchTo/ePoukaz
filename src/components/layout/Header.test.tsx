import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import Header from './Header'

const renderAt = (path: string) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}><Header /></MemoryRouter>
    </ThemeProvider>,
  )

test('na / ukáže pacientskou sadu', () => {
  renderAt('/')
  expect(screen.getAllByText('Jak to funguje?').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Vše o ePoukazu').length).toBeGreaterThan(0)
  expect(screen.queryByText('Ceník')).toBeNull()
})

test('na /vydejna ukáže výdejny sadu (Ceník, Kontakt)', () => {
  renderAt('/vydejna')
  expect(screen.getAllByText('Ceník').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Kontakt').length).toBeGreaterThan(0)
})

test('na /cenik ukáže výdejny sadu', () => {
  renderAt('/cenik')
  expect(screen.getAllByText('Kontakt').length).toBeGreaterThan(0)
})

test('zákaznická sada nemá v pill CTA tlačítko', () => {
  renderAt('/')
  // V pacientské sekci se v pill nezobrazuje žádné CTA tlačítko (dříve „Stáhnout aplikaci")
  expect(screen.queryByText('Stáhnout aplikaci')).toBeNull()
})

test('CTA ve výdejny sadě je „30 dní ZDARMA"', () => {
  renderAt('/vydejna')
  expect(screen.getByText('30 dní ZDARMA')).toBeInTheDocument()
  expect(screen.queryByText('Stáhnout aplikaci')).toBeNull()
})

test('hamburger otevře a zavře mobilní menu', () => {
  renderAt('/vydejna')
  fireEvent.click(screen.getByRole('button', { name: 'Otevřít menu' }))
  const dialog = screen.getByRole('dialog', { name: 'Menu' })
  expect(dialog).not.toHaveAttribute('inert') // otevřené menu je interaktivní
  expect(within(dialog).getByText('Ceník')).toBeInTheDocument()
  fireEvent.click(within(dialog).getByRole('button', { name: 'Zavřít menu' }))
  expect(dialog).toHaveAttribute('inert') // zavřené menu je inertní (skryté pro AT, bez focusu)
})
