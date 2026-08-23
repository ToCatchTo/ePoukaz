import { Box, Button, Typography } from '@mui/material'
import { HERO, TESTIMONIALS, REGISTER_URL } from '../../data/content'
import { fluid, fluidScale } from '../../theme/fluid'
import GridSection from '../layout/GridSection'
import { PAGE_PX } from '../../theme/grid'
import { HERO_SPLIT, SPLIT_UP } from '../../theme/layout'
import DecorLines from './DecorLines'
import TestimonialsCarousel from './TestimonialsCarousel'

// Recenze dohledávané podle jména (data z TESTIMONIALS)
const byName = Object.fromEntries(TESTIMONIALS.map((t) => [t.name, t]))

// Pásmo „laptop" (900–1279 px): text obtéká kartu Gábina (varianta C). Nad 1280 je místa dost
// a platí široký layout (nadpis se vejde na 2 řádky, bez obtékání).
const HERO_BAND = '@media (min-width:900px) and (max-width:1279.98px)'

// Zlom „vedle sebe" (HERO_SPLIT / SPLIT_UP) je sdílený v theme/layout – stejný používá i HomePage.

// Pozice recenzí kolem ruky + delay postupného fade-in.
// zIndex -1 = karta je za rukou, zIndex 2 = před rukou.
const REVIEWS = [
  // Recenze i telefon kotveny k pravému okraji, aby při změně šířky nedriftovaly vůči telefonu.
  // Gábina: telefon má right:5% a šířku 607 px (860 × 1284/1818), jeho levý okraj je calc(5% + 607px).
  // Karta ho překrývá o 103 px → right = calc(5% + 504px). Na 1920 odpovídá původnímu left 39 %,
  // ale na užších obrazovkách se už nezasouvá pod telefon.
  { name: 'Gábina', delay: '0.15s', pos: { right: { md: 'calc(5% + 504px)' }, top: { md: 394 }, zIndex: -1 } },
  { name: 'Eliška', delay: '0.4s', pos: { right: { md: '6%' }, top: { md: 210 }, zIndex: -1 } },
  { name: 'Jarmila', delay: '0.65s', pos: { right: { md: '3.5%' }, top: { md: 530 }, zIndex: 2 } },
] as const

// Nadpis se zalomí až po slově „přehledně,": 1. řádek „ePoukazy rychle, přehledně,", 2. řádek „bez stresu"
const TITLE_BREAK_AFTER = 'přehledně,'
const titleBreakIdx = HERO.title.indexOf(TITLE_BREAK_AFTER)
const TITLE_LINE_1 =
  titleBreakIdx === -1 ? HERO.title : HERO.title.slice(0, titleBreakIdx + TITLE_BREAK_AFTER.length)
const TITLE_LINE_2 =
  titleBreakIdx === -1 ? '' : HERO.title.slice(titleBreakIdx + TITLE_BREAK_AFTER.length).trim()

// Tučný úvod odstavce (odstavec začíná přesně touto větou)
const BOLD_LEAD = 'Ušetřete čas sobě i pacientům'
const REST_PARAGRAPH = HERO.paragraph.startsWith(BOLD_LEAD)
  ? HERO.paragraph.slice(BOLD_LEAD.length)
  : HERO.paragraph

// Plovoucí karta recenze s postupným fade-in
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
        '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 1 },
        ...pos,
      }}
    >
      <Box
        component="img"
        src="/static-icons/stars.svg"
        alt="Hodnocení 5 z 5 hvězdiček"
        sx={{ display: 'block', height: 18, width: 'auto', mb: 0.75 }}
      />
      <Typography sx={{ color: 'primary.main', fontWeight: 400, fontSize: 16 }}>{t.name}</Typography>
      <Typography sx={{ color: '#9A9A9A', fontSize: 12, mb: 1 }}>{t.role}</Typography>
      <Typography sx={{ fontSize: 13, lineHeight: 1.5, maxWidth: 185 }}>„{t.quote}"</Typography>
    </Box>
  )
}

// Kompozice: ruka s telefonem + tři plovoucí recenze.
// Prvky jsou position:absolute vůči nejbližšímu pozicovanému rodiči (wrapper níže).
// gabinaLeft přepíše pozici karty Gábina (potřebuje víc vlevo, aby nezmizela za telefonem).
function HeroComposition({ gabinaLeft }: { gabinaLeft?: string }) {
  const reviews = gabinaLeft
    ? REVIEWS.map((r) =>
      r.name === 'Gábina' ? { ...r, pos: { ...r.pos, right: undefined, left: { md: gabinaLeft } } } : r,
    )
    : REVIEWS
  return (
    <>
      {/* Ruka s telefonem – top posunutý níž, aby useknuté zápěstí zajelo pod vlnu/bílou sekci
          a nebyl vidět ostrý řez přesně na hraně boxu pod herem. */}
      <Box sx={{ position: 'absolute', right: '5%', top: 140, height: 860, zIndex: 0 }}>
        {/* Fotka ruky – obsah displeje je zapečený ve fotce; slot níže je pro dynamický obsah */}
        <Box
          component="img"
          src="/images/hero-phone.webp"
          alt="Aplikace ePoukaz online v telefonu"
          width={1284}
          height={1818}
          loading="eager"
          fetchPriority="high"
          sx={{ height: '100%', width: 'auto', display: 'block' }}
        />
        {/* Slot na displej – prozatím statický obrázek app-screen.webp.
            Pro skutečné video stačí místo <img> vložit <Box component="video" ... />
            (dřív tu byl animovaný /videos/hero-screen.webp). */}
        <Box sx={{ position: 'absolute', left: '14.5%', top: '8.6%', width: '41%', height: '62.8%', borderRadius: '38px', overflow: 'hidden' }}>
          <Box component="img" src="/images/app-screen.webp" alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </Box>
      </Box>
      {/* Recenze – plovoucí kolem ruky, postupný fade-in */}
      {reviews.map((r) => (
        <ReviewCard key={r.name} name={r.name} delay={r.delay} pos={r.pos} />
      ))}
    </>
  )
}

// Hero sekce – vlevo text, vpravo ruka s telefonem (přetéká za dekoraci a další sekci)
// a plovoucí animované recenze.
export default function HeroSection() {
  return (
    <GridSection>
      {/* zIndex 0 = vlastní stacking context: recenze se zIndex -1 zůstanou za rukou, ale ne za fialovým pozadím stránky */}
      <Box component="section" sx={{ position: 'relative', zIndex: 0, [SPLIT_UP]: { minHeight: 515 } }}>
        {/* Levý sloupec – text (nad vším). V režimu vedle sebe (≥ HERO_SPLIT) se pruh zúží (720→540),
            aby zmenšující se kompozice vpravo měla dost místa a nepřekrývala text. */}
        <Box sx={{ position: 'relative', zIndex: 3, maxWidth: { xs: '100%' }, [SPLIT_UP]: { maxWidth: fluid(310, 730, HERO_SPLIT, 1920) }, [HERO_BAND]: { maxWidth: fluid(355, 415, 900, 1280) } }}>
          {/* V režimu vedle sebe se nadpis zmenší (90→33), aby se 1. řádek vešel
              do zúženého pruhu a nezlomil se na osamocené „sobě". */}
          <Typography variant="h1" sx={{ color: '#fff', mb: fluid(24, 32), ml: '-1px', [SPLIT_UP]: { fontSize: fluid(33, 90, HERO_SPLIT, 1920) }, [HERO_BAND]: { fontSize: fluid(33, 44, 900, 1280) } }}>
            {TITLE_LINE_1}
            {TITLE_LINE_2 && (
              <>
                <br />
                {TITLE_LINE_2}
              </>
            )}
          </Typography>
          <Typography sx={{ color: '#fff', fontSize: fluid(16, 20), lineHeight: 1.6, maxWidth: fluid(250, 470, HERO_SPLIT, 1920), [HERO_BAND]: { maxWidth: fluid(355, 415, 900, 1280) }, mb: fluid(40, 48), fontWeight: 300, fontFamily: 'Poppins' }}>
            {/* Varianta C – obtékání: neviditelný plovoucí zub (jen 900–1280) rezervuje pás,
                kde zpoza telefonu vyčnívá karta Gábina. Řádky nad Gábinou jdou širší,
                řádky v jejím pásu kratší. shape-outside inset(top …) nechá horní pás volný. */}
            <Box
              aria-hidden
              component="span"
              sx={{
                display: { xs: 'none' },
                [HERO_BAND]: {
                  display: 'block',
                  float: 'right',
                  // Zub sahá od inset(top) k patě odstavce → krátí všechny řádky pod Gábinou.
                  width: fluid(167, 135, 900, 1280),
                  height: fluid(260, 235, 900, 1280),
                  shapeOutside: `inset(${fluid(112, 100, 900, 1280)} 0px 0px 0px)`,
                },
              }}
            />
            <span style={{ fontWeight: 500 }}>{BOLD_LEAD}</span>{REST_PARAGRAPH}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<Box component="img" src="/static-icons/arrow-right.svg" alt="" sx={{ width: fluid(30, 40), height: fluid(30, 40) }} />}
            sx={{ color: '#fff', pl: '30px', pr: '15px', py: 1.5, fontSize: fluid(18, 24), '& .MuiButton-endIcon': { ml: '20px', mr: 0 }, fontWeight: 500, height: fluid(60, 70) }}
          >
            {HERO.cta}
          </Button>
        </Box>

        {/* Mobil (< 900) – ruka s telefonem na vlnitém pozadí + swipe recenze */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mt: -3 }}>
          {/* Ruka s telefonem – vlny za ní; spodek ruky není useknutý, jen ho překryjí recenze */}
          <Box sx={{ position: 'relative', zIndex: 0 }}>
            <DecorLines sx={{ top: '32%' }} />
            <Box
              component="img"
              src="/images/hero-phone.webp"
              alt="Aplikace ePoukaz online v telefonu"
              width={1284}
              height={1818}
              loading="eager"
              fetchPriority="high"
              sx={{ position: 'relative', display: 'block', width: 'auto', height: 'auto', maxWidth: { xs: '143%', sm: 500 }, mx: 'auto', pt: '52px' }}
            />
          </Box>
          {/* Recenze vytažené nahoru přes spodek ruky (zIndex 1 = nad rukou);
              záporné boční marginy ruší padding stránky, aby carousel dosáhl k oběma okrajům */}
          <Box sx={{ position: 'relative', zIndex: 1, mt: { xs: -12 }, mx: { xs: `calc(-1 * ${PAGE_PX.xs})`, sm: `calc(-1 * ${PAGE_PX.sm})` } }}>
            <TestimonialsCarousel />
          </Box>
        </Box>

        {/* Desktopová kompozice (ruka + plovoucí recenze) jako jedna vrstva.
            inset:0 → stejný box jako sekce, prvky uvnitř si zachovají přesné pozice.
            Vrstva se zmenšuje mezi 1920 a HERO_SPLIT px (origin vpravo uprostřed = smršťuje se pryč
            od textu), takže telefon nikdy nezasáhne do nadpisu.
            transform vytvoří vlastní stacking context – zIndex karet (−1 za rukou, 2 před) platí uvnitř. */}
        <Box
          sx={{
            display: { xs: 'none' },
            [SPLIT_UP]: { display: 'block' },
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            // Zmenšování kompozice: scale 1.0 na 1920 px → 0.72 na HERO_SPLIT.
            // fluidScale používá trik tan(atan2()), protože scale() potřebuje bezrozměrné číslo,
            // které z vw nejde získat dělením.
            transformOrigin: '100% 50%',
            transform: `translateX(90px) scale(${fluidScale(0.85, 1.15, 1280, 1920)})`,
            // Sekce už nemá horní padding; kompozici (ruka + recenze) i vlny posuneme o 125 px nahoru,
            // aby ruka lícovala s nadpisem a zápěstí zůstalo schované ve vlnách (viz minHeight sekce −125).
            top: fluid(-105, -125, HERO_SPLIT, 1920),
            // V pásmu 900–1280 je kompozice víc vlevo (malý posun), aby Gábina zasahovala
            // do textu a text ji mohl obtékat (varianta C); nad 1280 platí širší posun výše.
            [HERO_BAND]: {
              transform: `translateX(${fluid(35, 35, 900, 1280)}) scale(${fluidScale(0.72, 1, HERO_SPLIT, 1920)})`,
            },
          }}
        >
          <HeroComposition />
        </Box>
      </Box>
    </GridSection>
  )
}
