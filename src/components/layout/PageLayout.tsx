import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { WIDE_W } from '../../theme/layout'

// Obal všech stránek – fialové pozadí přes celou šířku a centrovaný sloupec obsahu (1640 px).
// Dekorativní pásy vlnitých čar si vykresluje každá sekce/patička sama (DecorLines) jen tam,
// kde mají být. Patičku si vykresluje každá stránka sama (varianta s/bez CTA), viz Footer.
export default function PageLayout() {
  return (
    <Box sx={{ position: 'relative', bgcolor: 'primary.main', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Centrovaný sloupec stránky */}
      <Box sx={{ position: 'relative', width: WIDE_W, maxWidth: '100%', mx: 'auto', pb: 6 }}>
        <Header />
        <Outlet />
      </Box>
    </Box>
  )
}
