import { Box, Grid, Stack, Typography } from '@mui/material'
import { TWO_MONTHS } from '../../data/content'

// Růžové pozadí banneru (dle XD)
const PINK = '#FDD6DF'

// Růžový banner „2 měsíce ZDARMA" – vlevo podtržený nadpis + text, vpravo fotka ženy
// přetékající k pravému okraji a plynule se vytrácející do růžové.
export default function TwoMonthsFreeBanner() {
  return (
    <Box sx={{ bgcolor: PINK, borderRadius: '100px', overflow: 'hidden', my: 6 }}>
      <Grid container sx={{ alignItems: 'stretch' }}>
        {/* Text vlevo */}
        <Grid size={{ xs: 12, md: 7 }} sx={{ px: { xs: 5, md: 10 }, py: { xs: 6, md: 8 }, display: 'flex', alignItems: 'center' }}>
          <Stack spacing={3}>
            <Typography
              sx={{ fontSize: { xs: 40, md: 52 }, fontWeight: 700, lineHeight: 1.1,
                    textDecoration: 'underline', textUnderlineOffset: '6px' }}
            >
              {TWO_MONTHS.title}
            </Typography>
            <Typography sx={{ fontSize: 18, lineHeight: 1.7, maxWidth: 380 }}>{TWO_MONTHS.text}</Typography>
          </Stack>
        </Grid>

        {/* Fotka vpravo – jen na md+; přes celou výšku, s přechodem do růžové na levém okraji */}
        <Grid size={{ xs: 0, md: 5 }} sx={{ position: 'relative', minHeight: 300, display: { xs: 'none', md: 'block' } }}>
          <Box
            component="img" src="/images/shutterstock_1591464913@2x.png" alt="" aria-hidden
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center' }}
          />
          {/* jemný přechod z růžové do fotky na levém okraji (sladí případný rozdíl odstínů) */}
          <Box
            aria-hidden
            sx={{ position: 'absolute', inset: 0,
                  background: `linear-gradient(90deg, ${PINK} 0%, rgba(253,214,223,0) 22%)` }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
