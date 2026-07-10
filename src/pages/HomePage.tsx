import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import SectionCard from '../components/common/SectionCard'
import CircleArrowButton from '../components/common/CircleArrowButton'
import WavePattern from '../components/common/WavePattern'
import TryForFreeForm from '../components/common/TryForFreeForm'
import CtaBanner from '../components/common/CtaBanner'
import { HERO, TESTIMONIALS, HOW_STEPS, PROBLEMS } from '../data/content'

// Domovská stránka – hero, jak to funguje, 6 problémů, formulář, CTA
export default function HomePage() {
  return (
    <Box data-testid="page-home">
      {/* HERO */}
      <Grid container spacing={4} sx={{ py: 6 }}>
        <Grid size={6}>
          <Stack spacing={4}>
            <Typography variant="h1" sx={{ color: '#fff' }}>{HERO.title}</Typography>
            <Typography sx={{ color: '#fff', fontSize: 20 }}>{HERO.paragraph}</Typography>
            <Button variant="contained" color="secondary" sx={{ color: '#fff', alignSelf: 'flex-start', px: 4, py: 1.5 }}>
              {HERO.cta}
            </Button>
          </Stack>
        </Grid>
        {/* Placeholder telefonu + recenzní bublinky */}
        <Grid size={6}>
          <Box sx={{ height: 360, bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 6, mb: 2 }}
               aria-label="placeholder telefon" />
          <Stack spacing={1.5}>
            {TESTIMONIALS.map((t) => (
              <Box key={t.name} sx={{ bgcolor: '#fff', borderRadius: 3, p: 2 }}>
                <Stack direction="row" spacing={0.5}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} sx={{ color: '#FFE346', fontSize: 16 }} />
                  ))}
                </Stack>
                <Typography sx={{ color: 'primary.main', fontSize: 16 }}>{t.name}</Typography>
                <Typography sx={{ color: '#939393', fontSize: 13 }}>{t.role}</Typography>
                <Typography sx={{ fontSize: 14 }}>„{t.quote}"</Typography>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>

      <WavePattern sx={{ mb: 4 }} />

      {/* JAK TO FUNGUJE – accordion 8 kroků + placeholder mockupu */}
      <SectionCard id="jak-to-funguje" sx={{ my: 4 }}>
        <Grid container spacing={4}>
          <Grid size={6}>
            <Stack divider={<Box sx={{ borderBottom: '1px solid #eee' }} />} spacing={2}>
              {HOW_STEPS.map((s) => (
                <Grid container key={s.title} spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid size="grow">
                    <Typography variant="h5">{s.title}</Typography>
                  </Grid>
                  <Grid size="auto"><CircleArrowButton /></Grid>
                </Grid>
              ))}
            </Stack>
          </Grid>
          <Grid size={6}>
            <Box sx={{ height: 520, bgcolor: '#1b1b1b', borderRadius: 6 }} aria-label="placeholder chat mockup" />
          </Grid>
        </Grid>
      </SectionCard>

      {/* 6 PROBLÉMŮ – mřížka 3×2 barevných karet */}
      <Stack spacing={5} sx={{ py: 8, alignItems: 'center' }}>
        <Typography variant="h1" sx={{ color: '#fff', textAlign: 'center' }}>
          6 problémů, které s námi vyřešíte
        </Typography>
        <Grid container spacing={3}>
          {PROBLEMS.map((p) => (
            <Grid size={4} key={p.title}>
              <Box sx={{ bgcolor: p.color, borderRadius: 6, p: 4, height: '100%',
                         border: '2px solid rgba(0,0,0,0.15)' }}>
                <Typography variant="h4" sx={{ mb: 2, textDecoration: 'underline' }}>{p.title}</Typography>
                <Typography sx={{ fontSize: 18 }}>{p.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>

      <TryForFreeForm />
      <CtaBanner />
    </Box>
  )
}
