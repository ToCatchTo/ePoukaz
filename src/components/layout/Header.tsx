import { Box, Button, Link as MuiLink } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../data/content'
import { CONTENT_W } from '../../theme/layout'

// Plovoucí bílá pill hlavička s logem, navigací a CTA tlačítkem
export default function Header() {
  const { pathname } = useLocation()
  return (
    <Box
      component="header"
      sx={{
        maxWidth: CONTENT_W, mx: 'auto',
        bgcolor: '#fff', borderRadius: 999, p: '30px 50px 30px 100px', mt: 10, mb: 7,
        display: 'flex', alignItems: 'center', gap: 9,
      }}
    >
      {/* Logo – zarovnané vlevo, mr:auto odtlačí navigaci a CTA doprava */}
      <MuiLink component={RouterLink} to="/" underline="none" sx={{ display: 'inline-flex', mr: 'auto' }}>
        <Box component="img" src="/images/epoukaz_logo.svg" alt="ePoukaz online" sx={{ height: 26, display: 'block' }} />
      </MuiLink>

      {/* Navigace */}
      {NAV_LINKS.map((l) => {
        const active = l.to === pathname
        return (
          <MuiLink
            key={l.label}
            component={RouterLink}
            to={l.to}
            underline="none"
            sx={{ fontWeight: 700, fontSize: 20, color: active ? 'primary.main' : '#000' }}
          >
            {l.label}
          </MuiLink>
        )
      })}

      {/* CTA – stín řeší globálně theme (disableElevation), s větší mezerou před tlačítkem */}
      <Button variant="contained" color="secondary" sx={{ color: '#fff', ml: 3 }}>
        30 dní ZDARMA
      </Button>
    </Box>
  )
}
