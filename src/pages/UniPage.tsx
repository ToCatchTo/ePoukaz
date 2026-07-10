import { Box, Stack, Typography } from '@mui/material'
import SectionCard from '../components/common/SectionCard'
import TwoMonthsFreeBanner from '../components/common/TwoMonthsFreeBanner'
import ContactBlock from '../components/common/ContactBlock'
import { UNI } from '../data/content'

// Univerzální šablona podstránky – nadpis + dlouhý text + banner + kontakt
export default function UniPage() {
  return (
    <Box data-testid="page-uni" sx={{ py: 4 }}>
      <SectionCard>
        <Typography variant="h3" sx={{ mb: 3 }}>{UNI.title}</Typography>
        <Stack spacing={2}>
          {UNI.paragraphs.map((p, i) => (
            <Typography key={i} sx={{ fontSize: 16 }}>{p}</Typography>
          ))}
        </Stack>
      </SectionCard>
      <TwoMonthsFreeBanner />
      <ContactBlock />
    </Box>
  )
}
