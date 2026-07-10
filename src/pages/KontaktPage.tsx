import { Box } from '@mui/material'
import ContactBlock from '../components/common/ContactBlock'

// Stránka Kontakt – jen kontaktní blok (patičku dodává PageLayout)
export default function KontaktPage() {
  return (
    <Box data-testid="page-kontakt" sx={{ py: 4 }}>
      <ContactBlock />
    </Box>
  )
}
