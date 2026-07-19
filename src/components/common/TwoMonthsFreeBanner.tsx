import { Box, Stack, Typography } from '@mui/material'
import { TWO_MONTHS } from '../../data/content'
import { fluid } from '../../theme/fluid'
import GridSection from '../layout/GridSection'

// Růžové pozadí banneru (dle XD)
const PINK = '#FDD6DF'

// Růžový banner „2 měsíce ZDARMA" – vlevo podtržený nadpis + text, vpravo fotka ženy.
// Fotka je PNG přes celou šířku banneru (poměr 3,41:1 = stejný jako banner):
// levá část PNG je průhledná (prosvítá růžové pozadí), vpravo žena + zaoblený roh.
// Zarovnaný na grid (variant „content" = margin ≥ 1 sloupec).
export default function TwoMonthsFreeBanner() {
  return (
    <GridSection sx={{ mb: fluid(80, 180) }}>
      <Box
        sx={{
          position: 'relative', bgcolor: PINK, borderRadius: fluid(80, 150), overflow: 'hidden',
          width: '100%', height: { xs: 'auto', md: 400 },
          display: { xs: 'flex', md: 'block' }, flexDirection: 'column',
        }}
      >
        {/* Fotka jako pozadí přes celý banner – jen na desktopu (md+).
            Maska s gradientem nechá levou hranu obrázku plynule naběhnout do růžového pozadí,
            takže na rozhraní částí není ostrý svislý šev. */}
        <Box
          component="img" src="/images/two-months-banner.png" alt="" aria-hidden
          sx={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', display: { xs: 'none', md: 'block' },
            maskImage: 'linear-gradient(to right, transparent 26%, #000 52%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 26%, #000 52%)',
          }}
        />

        {/* Text vlevo, svisle vycentrovaný, nad fotkou */}
        <Box
          sx={{
            position: 'relative', height: { md: '100%' }, display: 'flex', alignItems: 'center',
            px: fluid(43, 140), pt: { xs: '40px', md: 0 }, pb: { xs: '28px', md: 0 }
          }}
        >
          <Stack spacing={{ xs: 2.5, md: 4 }} sx={{ maxWidth: 460 }}>
            <Typography
              sx={{
                fontSize: fluid(40, 74), fontWeight: 700, lineHeight: '50px',
                textDecoration: 'underline', textUnderlineOffset: '6px',
                // nezalamovat na desktopu/tabletu (md+), na mobilu (svislá verze) ať se zalomí
                whiteSpace: { xs: 'normal', md: 'nowrap' },
              }}
            >
              {TWO_MONTHS.title}
            </Typography>
            <Typography sx={{ fontSize: fluid(15, 18), lineHeight: 1.7, maxWidth: 380 }}>{TWO_MONTHS.text}</Typography>
          </Stack>
        </Box>

        {/* Fotka ženy pod textem – jen na mobilu (dle XD Mobile).
            background-image (ne <img>) kvůli kontrole měřítka: žena je menší a s růžovým
            prostorem kolem (jako v návrhu). Horní hrana přes masku plynule naběhne do
            růžové textové části = gradientový přechod bez ostrého švu. */}
        <Box
          aria-hidden
          sx={{
            display: { xs: 'block', md: 'none' }, width: '100%', height: 300,
            backgroundColor: PINK,
            backgroundImage: 'url(/images/two-months-banner.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '82% bottom',
            backgroundSize: 'auto 250px',
            maskImage: 'linear-gradient(to bottom, transparent 0%, #000 50%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 50%)',
          }}
        />
      </Box>
    </GridSection>
  )
}
