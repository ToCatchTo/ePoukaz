import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SectionCard from '../components/common/SectionCard'
import CircleArrowButton from '../components/common/CircleArrowButton'
import DecorLines from '../components/common/DecorLines'
import TryForFreeForm from '../components/common/TryForFreeForm'
import Footer from '../components/layout/Footer'
import { CONTENT_W, CARD_R_SM } from '../theme/layout'
import { HERO, TESTIMONIALS, HOW_STEPS, PROBLEMS } from '../data/content'

// Domovská stránka – hero, jak to funguje, 6 problémů, formulář, CTA + patička
export default function HomePage() {
  return (
    <Box data-testid="page-home">
      {/* Obsahový sloupec 1364 px */}
      <Box sx={{ maxWidth: CONTENT_W, mx: 'auto' }}>
        {/* HERO */}
        <Grid container spacing={6} sx={{ py: 4, alignItems: 'center' }}>
          <Grid size={6}>
            <Stack spacing={4}>
              <Typography variant="h1" sx={{ color: '#fff' }}>{HERO.title}</Typography>
              <Typography sx={{ color: '#fff', fontSize: 20, lineHeight: 1.6 }}>{HERO.paragraph}</Typography>
              <Button
                variant="contained"
                color="secondary"
                endIcon={<ArrowForwardIcon />}
                sx={{ color: '#fff', alignSelf: 'flex-start', px: 4, py: 1.5, fontSize: 18 }}
              >
                {HERO.cta}
              </Button>
            </Stack>
          </Grid>
          {/* Placeholder telefonu + recenzní bublinky */}
          <Grid size={6}>
            <Box sx={{ height: 420, bgcolor: 'rgba(255,255,255,0.15)', borderRadius: CARD_R_SM, mb: 3 }}
                 aria-label="placeholder telefon" />
            <Stack spacing={2}>
              {TESTIMONIALS.map((t) => (
                <Box key={t.name} sx={{ bgcolor: '#fff', borderRadius: '24px', p: 2.5 }}>
                  <Stack direction="row" spacing={0.5} sx={{ mb: 0.5 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#FFE346', fontSize: 16 }} />
                    ))}
                  </Stack>
                  <Typography sx={{ color: 'primary.main', fontSize: 16, fontWeight: 500 }}>{t.name}</Typography>
                  <Typography sx={{ color: '#939393', fontSize: 13 }}>{t.role}</Typography>
                  <Typography sx={{ fontSize: 14, mt: 0.5 }}>„{t.quote}"</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Viditelný pás vlnitých čar – přechod pod hero.
            Full-bleed (100vw) s ořezem na výšku, aby nepřetékal do hero ani do karty. */}
        <Box sx={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: '100vw', height: 190, overflow: 'hidden', my: 6 }}>
          <DecorLines sx={{ top: -100, left: 0, transform: 'none' }} />
        </Box>

        {/* JAK TO FUNGUJE – accordion 8 kroků + placeholder mockupu */}
        <SectionCard id="jak-to-funguje" sx={{ my: 8 }}>
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={6}>
              <Stack divider={<Box sx={{ borderBottom: '1px solid #eee' }} />} spacing={0}>
                {HOW_STEPS.map((s) => (
                  <Grid container key={s.title} spacing={2} sx={{ alignItems: 'center', py: 2 }}>
                    <Grid size="grow">
                      <Typography variant="h5">{s.title}</Typography>
                    </Grid>
                    <Grid size="auto"><CircleArrowButton /></Grid>
                  </Grid>
                ))}
              </Stack>
            </Grid>
            <Grid size={6}>
              <Box sx={{ height: 640, bgcolor: '#1b1b1b', borderRadius: CARD_R_SM }} aria-label="placeholder chat mockup" />
            </Grid>
          </Grid>
        </SectionCard>

        {/* 6 PROBLÉMŮ – mřížka 3×2 barevných karet (400×400, mezera ~18px) */}
        <Stack spacing={6} sx={{ py: 8, alignItems: 'center' }}>
          <Typography variant="h1" sx={{ color: '#fff', textAlign: 'center' }}>
            6 problémů, které s námi vyřešíte
          </Typography>
          <Grid container spacing={2.25} sx={{ maxWidth: 1240, justifyContent: 'center' }}>
            {PROBLEMS.map((p) => (
              <Grid size={4} key={p.title}>
                <Box sx={{ bgcolor: p.color, borderRadius: CARD_R_SM, p: 4, minHeight: 360, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ mb: 2, textDecoration: 'underline' }}>{p.title}</Typography>
                  <Typography sx={{ fontSize: 18, lineHeight: 1.6 }}>{p.text}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>

        {/* Formulář „30 dní zdarma" */}
        <TryForFreeForm />
      </Box>

      {/* CTA + patička jako jedna karta (1640 px) */}
      <Footer withCta />
    </Box>
  )
}
