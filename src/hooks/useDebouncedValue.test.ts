import { renderHook, act } from '@testing-library/react'
import { useDebouncedValue } from './useDebouncedValue'

afterEach(() => vi.useRealTimers())

test('vrátí novou hodnotu až po uplynutí delay', () => {
  vi.useFakeTimers()
  const { result, rerender } = renderHook(({ v }) => useDebouncedValue(v, 300), {
    initialProps: { v: 'a' },
  })
  expect(result.current).toBe('a')
  rerender({ v: 'ab' })
  expect(result.current).toBe('a') // ihned po změně stále stará hodnota
  act(() => { vi.advanceTimersByTime(300) })
  expect(result.current).toBe('ab')
})
