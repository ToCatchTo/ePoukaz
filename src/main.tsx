import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './theme/theme'
import './index.css'
import App from './App.tsx'
// Hlavní font Google Sans se načítá z Google Fonts (viz <link> v index.html).
// Poppins zůstává jako lokální fallback, kdyby se web font nenačetl.
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/700.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
