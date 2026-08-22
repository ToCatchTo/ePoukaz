import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import Footer from './Footer'
import * as useApi from '../../hooks/useApi'

const renderFooter = (props?: { withCta?: boolean }) =>
  render(<ThemeProvider theme={theme}><MemoryRouter><Footer {...props} /></MemoryRouter></ThemeProvider>)

beforeEach(() => {
  vi.spyOn(useApi, 'usePages').mockReturnValue({ data: null, loading: true, error: null })
})

// Obsah sloupce = nejbližší Grid item kolem jeho nadpisu.
const column = (title: string) => within(screen.getByText(title).closest('.MuiGrid-root') as HTMLElement)

test('Footer rozdělí podstránky z API do sloupců podle slugu', () => {
  vi.spyOn(useApi, 'usePages').mockReturnValue({
    data: [
      { title: 'Jak nastavit SÚKL', slug: 'jak-nastavit-sukl' },
      { title: 'Obchodní podmínky', slug: 'obchodni-podminky' },
      { title: 'Cookies', slug: 'cookies' },
      { title: 'Tvorba webu se SLEVOU', slug: 'tvorba-webu-se-slevou' },
    ],
    loading: false,
    error: null,
  })
  renderFooter()

  // „Jak na to?" → jen slug jak-*
  const jak = column('Jak na to?').getByText('Jak nastavit SÚKL')
  expect(jak.closest('a')).toHaveAttribute('href', '/stranka/jak-nastavit-sukl')

  // „Obecné" → právní stránky (natvrdo dle slugu)
  expect(column('Obecné').getByText('Obchodní podmínky')).toBeInTheDocument()
  expect(column('Obecné').getByText('Cookies')).toBeInTheDocument()

  // „Doplňkové služby" → všechny ostatní
  const other = column('Doplňkové služby').getByText('Tvorba webu se SLEVOU')
  expect(other.closest('a')).toHaveAttribute('href', '/stranka/tvorba-webu-se-slevou')
})

test('Footer bez dat z API ukáže statické odkazy Doplňkových služeb', () => {
  renderFooter()
  expect(screen.getByText('Tvorba webu se SLEVOU')).toBeInTheDocument()
})

test('patička zobrazuje firmu a sloupce', () => {
  renderFooter()
  expect(screen.getByText('epoukazonline s.r.o.')).toBeInTheDocument()
  expect(screen.getByText('Jak na to?')).toBeInTheDocument()
  expect(screen.getByText('Doplňkové služby')).toBeInTheDocument()
})

test('odkazy ve sloupcích vedou na podstránku', () => {
  renderFooter()
  expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '/faq')
})

test('s withCta zobrazuje patička i CTA blok', () => {
  renderFooter({ withCta: true })
  expect(screen.getByText(/přesvědčte se sami/)).toBeInTheDocument()
  expect(screen.getByText('Vyzkoušejte')).toBeInTheDocument()
})
