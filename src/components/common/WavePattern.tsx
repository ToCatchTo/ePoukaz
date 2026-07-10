import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

// Dekorativní vzor „rybích šupin" – tyrkysové oblouky na fialovém pozadí.
// Jeden dlaždicový SVG motiv, který se opakuje (tile 40×40).
const scale = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>
     <path d='M0 40 A20 20 0 0 1 40 40' fill='none' stroke='#00C7BF' stroke-width='2'/>
     <path d='M-20 20 A20 20 0 0 1 20 20' fill='none' stroke='#00C7BF' stroke-width='2'/>
     <path d='M20 20 A20 20 0 0 1 60 20' fill='none' stroke='#00C7BF' stroke-width='2'/>
   </svg>`,
)

// Opakovaný pás vzoru. Používá se vodorovně (za hero) i jako svislé pásy v okrajích.
export default function WavePattern({ sx }: { sx?: SxProps<Theme> }) {
  return (
    <Box
      aria-hidden
      sx={{
        backgroundImage: `url("data:image/svg+xml,${scale}")`,
        backgroundRepeat: 'repeat',
        opacity: 0.85,
        ...sx,
      }}
    />
  )
}
