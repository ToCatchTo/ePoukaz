import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import type { ReactNode } from 'react'
import { CARD_R } from '../../theme/layout'

// Bílá zaoblená karta – univerzální obal sekcí
export default function SectionCard(
  { children, sx, id }: { children: ReactNode; sx?: SxProps<Theme>; id?: string },
) {
  return (
    <Box id={id} sx={{ bgcolor: '#fff', borderRadius: CARD_R, p: 8, ...sx }}>{children}</Box>
  )
}
