import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'

// Obal všech stránek: fialové pozadí přes celou šířku. Šířku a boční okraje řídí každá sekce
// sama (GridSection nebo centrování). Dekorativní čáry a patičku (varianta s/bez CTA)
// si vykresluje každá sekce/stránka sama.
export default function PageLayout() {
  return (
    <Box sx={{ position: 'relative', bgcolor: 'primary.main', minHeight: '100vh', overflowX: 'hidden', pb: 6 }}>
      <Header />
      <Outlet />
    </Box>
  )
}
