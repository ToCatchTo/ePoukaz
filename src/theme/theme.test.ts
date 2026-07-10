import { theme, PASTELS } from './theme'

test('paleta má správné brand barvy', () => {
  expect(theme.palette.primary.main).toBe('#4200D8')
  expect(theme.palette.secondary.main).toBe('#00C7BF')
})

test('pastely karet obsahují 6 barev', () => {
  expect(Object.values(PASTELS)).toHaveLength(6)
  expect(PASTELS.teal).toBe('#C4FFFD')
})

test('font je Poppins', () => {
  expect(theme.typography.fontFamily).toContain('Poppins')
})
