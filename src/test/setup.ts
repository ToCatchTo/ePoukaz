// Rozšíření matcherů o @testing-library/jest-dom
import '@testing-library/jest-dom'
import { beforeEach, vi } from 'vitest'

// Žádný test nechodí na síť; fetch vrací prázdné pole, komponenty tak spadnou na statický fallback.
beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => [] }),
  )
})
