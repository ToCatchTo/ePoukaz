// Rozšíření matcherů o @testing-library/jest-dom
import '@testing-library/jest-dom'
import { beforeEach, vi } from 'vitest'

// Výchozí: žádný test nechodí na síť; vrací prázdné pole (komponenty → statický fallback).
beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => [] }),
  )
})
