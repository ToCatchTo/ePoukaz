import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import HomePage from './HomePage'

test('homepage má hero, 8 kroků a 6 karet', () => {
  render(
    <ThemeProvider theme={theme}><MemoryRouter><HomePage /></MemoryRouter></ThemeProvider>,
  )
  expect(screen.getByText('Šetřete čas sobě i pacientům')).toBeInTheDocument()
  expect(screen.getByText('Nastavení za pár minut')).toBeInTheDocument()
  expect(screen.getByText('Ušetříte čas')).toBeInTheDocument()
})
