import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import SectionCard from '../components/common/SectionCard'
import PricingCard, { tierIcons } from '../components/common/PricingCard'
import type { Tier } from '../components/common/PricingCard'
import TwoMonthsFreeBanner from '../components/common/TwoMonthsFreeBanner'
import MainFeatures from '../components/common/MainFeatures'
import DecorLines from '../components/common/DecorLines'
import Footer from '../components/layout/Footer'
import GridSection from '../components/layout/GridSection'
import { PAGE_PX } from '../theme/grid'
import { fluid } from '../theme/fluid'
import { CENIK_HEAD, PRICING, COMPARE_ROWS, SMS_NOTE } from '../data/content'
import { useTariffs } from '../hooks/useApi'
import { useImagesReady } from '../hooks/useImagesReady'
import { Seo } from '../components/common/Seo'
import { JsonLd } from '../components/common/JsonLd'
import { SEO } from '../data/seo'
import { tariffToItem, tierForCode } from '../api/tariffMapping'

// Vytáhne z ceny (např. „1 490 Kč") čisté číslo pro JSON-LD Offer.price.
function priceToNumber(price: string): string {
  return price.replace(/[^\d]/g, '')
}

// Akcentní barvy tarifů (hlavička srovnávací tabulky)
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

// Popisek řádku; u „… (detail)" podtrhne slovo „detail" jako odkaz.
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

// Tučná část podtitulu
const SUB_BOLD = '30 dní ZDARMA'
const [SUB_BEFORE, SUB_AFTER] = CENIK_HEAD.subtitle.split(SUB_BOLD)

export default function PricingPage() {
  const { data: tariffs, loading } = useTariffs()
  // Data z API; při chybě fallback na statickou PRICING, ať stránka není prázdná.
  const cards = tariffs
    ? tariffs.map((t) => ({ key: t.code, item: tariffToItem(t), tier: tierForCode(t.code) }))
    : PRICING.map((p) => ({ key: p.name, item: p, tier: p.name.toLowerCase() as Tier }))

  // Kolečko na místě karet se drží, dokud nedorazí tarify z API a nenačtou se ikony karet
  // (lodičky + fajfky). Stejný princip jako u univerzální podstránky (viz useImagesReady).
  const iconSrcs = Array.from(new Set(cards.flatMap((c) => tierIcons(c.tier))))
  const imagesReady = useImagesReady(iconSrcs, !loading)
  const ready = !loading && imagesReady

  return (
    <Box data-testid="page-cenik">
      <Seo path="/cenik" title={SEO['/cenik'].title} description={SEO['/cenik'].description} />
      {cards.map((c) => (
        <JsonLd
          key={c.key}
          data={{
            '@type': 'Product',
            name: `ePoukaz ${c.item.name}`,
            offers: {
              '@type': 'Offer',
              price: priceToNumber(c.item.price),
              priceCurrency: 'CZK',
            },
          }}
        />
      ))}
      {/* Světlá karta s tarify a tabulkou (#F5F5F5), dekorace za horní částí – zarovnaná na grid */}
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

            {/* Kolečko na místě karet, dokud nejsou tarify + ikony načtené */}
            {!ready && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 360 }}>
                <CircularProgress aria-label="Načítání" />
              </Box>
            )}
            {/* Tarify ve flexboxu s pevnou šířkou karty (360 px) bez flex-grow: všechny karty jsou stejně
                široké (grow by osamocenou kartu na posledním řádku roztáhl) a mezi nimi je přesně gap 30 px.
                Počet karet v řadě se řídí dostupnou šířkou; každý řádek je přes justifyContent center
                vycentrovaný jako skupina. maxWidth 100 % zúží kartu na úzkých telefonech.
                Blok se renderuje vždy – dokud není „ready", je skrytý mimo obrazovku (přednačtení ikon). */}
            <Box
              aria-hidden={ready ? undefined : true}
              sx={ready ? undefined : { position: 'absolute', left: -99999, top: 0, width: '100%', opacity: 0, pointerEvents: 'none' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'stretch',
                  gap: '30px',
                }}
              >
                {cards.map((c) => (
                  <Box
                    key={c.key}
                    sx={{ width: 360, maxWidth: '100%', flexShrink: 0 }}
                  >
                    <PricingCard item={c.item} tier={c.tier} />
                  </Box>
                ))}
              </Box>
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

      {/* SMS poznámka – bílý text na fialové; lehčí řez 300 (Poppins) vyrovnává optické „bobtnání"
          světlého textu na tmavém pozadí (halace). Centrovaná (PAGE_PX). */}
      <Box sx={{ px: PAGE_PX }}>
        <Typography sx={{ color: '#fff', fontFamily: 'Poppins', fontWeight: 300, fontSize: fluid(14, 20), mt: fluid(64, 125), mb: fluid(120, 230), lineHeight: 1.8, maxWidth: 1040, mx: 'auto' }} dangerouslySetInnerHTML={{ __html: SMS_NOTE }} />
      </Box>

      <TwoMonthsFreeBanner />
      <MainFeatures />

      {/* CTA + patička jako jedna karta */}
      <Box sx={{ mt: '315px' }}>
        <Footer withCta />
      </Box>
    </Box>
  )
}
