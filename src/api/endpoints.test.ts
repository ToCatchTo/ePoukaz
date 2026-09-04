import { getCompanies, getCompany } from './endpoints'

afterEach(() => vi.restoreAllMocks())

test('getCompanies bez search volá čisté URL', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => [] })
  vi.stubGlobal('fetch', fetchMock)
  await getCompanies()
  expect(fetchMock.mock.calls[0][0]).toBe('https://api.epoukazonline.cz/api/web/companies')
})

test('getCompanies se search přidá zakódovaný query param', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => [] })
  vi.stubGlobal('fetch', fetchMock)
  await getCompanies('lékárna Brno')
  expect(fetchMock.mock.calls[0][0]).toBe(
    'https://api.epoukazonline.cz/api/web/companies?search=l%C3%A9k%C3%A1rna%20Brno',
  )
})

test('getCompany volá detail URL se zakódovaným hashem', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({}) })
  vi.stubGlobal('fetch', fetchMock)
  await getCompany('f82fdecfa2e0')
  expect(fetchMock.mock.calls[0][0]).toBe('https://api.epoukazonline.cz/api/web/companies/f82fdecfa2e0')
})
