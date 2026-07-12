import { Box, Button, InputBase, Stack, Typography } from '@mui/material'
import { TRY_FORM } from '../../data/content'

// Formulář „Vyzkoušejte to sami – 30 dní zdarma" – JEN VIZUÁL (6 pill polí)
export default function TryForFreeForm() {
  return (
    <Stack spacing={4} sx={{ alignItems: 'center', textAlign: 'center', mb: '230px' }}>
      <Typography variant="h1" sx={{ color: '#fff', maxWidth: '905px' }}>{TRY_FORM.title}</Typography>
      <Typography sx={{ color: '#fff', maxWidth: 796, fontSize: 26, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: TRY_FORM.subtitle }} />
      {/* Přesně 2 sloupce (na mobilu 1) – CSS grid, bez přetékání */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, columnGap: 6, rowGap: 4, width: '100%', maxWidth: 700 }}>
        {Array.from({ length: TRY_FORM.fieldsCount }).map((_, i) => (
          <InputBase
            key={i}
            placeholder="*Jméno"
            sx={{ bgcolor: '#CFBAFF', borderRadius: 999, px: 3, py: 1.4, width: '100%', fontSize: 20 }}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        color="secondary"
        endIcon={<Box component="img" src="/icons/Arrow_R.svg" alt="" sx={{ width: 28, height: 28 }} />}
        sx={{ color: '#fff', px: 5, py: 1.5 }}
      >
        {TRY_FORM.submit}
      </Button>
    </Stack>
  )
}
