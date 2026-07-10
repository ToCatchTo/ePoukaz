import { render, screen } from '@testing-library/react'
import App from './App'

// Kouřový test: kostra aplikace se vyrenderuje
test('vyrenderuje kostru aplikace', () => {
  render(<App />)
  expect(screen.getByText('Ahoj ePoukaz')).toBeInTheDocument()
})
