import type { ReactNode } from 'react'
import { Box, Button, Divider, Grid, Link as MuiLink, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import DecorLines from '../common/DecorLines'
import { FOOTER, CTA_BANNER } from '../../data/content'
import { WIDE_W, CARD_R } from '../../theme/layout'

// Patička – JEDNA bílá karta (1640 px) dle XD návrhu. Volitelně obsahuje nahoře
// CTA blok („A to není vše…") NEBO libovolný horní obsah (`topContent`, např. kontaktní blok),
// oddělený vodorovnou čarou; pod ním firmu + 3 sloupce odkazů oddělené svislou čarou a dole
// centrovaný copyright. Pod kartou je kredit.
export default function Footer({ withCta = false, topContent }: { withCta?: boolean; topContent?: ReactNode }) {
  return (
    <>
      {/* Vlnité čáry za horní částí patiční karty – prosvítají v okrajích */}
      <Box sx={{ position: 'relative' }}>
        <DecorLines sx={{ top: topContent ? 120 : 175 }} />
        <Box sx={{ position: 'relative', zIndex: 1, width: WIDE_W, maxWidth: '100%', mx: 'auto', bgcolor: '#fff', borderRadius: CARD_R, p: topContent ? '110px 140px 60px 140px' : '140px 140px 60px 140px' }}>
          {/* Horní obsah (např. kontaktní blok na stránce Kontakt) oddělený vodorovnou čarou */}
          {topContent && (
            <>
              {topContent}
              <Divider sx={{ mt: '75px', mb: '150px' }} />
            </>
          )}

          {/* CTA blok (jen homepage a ceník) */}
          {withCta && (
            <>
              <Stack spacing={4} sx={{ alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="h2" sx={{ color: 'primary.main', maxWidth: 796 }}>{CTA_BANNER.title}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<Box component="img" src="/icons/arrow-right.svg" alt="" sx={{ width: 40, height: 40 }} />}
                  sx={{ color: '#fff', pl: '30px', pr: '15px', py: 1.5, fontSize: 24, mt: '50px !important', '& .MuiButton-endIcon': { ml: '20px', mr: 0 }, fontWeight: 500 }}
                >
                  {CTA_BANNER.button}
                </Button>
              </Stack>
              <Divider sx={{ mt: '130px', mb: '150px' }} />
            </>
          )}

          {/* Firma + 3 sloupce odkazů – 10sloupcový grid dle XD:
              firma 3/10, mezera 1/10, každý sloupec odkazů 2/10. Buňky zarovnané nahoru
              (alignItems flex-start), takže svislá čára = pravý okraj bloku firmy je vysoká
              přesně jako obsah firmy (nepřetahuje se přes nejvyšší sloupec). */}
          <Grid container columns={10} sx={{ alignItems: 'flex-start' }}>
            {/* Firma – svislá čára na pravém okraji */}
            <Grid size={3} sx={{ borderRight: '1px solid', borderColor: 'divider' }}>
              <Box component="img" src="/images/logo-epoukaz.svg" alt="ePoukaz online" sx={{ height: 26, mb: 3, display: 'block' }} />
              {FOOTER.company.map((line) => (
                <Typography key={line} sx={{ fontSize: 16, color: '#000', lineHeight: 2 }}>{line}</Typography>
              ))}
            </Grid>
            {/* mezera mezi firmou a sloupci odkazů */}
            <Grid size={1} />
            {/* 3 sloupce odkazů, každý 2/10 */}
            {FOOTER.columns.map((col) => (
              <Grid size={2} key={col.title}>
                <Typography sx={{ fontWeight: 700, fontSize: 20, mb: 2 }}>{col.title}</Typography>
                {col.links.map((link) => (
                  <MuiLink
                    key={link}
                    component={RouterLink}
                    to="/faq"
                    underline="hover"
                    sx={{ display: 'block', fontSize: 16, color: '#000', lineHeight: 2.2, '&:hover': { color: 'primary.main' } }}
                  >
                    {link}
                  </MuiLink>
                ))}
              </Grid>
            ))}
          </Grid>

          {/* Copyright */}
          <Typography sx={{ textAlign: 'center', fontSize: 16, color: '#000', mt: '200px' }}>
            {FOOTER.copyright}
          </Typography>
        </Box>
      </Box>

      {/* Kredit agentury – pod kartou na fialové (text + odkaz s logem MatFix) */}
      <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'center', alignItems: 'center', mt: '220px' }}>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>
          {FOOTER.credit}
        </Typography>
        {/* Odkaz na web agentury – jen logo MatFix + „tvorba" ikonka */}
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
