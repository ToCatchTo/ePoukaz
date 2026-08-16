import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Box, Collapse, Grid, IconButton, InputBase, Link as MuiLink, Stack, Typography } from '@mui/material'
import { CONTACT } from '../../data/content'
import { fluid } from '../../theme/fluid'
import SuccessPopup from './SuccessPopup'

// Společný styl šedých polí formuláře; placeholder černě a plně krytý.
const FIELD = {
  bgcolor: '#F5F5F5', px: 4.5, py: 4.5, fontSize: fluid(14, 20), color: '#000', width: '100%',
  '& input::placeholder, & textarea::placeholder': { color: '#000', opacity: 1 },
} as const

// Základní kontrola formátu e-mailu, ne RFC-přesná.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Chybová barva čitelná na šedém poli.
const ERR = '#D14343'

// Chybová hláška pod polem se plynule rozbalí/sbalí (Collapse animuje výšku), aby
// layout neposkočil. Text drží i během zavírací animace, aby nezmizel před sbalením výšky.
function FieldError({ message }: { message?: string }) {
  const [shown, setShown] = useState(message)
  useEffect(() => { if (message) setShown(message) }, [message])
  return (
    <Collapse in={Boolean(message)} timeout={260}>
      <Typography sx={{ color: ERR, fontSize: 14, pt: 0.75, ml: 3 }}>{shown}</Typography>
    </Collapse>
  )
}

// Kontaktní blok: vlevo e-mail a telefon (mailto:/tel:), vpravo formulář zprávy.
// Validace (e-mail povinný a ve správném formátu, zpráva povinná); po odeslání
// se zobrazí potvrzovací pop-up (SuccessPopup).
export default function ContactBlock() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({})
  const [sent, setSent] = useState(false)

  // tel: jen číslice a úvodní +, bez mezer a formátovacích znaků.
  const telHref = `tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next: { email?: string; message?: string } = {}
    if (!email.trim()) next.email = 'Zadejte e-mail.'
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Zadejte platný e-mail.'
    if (!message.trim()) next.message = 'Napište nám zprávu.'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    // Zatím jen vizuál bez skutečného odeslání: potvrdíme a vyčistíme pole.
    setSent(true)
    setEmail('')
    setMessage('')
  }

  return (
    <Grid container spacing={{ xs: 8, lg: 2 }} columns={10} sx={{ alignItems: 'center' }}>
      {/* Kontaktní údaje. */}
      <Grid offset={{ xs: 0, lg: 1 }} size={{ xs: 10, lg: 4 }}>
        <Stack spacing={3} sx={{ ml: { sm: '0px', xs: '32px' } }}>
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

      {/* Formulář zprávy. */}
      <Grid size={{ xs: 10, lg: 4 }}>
        <Stack component="form" onSubmit={handleSubmit} noValidate spacing={2.5}>
          <Typography sx={{ fontSize: fluid(18, 20), fontWeight: 700, color: '#000', ml: { sm: '24px !important', xs: '0px' }, textAlign: { sm: 'left', xs: 'center' } }}>{CONTACT.formHeading}</Typography>

          <Box>
            <InputBase
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })) }}
              placeholder="*Email"
              inputProps={{ 'aria-label': 'Email', 'aria-invalid': errors.email ? true : undefined }}
              sx={{ ...FIELD, borderRadius: '999px', py: '20px !important', height: '60px', boxShadow: errors.email ? `inset 0 0 0 2px ${ERR}` : 'inset 0 0 0 0 transparent', transition: 'box-shadow .2s ease' }}
            />
            <FieldError message={errors.email} />
          </Box>

          <Box>
            <Box sx={{ position: 'relative' }}>
              <InputBase
                value={message}
                onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((p) => ({ ...p, message: undefined })) }}
                placeholder={`*${CONTACT.messageLabel}`}
                multiline minRows={4}
                inputProps={{ 'aria-label': 'Zpráva', 'aria-invalid': errors.message ? true : undefined }}
                sx={{ ...FIELD, borderRadius: '53px', alignItems: 'flex-start', pr: 10, minHeight: '210px', '& textarea': { maxWidth: '300px' }, boxShadow: errors.message ? `inset 0 0 0 2px ${ERR}` : 'inset 0 0 0 0 transparent', transition: 'box-shadow .2s ease' }}
              />
              {/* Odesílací tlačítko (SVG s kolečkem a šipkou). */}
              <IconButton
                type="submit"
                aria-label="Odeslat zprávu"
                sx={{ position: 'absolute', right: 28, bottom: 28, p: 0, '&:hover': { opacity: 0.9 } }}
              >
                <Box component="img" src="/static-icons/contact-send.svg" alt="" aria-hidden sx={{ width: fluid(38, 54), height: fluid(38, 54), display: 'block' }} />
              </IconButton>
            </Box>
            <FieldError message={errors.message} />
          </Box>
        </Stack>
      </Grid>

      {/* Potvrzení odeslání. */}
      <SuccessPopup
        open={sent}
        onClose={() => setSent(false)}
        title="Zpráva odeslána!"
        text="Ozveme se vám zpravidla do druhého pracovního dne."
      />
    </Grid>
  )
}
