import { Box } from '@mui/material'
import ContactBlock from '../components/common/ContactBlock'
import Footer from '../components/layout/Footer'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

// Stránka Kontakt – kontaktní blok spojený s patičkou do jedné bílé karty.
export default function ContactPage() {
  useDocumentTitle('Kontakt')
  return (
    <Box data-testid="page-kontakt">
      <Footer topContent={<ContactBlock />} />
    </Box>
  )
}
