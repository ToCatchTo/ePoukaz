import { Box, Grid, IconButton, InputBase, Stack, Typography } from '@mui/material'
import { CONTACT } from '../../data/content'

// Společný styl šedých polí formuláře – nápověda (placeholder) černě, plně krytá
const FIELD = {
  bgcolor: '#F2F2F2', px: 3, py: 2, fontSize: 18, color: '#000', width: '100%',
  '& input::placeholder, & textarea::placeholder': { color: '#000', opacity: 1 },
} as const

// Kontaktní blok – vlevo e-mail a telefon (černá kolečka s ikonou), vpravo formulář
// zprávy s tyrkysovým odesílacím tlačítkem. Ikony jsou hotová SVG (kolečko + glyf).
// Jen vizuál (bez odesílání).
export default function ContactBlock() {
  return (
    <Grid container spacing={2} columns={10} sx={{ alignItems: 'center' }}>
      {/* Kontaktní údaje */}
      <Grid offset={1} size={{ xs: 12, md: 4 }}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Box component="img" src="/icons/contact-mail.svg" alt="" aria-hidden sx={{ width: 50, height: 50, flexShrink: 0, display: 'block' }} />
            <Typography variant="h4">{CONTACT.email}</Typography>
          </Stack>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Box component="img" src="/icons/contact-phone.svg" alt="" aria-hidden sx={{ width: 50, height: 50, flexShrink: 0, display: 'block' }} />
            <Box>
              <Typography variant="h4">{CONTACT.phone}</Typography>
              <Typography sx={{ fontSize: 20, color: '#000' }}>{CONTACT.phoneNote}</Typography>
            </Box>
          </Stack>
        </Stack>
      </Grid>

      {/* Formulář zprávy */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Stack spacing={2.5}>
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#000', ml: '24px !important' }}>{CONTACT.formHeading}</Typography>
          <InputBase placeholder="*Email" sx={{ ...FIELD, borderRadius: '999px' }} />
          <Box sx={{ position: 'relative' }}>
            <InputBase
              placeholder={`*${CONTACT.messageLabel}`}
              multiline minRows={4}
              sx={{ ...FIELD, borderRadius: '30px', alignItems: 'flex-start', pr: 10, minHeight: '210px', '& textarea': { maxWidth: '300px' } }}
            />
            {/* Odesílací tlačítko – hotové SVG (tyrkysové kolečko + bílá šipka) */}
            <IconButton
              aria-label="Odeslat zprávu"
              sx={{ position: 'absolute', right: 16, bottom: 16, p: 0, '&:hover': { opacity: 0.9 } }}
            >
              <Box component="img" src="/icons/contact-send.svg" alt="" aria-hidden sx={{ width: 54, height: 54, display: 'block' }} />
            </IconButton>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  )
}
