import { createTheme } from '@mui/material/styles'

// Pastelové barvy 6 karet „problémů" (přesně z XD)
export const PASTELS = {
  teal: '#C4FFFD',
  pink: '#F6C9FF',
  purple: '#CFBAFF',
  yellow: '#FFE59F',
  red: '#FFB1B1',
  green: '#B3FCB9',
} as const

// Centrální theme – drží barvy, typografii a tvary z návrhu
export const theme = createTheme({
  palette: {
    primary: { main: '#4200D8' },   // fialová – pozadí, brand
    secondary: { main: '#00C7BF' }, // tyrkysová – akční prvky
    text: { primary: '#000000', secondary: '#5A5A5A' },
    background: { default: '#4200D8' },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: 90, lineHeight: 1.05 },
    h2: { fontWeight: 700, fontSize: 50, lineHeight: 1.1 },
    h3: { fontWeight: 700, fontSize: 42, lineHeight: 1.15 },
    h4: { fontWeight: 700, fontSize: 30 },
    h5: { fontWeight: 700, fontSize: 26 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 24 },
  components: {
    // Tlačítka jako „pill" – plně zaoblená
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 24, paddingBlock: 10 },
      },
    },
  },
})
