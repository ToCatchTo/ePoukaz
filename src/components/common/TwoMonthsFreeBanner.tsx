import { Box, Stack, Typography } from '@mui/material'
import { TWO_MONTHS } from '../../data/content'
import { fluid } from '../../theme/fluid'
import GridSection from '../layout/GridSection'

// Pozadí banneru (dle XD).
const PINK = '#FDD6DF'

// Banner „2 měsíce zdarma": vlevo podtržený nadpis a text, vpravo fotka ženy.
// Fotka je PNG přes celou šířku (poměr 3,41:1, shodný s bannerem); levá část je
// průhledná (prosvítá pozadí), vpravo žena se zaobleným rohem.
export default function TwoMonthsFreeBanner() {
  return (
    <GridSection sx={{ mb: fluid(229, 180) }}>
      <Box
        sx={{
          position: 'relative', bgcolor: PINK, borderRadius: fluid(80, 150), overflow: 'hidden',
          width: '100%', height: { xs: 'auto', md: 400 },
          display: { xs: 'flex', md: 'block' }, flexDirection: 'column',
        }}
      >
        {/* Fotka jako pozadí přes celý banner, jen na desktopu (md+).
            Gradientová maska nechá levou hranu plynule naběhnout do pozadí,
            aby na rozhraní nevznikl ostrý svislý šev. */}
        <Box
          component="img" src="/images/two-months-banner.webp" alt="" aria-hidden
          width={2728} height={800}
          loading="lazy"
          sx={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', display: { xs: 'none', md: 'block' },
            maskImage: 'linear-gradient(to right, transparent 26%, #000 52%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 26%, #000 52%)',
          }}
        />

        {/* Text vlevo, svisle vycentrovaný, nad fotkou. */}
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
                // Na desktopu/tabletu (md+) nezalamovat, na mobilu (svislá verze) zalomit.
                whiteSpace: { xs: 'normal', md: 'nowrap' },
              }}
            >
              {TWO_MONTHS.title}
            </Typography>
            <Typography sx={{ fontSize: '18px', lineHeight: '30px', maxWidth: 380 }}>{TWO_MONTHS.text}</Typography>
          </Stack>
        </Box>

        {/* Fotka ženy pod textem, jen na mobilu (dle XD Mobile).
            background-image (ne <img>) kvůli kontrole měřítka: žena je menší a s růžovým
            prostorem kolem. Horní hrana přes gradientovou masku plynule naběhne do
            textové části bez ostrého švu. */}
        <Box
          aria-hidden
          sx={{
            display: { xs: 'block', md: 'none' }, width: '100%', height: 300,
            backgroundColor: PINK,
            backgroundImage: 'url(/images/two-months-banner.webp)',
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
