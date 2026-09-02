import { renderHook, waitFor } from '@testing-library/react'
import { useApi } from './useApi'

test('useApi: loading → data při úspěchu', async () => {
  const { result } = renderHook(() => useApi(async () => 42, []))

  expect(result.current.loading).toBe(true)
  await waitFor(() => expect(result.current.loading).toBe(false))
  expect(result.current.data).toBe(42)
  expect(result.current.error).toBeNull()
})

test('useApi: loading → error při odmítnutí', async () => {
  const { result } = renderHook(() =>
    useApi(async () => { throw new Error('boom') }, []),
  )

  await waitFor(() => expect(result.current.loading).toBe(false))
  expect(result.current.error).toBeInstanceOf(Error)
  expect(result.current.data).toBeNull()
})

test('useApi: refetch při změně deps', async () => {
  const fetcher = vi.fn(async (_signal: AbortSignal) => 'x')
  const { rerender } = renderHook(({ dep }) => useApi(() => fetcher(new AbortController().signal), [dep]), {
    initialProps: { dep: 1 },
  })
  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1))
  rerender({ dep: 2 })
  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2))
})

import { useCompaniesSearch, useCompany } from './useApi'

test('useCompaniesSearch: prázdný dotaz nevolá fetch', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => [] })
  vi.stubGlobal('fetch', fetchMock)
  const { result } = renderHook(() => useCompaniesSearch('   '))
  await waitFor(() => expect(result.current.loading).toBe(false))
  expect(fetchMock).not.toHaveBeenCalled()
  expect(result.current.data).toEqual([])
})

test('useCompaniesSearch: neprázdný dotaz volá /companies?search=', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => [{ name: 'X' }] })
  vi.stubGlobal('fetch', fetchMock)
  const { result } = renderHook(() => useCompaniesSearch('Brno'))
  await waitFor(() => expect(result.current.loading).toBe(false))
  expect(fetchMock.mock.calls[0][0]).toContain('?search=Brno')
})

test('useCompany: prázdný hash nevolá fetch a vrátí null', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({}) })
  vi.stubGlobal('fetch', fetchMock)
  const { result } = renderHook(() => useCompany(undefined))
  await waitFor(() => expect(result.current.loading).toBe(false))
  expect(fetchMock).not.toHaveBeenCalled()
  expect(result.current.data).toBeNull()
})

test('useCompany: hash volá detail endpoint /companies/{hash}', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ publicHash: 'abc' }) })
  vi.stubGlobal('fetch', fetchMock)
  const { result } = renderHook(() => useCompany('abc'))
  await waitFor(() => expect(result.current.loading).toBe(false))
  expect(fetchMock.mock.calls[0][0]).toBe('https://api.epoukazonline.cz/api/web/companies/abc')
})
