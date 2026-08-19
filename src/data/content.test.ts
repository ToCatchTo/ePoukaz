import { HOW_STEPS, PROBLEMS, PRICING, COMPARE_ROWS, TESTIMONIALS, FOOTER, NAV_MAIN, NAV_DISTRIBUTORS, SEARCH, HOW_IT_WORKS, ABOUT_EPOUKAZ, DISTRIBUTOR_CTA } from './content'

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
  expect(NAV_DISTRIBUTORS.map((l) => l.to)).toEqual(['/pro-vydejny', '/cenik', '/kontakt'])
  // První položka má label „Jak to funguje?", ale slug zůstává /pro-vydejny
  expect(NAV_DISTRIBUTORS[0]).toEqual({ label: 'Jak to funguje?', to: '/pro-vydejny' })
})

test('CTA patičky pro zákaznické stránky', () => {
  expect(DISTRIBUTOR_CTA.title).toBe('Jste výdejna ePoukazů?')
  expect(DISTRIBUTOR_CTA.button).toBe('Zóna pro výdejny')
  expect(DISTRIBUTOR_CTA.provider).toContain('29645387')
})

test('search a infobox data', () => {
  expect(SEARCH.selectLabel).toBe('Vybrat')
  expect(HOW_IT_WORKS.items).toHaveLength(4)
  expect(ABOUT_EPOUKAZ.items).toHaveLength(9)
  expect(ABOUT_EPOUKAZ.items[0].title).toBe('Co je ePoukaz?')
  expect(ABOUT_EPOUKAZ.items[0].body).toContain('elektronický poukaz')
})
