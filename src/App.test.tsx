import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/theme'
import { AppRoutes } from './App'

// Pomocná funkce – renderuje appku na dané cestě
function renderAt(path: string) {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </ThemeProvider>,
  )
}

test('domovská stránka se vyrenderuje', () => {
  renderAt('/')
  expect(screen.getByTestId('page-home')).toBeInTheDocument()
})

test('ceník se vyrenderuje', () => {
  renderAt('/cenik')
  expect(screen.getByTestId('page-cenik')).toBeInTheDocument()
})
