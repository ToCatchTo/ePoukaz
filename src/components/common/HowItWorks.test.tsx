import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme/theme'
import HowItWorks from './HowItWorks'
import { HOW_STEPS } from '../../data/content'

const wrap = (ui: React.ReactNode) => <ThemeProvider theme={theme}>{ui}</ThemeProvider>

test('zobrazuje všech 8 nadpisů kroků', () => {
  render(wrap(<HowItWorks />))
  for (const s of HOW_STEPS) {
    expect(screen.getByText(s.title)).toBeInTheDocument()
  }
})

test('ve výchozím stavu je otevřený první krok (jeho text je vidět)', () => {
  render(wrap(<HowItWorks />))
  expect(screen.getByText(HOW_STEPS[0].text)).toBeInTheDocument()
  // text druhého kroku zatím není v DOM (Collapse s unmountOnExit)
  expect(screen.queryByText(HOW_STEPS[1].text)).not.toBeInTheDocument()
})

test('klik na jiný nadpis zavře předchozí a otevře nový', async () => {
  render(wrap(<HowItWorks />))

  fireEvent.click(screen.getByText(HOW_STEPS[1].title))

  // nový krok je hned otevřený
  expect(screen.getByText(HOW_STEPS[1].text)).toBeInTheDocument()
  // předchozí se zavře (Collapse odmountuje text až po animaci)
  await waitFor(() => {
    expect(screen.queryByText(HOW_STEPS[0].text)).not.toBeInTheDocument()
  })
})
