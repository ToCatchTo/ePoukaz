import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DecorLines from '../common/DecorLines'
import { FOOTER, CTA_BANNER } from '../../data/content'
import { WIDE_W, CARD_R } from '../../theme/layout'

// Patička – JEDNA bílá karta (1640 px) dle XD návrhu. Volitelně obsahuje nahoře
// CTA blok („A to není vše…") oddělený vodorovnou čarou, pod ním firmu + 3 sloupce
// odkazů oddělené svislou čarou a dole centrovaný copyright. Pod kartou je kredit.
export default function Footer({ withCta = false }: { withCta?: boolean }) {
  return (
    <>
      {/* Vlnité čáry za horní částí patiční karty – prosvítají v okrajích */}
      <Box sx={{ position: 'relative' }}>
      <DecorLines sx={{ top: 90 }} />
      <Box sx={{ position: 'relative', zIndex: 1, width: WIDE_W, maxWidth: '100%', mx: 'auto', bgcolor: '#fff', borderRadius: CARD_R, px: 12, py: 8 }}>
        {/* CTA blok (jen homepage a ceník) */}
        {withCta && (
          <>
            <Stack spacing={4} sx={{ alignItems: 'center', textAlign: 'center', py: 4 }}>
              <Typography variant="h2" sx={{ color: 'primary.main' }}>{CTA_BANNER.title}</Typography>
              <Button
                variant="contained"
                color="secondary"
                endIcon={<ArrowForwardIcon />}
                sx={{ color: '#fff', px: 4, py: 1.5, fontSize: 18 }}
              >
                {CTA_BANNER.button}
              </Button>
            </Stack>
            <Divider sx={{ my: 6 }} />
          </>
        )}

        {/* Firma + 3 sloupce odkazů */}
        <Grid container>
          {/* Firma */}
          <Grid size={4}>
            <Typography sx={{ fontSize: 26, mb: 3 }}>
              <b>ePoukaz</b><Box component="span" sx={{ color: '#939393' }}>online</Box>
            </Typography>
            {FOOTER.company.map((line) => (
              <Typography key={line} sx={{ fontSize: 14, color: '#000', lineHeight: 2 }}>{line}</Typography>
            ))}
          </Grid>
          {/* 3 sloupce odkazů oddělené svislou čarou */}
          <Grid size={8}>
            <Box sx={{ borderLeft: '1px solid #e6e6e6', pl: 8 }}>
              <Grid container spacing={4}>
                {FOOTER.columns.map((col) => (
                  <Grid size={4} key={col.title}>
                    <Typography sx={{ fontWeight: 700, mb: 2 }}>{col.title}</Typography>
                    {col.links.map((link) => (
                      <Typography key={link} sx={{ fontSize: 14, color: '#000', lineHeight: 2.2 }}>{link}</Typography>
                    ))}
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography sx={{ textAlign: 'center', fontSize: 14, color: '#000', mt: 8 }}>
          {FOOTER.copyright}
        </Typography>
      </Box>
      </Box>

      {/* Kredit agentury – pod kartou na fialové */}
      <Typography sx={{ textAlign: 'center', color: '#fff', fontWeight: 700, mt: 5 }}>
        {FOOTER.credit}
      </Typography>
    </>
  )
}
