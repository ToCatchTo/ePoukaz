import { Box, Stack, Typography } from '@mui/material'
import { TWO_MONTHS } from '../../data/content'

// Růžové pozadí banneru (dle XD)
const PINK = '#FDD6DF'

// Růžový banner „2 měsíce ZDARMA" – vlevo podtržený nadpis + text, vpravo fotka ženy.
// Fotka je PNG přes celou šířku banneru (poměr 3,41:1 = stejný jako banner):
// levá část PNG je průhledná (prosvítá růžové pozadí), vpravo žena + zaoblený roh.
export default function TwoMonthsFreeBanner() {
  return (
    <Box
      sx={{
        position: 'relative', bgcolor: PINK, borderRadius: '150px', overflow: 'hidden',
        mb: '180px', width: '100%', maxWidth: 1364, height: 400,
      }}
    >
      {/* Fotka jako pozadí přes celý banner – jen na md+ (na mobilu skrytá) */}
      <Box
        component="img" src="/images/two-months-banner.png" alt="" aria-hidden
        sx={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', display: { xs: 'none', md: 'block' },
        }}
      />

      {/* Text vlevo, svisle vycentrovaný, nad fotkou */}
      <Box
        sx={{
          position: 'relative', height: '100%', display: 'flex', alignItems: 'center',
          px: { xs: 5, md: '140px' },
        }}
      >
        <Stack spacing={4} sx={{ maxWidth: 460 }}>
          <Typography
            sx={{
              fontSize: { xs: 40, md: 74 }, fontWeight: 700, lineHeight: 1.1,
              textDecoration: 'underline', textUnderlineOffset: '6px', whiteSpace: 'nowrap'
            }}
          >
            {TWO_MONTHS.title}
          </Typography>
          <Typography sx={{ fontSize: 18, lineHeight: 1.7, maxWidth: 380 }}>{TWO_MONTHS.text}</Typography>
        </Stack>
      </Box>
    </Box>
  )
}
