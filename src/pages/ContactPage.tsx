import { Box } from '@mui/material'
import ContactBlock from '../components/common/ContactBlock'
import Footer from '../components/layout/Footer'

// Stránka Kontakt – kontaktní blok spojený s patičkou do jedné bílé karty (s vlnitými čarami v okrajích)
export default function ContactPage() {
  return (
    <Box data-testid="page-kontakt">
      <Footer topContent={<ContactBlock />} />
    </Box>
  )
}
