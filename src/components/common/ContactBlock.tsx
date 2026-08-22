import { Box, Grid, Link as MuiLink, Stack, Typography } from '@mui/material'
import { CONTACT } from '../../data/content'
import { fluid } from '../../theme/fluid'

// Kontaktní blok: vlevo nadpis, vpravo e-mail a telefon (mailto:/tel:).
export default function ContactBlock() {
  // tel: jen číslice a úvodní +, bez mezer a formátovacích znaků.
  const telHref = `tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`

  return (
    <Grid container spacing={{ xs: 6, lg: 2 }} columns={10} sx={{ alignItems: 'center', pt: fluid(20, 100) }}>
      {/* Nadpis. */}
      <Grid size={{ xs: 10, lg: 5 }}>
        <Typography variant="h2" sx={{ color: '#000', whiteSpace: 'pre-line', fontSize: fluid(28, 64), lineHeight: 1.3 }}>
          {CONTACT.heading}
        </Typography>
      </Grid>

      {/* Kontaktní údaje. */}
      <Grid size={{ xs: 10, lg: 4 }} offset={{ xs: 0, lg: 1 }}>
        <Stack spacing={7}>
          <Stack direction="row" spacing={{ xs: '10px', md: 3 }} sx={{ alignItems: 'center' }}>
            <Box component="img" src="/static-icons/contact-mail.svg" alt="" aria-hidden sx={{ width: { xs: 40, md: 50 }, height: { xs: 40, md: 50 }, flexShrink: 0, display: 'block' }} />
            <MuiLink href={`mailto:${CONTACT.email}`} underline="hover" sx={{ minWidth: 0, color: 'inherit' }}>
              <Typography variant="h4" sx={{ minWidth: 0, fontSize: { xs: 18, sm: fluid(21, 30) }, overflowWrap: 'anywhere' }}>{CONTACT.email}</Typography>
            </MuiLink>
          </Stack>
          <Stack direction="row" spacing={{ xs: '10px', md: 3 }} sx={{ alignItems: 'center' }}>
            <Box component="img" src="/static-icons/contact-phone.svg" alt="" aria-hidden sx={{ width: { xs: 40, md: 50 }, height: { xs: 40, md: 50 }, flexShrink: 0, display: 'block' }} />
            <Box sx={{ minWidth: 0 }}>
              <MuiLink href={telHref} underline="hover" sx={{ color: 'inherit' }}>
                <Typography variant="h4" sx={{ fontSize: { xs: 18, sm: fluid(21, 30) } }}>{CONTACT.phone}</Typography>
              </MuiLink>
              <Typography sx={{ fontSize: { xs: 14, md: 20 }, color: '#000' }}>{CONTACT.phoneNote}</Typography>
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}
