import { Box, Button, InputBase, Stack, Typography } from '@mui/material'
import { TRY_FORM } from '../../data/content'

// Formulář „Vyzkoušejte to sami – 30 dní zdarma" – JEN VIZUÁL (6 pill polí)
export default function TryForFreeForm() {
  return (
    <Stack sx={{ alignItems: 'center', textAlign: 'center', mb: '230px' }}>
      <Typography variant="h1" sx={{ color: '#fff', maxWidth: '905px' }}>{TRY_FORM.title}</Typography>
      <Typography sx={{ color: '#fff', maxWidth: 796, fontSize: 26, lineHeight: 1.5, mt: '35px' }} dangerouslySetInnerHTML={{ __html: TRY_FORM.subtitle }} />
      {/* Přesně 2 sloupce (na mobilu 1) – CSS grid, bez přetékání */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, columnGap: 6, rowGap: 4, width: '100%', maxWidth: 700, mt: '60px' }}>
        {Array.from({ length: TRY_FORM.fieldsCount }).map((_, i) => (
          <InputBase
            key={i}
            placeholder="*Jméno"
            sx={{
              bgcolor: '#CFBAFF', borderRadius: 999, px: 3, py: 1.4, width: '100%', fontSize: 20,
              '& input::placeholder': { color: '#000', opacity: 1 },
            }}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        color="secondary"
        endIcon={<Box component="img" src="/icons/arrow-right.svg" alt="" sx={{ width: 40, height: 40 }} />}
        sx={{ color: '#fff', pl: '30px', pr: '15px', py: 1.5, fontSize: 24, mt: '75px', '& .MuiButton-endIcon': { ml: '70px', mr: 0 }, fontWeight: 500 }}
      >
        {TRY_FORM.submit}
      </Button>
    </Stack>
  )
}
