import { Button, Grid, InputBase, Stack, Typography } from '@mui/material'
import { TRY_FORM } from '../../data/content'

// Formulář „Vyzkoušejte to sami – 30 dní zdarma" – JEN VIZUÁL (6 pill polí)
export default function TryForFreeForm() {
  return (
    <Stack spacing={4} sx={{ alignItems: 'center', py: 8, textAlign: 'center' }}>
      <Typography variant="h1" sx={{ color: '#fff' }}>{TRY_FORM.title}</Typography>
      <Typography sx={{ color: '#fff', maxWidth: 760, fontSize: 26, lineHeight: 1.5 }}>{TRY_FORM.subtitle}</Typography>
      <Grid container spacing={2} sx={{ maxWidth: 600 }}>
        {Array.from({ length: TRY_FORM.fieldsCount }).map((_, i) => (
          <Grid size={6} key={i}>
            <InputBase
              placeholder="*Jméno"
              sx={{ bgcolor: '#CFBAFF', borderRadius: 999, px: 3, py: 1.4, width: '100%', fontSize: 20 }}
            />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="secondary" sx={{ color: '#fff', px: 5, py: 1.5 }}>
        {TRY_FORM.submit}
      </Button>
    </Stack>
  )
}
