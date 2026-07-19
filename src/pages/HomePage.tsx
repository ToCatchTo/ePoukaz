import { Box, Stack, Typography } from '@mui/material'
import HeroSection from '../components/common/HeroSection'
import HowItWorks from '../components/common/HowItWorks'
import DecorLines from '../components/common/DecorLines'
import TryForFreeForm from '../components/common/TryForFreeForm'
import Footer from '../components/layout/Footer'
import { CARD_R_SM } from '../theme/layout'
import { fluid } from '../theme/fluid'
import { PAGE_PX } from '../theme/grid'
import { PROBLEMS } from '../data/content'

// Domovská stránka – hero, jak to funguje, 6 problémů, formulář, CTA + patička.
// Header, hero, „jak to funguje" a patička jsou zarovnané na grid (GridSection = margin ≥ 1 sloupec).
// Karty 6 problémů a formulář nejsou dělané podle gridu – jsou jen centrované (margin ≥ 1 sloupec přes PAGE_PX).
export default function HomePage() {
  return (
    <Box data-testid="page-home">
      {/* HERO – text + ruka s telefonem + animované recenze (grid „content") */}
      <HeroSection />

      {/* Dekorační pás vlnitých čar – celý, bez ořezu (full-bleed 100vw).
          zIndex 1 = leží nad rukou z hero (ruka má zIndex 0), takže vlny prosvítají přes její spodek. */}
      <Box sx={{ position: 'relative', zIndex: 1, height: { xs: 100, xl: 160 }, mt: fluid(48, 100), display: { xl: 'unset', xs: 'none' } }}>
        <DecorLines sx={{ top: 50 }} />
      </Box>

      {/* JAK TO FUNGUJE – vytažené nahoru přes pás (zIndex 2), takže pás prosvítá jen za jeho horní/bočními okraji (grid „content").
          Na desktopu (xl) záporný margin = karta překryje horní část pásu, aby pás nevyčníval do hero sekce.
          Pod xl (naskládané hero) je pás skrytý (hero má vlastní dekor), proto tam jen kladná mezera. */}
      <Box sx={{ position: 'relative', zIndex: 2, mt: { xs: '80px', xl: '170px' }, mb: fluid(120, 200) }}>
        <HowItWorks />
      </Box>

      {/* 6 PROBLÉMŮ – centrované (ne grid), boční margin ≥ 1 sloupec přes PAGE_PX */}
      <Box sx={{ px: { sm: PAGE_PX, xs: '25px' } }}>
        {/* na desktopu mřížka 3×2 (karty do 400 px), na mobilu 1 sloupec plné šířky */}
        <Stack spacing={{ xs: 5, lg: 8 }} sx={{ alignItems: 'center', mb: fluid(120, 350) }}>
          <Typography variant="h1" sx={{ color: '#fff', textAlign: 'center', maxWidth: 820, mb: fluid(30, 0) + ' !important' }}>
            6 problémů, které s námi vyřešíte
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 400px))' },
              gap: { xs: 2.5, lg: '18px' },
              justifyContent: 'center',
              width: '100%',
              px: '10px'
            }}
          >
            {PROBLEMS.map((p) => (
              <Box
                key={p.title}
                sx={{ bgcolor: p.color, borderRadius: CARD_R_SM, p: fluid(28, 50), width: '100%', minHeight: { xs: 210, lg: 400 }, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography variant="h4" sx={{ mb: fluid(18, 30), textDecoration: 'underline' }}>{p.title}</Typography>
                <Typography sx={{ fontSize: fluid(14, 18), lineHeight: 1.6, maxWidth: 292 }}>{p.text}</Typography>
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>

      {/* Formulář „30 dní zdarma" – centrovaný, vlastní boční margin */}
      <TryForFreeForm />

      {/* CTA + patička jako jedna karta (grid „wide" = 1640 px) */}
      <Box sx={{ mt: '315px' }}>
        <Footer withCta />
      </Box>
    </Box>
  )
}
