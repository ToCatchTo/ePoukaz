import { Box, Grid } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import type { ElementType, ReactNode } from 'react'
import { GRID_COLUMNS, GRID_MAX, GRID_SPANS, PAGE_PX } from '../../theme/grid'

// Obal jedné sekce zarovnané na grid: boční margin = 1 sloupec (PAGE_PX), obsah centrovaný
// a zastropovaný na GRID_MAX, uvnitř MUI Grid s jednou položkou o daném rozsahu.
//   variant „content" – header, hero, jak-to-funguje (na desktopu odsazení 2 sloupce)
//   variant „wide"    – karta CTA + patička (na desktopu odsazení 1 sloupec)
// Vertikální marže/pozicování předávej přes `sx`.
export default function GridSection({
  variant = 'content',
  children,
  sx,
  component,
  id,
}: {
  variant?: 'wide' | 'content'
  children: ReactNode
  sx?: SxProps<Theme>
  component?: ElementType
  id?: string
}) {
  const span = GRID_SPANS[variant]
  return (
    <Box component={component ?? 'div'} id={id} sx={{ px: PAGE_PX, ...sx }}>
      <Box sx={{ maxWidth: GRID_MAX, mx: 'auto' }}>
        <Grid container columns={GRID_COLUMNS}>
          <Grid size={span.size} offset={span.offset}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
