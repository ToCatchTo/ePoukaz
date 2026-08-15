import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import HomePage from './HomePage'

const wrap = () => render(<ThemeProvider theme={theme}><MemoryRouter><HomePage /></MemoryRouter></ThemeProvider>)

test('úvodní stránka má hero nadpis a vyhledávací pole, bez panelu', () => {
  wrap()
  expect(screen.getByText(/Najděte svou výdejnu/)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/Hledejte svou výdejnu/)).toBeInTheDocument()
  // Prázdný dotaz nezobrazí panel (ani „Nic jsme nenašli").
  expect(screen.queryByText('Nic jsme nenašli')).toBeNull()
})

test('po zadání dotazu se objeví panel s výsledky z API', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true, status: 200,
    json: async () => [{ name: 'Lékárna Brno', billingIco: '1', address: { street: null, city: 'Brno', zip: null }, logo: null, photos: { exterior: null, interior: null }, publicHash: 'h1' }],
  }))
  wrap()
  fireEvent.change(screen.getByPlaceholderText(/Hledejte svou výdejnu/), { target: { value: 'Brno' } })
  await waitFor(() => expect(screen.getByText('Lékárna Brno')).toBeInTheDocument())
})
