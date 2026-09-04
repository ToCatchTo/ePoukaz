import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import ContentPage from './ContentPage'
import * as useApi from '../hooks/useApi'

import { ApiError } from '../api/client'

const company = {
  name: 'Lékárna Pod Věží',
  billingIco: '87654321',
  address: { street: 'Hlavní 42', city: 'Praha', zip: '11000' },
  logo: null,
  photos: { exterior: null, interior: null },
  publicHash: '0698b3c8bfc2',
  publicPhone: null,
  publicPhones: [],
  publicEmail: null,
  delivery: null,
}

const renderAt = (path: string) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <Routes><Route path="/provozovna/:publicHash" element={<ContentPage />} /></Routes>
      </MemoryRouter>
    </ThemeProvider>,
  )

test('UNI stránka bez provozovny má nadpis a text (placeholdery prázdné)', () => {
  vi.spyOn(useApi, 'useCompany').mockReturnValue({ data: null, loading: false, error: null })
  render(<ThemeProvider theme={theme}><MemoryRouter><ContentPage /></MemoryRouter></ThemeProvider>)
  expect(screen.getByText(/Nadpis univerzální podstránky/)).toBeInTheDocument()
  expect(screen.getByText(/OBCHODNÍ PODMÍNKY/)).toBeInTheDocument()
})

test('Na /provozovna/:hash doplní údaje provozovny do textu', () => {
  vi.spyOn(useApi, 'useCompany').mockReturnValue({ data: company, loading: false, error: null })
  renderAt('/provozovna/0698b3c8bfc2')
  const uni = within(screen.getByTestId('page-uni'))
  expect(uni.getAllByText(/Lékárna Pod Věží/).length).toBeGreaterThan(0)
  expect(uni.getAllByText(/Hlavní 42, Praha 11000/).length).toBeGreaterThan(0)
})

test('Na /provozovna/:hash s 404 ukáže hlášku a ne šablonu', () => {
  vi.spyOn(useApi, 'useCompany').mockReturnValue({ data: null, loading: false, error: new ApiError(404, 'nenalezeno') })
  renderAt('/provozovna/neexistuje')
  expect(screen.getByText(/nepodařilo načíst/i)).toBeInTheDocument()
  expect(screen.queryByText(/OBCHODNÍ PODMÍNKY/)).toBeNull()
})
