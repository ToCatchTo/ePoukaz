import { Box } from '@mui/material'
import ContactBlock from '../components/common/ContactBlock'
import Footer from '../components/layout/Footer'
import { CONTENT_W } from '../theme/layout'

// Stránka Kontakt – kontaktní blok + patička (bez CTA)
export default function KontaktPage() {
  return (
    <Box data-testid="page-kontakt">
      <Box sx={{ maxWidth: CONTENT_W, mx: 'auto', py: 6 }}>
        <ContactBlock />
      </Box>
      <Footer />
    </Box>
  )
}
