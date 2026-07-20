import { Box, Grid, IconButton, InputBase, Stack, Typography } from '@mui/material'
import { CONTACT } from '../../data/content'
import { fluid } from '../../theme/fluid'

// Společný styl šedých polí formuláře – nápověda (placeholder) černě, plně krytá
const FIELD = {
  bgcolor: '#F5F5F5', px: 4.5, py: 4.5, fontSize: 14, color: '#000', width: '100%',
  '& input::placeholder, & textarea::placeholder': { color: '#000', opacity: 1 },
} as const

// Kontaktní blok – vlevo e-mail a telefon (černá kolečka s ikonou), vpravo formulář
// zprávy s tyrkysovým odesílacím tlačítkem. Ikony jsou hotová SVG (kolečko + glyf).
// Jen vizuál (bez odesílání).
export default function ContactBlock() {
  return (
    <Grid container spacing={{ xs: 8, lg: 2 }} columns={10} sx={{ alignItems: 'center' }}>
      {/* Kontaktní údaje */}
      <Grid offset={{ xs: 0, lg: 1 }} size={{ xs: 10, lg: 4 }}>
        <Stack spacing={3} sx={{ ml: { sm: '0px', xs: '32px' } }}>
          <Stack direction="row" spacing={{ xs: '10px', md: 3 }} sx={{ alignItems: 'center' }}>
            <Box component="img" src="/icons/contact-mail.svg" alt="" aria-hidden sx={{ width: { xs: 40, md: 50 }, height: { xs: 40, md: 50 }, flexShrink: 0, display: 'block' }} />
            <Typography variant="h4" sx={{ minWidth: 0, fontSize: { xs: 18, sm: fluid(21, 30) }, overflowWrap: 'anywhere' }}>{CONTACT.email}</Typography>
          </Stack>
          <Stack direction="row" spacing={{ xs: '10px', md: 3 }} sx={{ alignItems: 'center' }}>
            <Box component="img" src="/icons/contact-phone.svg" alt="" aria-hidden sx={{ width: { xs: 40, md: 50 }, height: { xs: 40, md: 50 }, flexShrink: 0, display: 'block' }} />
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h4" sx={{ fontSize: { xs: 18, sm: fluid(21, 30) } }}>{CONTACT.phone}</Typography>
              <Typography sx={{ fontSize: { xs: 14, md: 20 }, color: '#000' }}>{CONTACT.phoneNote}</Typography>
            </Box>
          </Stack>
        </Stack>
      </Grid>

      {/* Formulář zprávy */}
      <Grid size={{ xs: 10, lg: 4 }}>
        <Stack spacing={2.5}>
          <Typography sx={{ fontSize: fluid(18, 20), fontWeight: 700, color: '#000', ml: { sm: '24px !important', xs: '0px' }, textAlign: { sm: 'left', xs: 'center' } }}>{CONTACT.formHeading}</Typography>
          <InputBase placeholder="*Email" sx={{ ...FIELD, borderRadius: '999px', py: '20px !important', height: '60px' }} />
          <Box sx={{ position: 'relative' }}>
            <InputBase
              placeholder={`*${CONTACT.messageLabel}`}
              multiline minRows={4}
              sx={{ ...FIELD, borderRadius: '53px', alignItems: 'flex-start', pr: 10, minHeight: '210px', '& textarea': { maxWidth: '300px' } }}
            />
            {/* Odesílací tlačítko – hotové SVG (tyrkysové kolečko + bílá šipka) */}
            <IconButton
              aria-label="Odeslat zprávu"
              sx={{ position: 'absolute', right: 28, bottom: 28, p: 0, '&:hover': { opacity: 0.9 } }}
            >
              <Box component="img" src="/icons/contact-send.svg" alt="" aria-hidden sx={{ width: fluid(38, 54), height: fluid(38, 54), display: 'block' }} />
            </IconButton>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  )
}
