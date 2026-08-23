import { defineConfig, loadEnv, type Plugin } from 'vite'
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
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

  // SPA fallback shell. index.html je PŘEDrenderovaná homepage, takže když ho server
  // naservíruje jako fallback pro jinou routu (dynamické /provozovna, /stranka; nebo
  // host, který neresolvuje /cenik → /cenik/index.html), prohlížeč vykreslí celou HP,
  // než React přepne na správnou stránku – „problik" homepage. Proto vygenerujeme
  // prázdný shell (index.html s prázdným #root, ale se správnými asset tagy) do
  // dist/app.html a fallbackujeme na něj (viz public/.htaccess) – fallback tak neukáže
  // žádný cizí obsah, jen se rovnou vyrenderuje cílová stránka.
  let shellHtml: string | undefined
  const captureShellPlugin: Plugin = {
    name: 'capture-spa-shell',
    apply: 'build',
    transformIndexHtml: {
      // 'post' = až po injektnutí bundle asset tagů Vitem; #root je stále prázdný.
      order: 'post',
      handler(html) {
        shellHtml = html
      },
    },
  }

  const writeHomeHtmlPlugin: Plugin = {
    name: 'write-prerendered-home-html',
    apply: 'build',
    closeBundle() {
      if (homeHtml) {
        writeFileSync(resolve(process.cwd(), 'dist/index.html'), homeHtml)
      }
      if (shellHtml) {
        writeFileSync(resolve(process.cwd(), 'dist/app.html'), shellHtml)
      }
    },
  }

  // Preview server (npm run preview) má vestavěný SPA fallback natvrdo na index.html
  // (= předrenderovaná HP). Tímto middlewarem ho napodobíme chování Apache z .htaccess:
  // reálný soubor / adresář s index.html naservírujeme přímo (statické předrenderované
  // routy), vše ostatní → prázdný app.html shell. Bez tohohle by preview u /cenik apod.
  // ukazoval problik HP a nešel by ověřit produkční stav.
  const previewLikeApachePlugin: Plugin = {
    name: 'preview-spa-fallback-shell',
    configurePreviewServer(server) {
      const dist = resolve(process.cwd(), 'dist')
      server.middlewares.use((req, res, next) => {
        if (!req.url || req.method !== 'GET') return next()
        const url = req.url.split('?')[0]
        // Assety a soubory s příponou nech na standardním statickém servírování.
        if (url.startsWith('/assets/') || /\.[a-z0-9]+$/i.test(url)) return next()
        // Předrenderovaná routa má vlastní <route>/index.html – naservíruj ji.
        const routeIndex = join(dist, url, 'index.html')
        const file = existsSync(routeIndex) ? routeIndex : join(dist, 'app.html')
        if (existsSync(file)) {
          res.setHeader('Content-Type', 'text/html')
          res.end(readFileSync(file))
          return
        }
        next()
      })
    },
  }

  return {
    plugins: [
      react(),
      captureShellPlugin,
      previewLikeApachePlugin,
      // Po buildu naservíruje dist/ a headless Chromem projede statické routy,
      // aby uložil vyrenderované HTML (SEO + rychlejší first paint). Appka se
      // nemění – snímá se reálný DOM včetně React 19 meta tagů ze <Seo>.
      // Dynamické routy (/provozovna/:publicHash, /stranka/:slug) se záměrně
      // nepředrenderovávají, zůstávají CSR přes SPA fallback.
      // Na Vercelu (env VERCEL) prerender vynecháme – build tam nemá Chrome pro
      // puppeteer, deploy poběží jako SPA. Klasický hosting prerender dělá dál (SEO).
      ...(process.env.VERCEL ? [] : [prerender({
        routes: [
          '/', '/vydejna', '/cenik', '/kontakt',
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
          // Prerender server běží na http://127.0.0.1:<port>; Vite runtime při
          // renderu doinjektuje <link rel="modulepreload"> s TOUTO absolutní
          // adresou. Bez oříznutí by preloady mimo build (preview, produkce)
          // mířily na mrtvý port → ERR_CONNECTION_REFUSED. Origin odstraníme,
          // cesty tak zůstanou root-relativní (/assets/...).
          renderedRoute.html = renderedRoute.html.replace(
            /https?:\/\/(?:127\.0\.0\.1|localhost):\d+/g,
            '',
          )
          // Route "/" plugin sám nezapíše (Rolldown) – zachytíme a dopíšeme v closeBundle.
          if (renderedRoute.route === '/') {
            homeHtml = renderedRoute.html
          }
        },
      })]),
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
