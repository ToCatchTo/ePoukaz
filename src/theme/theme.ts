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
    // Velikosti přesně z XD návrhu (px / řez)
    h1: { fontWeight: 700, fontSize: 90, lineHeight: 1.05 }, // hero, „6 problémů", nadpis formuláře
    h2: { fontWeight: 700, fontSize: 50, lineHeight: 1.1 }, // CTA „A to není vše!"
    h3: { fontWeight: 700, fontSize: 42, lineHeight: 1.15 }, // nadpis ceníku, univerzální podstránky
    h4: { fontWeight: 700, fontSize: 30, lineHeight: 1.2 }, // nadpisy karet, „Nástroje", e-mail/telefon
    h5: { fontWeight: 700, fontSize: 26, lineHeight: 1.25 }, // kroky „Jak to funguje"
    h6: { fontWeight: 700, fontSize: 20, lineHeight: 1.3 }, // navigace, nadpisy sloupců, název tarifu
    button: { textTransform: 'none', fontWeight: 700, fontSize: 18 },
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
