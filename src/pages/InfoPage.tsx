import { Box, Typography } from '@mui/material'
import InfoAccordion from '../components/common/InfoAccordion'
import DecorLines from '../components/common/DecorLines'
import VydejnaCtaFooter from '../components/common/VydejnaCtaFooter'
import GridSection from '../components/layout/GridSection'
import { fluid } from '../theme/fluid'

type InfoData = { title: string; items: { title: string; body: string }[] }

// Informační podstránka (Jak to funguje? / Vše o ePoukazu) – nadpis + accordion + patička.
export default function InfoPage({ data }: { data: InfoData }) {
  return (
    <Box data-testid="page-info">
      <GridSection>
        <Typography variant="h2" sx={{ color: '#fff', textAlign: 'center', mt: fluid(60, 139), mb: fluid(60, 168), fontSize: fluid(28, 42) }}>
          {data.title}
        </Typography>
      </GridSection>

      <Box sx={{ position: 'relative', mb: fluid(120, 200) }}>
        {/* Decor zIndex 0, karta accordionu zIndex 1 – decor prosvítá v postranních okrajích (jen desktop). */}
        <DecorLines sx={{ top: fluid(-40, -120), display: 'none', '@media (min-width:900px)': { display: 'unset' } }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <InfoAccordion items={data.items} />
        </Box>
      </Box>

      <Box sx={{ mt: fluid(120, 200) }}>
        <VydejnaCtaFooter />
      </Box>
    </Box>
  )
}
