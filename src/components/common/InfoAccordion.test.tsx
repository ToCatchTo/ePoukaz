import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import InfoAccordion from './InfoAccordion'

const items = [
  { title: 'První', body: 'Tělo první' },
  { title: 'Druhá', body: 'Tělo druhé' },
]

test('první položka je výchozí aktivní a její tělo je vidět', () => {
  render(<ThemeProvider theme={theme}><InfoAccordion items={items} /></ThemeProvider>)
  expect(screen.getAllByText('Tělo první').length).toBeGreaterThan(0)
})

test('klik na druhou položku přepne obsah', () => {
  render(<ThemeProvider theme={theme}><InfoAccordion items={items} /></ThemeProvider>)
  fireEvent.click(screen.getByText('Druhá'))
  expect(screen.getAllByText('Tělo druhé').length).toBeGreaterThan(0)
})
