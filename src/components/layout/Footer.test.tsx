import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import Footer from './Footer'
import * as useApi from '../../hooks/useApi'

const renderFooter = (props?: { withCta?: boolean }) =>
  render(<ThemeProvider theme={theme}><MemoryRouter><Footer {...props} /></MemoryRouter></ThemeProvider>)

const company = {
  name: 'Lékárna Pod Věží',
  billingIco: '87654321',
  address: { street: 'Hlavní 42', city: 'Praha', zip: '11000' },
  logo: null,
  photos: { exterior: null, interior: null },
  publicHash: '0698b3c8bfc2',
}

beforeEach(() => {
  vi.spyOn(useApi, 'useCompanies').mockReturnValue({ data: null, loading: true, error: null })
  vi.spyOn(useApi, 'usePages').mockReturnValue({ data: null, loading: true, error: null })
})

test('Footer v „Jak na to?" vypíše podstránky z API jako odkazy na /stranka/{slug}', () => {
  vi.spyOn(useApi, 'usePages').mockReturnValue({ data: [{ title: 'O nás', slug: 'o-nas' }], loading: false, error: null })
  renderFooter()
  const link = screen.getByText('O nás')
  expect(link.closest('a')).toHaveAttribute('href', '/stranka/o-nas')
})

test('Footer vypíše provozovny jako odkazy na /provozovna/{hash}', () => {
  vi.spyOn(useApi, 'useCompanies').mockReturnValue({ data: [company], loading: false, error: null })
  renderFooter()
  const link = screen.getByText('Lékárna Pod Věží')
  expect(link.closest('a')).toHaveAttribute('href', '/provozovna/0698b3c8bfc2')
})

test('Footer bez provozoven ukáže statické odkazy Doplňkových služeb', () => {
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
  expect(screen.getByText(/A to není vše/)).toBeInTheDocument()
  expect(screen.getByText('Vyzkoušejte')).toBeInTheDocument()
})
