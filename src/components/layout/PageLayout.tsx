import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import WavePattern from '../common/WavePattern'
import { WIDE_W } from '../../theme/layout'

// Obal všech stránek – fialové pozadí přes celou šířku, centrovaný sloupec obsahu (1640 px)
// a svislé pásy vzoru „rybích šupin" v postranních okrajích. Patičku si vykresluje každá
// stránka sama (kvůli variantě s/bez CTA), viz Footer.
export default function PageLayout() {
  // Šířka postranního okraje = polovina volného místa vedle sloupce (0, když se sloupec nevejde)
  const gutter = `max(0px, calc((100vw - ${WIDE_W}px) / 2))`
  return (
    <Box sx={{ position: 'relative', bgcolor: 'primary.main', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Svislé pásy vzoru v okrajích */}
      <WavePattern sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: gutter }} />
      <WavePattern sx={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: gutter }} />

      {/* Centrovaný sloupec stránky */}
      <Box sx={{ position: 'relative', width: WIDE_W, maxWidth: '100%', mx: 'auto', pb: 6 }}>
        <Header />
        <Outlet />
      </Box>
    </Box>
  )
}
