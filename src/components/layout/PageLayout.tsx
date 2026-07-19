import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'

// Obal všech stránek – fialové pozadí přes celou šířku. Šířku a boční okraje si každá sekce
// řídí sama přes grid (GridSection = margin 1 sloupec) nebo centrováním (karty problémů, formulář).
// Dekorativní pásy vlnitých čar si vykresluje každá sekce/patička sama (DecorLines) jen tam,
// kde mají být. Patičku si vykresluje každá stránka sama (varianta s/bez CTA), viz Footer.
export default function PageLayout() {
  return (
    <Box sx={{ position: 'relative', bgcolor: 'primary.main', minHeight: '100vh', overflowX: 'hidden', pb: 6 }}>
      <Header />
      <Outlet />
    </Box>
  )
}
