import { Box, Button, Typography } from '@mui/material'
import { HERO, TESTIMONIALS } from '../../data/content'
import { fluid, fluidScale, fluidPct } from '../../theme/fluid'
import GridSection from '../layout/GridSection'
import { PAGE_PX } from '../../theme/grid'
import DecorLines from './DecorLines'
import TestimonialsCarousel from './TestimonialsCarousel'

// Recenze dohledáme podle jména (data z TESTIMONIALS)
const byName = Object.fromEntries(TESTIMONIALS.map((t) => [t.name, t]))

// Pozice recenzí kolem ruky + pořadí (delay) postupného fade-in po načtení stránky.
// zIndex: -1 = karta je ZA rukou (vykukuje zpoza telefonu), zIndex 2 = PŘED rukou.
const REVIEWS = [
  { name: 'Gábina', delay: '0.15s', pos: { left: { md: fluidPct(29, 39, 1536, 1920) }, top: { md: 336 }, zIndex: -1 } },
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
      <Box
        component="img"
        src="/icons/stars.svg"
        alt="Hodnocení 5 z 5 hvězdiček"
        sx={{ display: 'block', height: 18, width: 'auto', mb: 0.75 }}
      />
      <Typography sx={{ color: 'primary.main', fontWeight: 400, fontSize: 16 }}>{t.name}</Typography>
      <Typography sx={{ color: '#9A9A9A', fontSize: 12, mb: 1 }}>{t.role}</Typography>
      <Typography sx={{ fontSize: 13, lineHeight: 1.5, maxWidth: 185 }}>„{t.quote}"</Typography>
    </Box>
  )
}

// Rozměry návrhu kompozice pro variantu POD nadpisem (md–lg). Šířka odpovídá kompaktnějšímu
// desktopu, aby se karty daly zmenšit jen mírně (čitelný text) a přitom se vešly.
const COMP_W = 980
const COMP_H = 900

// Sdílený obsah kompozice: ruka s telefonem + tři plovoucí recenze (fade-in animace).
// Prvky jsou position:absolute vůči nejbližšímu pozicovanému rodiči (stage / wrapper níže).
// `gabinaLeft` přepíše pozici karty Gábina (varianta pod nadpisem ji potřebuje víc vlevo,
// aby nezmizela za telefonem – desktop verze si drží svou výchozí pozici).
function HeroComposition({ gabinaLeft }: { gabinaLeft?: string }) {
  const reviews = gabinaLeft
    ? REVIEWS.map((r) => (r.name === 'Gábina' ? { ...r, pos: { ...r.pos, left: { md: gabinaLeft } } } : r))
    : REVIEWS
  return (
    <>
      {/* Ruka s telefonem */}
      <Box sx={{ position: 'absolute', right: '5%', top: 40, height: 860, zIndex: 0 }}>
        {/* Fotka ruky – obsah displeje je zapečený ve fotce. Slot níže je připravený na dynamický obsah. */}
        <Box
          component="img"
          src="/images/hero-phone.png"
          alt="Aplikace ePoukaz online v telefonu"
          sx={{ height: '100%', width: 'auto', display: 'block' }}
        />
        {/* SLOT NA DISPLEJ – animovaný WebP (chová se jako ztlumené smyčkované video).
            Pro skutečné video stačí místo <img> vložit <Box component="video" ... />. */}
        <Box sx={{ position: 'absolute', left: '14.5%', top: '8.6%', width: '41%', height: '62.8%', borderRadius: '38px', overflow: 'hidden' }}>
          <Box component="img" src="/videos/hero-screen.webp" alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </Box>
      </Box>
      {/* RECENZE – plovoucí kolem ruky, postupný fade-in. */}
      {reviews.map((r) => (
        <ReviewCard key={r.name} name={r.name} delay={r.delay} pos={r.pos} />
      ))}
    </>
  )
}

// HERO sekce – vlevo text, vpravo ruka s telefonem (přetéká dolů za dekoraci a další sekci)
// a plovoucí animované recenze. Displej telefonu má „slot" připravený na budoucí video.
export default function HeroSection() {
  return (
    <GridSection>
      {/* zIndex 0 = vlastní stacking context, aby recenze se zIndex -1 zůstaly ZA rukou, ale nespadly za fialové pozadí stránky */}
      <Box component="section" sx={{ position: 'relative', zIndex: 0, pt: { xs: 2, xl: '125px' }, minHeight: { xl: 640 } }}>
        {/* LEVÝ SLOUPEC – text (nad vším). Na desktopu (xl) se pruh mírně zúží (720→560),
            aby měla zmenšující se kompozice telefonu vpravo dost místa a nepřekrývala text. */}
        <Box sx={{ position: 'relative', zIndex: 3, maxWidth: { xs: '100%', xl: fluid(560, 720, 1200, 1920) } }}>
          <Typography variant="h1" sx={{ color: '#fff', mb: fluid(24, 32), ml: '-1px' }}>
            {TITLE_LINE_1}
            {TITLE_LINE_2 && (
              <>
                <br />
                {TITLE_LINE_2}
              </>
            )}
          </Typography>
          <Typography sx={{ color: '#fff', fontSize: fluid(16, 20), lineHeight: 1.6, maxWidth: 470, mb: fluid(40, 48), fontWeight: 300, fontFamily: 'Poppins' }}>
            <span style={{ fontWeight: 500 }}>{BOLD_LEAD}</span>{REST_PARAGRAPH}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<Box component="img" src="/icons/arrow-right.svg" alt="" sx={{ width: fluid(30, 40), height: fluid(30, 40) }} />}
            sx={{ color: '#fff', pl: '30px', pr: '15px', py: 1.5, fontSize: fluid(18, 24), '& .MuiButton-endIcon': { ml: '20px', mr: 0 }, fontWeight: 500, height: fluid(60, 70) }}
          >
            {HERO.cta}
          </Button>
        </Box>

        {/* MOBIL (< md / 900) – ruka s telefonem na vlnitém pozadí + „swipe" recenze */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mt: -3 }}>
          {/* Ruka s telefonem – vlny za ní, spodek ruky (zápěstí) není useknutý, jen ho překryjí recenze */}
          <Box sx={{ position: 'relative', zIndex: 0 }}>
            <DecorLines sx={{ top: '32%' }} />
            <Box
              component="img"
              src="/images/hero-phone.png"
              alt="Aplikace ePoukaz online v telefonu"
              sx={{ position: 'relative', display: 'block', width: 'auto', height: 'auto', maxWidth: { xs: '143%', sm: 500 }, mx: 'auto', pt: '52px' }}
            />
          </Box>
          {/* Recenze vytažené nahoru přes spodek ruky (zIndex 1 = nad rukou);
              záporné boční marginy ruší boční padding stránky, aby carousel dosáhl k oběma okrajům obrazovky */}
          <Box sx={{ position: 'relative', zIndex: 1, mt: { xs: -12 }, mx: { xs: `calc(-1 * ${PAGE_PX.xs})`, sm: `calc(-1 * ${PAGE_PX.sm})` } }}>
            <TestimonialsCarousel />
          </Box>
        </Box>

        {/* 900–1535 (md–lg): stejná kompozice (ruka + plovoucí recenze + animace), ale POD nadpisem.
            Vnitřní box má pevný „design" rozměr (COMP_W×COMP_H), aby se karty vykreslily jako na
            desktopu; vnější wrapper má výšku = design × scale (aby tok pod ním seděl) a vnitřek se
            přes fluidScale zmenší, aby se vešel do dostupné šířky (a text zůstal čitelný). */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block', xl: 'none' },
            position: 'relative',
            width: '100%',
            mt: { md: '-48px' },
            pointerEvents: 'none',
            '--comp-scale': fluidScale(0.72, 0.95, 900, 1535),
            height: `calc(${COMP_H}px * var(--comp-scale))`,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              // posun doleva – responzivně: na 900 px skoro na střed (48 %, aby nepřetekl vlevo),
              // na 1535 px víc doleva (42 %), kde je vpravo víc volného místa
              left: fluidPct(48, 42, 900, 1535),
              width: COMP_W,
              height: COMP_H,
              transformOrigin: 'top center',
              transform: 'translateX(-50%) scale(var(--comp-scale))',
            }}
          >
            <HeroComposition gabinaLeft="14%" />
          </Box>
        </Box>

        {/* DESKTOPOVÁ KOMPOZICE (ruka + plovoucí recenze) jako jedna „stage" vrstva.
            inset:0 → stejný box jako sekce, takže si prvky uvnitř zachovají přesné pozice.
            Celá vrstva se plynule zmenšuje mezi 1920 a 1536 px (origin vpravo uprostřed =
            smršťuje se pryč od textu vlevo), takže telefon nikdy nezasáhne do nadpisu.
            transform vytvoří vlastní stacking context – zIndex karet (−1 za rukou, 2 před) platí uvnitř. */}
        <Box
          sx={{
            display: { xs: 'none', xl: 'block' },
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            // Plynulé zmenšování celé kompozice: scale 1.0 na 1920 px → 0.8 na 1536 px
            // (kompozice je vidět až od xl 1536). fluidScale používá trik tan(atan2()),
            // protože scale() potřebuje bezrozměrné číslo, které z vw nejde získat dělením.
            transformOrigin: '100% 50%',
            transform: `scale(${fluidScale(0.8, 1, 1536, 1920)})`,
            top: fluid(30, 0, 1536, 1920), // posun dolů při zmenšování
          }}
        >
          <HeroComposition />
        </Box>
      </Box>
    </GridSection>
  )
}
