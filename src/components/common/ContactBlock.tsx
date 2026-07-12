import { Box, Grid, IconButton, InputBase, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import SendIcon from '@mui/icons-material/Send'
import { CONTACT } from '../../data/content'

// Černé kolečko s ikonou u kontaktních údajů
function IconBadge({ children }: { children: ReactNode }) {
  return (
    <Box
      aria-hidden
      sx={{ width: 46, height: 46, borderRadius: '50%', bgcolor: '#000', color: '#fff',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
    >
      {children}
    </Box>
  )
}

// Společný styl šedých polí formuláře
const FIELD = { bgcolor: '#F2F2F2', px: 3, py: 2, fontSize: 18, color: '#000', width: '100%' } as const

// Kontaktní blok – vlevo e-mail a telefon (černá kolečka), vpravo formulář zprávy
// s tyrkysovým odesílacím tlačítkem. Jen vizuál (bez odesílání).
export default function ContactBlock() {
  return (
    <Grid container spacing={6} sx={{ alignItems: 'center' }}>
      {/* Kontaktní údaje */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <IconBadge><EmailIcon sx={{ fontSize: 20 }} /></IconBadge>
            <Typography variant="h4">{CONTACT.email}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <IconBadge><PhoneIcon sx={{ fontSize: 20 }} /></IconBadge>
            <Typography variant="h4">{CONTACT.phone}</Typography>
          </Stack>
        </Stack>
      </Grid>

      {/* Formulář zprávy */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={2.5}>
          <InputBase placeholder="*Email" sx={{ ...FIELD, borderRadius: '999px' }} />
          <Box sx={{ position: 'relative' }}>
            <InputBase
              placeholder={`*${CONTACT.messageLabel}`}
              multiline minRows={4}
              sx={{ ...FIELD, borderRadius: '30px', alignItems: 'flex-start', pr: 10 }}
            />
            <IconButton
              aria-label="Odeslat zprávu"
              sx={{ position: 'absolute', right: 16, bottom: 16, width: 52, height: 52,
                    bgcolor: 'secondary.main', color: '#fff',
                    '&:hover': { bgcolor: 'secondary.dark' } }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  )
}
