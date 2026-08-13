import { HOW_STEPS, PROBLEMS, PRICING, COMPARE_ROWS, TESTIMONIALS, FOOTER, NAV_MAIN, NAV_VYDEJNY, SEARCH, JAK_TO_FUNGUJE, VSE_O_EPOUKAZU } from './content'

test('8 kroků jak to funguje', () => {
  expect(HOW_STEPS).toHaveLength(8)
  expect(HOW_STEPS[0].title).toBe('Nastavení za pár minut')
})

test('6 barevných karet problémů', () => {
  expect(PROBLEMS).toHaveLength(6)
  expect(PROBLEMS[0].color).toBe('#C4FFFD')
})

test('3 tarify a 15 řádků srovnání', () => {
  expect(PRICING).toHaveLength(3)
  expect(PRICING[1].highlighted).toBe(true)
  expect(COMPARE_ROWS).toHaveLength(15)
})

test('3 recenze a 3 sloupce patičky', () => {
  expect(TESTIMONIALS).toHaveLength(3)
  expect(FOOTER.columns).toHaveLength(3)
})

test('nav sady', () => {
  expect(NAV_MAIN.map((l) => l.to)).toEqual(['/jak-to-funguje', '/vse-o-epoukazu', '/pro-vydejny'])
  expect(NAV_VYDEJNY.map((l) => l.to)).toEqual(['/pro-vydejny', '/cenik', '/kontakt'])
})

test('search a infobox data', () => {
  expect(SEARCH.selectLabel).toBe('Vybrat')
  expect(JAK_TO_FUNGUJE.items).toHaveLength(6)
  expect(VSE_O_EPOUKAZU.items).toHaveLength(6)
  expect(VSE_O_EPOUKAZU.items[0].title).toBe('Co je ePoukaz?')
  expect(VSE_O_EPOUKAZU.items[0].body).toContain('elektronický poukaz')
})
