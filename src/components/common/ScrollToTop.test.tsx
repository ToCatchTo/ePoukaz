import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom'
import { vi } from 'vitest'
import ScrollToTop from './ScrollToTop'

test('po prokliku na jinou stránku posune okno na začátek', () => {
  const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

  render(
    <MemoryRouter initialEntries={['/']}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Link to="/cenik">Přejít na ceník</Link>} />
        <Route path="/cenik" element={<div>Ceník</div>} />
      </Routes>
    </MemoryRouter>,
  )

  // Počáteční scroll při mountu ignorujeme – testujeme chování při změně cesty.
  scrollSpy.mockClear()

  fireEvent.click(screen.getByText('Přejít na ceník'))

  expect(scrollSpy).toHaveBeenCalledWith(0, 0)
})
