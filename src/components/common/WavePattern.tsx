import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

// Dekorativní pás vzoru „rybích šupin" – tyrkysové oblouky na fialovém pozadí.
// Vykresleno opakovaným SVG přes CSS background.
const wave = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='30'>
     <path d='M0 30 A30 30 0 0 1 60 30' fill='none' stroke='#00C7BF' stroke-width='2'/>
   </svg>`,
)
export default function WavePattern({ sx }: { sx?: SxProps<Theme> }) {
  return (
    <Box
      sx={{
        height: 160,
        backgroundImage: `url("data:image/svg+xml,${wave}")`,
        backgroundRepeat: 'repeat',
        opacity: 0.9,
        ...sx,
      }}
    />
  )
}
