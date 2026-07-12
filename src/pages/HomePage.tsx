import { Box, Grid, Stack, Typography } from '@mui/material'
import HeroSection from '../components/common/HeroSection'
import HowItWorks from '../components/common/HowItWorks'
import DecorLines from '../components/common/DecorLines'
import TryForFreeForm from '../components/common/TryForFreeForm'
import Footer from '../components/layout/Footer'
import { CONTENT_W, CARD_R_SM } from '../theme/layout'
import { PROBLEMS } from '../data/content'

// Domovská stránka – hero, jak to funguje, 6 problémů, formulář, CTA + patička
export default function HomePage() {
  return (
    <Box data-testid="page-home">
      {/* Obsahový sloupec 1364 px */}
      <Box sx={{ maxWidth: CONTENT_W, mx: 'auto' }}>
        {/* HERO – text + ruka s telefonem + animované recenze */}
        <HeroSection />

        {/* Dekorační pás vlnitých čar – celý, bez ořezu (full-bleed 100vw).
            zIndex 1 = leží nad rukou z hero (ruka má zIndex 0), takže vlny prosvítají přes její spodek. */}
        <Box sx={{ position: 'relative', zIndex: 1, height: { xs: 100, md: 160 }, mt: 4 }}>
          <DecorLines sx={{ top: 0 }} />
        </Box>

        {/* JAK TO FUNGUJE – vytažené nahoru přes pás (zIndex 2), takže pás prosvítá za jeho horní částí */}
        <Box sx={{ position: 'relative', zIndex: 2, mt: { xs: -6, md: -12 }, mb: '200px' }}>
          <HowItWorks />
        </Box>

        {/* 6 PROBLÉMŮ – mřížka 3×2 barevných karet (400×400, mezera ~18px) */}
        <Stack spacing={8} sx={{ alignItems: 'center', mb: '350px' }}>
          <Typography variant="h1" sx={{ color: '#fff', textAlign: 'center', maxWidth: 820 }}>
            6 problémů, které s námi vyřešíte
          </Typography>
          <Grid container spacing={2.25} sx={{ maxWidth: 1240, justifyContent: 'center' }}>
            {PROBLEMS.map((p) => (
              <Grid size={4} key={p.title}>
                <Box sx={{ bgcolor: p.color, borderRadius: CARD_R_SM, p: 8, height: 400, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ mb: 2, textDecoration: 'underline' }}>{p.title}</Typography>
                  <Typography sx={{ fontSize: 18, lineHeight: '30px', maxWidth: '292px' }}>{p.text}</Typography>
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
