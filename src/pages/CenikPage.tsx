import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SectionCard from '../components/common/SectionCard'
import TwoMonthsFreeBanner from '../components/common/TwoMonthsFreeBanner'
import TryForFreeForm from '../components/common/TryForFreeForm'
import CtaBanner from '../components/common/CtaBanner'
import { CENIK_HEAD, PRICING, COMPARE_ROWS, SMS_NOTE } from '../data/content'

// Mapa akcentní barvy tarifu na hex
const ACCENT: Record<string, string> = { black: '#000000', purple: '#4200D8', teal: '#00C7BF' }

export default function CenikPage() {
  return (
    <Box data-testid="page-cenik">
      <SectionCard sx={{ my: 4 }}>
        {/* Nadpis */}
        <Stack spacing={2} sx={{ textAlign: 'center', mb: 5, alignItems: 'center' }}>
          <Typography variant="h3">{CENIK_HEAD.title}</Typography>
          <Typography sx={{ fontSize: 18, maxWidth: 720 }}>{CENIK_HEAD.subtitle}</Typography>
        </Stack>

        {/* 3 tarify */}
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {PRICING.map((p) => (
            <Grid size={4} key={p.name}>
              <Box sx={{ bgcolor: '#fff', borderRadius: 6, p: 4, boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                         border: p.highlighted ? `2px solid ${ACCENT.purple}` : '1px solid #eee' }}>
                <Typography sx={{ fontWeight: 700, color: ACCENT[p.accent] }}>{p.name}</Typography>
                <Typography sx={{ fontSize: 64, fontWeight: 500, color: ACCENT[p.accent] }}>{p.price}</Typography>
                <Typography sx={{ fontSize: 11, color: '#939393', mb: 2 }}>{p.note}</Typography>
                <Stack spacing={0.5} sx={{ mb: 3 }}>
                  {p.features.map((f) => <Typography key={f} sx={{ fontSize: 16 }}>{f}</Typography>)}
                </Stack>
                <Button fullWidth variant="contained"
                        color={p.accent === 'teal' ? 'secondary' : 'primary'}
                        sx={{ color: '#fff' }}>
                  {p.cta}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Srovnávací tabulka „Nástroje" */}
        <Box sx={{ mt: 6 }}>
          <Grid container sx={{ py: 1, borderBottom: '2px solid #000' }}>
            <Grid size={6}><Typography variant="h4">Nástroje</Typography></Grid>
            <Grid size={2} sx={{ textAlign: 'center' }}><Typography sx={{ fontWeight: 700 }}>Start</Typography></Grid>
            <Grid size={2} sx={{ textAlign: 'center' }}><Typography sx={{ fontWeight: 700, color: ACCENT.purple }}>Pro</Typography></Grid>
            <Grid size={2} sx={{ textAlign: 'center' }}><Typography sx={{ fontWeight: 700, color: ACCENT.teal }}>Premium</Typography></Grid>
          </Grid>
          {COMPARE_ROWS.map((r) => (
            <Grid container key={r.label} sx={{ py: 1, borderBottom: '1px solid #eee', alignItems: 'center' }}>
              <Grid size={6}><Typography sx={{ color: '#5A5A5A' }}>{r.label}</Typography></Grid>
              <Grid size={2} sx={{ textAlign: 'center' }}>{r.start && <CheckCircleIcon sx={{ color: '#000' }} />}</Grid>
              <Grid size={2} sx={{ textAlign: 'center' }}>{r.pro && <CheckCircleIcon sx={{ color: ACCENT.purple }} />}</Grid>
              <Grid size={2} sx={{ textAlign: 'center' }}>{r.premium && <CheckCircleIcon sx={{ color: ACCENT.teal }} />}</Grid>
            </Grid>
          ))}
        </Box>
      </SectionCard>

      {/* SMS poznámka – bílý text na fialové */}
      <Typography sx={{ color: '#fff', fontSize: 16, my: 4 }}>{SMS_NOTE}</Typography>

      <TwoMonthsFreeBanner />
      <TryForFreeForm />
      <CtaBanner />
    </Box>
  )
}
