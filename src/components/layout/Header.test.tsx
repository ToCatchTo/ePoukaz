import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import Header from './Header'
import * as useApi from '../../hooks/useApi'

const renderHeader = () =>
  render(<ThemeProvider theme={theme}><MemoryRouter><Header /></MemoryRouter></ThemeProvider>)

test('Header ukáže statické i dynamické položky z API', () => {
  vi.spyOn(useApi, 'usePages').mockReturnValue({
    data: [{ title: 'O nás', slug: 'o-nas' }],
    loading: false,
    error: null,
  })

  renderHeader()

  expect(screen.getAllByText('Ceník').length).toBeGreaterThan(0)
  const oNas = screen.getAllByText('O nás')
  expect(oNas.length).toBeGreaterThan(0)
  expect(oNas[0].closest('a')).toHaveAttribute('href', '/stranka/o-nas')
})

test('Header bez API dat ukáže jen statické položky', () => {
  vi.spyOn(useApi, 'usePages').mockReturnValue({ data: null, loading: true, error: null })
  renderHeader()
  expect(screen.getAllByText('Kontakt').length).toBeGreaterThan(0)
  expect(screen.queryByText('O nás')).toBeNull()
})

test('hlavička zobrazuje navigaci a CTA (desktop)', () => {
  vi.spyOn(useApi, 'usePages').mockReturnValue({ data: null, loading: true, error: null })
  renderHeader()
  expect(screen.getAllByText('Ceník').length).toBeGreaterThanOrEqual(1)
  expect(screen.getAllByText('Kontakt').length).toBeGreaterThanOrEqual(1)
  expect(screen.getByText('30 dní ZDARMA')).toBeInTheDocument()
})

test('hamburger otevře mobilní menu a zavírací tlačítko ho zavře', () => {
  vi.spyOn(useApi, 'usePages').mockReturnValue({ data: null, loading: true, error: null })
  renderHeader()
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Otevřít menu' }))
  const dialog = screen.getByRole('dialog', { name: 'Menu' })
  expect(dialog).toBeInTheDocument()
  expect(within(dialog).getByText('Ceník')).toBeInTheDocument()
  fireEvent.click(within(dialog).getByRole('button', { name: 'Zavřít menu' }))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
