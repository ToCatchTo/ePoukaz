import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import KontaktPage from './KontaktPage'

test('kontakt zobrazuje e-mail', () => {
  render(<ThemeProvider theme={theme}><KontaktPage /></ThemeProvider>)
  expect(screen.getByText('info@epoukazonline.cz')).toBeInTheDocument()
})
