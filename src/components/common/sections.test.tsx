import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
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

test('kontaktní blok ukazuje nadpis a e-mail; telefon je dočasně skrytý', () => {
  render(wrap(<ContactBlock />))
  expect(screen.getByRole('heading', { name: /Máte dotaz\?/ })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'info@epoukazonline.cz' })).toHaveAttribute('href', 'mailto:info@epoukazonline.cz')
  // Telefon je zatím skrytý (SHOW_PHONE=false), dokud nebude číslo zřízené.
  expect(screen.queryByRole('link', { name: '+420 800 000 000' })).toBeNull()
})

test('kontaktní blok už neobsahuje formulář zprávy', () => {
  render(wrap(<ContactBlock />))
  expect(screen.queryByRole('button', { name: 'Odeslat zprávu' })).toBeNull()
  expect(screen.queryByLabelText('Zpráva')).toBeNull()
})
