import { useEffect, useState } from 'react'

// Vrací `value` se zpožděním `delayMs`; při rychlé změně se přepočítá až po pauze.
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(id)
  }, [value, delayMs])
  return debounced
}
