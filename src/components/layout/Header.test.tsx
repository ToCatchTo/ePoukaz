import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import Header from './Header'
import * as useApi from '../../hooks/useApi'

const renderAt = (path: string) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}><Header /></MemoryRouter>
    </ThemeProvider>,
  )

beforeEach(() => vi.spyOn(useApi, 'usePages').mockReturnValue({ data: null, loading: true, error: null }))

test('na / ukáže pacientskou sadu', () => {
  renderAt('/')
  expect(screen.getAllByText('Jak to funguje?').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Vše o ePoukazu').length).toBeGreaterThan(0)
  expect(screen.queryByText('Ceník')).toBeNull()
})

test('na /pro-vydejny ukáže výdejny sadu (Ceník, Kontakt)', () => {
  renderAt('/pro-vydejny')
  expect(screen.getAllByText('Ceník').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Kontakt').length).toBeGreaterThan(0)
})

test('na /cenik ukáže výdejny sadu', () => {
  renderAt('/cenik')
  expect(screen.getAllByText('Kontakt').length).toBeGreaterThan(0)
})

test('dynamické stránky z API se přidají do pacientské sady', () => {
  vi.spyOn(useApi, 'usePages').mockReturnValue({ data: [{ title: 'O nás', slug: 'o-nas' }], loading: false, error: null })
  renderAt('/')
  const oNas = screen.getAllByText('O nás')
  expect(oNas[0].closest('a')).toHaveAttribute('href', '/stranka/o-nas')
})

test('CTA v zákaznické sadě je „Stáhnout aplikaci"', () => {
  renderAt('/')
  expect(screen.getByText('Stáhnout aplikaci')).toBeInTheDocument()
  // tlačítko „30 dní ZDARMA" (jeden řetězec) se v pacientské sadě nezobrazuje
  expect(screen.queryByText('30 dní ZDARMA')).toBeNull()
})

test('CTA ve výdejny sadě je „30 dní ZDARMA"', () => {
  renderAt('/pro-vydejny')
  expect(screen.getByText('30 dní ZDARMA')).toBeInTheDocument()
  expect(screen.queryByText('Stáhnout aplikaci')).toBeNull()
})

test('hamburger otevře a zavře mobilní menu', () => {
  renderAt('/pro-vydejny')
  fireEvent.click(screen.getByRole('button', { name: 'Otevřít menu' }))
  const dialog = screen.getByRole('dialog', { name: 'Menu' })
  expect(within(dialog).getByText('Ceník')).toBeInTheDocument()
  fireEvent.click(within(dialog).getByRole('button', { name: 'Zavřít menu' }))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
