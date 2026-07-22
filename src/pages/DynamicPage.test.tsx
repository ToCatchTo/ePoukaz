import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme'
import DynamicPage from './DynamicPage'
import * as useApi from '../hooks/useApi'

const renderAt = (path: string) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <Routes><Route path="/stranka/:slug" element={<DynamicPage />} /></Routes>
      </MemoryRouter>
    </ThemeProvider>,
  )

test('DynamicPage vykreslí title, HTML obsah a galerii', () => {
  vi.spyOn(useApi, 'usePage').mockReturnValue({
    data: { title: 'O nás', slug: 'o-nas', content: '<p>Ahoj světe</p>', gallery: ['https://x/1.jpg'] },
    loading: false,
    error: null,
  })

  renderAt('/stranka/o-nas')

  expect(screen.getByRole('heading', { name: 'O nás' })).toBeInTheDocument()
  expect(screen.getByText('Ahoj světe')).toBeInTheDocument()
  expect(screen.getByTestId('page-gallery').querySelector('img')).toHaveAttribute('src', 'https://x/1.jpg')
})

test('DynamicPage ukáže hlášku při 404', () => {
  vi.spyOn(useApi, 'usePage').mockReturnValue({
    data: null,
    loading: false,
    error: Object.assign(new Error('404'), { status: 404 }),
  })
  renderAt('/stranka/neexistuje')
  expect(screen.getByText(/nenalezena/i)).toBeInTheDocument()
})
