import { useState } from 'react'
import { Box, Button, Link as MuiLink } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { NAV_MAIN, NAV_DISTRIBUTORS, REGISTER_URL } from '../../data/content'
import { scrollToHashOnClick } from '../../utils/scrollToHash'
import { fluid } from '../../theme/fluid'
import GridSection from './GridSection'
import HamburgerButton from './HamburgerButton'
import MobileMenu from './MobileMenu'

// Hlavička zarovnaná na grid. Desktop (lg+): plovoucí bílá pill s logem, navigací a CTA.
// Mobil i tablet: kompaktní pill (logo + odznak) a kruhový hamburger pro celoobrazovkové menu.
// Cesty výdejny clusteru zobrazují NAV_DISTRIBUTORS, ostatní NAV_MAIN.
// Podstránky odkazované z výdejnové patičky (FAQ, obchodní podmínky, dynamické
// /stranka/* – např. cookies) patří také do výdejnové sekce, aby menu neskákalo
// na pacientské.
const DISTRIBUTOR_PATHS = new Set(['/vydejna', '/cenik', '/kontakt', '/faq', '/obchodni-podminky'])

// Desktopové logo: SVG má 260 × 29 px (plná velikost dle XD). Šířka škáluje plynule
// LOGO_WIDTH_1200 → LOGO_MAX_WIDTH mezi 1200 a 1920 px, stejně v obou sekcích. Hodnota na
// 1200 px je odvozená z místa, které logu zbývá ve výdejnové sekci (4 odkazy + CTA) při
// minimální mezeře 30 px – pacientská sekce má místa víc, ale logo drží stejnou velikost.
// LOGO_MIN_WIDTH je jen pojistka: kdyby se obsah (např. se širším fallback fontem) přesto
// nevešel, ustoupí logo, ne odkazy.
const LOGO_MAX_WIDTH = 260
const LOGO_WIDTH_1200 = 146
const LOGO_MIN_WIDTH = 100

export default function Header() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const isDistributor = DISTRIBUTOR_PATHS.has(pathname) || pathname.startsWith('/stranka/')
  // Pevná navigace dle sekce; stránky z API (/stranka/*) do hlavního menu nepatří.
  const links = isDistributor ? NAV_DISTRIBUTORS : NAV_MAIN
  // CTA v pill: jen výdejny sekce → registrace. V pacientské sekci se tlačítko nezobrazuje.
  const cta = isDistributor ? { label: '30 dní ZDARMA', href: REGISTER_URL } : null

  return (
    <GridSection
      component="header"
      sx={{ mt: fluid(90, 80), mb: fluid(90, 130) }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
        {/* Bílá pill: na mobilu/tabletu obepíná logo (+odznak), na desktopu se roztáhne a nese navigaci i CTA */}
        <Box
          sx={{
            bgcolor: '#fff', borderRadius: 999,
            display: 'flex', alignItems: 'center', minWidth: 0,
            flexGrow: { xs: 0, lg: 1 },
            // Mezery/odsazení škálují až od 1200 px (kde se objeví navigace). Minimum 30 px drží
            // odkazy vzdušné i na úzkém desktopu – chybějící místo dorovná zmenšení loga.
            gap: { xs: 1.25, lg: fluid(30, 72, 1200, 1920) },
            py: { xs: isDistributor ? 0.75 : 3, lg: fluid(32, 40, 1200, 1920) },
            // Pacientská pill obepíná jen logo → na mobilu víc vodorovného prostoru, ať není úzká.
            // Na desktopu boční padding začíná na 40 px (1200 px), aby se na úzkém desktopu vešly
            // všechny odkazy i CTA bez zmáčknutí; k 1920 px roste na 100 px dle XD.
            pl: { xs: isDistributor ? 2.5 : 4, lg: fluid(40, 100, 1200, 1920) },
            // Na desktopu je pravý padding stejný v obou sekcích. Na mobilu/tabletu má výdejnová
            // pill odznak s vlastním vnitřním paddingem, proto tam zůstává užší pravý padding.
            pr: { xs: isDistributor ? 1 : 4, lg: fluid(40, 100, 1200, 1920) }, maxHeight: '128px'
          }}
        >
          {/* Logo: na desktopu je obal loga jediný pružný prvek pill – roste (a tím odtlačí
              navigaci a CTA doprava) i se zmenšuje. Odkaz uvnitř obepíná jen obrázek, aby klikací
              plocha nesahala do volného místa vedle loga. Obrázek má plynulou šířku
              LOGO_WIDTH_1200 → LOGO_MAX_WIDTH. Odkazy a CTA mají flexShrink 0, takže kdyby se
              přesto nevešly, ustoupí logo (až na LOGO_MIN_WIDTH), ne text. */}
          <Box sx={{ display: 'flex', flex: { lg: '1 1 auto' }, minWidth: { lg: LOGO_MIN_WIDTH } }}>
            <MuiLink component={RouterLink} to="/" underline="none" sx={{ display: 'inline-flex', minWidth: 0 }}>
              <Box component="img" src="/images/logo-epoukaz.svg" alt="ePoukaz online" sx={{ display: 'block', height: { xs: 11, lg: 'auto' }, width: { xs: 'auto', lg: '100%' }, maxWidth: { lg: fluid(LOGO_WIDTH_1200, LOGO_MAX_WIDTH, 1200, 1920) } }} />
            </MuiLink>
          </Box>

          {/* Odkaz 30 dní ZDARMA (registrace): mobil/tablet vedle loga, jen výdejnová sekce.
              Na pacientských stránkách se nezobrazuje (stejně jako desktop CTA). */}
          {isDistributor && (
            <MuiLink href={REGISTER_URL} target="_blank" rel="noopener noreferrer" underline="none" sx={{ display: { xs: 'block', lg: 'none' }, flexShrink: 0, bgcolor: 'secondary.main', color: '#fff', borderRadius: 999, px: 2.5, py: '5px', fontWeight: 400, fontSize: 14, lineHeight: 1.2, textAlign: 'center' }}>
              30 dní<br />ZDARMA
            </MuiLink>
          )}

          {/* Navigace: jen desktop */}
          {links.map((l) => {
            // Aktivní i pro odkaz s kotvou (např. /pro-vydejny#jak-to-funguje).
            const active = l.to.split('#')[0] === pathname
            return (
              <MuiLink
                key={l.label}
                component={RouterLink}
                to={l.to}
                onClick={() => scrollToHashOnClick(l.to, pathname)}
                underline={active ? 'always' : 'none'}
                sx={{ display: { xs: 'none', lg: 'block' }, flexShrink: 0, fontWeight: 700, fontSize: fluid(16, 20), whiteSpace: 'nowrap', color: active ? 'primary.main' : '#000', textDecorationColor: 'currentColor', textUnderlineOffset: '2px', '&:hover': { color: 'primary.main', textDecoration: 'underline' } }}
              >
                {l.label}
              </MuiLink>
            )
          })}

          {/* CTA na desktopu (výdejnová sekce). Mobilní/tabletový odznak „30 dní ZDARMA" výše
              i položka v MobileMenu zůstávají. */}
          {cta && (
            <Button variant="contained" color="secondary" href={cta.href} target="_blank" rel="noopener noreferrer" sx={{ display: { xs: 'none', lg: 'inline-flex' }, flexShrink: 0, color: '#fff', p: fluid(12, 18), fontSize: fluid(16, 20), whiteSpace: 'nowrap' }}>
              {cta.label}
            </Button>
          )}
        </Box>

        {/* Hamburger: mobil i tablet */}
        <Box sx={{ display: { xs: 'inline-flex', lg: 'none' }, flexShrink: 0, mr: '-7px' }}>
          <HamburgerButton open={menuOpen} onClick={() => setMenuOpen(true)} />
        </Box>

        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
      </Box>
    </GridSection>
  )
}
