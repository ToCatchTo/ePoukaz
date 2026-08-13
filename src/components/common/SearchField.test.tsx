import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import SearchField from './SearchField'

const setup = (value = '') => {
  const onChange = vi.fn()
  render(<ThemeProvider theme={theme}><SearchField value={value} onChange={onChange} placeholder="Hledejte…" /></ThemeProvider>)
  return { onChange }
}

test('psaní volá onChange', () => {
  const { onChange } = setup('')
  fireEvent.change(screen.getByPlaceholderText('Hledejte…'), { target: { value: 'Brno' } })
  expect(onChange).toHaveBeenCalledWith('Brno')
})

test('křížek je vidět jen s textem a maže', () => {
  const { onChange } = setup('Brno')
  fireEvent.click(screen.getByRole('button', { name: 'Vymazat' }))
  expect(onChange).toHaveBeenCalledWith('')
})

test('bez textu není křížek', () => {
  setup('')
  expect(screen.queryByRole('button', { name: 'Vymazat' })).toBeNull()
})
