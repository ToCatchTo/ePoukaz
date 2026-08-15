// @prerenderer/rollup-plugin nemá "type": "module" ve svém package.json a jeho
// exports mapa má klíč "types" až za "import"/"require" – TS (nodenext) proto
// typuje `types/index.d.ts` jako CJS namespace bez callable default exportu,
// i když runtime (`dist/cjs.js`: `module.exports = RollupPrerenderPlugin`) je
// v pořádku. Tento shim jen opravuje typování pro vite.config.ts, chování
// balíčku nemění. Pokrývá jen options, které v projektu skutečně používáme.
declare module '@prerenderer/rollup-plugin' {
  import type { OutputPlugin } from 'rollup'

  interface RollupPrerenderOptions {
    routes?: string[]
    renderer?: string
    rendererOptions?: Record<string, unknown>
    postProcess?(renderedRoute: { html: string }, routes: unknown[]): Promise<void> | void
    fallback?: boolean | string
    urlModifier?(url: string): string
  }

  export default function prerender(options?: RollupPrerenderOptions): OutputPlugin
}
