import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import CompanyPage from './CompanyPage'
import * as useApi from '../hooks/useApi'
import * as useImagesReady from '../hooks/useImagesReady'
import { ApiError } from '../api/client'

const company = {
  name: 'Zdravpo PARDUBICE s.r.o.',
  billingIco: '12345678',
  address: { street: '17. listopadu 409', city: 'Pardubice', zip: '53006' },
  logo: '/logo.png',
  photos: { exterior: '/exterior.jpg', interior: '/interior.jpg' },
  publicHash: 'abc123',
  publicPhone: '+420 777 888 999',
  publicPhones: ['+420 777 888 999', '+420 11 32 36 78'],
  publicEmail: 'info@prodejna.cz',
  delivery: null,
}

const renderAt = (path: string) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <Routes><Route path="/provozovna/:publicHash" element={<CompanyPage />} /></Routes>
      </MemoryRouter>
    </ThemeProvider>,
  )

beforeEach(() => {
  // V jsdom se obrázky nikdy nenačtou; přeskočíme preload, ať je obsah viditelný.
  vi.spyOn(useImagesReady, 'useImagesReady').mockReturnValue(true)
})

test('hlavička ukáže název, adresu a všechny kontakty', () => {
  vi.spyOn(useApi, 'useCompany').mockReturnValue({ data: company, loading: false, error: null })
  renderAt('/provozovna/abc123')
  const page = within(screen.getByTestId('page-company'))
  expect(page.getAllByText(/Zdravpo PARDUBICE s\.r\.o\./).length).toBeGreaterThan(0)
  expect(page.getByText(/17\. listopadu 409/)).toBeInTheDocument()
  expect(page.getByText(/530 06 Pardubice/)).toBeInTheDocument()
  expect(page.getByText(/info@prodejna\.cz/)).toBeInTheDocument()
  expect(page.getByText(/\+420 777 888 999/)).toBeInTheDocument()
  expect(page.getByText(/\+420 11 32 36 78/)).toBeInTheDocument()
})

test('vykreslí tolik fotek, kolik jich vrátí API (logo mimo stack)', () => {
  vi.spyOn(useApi, 'useCompany').mockReturnValue({ data: company, loading: false, error: null })
  renderAt('/provozovna/abc123')
  const photos = within(screen.getByTestId('company-photos'))
  expect(photos.getAllByRole('img')).toHaveLength(2)
})

test('mapa má v src adresu provozovny', () => {
  vi.spyOn(useApi, 'useCompany').mockReturnValue({ data: company, loading: false, error: null })
  renderAt('/provozovna/abc123')
  const map = screen.getByTitle('Mapa provozovny') as HTMLIFrameElement
  expect(map.src).toContain(encodeURIComponent('17. listopadu 409'))
  expect(map.src).toContain('output=embed')
})

test('tlačítko Zpět je k dispozici', () => {
  vi.spyOn(useApi, 'useCompany').mockReturnValue({ data: company, loading: false, error: null })
  renderAt('/provozovna/abc123')
  expect(screen.getByRole('button', { name: /Zpět/ })).toBeInTheDocument()
})

test('404 ukáže hlášku a nevykreslí mapu ani fotky', () => {
  vi.spyOn(useApi, 'useCompany').mockReturnValue({ data: null, loading: false, error: new ApiError(404, 'nenalezeno') })
  renderAt('/provozovna/neexistuje')
  expect(screen.getByText(/nepodařilo načíst/i)).toBeInTheDocument()
  expect(screen.queryByTitle('Mapa provozovny')).toBeNull()
  expect(screen.queryByTestId('company-photos')).toBeNull()
})
