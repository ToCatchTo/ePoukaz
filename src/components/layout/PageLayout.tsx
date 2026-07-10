import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'

// Obal všech stránek – fialové pozadí + centrovaný obsah.
// Footer se doplní v Tasku 6.
export default function PageLayout() {
  return (
    <Box sx={{ bgcolor: 'primary.main', minHeight: '100vh', pb: 8 }}>
      <Box sx={{ width: 1200, mx: 'auto' }}>
        <Header />
        <Outlet />
      </Box>
      {/* zde bude <Footer/> */}
    </Box>
  )
}
