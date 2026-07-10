import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import CtaBanner from './CtaBanner'
import TryForFreeForm from './TryForFreeForm'
import ContactBlock from './ContactBlock'

const wrap = (ui: React.ReactNode) => <ThemeProvider theme={theme}>{ui}</ThemeProvider>

test('CTA banner má tlačítko Vyzkoušejte', () => {
  render(wrap(<CtaBanner />))
  expect(screen.getByText('Vyzkoušejte')).toBeInTheDocument()
})

test('formulář 30 dní zdarma má 6 polí a Odeslat', () => {
  render(wrap(<TryForFreeForm />))
  expect(screen.getAllByPlaceholderText('*Jméno')).toHaveLength(6)
  expect(screen.getByText('Odeslat')).toBeInTheDocument()
})

test('kontaktní blok ukazuje e-mail', () => {
  render(wrap(<ContactBlock />))
  expect(screen.getByText('info@epoukazonline.cz')).toBeInTheDocument()
})
