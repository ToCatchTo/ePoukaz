import { Box, Button, Typography } from '@mui/material'
import { HERO, TESTIMONIALS, REGISTER_URL } from '../../data/content'
import { fluid, fluidScale } from '../../theme/fluid'
import GridSection from '../layout/GridSection'
import { PAGE_PX } from '../../theme/grid'
import { HERO_SPLIT, SPLIT_UP } from '../../theme/layout'
import DecorLines from './DecorLines'
import TestimonialsCarousel from './TestimonialsCarousel'

// Recenze dohledáme podle jména (data z TESTIMONIALS)
const byName = Object.fromEntries(TESTIMONIALS.map((t) => [t.name, t]))

// Hranice „vedle sebe" (HERO_SPLIT) a media query (SPLIT_UP) jsou sdílené v theme/layout,
// protože stejný zlom používá i HomePage (dekorační pás + mezera před další sekcí).

// Pozice recenzí kolem ruky + pořadí (delay) postupného fade-in po načtení stránky.
// zIndex: -1 = karta je ZA rukou (vykukuje zpoza telefonu), zIndex 2 = PŘED rukou.
const REVIEWS = [
  // Všechny recenze i telefon kotvíme k PRAVÉMU okraji, aby zůstaly „přilepené" k telefonu
  // a nedriftovaly vůči němu při změně šířky. Gábina: telefon má right:5% a šířku 607 px
  // (výška 860 × poměr 1284/1818), takže jeho levý okraj je calc(5% + 607px). Karta ho překrývá
  // o 103 px → right = calc(5% + 504px). Na 1920 sedí přesně jako dřív (odpovídalo left 39 %),
  // ale už se nezasouvá pod telefon na užších obrazovkách. zIndex -1 = vykukuje zpoza telefonu.
  { name: 'Gábina', delay: '0.15s', pos: { right: { md: 'calc(5% + 504px)' }, top: { md: 336 }, zIndex: -1 } },
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

// Sdílený obsah kompozice: ruka s telefonem + tři plovoucí recenze (fade-in animace).
// Prvky jsou position:absolute vůči nejbližšímu pozicovanému rodiči (stage / wrapper níže).
// `gabinaLeft` přepíše pozici karty Gábina (varianta pod nadpisem ji potřebuje víc vlevo,
// aby nezmizela za telefonem – desktop verze si drží svou výchozí pozici).
function HeroComposition({ gabinaLeft }: { gabinaLeft?: string }) {
  const reviews = gabinaLeft
    ? REVIEWS.map((r) =>
      r.name === 'Gábina' ? { ...r, pos: { ...r.pos, right: undefined, left: { md: gabinaLeft } } } : r,
    )
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
      <Box component="section" sx={{ position: 'relative', zIndex: 0, pt: { xs: 2 }, [SPLIT_UP]: { pt: '125px', minHeight: 640 } }}>
        {/* LEVÝ SLOUPEC – text (nad vším). V režimu „vedle sebe" (≥ HERO_SPLIT) se pruh plynule
            zúží (720→540), aby měla zmenšující se kompozice telefonu vpravo dost místa a
            nepřekrývala text. Užší pruh posouvá hranici skládání níž na laptopy. */}
        <Box sx={{ position: 'relative', zIndex: 3, maxWidth: { xs: '100%' }, [SPLIT_UP]: { maxWidth: fluid(310, 720, HERO_SPLIT, 1920) } }}>
          {/* V režimu vedle sebe nadpis zmenšíme (90→44), aby se 1. řádek
              „Šetřete čas sobě" vešel do zúženého pruhu a nezlomil se na osamocené „sobě". */}
          <Typography variant="h1" sx={{ color: '#fff', mb: fluid(24, 32), ml: '-1px', [SPLIT_UP]: { fontSize: fluid(33, 90, HERO_SPLIT, 1920) } }}>
            {TITLE_LINE_1}
            {TITLE_LINE_2 && (
              <>
                <br />
                {TITLE_LINE_2}
              </>
            )}
          </Typography>
          <Typography sx={{ color: '#fff', fontSize: fluid(16, 20), lineHeight: 1.6, maxWidth: fluid(300, 470, HERO_SPLIT, 1920), mb: fluid(40, 48), fontWeight: 300, fontFamily: 'Poppins' }}>
            <span style={{ fontWeight: 500 }}>{BOLD_LEAD}</span>{REST_PARAGRAPH}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
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

        {/* DESKTOPOVÁ KOMPOZICE (ruka + plovoucí recenze) jako jedna „stage" vrstva.
            inset:0 → stejný box jako sekce, takže si prvky uvnitř zachovají přesné pozice.
            Celá vrstva se plynule zmenšuje mezi 1920 a HERO_SPLIT px (origin vpravo uprostřed =
            smršťuje se pryč od textu vlevo), takže telefon nikdy nezasáhne do nadpisu.
            transform vytvoří vlastní stacking context – zIndex karet (−1 za rukou, 2 před) platí uvnitř. */}
        <Box
          sx={{
            display: { xs: 'none' },
            [SPLIT_UP]: { display: 'block' },
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            // Plynulé zmenšování celé kompozice: scale 1.0 na 1920 px → 0.7 na HERO_SPLIT
            // (kompozice je vidět až od HERO_SPLIT). fluidScale používá trik tan(atan2()),
            // protože scale() potřebuje bezrozměrné číslo, které z vw nejde získat dělením.
            transformOrigin: '100% 50%',
            // Na užších oknech kompozici navíc posuneme doprava (telefon klidně přeteče za okraj),
            // aby nejlevější recenze (Gábina) nezasahovala do textu; na 1920 posun 0.
            transform: `translateX(${fluid(140, 0, HERO_SPLIT, 1920)}) scale(${fluidScale(0.72, 1, HERO_SPLIT, 1920)})`,
            top: fluid(20, 0, HERO_SPLIT, 1920), // posun dolů při zmenšování
          }}
        >
          <HeroComposition />
        </Box>
      </Box>
    </GridSection>
  )
}
