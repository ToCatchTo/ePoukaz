import { Box, Button, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { HERO, TESTIMONIALS } from '../../data/content'

// Recenze dohledáme podle jména (data z TESTIMONIALS)
const byName = Object.fromEntries(TESTIMONIALS.map((t) => [t.name, t]))

// Pozice recenzí kolem ruky + pořadí (delay) postupného fade-in po načtení stránky.
// zIndex: -1 = karta je ZA rukou (vykukuje zpoza telefonu), zIndex 2 = PŘED rukou.
const REVIEWS = [
  { name: 'Gábina', delay: '0.15s', pos: { left: { md: '39%' }, top: { md: 336 }, zIndex: -1 } },
  { name: 'Eliška', delay: '0.4s', pos: { right: { md: '6%' }, top: { md: 110 }, zIndex: -1 } },
  { name: 'Jarmila', delay: '0.65s', pos: { right: { md: '3.5%' }, top: { md: 430 }, zIndex: 2 } },
] as const

// Nadpis se zalomí až po slově „sobě" (dle XD): 1. řádek „Šetřete čas sobě", 2. řádek „i pacientům"
const TITLE_BREAK_AFTER = 'sobě'
const titleBreakIdx = HERO.title.indexOf(TITLE_BREAK_AFTER)
const TITLE_LINE_1 =
  titleBreakIdx === -1 ? HERO.title : HERO.title.slice(0, titleBreakIdx + TITLE_BREAK_AFTER.length)
const TITLE_LINE_2 =
  titleBreakIdx === -1 ? '' : HERO.title.slice(titleBreakIdx + TITLE_BREAK_AFTER.length).trim()

// Tučný úvod odstavce dle XD (odstavec začíná přesně touto větou)
const BOLD_LEAD = 'Digitalizujte příjem a správu elektronických ePoukazů'
const REST_PARAGRAPH = HERO.paragraph.startsWith(BOLD_LEAD)
  ? HERO.paragraph.slice(BOLD_LEAD.length)
  : HERO.paragraph

// Plovoucí karta recenze s postupným fade-in (opacity 0 → 1)
function ReviewCard({ name, delay, pos }: { name: string; delay: string; pos: object }) {
  const t = byName[name]
  if (!t) return null
  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2,
        width: 260,
        height: 220,
        bgcolor: '#fff',
        borderRadius: '56px',
        p: 2.5,
        textAlign: 'center',
        boxShadow: '0 24px 48px rgba(0,0,0,0.14)',
        opacity: 0,
        animation: 'heroReviewIn 1s ease forwards',
        animationDelay: delay,
        '@keyframes heroReviewIn': {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        // Přístupnost – bez pohybu se karty jen zobrazí
        '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 1 },
        ...pos,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.25, mb: 0.75 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} sx={{ color: '#FFB400', fontSize: 18 }} />
        ))}
      </Box>
      <Typography sx={{ color: 'primary.main', fontWeight: 400, fontSize: 16 }}>{t.name}</Typography>
      <Typography sx={{ color: '#9A9A9A', fontSize: 12, mb: 1 }}>{t.role}</Typography>
      <Typography sx={{ fontSize: 13, lineHeight: 1.5, maxWidth: 185 }}>„{t.quote}"</Typography>
    </Box>
  )
}

// HERO sekce – vlevo text, vpravo ruka s telefonem (přetéká dolů za dekoraci a další sekci)
// a plovoucí animované recenze. Displej telefonu má „slot" připravený na budoucí video.
export default function HeroSection() {
  return (
    // zIndex 0 = vlastní stacking context, aby recenze se zIndex -1 zůstaly ZA rukou, ale nespadly za fialové pozadí stránky
    <Box component="section" sx={{ position: 'relative', zIndex: 0, pt: { xs: 2, md: '125px' }, minHeight: { md: 640 } }}>
      {/* LEVÝ SLOUPEC – text (nad vším) */}
      <Box sx={{ position: 'relative', zIndex: 3, maxWidth: { xs: '100%', md: 720 } }}>
        <Typography variant="h1" sx={{ color: '#fff', mb: 4 }}>
          {TITLE_LINE_1}
          {TITLE_LINE_2 && (
            <>
              <br />
              {TITLE_LINE_2}
            </>
          )}
        </Typography>
        <Typography sx={{ color: '#fff', fontSize: 20, lineHeight: 1.6, maxWidth: 470, mb: 6, fontWeight: 300, fontFamily: 'Poppins' }}>
          <span style={{ fontWeight: 500 }}>{BOLD_LEAD}</span>{REST_PARAGRAPH}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<Box component="img" src="/icons/arrow-right.svg" alt="" sx={{ width: 40, height: 40 }} />}
          sx={{ color: '#fff', pl: '30px', pr: '15px', py: 1.5, fontSize: 24, '& .MuiButton-endIcon': { ml: '20px', mr: 0 }, fontWeight: 500 }}
        >
          {HERO.cta}
        </Button>
      </Box>

      {/* PRAVÝ SLOUPEC – ruka s telefonem. zIndex 0 = leží pod dekorací i další sekcí. */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          right: { md: '5%' },
          top: 40,
          height: 860,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Fotka ruky – obsah displeje je zapečený ve fotce. Slot níže je připravený na dynamický obsah. */}
        <Box
          component="img"
          src="/images/hero-phone.png"
          alt="Aplikace ePoukaz online v telefonu"
          sx={{ height: '100%', width: 'auto', display: 'block' }}
        />

        {/* SLOT NA DISPLEJ – mockup appky přehrávaný v loopu.
            Zatím animovaný WebP (/public/videos/hero-screen.webp) – chová se jako ztlumené
            smyčkované video, ale spolehlivě se přehraje všude. Souřadnice v % obrázku
            (jemně dolaď při výměně obsahu). Pro skutečné video stačí místo <img>
            vložit <Box component="video" src="/videos/hero-screen.mp4" autoPlay muted loop playsInline .../>. */}
        <Box
          sx={{
            position: 'absolute',
            left: '14.5%',
            top: '8.6%',
            width: '41%',
            height: '62.8%',
            borderRadius: '38px',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src="/videos/hero-screen.webp"
            alt=""
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
      </Box>

      {/* RECENZE – plovoucí kolem ruky, postupný fade-in. Jen na md+ (na mobilu skryté). */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {REVIEWS.map((r) => (
          <ReviewCard key={r.name} name={r.name} delay={r.delay} pos={r.pos} />
        ))}
      </Box>
    </Box>
  )
}
