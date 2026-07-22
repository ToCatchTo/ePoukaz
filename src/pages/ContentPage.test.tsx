import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import ContentPage from './ContentPage'
import * as useApi from '../hooks/useApi'

const company = {
  name: 'Lékárna Pod Věží',
  billingIco: '87654321',
  address: { street: 'Hlavní 42', city: 'Praha', zip: '11000' },
  logo: null,
  photos: { exterior: null, interior: null },
  publicHash: '0698b3c8bfc2',
}

test('UNI stránka bez provozovny má nadpis a text (placeholdery prázdné)', () => {
  vi.spyOn(useApi, 'useCompanies').mockReturnValue({ data: null, loading: false, error: null })
  render(<ThemeProvider theme={theme}><MemoryRouter><ContentPage /></MemoryRouter></ThemeProvider>)
  expect(screen.getByText(/Nadpis univerzální podstránky/)).toBeInTheDocument()
  expect(screen.getByText(/OBCHODNÍ PODMÍNKY/)).toBeInTheDocument()
})

test('Na /provozovna/:hash doplní údaje provozovny do textu', () => {
  vi.spyOn(useApi, 'useCompanies').mockReturnValue({ data: [company], loading: false, error: null })
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/provozovna/0698b3c8bfc2']}>
        <Routes><Route path="/provozovna/:publicHash" element={<ContentPage />} /></Routes>
      </MemoryRouter>
    </ThemeProvider>,
  )
  const uni = within(screen.getByTestId('page-uni'))
  expect(uni.getAllByText(/Lékárna Pod Věží/).length).toBeGreaterThan(0)
  expect(uni.getAllByText(/Hlavní 42, Praha 11000/).length).toBeGreaterThan(0)
})
