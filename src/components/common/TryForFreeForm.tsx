import { Box, Button, InputBase, Stack, Typography } from '@mui/material'
import { TRY_FORM } from '../../data/content'
import { fluid } from '../../theme/fluid'
import { PAGE_PX } from '../../theme/grid'

// Formulář „Vyzkoušejte to sami – 30 dní zdarma" – JEN VIZUÁL (6 pill polí).
// Není dělaný podle gridu, jen centrovaný; boční margin ≥ 1 sloupec přes PAGE_PX.
export default function TryForFreeForm() {
  return (
    <Box sx={{ px: PAGE_PX }}>
      <Stack sx={{ alignItems: 'center', textAlign: 'center', mb: fluid(120, 230) }}>
        <Typography variant="h1" sx={{ color: '#fff', maxWidth: '905px' }}>{TRY_FORM.title}</Typography>
        <Typography sx={{ color: '#fff', maxWidth: 796, fontSize: fluid(16, 26), lineHeight: 1.5, mt: fluid(30, 35) }} dangerouslySetInnerHTML={{ __html: TRY_FORM.subtitle }} />
        {/* Přesně 2 sloupce (na mobilu 1) – CSS grid, bez přetékání */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, columnGap: 6, rowGap: { xs: 2, md: 4 }, width: '100%', maxWidth: 700, mt: fluid(40, 60) }}>
          {Array.from({ length: TRY_FORM.fieldsCount }).map((_, i) => (
            <InputBase
              key={i}
              placeholder="*Jméno"
              sx={{
                bgcolor: '#CFBAFF', borderRadius: 999, px: 5, py: 2.5, width: '100%', fontSize: fluid(16, 20),
                '& input::placeholder': { color: '#000', opacity: 1 }, height: '60px'
              }}
            />
          ))}
        </Box>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<Box component="img" src="/icons/arrow-right.svg" alt="" sx={{ width: fluid(30, 40), height: fluid(30, 40) }} />}
          sx={{ color: '#fff', pl: '30px', pr: '15px', py: 1.5, fontSize: fluid(18, 24), mt: fluid(60, 75), '& .MuiButton-endIcon': { ml: '70px', mr: 0 }, fontWeight: 500 }}
        >
          {TRY_FORM.submit}
        </Button>
      </Stack>
    </Box>
  )
}
