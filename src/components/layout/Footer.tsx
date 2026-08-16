import type { ReactNode } from 'react'
import { Box, Button, Divider, Grid, Link as MuiLink, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import DecorLines from '../common/DecorLines'
import { FOOTER, CTA_BANNER, REGISTER_URL } from '../../data/content'
import { CARD_R } from '../../theme/layout'
import { fluid } from '../../theme/fluid'
import GridSection from './GridSection'
import { useCompanies, usePages } from '../../hooks/useApi'

// Sdílený styl odkazů ve sloupcích patičky
const footerLinkSx = { display: 'block', fontSize: fluid(14, 16), color: '#000', lineHeight: '36px', '&:hover': { color: 'primary.main' } } as const

// Patička jako jedna bílá karta. Volitelně nahoře CTA blok nebo vlastní horní obsah
// (`topContent`, např. kontaktní blok) oddělený vodorovnou čarou; níže firma + 3 sloupce
// odkazů oddělené svislou čarou a centrovaný copyright. Pod kartou kredit agentury.
export default function Footer({ withCta = false, topContent }: { withCta?: boolean; topContent?: ReactNode }) {
  const { data: companies } = useCompanies()
  const { data: pages } = usePages()

  // Odkazy sloupce: „Doplňkové služby" → provozovny z API, „Jak na to?" → podstránky z API;
  // při chybějících datech fallback na statické odkazy.
  const columnLinks = (col: (typeof FOOTER.columns)[number]) => {
    if (col.title === 'Doplňkové služby' && companies && companies.length > 0) {
      return companies.map((c) => ({ key: c.publicHash, to: `/provozovna/${c.publicHash}`, label: c.name }))
    }
    if (col.title === 'Jak na to?' && pages && pages.length > 0) {
      return pages.map((p) => ({ key: p.slug, to: `/stranka/${p.slug}`, label: p.title }))
    }
    return col.links.map((link) => ({ key: link, to: '/faq', label: link }))
  }

  return (
    <>
      {/* Dekorativní vlnité čáry prosvítající v okrajích karty */}
      <Box sx={{ position: 'relative' }}>
        <DecorLines sx={{ top: topContent ? 120 : fluid(-200, 173) }} />
        <GridSection variant="wide" sx={{ position: 'relative', zIndex: 1, px: { xs: '14px', sm: CARD_R } }}>
          <Box sx={{ bgcolor: '#fff', borderRadius: CARD_R, px: fluid(24, 140), pt: topContent ? fluid(70, 110) : fluid(97, 140), pb: fluid(40, 60) }}>
            {/* Horní obsah oddělený vodorovnou čarou */}
            {topContent && (
              <>
                {topContent}
                <Divider sx={{ mt: fluid(40, 75), mb: fluid(56, 150), borderWidth: 1 }} />
              </>
            )}

            {/* CTA blok: jen homepage a ceník */}
            {withCta && (
              <>
                <Stack spacing={4} sx={{ alignItems: 'center', textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ color: 'primary.main', maxWidth: 796 }}>
                    {/* xs kratší varianta titulku, od sm plné znění */}
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>{CTA_BANNER.title}</Box>
                    <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' }, fontSize: fluid(40, 74) }}>{CTA_BANNER.titleMobile}</Box>
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<Box component="img" src="/static-icons/arrow-right.svg" alt="" sx={{ width: fluid(30, 40), height: fluid(30, 40) }} />}
                    sx={{ color: '#fff', pl: '30px', pr: '15px', py: 1.5, fontSize: fluid(18, 24), mt: `${fluid(28, 50)} !important`, '& .MuiButton-endIcon': { ml: '20px', mr: 0 }, fontWeight: 500, height: fluid(60, 70) }}
                  >
                    {CTA_BANNER.button}
                  </Button>
                </Stack>
                <Divider sx={{ mt: fluid(100, 130), mb: fluid(90, 150), borderWidth: 1 }} />
              </>
            )}

            {/* Firma + 3 sloupce odkazů: na desktopu 10sloupcový grid (firma 3, mezera 1, sloupce 2),
              na mobilu i tabletu vše pod sebou. Svislá čára jen na desktopu. */}
            <Grid container columns={10} rowSpacing={{ xs: 5, lg: 0 }} sx={{ alignItems: 'flex-start' }}>
              {/* Firma: svislá čára na pravém okraji (jen desktop) */}
              <Grid size={{ xs: 10, lg: 3 }} sx={{ borderRight: { lg: '1px solid' }, borderColor: { lg: 'divider' }, mb: { xs: '60px', lg: 0 } }}>
                <Box component="img" src="/images/logo-epoukaz.svg" alt="ePoukaz online" sx={{ height: 26, mb: 3, display: 'block' }} />
                {FOOTER.company.map((line) => (
                  <Typography key={line} sx={{ fontSize: fluid(14, 16), color: '#000', lineHeight: 2 }}>{line}</Typography>
                ))}
              </Grid>
              {/* Mezera mezi firmou a sloupci: jen desktop */}
              <Grid size={{ lg: 1 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
              {/* Sloupce odkazů */}
              {FOOTER.columns.map((col) => (
                <Grid size={{ xs: 10, lg: 2 }} key={col.title}>
                  <Typography sx={{ fontWeight: 700, fontSize: fluid(18, 20), mb: 0.5 }}>{col.title}</Typography>
                  {columnLinks(col).map((l) => (
                    <MuiLink key={l.key} component={RouterLink} to={l.to} underline="hover" sx={footerLinkSx}>
                      {l.label}
                    </MuiLink>
                  ))}
                </Grid>
              ))}
            </Grid>

            {/* Copyright */}
            <Typography sx={{ textAlign: 'center', fontSize: 16, color: '#000', mt: fluid(137, 200) }}>
              {FOOTER.copyright}
            </Typography>
          </Box>
        </GridSection>
      </Box>

      {/* Kredit agentury pod kartou: text + odkaz s logem MatFix */}
      <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'center', alignItems: 'center', mt: fluid(150, 220) }}>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>
          {FOOTER.credit}
        </Typography>
        {/* Odkaz na web agentury: logo MatFix + ikona „tvorba" */}
        <MuiLink
          href="https://matfix.cz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="MatFix"
          sx={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <Box component="img" src="/images/logo-matfix.svg" alt="MatFix" sx={{ height: 15, display: 'block', m: '0px 0px 3px 15px !important' }} />
          <Box component="img" src="/images/footer-tvorba.svg" alt="" aria-hidden sx={{ height: 15, display: 'block' }} />
        </MuiLink>
      </Stack>
    </>
  )
}
