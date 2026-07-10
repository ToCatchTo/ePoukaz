import { Box, Button, Grid, Link as MuiLink } from '@mui/material'
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
        bgcolor: '#fff', borderRadius: 999, px: 5, py: 3, mt: 10, mb: 7,
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
      }}
    >
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        {/* Logo */}
        <Grid size="auto">
          <MuiLink component={RouterLink} to="/" underline="none" sx={{ fontSize: 26, color: '#000' }}>
            <b>ePoukaz</b><Box component="span" sx={{ color: '#939393' }}>online</Box>
          </MuiLink>
        </Grid>
        <Grid size="grow" />
        {/* Navigace */}
        {NAV_LINKS.map((l) => {
          const active = l.to === pathname
          return (
            <Grid size="auto" key={l.label}>
              <MuiLink
                component={RouterLink}
                to={l.to}
                underline="none"
                sx={{ fontWeight: 700, fontSize: 20, color: active ? 'primary.main' : '#000' }}
              >
                {l.label}
              </MuiLink>
            </Grid>
          )
        })}
        {/* CTA */}
        <Grid size="auto">
          <Button variant="contained" color="secondary" sx={{ color: '#fff' }}>
            30 dní ZDARMA
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
