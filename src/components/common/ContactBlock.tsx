import { Grid, InputBase, Stack, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import SectionCard from './SectionCard'
import { CONTACT } from '../../data/content'

// Kontaktní blok – e-mail, telefon a pole zprávy (jen vizuál)
export default function ContactBlock() {
  return (
    <SectionCard sx={{ my: 6 }}>
      <Grid container spacing={4}>
        {/* Kontaktní údaje */}
        <Grid size={6}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <EmailIcon color="primary" />
              <Typography variant="h4">{CONTACT.email}</Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <PhoneIcon color="primary" />
              <Typography variant="h4">{CONTACT.phone}</Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* Pole zprávy */}
        <Grid size={6}>
          <Stack spacing={2}>
            <InputBase placeholder="*Email" sx={{ bgcolor: '#F5F5F5', borderRadius: 3, px: 2, py: 1.2 }} />
            <InputBase
              placeholder={`*${CONTACT.messageLabel}`}
              multiline minRows={3}
              sx={{ bgcolor: '#F5F5F5', borderRadius: 3, px: 2, py: 1.2 }}
            />
          </Stack>
        </Grid>
      </Grid>
    </SectionCard>
  )
}
