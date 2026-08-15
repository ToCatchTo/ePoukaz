import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/theme'
import { AppRoutes } from './App'

// Vyrenderuje aplikaci na dané cestě
function renderAt(path: string) {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </ThemeProvider>,
  )
}

test('domovská stránka se vyrenderuje', async () => {
  renderAt('/')
  expect(await screen.findByTestId('page-home')).toBeInTheDocument()
})

test('ceník se vyrenderuje', async () => {
  renderAt('/cenik')
  expect(await screen.findByTestId('page-cenik')).toBeInTheDocument()
})
