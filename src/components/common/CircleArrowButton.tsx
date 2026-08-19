import { Box, IconButton } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

// Kulaté tlačítko se šipkou.
// src – ikona (vpravo na desktopu, dolů/nahoru na mobilu a tabletu)
// rotate – otočení ikony ve stupních (např. 180 pro „nahoru")
// sx – přenáší se na IconButton (typicky responzivní display)
export default function CircleArrowButton({
  onClick,
  src = '/static-icons/arrow-step.svg',
  rotate = 0,
  size = 42,
  color = '#000',
  sx,
}: {
  onClick?: () => void
  src?: string
  rotate?: number
  // velikost ikony v px – číslo nebo responzivní objekt (např. { xs: 28, sm: 36, lg: 42 })
  size?: number | Record<string, number>
  // barva ikony – libovolná CSS barva nebo theme token (např. 'secondary.main').
  // Ikona se vykresluje přes CSS mask, takže lze jednobarevné SVG obarvit.
  color?: string
  sx?: SxProps<Theme>
}) {
  return (
    <IconButton onClick={onClick} sx={{ p: 0, flexShrink: 0, ...sx }}>
      <Box
        sx={{
          width: size,
          height: size,
          display: 'block',
          bgcolor: color,
          transform: rotate ? `rotate(${rotate}deg)` : 'none',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s ease',
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        }}
      />
    </IconButton>
  )
}
