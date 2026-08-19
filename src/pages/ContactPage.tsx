import { Box } from '@mui/material'
import ContactBlock from '../components/common/ContactBlock'
import Footer from '../components/layout/Footer'
import { Seo } from '../components/common/Seo'
import { SEO } from '../data/seo'

// Stránka Kontakt – kontaktní blok spojený s patičkou do jedné bílé karty.
export default function ContactPage() {
  return (
    <Box data-testid="page-contact">
      <Seo path="/kontakt" title={SEO['/kontakt'].title} description={SEO['/kontakt'].description} />
      <Footer topContent={<ContactBlock />} />
    </Box>
  )
}
