import { Box, Grid, Stack, Typography } from '@mui/material'
import SectionCard from '../components/common/SectionCard'
import PricingCard from '../components/common/PricingCard'
import type { Tier } from '../components/common/PricingCard'
import TwoMonthsFreeBanner from '../components/common/TwoMonthsFreeBanner'
import TryForFreeForm from '../components/common/TryForFreeForm'
import DecorLines from '../components/common/DecorLines'
import Footer from '../components/layout/Footer'
import GridSection from '../components/layout/GridSection'
import { PAGE_PX } from '../theme/grid'
import { fluid } from '../theme/fluid'
import { CENIK_HEAD, PRICING, COMPARE_ROWS, SMS_NOTE } from '../data/content'

// Mapa akcentní barvy tarifu na hex (hlavička srovnávací tabulky)
const ACCENT: Record<string, string> = { black: '#000000', purple: '#4200D8', teal: '#00C7BF' }

// Fajfky ve srovnávací tabulce – plné kolečko s bílou fajfkou (Start černá, Pro fialová, Premium tyrkysová)
const TABLE_CHECK = {
  start: '/icons/pricing-check-start-table.svg',
  pro: '/icons/pricing-check-pro.svg',
  premium: '/icons/pricing-check-premium.svg',
} as const

// Fajfka tabulky – zarovnaná vlevo pod hlavičkou sloupce
function TableCheck({ src }: { src: string }) {
  return <Box component="img" src={src} alt="" aria-hidden sx={{ width: { xs: 18, md: 22 }, height: { xs: 18, md: 22 }, display: 'block' }} />
}

// Hlavička sloupce tarifu ve srovnávací tabulce – na mobilu zkrácená (S/P/Pr), na desktopu plný název.
function TierHead({ full, abbr, color }: { full: string; abbr: string; color?: string }) {
  return (
    <Typography component="span" sx={{ fontWeight: 700, fontSize: fluid(16, 30), color: color ?? '#000' }}>
      <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>{full}</Box>
      <Box component="span" sx={{ display: { xs: 'inline', md: 'none' } }}>{abbr}</Box>
    </Typography>
  )
}

// Popisek řádku; u „… (detail)" podtrhne slovo „detail" jako odkaz
function rowLabel(label: string) {
  const marker = '(detail)'
  if (!label.endsWith(marker)) return label
  return (
    <>
      {label.slice(0, -marker.length)}(
      <Box component="span" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>detail</Box>)
    </>
  )
}

// Tučná část podtitulu dle XD
const SUB_BOLD = '30 dní ZDARMA'
const [SUB_BEFORE, SUB_AFTER] = CENIK_HEAD.subtitle.split(SUB_BOLD)

export default function PricingPage() {
  return (
    <Box data-testid="page-cenik">
      {/* Světlá karta s tarify a tabulkou (#F5F5F5) + vlnité čáry za horní částí – zarovnaná na grid */}
      <Box sx={{ position: 'relative', mt: 4 }}>
        <DecorLines sx={{ top: 110 }} />
        <GridSection sx={{ position: 'relative', zIndex: 1 }}>
          <SectionCard sx={{ bgcolor: '#F5F5F5', px: fluid(20, 100), pt: fluid(48, 85), pb: fluid(80, 150) }}>
            {/* Nadpis + podtitul */}
            <Stack sx={{ textAlign: 'center', mb: fluid(56, 95), alignItems: 'center', gap: fluid(20, 35) }}>
              <Typography variant="h3" sx={{ maxWidth: 760 }}>{CENIK_HEAD.title}</Typography>
              <Typography sx={{ fontSize: fluid(15, 18), maxWidth: 590, color: 'text.primary', lineHeight: 1.6 }}>
                {SUB_BEFORE}<b>{SUB_BOLD}</b>{SUB_AFTER}
              </Typography>
            </Stack>

            {/* 3 tarify – vedle sebe jen když je dost místa na pohodlnou šířku karty (≥ ~1600 px),
                jinak (i na užším desktopu) pod sebou vycentrované, ať nejsou přeplácané/úzké. */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                '@media (min-width:1600px)': { flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', gap: '30px' },
              }}
            >
              {PRICING.map((p) => (
                <Box
                  key={p.name}
                  sx={{ width: '100%', maxWidth: 370, minWidth: 0, '@media (min-width:1600px)': { flex: '1 1 0', width: 'auto' } }}
                >
                  <PricingCard item={p} tier={p.name.toLowerCase() as Tier} />
                </Box>
              ))}
            </Box>

            {/* Srovnávací tabulka „Nástroje" – kompaktní i na mobilu (hlavičky zkrácené S/P/Pr, plynulé písmo) */}
            <Box sx={{ mt: fluid(64, 120), maxWidth: 956, mx: 'auto' }}>
              <Grid container sx={{ pb: 3, alignItems: 'baseline' }}>
                <Grid size={6}><Typography variant="h4">Nástroje</Typography></Grid>
                <Grid size={2}><TierHead full="Start" abbr="S" /></Grid>
                <Grid size={2}><TierHead full="Pro" abbr="P" color={ACCENT.purple} /></Grid>
                <Grid size={2}><TierHead full="Premium" abbr="Pr" color={ACCENT.teal} /></Grid>
              </Grid>
              {COMPARE_ROWS.map((r) => (
                <Grid container key={r.label} sx={{ py: { xs: 1.25, lg: 2 }, alignItems: 'center' }}>
                  <Grid size={6}><Typography sx={{ color: 'text.secondary', fontSize: fluid(13, 18), pr: 2 }}>{rowLabel(r.label)}</Typography></Grid>
                  <Grid size={2}>{r.start && <TableCheck src={TABLE_CHECK.start} />}</Grid>
                  <Grid size={2}>{r.pro && <TableCheck src={TABLE_CHECK.pro} />}</Grid>
                  <Grid size={2}>{r.premium && <TableCheck src={TABLE_CHECK.premium} />}</Grid>
                </Grid>
              ))}
            </Box>
          </SectionCard>
        </GridSection>
      </Box>

      {/* SMS poznámka – bílý text na fialové; lehčí řez 300 (Poppins) vyrovnává
          optické „bobtnání" světlého textu na tmavém pozadí (halace). Centrovaná, margin ≥ 1 sloupec. */}
      <Box sx={{ px: PAGE_PX }}>
        <Typography sx={{ color: '#fff', fontFamily: 'Poppins', fontWeight: 300, fontSize: fluid(14, 20), mt: fluid(64, 125), mb: fluid(120, 230), lineHeight: 1.8, maxWidth: 1040, mx: 'auto' }} dangerouslySetInnerHTML={{ __html: SMS_NOTE }} />
      </Box>

      <TwoMonthsFreeBanner />
      <TryForFreeForm />

      {/* CTA + patička jako jedna karta */}
      <Box sx={{ mt: '315px' }}>
        <Footer withCta />
      </Box>
    </Box>
  )
}
