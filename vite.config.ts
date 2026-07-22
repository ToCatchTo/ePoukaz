import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Načteme VŠECHNY env proměnné (i bez VITE_ prefixu). Token drží `API_TOKEN`, který
  // se NIKDY nedostane do klientského bundle – použije ho jen dev proxy níže (běží na
  // Vite serveru, ne v prohlížeči).
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Prohlížeč volá same-origin `/api/...`; Vite to na svém serveru přepošle na API
        // a přidá hlavičku X-AUTH-TOKEN. Tím obejdeme CORS (API je server-to-server) a
        // token zůstane mimo prohlížeč.
        // POZOR (produkce): tuhle proxy nahradí backend kolegy – frontend se nemění.
        '/api': {
          target: 'https://api.epoukazonline.cz',
          changeOrigin: true,
          headers: env.API_TOKEN ? { 'X-AUTH-TOKEN': env.API_TOKEN } : {},
        },
      },
    },
  }
})
