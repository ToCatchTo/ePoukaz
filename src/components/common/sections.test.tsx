import type { ReactNode } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import ContactBlock from './ContactBlock'
import MainFeatures from './MainFeatures'
import { MAIN_FEATURES } from '../../data/content'

const wrap = (ui: ReactNode) => <ThemeProvider theme={theme}>{ui}</ThemeProvider>

// Titulky dlaždic obsahují HTML (např. „</br>"), renderují se přes dangerouslySetInnerHTML –
// pro porovnání s DOM z nich odstraníme značky a sjednotíme mezery.
const plain = (s: string) => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

test('sekce Vše co váš provoz potřebuje má nadpis a 9 dlaždic', () => {
  render(wrap(<MainFeatures />))
  expect(screen.getByRole('heading', { name: 'Vše co váš provoz potřebuje' })).toBeInTheDocument()
  expect(MAIN_FEATURES.items).toHaveLength(9)
  for (const it of MAIN_FEATURES.items) {
    const want = plain(it.title)
    const tiles = screen.getAllByText(
      (_, el) => el?.tagName === 'P' && plain(el.textContent ?? '') === want,
    )
    expect(tiles.length).toBeGreaterThan(0)
  }
})

test('kontaktní blok ukazuje e-mail a má mailto:/tel: odkazy', () => {
  render(wrap(<ContactBlock />))
  expect(screen.getByRole('link', { name: 'info@epoukazonline.cz' })).toHaveAttribute('href', 'mailto:info@epoukazonline.cz')
  expect(screen.getByRole('link', { name: '+420 800 000 000' })).toHaveAttribute('href', 'tel:+420800000000')
})

test('kontaktní formulář validuje a po odeslání ukáže potvrzení', () => {
  render(wrap(<ContactBlock />))
  // Prázdné odeslání: chybové hlášky, žádné potvrzení.
  fireEvent.click(screen.getByRole('button', { name: 'Odeslat zprávu' }))
  expect(screen.getByText('Zadejte e-mail.')).toBeInTheDocument()
  expect(screen.getByText('Napište nám zprávu.')).toBeInTheDocument()
  expect(screen.queryByText('Zpráva odeslána!')).not.toBeInTheDocument()

  // Neplatný e-mail: hláška o formátu.
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'neni-email' } })
  fireEvent.change(screen.getByLabelText('Zpráva'), { target: { value: 'Dobrý den' } })
  fireEvent.click(screen.getByRole('button', { name: 'Odeslat zprávu' }))
  expect(screen.getByText('Zadejte platný e-mail.')).toBeInTheDocument()

  // Platné hodnoty: potvrzovací pop-up.
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jan@example.cz' } })
  fireEvent.click(screen.getByRole('button', { name: 'Odeslat zprávu' }))
  expect(screen.getByText('Zpráva odeslána!')).toBeInTheDocument()
})
