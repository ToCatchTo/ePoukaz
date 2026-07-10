import { Box, Grid, Stack, Typography } from '@mui/material'
import { TWO_MONTHS } from '../../data/content'

// Růžový banner „2 měsíce ZDARMA" s placeholderem fotky ženy vpravo
export default function TwoMonthsFreeBanner() {
  return (
    <Box sx={{ bgcolor: '#FDD6DF', borderRadius: '40px', overflow: 'hidden', my: 6 }}>
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid size={7} sx={{ px: 8, py: 6 }}>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>{TWO_MONTHS.title}</Typography>
            <Typography sx={{ fontSize: 18 }}>{TWO_MONTHS.text}</Typography>
          </Stack>
        </Grid>
        {/* Placeholder fotky */}
        <Grid size={5}>
          <Box sx={{ height: 320, bgcolor: '#F6C9FF' }} aria-label="placeholder fotka" />
        </Grid>
      </Grid>
    </Box>
  )
}
