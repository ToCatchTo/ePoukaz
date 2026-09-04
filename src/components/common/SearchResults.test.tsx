import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import SearchResults from './SearchResults'
import type { Company } from '../../api/types'

const wrap = (ui: React.ReactNode) =>
  render(<ThemeProvider theme={theme}><MemoryRouter>{ui}</MemoryRouter></ThemeProvider>)
const company = (name: string): Company => ({
  name, billingIco: '1', address: { street: 'Ulice 1', city: 'Brno', zip: '600 00' },
  logo: null, photos: { exterior: null, interior: null }, publicHash: 'abc',
})

test('loading ukáže spinner', () => {
  wrap(<SearchResults loading error={null} companies={[]} />)
  expect(screen.getByLabelText('Načítání')).toBeInTheDocument()
})

test('výsledky vykreslí řádky a Vybrat míří na order flow', () => {
  wrap(<SearchResults loading={false} error={null} companies={[company('Lékárna U lva')]} />)
  expect(screen.getByText('Lékárna U lva')).toBeInTheDocument()
  const selectLink = screen.getByRole('link', { name: 'Vybrat' })
  expect(selectLink).toHaveAttribute('href', 'https://app.epoukazonline.cz/c/abc')
  expect(selectLink).toHaveAttribute('target', '_blank')
  expect(selectLink).toHaveAttribute('rel', expect.stringContaining('noopener'))
})

test('každý výsledek má odkaz „detail" na /provozovna/:hash', () => {
  wrap(<SearchResults loading={false} error={null} companies={[company('Lékárna U lva')]} />)
  const detail = screen.getByRole('link', { name: 'detail' })
  expect(detail).toHaveAttribute('href', '/provozovna/abc')
})

test('prázdný výsledek ukáže „Nic jsme nenašli"', () => {
  wrap(<SearchResults loading={false} error={null} companies={[]} />)
  expect(screen.getByText('Nic jsme nenašli')).toBeInTheDocument()
  expect(screen.getByText('Vaši výdejnu jsme nenašli?')).toBeInTheDocument()
})
