import { Box, Grid, Stack, Typography } from '@mui/material'
import { TWO_MONTHS } from '../../data/content'

// Růžový banner „2 měsíce ZDARMA" s placeholderem fotky ženy vpravo
export default function TwoMonthsFreeBanner() {
  return (
    <Box sx={{ bgcolor: '#FDD6DF', borderRadius: 8, overflow: 'hidden', my: 6 }}>
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid size={7} sx={{ p: 6 }}>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: 74, fontWeight: 700 }}>{TWO_MONTHS.title}</Typography>
            <Typography sx={{ fontSize: 18 }}>{TWO_MONTHS.text}</Typography>
          </Stack>
        </Grid>
        {/* Placeholder fotky */}
        <Grid size={5}>
          <Box sx={{ height: 260, bgcolor: '#F6C9FF' }} aria-label="placeholder fotka" />
        </Grid>
      </Grid>
    </Box>
  )
}
