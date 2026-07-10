import { Box } from '@mui/material'
import ContactBlock from '../components/common/ContactBlock'
import DecorLines from '../components/common/DecorLines'
import Footer from '../components/layout/Footer'
import { CONTENT_W } from '../theme/layout'

// Stránka Kontakt – kontaktní blok (s vlnitými čarami v okrajích) + patička (bez CTA)
export default function KontaktPage() {
  return (
    <Box data-testid="page-kontakt">
      <Box sx={{ maxWidth: CONTENT_W, mx: 'auto', py: 6 }}>
        <Box sx={{ position: 'relative' }}>
          <DecorLines sx={{ top: 20 }} />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <ContactBlock />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
