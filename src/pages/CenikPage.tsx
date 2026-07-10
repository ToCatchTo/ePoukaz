import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SectionCard from '../components/common/SectionCard'
import TwoMonthsFreeBanner from '../components/common/TwoMonthsFreeBanner'
import TryForFreeForm from '../components/common/TryForFreeForm'
import DecorLines from '../components/common/DecorLines'
import Footer from '../components/layout/Footer'
import { CONTENT_W } from '../theme/layout'
import { CENIK_HEAD, PRICING, COMPARE_ROWS, SMS_NOTE } from '../data/content'

// Mapa akcentní barvy tarifu na hex
const ACCENT: Record<string, string> = { black: '#000000', purple: '#4200D8', teal: '#00C7BF' }

export default function CenikPage() {
  return (
    <Box data-testid="page-cenik">
      {/* Obsahový sloupec 1364 px */}
      <Box sx={{ maxWidth: CONTENT_W, mx: 'auto' }}>
        {/* Světlá karta s tarify a tabulkou (#F5F5F5) + vlnité čáry za horní částí */}
        <Box sx={{ position: 'relative', mt: 4 }}>
        <DecorLines sx={{ top: 110 }} />
        <SectionCard sx={{ bgcolor: '#F5F5F5', position: 'relative', zIndex: 1 }}>
          {/* Nadpis */}
          <Stack spacing={2} sx={{ textAlign: 'center', mb: 6, alignItems: 'center' }}>
            <Typography variant="h3">{CENIK_HEAD.title}</Typography>
            <Typography sx={{ fontSize: 18, maxWidth: 720 }}>{CENIK_HEAD.subtitle}</Typography>
          </Stack>

          {/* 3 tarify (370×583, mezera ~30px) */}
          <Grid container spacing={3.75} sx={{ justifyContent: 'center' }}>
            {PRICING.map((p) => (
              <Grid size={4} key={p.name}>
                <Box sx={{ bgcolor: '#fff', borderRadius: '40px', p: 4, height: '100%',
                           boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                           border: p.highlighted ? `2px solid ${ACCENT.purple}` : '1px solid #eee' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 20, color: ACCENT[p.accent], mb: 1 }}>{p.name}</Typography>
                  <Typography sx={{ fontSize: 64, fontWeight: 500, color: ACCENT[p.accent], lineHeight: 1.1 }}>{p.price}</Typography>
                  <Typography sx={{ fontSize: 11, color: '#939393', mb: 3 }}>{p.note}</Typography>
                  <Stack spacing={1} sx={{ mb: 4 }}>
                    {p.features.map((f) => <Typography key={f} sx={{ fontSize: 16 }}>{f}</Typography>)}
                  </Stack>
                  <Button fullWidth variant="contained"
                          color={p.accent === 'teal' ? 'secondary' : 'primary'}
                          sx={{ color: '#fff', py: 1.5 }}>
                    {p.cta}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Srovnávací tabulka „Nástroje" */}
          <Box sx={{ mt: 8 }}>
            <Grid container sx={{ py: 1.5, borderBottom: '2px solid #000' }}>
              <Grid size={6}><Typography variant="h4">Nástroje</Typography></Grid>
              <Grid size={2} sx={{ textAlign: 'center' }}><Typography sx={{ fontWeight: 700, fontSize: 20 }}>Start</Typography></Grid>
              <Grid size={2} sx={{ textAlign: 'center' }}><Typography sx={{ fontWeight: 700, fontSize: 20, color: ACCENT.purple }}>Pro</Typography></Grid>
              <Grid size={2} sx={{ textAlign: 'center' }}><Typography sx={{ fontWeight: 700, fontSize: 20, color: ACCENT.teal }}>Premium</Typography></Grid>
            </Grid>
            {COMPARE_ROWS.map((r) => (
              <Grid container key={r.label} sx={{ py: 1.5, borderBottom: '1px solid #e6e6e6', alignItems: 'center' }}>
                <Grid size={6}><Typography sx={{ color: '#5A5A5A', fontSize: 18 }}>{r.label}</Typography></Grid>
                <Grid size={2} sx={{ textAlign: 'center' }}>{r.start && <CheckCircleIcon sx={{ color: '#000' }} />}</Grid>
                <Grid size={2} sx={{ textAlign: 'center' }}>{r.pro && <CheckCircleIcon sx={{ color: ACCENT.purple }} />}</Grid>
                <Grid size={2} sx={{ textAlign: 'center' }}>{r.premium && <CheckCircleIcon sx={{ color: ACCENT.teal }} />}</Grid>
              </Grid>
            ))}
          </Box>
        </SectionCard>
        </Box>

        {/* SMS poznámka – bílý text na fialové */}
        <Typography sx={{ color: '#fff', fontSize: 18, my: 5, lineHeight: 1.7 }}>{SMS_NOTE}</Typography>

        <TwoMonthsFreeBanner />
        <TryForFreeForm />
      </Box>

      {/* CTA + patička jako jedna karta */}
      <Footer withCta />
    </Box>
  )
}
