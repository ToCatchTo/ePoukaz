import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

// Dekorativní pás vlnitých čar (public/images/decor-lines.svg, 1920×390, teal #a0ffef).
// Vykresluje se v původním měřítku (neškáluje se dolů) a je centrovaný – na užších obrazovkách
// se jen ořízne. Za bílou kartou (relativní wrapper + karta se zIndex 1) prosvítá jen v okrajích.
export default function DecorLines({ sx }: { sx?: SxProps<Theme> }) {
  return (
    <Box
      aria-hidden
      component="img"
      src="/images/decor-lines.svg"
      sx={{
        position: 'absolute',
        left: { lg: '0%', xs: '50%' },
        top: 0,
        transform: { lg: 'none', xs: 'translateX(-50%)' },
        // Šířka = původní měřítko SVG (1920); na širších obrazovkách roste s viewportem,
        // na užších se drží 1920 a jen se ořízne.
        width: 'max(1920px, 100vw)',
        maxWidth: 'none',
        height: 'auto',
        zIndex: 0,
        pointerEvents: 'none',
        ...sx,
      }}
    />
  )
}
