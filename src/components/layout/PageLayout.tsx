import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

// Obal všech stránek – fialové pozadí + centrovaný obsah.
// Header a Footer se doplní v Tascích 5 a 6.
export default function PageLayout() {
  return (
    <Box sx={{ bgcolor: 'primary.main', minHeight: '100vh', pb: 8 }}>
      {/* zde bude <Header/> */}
      <Box sx={{ width: 1200, mx: 'auto' }}>
        <Outlet />
      </Box>
      {/* zde bude <Footer/> */}
    </Box>
  )
}
