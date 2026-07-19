import { useState } from 'react'
import { Box, Button, Link as MuiLink } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../data/content'
import { fluid } from '../../theme/fluid'
import GridSection from './GridSection'
import HamburgerButton from './HamburgerButton'
import MobileMenu from './MobileMenu'

// Hlavička – zarovnaná na grid (GridSection „content" = margin 1 sloupec, na desktopu 2 sloupce).
// Na desktopu (lg+) plovoucí bílá pill s logem, navigací a CTA; na mobilu i tabletu kompaktní pill
// (logo + odznak) a kruhový hamburger otevírající celoobrazovkové menu.
export default function Header() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <GridSection
      component="header"
      sx={{ mt: fluid(90, 80), mb: fluid(80, 56) }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
        {/* Bílá pill – na mobilu/tabletu obepíná jen logo (+odznak), na desktopu se roztáhne a nese navigaci i CTA */}
        <Box
          sx={{
            bgcolor: '#fff', borderRadius: 999,
            display: 'flex', alignItems: 'center', minWidth: 0,
            flexGrow: { xs: 0, lg: 1 },
            // Desktopové mezery/odsazení škálují až od 1200 px (kde se objeví navigace), ať se na
            // úzkém desktopu nevejde vše a CTA nepřetéká pill.
            gap: { xs: 1.25, lg: fluid(16, 72, 1200, 1920) },
            py: { xs: 0.75, lg: fluid(20, 40, 1200, 1920) },
            pl: { xs: 2.5, lg: fluid(28, 100, 1200, 1920) },
            pr: { xs: 1, lg: fluid(24, 50, 1200, 1920) },
          }}
        >
          {/* Logo – mr:auto na desktopu odtlačí navigaci a CTA doprava */}
          <MuiLink component={RouterLink} to="/" underline="none" sx={{ display: 'inline-flex', mr: { lg: 'auto' } }}>
            <Box component="img" src="/images/logo-epoukaz.svg" alt="ePoukaz online" sx={{ height: { xs: 11, lg: 29 }, display: 'block' }} />
          </MuiLink>

          {/* Odznak „30 dní ZDARMA" – na mobilu i tabletu vedle loga (výraznější pill dle XD) */}
          <Box sx={{ display: { xs: 'block', lg: 'none' }, flexShrink: 0, bgcolor: 'secondary.main', color: '#fff', borderRadius: 999, px: 2.5, py: 1, fontWeight: 700, fontSize: 14, lineHeight: 1.2, textAlign: 'center' }}>
            30 dní<br />ZDARMA
          </Box>

          {/* Navigace – jen desktop */}
          {NAV_LINKS.map((l) => {
            const active = l.to === pathname
            return (
              <MuiLink
                key={l.label}
                component={RouterLink}
                to={l.to}
                underline={active ? 'always' : 'none'}
                sx={{ display: { xs: 'none', lg: 'block' }, fontWeight: 700, fontSize: fluid(16, 20), whiteSpace: 'nowrap', color: active ? 'primary.main' : '#000', textDecorationColor: 'currentColor', textUnderlineOffset: '2px', '&:hover': { color: 'primary.main', textDecoration: 'underline' } }}
              >
                {l.label}
              </MuiLink>
            )
          })}

          {/* CTA – jen desktop */}
          <Button variant="contained" color="secondary" sx={{ display: { xs: 'none', lg: 'inline-flex' }, color: '#fff', p: fluid(12, 18), fontSize: fluid(16, 20), whiteSpace: 'nowrap' }}>
            30 dní ZDARMA
          </Button>
        </Box>

        {/* Hamburger – mobil i tablet (kruhové bílé tlačítko s „bars-sort" ikonou dle XD) */}
        <Box sx={{ display: { xs: 'inline-flex', lg: 'none' }, flexShrink: 0, mr: '-7px' }}>
          <HamburgerButton open={menuOpen} onClick={() => setMenuOpen(true)} />
        </Box>

        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </Box>
    </GridSection>
  )
}
