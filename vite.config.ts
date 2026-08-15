import { defineConfig, loadEnv, type Plugin } from 'vite'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Načteme VŠECHNY env proměnné (i bez VITE_ prefixu). Token drží `API_TOKEN`, který
  // se NIKDY nedostane do klientského bundle – použije ho jen dev proxy níže (běží na
  // Vite serveru, ne v prohlížeči).
  const env = loadEnv(mode, process.cwd(), '')

  // Pro route "/" se výstupní cesta prerender pluginu (index.html) shoduje se
  // vstupním souborem (entryPath) – plugin ve svém generateBundle handleru
  // smaže původní bundle["index.html"] a znovu ho emitFile-em vytvoří, což
  // funguje na Rollupu, ale ve Vite 8 (Rolldown bundler) se smazání bundle
  // položky neprojeví a nově emitovaný soubor je kvůli kolizi fileName tiše
  // zahozen – dist/index.html po buildu chybí (ověřeno debug logováním).
  // Obejito bez zásahu do app kódu: zachytíme vyrenderované HTML pro "/" v
  // postProcess a dopíšeme ho na disk sami po dokončení zápisu bundlu.
  let homeHtml: string | undefined
  const writeHomeHtmlPlugin: Plugin = {
    name: 'write-prerendered-home-html',
    apply: 'build',
    closeBundle() {
      if (!homeHtml) return
      writeFileSync(resolve(process.cwd(), 'dist/index.html'), homeHtml)
    },
  }

  return {
    plugins: [
      react(),
      // Po buildu naservíruje dist/ a headless Chromem projede statické routy,
      // aby uložil vyrenderované HTML (SEO + rychlejší first paint). Appka se
      // nemění – snímá se reálný DOM včetně React 19 meta tagů ze <Seo>.
      // Dynamické routy (/provozovna/:publicHash, /stranka/:slug) se záměrně
      // nepředrenderovávají, zůstávají CSR přes SPA fallback.
      prerender({
        routes: [
          '/', '/pro-vydejny', '/cenik', '/kontakt',
          '/faq', '/obchodni-podminky', '/jak-to-funguje', '/vse-o-epoukazu',
        ],
        renderer: '@prerenderer/renderer-puppeteer',
        rendererOptions: {
          // Snímek až po vyrenderování obsahu. Statický marketingový obsah a Seo
          // meta se renderují synchronně; API data (tarify/hledání) mají fallback.
          renderAfterTime: 2000,
          headless: true,
          // Sandboxované/CI prostředí často nemá setuid sandbox pro Chrome.
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
        postProcess(renderedRoute: { route: string; html: string }) {
          // Viz komentář u writeHomeHtmlPlugin výše – jen zachytáváme HTML.
          if (renderedRoute.route === '/') {
            homeHtml = renderedRoute.html
          }
        },
      }),
      writeHomeHtmlPlugin,
    ],
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
