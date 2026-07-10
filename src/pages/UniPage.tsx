import { Box, Stack, Typography } from '@mui/material'
import SectionCard from '../components/common/SectionCard'
import TwoMonthsFreeBanner from '../components/common/TwoMonthsFreeBanner'
import ContactBlock from '../components/common/ContactBlock'
import DecorLines from '../components/common/DecorLines'
import Footer from '../components/layout/Footer'
import { CONTENT_W } from '../theme/layout'
import { UNI } from '../data/content'

// Univerzální šablona podstránky – nadpis + dlouhý text + banner + kontakt + patička
export default function UniPage() {
  return (
    <Box data-testid="page-uni">
      <Box sx={{ maxWidth: CONTENT_W, mx: 'auto', py: 4 }}>
        {/* Vlnité čáry za horní částí karty – prosvítají v okrajích */}
        <Box sx={{ position: 'relative' }}>
        <DecorLines sx={{ top: 110 }} />
        <SectionCard sx={{ bgcolor: '#F5F5F5', position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" sx={{ mb: 4 }}>{UNI.title}</Typography>
          <Stack spacing={2.5}>
            {UNI.paragraphs.map((p, i) => (
              <Typography key={i} sx={{ fontSize: 18, lineHeight: 1.7 }}>{p}</Typography>
            ))}
          </Stack>
        </SectionCard>
        </Box>
        <TwoMonthsFreeBanner />
        <ContactBlock />
      </Box>
      <Footer />
    </Box>
  )
}
