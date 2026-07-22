import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import Footer from './Footer'
import * as useApi from '../../hooks/useApi'

const renderFooter = () =>
  render(<ThemeProvider theme={theme}><MemoryRouter><Footer /></MemoryRouter></ThemeProvider>)

const company = {
  name: 'Lékárna Pod Věží',
  billingIco: '87654321',
  address: { street: 'Hlavní 42', city: 'Praha', zip: '11000' },
  logo: null,
  photos: { exterior: null, interior: null },
  publicHash: '0698b3c8bfc2',
}

test('Footer vypíše provozovny jako odkazy na /provozovna/{hash}', () => {
  vi.spyOn(useApi, 'useCompanies').mockReturnValue({ data: [company], loading: false, error: null })
  renderFooter()
  const link = screen.getByText('Lékárna Pod Věží')
  expect(link.closest('a')).toHaveAttribute('href', '/provozovna/0698b3c8bfc2')
})

test('Footer bez provozoven ukáže statické odkazy Doplňkových služeb', () => {
  vi.spyOn(useApi, 'useCompanies').mockReturnValue({ data: null, loading: true, error: null })
  renderFooter()
  expect(screen.getByText('Tvorba webu se SLEVOU')).toBeInTheDocument()
})
