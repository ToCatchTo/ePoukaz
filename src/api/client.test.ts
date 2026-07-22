import { apiFetch, ApiError } from './client'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
})

test('apiFetch vrátí naparsované JSON a zavolá správné URL', async () => {
  const data = [{ name: 'Lékárna' }]
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => data })
  vi.stubGlobal('fetch', fetchMock)

  const result = await apiFetch<typeof data>('/api/web/companies')

  expect(result).toEqual(data)
  expect(fetchMock).toHaveBeenCalledWith(
    'https://api.epoukazonline.cz/api/web/companies',
    expect.objectContaining({ headers: expect.any(Object) }),
  )
})

test('apiFetch přidá X-AUTH-TOKEN, když je token v env', async () => {
  vi.stubEnv('VITE_API_TOKEN', 'test-token')
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({}) })
  vi.stubGlobal('fetch', fetchMock)

  await apiFetch('/api/web/tariffs')

  expect(fetchMock.mock.calls[0][1].headers).toMatchObject({ 'X-AUTH-TOKEN': 'test-token' })
})

test('apiFetch vyhodí ApiError se status 401', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 401, json: async () => ({}) }))
  await expect(apiFetch('/api/web/companies')).rejects.toMatchObject({ status: 401 })
})

test('apiFetch vyhodí ApiError se status 404', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404, json: async () => ({}) }))
  await expect(apiFetch('/api/web/pages/neexistuje')).rejects.toBeInstanceOf(ApiError)
})
