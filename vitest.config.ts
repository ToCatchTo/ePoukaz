import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Konfigurace testů (jsdom + testing-library)
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    // V testech používáme plnou URL (fetch je stejně mockovaný). V dev je VITE_API_BASE_URL
    // z .env prázdná (same-origin → dev proxy), což by jinak měnilo URL sestavovanou klientem.
    env: { VITE_API_BASE_URL: 'https://api.epoukazonline.cz' },
  },
})
