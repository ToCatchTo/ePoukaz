import { Box, Stack, Typography } from '@mui/material'
import SectionCard from '../components/common/SectionCard'
import TwoMonthsFreeBanner from '../components/common/TwoMonthsFreeBanner'
import ContactBlock from '../components/common/ContactBlock'
import DecorLines from '../components/common/DecorLines'
import Footer from '../components/layout/Footer'
import { CONTENT_W } from '../theme/layout'
import { UNI } from '../data/content'

// Mezinadpis = řetězec psaný celý VELKÝMI písmeny (vysází se tučně a s odsazením)
const isHeading = (s: string) => s === s.toUpperCase()

// Univerzální šablona podstránky (Desktop_UNI) – nadpis + obchodní podmínky,
// banner „2 měsíce ZDARMA" a kontakt spojený s patičkou do jedné karty.
export default function UniPage() {
  return (
    <Box data-testid="page-uni">
      <Box sx={{ maxWidth: CONTENT_W, mx: 'auto', py: 4 }}>
        {/* Karta s nadpisem a obchodními podmínkami – vlnité čáry prosvítají v okrajích */}
        <Box sx={{ position: 'relative' }}>
          <DecorLines sx={{ top: 110 }} />
          <SectionCard sx={{ bgcolor: '#F5F5F5', position: 'relative', zIndex: 1 }}>
            <Typography variant="h3" sx={{ mb: 6, textAlign: 'center' }}>{UNI.title}</Typography>
            <Stack spacing={2}>
              {UNI.paragraphs.map((p, i) =>
                isHeading(p) ? (
                  <Typography key={i} sx={{ fontWeight: 700, fontSize: 18, mt: i === 0 ? 0 : 3 }}>{p}</Typography>
                ) : (
                  <Typography key={i} sx={{ fontSize: 18, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{p}</Typography>
                ),
              )}
            </Stack>
          </SectionCard>
        </Box>

        <TwoMonthsFreeBanner />
      </Box>

      {/* Kontakt spojený s patičkou do jedné bílé karty (dle XD Desktop_UNI) */}
      <Footer topContent={<ContactBlock />} />
    </Box>
  )
}
