import { Box, Grid, Stack, Typography } from '@mui/material'
import SectionCard from '../components/common/SectionCard'
import PricingCard from '../components/common/PricingCard'
import type { Tier } from '../components/common/PricingCard'
import TwoMonthsFreeBanner from '../components/common/TwoMonthsFreeBanner'
import TryForFreeForm from '../components/common/TryForFreeForm'
import DecorLines from '../components/common/DecorLines'
import Footer from '../components/layout/Footer'
import { CONTENT_W } from '../theme/layout'
import { CENIK_HEAD, PRICING, COMPARE_ROWS, SMS_NOTE } from '../data/content'

// Mapa akcentní barvy tarifu na hex (hlavička srovnávací tabulky)
const ACCENT: Record<string, string> = { black: '#000000', purple: '#4200D8', teal: '#00C7BF' }

// Fajfky ve srovnávací tabulce – plné kolečko s bílou fajfkou (Start černá, Pro fialová, Premium tyrkysová)
const TABLE_CHECK = {
  start: '/icons/Check_start_vypus.svg',
  pro: '/icons/Check_pro.svg',
  premium: '/icons/Check_premium.svg',
} as const

// Fajfka tabulky – zarovnaná vlevo pod hlavičkou sloupce
function TableCheck({ src }: { src: string }) {
  return <Box component="img" src={src} alt="" aria-hidden sx={{ width: 22, height: 22, display: 'block' }} />
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

export default function CenikPage() {
  return (
    <Box data-testid="page-cenik">
      {/* Obsahový sloupec 1364 px */}
      <Box sx={{ maxWidth: CONTENT_W, mx: 'auto' }}>
        {/* Světlá karta s tarify a tabulkou (#F5F5F5) + vlnité čáry za horní částí */}
        <Box sx={{ position: 'relative', mt: 4 }}>
          <DecorLines sx={{ top: 110 }} />
          <SectionCard sx={{ bgcolor: '#F5F5F5', position: 'relative', zIndex: 1 }}>
            {/* Nadpis + podtitul */}
            <Stack sx={{ textAlign: 'center', mb: '95px', alignItems: 'center', gap: '35px' }}>
              <Typography variant="h3" sx={{ maxWidth: 760 }}>{CENIK_HEAD.title}</Typography>
              <Typography sx={{ fontSize: 18, maxWidth: 590, color: 'text.primary', lineHeight: 1.6 }}>
                {SUB_BEFORE}<b>{SUB_BOLD}</b>{SUB_AFTER}
              </Typography>
            </Stack>

            {/* 3 tarify – prostřední (Pro) zvýrazněný a vyšší; alignItems center => přečuhuje nahoru i dolů */}
            <Grid container spacing={3.75} sx={{ justifyContent: 'center', alignItems: 'center' }}>
              {PRICING.map((p) => (
                <Grid size={4} key={p.name}>
                  <PricingCard item={p} tier={p.name.toLowerCase() as Tier} elevated={p.highlighted} />
                </Grid>
              ))}
            </Grid>

            {/* Srovnávací tabulka „Nástroje" – bez linek, sloupce zarovnané vlevo pod hlavičkami */}
            <Box sx={{ mt: '120px', maxWidth: 956, mx: 'auto' }}>
              <Grid container sx={{ pb: 3, alignItems: 'baseline' }}>
                <Grid size={6}><Typography variant="h4">Nástroje</Typography></Grid>
                <Grid size={2}><Typography sx={{ fontWeight: 700, fontSize: 30 }}>Start</Typography></Grid>
                <Grid size={2}><Typography sx={{ fontWeight: 700, fontSize: 30, color: ACCENT.purple }}>Pro</Typography></Grid>
                <Grid size={2}><Typography sx={{ fontWeight: 700, fontSize: 30, color: ACCENT.teal }}>Premium</Typography></Grid>
              </Grid>
              {COMPARE_ROWS.map((r) => (
                <Grid container key={r.label} sx={{ py: 2, alignItems: 'center' }}>
                  <Grid size={6}><Typography sx={{ color: 'text.secondary', fontSize: 18 }}>{rowLabel(r.label)}</Typography></Grid>
                  <Grid size={2}>{r.start && <TableCheck src={TABLE_CHECK.start} />}</Grid>
                  <Grid size={2}>{r.pro && <TableCheck src={TABLE_CHECK.pro} />}</Grid>
                  <Grid size={2}>{r.premium && <TableCheck src={TABLE_CHECK.premium} />}</Grid>
                </Grid>
              ))}
            </Box>
          </SectionCard>
        </Box>

        {/* SMS poznámka – bílý text na fialové */}
        <Typography sx={{ color: '#fff', fontSize: 18, my: 5, lineHeight: 1.7 }}>{SMS_NOTE}</Typography>

        <TwoMonthsFreeBanner />
        <TryForFreeForm />
      </Box>

      {/* CTA + patička jako jedna karta */}
      <Footer withCta />
    </Box>
  )
}
