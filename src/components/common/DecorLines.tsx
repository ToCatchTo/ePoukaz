import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

// Dekorativní pás vlnitých čar z XD návrhu (public/images/decor-lines.svg, 1920×390, teal #a0ffef).
// Vykresluje se v PŮVODNÍM měřítku (nezmenšuje se podle obrazovky) a je centrovaný – na užších
// obrazovkách se jen ořízne okraji (ne squish). Když je umístěný za bílou kartou (position:relative
// wrapper + karta se zIndex 1), prosvítá jen v postranních okrajích – přesně jako v návrhu.
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
        // Pevná šířka = původní měřítko SVG (1920). Na širších obrazovkách roste s viewportem,
        // aby dosáhl k okrajům; na užších se drží 1920 a jen se ořízne (neškáluje se dolů).
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
