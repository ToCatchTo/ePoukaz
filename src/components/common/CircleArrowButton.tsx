import { Box, IconButton } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

// Kulaté tlačítko se šipkou pro kroky „Jak to funguje" (ikona z návrhu).
// src – která ikona (vpravo na desktopu, dolů/nahoru na mobilu a tabletu)
// rotate – otočení ikony ve stupních (např. 180 pro „nahoru")
// sx – přenáší se na IconButton (typicky responzivní display pro přepnutí desktop/mobil)
export default function CircleArrowButton({
  onClick,
  src = '/icons/arrow-step.svg',
  rotate = 0,
  size = 42,
  sx,
}: {
  onClick?: () => void
  src?: string
  rotate?: number
  // velikost ikony v px – číslo nebo responzivní objekt, např. { xs: 28, sm: 36, lg: 42 }
  size?: number | Record<string, number>
  sx?: SxProps<Theme>
}) {
  return (
    <IconButton onClick={onClick} sx={{ p: 0, flexShrink: 0, ...sx }}>
      <Box
        component="img"
        src={src}
        alt=""
        sx={{
          width: size,
          height: size,
          display: 'block',
          transform: rotate ? `rotate(${rotate}deg)` : 'none',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        }}
      />
    </IconButton>
  )
}
