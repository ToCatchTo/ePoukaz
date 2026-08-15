import { Box, Stack, Typography } from '@mui/material'
import HeroSection from '../components/common/HeroSection'
import HowItWorks from '../components/common/HowItWorks'
import DecorLines from '../components/common/DecorLines'
import MainFeatures from '../components/common/MainFeatures'
import Footer from '../components/layout/Footer'
import { CARD_R_SM, HERO_SPLIT, SPLIT_UP } from '../theme/layout'
import { fluid } from '../theme/fluid'
import { PAGE_PX } from '../theme/grid'
import { PROBLEMS } from '../data/content'
import { Seo } from '../components/common/Seo'
import { SEO } from '../data/seo'

// Stránka „Pro výdejny" – hero, jak to funguje, 6 problémů, hlavní funkce, CTA + patička.
// Hero, „jak to funguje" a patička jsou zarovnané na grid; karty 6 problémů jsou pouze centrované (PAGE_PX).
export default function ProVydejnyPage() {
  return (
    <Box data-testid="page-home">
      <Seo path="/pro-vydejny" title={SEO['/pro-vydejny'].title} description={SEO['/pro-vydejny'].description} />
      {/* Preload LCP obrázku hera (React 19 hoistne <link> do <head>) – hero-phone.webp
          se renderuje jen na téhle stránce, proto preload patří sem, ne do sdíleného <Seo>. */}
      <link rel="preload" as="image" href="/images/hero-phone.webp" />
      {/* Hero – text, ruka s telefonem a animované recenze */}
      <HeroSection />

      {/* <Box sx={{ position: 'relative', zIndex: 1, height: 170, mt: fluid(48, 100), display: 'none', '@media (min-width:900px)': { height: 160, display: 'unset' } }}>
        <DecorLines sx={{ top: 50 }} />
      </Box> */}

      {/* Jak to funguje – vytažené nahoru přes dekorační pás (zIndex 2), aby pás prosvítal jen za okraji.
          Na desktopu (≥ HERO_SPLIT) záporný margin překryje horní část pásu; pod HERO_SPLIT je pás skrytý. */}
      <Box sx={{ position: 'relative', zIndex: 2, mt: { xs: '80px', md: '-5px' }, [SPLIT_UP]: { mt: fluid(100, 220, HERO_SPLIT, 1920) }, mb: fluid(120, 200) }}>
        <DecorLines sx={{ top: fluid(-100, -120, HERO_SPLIT, 1920), zIndex: -1, display: 'none', '@media (min-width:900px)': { display: 'unset' } }} />
        <HowItWorks />
      </Box>

      {/* 6 problémů – centrované (PAGE_PX) */}
      <Box sx={{ px: { ...PAGE_PX, xs: '25px' } }}>
        {/* Desktop: mřížka 3×2 (karty do 400 px); mobil: 1 sloupec plné šířky */}
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

      {/* Sekce „Hlavní funkce" – centrovaná, vlastní boční margin */}
      <MainFeatures />

      {/* CTA + patička jako jedna karta */}
      <Box sx={{ mt: '315px' }}>
        <Footer withCta />
      </Box>
    </Box>
  )
}
