import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

// Obal všech stránek – fialové pozadí + centrovaný obsah.
export default function PageLayout() {
  return (
    <Box sx={{ bgcolor: 'primary.main', minHeight: '100vh', pb: 8 }}>
      <Box sx={{ width: 1200, mx: 'auto' }}>
        <Header />
        <Outlet />
        <Footer />
      </Box>
    </Box>
  )
}
