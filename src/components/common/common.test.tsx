import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import SectionCard from './SectionCard'
import CircleArrowButton from './CircleArrowButton'

test('SectionCard vykreslí obsah', () => {
  render(<ThemeProvider theme={theme}><SectionCard>obsah</SectionCard></ThemeProvider>)
  expect(screen.getByText('obsah')).toBeInTheDocument()
})

test('CircleArrowButton je tlačítko', () => {
  render(<ThemeProvider theme={theme}><CircleArrowButton /></ThemeProvider>)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
