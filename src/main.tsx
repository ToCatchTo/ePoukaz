import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { theme } from './theme/theme'
import './index.css'
import App from './App.tsx'
// Google Sans se načítá z Google Fonts (<link> v index.html).
// Poppins fallback – latin + latin-ext subset (latin-ext nese českou diakritiku: ě, ř, ů, ž, č…).
// Soubory mají unicode-range, takže latin-ext se stáhne jen když je na stránce potřeba.
import '@fontsource/poppins/latin-300.css'
import '@fontsource/poppins/latin-ext-300.css'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-ext-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-ext-500.css'
import '@fontsource/poppins/latin-700.css'
import '@fontsource/poppins/latin-ext-700.css'

// Emotion cache se speedy:false vkládá CSS pravidla jako text do <style> (ne přes
// insertRule do CSSOM). Při předrenderu je tak puppeteer zachytí do statického HTML
// a stránka je nastylovaná od prvního vykreslení – bez probliknutí nenastylovaného
// obsahu (FOUC). prepend:true drží MUI styly s nižší specificitou (přepsatelné přes sx).
const emotionCache = createCache({ key: 'css', prepend: true, speedy: false })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  </StrictMode>,
)
