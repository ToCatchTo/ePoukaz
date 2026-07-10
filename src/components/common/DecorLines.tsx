import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

// Dekorativní pás vlnitých čar z XD návrhu (public/images/decor-lines.svg, 1920×390, teal #a0ffef).
// Vykresluje se přes celou šířku viewportu a je centrovaný. Když je umístěný za bílou kartou
// (position:relative wrapper + karta se zIndex 1), prosvítá jen v postranních okrajích – přesně
// jako v návrhu. Bez karty je viditelný celý (přechod pod hero).
export default function DecorLines({ sx }: { sx?: SxProps<Theme> }) {
  return (
    <Box
      aria-hidden
      component="img"
      src="/images/decor-lines.svg"
      sx={{
        position: 'absolute',
        left: '50%',
        top: 0,
        transform: 'translateX(-50%)',
        width: '100vw',
        maxWidth: 'none',
        height: 'auto',
        zIndex: 0,
        pointerEvents: 'none',
        ...sx,
      }}
    />
  )
}
