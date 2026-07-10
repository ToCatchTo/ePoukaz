import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import CenikPage from './CenikPage'

test('ceník zobrazuje 3 tarify a tabulku', () => {
  render(<ThemeProvider theme={theme}><MemoryRouter><CenikPage /></MemoryRouter></ThemeProvider>)
  expect(screen.getByText('1 490 Kč')).toBeInTheDocument()
  expect(screen.getByText('2 490 Kč')).toBeInTheDocument()
  expect(screen.getByText('Klientské rozhraní')).toBeInTheDocument()
})
