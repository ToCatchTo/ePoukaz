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
